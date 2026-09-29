import avaRobot from '../../assets/ava-robot.png';

/**
 * Ava's robot mascot — the single source for every place Ava appears
 * (AI Recommendation card and the Ask Ava assistant), so they always match.
 * Size it with width/height classes.
 */
export function AvaAvatar({ className = '', label }: { className?: string; label?: string }) {
  // Decorative by default (Ava's name is always shown next to it); pass `label` when it stands alone
  return <img src={avaRobot} alt={label ?? ''} draggable={false} className={`select-none object-contain ${className}`} />;
}
