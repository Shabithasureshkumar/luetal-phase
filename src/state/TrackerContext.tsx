import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import {
  CRAMPS_LEVELS,
  CRAVING_LEVELS,
  EMPTY_DAILY_LOG,
  ENERGY_LEVELS,
  FATIGUE_LEVELS,
  FLOW_LEVELS,
  LUTEAL_SYMPTOMS,
  MEDICATIONS,
  MOOD_TYPES,
  PATIENT,
  PROTECTION_METHODS,
  SAMPLE_CYCLE_DAY,
  SAMPLE_DAILY_LOG,
  SLEEP_QUALITIES,
} from '../data/cycle';
import { derivePeriodStarts, getCycleInfo } from '../lib/cycle';
import { CUSTOM_TEXT_MAX } from '../lib/lutealLog';
import { addDays, todayISO } from '../lib/date';
import type { CyclePhase, DailyLogData, Medication, MedicationStatus, PeriodLog } from '../types/tracker';
import { TrackerContext } from './trackerStore';

export interface TrackerState {
  /** Baseline period start used until the patient logs their own periods */
  cycleStart: string;
  /** Daily Log entries keyed by ISO date */
  logs: Record<string, DailyLogData>;
  /** Log Period entries keyed by ISO date */
  periods: Record<string, PeriodLog>;
  /** The patient's medication list (statuses are stored per date in `logs`) */
  medications: Medication[];
}


const STORAGE_KEY = 'cycle-tracker:v1';
const CYCLE_PHASES: readonly CyclePhase[] = ['menstruation', 'follicular', 'fertile', 'ovulation', 'luteal'];
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);

/** `value` if it is one of `allowed`, otherwise `fallback`. */
function oneOf<T extends string>(allowed: readonly T[], value: unknown, fallback: T | null): T | null {
  return allowed.find((a) => a === value) ?? fallback;
}

const num = (v: unknown, fallback: number) => (typeof v === 'number' && Number.isFinite(v) && v >= 0 ? v : fallback);

function restoreLog(raw: Record<string, unknown>): DailyLogData {
  const medications: Record<string, MedicationStatus> = {};
  if (isRecord(raw.medications)) {
    for (const [id, status] of Object.entries(raw.medications)) {
      medications[id] = status === 'taken' || status === 'skipped' ? status : null;
    }
  }
  return {
    mood: oneOf(MOOD_TYPES, raw.mood, null),
    weight: typeof raw.weight === 'string' ? raw.weight : '',
    medications,
    fatigue: oneOf(FATIGUE_LEVELS, raw.fatigue, null),
    sleep: oneOf(SLEEP_QUALITIES, raw.sleep, null),
    energy: oneOf(ENERGY_LEVELS, raw.energy, null),
    cravings: oneOf(CRAVING_LEVELS, raw.cravings, null),
    stepGoal: num(raw.stepGoal, EMPTY_DAILY_LOG.stepGoal),
    steps: num(raw.steps, 0),
    waterMl: num(raw.waterMl, 0),
    phase: oneOf(CYCLE_PHASES, raw.phase, null),
    symptoms: Array.isArray(raw.symptoms)
      ? LUTEAL_SYMPTOMS.filter((s) => (raw.symptoms as unknown[]).includes(s))
      : [],
    noSymptoms: raw.noSymptoms === true,
    customSymptom: typeof raw.customSymptom === 'string' ? raw.customSymptom.slice(0, CUSTOM_TEXT_MAX) : '',
    symptomSeverity:
      typeof raw.symptomSeverity === 'number' && Number.isInteger(raw.symptomSeverity) && raw.symptomSeverity >= 0 && raw.symptomSeverity <= 10
        ? raw.symptomSeverity
        : null,
    intercourse: typeof raw.intercourse === 'boolean' ? raw.intercourse : null,
    protection: oneOf(PROTECTION_METHODS, raw.protection, null),
    protectionOther: typeof raw.protectionOther === 'string' ? raw.protectionOther.slice(0, CUSTOM_TEXT_MAX) : '',
  };
}

function restorePeriod(raw: Record<string, unknown>): PeriodLog | null {
  const flow = oneOf(FLOW_LEVELS, raw.flow, null);
  const cramps = oneOf(CRAMPS_LEVELS, raw.cramps, null);
  if (!flow || !cramps) return null;
  return { flow, cramps, clots: raw.clots === true, notes: typeof raw.notes === 'string' ? raw.notes : '' };
}

