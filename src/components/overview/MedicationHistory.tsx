import { ArrowRight, Pill } from 'lucide-react';
import type { MedicationHistoryEntry } from '../../types/tracker';

function PillBubble() {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand-strong">
      <Pill className="h-[18px] w-[18px]" aria-hidden="true" />
    </span>
  );
}

export function MedicationHistory({ entries, onViewAll }: { entries: MedicationHistoryEntry[]; onViewAll: () => void }) {
  return (
    <section className="rounded-card border border-brand-line bg-white p-card shadow-card">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <PillBubble />
          <div>
            <h2 className="text-body font-semibold text-ink">Medication History</h2>
            <p className="text-label text-ink-muted">Medications you&apos;ve logged throughout your cycle</p>
          </div>
        </div>
        <button type="button" onClick={onViewAll} className="-my-1 inline-flex items-center gap-2 py-1 text-body font-medium text-brand-strong hover:underline">
          View All History
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </header>
      <ul className="mt-5 grid grid-cols-1 gap-grid min-[560px]:grid-cols-2 xl:grid-cols-4">
        {entries.map((m) => (
          <li key={m.id} className="rounded-[clamp(14px,1.2vw,20px)] border border-brand-line bg-[#FFFAFC] p-[clamp(14px,1.2vw,20px)]">
            <div className="flex items-center gap-3">
              <PillBubble />
              <div className="min-w-0">
                <p className="truncate text-label font-semibold text-ink">{m.name}</p>
                <p className="truncate text-caption text-ink-muted">{m.dose}</p>
              </div>
            </div>
            <div className="mt-4 flex items-end justify-between gap-2 text-caption text-ink-muted">
              <div>
                <p>{m.date}</p>
                <p className="mt-1">{m.time}</p>
              </div>
              <span className="font-semibold text-ink">{m.phase}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
