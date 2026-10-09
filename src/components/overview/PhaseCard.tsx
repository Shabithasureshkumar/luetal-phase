import { PHASE_INFO } from '../../data/cycle';
import type { CyclePhase } from '../../types/tracker';

interface PhaseCardProps {
  phase: CyclePhase;
  onLogPeriod: () => void;
  onViewTips: () => void;
}

export function PhaseCard({ phase, onLogPeriod, onViewTips }: PhaseCardProps) {
  const info = PHASE_INFO[phase];
  const tipsLabel = phase === 'menstruation' ? 'View Period Tips' : 'View Tips';

  return (
    <section
      aria-label="Current Phase Information"
      className="relative isolate flex min-h-[clamp(145px,13vw,175px)] w-full flex-col justify-between overflow-hidden rounded-[clamp(18px,1.6vw,24px)] border border-pink-100/70 bg-[#FBEFFA] p-[clamp(14px,1.35vw,22px)] shadow-[0_12px_32px_-14px_rgba(236,72,153,0.16),0_2px_6px_rgba(17,24,39,0.04)] sm:flex-row sm:items-center sm:gap-4"
    >
      {/* Background image; layer runs 10% past the right edge so the hearts clear the description text */}
      <div
        className="pointer-events-none absolute inset-y-0 -right-[10%] left-0 -z-10 bg-[url('/images/dreamy-floral-period-banner.png')] bg-cover bg-[position:right_center] bg-no-repeat"
        aria-hidden="true"
      />
      {/* Readability scrim behind the text; fades out before the flowers and hearts (stronger on phones, where text spans the card) */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-white/70 via-white/45 via-45% to-transparent to-80% max-sm:via-white/55 max-sm:to-white/25 max-sm:to-100%"
        aria-hidden="true"
      />

      {/* Left: Text Content & Actions */}
      <div className="relative z-10 flex min-w-0 max-w-[500px] flex-col justify-center">
        <h2 className="text-[clamp(1.1rem,1.3vw,1.38rem)] font-bold leading-tight text-ink">
          {info.heading}
        </h2>
        <p className="mt-2 text-[clamp(0.8125rem,0.85vw,0.925rem)] leading-relaxed text-ink-soft">
          {info.description}
        </p>

        {/* Buttons */}
        <div className="mt-4 flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={onLogPeriod}
            aria-haspopup="dialog"
            className="rounded-full bg-gradient-to-r from-[#EC4899] to-[#DB2777] px-[clamp(16px,1.4vw,22px)] py-2 text-[clamp(12px,0.8vw,13.5px)] font-semibold text-white shadow-[0_4px_14px_rgba(236,72,153,0.35)] transition-all hover:opacity-95 active:scale-[0.98]"
          >
            Log period
          </button>
          <button
            type="button"
            onClick={onViewTips}
            className="rounded-full bg-transparent px-[clamp(12px,1.1vw,18px)] py-2 text-[clamp(12px,0.8vw,13.5px)] font-semibold text-brand-strong transition-colors hover:bg-pink-100/50"
          >
            {tipsLabel}
          </button>
        </div>
      </div>
    </section>
  );
}
