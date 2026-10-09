import { createContext, useContext } from 'react';
import type { CycleInfo } from '../lib/cycle';
import type { DailyLogData, Medication, PeriodLog } from '../types/tracker';
import type { TrackerState } from './TrackerContext';

export interface TrackerApi extends TrackerState {
  today: string;
  /** Date selected in Daily Log (shared so Overview summaries follow it) */
  selectedDate: string;
  selectDate: (date: string) => void;
  /** Returns false when the log could not be written to storage */
  saveDailyLog: (date: string, log: DailyLogData) => boolean;
  savePeriodLog: (date: string, log: PeriodLog) => void;
  addMedication: (medication: Omit<Medication, 'id'>) => void;
  cycleInfo: (date: string) => CycleInfo;
}

export const TrackerContext = createContext<TrackerApi | null>(null);

/** Access the shared tracker store (must be rendered inside <TrackerProvider>). */
export function useTracker() {
  const ctx = useContext(TrackerContext);
  if (!ctx) throw new Error('useTracker must be used inside <TrackerProvider>');
  return ctx;
}
