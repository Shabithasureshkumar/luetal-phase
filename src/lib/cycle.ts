import type { CyclePhase, PeriodLog } from '../types/tracker';
import { addDays, diffDays } from './date';

export interface CycleInfo {
  cycleDay: number;
  phase: CyclePhase;
}

const MENSTRUATION_DAYS = 5;
const STARTS_PERIOD: PeriodLog['flow'][] = ['Light', 'Medium', 'Heavy'];

/** Standard model: ovulation ~14 days before the next period, fertile window the 5 days before it. */
function phaseForDay(cycleDay: number, cycleLength: number): CyclePhase {
  const ovulation = cycleLength - 14;
  if (cycleDay <= MENSTRUATION_DAYS) return 'menstruation';
  if (cycleDay === ovulation) return 'ovulation';
  if (cycleDay >= ovulation - 5 && cycleDay < ovulation) return 'fertile';
  if (cycleDay < ovulation) return 'follicular';
  return 'luteal';
}

function cycleDayFrom(start: string, date: string, cycleLength: number) {
  const diff = diffDays(date, start);
  return (((diff % cycleLength) + cycleLength) % cycleLength) + 1;
}

/** Cycle position of `date`, projected from the most recent period start on or before it. */
export function getCycleInfo(date: string, starts: string[], cycleLength: number): CycleInfo {
  const anchor = [...starts].reverse().find((s) => s <= date) ?? starts[0];
  const cycleDay = cycleDayFrom(anchor, date, cycleLength);
  return { cycleDay, phase: phaseForDay(cycleDay, cycleLength) };
}

/**
 * Period start dates: the baseline start plus every logged period day (Light flow or heavier)
 * that begins a new bleed and doesn't fall inside an already-running period.
 */
export function derivePeriodStarts(baseline: string, periods: Record<string, PeriodLog>, cycleLength: number) {
  const isBleed = (d: string) => {
    const flow = periods[d]?.flow;
    return flow !== undefined && STARTS_PERIOD.includes(flow);
  };
  const candidates = [baseline, ...Object.keys(periods).filter((d) => isBleed(d) && !isBleed(addDays(d, -1)))];
  const sorted = [...new Set(candidates)].sort();

  const starts: string[] = [];
  for (const date of sorted) {
    if (starts.length === 0 || getCycleInfo(date, starts, cycleLength).cycleDay > MENSTRUATION_DAYS) {
      starts.push(date);
    }
  }
  return starts;
}
