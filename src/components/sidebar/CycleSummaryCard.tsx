import React from 'react';
import { Droplet, Sparkles, Calendar, Moon } from 'lucide-react';
import { CycleSummaryData } from '../../types/tracker';

interface CycleSummaryCardProps {
  summary: CycleSummaryData;
}

export const CycleSummaryCard: React.FC<CycleSummaryCardProps> = ({
  summary,
}) => {
  return (
    <div className="w-full">
      <h3 className="text-[15.6px] font-bold text-[#1F2937] leading-[23.4px] mb-2.5">
        Cycle Summary
      </h3>

      <div className="space-y-2.5">
        {/* 1. Current Phase */}
        <div className="flex items-center gap-2.5 p-3 rounded-[14.4px] bg-[#FEF2F2] border-[1.2px] border-[#FEE2E2]">
          <div className="w-[33.6px] h-[33.6px] rounded-full bg-[#FEE2E2] text-[#EF4444] flex items-center justify-center shrink-0">
            <Droplet className="w-4 h-4 fill-current" />
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] font-normal text-[#6B7280] leading-[18px]">
              Current Phase
            </span>
            <span className="text-[14.4px] font-bold text-[#EF4444] leading-[21.6px]">
              {summary.currentPhase === 'Luteal Phase' ? 'Menstruation' : summary.currentPhase}
            </span>
          </div>
        </div>

        {/* 2. Ovulation */}
        <div className="flex items-center gap-2.5 p-3 rounded-[14.4px] bg-[#F9FAFB] border-[1.2px] border-[#F3F4F6]">
          <div className="w-[33.6px] h-[33.6px] rounded-full bg-[#DCFCE7] text-[#22C55E] flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 fill-[#22C55E]" />
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] font-normal text-[#6B7280] leading-[18px]">
              Ovulation
            </span>
            <span className="text-[13.2px] font-semibold text-[#374151] leading-[19.8px]">
              Predicted on
            </span>
            <span className="text-[12px] font-normal text-[#6B7280] leading-[18px]">
              {summary.ovulationDate}
            </span>
          </div>
        </div>

        {/* 3. Fertile Window */}
        <div className="flex items-center gap-2.5 p-3 rounded-[14.4px] bg-[#F9FAFB] border-[1.2px] border-[#F3F4F6]">
          <div className="w-[33.6px] h-[33.6px] rounded-full bg-[#DBEAFE] text-[#3B82F6] flex items-center justify-center shrink-0">
            <Calendar className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] font-normal text-[#6B7280] leading-[18px]">
              Fertile Window
            </span>
            <span className="text-[13.2px] font-semibold text-[#374151] leading-[19.8px]">
              {summary.fertileWindow}
            </span>
          </div>
        </div>

        {/* 4. Luteal Phase */}
        <div className="flex items-center gap-2.5 p-3 rounded-[14.4px] bg-[#F9FAFB] border-[1.2px] border-[#F3F4F6]">
          <div className="w-[33.6px] h-[33.6px] rounded-full bg-[#F3E8FF] text-[#A855F7] flex items-center justify-center shrink-0">
            <Moon className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] font-normal text-[#6B7280] leading-[18px]">
              Luteal Phase
            </span>
            <span className="text-[13.2px] font-semibold text-[#374151] leading-[19.8px]">
              {summary.lutealPhase}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
