import React from 'react';
import { Zap } from 'lucide-react';
import profile2 from '../../assets/profile 2.png';

interface FatigueCardProps {
  score?: number;
  maxScore?: number;
}

export const FatigueCard: React.FC<FatigueCardProps> = ({
  score = 8,
  maxScore = 10,
}) => {
  return (
    <div className="relative flex h-[203px] w-full overflow-hidden rounded-[48px] border-[6px] border-[#F5F4F4] bg-white p-6 shadow-xs">
      
      {/* Left Data Section */}
      <div className="z-10 flex h-full flex-col justify-start pt-1">
        <div className="flex items-center gap-1">
          <span className="text-[12px] font-normal tracking-[1.2px] uppercase text-[#6B6578]">
            FATIGUE
          </span>

          <Zap className="h-3.5 w-3.5 fill-[#B01163] text-[#B01163]" />
        </div>

        <div className="mt-2 flex items-baseline gap-0.5">
          <span className="text-[32px] font-bold leading-[28px] text-black">
            {score}
          </span>

          <span className="text-[20px] font-semibold leading-[28px] text-[#6B6578]">
            /{maxScore}
          </span>
        </div>
      </div>

      {/* Right Illustration */}
      <div className="absolute right-0 top-1/2 flex h-[170px] w-[170px] -translate-y-1/2 items-center justify-center overflow-hidden">
        <img
          src={profile2}
          alt="Fatigue illustration"
          className="w-[280px] max-w-none object-contain"
        />
      </div>
    </div>
  );
};