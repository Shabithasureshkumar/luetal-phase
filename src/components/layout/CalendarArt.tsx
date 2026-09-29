import { useSvgId } from '../../hooks/useSvgId';

/** Pink calendar-with-hearts illustration used in the Cycle Tracker header. */
export function CalendarArt({ className = '' }: { className?: string }) {
  const id = useSvgId();
  return (
    <svg viewBox="0 0 120 110" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-cal-top`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F9A8D4" />
          <stop offset="1" stopColor="#F472B6" />
        </linearGradient>
        <linearGradient id={`${id}-cal-body`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#F3F4F6" />
        </linearGradient>
        <linearGradient id={`${id}-heart`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FB7185" />
          <stop offset="1" stopColor="#E11D48" />
        </linearGradient>
      </defs>
      <g transform="rotate(-8 60 58)">
        <rect x="16" y="22" width="84" height="74" rx="12" fill={`url(#${id}-cal-body)`} stroke="#F3D5E4" strokeWidth="1.5" />
        <path d="M16 34a12 12 0 0 1 12-12h60a12 12 0 0 1 12 12v6H16z" fill={`url(#${id}-cal-top)`} />
        {[30, 44, 58, 72, 86].map((x) => (
          <g key={x}>
            <rect x={x - 3} y="12" width="6" height="16" rx="3" fill="#F472B6" />
            <circle cx={x} cy="14" r="3" fill="#FBCFE8" />
          </g>
        ))}
        {[0, 1, 2, 3].map((row) =>
          [0, 1, 2, 3, 4].map((col) => (
            <rect
              key={`${row}-${col}`}
              x={24 + col * 15}
              y={47 + row * 11}
              width="10"
              height="7"
              rx="2"
              fill={row === 1 && col === 2 ? '#F472B6' : '#E5E7EB'}
            />
          )),
        )}
        <path d="M58 58c0-3 3-6 6-6 1.5 0 3 1 4 2 1-1 2.5-2 4-2 3 0 6 3 6 6 0 6-10 11-10 11s-10-5-10-11z" fill={`url(#${id}-heart)`} />
      </g>
      <path d="M100 70c0-2.4 2-4.4 4.4-4.4 1.2 0 2.2.6 3 1.4.8-.8 1.8-1.4 3-1.4 2.4 0 4.4 2 4.4 4.4 0 4.6-7.4 8.4-7.4 8.4s-7.4-3.8-7.4-8.4z" fill={`url(#${id}-heart)`} />
      <path d="M2 60c0-2 1.6-3.6 3.6-3.6 1 0 1.8.4 2.4 1 .6-.6 1.4-1 2.4-1 2 0 3.6 1.6 3.6 3.6 0 3.8-6 7-6 7s-6-3.2-6-7z" fill={`url(#${id}-heart)`} />
      <path d="M104 12l3 6M112 16l-5 4M96 8l2 6" stroke="#F472B6" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}
