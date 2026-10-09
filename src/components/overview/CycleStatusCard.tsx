import { PHASE_INFO } from '../../data/cycle';
import type { CyclePhase } from '../../types/tracker';
import { useSvgId } from '../../hooks/useSvgId';

interface CycleStatusCardProps {
  cycleDay: number;
  cycleLength: number;
  phase: CyclePhase;
}

const TIMELINE_STEPS: { id: CyclePhase | 'period'; label: string }[] = [
  { id: 'period', label: 'Period' },
  { id: 'follicular', label: 'Follicular' },
  { id: 'ovulation', label: 'Ovulation' },
  { id: 'luteal', label: 'Luteal' },
];

function getActiveStepIndex(phase: CyclePhase): number {
  switch (phase) {
    case 'menstruation':
      return 0;
    case 'follicular':
    case 'fertile':
      return 1;
    case 'ovulation':
      return 2;
    case 'luteal':
      return 3;
    default:
      return 0;
  }
}

export function CycleStatusCard({ cycleDay, cycleLength, phase }: CycleStatusCardProps) {
  const svgId = useSvgId();
  const activeIndex = getActiveStepIndex(phase);
  const info = PHASE_INFO[phase];

  // Circle geometry for progress ring
  const size = 132;
  const stroke = 9;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressRatio = Math.min(Math.max(cycleDay / cycleLength, 0), 1);
  const strokeDashoffset = circumference * (1 - progressRatio);

  // Position of glowing pip at the end of progress arc (starts from top -90deg)
  const angleRad = progressRatio * 2 * Math.PI - Math.PI / 2;
  const pipX = size / 2 + radius * Math.cos(angleRad);
  const pipY = size / 2 + radius * Math.sin(angleRad);

  return (
    <section
      aria-label="Cycle Status"
      className="relative isolate flex min-h-[clamp(145px,13vw,175px)] w-full flex-col justify-between overflow-hidden rounded-[clamp(18px,1.6vw,24px)] border border-pink-100/70 bg-[#FBEFFA] p-[clamp(14px,1.35vw,22px)] shadow-[0_12px_32px_-14px_rgba(236,72,153,0.16),0_2px_6px_rgba(17,24,39,0.04)] sm:flex-row sm:items-center sm:gap-[clamp(16px,1.8vw,28px)]"
    >
      {/* Background image; layer runs 12% past the right edge so the droplet clears the phase timeline */}
      <div
        className="pointer-events-none absolute inset-y-0 -right-[12%] left-0 -z-10 bg-[url('/images/dreamy-pink-lilac-floral-glow-background.png')] bg-cover bg-[position:right_center] bg-no-repeat"
        aria-hidden="true"
      />

      {/* Phones only: the stacked card enlarges the artwork, so lift the timeline labels off the droplet */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent from-45% to-white/60 sm:hidden"
        aria-hidden="true"
      />

      {/* Left: Circular Cycle Day Indicator */}
      <div className="relative z-10 flex shrink-0 items-center justify-center">
        <div className="relative aspect-square w-[clamp(100px,8vw,132px)]">
          <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full" aria-hidden="true">
            <defs>
              <linearGradient id={`${svgId}-ring`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#EC4899" />
                <stop offset="50%" stopColor="#D946EF" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
              <filter id={`${svgId}-ring-glow`} x="-25%" y="-25%" width="150%" height="150%">
                <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#EC4899" floodOpacity="0.35" />
              </filter>
            </defs>

            {/* Inner background glow circle */}
            <circle cx={size / 2} cy={size / 2} r={radius - stroke / 2} fill="#FFFFFF" fillOpacity="0.85" />

            {/* Inactive Track */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="#FCE7F3"
              strokeWidth={stroke}
              strokeOpacity="0.9"
            />

            {/* Active Gradient Arc */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={`url(#${svgId}-ring)`}
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
              filter={`url(#${svgId}-ring-glow)`}
            />

            {/* Glowing marker dot at the tip of the arc */}
            {progressRatio > 0.02 && (
              <circle
                cx={pipX}
                cy={pipY}
                r={stroke * 0.38}
                fill="#FFFFFF"
                filter={`url(#${svgId}-ring-glow)`}
              />
            )}
          </svg>

          {/* Central Cycle Day Number and Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-[clamp(1.75rem,2.1vw,2.35rem)] font-extrabold leading-none tracking-tight text-ink">
              {cycleDay}
            </span>
            <span className="mt-1 text-[clamp(9px,0.65vw,10.5px)] font-bold uppercase tracking-[0.14em] text-ink-muted">
              CYCLE DAY
            </span>
          </div>
        </div>
      </div>

      {/* Right: Phase Status and 4-Stage Timeline */}
      <div className="relative z-10 mt-3 flex min-w-0 flex-1 flex-col justify-center sm:mt-0">
        <p className="text-[clamp(10px,0.7vw,11.5px)] font-bold uppercase tracking-[0.16em] text-ink-muted">
          STATUS
        </p>

        <h2 className="mt-1 flex flex-wrap items-baseline gap-1.5 text-[clamp(1.1rem,1.3vw,1.38rem)] font-bold leading-tight text-ink">
          <span>{info.title}</span>
          <span className="text-brand">Healthy</span>
        </h2>

        {/* Phase Timeline: Period → Follicular → Ovulation → Luteal */}
        <div className="mt-3.5 w-full max-w-[340px]" aria-label="Cycle phase timeline">
          <div className="relative flex items-center justify-between">
            {/* Background connecting bar */}
            <div
              className="absolute left-2 right-2 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-gradient-to-r from-[#FBCFE8] via-[#E9D5FF] to-[#DDD6FE]"
              aria-hidden="true"
            />

            {TIMELINE_STEPS.map((step, idx) => {
              const isActive = idx === activeIndex;

              return (
                <div key={step.id} className="relative z-10 flex flex-col items-center">
                  {/* Step Node Dot */}
                  <div className="flex h-5 w-5 items-center justify-center">
                    {isActive ? (
                      <span className="relative flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-tr from-[#EC4899] to-[#8B5CF6] shadow-[0_0_10px_rgba(236,72,153,0.7)] ring-4 ring-pink-100">
                        <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      </span>
                    ) : (
                      <span className="h-2.5 w-2.5 rounded-full border-2 border-white bg-[#F472B6]/70 shadow-sm" />
                    )}
                  </div>

                  {/* Step Label */}
                  <span
                    className={`mt-1 text-[clamp(9.5px,0.65vw,11px)] transition-colors ${
                      isActive ? 'font-bold text-[#8B5CF6]' : 'font-medium text-ink-muted'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
