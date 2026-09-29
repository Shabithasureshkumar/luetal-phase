import { Check, Clock, Flame, Footprints, Zap } from 'lucide-react';
import type { ReactNode } from 'react';
import { STEP_GOALS } from '../../data/cycle';
import { Emoji } from '../ui/Emoji';
import { ProgressRing } from '../ui/ProgressRing';

interface DailyActivitySectionProps {
  steps: number;
  goal: number;
  onStepsChange: (steps: number) => void;
  onGoalChange: (goal: number) => void;
}

const fmt = (n: number) => n.toLocaleString('en-US');

export function DailyActivitySection({ steps, goal, onStepsChange, onGoalChange }: DailyActivitySectionProps) {
  const percent = Math.min(100, Math.round((steps / goal) * 100));
  const reached = steps >= goal;
  const calories = Math.round(steps * 0.04);
  const activeMinutes = Math.round(steps / 125);

  return (
    <section className="card flex min-w-0 flex-col gap-[clamp(12px,1.1vw,18px)] p-card">
      <header className="flex flex-wrap items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-brand-line bg-white text-[#F43F5E]">
          <Zap className="h-5 w-5" aria-hidden="true" />
        </span>
        {/* min width lets the status badge wrap below on narrow screens instead of squeezing the title */}
        <div className="min-w-[10rem] flex-1">
          <h3 className="text-heading font-semibold text-ink">Daily Activity</h3>
          <p className="mt-0.5 text-label text-ink-muted">Keep moving consistently throughout the day.</p>
        </div>
        {reached && (
          <span className="inline-flex items-center gap-1 rounded-full border border-[#BBF7D0] bg-[#F0FDF4] px-3 py-1 text-caption font-semibold text-[#15803D]">
            <Check className="h-3.5 w-3.5" aria-hidden="true" />
            Goal Reached!
          </span>
        )}
      </header>

      <div className="flex flex-col items-center gap-[clamp(16px,1.6vw,28px)] min-[480px]:flex-row">
        <div className="w-[clamp(128px,9.5vw,156px)]">
          <ProgressRing value={steps / goal} size={156} stroke={11} color="#F43F5E" track="#FFE4E6">
            <Footprints className="h-4 w-4 text-[#F43F5E]" aria-hidden="true" />
            <span className="mt-1 text-title font-bold text-ink">{fmt(steps)}</span>
            <span className="text-caption uppercase tracking-[0.1em] text-ink-faint">Steps</span>
            <span className="mt-0.5 whitespace-nowrap text-micro text-ink-muted">
              {fmt(steps)} / {fmt(goal)} · {percent}%
            </span>
          </ProgressRing>
        </div>

        <div className="flex w-full min-w-0 flex-1 flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="w-12 text-label text-ink-soft">Goal</span>
            <div role="group" aria-label="Step goal" className="flex flex-wrap gap-2">
              {STEP_GOALS.map((g) => (
                <button
                  key={g}
                  type="button"
                  aria-pressed={goal === g}
                  onClick={() => onGoalChange(g)}
                  className={`rounded-full px-3.5 py-1.5 text-caption font-medium transition-colors ${
                    goal === g ? 'border-2 border-brand bg-brand-soft text-brand-strong' : 'border border-line bg-white text-ink-soft hover:border-brand-line'
                  }`}
                >
                  {fmt(g)}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <label htmlFor="steps-input" className="w-12 text-label text-ink-soft">
              Steps
            </label>
            <input
              id="steps-input"
              type="number"
              min="0"
              inputMode="numeric"
              value={steps}
              onChange={(e) => onStepsChange(Math.max(0, Number(e.target.value) || 0))}
              className="w-[clamp(96px,10vw,140px)] min-w-0 rounded-full border border-line bg-white px-4 py-2 text-label font-semibold text-ink outline-none focus:border-brand"
            />
            <span className="rounded-full bg-[#F3F4F6] px-3.5 py-1.5 text-caption font-medium text-ink-muted">Manual entry</span>
          </div>
        </div>
      </div>

      <p className="flex items-center justify-between gap-3 rounded-[14px] border border-[#DCFCE7] bg-[#F0FDF4] px-4 py-3 text-caption text-ink-soft">
        <span className="flex items-center gap-2">
          <Emoji symbol="🎉" className="text-[14px]" />
          {reached
            ? "Great job! You've reached your daily goal."
            : percent >= 50
              ? "Great job! You're almost at your daily goal."
              : 'Keep moving to reach your daily goal.'}
        </span>
        <span className="rounded-full bg-[#DCFCE7] px-2 py-0.5 font-semibold text-[#15803D]">{percent}%</span>
      </p>

      <div className="grid grid-cols-1 gap-3 min-[400px]:grid-cols-2">
        <Stat icon={<Flame className="h-4 w-4" />} iconClass="border-[#FED7AA] text-[#F97316]" label="Calories burned" value={fmt(calories)} unit="kcal" />
        <Stat icon={<Clock className="h-4 w-4" />} iconClass="border-[#DDD6FE] text-[#8B5CF6]" label="Active time" value={String(activeMinutes)} unit="min" />
      </div>
    </section>
  );
}

function Stat({ icon, iconClass, label, value, unit }: { icon: ReactNode; iconClass: string; label: string; value: string; unit: string }) {
  return (
    <div className="flex items-center gap-3 rounded-[14px] border border-line bg-white px-4 py-3">
      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${iconClass}`} aria-hidden="true">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-caption uppercase leading-tight tracking-[0.06em] text-ink-faint">{label}</p>
        <p className="text-body font-semibold text-ink">
          {value} <span className="text-caption font-normal text-ink-muted">{unit}</span>
        </p>
      </div>
    </div>
  );
}
