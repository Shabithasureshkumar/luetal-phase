import { useState } from 'react';
import { BellRing, Pill, Plus } from 'lucide-react';
import { formatDate, formatTime } from '../../lib/date';
import type { Medication, MedicationStatus } from '../../types/tracker';
import { Emoji } from '../ui/Emoji';
import { AddMedicationModal } from './AddMedicationModal';

interface MedicationSectionProps {
  medications: Medication[];
  /** Taken/skipped state for the selected Daily Log date */
  statuses: Record<string, MedicationStatus>;
  /** The selected Daily Log date (ISO) */
  date: string;
  onStatusChange: (id: string, status: MedicationStatus) => void;
  onAdd: (medication: Omit<Medication, 'id'>) => void;
}

const STATUS_OPTIONS: { value: Exclude<MedicationStatus, null>; label: string }[] = [
  { value: 'taken', label: 'Taken' },
  { value: 'skipped', label: 'Skipped' },
];

const STATUS_CHIP: Record<'pending' | 'taken' | 'skipped', { label: string; className: string }> = {
  pending: { label: 'Pending', className: 'bg-[#F3F4F6] text-ink-muted' },
  taken: { label: 'Taken', className: 'bg-[#DCFCE7] text-[#15803D]' },
  skipped: { label: 'Skipped', className: 'bg-[#FEF3C7] text-[#B45309]' },
};

const shortDate = (iso: string) => formatDate(iso, { month: 'short', day: 'numeric' }); // "Sep 29", as in the date carousel

/** Where the selected date falls within the medication's schedule. */
function scheduleState(m: Medication, date: string) {
  if (m.startDate && date < m.startDate) return { active: false, label: `Starts ${shortDate(m.startDate)}` };
  if (m.endDate && date > m.endDate) return { active: false, label: `Ended ${shortDate(m.endDate)}` };
  return { active: true, label: 'Active' };
}

export function MedicationSection({ medications, statuses, date, onStatusChange, onAdd }: MedicationSectionProps) {
  const [adding, setAdding] = useState(false);

  return (
    <section className="card-pink flex min-w-0 flex-col gap-[clamp(12px,1.2vw,18px)] p-card">
      <header className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand-strong">
          <Pill className="h-[18px] w-[18px]" aria-hidden="true" />
        </span>
        <h3 className="flex-1 text-heading font-semibold text-ink">Medication</h3>
        <button
          type="button"
          onClick={() => setAdding(true)}
          aria-haspopup="dialog"
          aria-label="Log a new medication"
          className="inline-flex items-center gap-1 rounded-full bg-[#F43F5E] px-4 py-2 text-label font-medium text-white shadow-soft transition-opacity hover:opacity-90"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Log
        </button>
      </header>
      {/* Mounted only while open, so every "+ Log" starts from a clean form */}
      {adding && <AddMedicationModal defaultStartDate={date} onSave={onAdd} onClose={() => setAdding(false)} />}
      <ul className="flex flex-col gap-3">
        {medications.map((m) => {
          const schedule = scheduleState(m, date);
          const status = statuses[m.id] ?? 'pending';
          const chip = STATUS_CHIP[status];
          const when = [m.time && formatTime(m.time), m.frequency].filter(Boolean).join(' · ');
          return (
            <li key={m.id} className="flex items-center gap-3 rounded-[clamp(14px,1.2vw,20px)] border border-brand-line bg-white px-3 py-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center self-start rounded-full bg-brand-tint">
                <Emoji symbol="💊" className="text-[20px]" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="break-words text-label font-semibold leading-snug text-ink">{m.name}</p>
                <p className="break-words text-caption text-ink-muted">{[m.dose, m.form].filter(Boolean).join(' · ')}</p>
                {when && <p className="break-words text-caption text-ink-muted">{when}</p>}
                <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                  <span
                    className={`rounded-full px-2 py-0.5 text-caption font-semibold ${
                      schedule.active ? 'bg-brand-soft text-brand-strong' : 'bg-[#F3F4F6] text-ink-muted'
                    }`}
                  >
                    {schedule.label}
                  </span>
                  {schedule.active && (
                    <span className={`rounded-full px-2 py-0.5 text-caption font-semibold ${chip.className}`} aria-live="polite">
                      {chip.label}
                    </span>
                  )}
                  {m.reminder && m.time && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#EDE9FE] px-2 py-0.5 text-caption font-semibold text-[#6D28D9]">
                      <BellRing className="h-3 w-3" aria-hidden="true" />
                      Reminder ON
                    </span>
                  )}
                </div>
              </div>
              <div role="group" aria-label={`${m.name} status`} className="flex shrink-0 flex-col gap-1.5">
                {STATUS_OPTIONS.map((s) => {
                  const active = statuses[m.id] === s.value;
                  return (
                    <button
                      key={s.value}
                      type="button"
                      aria-pressed={active}
                      disabled={!schedule.active}
                      title={schedule.active ? undefined : `Not scheduled on this date (${schedule.label})`}
                      onClick={() => onStatusChange(m.id, s.value)}
                      className={`min-w-[72px] rounded-full border px-3 py-1 text-caption font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                        active ? 'border-brand bg-brand-soft text-brand-strong' : 'border-line bg-white text-ink-muted hover:border-brand-line'
                      }`}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
