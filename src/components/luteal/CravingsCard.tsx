import React from 'react';
import { CravingType } from '../../types/tracker';

interface CravingsCardProps {
  selectedCravings: CravingType[];
  onToggleCraving: (craving: CravingType) => void;
}

export const CravingsCard: React.FC<CravingsCardProps> = ({
  selectedCravings = ['Chocolate', 'Salty'],
  onToggleCraving,
}) => {
  const isSelected = (item: CravingType) => selectedCravings.includes(item);

  return (
    <div className="w-full bg-white rounded-[24px] sm:rounded-[36px] lg:rounded-[48px] p-4 sm:p-5 lg:p-6 border-[3px] sm:border-[4px] lg:border-[6px] border-[#F5F4F4] shadow-xs flex flex-col justify-between lg:h-[194px]">
      {/* Top Header */}
      <div>
        <span className="text-[clamp(10px,1.1vw,12px)] font-normal tracking-[1.2px] uppercase text-[#6B6578] block mb-2 sm:mb-2.5">
          CRAVINGS
        </span>
      </div>

      {/* 2x2 Grid */}
      <div className="grid grid-cols-2 gap-2 sm:gap-2.5 lg:gap-3">
        {/* Row 1 */}
        <button
          onClick={() => onToggleCraving('Sweet')}
          className={`h-[clamp(44px,5vw,54px)] rounded-[24px] sm:rounded-[32px] lg:rounded-[40px] px-3 sm:px-4 text-[clamp(12px,1.3vw,14px)] font-normal tracking-[-0.16px] transition-all flex items-center justify-center ${
            isSelected('Sweet')
              ? 'bg-[#FFEAF2] border border-[#E9ABC6] text-[#B01163]'
              : 'bg-white border border-[#EBE6EC] text-[#6B6578] hover:bg-gray-50'
          }`}
        >
          Sweet
        </button>

        <button
          onClick={() => onToggleCraving('Chocolate')}
          className={`h-[clamp(44px,5vw,54px)] rounded-[24px] sm:rounded-[32px] lg:rounded-[40px] px-3 sm:px-4 text-[clamp(12px,1.3vw,14px)] font-normal tracking-[-0.16px] transition-all flex items-center justify-center ${
            isSelected('Chocolate')
              ? 'bg-[#FFEAF2] border border-[#E9ABC6] text-[#B01163]'
              : 'bg-white border border-[#EBE6EC] text-[#6B6578] hover:bg-gray-50'
          }`}
        >
          Chocolate
        </button>

        {/* Row 2 */}
        <button
          onClick={() => onToggleCraving('Salty')}
          className={`h-[clamp(44px,5vw,54px)] rounded-[24px] sm:rounded-[32px] lg:rounded-[40px] px-3 sm:px-4 text-[clamp(12px,1.3vw,14px)] font-normal tracking-[-0.16px] transition-all flex items-center justify-center ${
            isSelected('Salty')
              ? 'bg-[#FFEAF2] border border-[#E9ABC6] text-[#B01163]'
              : 'bg-white border border-[#EBE6EC] text-[#6B6578] hover:bg-gray-50'
          }`}
        >
          Salty
        </button>

        <button
          onClick={() => onToggleCraving('None')}
          className={`h-[clamp(44px,5vw,54px)] rounded-[24px] sm:rounded-[32px] lg:rounded-[40px] px-3 sm:px-4 text-[clamp(12px,1.3vw,14px)] font-normal tracking-[-0.16px] transition-all flex items-center justify-center ${
            isSelected('None')
              ? 'bg-[#FFEAF2] border border-[#E9ABC6] text-[#B01163]'
              : 'bg-white border border-[#EBE6EC] text-[#6B6578] hover:bg-gray-50'
          }`}
        >
          None
        </button>
      </div>
    </div>
  );
};
