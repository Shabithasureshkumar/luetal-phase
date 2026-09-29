import { useCallback, useMemo, useRef, useState } from 'react';
import { EMPTY_DAILY_LOG, GLASS_ML, WATER_TARGET_ML } from '../data/cycle';
import { addDays, addMonths, diffDays } from '../lib/date';
import { useTracker } from '../state/trackerStore';
import type { DailyLogData } from '../types/tracker';

/**
 * Daily Log page state: the selected date plus an editable draft of that date's log.
 * The draft is committed to the shared tracker store only on "Save Log".
 *
 * The date selector is a 7-day window: picking a date inside it only moves the selection;
 * the arrows page the window (and the selection) by a full week.
 */
const WINDOW_DAYS = 7;
const WEIGHT_RANGE_KG = { min: 20, max: 300 };

/** Returns a user-facing error, or null when the log can be saved. */
function validate(log: DailyLogData): string | null {
  if (JSON.stringify(log) === JSON.stringify(EMPTY_DAILY_LOG)) return 'Add at least one entry before saving.';
  if (log.weight.trim() !== '') {
    const kg = Number(log.weight);
    if (!Number.isFinite(kg) || kg < WEIGHT_RANGE_KG.min || kg > WEIGHT_RANGE_KG.max) {
      return `Enter a body weight between ${WEIGHT_RANGE_KG.min} and ${WEIGHT_RANGE_KG.max} kg.`;
    }
  }
  return null;
}
const CENTER = Math.floor(WINDOW_DAYS / 2);

interface NavState {
  selectedDate: string;
  windowStart: string;
  draft: DailyLogData;
}

export function useDailyLog() {
  const { today, logs, saveDailyLog, cycleInfo, medications, addMedication } = useTracker();
  const [justSaved, setJustSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [noChanges, setNoChanges] = useState(false);

  // Read inside state updaters so rapid consecutive clicks never use a stale snapshot
  const logsRef = useRef(logs);
  logsRef.current = logs;

  // Selection, window and draft change together, so they live in one state object
  const [nav, setNav] = useState<NavState>(() => ({
    selectedDate: today,
    windowStart: addDays(today, -CENTER),
    draft: logs[today] ?? EMPTY_DAILY_LOG,
  }));
  const { selectedDate, windowStart, draft } = nav;
  const saved = logs[selectedDate];

  const navigate = useCallback((next: (s: NavState) => { date: string; windowStart: string }) => {
    setNav((s) => {
      const { date, windowStart: start } = next(s);
      return { selectedDate: date, windowStart: start, draft: logsRef.current[date] ?? EMPTY_DAILY_LOG };
    });
    setJustSaved(false);
    setError(null);
    setNoChanges(false);
  }, []);

  /** Select a date; the window only moves if the date isn't already visible. */
  const selectDate = useCallback(
    (date: string) =>
      navigate((s) => {
        const offset = diffDays(date, s.windowStart);
        const visible = offset >= 0 && offset < WINDOW_DAYS;
        return { date, windowStart: visible ? s.windowStart : addDays(date, -CENTER) };
      }),
    [navigate],
  );

  /** Page the window by whole weeks, keeping the selection at the same position in it. */
  const shiftWeek = useCallback(
    (n: number) =>
      navigate((s) => ({
        date: addDays(s.selectedDate, n * WINDOW_DAYS),
        windowStart: addDays(s.windowStart, n * WINDOW_DAYS),
      })),
    [navigate],
  );

  /** Jump to a date and centre the window on it. */
  const recenter = useCallback(
    (toDate: (s: NavState) => string) =>
      navigate((s) => {
        const date = toDate(s);
        return { date, windowStart: addDays(date, -CENTER) };
      }),
    [navigate],
  );

  const windowDates = useMemo(
    () => Array.from({ length: WINDOW_DAYS }, (_, i) => addDays(windowStart, i)),
    [windowStart],
  );

  const update = useCallback(<K extends keyof DailyLogData>(key: K, value: DailyLogData[K]) => {
    setNav((s) => ({ ...s, draft: { ...s.draft, [key]: value } }));
    setJustSaved(false);
    setError(null);
    setNoChanges(false);
  }, []);

  const isDirty = useMemo(
    () => JSON.stringify(draft) !== JSON.stringify(saved ?? EMPTY_DAILY_LOG),
    [draft, saved],
  );

  /** Saves the draft against the selected date. Nothing is written when unchanged (prevents double submits). */
  const save = useCallback(() => {
    if (!isDirty) {
      setNoChanges(true);
      return;
    }
    const problem = validate(draft);
    setError(problem);
    if (problem) return;
    saveDailyLog(selectedDate, { ...draft, weight: draft.weight.trim() });
    setJustSaved(true);
  }, [isDirty, draft, saveDailyLog, selectedDate]);

  const hydration = useMemo(
    () => ({
      ml: draft.waterMl,
      percent: Math.min(100, Math.round((draft.waterMl / WATER_TARGET_ML) * 100)),
      remaining: Math.max(WATER_TARGET_ML - draft.waterMl, 0),
      glasses: Math.floor(draft.waterMl / GLASS_ML),
    }),
    [draft.waterMl],
  );

  return {
    today,
    medications,
    addMedication,
    selectedDate,
    info: cycleInfo(selectedDate),
    cycleInfo,
    isLogged: (date: string) => date in logs,
    windowDates,
    selectDate,
    goToToday: () => recenter(() => today),
    shiftWeek,
    shiftMonth: (n: number) => recenter((s) => addMonths(s.selectedDate, n)),
    draft,
    update,
    changeWater: (deltaMl: number) => {
      setNav((s) => ({
        ...s,
        draft: { ...s.draft, waterMl: Math.min(Math.max(s.draft.waterMl + deltaMl, 0), WATER_TARGET_ML * 2) },
      }));
      setJustSaved(false);
      setError(null);
      setNoChanges(false);
    },
    hydration,
    save,
    isDirty,
    isSaved: saved !== undefined,
    justSaved,
    error,
    noChanges,
  };
}
