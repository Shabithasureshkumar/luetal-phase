import React, { useState } from 'react';
import {
  Plus,
  Moon,
  Droplet,
  Sparkles,
  Waves,
  Smile,
  Scale,
  Check,
} from 'lucide-react';

interface QuickLogCardProps {
  onQuickLog: (type: 'sleep' | 'flow' | 'symptoms' | 'water' | 'mood' | 'weight') => void;
}

export const QuickLogCard: React.FC<QuickLogCardProps> = ({ onQuickLog }) => {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const items = [
    {
      id: 'sleep',
      label: 'Sleep',
      icon: <Moon className="w-3.5 h-3.5 text-white stroke-[2]" />,
      gradient: 'from-[#F881F0] to-[#F163C6]',
    },
    {
      id: 'flow',
      label: 'Flow',
      icon: <Droplet className="w-3.5 h-3.5 text-white fill-white stroke-[1.5]" />,
      gradient: 'from-[#FB7185] to-[#F43F5E]',
    },
    {
      id: 'symptoms',
      label: 'Symptoms',
      icon: <Sparkles className="w-3.5 h-3.5 text-white stroke-[2]" />,
      gradient: 'from-[#FA8BCE] to-[#F65CBE]',
    },
    {
      id: 'water',
      label: 'Water',
      icon: <Waves className="w-3.5 h-3.5 text-white stroke-[2]" />,
      gradient: 'from-[#22D3EE] to-[#06B6D4]',
    },
    {
      id: 'mood',
      label: 'Mood',
      icon: <Smile className="w-3.5 h-3.5 text-white stroke-[2]" />,
      gradient: 'from-[#FBBF24] to-[#FB923C]',
    },
    {
      id: 'weight',
      label: 'Weight',
      icon: <Scale className="w-3.5 h-3.5 text-white stroke-[2]" />,
      gradient: 'from-[#60A5FA] to-[#3B82F6]',
    },
  ];

  const handleClick = (id: 'sleep' | 'flow' | 'symptoms' | 'water' | 'mood' | 'weight') => {
    onQuickLog(id);
    setActiveItem(id);
    setTimeout(() => setActiveItem(null), 1200);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-[clamp(14px,1.5vw,16px)] font-bold text-[#1F2937] leading-[24px]">
          Quick Log
        </h3>
        <button
          className="w-5 h-5 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
          title="Add Log"
          aria-label="Add Log"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 3 Columns x 2 Rows Grid */}
      <div className="grid grid-cols-3 gap-2">
        {items.map((item) => {
          const isJustLogged = activeItem === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleClick(item.id as any)}
              className="h-[69.3px] rounded-[10.84px] p-2 bg-white/80 hover:bg-white border-[0.68px] border-white shadow-[0px_0.68px_2.7px_rgba(0,0,0,0.04),0px_1.35px_13.55px_rgba(139,92,246,0.07)] flex flex-col items-center justify-center transition-all active:scale-95 min-w-0"
            >
              <div
                className={`w-[29.8px] h-[29.8px] rounded-[10.84px] bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-[0px_1.35px_2.7px_-1.35px_rgba(0,0,0,0.1)] mb-1 shrink-0`}
              >
                {isJustLogged ? (
                  <Check className="w-3 h-3 text-white stroke-[3]" />
                ) : (
                  item.icon
                )}
              </div>
              <span className="text-[clamp(8px,1vw,9.5px)] font-semibold text-[#374151] leading-[10.84px] truncate w-full text-center">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
