import React from 'react';
import { Smile, Cloud, CloudRain, Frown, Wind, Moon } from 'lucide-react';
import { MoodType } from '../../types/tracker';

interface MoodTrackerProps {
  currentMood: MoodType;
  onSelectMood: (mood: MoodType) => void;
}

interface MoodOption {
  id: MoodType;
  label: string;
  icon: React.ReactNode;
}

export const MoodTracker: React.FC<MoodTrackerProps> = ({
  currentMood = 'Calm',
  onSelectMood,
}) => {
  const moodOptions: MoodOption[] = [
    {
      id: 'Happy',
      label: 'Happy',
      icon: <Smile className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 stroke-[1.8]" />,
    },
    {
      id: 'Calm',
      label: 'Calm',
      icon: <Cloud className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 stroke-[1.8]" />,
    },
    {
      id: 'Emotional',
      label: 'Emotional',
      icon: <CloudRain className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 stroke-[1.8]" />,
    },
    {
      id: 'Irritated',
      label: 'Irritated',
      icon: <Frown className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 stroke-[1.8]" />,
    },
    {
      id: 'Anxious',
      label: 'Anxious',
      icon: <Wind className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 stroke-[1.8]" />,
    },
  ];

  const getMoodHeading = (mood: MoodType) => {
    switch (mood) {
      case 'Happy':
        return 'Feeling happy';
      case 'Calm':
        return 'Feeling calm';
      case 'Emotional':
        return 'Feeling emotional';
      case 'Irritated':
        return 'Feeling irritated';
      case 'Anxious':
        return 'Feeling anxious';
      default:
        return 'Feeling calm';
    }
  };

  return (
    <div className="w-full bg-gradient-to-br from-[#FFEEF7] to-[#FFFFFF] rounded-[24px] sm:rounded-[36px] lg:rounded-[48px] p-4 sm:p-5 lg:p-6 border-[3px] sm:border-[4px] lg:border-[6px] border-[#F5F4F4] shadow-xs flex flex-col justify-between lg:h-[233px]">
      {/* Top Header */}
      <div className="flex items-start justify-between">
        <div>
          <span className="text-[10px] sm:text-[11px] lg:text-[12px] font-normal tracking-[1.2px] uppercase text-[#B01163]/70 block">
            MOOD TRACKER
          </span>
          <h3 className="text-lg sm:text-2xl lg:text-[30px] font-semibold text-[#66034D] tracking-[-0.75px] leading-tight lg:leading-[36px] mt-0.5 sm:mt-1">
            {getMoodHeading(currentMood)}
          </h3>
        </div>

        <div className="text-[#B01163] pt-0.5 sm:pt-1">
          <Moon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 stroke-[1.6]" />
        </div>
      </div>

      {/* 5 Mood Option Buttons in a Row */}
      <div className="grid grid-cols-5 gap-1 sm:gap-2 lg:gap-2.5 mt-3 sm:mt-4 lg:mt-0">
        {moodOptions.map((option) => {
          const isSelected = currentMood === option.id;
          return (
            <button
              key={option.id}
              onClick={() => onSelectMood(option.id)}
              className={`h-[54px] sm:h-[66px] lg:h-[76px] rounded-[18px] sm:rounded-[28px] lg:rounded-[40px] px-1 py-1.5 sm:py-2.5 lg:p-4 flex flex-col items-center justify-center transition-all duration-200 ${
                isSelected
                  ? 'bg-white text-[#B01163] shadow-[0px_2px_7.5px_-2px_rgba(195,38,119,0.25),0px_4px_10.8px_-1px_rgba(226,17,142,0.35)] scale-[1.02]'
                  : 'bg-white/40 hover:bg-white/70 text-[#9E165E]/70'
              }`}
            >
              <div className="mb-0.5 sm:mb-1 flex items-center justify-center shrink-0">
                {option.icon}
              </div>
              <span className="text-[9.5px] sm:text-[11px] lg:text-[12px] font-normal tracking-tight leading-none text-center">
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
