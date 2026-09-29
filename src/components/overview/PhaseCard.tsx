import { PHASE_INFO } from '../../data/cycle';
import type { CyclePhase } from '../../types/tracker';
import illustration from '../../assets/luteal-illustration.png';

interface PhaseCardProps {
  phase: CyclePhase;
  onLogPeriod: () => void;
  onViewTips: () => void;
}

export function PhaseCard({ phase, onLogPeriod, onViewTips }: PhaseCardProps) {
  const info = PHASE_INFO[phase];
  return (
    <section className="card relative flex items-center justify-between gap-4 overflow-hidden p-card">
      <div className="min-w-0 max-w-[560px]">
        <h2 className="text-heading font-semibold text-ink">{info.heading}</h2>
        <p className="mt-2.5 text-body text-ink-muted">{info.description}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onLogPeriod}
            aria-haspopup="dialog"
            className="rounded-full bg-brand-soft px-[clamp(16px,1.4vw,22px)] py-2.5 text-label font-medium text-brand-strong transition-colors hover:bg-[#FBCFE8]"
          >
            Log period
          </button>
          <button
            type="button"
            onClick={onViewTips}
            className="rounded-full bg-gradient-to-r from-[#EC4899] to-[#F472B6] px-[clamp(16px,1.4vw,22px)] py-2.5 text-label font-medium text-white shadow-glow transition-opacity hover:opacity-90"
          >
            View Tips
          </button>
        </div>
      </div>
      <img
        src={illustration}
        alt="Woman relaxing cross-legged"
        className="hidden w-[clamp(108px,9vw,150px)] shrink-0 object-contain sm:block"
      />
    </section>
  );
}
