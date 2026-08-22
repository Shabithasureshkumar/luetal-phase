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
    <div className="w-full h-[194px] bg-white rounded-[48px] p-6 border-[6px] border-[#F5F4F4] shadow-xs flex flex-col justify-between">
      {/* Top Header */}
      <div>
        <span className="text-[12px] font-normal tracking-[1.2px] uppercase text-[#6B6578] block">
          CRAVINGS
        </span>
      </div>

      {/* 2x2 Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Row 1 */}
        <button
          onClick={() => onToggleCraving('Sweet')}
          className={`h-[54px] rounded-[40px] px-4 text-[14px] font-normal tracking-[-0.16px] transition-all flex items-center justify-center ${
            isSelected('Sweet')
              ? 'bg-[#FFEAF2] border border-[#E9ABC6] text-[#B01163]'
              : 'bg-white border border-[#EBE6EC] text-[#6B6578] hover:bg-gray-50'
          }`}
        >
          Sweet
        </button>

        <button
          onClick={() => onToggleCraving('Chocolate')}
          className={`h-[54px] rounded-[40px] px-4 text-[14px] font-normal tracking-[-0.16px] transition-all flex items-center justify-center ${
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
          className={`h-[54px] rounded-[40px] px-4 text-[14px] font-normal tracking-[-0.16px] transition-all flex items-center justify-center ${
            isSelected('Salty')
              ? 'bg-[#FFEAF2] border border-[#E9ABC6] text-[#B01163]'
              : 'bg-white border border-[#EBE6EC] text-[#6B6578] hover:bg-gray-50'
          }`}
        >
          Salty
        </button>

        <button
          onClick={() => onToggleCraving('None')}
          className={`h-[54px] rounded-[40px] px-4 text-[14px] font-normal tracking-[-0.16px] transition-all flex items-center justify-center ${
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
