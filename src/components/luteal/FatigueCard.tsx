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
    <div className="w-full bg-white rounded-[24px] sm:rounded-[36px] lg:rounded-[48px] p-4 sm:p-5 lg:p-4 xl:p-6 border-[3px] sm:border-[4px] lg:border-[6px] border-[#F5F4F4] shadow-xs flex items-center justify-between relative overflow-hidden lg:h-[203px] min-h-[135px] sm:min-h-[155px]">
      {/* Left Data Section */}
      <div className="flex flex-col justify-center h-full z-10 shrink-0">
        <div className="flex items-center gap-1">
          <span className="text-[clamp(10px,1.1vw,12px)] font-normal tracking-[1.2px] uppercase text-[#6B6578]">
            FATIGUE
          </span>
          <Zap className="w-3.5 h-3.5 text-[#B01163] fill-[#B01163]" />
        </div>

        <div className="flex items-baseline gap-0.5 mt-1 sm:mt-2">
          <span className="text-[clamp(24px,3vw,34px)] font-bold text-black leading-tight sm:leading-[28px]">
            {score}
          </span>
          <span className="text-[clamp(16px,2vw,20px)] font-semibold text-[#6B6578] leading-tight sm:leading-[28px]">
            /{maxScore}
          </span>
        </div>
      </div>

      {/* Right Meditating Character Image - Proportionately enlarged to fill available area */}
      <div className="flex-1 flex items-center justify-center relative select-none min-w-0 pl-2 sm:pl-3 h-full">
        <img
          src={fatigueImage}
          alt="Fatigue Meditation Character"
          className="h-[clamp(110px,25vw,165px)] w-full max-w-[clamp(120px,28vw,195px)] object-contain object-center drop-shadow-xs pointer-events-none"
        />
      </div>
    </div>
  );
};