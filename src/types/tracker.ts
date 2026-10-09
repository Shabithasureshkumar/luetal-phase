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

export type LutealSymptom =
  | 'Mood changes'
  | 'Bloating'
  | 'Breast tenderness'
  | 'Food cravings'
  | 'Fatigue'
  | 'Headache'
  | 'Acne'
  | 'Cramps'
  | 'Trouble sleeping'
  | 'Other';

export type ProtectionMethod = 'Pill' | 'Condom' | 'None' | 'Other';

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
  /** Cycle phase detected for this date at the time the log was saved */
  phase: CyclePhase | null;
  /** Luteal symptom tracking */
  symptoms: LutealSymptom[];
  /** "No symptoms today" — mutually exclusive with `symptoms` */
  noSymptoms: boolean;
  /** Free text, required when `symptoms` includes "Other" */
  customSymptom: string;
  /** Optional 0 (none) – 10 (worst) */
  symptomSeverity: number | null;
  /** null = not answered (never assumed to mean "No") */
  intercourse: boolean | null;
  protection: ProtectionMethod | null;
  /** Free text, required when protection is "Other" */
  protectionOther: string;
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
