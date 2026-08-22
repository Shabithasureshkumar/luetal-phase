import React from 'react';
import { Droplet } from 'lucide-react';
import { DayLogEntry, MoodType, CravingType } from '../../types/tracker';
import { MoodTracker } from './MoodTracker';
import { BodyWeightCard } from './BodyWeightCard';
import { FatigueCard } from './FatigueCard';
import { SleepQualityCard } from './SleepQualityCard';
import { EnergyLevelCard } from './EnergyLevelCard';
import { CravingsCard } from './CravingsCard';
import { LutealInsightCard } from './LutealInsightCard';

interface LutealPhasePageProps {
  day: DayLogEntry;
  onUpdateMood: (mood: MoodType) => void;
  onToggleCraving: (craving: CravingType) => void;
}

export const LutealPhasePage: React.FC<LutealPhasePageProps> = ({
  day,
  onUpdateMood,
  onToggleCraving,
}) => {
  return (
    <section className="w-full bg-[#FFDEE9] rounded-[32px] p-8 border border-[#EBE6EC] shadow-[0px_8px_24px_rgba(173,149,178,0.06),0px_1px_2px_rgba(173,149,178,0.04)] relative">
      {/* Header */}
      <div className="flex items-center gap-3.5 mb-7">
        <div className="w-[44px] h-[44px] rounded-[18px] bg-white/70 backdrop-blur-md border border-white/70 shadow-[0px_10px_40px_-12px_rgba(183,110,199,0.18)] flex items-center justify-center text-[#B01163]">
          <Droplet className="w-5 h-5 fill-[#B01163]" />
        </div>
        <div>
          <h2 className="text-[24px] font-bold text-[#26214E] tracking-[-0.75px] leading-[36px]">
            Luteal Phase
          </h2>
          <p className="text-[14px] font-normal text-[#716D8D] leading-[20px]">
            {day.formattedLongDate}
          </p>
        </div>
      </div>

      {/* 3 Rows of Cards */}
      <div className="space-y-6">
        {/* ROW 1: Mood Tracker & Body Weight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 flex">
            <MoodTracker
              currentMood={day.mood}
              onSelectMood={onUpdateMood}
            />
          </div>
          <div className="lg:col-span-5 flex">
            <BodyWeightCard
              weight={day.weight}
              weightUnit={day.weightUnit}
              weightDelta={day.weightDelta}
              waterRetention={day.waterRetention}
              waterRetentionPercent={day.waterRetentionPercent}
            />
          </div>
        </div>

        {/* ROW 2: Fatigue, Sleep Quality, Energy Level */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex">
            <FatigueCard
              score={day.fatigueScore}
              maxScore={day.fatigueMax}
            />
          </div>
          <div className="flex">
            <SleepQualityCard
              hours={day.sleepHours}
              efficiency={day.sleepEfficiency}
            />
          </div>
          <div className="flex">
            <EnergyLevelCard level={day.energyLevel} />
          </div>
        </div>

        {/* ROW 3: Cravings & AI Insight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 flex">
            <CravingsCard
              selectedCravings={day.cravings}
              onToggleCraving={onToggleCraving}
            />
          </div>
          <div className="lg:col-span-6 flex">
            <LutealInsightCard
              title={day.aiInsightTitle}
              heading={day.aiInsightHeading}
              description={day.aiInsightText}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
