import { useId, useRef, useState, type ReactNode } from 'react';
import { CalendarDays, X } from 'lucide-react';
import { CRAMPS_LEVELS, FLOW_LEVELS } from '../../data/cycle';
import { longDate } from '../../lib/date';
import { Modal } from '../ui/Modal';
import type { CrampsLevel, FlowLevel, PeriodLog } from '../../types/tracker';

interface LogPeriodModalProps {
  date: string;
  isToday: boolean;
  /** Existing entry for `date`, used to pre-fill the form */
  initial?: PeriodLog;
  onSave: (log: PeriodLog) => void;
  onClose: () => void;
}

function PillGroup<T extends string>({
  label,
  options,
  value,
  onChange,
  invalid,
}: {
  label: string;
  options: readonly T[];
  value: T | null;
  onChange: (v: T) => void;
  invalid: boolean;
}) {
  const id = useId();
  return (
    <fieldset>
      <legend id={id} className="text-body font-semibold text-ink">
        {label}
      </legend>
      <div role="radiogroup" aria-labelledby={id} className="mt-3 grid grid-cols-2 gap-[clamp(8px,1vw,14px)]">
        {options.map((o) => {
          const selected = o === value;
          return (
            <button
              key={o}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(o)}
              className={`min-w-0 truncate rounded-full px-3 py-[clamp(11px,1vw,15px)] text-body transition-colors ${
                selected
                  ? 'border-2 border-brand bg-brand-soft font-semibold text-brand-strong'
                  : `border bg-white font-medium text-ink hover:border-brand-line hover:bg-brand-tint ${invalid ? 'border-[#FDA4AF]' : 'border-line'}`
              }`}
            >
              {o}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function Field({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-[clamp(18px,1.8vw,26px)]">{children}</div>;
}

export function LogPeriodModal({ date, isToday, initial, onSave, onClose }: LogPeriodModalProps) {
  const [flow, setFlow] = useState<FlowLevel | null>(initial?.flow ?? null);
  const [cramps, setCramps] = useState<CrampsLevel | null>(initial?.cramps ?? null);
  const [clots, setClots] = useState(initial?.clots ?? false);
  const [notes, setNotes] = useState(initial?.notes ?? '');
  const [submitted, setSubmitted] = useState(false);

  const closeBtn = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descId = useId();

  const missing = [!flow && 'flow', !cramps && 'cramps level'].filter(Boolean) as string[];

  const handleSave = () => {
    setSubmitted(true);
    if (!flow || !cramps) return;
    onSave({ flow, cramps, clots, notes: notes.trim() });
  };

  return (
    <Modal
      labelledBy={titleId}
      describedBy={descId}
      onClose={onClose}
      initialFocus={closeBtn}
      className="max-h-[92dvh] overflow-y-auto px-[clamp(18px,2.6vw,36px)] pb-[clamp(20px,2.4vw,34px)] pt-[clamp(20px,2.4vw,32px)] sm:max-w-[600px]"
    >
        <Field>
          <header className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h2 id={titleId} className="text-title font-bold text-ink">
                Log Period
              </h2>
              <p id={descId} className="mt-1.5 text-body text-ink-muted">
                Record your period details for {isToday ? 'today' : 'this day'}.
              </p>
            </div>
            <button
              ref={closeBtn}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand-strong transition-colors hover:bg-[#FBCFE8]"
            >
              <X className="h-[18px] w-[18px]" strokeWidth={2.4} />
            </button>
          </header>

          <p className="flex items-center gap-3 rounded-full bg-brand-soft/70 px-[clamp(12px,1.4vw,18px)] py-[clamp(10px,1vw,14px)]">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-brand-strong shadow-pill">
              <CalendarDays className="h-[18px] w-[18px]" aria-hidden="true" />
            </span>
            <span className="min-w-0 text-body font-semibold text-ink">
              {isToday ? 'Today · ' : ''}
              {longDate(date)}
            </span>
          </p>

          <PillGroup label="How is your flow today?" options={FLOW_LEVELS} value={flow} onChange={setFlow} invalid={submitted && !flow} />
          <PillGroup label="Cramps Level" options={CRAMPS_LEVELS} value={cramps} onChange={setCramps} invalid={submitted && !cramps} />

          <label className="flex cursor-pointer items-center justify-between gap-3 rounded-full border border-line px-[clamp(16px,1.6vw,22px)] py-[clamp(12px,1.2vw,16px)]">
            <span className="text-body font-semibold text-ink">Clots Present</span>
            <button
              type="button"
              role="switch"
              aria-checked={clots}
              aria-label="Clots present"
              onClick={() => setClots((c) => !c)}
              className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${clots ? 'bg-brand' : 'bg-[#EEF0F4]'}`}
            >
              <span
                className={`absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-[0_1px_3px_rgba(17,24,39,0.25)] transition-transform ${
                  clots ? 'translate-x-5' : ''
                }`}
              />
            </button>
          </label>

          <div>
            <label htmlFor="period-notes" className="text-body font-semibold text-ink">
              Notes
            </label>
            <textarea
              id="period-notes"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add a note..."
              className="mt-3 block min-h-[clamp(96px,8vw,120px)] w-full resize-y rounded-[24px] border border-line bg-white px-[clamp(16px,1.6vw,22px)] py-4 text-body text-ink outline-none placeholder:text-ink-faint focus:border-brand"
            />
          </div>

          {submitted && missing.length > 0 && (
            <p role="alert" className="-mt-2 text-label font-medium text-[#E11D48]">
              Please select your {missing.join(' and ')}.
            </p>
          )}

          <div className="grid grid-cols-2 items-center gap-3">
            <button
              type="button"
              onClick={handleSave}
              className="rounded-full bg-brand py-[clamp(12px,1.1vw,15px)] text-body font-semibold text-white shadow-glow transition-colors hover:bg-brand-strong"
            >
              Save Log
            </button>
            <button type="button" onClick={onClose} className="py-3 text-body font-medium text-ink-soft hover:text-ink">
              Cancel
            </button>
          </div>
        </Field>
    </Modal>
  );
}
