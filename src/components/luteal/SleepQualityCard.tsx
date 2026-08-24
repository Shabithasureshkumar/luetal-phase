import React from 'react';
import { Moon } from 'lucide-react';

interface SleepQualityCardProps {
  hours?: number;
  efficiency?: number;
  barHeights?: number[];
}

export const SleepQualityCard: React.FC<SleepQualityCardProps> = ({
  hours = 7.2,
  efficiency = 92,
  barHeights = [33.6, 43.2, 28.8, 40.8, 45.6, 38.4, 36.0],
}) => {
  return (
    <div className="w-full bg-white rounded-[24px] sm:rounded-[36px] lg:rounded-[48px] p-4 sm:p-5 lg:p-4 xl:p-6 border-[3px] sm:border-[4px] lg:border-[6px] border-[#F5F4F4] shadow-xs flex flex-col justify-between lg:h-[203px]">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between">
          <span className="text-[clamp(10px,1.2vw,12px)] font-normal tracking-[1.2px] uppercase text-[#6B6578]">
            SLEEP QUALITY
          </span>
          <Moon className="w-3.5 h-3.5 text-[#B01163]" />
        </div>

        {/* Value */}
        <div className="flex items-baseline gap-0.5 mt-0.5">
          <span className="text-[clamp(24px,3vw,36px)] font-semibold text-[#1C1923] tracking-[-0.16px] leading-tight lg:leading-[40px]">
            {hours.toFixed(1)}
          </span>
          <span className="text-[clamp(16px,2vw,20px)] font-semibold text-[#6B6578] leading-tight lg:leading-[28px]">
            h
          </span>
        </div>
      </div>

      {/* 7 Vertical Capsule Bars */}
      <div className="flex items-end justify-between gap-1 sm:gap-1.5 py-1.5 sm:py-2">
        {barHeights.map((h, i) => {
          const heightPercent = Math.round((h / 48) * 100);
          return (
            <div
              key={i}
              className="flex-1 max-w-[28px] lg:max-w-[32px] h-[clamp(34px,4.5vw,48px)] bg-[#FFEAF2] rounded-full overflow-hidden flex flex-col justify-end"
            >
              <div
                className="w-full rounded-full bg-gradient-to-t from-[#FF7AA4] to-[#E9ABCB] transition-all duration-300"
                style={{ height: `${heightPercent}%` }}
              />
            </div>
          );
        })}
      </div>

      {/* Efficiency text */}
      <div className="text-[clamp(10px,1.2vw,12px)] font-normal text-[#6B6578] tracking-[-0.16px]">
        Restful · {efficiency}% efficiency
      </div>
    </div>
  );
};
