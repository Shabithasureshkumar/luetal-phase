import React from 'react';
import { Moon } from 'lucide-react';

interface SleepQualityCardProps {
  hours?: number;
  efficiency?: number;
}

export const SleepQualityCard: React.FC<SleepQualityCardProps> = ({
  hours = 7.2,
  efficiency = 92,
}) => {
  const barHeights = [33.6, 43.2, 28.8, 40.8, 45.6, 38.4, 36.0];

  return (
    <div className="w-full h-[203px] bg-white rounded-[48px] p-6 border-[6px] border-[#F5F4F4] shadow-xs flex flex-col justify-between">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-normal tracking-[1.2px] uppercase text-[#6B6578]">
            SLEEP QUALITY
          </span>
          <Moon className="w-3.5 h-3.5 text-[#B01163]" />
        </div>

        {/* Value */}
        <div className="flex items-baseline gap-0.5 mt-0.5">
          <span className="text-[36px] font-semibold text-[#1C1923] tracking-[-0.16px] leading-[40px]">
            {hours.toFixed(1)}
          </span>
          <span className="text-[20px] font-semibold text-[#6B6578] leading-[28px]">
            h
          </span>
        </div>
      </div>

      {/* 7 Vertical Capsule Bars */}
      <div className="flex items-end justify-between gap-1.5 py-0.5">
        {barHeights.map((h, i) => {
          const heightPercent = Math.round((h / 48) * 100);
          return (
            <div
              key={i}
              className="flex-1 h-[48px] bg-[#FFEAF2] rounded-full overflow-hidden flex flex-col justify-end"
            >
              <div
                className="w-full rounded-full bg-gradient-to-t from-[#FF7AA4] to-[#E9ABCB]"
                style={{ height: `${heightPercent}%` }}
              />
            </div>
          );
        })}
      </div>

      {/* Efficiency text */}
      <div className="text-[12px] font-normal text-[#6B6578] tracking-[-0.16px]">
        Restful · {efficiency}% efficiency
      </div>
    </div>
  );
};
