import React from 'react';
import { Activity } from 'lucide-react';

interface EnergyLevelCardProps {
  level?: number;
}

export const EnergyLevelCard: React.FC<EnergyLevelCardProps> = ({
  level = 55,
}) => {
  return (
    <div className="w-full bg-white rounded-[24px] sm:rounded-[36px] lg:rounded-[48px] p-4 sm:p-5 lg:p-4 xl:p-6 border-[3px] sm:border-[4px] lg:border-[6px] border-[#F5F4F4] shadow-xs flex flex-col justify-between lg:h-[203px]">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between">
          <span className="text-[clamp(10px,1.1vw,12px)] font-normal tracking-[1.2px] uppercase text-[#6B6578]">
            ENERGY LEVEL
          </span>
          <Activity className="w-3.5 h-3.5 text-[#B01163]" />
        </div>

        {/* Value */}
        <div className="flex items-baseline gap-0.5 mt-0.5">
          <span className="text-[clamp(24px,3vw,36px)] font-semibold text-[#1C1923] tracking-[-0.16px] leading-tight lg:leading-[40px]">
            {level}
          </span>
          <span className="text-[clamp(16px,2vw,20px)] font-semibold text-[#6B6578] leading-tight lg:leading-[28px]">
            %
          </span>
        </div>
      </div>

      {/* Horizontal Wide Rounded Progress Bar */}
      <div className="my-2 sm:my-3 lg:my-1">
        <div className="w-full h-[clamp(32px,4vw,53px)] bg-[#F9F3F6] rounded-full overflow-hidden flex items-center p-1">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#FF80B2] to-[#FFC0D2] transition-all duration-500"
            style={{ width: `${Math.min(100, Math.max(0, level))}%` }}
          />
        </div>
      </div>

      {/* Subtext */}
      <div className="text-[clamp(10px,1.1vw,12px)] font-normal text-[#6B6578] tracking-[-0.16px]">
        Gradual decline expected
      </div>
    </div>
  );
};
