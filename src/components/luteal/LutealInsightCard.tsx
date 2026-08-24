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
    <div className="w-full bg-gradient-to-br from-[#FFEAF4] to-[#FFFFFF] rounded-[24px] sm:rounded-[36px] lg:rounded-[48px] p-4 sm:p-5 lg:p-6 border border-[#EBE6EC] shadow-xs flex flex-col justify-between lg:h-[194px]">
      {/* Top Header with Sparkles Icon */}
      <div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#E9ABC6] flex items-center justify-center text-white shrink-0">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-white" />
          </div>
          <span className="text-[clamp(10px,1.1vw,12px)] font-normal tracking-[1.2px] uppercase text-[#6B6578]">
            {title}
          </span>
        </div>

        {/* Heading */}
        <h4 className="text-[clamp(15px,1.6vw,18px)] font-semibold text-[#1C1923] tracking-[-0.45px] leading-snug sm:leading-[24px] lg:leading-[28px] mt-1.5 sm:mt-2 mb-1">
          {heading}
        </h4>

        {/* Description */}
        <p className="text-[clamp(12px,1.3vw,14px)] font-normal text-[#6B6578] tracking-[-0.16px] leading-relaxed lg:leading-[22.75px]">
          {description}
        </p>
      </div>
    </div>
  );
};
