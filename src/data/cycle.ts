import type {
  CravingLevel,
  CrampsLevel,
  CyclePhase,
  DailyLogData,
  EnergyLevel,
  FatigueLevel,
  FlowLevel,
  Medication,
  MedicationHistoryEntry,
  MoodType,
  PatientProfile,
  SleepQuality,
} from '../types/tracker';

/** Allowed values for each Daily Log / Log Period choice (shared by the UI and storage validation). */
export const MOOD_TYPES: readonly MoodType[] = ['Happy', 'Calm', 'Neutral', 'Irritable', 'Sad'];
export const FATIGUE_LEVELS: readonly FatigueLevel[] = ['None', 'Mild', 'Moderate', 'High'];
export const SLEEP_QUALITIES: readonly SleepQuality[] = ['Poor', 'Fair', 'Good', 'Excellent'];
export const ENERGY_LEVELS: readonly EnergyLevel[] = ['Low', 'Moderate', 'High'];
export const CRAVING_LEVELS: readonly CravingLevel[] = ['None', 'Mild', 'Moderate', 'High'];
export const FLOW_LEVELS: readonly FlowLevel[] = ['Spotting', 'Light', 'Medium', 'Heavy'];
export const CRAMPS_LEVELS: readonly CrampsLevel[] = ['None', 'Mild', 'Moderate', 'Severe'];

export const PATIENT: PatientProfile = {
  id: 'PT-000001', // placeholder — replace with the backend patient ID
  name: 'Jimmy Alexa',
  age: 38,
  gender: 'Female',
  heightCm: 165,
  weightKg: 58,
  cycleLengthDays: 28,
  bmi: 22,
};

interface PhaseInfo {
  /** "Luteal Phase" */
  title: string;
  /** "Luteal phase" — used inline in sentences */
  label: string;
  /** "Luteal" — used in "Luteal Day 21" */
  short: string;
  heading: string;
  description: string;
  insight: string;
  /** AI Recommendation card copy on Overview */
  recommendation: string;
}

export const PHASE_INFO: Record<CyclePhase, PhaseInfo> = {
  menstruation: {
    title: 'Menstruation',
    label: 'Menstruation',
    short: 'Menstrual',
    heading: "You're on your period",
    description: 'Your body is shedding the uterine lining. You may notice cramps, lower energy and tiredness during this phase.',
    insight: "You're menstruating. Energy may be lower and cramps are common. Focus on iron-rich foods, warmth, hydration and rest.",
    recommendation:
      "You're doing great! Take rest, stay warm, and be kind to yourself. You're on your period. Energy may be lower and cramps are common. Focus on rest, hydration, iron-rich meals and gentle movement.",
  },
  follicular: {
    title: 'Follicular Phase',
    label: 'Follicular phase',
    short: 'Follicular',
    heading: "You're in your follicular phase",
    description: 'Estrogen is rising as your body prepares to ovulate. Energy, mood and focus often improve during this phase.',
    insight: "You're in your follicular phase. Rising estrogen often lifts energy and mood. A good time for more active movement.",
    recommendation:
      "You're doing great! Your energy is rising. You're in your follicular phase. Estrogen is increasing, which often lifts mood and focus. A good time for active movement, fresh foods and new goals.",
  },
  fertile: {
    title: 'Fertile Window',
    label: 'Fertile window',
    short: 'Fertile',
    heading: "You're in your fertile window",
    description: 'Ovulation is approaching. You may notice higher energy, changes in cervical fluid and a stronger libido.',
    insight: "You're in your fertile window. Energy and mood are typically high. Stay hydrated and keep a balanced routine.",
    recommendation:
      "You're doing great! You're in your fertile window. Energy and mood are often high as ovulation approaches. Stay hydrated, keep a balanced routine and track any cycle signs that matter to you.",
  },
  ovulation: {
    title: 'Ovulation',
    label: 'Ovulation',
    short: 'Ovulation',
    heading: "You're ovulating",
    description: 'An egg is being released. Some people notice mild one-sided pain or a small rise in body temperature.',
    insight: "It's ovulation day. Estrogen peaks and energy is usually at its highest. Listen to your body and stay hydrated.",
    recommendation:
      "You're doing great! It's your estimated ovulation day. Estrogen peaks and energy is often at its highest. Stay hydrated, listen to your body and enjoy higher-energy activities.",
  },
  luteal: {
    title: 'Luteal Phase',
    label: 'Luteal phase',
    short: 'Luteal',
    heading: "You're in your luteal phase",
    description:
      'Your body is preparing for menstruation. You may notice changes in mood, fatigue, cravings and sleep during this phase.',
    insight:
      "You're in your luteal phase. You may notice changes in mood, energy, sleep and cravings as progesterone peaks. Focus on magnesium, hydration, and gentle movement.",
    recommendation:
      "You're doing great! Take rest, stay hydrated, and be kind to yourself. You're in your luteal phase. You may notice changes in mood, energy, sleep and cravings as your body prepares for menstruation. Focus on rest, hydration, nourishing meals and gentle movement.",
  },
};

const UNSCHEDULED = { frequency: '', time: '', startDate: '', endDate: '', reminder: false } as const;

export const MEDICATIONS: Medication[] = [
  { id: 'ibuprofen', name: 'Ibuprofen', dose: '200 mg', form: 'Tablet', ...UNSCHEDULED },
  { id: 'mefenamic', name: 'Mefenamic Acid', dose: '500 mg', form: 'Tablet', ...UNSCHEDULED },
];

export const MEDICATION_TYPES = ['Capsule', 'Tablet', 'Syrup', 'Drops', 'Injection', 'Cream', 'Other'] as const;
export const MEDICATION_FREQUENCIES = [
  'Once daily',
  'Twice daily',
  'Three times daily',
  'Every other day',
  'Once weekly',
  'As needed',
] as const;

export const MEDICATION_HISTORY: MedicationHistoryEntry[] = Array.from({ length: 4 }, (_, i) => ({
  id: `vitd-${i}`,
  name: 'Vitamin D',
  dose: '1000 IU · Capsule',
  date: 'Sep 5, 2026',
  time: '08:00 AM',
  phase: 'Luteal',
}));

export const STEP_GOALS = [3000, 5000, 7000];
export const WATER_TARGET_ML = 2000;
export const GLASS_ML = 250;

/** State of a date with nothing logged yet. */
export const EMPTY_DAILY_LOG: DailyLogData = {
  mood: null,
  weight: '',
  medications: {},
  fatigue: null,
  sleep: null,
  energy: null,
  cravings: null,
  stepGoal: 5000,
  steps: 0,
  waterMl: 0,
};

/** Demo entry seeded for "today" on first launch (matches the design reference). */
export const SAMPLE_DAILY_LOG: DailyLogData = {
  mood: 'Irritable',
  weight: '58.8',
  medications: {},
  fatigue: 'High',
  sleep: 'Poor',
  energy: 'Low',
  cravings: 'High',
  stepGoal: 5000,
  steps: 5240,
  waterMl: 1250,
};

/** Demo baseline: today is cycle day 21 (luteal) on first launch. */
export const SAMPLE_CYCLE_DAY = 21;
