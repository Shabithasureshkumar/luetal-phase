import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';

export interface MetricCardProps {
  label: string;
  value: string;
  description: string;
  visual: ReactNode;
  /** Tailwind classes for the arrow button background + icon colour */
  accent: string;
  badge?: { text: string; className: string };
}

interface MetricCardComponentProps extends MetricCardProps {
  onOpen: () => void;
}

export function MetricCard({ label, value, description, visual, accent, badge, onOpen }: MetricCardComponentProps) {
  return (
    <article className="card flex min-h-[clamp(120px,8.5vw,148px)] items-center gap-[clamp(12px,1vw,18px)] p-card">
      <div className="flex w-[clamp(56px,4.6vw,84px)] shrink-0 items-center justify-center">{visual}</div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-label font-semibold text-ink">{label}</span>
          {badge && (
            <span className={`rounded-full px-2 py-0.5 text-caption font-semibold ${badge.className}`}>{badge.text}</span>
          )}
        </div>
        <p className="mt-1 text-title font-bold text-ink">{value}</p>
        <div className="mt-1.5 flex items-end justify-between gap-2">
          <p className="min-w-0 text-label text-ink-muted">{description}</p>
          <button
            type="button"
            onClick={onOpen}
            aria-label={`Log ${label} in Daily Log`}
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform hover:translate-x-0.5 ${accent}`}
          >
            <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
          </button>
        </div>
      </div>
    </article>
  );
}
