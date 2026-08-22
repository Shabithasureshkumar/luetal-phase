import React from 'react';
import { Sparkles, Heart, Activity, Flame } from 'lucide-react';
import { DayLogEntry } from '../../types/tracker';

interface OvulationPhasePageProps {
  day: DayLogEntry;
}

export const OvulationPhasePage: React.FC<OvulationPhasePageProps> = ({ day }) => {
  return (
    <section className="w-full bg-[#EBFBF0] rounded-[32px] sm:rounded-[36px] p-5 sm:p-8 border border-[#D1F2D9] shadow-[0px_8px_24px_rgba(74,222,128,0.08)] relative overflow-hidden transition-all duration-300">
      {/* Header */}
      <div className="flex items-center gap-3.5 mb-6 relative z-10">
        <div className="w-11 h-11 rounded-[18px] bg-white/80 backdrop-blur-md border border-white shadow-sm flex items-center justify-center text-emerald-600">
          <Flame className="w-5 h-5 fill-emerald-500" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#14532D] tracking-tight leading-none">
            Ovulation Phase
          </h1>
          <p className="text-xs sm:text-sm text-emerald-800/70 mt-1 font-normal">
            Cycle Day {day.cycleDay} • {day.displayDate}
          </p>
        </div>
      </div>

      {/* Ovulation Phase Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 relative z-10">
        {/* Fertile Window Status */}
        <div className="bg-white rounded-[32px] p-6 border-[4px] border-emerald-50 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-emerald-700 block mb-1">
              FERTILITY STATUS
            </span>
            <h3 className="text-2xl font-bold text-emerald-950 mt-1">
              Peak Fertility
            </h3>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
              Highest chance of conception occurs within this 24-48 hour window.
            </p>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
              Highest Chance
            </span>
          </div>
        </div>

        {/* Basal Temperature & Energy */}
        <div className="bg-white rounded-[32px] p-6 border-[4px] border-emerald-50 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold tracking-wider uppercase text-emerald-700">
                BASAL TEMP
              </span>
              <Activity className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-3xl font-bold text-gray-900">36.7</span>
              <span className="text-sm font-medium text-gray-500">°C</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Slight temperature rise expected post-ovulation.
            </p>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs text-emerald-600 font-medium">
            <Heart className="w-3.5 h-3.5 fill-emerald-600" />
            <span>Optimal Vitality</span>
          </div>
        </div>

        {/* Ovulation AI Insight */}
        <div className="bg-gradient-to-br from-emerald-50 to-white rounded-[32px] p-6 border border-emerald-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <Sparkles className="w-4 h-4 text-emerald-600 fill-emerald-600" />
              <span className="text-xs font-semibold tracking-wider uppercase text-emerald-700">
                AI INSIGHT
              </span>
            </div>
            <h4 className="text-base font-semibold text-gray-900 mb-1">
              Peak Estrogen & LH Surge
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Energy and mood levels are naturally elevated. Great time for social activities and high-energy workouts.
            </p>
          </div>
          <div className="text-[11px] text-emerald-700/70 italic mt-3">
            * Ovulation Day 14
          </div>
        </div>
      </div>
    </section>
  );
};
