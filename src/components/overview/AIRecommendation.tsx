import { PHASE_INFO } from '../../data/cycle';
import type { CyclePhase } from '../../types/tracker';
import { AvaAvatar } from '../ui/AvaAvatar';
import { Emoji } from '../ui/Emoji';

const CHIPS = [
  { label: 'Hydrate', emoji: '💧' },
  { label: 'Gentle walk', emoji: '🚶‍♀️' },
  { label: 'Sleep 8h', emoji: '😴' },
];

export function AIRecommendation({ phase, onAskAva }: { phase: CyclePhase; onAskAva: () => void }) {
  return (
    <section id="ai-recommendation" tabIndex={-1} aria-labelledby="ai-recommendation-title" className="card scroll-mt-6 p-[clamp(12px,1.2vw,18px)] outline-none">
      <header className="flex items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EDE9FE]">
            <AvaAvatar className="h-7 w-7" />
          </span>
          <h2 id="ai-recommendation-title" className="text-body font-semibold text-ink">
            AI Recommendation
          </h2>
        </div>
        <button
          type="button"
          onClick={onAskAva}
          aria-haspopup="dialog"
          className="rounded-full bg-[#F3E8FF] px-4 py-2 text-label font-medium text-[#7E22CE] transition-colors hover:bg-[#E9D5FF]"
        >
          Ask Ava
        </button>
      </header>
      <div className="mt-3 flex flex-col gap-4 rounded-[clamp(14px,1.2vw,18px)] bg-gradient-to-r from-[#FDF2F8] to-[#F5F0FF] p-[clamp(14px,1.4vw,22px)] sm:flex-row sm:items-center">
        <AvaAvatar className="h-[clamp(52px,4.2vw,68px)] w-[clamp(52px,4.2vw,68px)] shrink-0" />
        <div className="min-w-0">
          <p className="text-body text-ink-soft">{PHASE_INFO[phase].recommendation}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {CHIPS.map((chip) => (
              <li
                key={chip.label}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#EDE9FE] px-3 py-1 text-caption font-medium text-[#7C3AED]"
              >
                {chip.label}
                <Emoji symbol={chip.emoji} className="text-[12px]" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
