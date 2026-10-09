import { useId, type ReactNode } from 'react';
import { Activity, Heart } from 'lucide-react';
import { LUTEAL_SYMPTOMS, PROTECTION_METHODS, SEVERITY_SCALE } from '../../data/cycle';
import { CUSTOM_TEXT_MAX, LUTEAL_SECTION_IDS, type LutealFieldErrors } from '../../lib/lutealLog';
import type { DailyLogData, LutealSymptom, ProtectionMethod } from '../../types/tracker';

const pill = (selected: boolean) =>
  `rounded-full border px-[clamp(12px,1vw,16px)] py-[clamp(6px,0.5vw,8px)] text-label font-medium transition-colors ${
    selected
      ? 'border-brand-strong bg-brand-strong text-white'
      : 'border-brand-line bg-white text-ink hover:border-brand hover:bg-brand-tint'
  }`;

const textField = (invalid: boolean) =>
  `w-full min-w-0 rounded-full border bg-white px-4 py-2.5 text-label text-ink outline-none placeholder:text-ink-faint focus:border-brand ${
    invalid ? 'border-[#FDA4AF]' : 'border-brand-line'
  }`;

function SectionCard({ id, icon, title, subtitle, aside, children }: { id: string; icon: ReactNode; title: string; subtitle?: string; aside?: ReactNode; children: ReactNode }) {
  return (
    <section id={id} tabIndex={-1} className="scroll-mt-6 rounded-card border border-brand-line bg-white p-card shadow-card outline-none">
      <header className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand-strong">{icon}</span>
          <div className="min-w-0">
            <h3 className="text-body font-semibold text-ink">{title}</h3>
            {subtitle && <p className="text-caption text-ink-muted">{subtitle}</p>}
          </div>
        </div>
        {aside}
      </header>
      <div className="mt-[clamp(14px,1.3vw,18px)] flex flex-col gap-[clamp(14px,1.3vw,18px)]">{children}</div>
    </section>
  );
}

function DescribeField({ label, value, error, onChange }: { label: string; value: string; error?: string; onChange: (v: string) => void }) {
  const id = useId();
  return (
    <div className="flex max-w-[420px] flex-col gap-1.5">
      <label htmlFor={id} className="text-label font-medium text-ink">
        {label}
      </label>
      <input
        id={id}
        value={value}
        maxLength={CUSTOM_TEXT_MAX}
        autoComplete="off"
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={textField(Boolean(error))}
      />
      {error && (
        // Not role="alert": the Save bar announces the failure; this text is read via aria-describedby
        <p id={`${id}-error`} className="text-caption font-medium text-[#E11D48]">
          {error}
        </p>
      )}
    </div>
  );
}

interface SymptomTrackingProps {
  draft: DailyLogData;
  errors: LutealFieldErrors;
  phaseLabel: string;
  onToggleSymptom: (s: LutealSymptom) => void;
  onToggleNoSymptoms: () => void;
  onSeverity: (n: number) => void;
  onCustomSymptom: (text: string) => void;
}

