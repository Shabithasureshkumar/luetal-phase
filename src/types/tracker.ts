export type CyclePhase = 'menstruation' | 'follicular' | 'fertile' | 'ovulation' | 'luteal';

export interface PatientProfile {
  /** Placeholder until backend patient records are wired in */
  id: string;
  name: string;
  age: number;
  gender: string;
  heightCm: number;
  weightKg: number;
  cycleLengthDays: number;
  bmi: number;
}

export type MoodType = 'Happy' | 'Calm' | 'Neutral' | 'Irritable' | 'Sad';
export type FatigueLevel = 'None' | 'Mild' | 'Moderate' | 'High';
export type SleepQuality = 'Poor' | 'Fair' | 'Good' | 'Excellent';
export type EnergyLevel = 'Low' | 'Moderate' | 'High';
export type CravingLevel = 'None' | 'Mild' | 'Moderate' | 'High';
export type MedicationStatus = 'taken' | 'skipped' | null;

export interface Medication {
  id: string;
  name: string;
  /** Dosage, e.g. "400 mg" */
  dose: string;
  /** Medication type, e.g. "Capsule" */
  form: string;
  /** e.g. "Once daily"; '' when not scheduled */
  frequency: string;
  /** Scheduled time as "HH:MM" (24h); '' when not set */
  time: string;
  /** ISO dates bounding the schedule; '' = open-ended */
  startDate: string;
  endDate: string;
  reminder: boolean;
}

/** Everything recorded on the Daily Log for one calendar date. */
export interface DailyLogData {
  mood: MoodType | null;
  weight: string;
  medications: Record<string, MedicationStatus>;
  fatigue: FatigueLevel | null;
  sleep: SleepQuality | null;
  energy: EnergyLevel | null;
  cravings: CravingLevel | null;
  stepGoal: number;
  steps: number;
  waterMl: number;
}

export type FlowLevel = 'Spotting' | 'Light' | 'Medium' | 'Heavy';
export type CrampsLevel = 'None' | 'Mild' | 'Moderate' | 'Severe';

/** A "Log Period" entry for one calendar date. */
export interface PeriodLog {
  flow: FlowLevel;
  cramps: CrampsLevel;
  clots: boolean;
  notes: string;
}

export interface MedicationHistoryEntry {
  id: string;
  name: string;
  dose: string;
  date: string;
  time: string;
  phase: string;
}
