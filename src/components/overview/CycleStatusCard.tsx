import { Sparkles } from 'lucide-react';
import { PHASE_INFO } from '../../data/cycle';
import type { CyclePhase } from '../../types/tracker';
import { ProgressRing } from '../ui/ProgressRing';

interface CycleStatusCardProps {
  cycleDay: number;
  cycleLength: number;
  phase: CyclePhase;
}

export function CycleStatusCard({ cycleDay, cycleLength, phase }: CycleStatusCardProps) {
  return (
    <section className="card flex items-center gap-[clamp(14px,1.3vw,22px)] p-card">
      <div className="w-[clamp(96px,7.5vw,132px)]">
        <ProgressRing value={cycleDay / cycleLength} size={132} stroke={10} segments={4}>
          <span className="text-title font-bold text-ink">{cycleDay}</span>
          <span className="mt-0.5 text-caption font-medium uppercase tracking-[0.12em] text-ink-muted">Cycle day</span>
        </ProgressRing>
      </div>
      <div className="min-w-0">
        <p className="text-label font-medium uppercase tracking-[0.14em] text-ink-muted">Status</p>
        <h2 className="mt-1.5 text-heading font-semibold text-ink">
          {PHASE_INFO[phase].title} <span className="text-brand-strong">Healthy</span>
        </h2>
        <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-caption font-medium text-brand-strong">
          <Sparkles className="h-3.5 w-3.5 text-[#F59E0B]" aria-hidden="true" />
          AI Summary Ready
        </span>
      </div>
    </section>
  );
}
