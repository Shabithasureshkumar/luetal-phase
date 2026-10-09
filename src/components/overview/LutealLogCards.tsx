import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { formatDate } from '../../lib/date';
import { summarizeIntercourse, summarizeSymptoms } from '../../lib/lutealLog';
import type { DailyLogData } from '../../types/tracker';
import { IntimacyArt, SymptomArt } from '../ui/Illustrations';

interface LutealLogCardsProps {
  /** Date shown (the date selected in Daily Log) */
  date: string;
  isToday: boolean;
  /** Saved log for `date` — undefined when nothing has been saved */
  log: DailyLogData | undefined;
  /** Opens Daily Log at the given section for the same date */
  onOpenSection: (section: 'symptoms' | 'intercourse') => void;
}

/** Same container and arrow button as the dashboard MetricCard, so these read as native dashboard cards. */
function SummaryCard({
  icon,
  title,
  dateLabel,
  children,
  accent,
  arrowLabel,
  onOpen,
}: {
  icon: ReactNode;
  title: string;
  dateLabel: string;
  children: ReactNode;
  /** Tailwind classes for the arrow button background + icon colour (as in MetricCard) */
  accent: string;
  arrowLabel: string;
  onOpen: () => void;
}) {
  return (
    <article className="card flex min-h-[clamp(120px,8.5vw,148px)] min-w-0 flex-col gap-3 p-card" aria-label={`${title}, ${dateLabel}`}>
      <header className="flex items-center gap-3">
        <span className="flex h-[clamp(44px,3.4vw,52px)] w-[clamp(44px,3.4vw,52px)] shrink-0 items-center justify-center">{icon}</span>
        <div className="min-w-0 flex-1">
          <h2 className="text-label font-semibold text-ink">{title}</h2>
          <p className="text-caption text-ink-muted">{dateLabel}</p>
        </div>
      </header>
      <div className="mt-auto flex items-end justify-between gap-3">
        <div className="min-w-0 flex-1">{children}</div>
        <button
          type="button"
          onClick={onOpen}
          aria-label={arrowLabel}
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform hover:translate-x-0.5 ${accent}`}
        >
          <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
        </button>
      </div>
    </article>
  );
}

const NotLogged = ({ what }: { what: string }) => (
  <p className="text-body font-semibold text-ink-muted">
    Not logged
    <span className="block text-caption font-normal">No {what} saved for this date.</span>
  </p>
);

export function LutealLogCards({ date, isToday, log, onOpenSection }: LutealLogCardsProps) {
  const dateLabel = `${isToday ? 'Today' : formatDate(date, { weekday: 'short' })} · ${formatDate(date, { month: 'short', day: 'numeric' })}`;
  const symptoms = summarizeSymptoms(log);
  const intercourse = summarizeIntercourse(log);

  return (
    <div className="grid grid-cols-1 gap-grid md:grid-cols-2">
      <SummaryCard
        icon={<SymptomArt className="h-full w-full" />}
        title="Today's Symptoms"
        dateLabel={dateLabel}
        accent="bg-brand-soft text-brand-strong"
        arrowLabel="Open symptom tracking in Daily Log"
        onOpen={() => onOpenSection('symptoms')}
      >
        {symptoms.state === 'not-logged' && <NotLogged what="symptom log" />}
        {symptoms.state === 'none' && (
          <p className="text-body font-semibold text-ink">
            No symptoms today
            <span className="block text-caption font-normal text-ink-muted">You logged that you felt no symptoms.</span>
          </p>
        )}
        {symptoms.state === 'logged' && (
          <div className="flex flex-col gap-2.5">
            {symptoms.items.length > 0 ? (
              <ul className="flex flex-wrap gap-1.5" aria-label="Logged symptoms">
                {symptoms.items.map((s) => (
                  <li key={s} className="rounded-full bg-brand-soft px-2.5 py-1 text-caption font-semibold text-brand-strong">
                    {s}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-label text-ink-muted">No specific symptoms selected.</p>
            )}
            {symptoms.severity !== null && (
              <div className="flex items-center gap-3">
                <span className="text-label text-ink-soft">
                  Severity <span className="font-semibold text-ink">{symptoms.severity}/10</span>
                </span>
                <span className="h-1.5 max-w-[160px] flex-1 overflow-hidden rounded-full bg-brand-soft" aria-hidden="true">
                  <span className="block h-full rounded-full bg-brand" style={{ width: `${symptoms.severity * 10}%` }} />
                </span>
              </div>
            )}
          </div>
        )}
      </SummaryCard>

      <SummaryCard
        icon={<IntimacyArt className="h-full w-full" />}
        title="Intercourse"
        dateLabel={dateLabel}
        accent="bg-[#FFE4E6] text-[#E11D48]"
        arrowLabel="Open intercourse log in Daily Log"
        onOpen={() => onOpenSection('intercourse')}
      >
        {intercourse.state === 'not-logged' && <NotLogged what="intercourse entry" />}
        {intercourse.state === 'no' && <p className="text-title font-bold text-ink">No</p>}
        {intercourse.state === 'yes' && (
          <div>
            <p className="text-title font-bold text-ink">Yes</p>
            <p className="text-label text-ink-soft">
              Protection: <span className="font-semibold text-ink">{intercourse.protection ?? 'Not specified'}</span>
            </p>
          </div>
        )}
      </SummaryCard>
    </div>
  );
}
