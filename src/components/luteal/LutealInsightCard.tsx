import React from 'react';
import { Sparkles } from 'lucide-react';

interface LutealInsightCardProps {
  title?: string;
  heading?: string;
  description?: string;
}

export const LutealInsightCard: React.FC<LutealInsightCardProps> = ({
  title = 'AI INSIGHT',
  heading = 'Progesterone rising',
  description = 'Hormonal progesterone is increasing. Mild fatigue and mood fluctuations are expected — prioritise gentle movement and magnesium-rich foods.',
}) => {
  return (
    <div className="w-full h-[194px] bg-gradient-to-br from-[#FFEAF4] to-[#FFFFFF] rounded-[48px] p-6 border border-[#EBE6EC] shadow-xs flex flex-col justify-between">
      {/* Top Header with Sparkles Icon */}
      <div>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#E9ABC6] flex items-center justify-center text-white shrink-0">
            <Sparkles className="w-3.5 h-3.5 fill-white" />
          </div>
          <span className="text-[12px] font-normal tracking-[1.2px] uppercase text-[#6B6578]">
            {title}
          </span>
        </div>

        {/* Heading */}
        <h4 className="text-[18px] font-semibold text-[#1C1923] tracking-[-0.45px] leading-[28px] mt-2 mb-1">
          {heading}
        </h4>

        {/* Description */}
        <p className="text-[14px] font-normal text-[#6B6578] tracking-[-0.16px] leading-[22.75px]">
          {description}
        </p>
      </div>
    </div>
  );
};
