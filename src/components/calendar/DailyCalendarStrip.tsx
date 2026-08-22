import React from 'react';
import { ChevronLeft, ChevronRight, Droplet } from 'lucide-react';
import { DayLogEntry } from '../../types/tracker';

interface DailyCalendarStripProps {
  days: DayLogEntry[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
  onToday: () => void;
  onPrevDay: () => void;
  onNextDay: () => void;
}

export const DailyCalendarStrip: React.FC<DailyCalendarStripProps> = ({
  days,
  selectedDate,
  onSelectDate,
  onToday,
  onPrevDay,
  onNextDay,
}) => {
  return (
    <div className="w-full bg-white rounded-[19.2px] p-[19.2px] shadow-[0px_1.2px_2.4px_rgba(0,0,0,0.05)] border-[1.2px] border-[#F3F4F6]">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-full bg-[#EF4486] flex items-center justify-center shadow-xs">
            <div className="w-3 h-3 rounded-full bg-white" />
          </div>
          <h2 className="text-[16.8px] font-bold text-[#1F2937] leading-[25.2px]">
            Calender
          </h2>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onPrevDay}
            className="w-8 h-8 rounded-[9.6px] hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
            title="Previous Day"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={onToday}
            className="px-4 py-1.5 rounded-full bg-[#FAF5FF] hover:bg-[#F3E8FF] transition-colors"
          >
            <span className="text-[14.4px] font-semibold bg-gradient-to-b from-[#F475C1] to-[#FF24AF] bg-clip-text text-transparent">
              Today
            </span>
          </button>
          <button
            onClick={onNextDay}
            className="w-8 h-8 rounded-[9.6px] hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
            title="Next Day"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Date Strip */}
      <div className="flex items-center justify-between gap-1.5 pt-4 pb-2">
        <button
          onClick={onPrevDay}
          className="p-1 text-gray-400 hover:text-gray-600 transition-colors shrink-0"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex-1 grid grid-cols-7 gap-2">
          {days.map((item) => {
            const isSelected = item.date === selectedDate;
            return (
              <button
                key={item.date}
                onClick={() => onSelectDate(item.date)}
                className={`relative flex flex-col items-center justify-center py-2.5 px-2 rounded-[14.4px] transition-all duration-200 min-h-[105px] ${
                  isSelected
                    ? 'bg-gradient-to-b from-[hsla(306,85%,71%,0.25)] to-[hsla(288,100%,57%,0.25)] border border-[#955BE3] shadow-[0px_2.4px_4.8px_-2.4px_rgba(0,0,0,0.1),0px_4.8px_7.2px_-1.2px_rgba(0,0,0,0.1)]'
                    : 'hover:bg-gray-50 border border-transparent'
                }`}
              >
                <span
                  className={`text-[13.2px] font-medium leading-[19.8px] ${
                    isSelected ? 'text-[#AF71F4]' : 'text-[#9CA3AF]'
                  }`}
                >
                  {item.month}
                </span>
                <span
                  className={`text-[18px] font-bold leading-[27px] my-0.5 ${
                    isSelected ? 'text-[#955BE3]' : 'text-[#374151]'
                  }`}
                >
                  {item.dayNumber}
                </span>
                <span
                  className={`text-[12px] font-normal leading-[18px] ${
                    isSelected ? 'text-[#955BE3]' : 'text-[#9CA3AF]'
                  }`}
                >
                  CD {item.cycleDay}
                </span>

                {/* Sub icon / Indicator */}
                <div className="mt-1 h-5 flex items-center justify-center">
                  {item.dayNumber === 18 && (
                    <Droplet className="w-4 h-4 text-orange-400 stroke-[1.8]" />
                  )}
                  {item.dayNumber === 19 && (
                    <Droplet className="w-4 h-4 text-orange-400 stroke-[1.8]" />
                  )}
                  {item.dayNumber === 20 && (
                    <div className="w-[17px] h-[17px] rounded-full border-[2.4px] border-[#93C5FD] bg-transparent" />
                  )}
                  {item.dayNumber >= 22 && (
                    <div className="w-[17px] h-[17px] rounded-full bg-[#E5E7EB]" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <button
          onClick={onNextDay}
          className="p-1 text-gray-400 hover:text-gray-600 transition-colors shrink-0"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Phase Legend */}
      <div className="flex flex-wrap items-center justify-start gap-5 pt-3.5 mt-1 text-[12px] text-[#6B7280]">
        <div className="flex items-center gap-1.5">
          <span className="w-[9.6px] h-[9.6px] rounded-full bg-[#F87171]" />
          <span>Menstruation</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-[9.6px] h-[9.6px] rounded-full bg-[#93C5FD]" />
          <span>Fertile Window</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-[9.6px] h-[9.6px] rounded-full bg-[#4ADE80]" />
          <span>Ovulation</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-[9.6px] h-[9.6px] rounded-full bg-[#C084FC]" />
          <span>Luteal Phase</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-[9.6px] h-[9.6px] rounded-full bg-[#D1D5DB]" />
          <span>Logged</span>
        </div>
      </div>
    </div>
  );
};
