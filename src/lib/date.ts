/**
 * Date helpers working on ISO calendar dates (YYYY-MM-DD).
 * All arithmetic is done in UTC so DST shifts never move a date.
 */

const DAY_MS = 86_400_000;
const pad = (n: number) => String(n).padStart(2, '0');

const fromUTC = (ms: number) => {
  const d = new Date(ms);
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
};

export const parts = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number);
  return { y, m, d };
};

const utc = (iso: string) => {
  const { y, m, d } = parts(iso);
  return Date.UTC(y, m - 1, d);
};

/** The user's local calendar date. */
export function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export const addDays = (iso: string, n: number) => fromUTC(utc(iso) + n * DAY_MS);

export const diffDays = (a: string, b: string) => Math.round((utc(a) - utc(b)) / DAY_MS);

/** Number of days in a month (`month` is 1-based). Handles leap years. */
const daysInMonth = (year: number, month: number) => new Date(Date.UTC(year, month, 0)).getUTCDate();

/** Shift by whole months, clamping the day (e.g. Jan 31 + 1 → Feb 28/29). */
export function addMonths(iso: string, n: number) {
  const { y, m, d } = parts(iso);
  const first = new Date(Date.UTC(y, m - 1 + n, 1));
  const ty = first.getUTCFullYear();
  const tm = first.getUTCMonth() + 1;
  return `${ty}-${pad(tm)}-${pad(Math.min(d, daysInMonth(ty, tm)))}`;
}

export const formatDate = (iso: string, options: Intl.DateTimeFormatOptions, locale = 'en-US') =>
  new Date(utc(iso)).toLocaleDateString(locale, { ...options, timeZone: 'UTC' });

/** "08:00" → "08:00 AM" */
export function formatTime(hhmm: string) {
  const [h, m] = hhmm.split(':').map(Number);
  return `${String(h % 12 || 12).padStart(2, '0')}:${String(m).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`;
}

/** e.g. "21 June 2026" */
export const longDate = (iso: string) => formatDate(iso, { day: 'numeric', month: 'long', year: 'numeric' }, 'en-GB');
