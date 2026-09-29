import { useEffect, useRef, type KeyboardEvent, type ReactNode, type RefObject } from 'react';

interface ModalProps {
  labelledBy: string;
  describedBy?: string;
  onClose: () => void;
  /** Element to focus when the dialog opens (defaults to the first focusable element) */
  initialFocus?: RefObject<HTMLElement>;
  /** Extra classes for the panel (size, padding, layout) */
  className?: string;
  children: ReactNode;
}

const FOCUSABLE = 'button:not([disabled]), textarea, input, [tabindex]:not([tabindex="-1"])';

/**
 * Shared dialog shell: soft white overlay, bottom sheet on phones / centred panel from `sm`,
 * page-scroll lock, Escape + backdrop to close, focus trap, and focus restored to the trigger.
 */
export function Modal({ labelledBy, describedBy, onClose, initialFocus, className = '', children }: ModalProps) {
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = 'hidden';
    (initialFocus?.current ?? panel.current?.querySelector<HTMLElement>(FOCUSABLE))?.focus();
    return () => {
      document.body.style.overflow = '';
      previous?.focus();
    };
  }, [initialFocus]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      onClose();
      return;
    }
    if (e.key !== 'Tab' || !panel.current) return;
    const focusable = panel.current.querySelectorAll<HTMLElement>(FOCUSABLE);
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex animate-fadeIn items-end justify-center sm:items-center sm:p-6" onKeyDown={handleKeyDown}>
      <div className="absolute inset-0 bg-white/75 backdrop-blur-[2px]" onClick={onClose} aria-hidden="true" />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        className={`relative w-full rounded-t-[28px] border border-line bg-white shadow-[0_30px_80px_-24px_rgba(236,72,153,0.28),0_8px_24px_rgba(17,24,39,0.08)] sm:rounded-[28px] ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
