import React from 'react';
import { TrendingUp } from 'lucide-react';
import { WaterRetentionLevel } from '../../types/tracker';

interface BodyWeightCardProps {
  weight?: number;
  weightUnit?: string;
  weightDelta?: string;
  waterRetention?: WaterRetentionLevel;
  waterRetentionPercent?: number;
}

export const BodyWeightCard: React.FC<BodyWeightCardProps> = ({
  weight = 62.4,
  weightUnit = 'kg',
  weightDelta = '+0.6 kg vs yesterday',
  waterRetention = 'Moderate',
  waterRetentionPercent = 62,
}) => {
  return (
    <div className="w-full h-[233px] bg-white rounded-[48px] p-6 border-[6px] border-[#F5F4F4] shadow-xs flex flex-col justify-between">
      {/* Top Header */}
      <div>
        <span className="text-[12px] font-normal tracking-[1.2px] uppercase text-[#6B6578] block">
          BODY WEIGHT
        </span>

        {/* Value + Change Badge */}
        <div className="flex items-baseline justify-between mt-1">
          <div className="flex items-baseline gap-1.5">
            <span className="text-[36px] font-semibold text-[#1C1923] tracking-[-0.9px] leading-[40px]">
              {weight.toFixed(1)}
            </span>
            <span className="text-[16px] font-normal text-[#6B6578]">
              {weightUnit}
            </span>
          </div>

          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FFEAF2] text-[#B01163] text-[12px] font-normal">
            <TrendingUp className="w-3 h-3 stroke-[2.2]" />
            <span>{weightDelta}</span>
          </div>
        </div>
      </div>

      {/* Water Retention Section */}
      <div className="bg-[#FFEAF2]/50 rounded-[40px] p-4">
        <div className="flex items-center justify-between text-[12px] mb-2">
          <span className="text-[#6B6578] font-normal">Water retention</span>
          <span className="text-[#B01163] font-semibold">{waterRetention}</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-[6px] rounded-full bg-white/60 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#C0ABE9] to-[#FF46C7] transition-all duration-500"
            style={{ width: `${Math.min(100, Math.max(0, waterRetentionPercent))}%` }}
          />
        </div>
      </div>
    </div>
  );
};
