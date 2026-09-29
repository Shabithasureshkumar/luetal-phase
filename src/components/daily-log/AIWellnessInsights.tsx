import { Sparkles } from 'lucide-react';
import { PHASE_INFO } from '../../data/cycle';
import type { CyclePhase } from '../../types/tracker';
import { Emoji } from '../ui/Emoji';

const TIPS = [
  { label: 'Magnesium snack', emoji: '🥑' },
  { label: 'Warm Epsom bath', emoji: '🛁' },
];

export function AIWellnessInsights({ cycleDay, phase }: { cycleDay: number; phase: CyclePhase }) {
  const info = PHASE_INFO[phase];
  return (
    <section className="rounded-card border border-brand-line bg-gradient-to-b from-[#FDF2F8] to-white p-card shadow-card">
      <header className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 text-body font-semibold text-ink">
          <Sparkles className="h-4 w-4 text-brand-strong" aria-hidden="true" />
          AI Wellness Insights
        </h2>
        <span className="text-caption font-semibold text-[#4F46E5]">
          {info.short} Day {cycleDay}
        </span>
      </header>
      <p className="mt-3 text-label text-ink-soft">
        {info.insight}
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {TIPS.map((tip) => (
          <li
            key={tip.label}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-caption font-semibold text-ink shadow-pill"
          >
            <Emoji symbol={tip.emoji} className="text-[13px]" />
            {tip.label}
          </li>
        ))}
      </ul>
    </section>
  );
}
