/**
 * Luteal symptom + intercourse logging: validation, summaries for Overview,
 * and the informational additions used by the AI Recommendation card.
 *
 * Nothing here infers data: a field that was never answered is reported as "not logged",
 * never as "no".
 */
import type { DailyLogData } from '../types/tracker';

export const CUSTOM_TEXT_MAX = 60;

/** Anchors of the Daily Log sections (targets of the Overview card arrows) */
export const LUTEAL_SECTION_IDS = { symptoms: 'symptom-tracking', intercourse: 'intercourse-log' } as const;
const CUSTOM_TEXT_MIN = 2;

export interface LutealFieldErrors {
  customSymptom?: string;
  protectionOther?: string;
}

function checkCustomText(value: string, what: string): string | undefined {
  const text = value.trim();
  if (text.length < CUSTOM_TEXT_MIN) return `Describe your ${what} (at least ${CUSTOM_TEXT_MIN} characters).`;
  if (text.length > CUSTOM_TEXT_MAX) return `Keep the description under ${CUSTOM_TEXT_MAX} characters.`;
  return undefined;
}

export function lutealFieldErrors(log: DailyLogData): LutealFieldErrors {
  const errors: LutealFieldErrors = {};
  if (log.symptoms.includes('Other')) {
    const e = checkCustomText(log.customSymptom, 'symptom');
    if (e) errors.customSymptom = e;
  }
  if (log.intercourse === true && log.protection === 'Other') {
    const e = checkCustomText(log.protectionOther, 'protection method');
    if (e) errors.protectionOther = e;
  }
  return errors;
}

// ---------------------------------------------------------------------------
// Overview summaries
// ---------------------------------------------------------------------------

export type SymptomSummary =
  | { state: 'not-logged' }
  | { state: 'none' }
  | { state: 'logged'; items: string[]; severity: number | null };

export function summarizeSymptoms(log: DailyLogData | undefined): SymptomSummary {
  if (!log) return { state: 'not-logged' };
  if (log.noSymptoms) return { state: 'none' };
  const items = log.symptoms.map((s) => (s === 'Other' ? log.customSymptom.trim() || 'Other' : s));
  if (items.length === 0 && log.symptomSeverity === null) return { state: 'not-logged' };
  return { state: 'logged', items, severity: log.symptomSeverity };
}

export type IntercourseSummary =
  | { state: 'not-logged' }
  | { state: 'no' }
  | { state: 'yes'; protection: string | null };

export function summarizeIntercourse(log: DailyLogData | undefined): IntercourseSummary {
  if (!log || log.intercourse === null) return { state: 'not-logged' };
  if (!log.intercourse) return { state: 'no' };
  const protection =
    log.protection === 'Other' ? log.protectionOther.trim() || 'Other' : log.protection;
  return { state: 'yes', protection };
}

// ---------------------------------------------------------------------------
// AI Recommendation additions (informational, never diagnostic)
// ---------------------------------------------------------------------------

const SYMPTOM_TIPS: Partial<Record<string, string>> = {
  Bloating: 'For bloating, steady hydration and lighter, lower-salt meals may help.',
  Cramps: 'For cramps, warmth on your lower abdomen and gentle stretching may bring relief.',
  Headache: 'For headaches, regular water, meals and rest breaks from screens may help.',
  'Trouble sleeping': 'For sleep, a consistent bedtime and a cool, dark room can make rest easier.',
  Fatigue: 'For fatigue, prioritise rest and gentle movement over intense workouts today.',
  'Mood changes': 'Mood changes are common before a period; short walks and daylight may help.',
  'Food cravings': 'For cravings, regular meals with protein and fibre can keep energy steadier.',
  'Breast tenderness': 'For breast tenderness, a supportive bra and reducing caffeine may feel better.',
  Acne: 'For skin changes, gentle cleansing and not picking at spots helps skin settle.',
};

export interface PersonalizedRecommendation {
  lines: string[];
  chips: string[];
}

/** Extra recommendation lines from the saved log for a date; null when nothing relevant is saved. */
export function personalizeRecommendation(log: DailyLogData | undefined): PersonalizedRecommendation | null {
  const symptoms = summarizeSymptoms(log);
  const intercourse = summarizeIntercourse(log);
  const lines: string[] = [];
  const chips: string[] = [];

  if (symptoms.state === 'none') {
    lines.push('You logged no symptoms — keep up the routines that are working for you.');
  } else if (symptoms.state === 'logged') {
    const named = symptoms.items.join(', ');
    lines.push(`You logged: ${named}${symptoms.severity !== null ? ` (severity ${symptoms.severity}/10)` : ''}.`);
    for (const s of log?.symptoms ?? []) {
      const tip = SYMPTOM_TIPS[s];
      if (tip && lines.length < 4) lines.push(tip);
    }
    chips.push(...(log?.symptoms ?? []).filter((s) => s !== 'Other').slice(0, 3));
    if (symptoms.severity !== null && symptoms.severity >= 7) {
      lines.push('Your symptoms feel severe today. If they are unusual for you or keep getting worse, consider speaking with a healthcare professional.');
    }
  }

  // Only the one case where information is genuinely useful; never comments on method effectiveness
  if (intercourse.state === 'yes' && log?.protection === 'None') {
    lines.push(
      'You logged intercourse without protection. Cycle tracking alone is not a reliable way to avoid pregnancy — if that matters to you, a healthcare professional can help you choose an option.',
    );
  }

  return lines.length ? { lines, chips } : null;
}