export function SymptomTrackingSection({
  draft,
  errors,
  phaseLabel,
  onToggleSymptom,
  onToggleNoSymptoms,
  onSeverity,
  onCustomSymptom,
}: SymptomTrackingProps) {
  const id = useId();
  return (
    <SectionCard
      id={LUTEAL_SECTION_IDS.symptoms}
      icon={<Activity className="h-5 w-5" aria-hidden="true" />}
      title="Symptom Tracking"
      aside={<span className="pt-1 text-caption text-ink-muted">{phaseLabel} symptoms</span>}
    >
      <div className="flex flex-col gap-3">
        <p id={`${id}-symptoms`} className="text-label text-ink-soft">
          Select everything you&apos;re feeling today:
        </p>
        <div role="group" aria-labelledby={`${id}-symptoms`} className="flex flex-wrap gap-2">
          {LUTEAL_SYMPTOMS.map((s) => {
            const selected = draft.symptoms.includes(s);
            return (
              <button key={s} type="button" aria-pressed={selected} onClick={() => onToggleSymptom(s)} className={pill(selected)}>
                {s}
              </button>
            );
          })}
        </div>
        <div>
          <button
            type="button"
            aria-pressed={draft.noSymptoms}
            onClick={onToggleNoSymptoms}
            className={`rounded-full border px-3.5 py-1.5 text-caption font-medium transition-colors ${
              draft.noSymptoms
                ? 'border-brand-strong bg-brand-strong text-white'
                : 'border-dashed border-[#D1D5DB] bg-white text-ink-muted hover:border-brand hover:text-ink'
            }`}
          >
            No symptoms today
          </button>
        </div>
        {draft.symptoms.includes('Other') && (
          <DescribeField label="Describe your symptom" value={draft.customSymptom} error={errors.customSymptom} onChange={onCustomSymptom} />
        )}
      </div>

      <div className="flex flex-col gap-2.5">
        <p id={`${id}-severity`} className="text-label font-medium text-ink">
          Severity <span className="font-normal text-ink-muted">(optional, 0 none – 10 worst)</span>
        </p>
        <div role="radiogroup" aria-labelledby={`${id}-severity`} className="flex flex-wrap gap-[clamp(6px,0.6vw,8px)]">
          {SEVERITY_SCALE.map((n) => {
            const selected = draft.symptomSeverity === n;
            return (
              <button
                key={n}
                type="button"
                role="radio"
                aria-checked={selected}
                aria-label={`Severity ${n}`}
                disabled={draft.noSymptoms}
                onClick={() => onSeverity(n)}
                className={`flex h-8 w-8 items-center justify-center rounded-full border text-caption font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                  selected ? 'border-brand-strong bg-brand-strong text-white' : 'border-brand-line bg-white text-ink-muted hover:border-brand'
                }`}
              >
                {n}
              </button>
            );
          })}
        </div>
      </div>
    </SectionCard>
  );
}

interface IntercourseProps {
  draft: DailyLogData;
  errors: LutealFieldErrors;
  onAnswer: (yes: boolean) => void;
  onProtection: (m: ProtectionMethod) => void;
  onProtectionOther: (text: string) => void;
}

export function IntercourseSection({ draft, errors, onAnswer, onProtection, onProtectionOther }: IntercourseProps) {
  const id = useId();
  return (
    <SectionCard
      id={LUTEAL_SECTION_IDS.intercourse}
      icon={<Heart className="h-5 w-5" fill="currentColor" aria-hidden="true" />}
      title="Intercourse"
      subtitle="Log your activity to better understand your fertile window"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p id={`${id}-q`} className="text-label text-ink">
          Did you have intercourse today?
        </p>
        <div role="radiogroup" aria-labelledby={`${id}-q`} className="flex gap-2">
          {[
            { label: 'Yes', value: true },
            { label: 'No', value: false },
          ].map((o) => {
            const selected = draft.intercourse === o.value;
            return (
              <button
                key={o.label}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => onAnswer(o.value)}
                className={`min-w-[72px] rounded-full border px-5 py-2 text-label font-semibold transition-colors ${
                  selected ? 'border-brand-strong bg-brand-strong text-white' : 'border-brand-line bg-white text-ink hover:border-brand'
                }`}
              >
                {o.label}
              </button>
            );
          })}
        </div>
      </div>

      {draft.intercourse === true && (
        <div className="flex flex-col gap-3">
          <p id={`${id}-method`} className="text-label font-medium text-ink">
            Protection / contraception method
          </p>
          <div role="radiogroup" aria-labelledby={`${id}-method`} className="flex flex-wrap gap-2">
            {PROTECTION_METHODS.map((m) => {
              const selected = draft.protection === m;
              return (
                <button key={m} type="button" role="radio" aria-checked={selected} onClick={() => onProtection(m)} className={`${pill(selected)} min-w-[64px] font-semibold`}>
                  {m}
                </button>
              );
            })}
          </div>
          {draft.protection === 'Other' && (
            <DescribeField label="Describe the method" value={draft.protectionOther} error={errors.protectionOther} onChange={onProtectionOther} />
          )}
        </div>
      )}
    </SectionCard>
  );
}
