interface EmojiProps {
  symbol: string;
  /** Accessible name. Omit for purely decorative emoji (hidden from assistive tech). */
  label?: string;
  className?: string;
}

/**
 * Colour emoji used as a lightweight illustration. Size it with a font-size class.
 * The emoji font stack only renders the glyph; all text in the app uses Inter.
 */
export function Emoji({ symbol, label, className = '' }: EmojiProps) {
  const a11y = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true };
  return (
    <span
      {...a11y}
      className={`inline-flex select-none items-center justify-center leading-none ${className}`}
      style={{ fontFamily: '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji"' }}
    >
      {symbol}
    </span>
  );
}
