import type { ReactNode } from 'react';

interface ProgressRingProps {
  /** 0–1 */
  value: number;
  size?: number;
  stroke?: number;
  color?: string;
  track?: string;
  /** Split the ring into equal segments separated by small gaps */
  segments?: number;
  children?: ReactNode;
  className?: string;
}

/** Fluid SVG progress ring — scales down with its container (max `size` px). */
export function ProgressRing({
  value,
  size = 140,
  stroke = 10,
  color = '#EC4899',
  track = '#FCE7F3',
  segments = 1,
  children,
  className = '',
}: ProgressRingProps) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const v = Math.min(Math.max(value, 0), 1);
  const center = size / 2;

  const gap = segments > 1 ? c * 0.07 : 0;
  const seg = c / segments - gap;
  const offset = segments > 1 ? seg / 2 : 0; // centre the first segment at 12 o'clock
  const arc = (key: number, stroke_: string, length: number, start: number) => (
    <circle
      key={key}
      cx={center}
      cy={center}
      r={r}
      fill="none"
      stroke={stroke_}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeDasharray={`${length} ${c}`}
      strokeDashoffset={offset - start}
    />
  );

  const filled = segments > 1 ? Math.round(v * segments) : 0;

  return (
    <div className={`relative aspect-square w-full shrink-0 ${className}`} style={{ maxWidth: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full -rotate-90" aria-hidden="true">
        {segments > 1
          ? Array.from({ length: segments }, (_, i) => arc(i, i < filled ? color : track, seg, i * (seg + gap)))
          : [arc(0, track, c, 0), v > 0 && arc(1, color, c * v, 0)]}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">{children}</div>
    </div>
  );
}
