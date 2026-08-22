import React from 'react';
import { Activity } from 'lucide-react';

interface EnergyLevelCardProps {
  level?: number;
}

export const EnergyLevelCard: React.FC<EnergyLevelCardProps> = ({
  level = 55,
}) => {
  return (
    <div className="w-full h-[203px] bg-white rounded-[48px] p-6 border-[6px] border-[#F5F4F4] shadow-xs flex flex-col justify-between">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-normal tracking-[1.2px] uppercase text-[#6B6578]">
            ENERGY LEVEL
          </span>
          <Activity className="w-3.5 h-3.5 text-[#B01163]" />
        </div>

        {/* Value */}
        <div className="flex items-baseline gap-0.5 mt-0.5">
          <span className="text-[36px] font-semibold text-[#1C1923] tracking-[-0.16px] leading-[40px]">
            {level}
          </span>
          <span className="text-[20px] font-semibold text-[#6B6578] leading-[28px]">
            %
          </span>
        </div>
      </div>

      {/* Horizontal Wide Rounded Progress Bar */}
      <div className="my-1">
        <div className="w-full h-[53px] bg-[#F9F3F6] rounded-full overflow-hidden flex items-center">
          <div
            className="h-[53px] rounded-full bg-gradient-to-r from-[#FF80B2] to-[#FFC0D2] transition-all duration-500"
            style={{ width: `${Math.min(100, Math.max(0, level))}%` }}
          />
        </div>
      </div>
    </div>
  );
};
