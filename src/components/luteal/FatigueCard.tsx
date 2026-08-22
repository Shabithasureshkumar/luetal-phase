import React from 'react';
import { Zap } from 'lucide-react';
import fatigueImage from '../../assets/profile 2.png';

interface FatigueCardProps {
  score?: number;
  maxScore?: number;
}

export const FatigueCard: React.FC<FatigueCardProps> = ({
  score = 8,
  maxScore = 10,
}) => {
  return (
    <div className="w-full bg-white rounded-[24px] sm:rounded-[36px] lg:rounded-[48px] p-4 sm:p-5 lg:p-6 border-[3px] sm:border-[4px] lg:border-[6px] border-[#F5F4F4] shadow-xs flex items-center justify-between relative overflow-hidden lg:h-[203px] min-h-[130px] sm:min-h-[150px]">
      {/* Left Data Section */}
      <div className="flex flex-col justify-center h-full z-10 shrink-0 pr-2">
        <div className="flex items-center gap-1">
          <span className="text-[10px] sm:text-[11px] lg:text-[12px] font-normal tracking-[1.2px] uppercase text-[#6B6578]">
            FATIGUE
          </span>
          <Zap className="w-3.5 h-3.5 text-[#B01163] fill-[#B01163]" />
        </div>

        <div className="flex items-baseline gap-0.5 mt-1 sm:mt-2">
          <span className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-black leading-tight sm:leading-[28px]">
            {score}
          </span>
          <span className="text-base sm:text-lg lg:text-[20px] font-semibold text-[#6B6578] leading-tight sm:leading-[28px]">
            /{maxScore}
          </span>
        </div>
      </div>

      {/* Right Meditating Character Image - Prominently Scaled & Responsive */}
      <div className="w-[50%] max-w-[155px] sm:max-w-[170px] lg:max-w-[185px] h-[110px] sm:h-[130px] lg:h-[155px] flex items-center justify-end relative select-none shrink-0 -mr-1">
        <img
          src={fatigueImage}
          alt="Fatigue Meditation Character"
          className="w-full h-full object-contain object-right drop-shadow-xs"
        />
      </div>
    </div>
  );
};