/** Rebuild persisted state field by field so stale or hand-edited storage can never crash the UI. */
function restore(raw: unknown): TrackerState | null {
  if (!isRecord(raw) || typeof raw.cycleStart !== 'string' || !ISO_DATE.test(raw.cycleStart)) return null;

  const logs: Record<string, DailyLogData> = {};
  if (isRecord(raw.logs)) {
    for (const [date, log] of Object.entries(raw.logs)) {
      if (ISO_DATE.test(date) && isRecord(log)) logs[date] = restoreLog(log);
    }
  }

  const periods: Record<string, PeriodLog> = {};
  if (isRecord(raw.periods)) {
    for (const [date, log] of Object.entries(raw.periods)) {
      const period = ISO_DATE.test(date) && isRecord(log) ? restorePeriod(log) : null;
      if (period) periods[date] = period;
    }
  }

  const str = (v: unknown) => (typeof v === 'string' ? v : '');
  const medications: Medication[] = Array.isArray(raw.medications)
    ? raw.medications.flatMap((m: unknown) =>
        isRecord(m) && typeof m.id === 'string' && typeof m.name === 'string'
          ? [
              {
                id: m.id,
                name: m.name,
                dose: str(m.dose),
                form: str(m.form),
                frequency: str(m.frequency),
                time: /^\d{2}:\d{2}$/.test(str(m.time)) ? str(m.time) : '',
                startDate: ISO_DATE.test(str(m.startDate)) ? str(m.startDate) : '',
                endDate: ISO_DATE.test(str(m.endDate)) ? str(m.endDate) : '',
                reminder: m.reminder === true,
              },
            ]
          : [],
      )
    : MEDICATIONS;

  return { cycleStart: raw.cycleStart, logs, periods, medications };
}

function initialState(today: string): TrackerState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const restored = raw ? restore(JSON.parse(raw)) : null;
    if (restored) return restored;
  } catch {
    // storage unavailable or corrupt — fall back to the demo seed
  }
  return {
    cycleStart: addDays(today, -(SAMPLE_CYCLE_DAY - 1)),
    logs: { [today]: SAMPLE_DAILY_LOG },
    periods: {},
    medications: MEDICATIONS,
  };
}

export function TrackerProvider({ children }: { children: ReactNode }) {
  const [today, setToday] = useState(todayISO);
  const [state, setState] = useState(() => initialState(today));
  // Latest state, so a save can be written to storage synchronously and its result reported
  const stateRef = useRef(state);
  stateRef.current = state;
  // The date being viewed in Daily Log; Overview's log summaries follow it (session only)
  const [selectedDate, setSelectedDate] = useState(today);

  // Roll "today" over at midnight (or when a backgrounded tab becomes visible again)
  useEffect(() => {
    const refresh = () => setToday(todayISO());
    const timer = window.setInterval(refresh, 60_000);
    document.addEventListener('visibilitychange', refresh);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', refresh);
    };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // non-fatal: data stays in memory for this session
    }
  }, [state]);

  const starts = useMemo(
    () => derivePeriodStarts(state.cycleStart, state.periods, PATIENT.cycleLengthDays),
    [state.cycleStart, state.periods],
  );

  /** Saves one date's log (one record per date — re-saving replaces it). Returns false if storage failed. */
  const saveDailyLog = useCallback((date: string, log: DailyLogData) => {
    const next = { ...stateRef.current, logs: { ...stateRef.current.logs, [date]: log } };
    stateRef.current = next;
    setState(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return true;
    } catch {
      return false;
    }
  }, []);

  const savePeriodLog = useCallback((date: string, log: PeriodLog) => {
    setState((s) => ({ ...s, periods: { ...s.periods, [date]: log } }));
  }, []);

  const addMedication = useCallback((medication: Omit<Medication, 'id'>) => {
    setState((s) => ({
      ...s,
      medications: [...s.medications, { ...medication, id: `med-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}` }],
    }));
  }, []);

  const cycleInfo = useCallback((date: string) => getCycleInfo(date, starts, PATIENT.cycleLengthDays), [starts]);

  const api = useMemo(
    () => ({ ...state, today, selectedDate, selectDate: setSelectedDate, saveDailyLog, savePeriodLog, addMedication, cycleInfo }),
    [state, today, selectedDate, saveDailyLog, savePeriodLog, addMedication, cycleInfo],
  );

  return <TrackerContext.Provider value={api}>{children}</TrackerContext.Provider>;
}
