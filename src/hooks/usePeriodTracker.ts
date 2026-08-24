import { useState, useCallback, useMemo } from 'react';
import {
  DayLogEntry,
  MoodType,
  CravingType,
  ConnectedDevice,
  UserProfile,
  WellnessMetricsData,
} from '../types/tracker';

const INITIAL_DAYS: DayLogEntry[] = [
  {
    date: '2026-06-18',
    displayDate: 'Jun 18, 2026',
    formattedLongDate: 'Jun 18, 2026',
    month: 'Jun',
    dayNumber: 18,
    cycleDay: 12,
    phase: 'fertile',
    isToday: false,
    isLogged: true,
    mood: 'Happy',
    weight: 61.8,
    weightUnit: 'kg',
    weightDelta: '-0.2 kg vs yesterday',
    waterRetention: 'Low',
    waterRetentionPercent: 25,
    fatigueScore: 4,
    fatigueMax: 10,
    sleepHours: 7.8,
    sleepEfficiency: 95,
    sleepBarHeights: [38, 45, 42, 44, 46, 40, 42],
    energyLevel: 80,
    cravings: ['Sweet'],
    aiInsightTitle: 'AI INSIGHT',
    aiInsightHeading: 'Estrogen Peak',
    aiInsightText: 'Estrogen levels are peaking. High energy, clearer focus, and vibrant mood are common right now.',
    wellnessMetrics: {
      sleep: '7.8 hrs',
      mood: 'Happy',
      water: '2.5 / 2.5 L',
      steps: '8,420',
      weight: '61.8 kg',
      sexActivity: 'Logged',
    },
    notes: 'Felt very energetic and had a great morning jog.',
  },
  {
    date: '2026-06-19',
    displayDate: 'Jun 19, 2026',
    formattedLongDate: 'Jun 19, 2026',
    month: 'Jun',
    dayNumber: 19,
    cycleDay: 13,
    phase: 'fertile',
    isToday: false,
    isLogged: true,
    mood: 'Happy',
    weight: 61.9,
    weightUnit: 'kg',
    weightDelta: '+0.1 kg vs yesterday',
    waterRetention: 'Low',
    waterRetentionPercent: 30,
    fatigueScore: 5,
    fatigueMax: 10,
    sleepHours: 7.5,
    sleepEfficiency: 94,
    sleepBarHeights: [35, 42, 40, 42, 44, 38, 40],
    energyLevel: 75,
    cravings: ['None'],
    aiInsightTitle: 'AI INSIGHT',
    aiInsightHeading: 'LH Surge Approaching',
    aiInsightText: 'Your body is preparing for ovulation. You may feel heightened sensory awareness and social drive.',
    wellnessMetrics: {
      sleep: '7.5 hrs',
      mood: 'Happy',
      water: '2.4 / 2.5 L',
      steps: '7,890',
      weight: '61.9 kg',
      sexActivity: 'Logged',
    },
    notes: 'Good focus throughout the workday.',
  },
  {
    date: '2026-06-20',
    displayDate: 'Jun 20, 2026',
    formattedLongDate: 'Jun 20, 2026',
    month: 'Jun',
    dayNumber: 20,
    cycleDay: 14,
    phase: 'ovulation',
    isToday: false,
    isLogged: true,
    mood: 'Happy',
    weight: 61.8,
    weightUnit: 'kg',
    weightDelta: '-0.1 kg vs yesterday',
    waterRetention: 'Low',
    waterRetentionPercent: 35,
    fatigueScore: 5,
    fatigueMax: 10,
    sleepHours: 7.6,
    sleepEfficiency: 93,
    sleepBarHeights: [36, 44, 38, 41, 45, 39, 41],
    energyLevel: 85,
    cravings: ['Sweet'],
    aiInsightTitle: 'AI INSIGHT',
    aiInsightHeading: 'Ovulation Day',
    aiInsightText: 'Ovulation occurs today. Basal body temperature will begin its upward shift shortly.',
    wellnessMetrics: {
      sleep: '7.6 hrs',
      mood: 'Energetic',
      water: '2.3 / 2.5 L',
      steps: '9,120',
      weight: '61.8 kg',
      sexActivity: 'Logged',
    },
    notes: 'Peak ovulation today.',
  },
  {
    date: '2026-06-21',
    displayDate: 'Jun 21, 2026',
    formattedLongDate: 'Today, 21 June 2026',
    month: 'Jun',
    dayNumber: 21,
    cycleDay: 15,
    phase: 'luteal',
    isToday: true,
    isLogged: true,
    mood: 'Calm',
    weight: 62.4,
    weightUnit: 'kg',
    weightDelta: '+0.6 kg vs yesterday',
    waterRetention: 'Moderate',
    waterRetentionPercent: 62,
    fatigueScore: 8,
    fatigueMax: 10,
    sleepHours: 7.2,
    sleepEfficiency: 92,
    sleepBarHeights: [33, 43, 29, 41, 46, 38, 36],
    energyLevel: 55,
    cravings: ['Chocolate', 'Salty'],
    aiInsightTitle: 'AI INSIGHT',
    aiInsightHeading: 'Progesterone rising',
    aiInsightText:
      'Hormonal progesterone is increasing. Mild fatigue and mood fluctuations are expected — prioritise gentle movement and magnesium-rich foods.',
    wellnessMetrics: {
      sleep: '7.2 hrs',
      mood: 'Good',
      water: '2.1 / 2.5 L',
      steps: '6,245',
      weight: '58.5 kg',
      sexActivity: 'Not Logged',
    },
    notes: 'Felt calm and rested today, taking it easy in the evening.',
  },
  {
    date: '2026-06-22',
    displayDate: 'Jun 22, 2026',
    formattedLongDate: '22 June 2026',
    month: 'Jun',
    dayNumber: 22,
    cycleDay: 16,
    phase: 'luteal',
    isToday: false,
    isLogged: false,
    mood: 'Calm',
    weight: 62.5,
    weightUnit: 'kg',
    weightDelta: '+0.1 kg vs yesterday',
    waterRetention: 'Moderate',
    waterRetentionPercent: 65,
    fatigueScore: 7,
    fatigueMax: 10,
    sleepHours: 7.1,
    sleepEfficiency: 90,
    sleepBarHeights: [31, 40, 27, 39, 44, 36, 34],
    energyLevel: 52,
    cravings: ['Chocolate'],
    aiInsightTitle: 'AI INSIGHT',
    aiInsightHeading: 'Progesterone Sustained',
    aiInsightText:
      'Progesterone remains steady. Remember to stay hydrated and favor nutritious, balanced meals to support metabolic shifts.',
    wellnessMetrics: {
      sleep: '7.1 hrs',
      mood: 'Calm',
      water: '2.0 / 2.5 L',
      steps: '5,800',
      weight: '62.5 kg',
      sexActivity: 'Not Logged',
    },
    notes: '',
  },
  {
    date: '2026-06-23',
    displayDate: 'Jun 23, 2026',
    formattedLongDate: '23 June 2026',
    month: 'Jun',
    dayNumber: 23,
    cycleDay: 17,
    phase: 'luteal',
    isToday: false,
    isLogged: false,
    mood: 'Calm',
    weight: 62.6,
    weightUnit: 'kg',
    weightDelta: '+0.1 kg vs yesterday',
    waterRetention: 'Moderate',
    waterRetentionPercent: 68,
    fatigueScore: 7,
    fatigueMax: 10,
    sleepHours: 7.0,
    sleepEfficiency: 89,
    sleepBarHeights: [30, 38, 25, 37, 42, 35, 33],
    energyLevel: 50,
    cravings: ['Salty'],
    aiInsightTitle: 'AI INSIGHT',
    aiInsightHeading: 'Mid-Luteal Phase',
    aiInsightText:
      'Body temperature is slightly elevated. Gentle stretching and warm herbal tea can promote restorative sleep.',
    wellnessMetrics: {
      sleep: '7.0 hrs',
      mood: 'Calm',
      water: '2.2 / 2.5 L',
      steps: '6,100',
      weight: '62.6 kg',
      sexActivity: 'Not Logged',
    },
    notes: '',
  },
  {
    date: '2026-06-24',
    displayDate: 'Jun 24, 2026',
    formattedLongDate: '24 June 2026',
    month: 'Jun',
    dayNumber: 24,
    cycleDay: 18,
    phase: 'luteal',
    isToday: false,
    isLogged: false,
    mood: 'Emotional',
    weight: 62.7,
    weightUnit: 'kg',
    weightDelta: '+0.1 kg vs yesterday',
    waterRetention: 'Moderate',
    waterRetentionPercent: 70,
    fatigueScore: 8,
    fatigueMax: 10,
    sleepHours: 6.9,
    sleepEfficiency: 88,
    sleepBarHeights: [28, 36, 24, 35, 40, 34, 31],
    energyLevel: 48,
    cravings: ['Sweet', 'Chocolate'],
    aiInsightTitle: 'AI INSIGHT',
    aiInsightHeading: 'Progesterone Peak',
    aiInsightText:
      'Progesterone is at its peak. Mild mood sensitivity may occur. Taking time for mindful relaxation helps restore balance.',
    wellnessMetrics: {
      sleep: '6.9 hrs',
      mood: 'Emotional',
      water: '1.9 / 2.5 L',
      steps: '5,200',
      weight: '62.7 kg',
      sexActivity: 'Not Logged',
    },
    notes: '',
  },
];

