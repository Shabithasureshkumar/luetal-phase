import React from 'react';

interface TodayInsightsCardProps {
  insights?: string[];
}

export const TodayInsightsCard: React.FC<TodayInsightsCardProps> = ({
  insights = [
    'You are on your period day 1.',
    "It's normal to feel low energy.",
    'Stay hydrated and take rest.',
    'Light exercise like walking may help with cramps.',
  ],
}) => {
  return (
    <div className="w-full">
      <h3 className="text-[clamp(14px,1.5vw,15.6px)] font-bold text-[#1F2937] leading-[23.4px] mb-2.5">
        Today's Insights
      </h3>

      <ul className="space-y-2">
        {insights.map((insight, idx) => (
          <li key={idx} className="flex items-start gap-2.5">
            <span className="w-[7.2px] h-[7.2px] rounded-full bg-[#A855F7] mt-1.5 shrink-0" />
            <p className="text-[clamp(12px,1.2vw,13.2px)] font-normal text-[#4B5563] leading-[19.8px]">
              {insight}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
