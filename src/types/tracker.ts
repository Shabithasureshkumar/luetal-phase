export type CyclePhase = 'menstruation' | 'fertile' | 'ovulation' | 'luteal';

export type MoodType = 'Happy' | 'Calm' | 'Emotional' | 'Irritated' | 'Anxious';

export type CravingType = 'Sweet' | 'Chocolate' | 'Salty' | 'None';

export type WaterRetentionLevel = 'Low' | 'Moderate' | 'High';

export interface ConnectedDevice {
  id: string;
  name: string;
  type: 'watch' | 'thermometer' | 'scale';
  syncedTime: string;
  isSynced: boolean;
}

export interface WellnessMetricsData {
  sleep: string;
  mood: string;
  water: string;
  steps: string;
  weight: string;
  sexActivity: string;
}

export interface DayLogEntry {
  date: string; // YYYY-MM-DD
  displayDate: string; // e.g. "Jun 21, 2026"
  formattedLongDate: string; // e.g. "Today, 21 June 2026"
  month: string; // e.g. "Jun"
  dayNumber: number; // e.g. 21
  cycleDay: number; // e.g. 15 (or CD 1 in some views, continuous Cycle Day)
  phase: CyclePhase;
  isToday: boolean;
  isLogged: boolean;
  
  // Luteal Phase Specific Metrics
  mood: MoodType;
  weight: number; // 62.4
  weightUnit: string; // "kg"
  weightDelta: string; // "+0.6 kg vs yesterday"
  waterRetention: WaterRetentionLevel;
  waterRetentionPercent: number; // e.g. 60
  fatigueScore: number; // 8
  fatigueMax: number; // 10
  sleepHours: number; // 7.2
  sleepEfficiency: number; // 92
  sleepBarHeights: number[]; // [33, 43, 28, 40, 45, 38, 36]
  energyLevel: number; // 55
  cravings: CravingType[]; // ['Chocolate', 'Salty']
  
  // AI Insight
  aiInsightTitle: string;
  aiInsightHeading: string;
  aiInsightText: string;

  // Wellness summary
  wellnessMetrics: WellnessMetricsData;

  // Sidebar Notes
  notes: string;
  
  // Quick Log States
  flow?: string;
  symptoms?: string[];
}

export interface CycleSummaryData {
  currentPhase: string;
  ovulationDate: string;
  fertileWindow: string;
  lutealPhase: string;
}

export interface UserProfile {
  name: string;
  gender: string;
  age: number;
  avatarUrl?: string;
}
