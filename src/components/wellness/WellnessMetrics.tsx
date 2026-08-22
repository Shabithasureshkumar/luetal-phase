import React from 'react';
import {
  Moon,
  Smile,
  Waves,
  Footprints,
  Scale,
  Heart,
  Pencil,
} from 'lucide-react';
import { WellnessMetricsData } from '../../types/tracker';
import { EditLogModal } from './EditLogModal';

interface WellnessMetricsProps {
  dateInfo: string;
  metrics: WellnessMetricsData;
  onUpdateMetrics: (metrics: Partial<WellnessMetricsData>) => void;
}

export const WellnessMetrics: React.FC<WellnessMetricsProps> = ({
  dateInfo,
  metrics,
  onUpdateMetrics,
}) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const cards = [
    {
      label: 'Sleep',
      value: metrics.sleep,
      icon: <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />,
      bg: 'bg-[#FAF5FF]',
    },
    {
      label: 'Mood',
      value: metrics.mood,
      icon: <Smile className="w-4 h-4 sm:w-5 sm:h-5 text-[#F97316]" />,
      bg: 'bg-[#FFF7ED]',
    },
    {
      label: 'Water',
      value: metrics.water,
      icon: <Waves className="w-4 h-4 sm:w-5 sm:h-5 text-[#3B82F6]" />,
      bg: 'bg-[#EFF6FF]',
    },
    {
      label: 'Steps',
      value: metrics.steps,
      icon: <Footprints className="w-4 h-4 sm:w-5 sm:h-5 text-[#22C55E]" />,
      bg: 'bg-[#F0FDF4]',
    },
    {
      label: 'Weight',
      value: metrics.weight,
      icon: <Scale className="w-4 h-4 sm:w-5 sm:h-5 text-[#F755AE]" />,
      bg: 'bg-[#FAF5FF]',
    },
    {
      label: 'Sex Activity',
      value: metrics.sexActivity,
      icon: <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-[#EF4444]" />,
      bg: 'bg-[#FEF2F2]',
    },
  ];

  return (
    <div className="w-full bg-white rounded-[19.2px] p-3.5 sm:p-[19.2px] shadow-[0px_1.2px_2.4px_rgba(0,0,0,0.05)] border-[1.2px] border-[#F3F4F6]">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5">
        <div>
          <h2 className="text-sm sm:text-[16.8px] font-bold text-[#1F2937] leading-snug sm:leading-[25.2px]">
            Wellness Metrics
          </h2>
          <p className="text-xs sm:text-[13.2px] font-normal text-[#9CA3AF] leading-snug sm:leading-[19.8px]">
            {dateInfo}
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-[9.6px] border-[1.2px] border-[#E9D5FF] hover:bg-pink-50/50 transition-colors shrink-0"
        >
          <Pencil className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-pink-500" />
          <span className="text-xs sm:text-[13.2px] font-normal leading-tight sm:leading-[19.8px] bg-gradient-to-b from-[#F475C1] to-[#FF24AF] bg-clip-text text-transparent">
            Edit Log
          </span>
        </button>
      </div>

      {/* 6 Metric Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="min-h-[135px] sm:min-h-[151px] bg-white rounded-[14.4px] p-3 sm:p-[14.4px] border-[1.2px] border-[#F3F4F6] shadow-[0px_1.2px_2.4px_rgba(0,0,0,0.05)] flex flex-col justify-between"
          >
            <div
              className={`w-8 h-8 sm:w-[38.4px] sm:h-[38.4px] rounded-full ${card.bg} flex items-center justify-center p-1.5 sm:p-2`}
            >
              {card.icon}
            </div>

            <div>
              <span className="text-xs sm:text-[13.2px] font-normal text-[#9CA3AF] leading-tight sm:leading-[19.8px] block">
                {card.label}
              </span>
              <span className="text-sm sm:text-[15.6px] font-bold text-[#1F2937] leading-tight sm:leading-[23.4px] block truncate mt-0.5">
                {card.value}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Log Modal */}
      <EditLogModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        metrics={metrics}
        onSave={onUpdateMetrics}
      />
    </div>
  );
};
