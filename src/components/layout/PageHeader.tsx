import { PATIENT } from '../../data/cycle';
import { CalendarArt } from './CalendarArt';
import { PatientProfile } from './PatientProfile';

/** "PERIOD / Cycle Tracker" branding with the patient card on the right. */
export function PageHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-[clamp(10px,1.1vw,18px)]">
        <CalendarArt className="w-[clamp(56px,5vw,92px)] shrink-0" />
        <div className="min-w-0">
          <p className="flex items-center gap-1 text-label font-bold uppercase tracking-[0.2em] text-brand-strong">
            Period
            <span aria-hidden="true" className="h-[2px] w-[clamp(40px,4.5vw,80px)] bg-brand" />
          </p>
          <h1 className="mt-0.5 text-display font-bold text-ink">
            Cycle <span className="text-brand">Tracker</span>
          </h1>
          <p className="mt-1 text-body text-ink-muted">Understand your body, one day at a time.</p>
        </div>
      </div>
      <PatientProfile patient={PATIENT} />
    </div>
  );
}
