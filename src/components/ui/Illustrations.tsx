import { useSvgId } from '../../hooks/useSvgId';

/** Small SVG illustrations for metrics that have no suitable emoji. */

export function ScaleArt({ className = '' }: { className?: string }) {
  const id = useSvgId();
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-body`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F0F9FF" />
          <stop offset="1" stopColor="#BAE6FD" />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="57" rx="22" ry="3.5" fill="#E5E7EB" />
      <rect x="8" y="10" width="48" height="45" rx="12" fill={`url(#${id}-body)`} stroke="#BFDBFE" strokeWidth="1.5" />
      <rect x="20" y="17" width="24" height="10" rx="3" fill="#1E3A5F" />
      <text x="32" y="25" textAnchor="middle" fontSize="7" fontWeight="700" fill="#7DD3FC" fontFamily="Inter, sans-serif">56.4</text>
      <circle cx="32" cy="40" r="7" fill="none" stroke="#93C5FD" strokeWidth="1.5" strokeDasharray="2 2.4" />
    </svg>
  );
}

export function WaterGlassArt({ className = '' }: { className?: string }) {
  const id = useSvgId();
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-water`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7DD3FC" />
          <stop offset="1" stopColor="#0EA5E9" />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="58" rx="14" ry="3" fill="#E0F2FE" />
      <path d="M18 14h28l-3.5 40a4 4 0 0 1-4 3.6H25.5a4 4 0 0 1-4-3.6z" fill="#F0F9FF" stroke="#BAE6FD" strokeWidth="1.5" />
      <path d="M20.6 28h22.8l-2.4 26a3 3 0 0 1-3 2.6H26a3 3 0 0 1-3-2.6z" fill={`url(#${id}-water)`} />
      <path d="M24 31l1.6 20" stroke="#FFFFFF" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" />
      <path d="M50 6c0 0-4 5-4 7.4a4 4 0 0 0 8 0C54 11 50 6 50 6z" fill="#38BDF8" />
    </svg>
  );
}

/** Glossy 3D wellness badge with a pulse line — "Today's Symptoms" card. */
export function SymptomArt({ className = '' }: { className?: string }) {
  const id = useSvgId();
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <radialGradient id={`${id}-body`} cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#FBCFE8" />
          <stop offset="0.55" stopColor="#F472B6" />
          <stop offset="1" stopColor="#DB2777" />
        </radialGradient>
        <linearGradient id={`${id}-rim`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <filter id={`${id}-shadow`} x="-30%" y="-30%" width="160%" height="170%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#BE185D" floodOpacity="0.28" />
        </filter>
      </defs>
      <ellipse cx="32" cy="58" rx="16" ry="2.6" fill="#FBCFE8" opacity="0.7" />
      <g filter={`url(#${id}-shadow)`}>
        <rect x="9" y="7" width="46" height="46" rx="15" fill={`url(#${id}-body)`} />
        <rect x="11" y="9" width="42" height="20" rx="11" fill={`url(#${id}-rim)`} opacity="0.55" />
      </g>
      {/* pulse line with a darker underlay for depth */}
      <path d="M15 33h8l3.5-8 5 15 4-11 2.5 4H49" fill="none" stroke="#9D174D" strokeOpacity="0.35" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" transform="translate(0 1.2)" />
      <path d="M15 33h8l3.5-8 5 15 4-11 2.5 4H49" fill="none" stroke="#FFFFFF" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx="21" cy="15" rx="6" ry="3" fill="#FFFFFF" opacity="0.6" transform="rotate(-20 21 15)" />
    </svg>
  );
}

/** Two glossy 3D hearts — "Intercourse" card. */
export function IntimacyArt({ className = '' }: { className?: string }) {
  const id = useSvgId();
  const heart = 'M32 54C18 44 8 35.5 8 24.5 8 17 13.8 11 21 11c4.6 0 8.6 2.4 11 6 2.4-3.6 6.4-6 11-6 7.2 0 13 6 13 13.5C56 35.5 46 44 32 54z';
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <radialGradient id={`${id}-front`} cx="0.35" cy="0.3" r="0.85">
          <stop offset="0" stopColor="#FECDD3" />
          <stop offset="0.5" stopColor="#FB7185" />
          <stop offset="1" stopColor="#E11D48" />
        </radialGradient>
        <radialGradient id={`${id}-back`} cx="0.35" cy="0.3" r="0.85">
          <stop offset="0" stopColor="#EDE9FE" />
          <stop offset="0.55" stopColor="#C4B5FD" />
          <stop offset="1" stopColor="#8B5CF6" />
        </radialGradient>
        <filter id={`${id}-shadow`} x="-30%" y="-30%" width="160%" height="170%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#9F1239" floodOpacity="0.25" />
        </filter>
      </defs>
      <ellipse cx="30" cy="59" rx="17" ry="2.6" fill="#FBCFE8" opacity="0.7" />
      <g transform="translate(14 -4) scale(0.72)" filter={`url(#${id}-shadow)`}>
        <path d={heart} fill={`url(#${id}-back)`} />
        <ellipse cx="20" cy="20" rx="6" ry="3.2" fill="#FFFFFF" opacity="0.55" transform="rotate(-30 20 20)" />
      </g>
      <g transform="translate(-2 6) scale(0.82)" filter={`url(#${id}-shadow)`}>
        <path d={heart} fill={`url(#${id}-front)`} />
        <ellipse cx="20" cy="20" rx="6.5" ry="3.4" fill="#FFFFFF" opacity="0.6" transform="rotate(-30 20 20)" />
      </g>
    </svg>
  );
}