const INITIAL_PROFILE: UserProfile = {
  name: 'Jimmy Alexa',
  gender: 'Female',
  age: 38,
};

const INITIAL_DEVICES: ConnectedDevice[] = [
  {
    id: '1',
    name: 'Smart Watch',
    type: 'watch',
    syncedTime: 'Synced · 2m ago',
    isSynced: true,
  },
  {
    id: '2',
    name: 'Thermometer',
    type: 'thermometer',
    syncedTime: 'Synced · 2m ago',
    isSynced: true,
  },
  {
    id: '3',
    name: 'Scale',
    type: 'scale',
    syncedTime: 'Synced · 2m ago',
    isSynced: true,
  },
];

export function usePeriodTracker() {
  const [days, setDays] = useState<DayLogEntry[]>(INITIAL_DAYS);
  const [selectedDate, setSelectedDate] = useState<string>('2026-06-21');
  const [profile] = useState<UserProfile>(INITIAL_PROFILE);
  const [devices] = useState<ConnectedDevice[]>(INITIAL_DEVICES);

  const selectedDay = useMemo(() => {
    return (
      days.find((d) => d.date === selectedDate) ||
      days.find((d) => d.isToday) ||
      days[0]
    );
  }, [days, selectedDate]);

  const selectDate = useCallback((dateStr: string) => {
    setSelectedDate(dateStr);
  }, []);

  const goToToday = useCallback(() => {
    const today = days.find((d) => d.isToday);
    if (today) {
      setSelectedDate(today.date);
    }
  }, [days]);

  const goToPreviousDay = useCallback(() => {
    const currentIndex = days.findIndex((d) => d.date === selectedDate);
    if (currentIndex > 0) {
      setSelectedDate(days[currentIndex - 1].date);
    }
  }, [days, selectedDate]);

  const goToNextDay = useCallback(() => {
    const currentIndex = days.findIndex((d) => d.date === selectedDate);
    if (currentIndex >= 0 && currentIndex < days.length - 1) {
      setSelectedDate(days[currentIndex + 1].date);
    }
  }, [days, selectedDate]);

  // Update specific day's mood
  const updateMood = useCallback(
    (mood: MoodType) => {
      setDays((prev) =>
        prev.map((d) => {
          if (d.date === selectedDate) {
            return {
              ...d,
              mood,
              wellnessMetrics: {
                ...d.wellnessMetrics,
                mood: mood === 'Happy' ? 'Great' : mood === 'Calm' ? 'Good' : mood,
              },
            };
          }
          return d;
        })
      );
    },
    [selectedDate]
  );

  // Update cravings (multi-select / toggle)
  const toggleCraving = useCallback(
    (craving: CravingType) => {
      setDays((prev) =>
        prev.map((d) => {
          if (d.date === selectedDate) {
            let updated: CravingType[];
            if (craving === 'None') {
              updated = ['None'];
            } else {
              const withoutNone = d.cravings.filter((c) => c !== 'None');
              if (withoutNone.includes(craving)) {
                updated = withoutNone.filter((c) => c !== craving);
                if (updated.length === 0) updated = ['None'];
              } else {
                updated = [...withoutNone, craving];
              }
            }
            return { ...d, cravings: updated };
          }
          return d;
        })
      );
    },
    [selectedDate]
  );

  // Update notes
  const updateNotes = useCallback(
    (notes: string) => {
      setDays((prev) =>
        prev.map((d) => {
          if (d.date === selectedDate) {
            return { ...d, notes };
          }
          return d;
        })
      );
    },
    [selectedDate]
  );

  // Update wellness metrics
  const updateWellnessMetrics = useCallback(
    (metrics: Partial<WellnessMetricsData>) => {
      setDays((prev) =>
        prev.map((d) => {
          if (d.date === selectedDate) {
            return {
              ...d,
              wellnessMetrics: {
                ...d.wellnessMetrics,
                ...metrics,
              },
            };
          }
          return d;
        })
      );
    },
    [selectedDate]
  );

  // Quick log without changing cycle phase
  const quickLog = useCallback(
    (actionType: 'sleep' | 'flow' | 'symptoms' | 'water' | 'mood' | 'weight') => {
      setDays((prev) =>
        prev.map((d) => {
          if (d.date === selectedDate) {
            const copy = { ...d };
            if (actionType === 'water') {
              const currentL = parseFloat(copy.wellnessMetrics.water) || 2.1;
              const nextL = (currentL + 0.25).toFixed(1);
              copy.wellnessMetrics = {
                ...copy.wellnessMetrics,
                water: `${nextL} / 2.5 L`,
              };
            } else if (actionType === 'sleep') {
              copy.sleepHours = 7.5;
              copy.wellnessMetrics = {
                ...copy.wellnessMetrics,
                sleep: '7.5 hrs',
              };
            } else if (actionType === 'mood') {
              copy.mood = 'Calm';
              copy.wellnessMetrics = {
                ...copy.wellnessMetrics,
                mood: 'Good',
              };
            } else if (actionType === 'flow') {
              copy.flow = 'Light Spotting';
            } else if (actionType === 'symptoms') {
              copy.symptoms = ['Mild Bloating', 'Tender Breasts'];
            } else if (actionType === 'weight') {
              copy.weight = 62.4;
              copy.wellnessMetrics = {
                ...copy.wellnessMetrics,
                weight: '62.4 kg',
              };
            }
            return copy;
          }
          return d;
        })
      );
    },
    [selectedDate]
  );

  const cycleSummary = useMemo(() => {
    let phaseLabel = 'Luteal Phase';
    if (selectedDay.phase === 'ovulation') phaseLabel = 'Ovulation';
    else if (selectedDay.phase === 'fertile') phaseLabel = 'Fertile Window';
    else if (selectedDay.phase === 'menstruation') phaseLabel = 'Menstruation';

    return {
      currentPhase: phaseLabel,
      ovulationDate: 'Jul 6, 2025',
      fertileWindow: 'Jul 2 – Jul 6, 2025',
      lutealPhase: 'Jul 7 – Jul 20, 2025',
    };
  }, [selectedDay.phase]);

  const insightsList = useMemo(() => {
    if (selectedDay.phase === 'luteal') {
      return [
        'Energy levels may gradually decrease.',
        'Mild bloating or water retention may occur.',
        'Mood changes can vary during progesterone shifts.',
        'Rest and hydration may support overall wellbeing.',
      ];
    } else if (selectedDay.phase === 'ovulation') {
      return [
        'You are at peak fertility today.',
        'Estrogen is high, boosting energy and mood.',
        'Light cervical fluid changes are expected.',
        'Great day for higher intensity workouts.',
      ];
    } else if (selectedDay.phase === 'fertile') {
      return [
        'You have entered your fertile window.',
        'Energy levels are rising steadily.',
        'Focus and concentration may be elevated.',
        'Stay well hydrated throughout the day.',
      ];
    } else {
      return [
        'You are on your period day 1.',
        "It's normal to feel low energy.",
        'Stay hydrated and take rest.',
        'Light exercise like walking may help with cramps.',
      ];
    }
  }, [selectedDay.phase]);

  return {
    days,
    selectedDate,
    selectedDay,
    profile,
    devices,
    cycleSummary,
    insightsList,
    selectDate,
    goToToday,
    goToPreviousDay,
    goToNextDay,
    updateMood,
    toggleCraving,
    updateNotes,
    updateWellnessMetrics,
    quickLog,
  };
}
