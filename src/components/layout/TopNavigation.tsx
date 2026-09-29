import { useEffect, useState } from 'react';
import {
  Bell,
  Calendar,
  ChevronRight,
  CreditCard,
  FileText,
  LayoutGrid,
  Menu,
  MessageSquare,
  Search,
  Settings,
  Users,
  X,
} from 'lucide-react';
import type { CycleRoute } from '../../router';
import { PATIENT } from '../../data/cycle';
import patientPhoto from '../../assets/patient.png';

/** Global provider-dashboard sections. Only Dashboard (which hosts the Cycle Tracker) exists in this app. */
const NAV_ITEMS = [
  { name: 'Dashboard', icon: LayoutGrid },
  { name: 'Appointment', icon: Calendar },
  { name: 'Patient', icon: Users },
  { name: 'Reports', icon: FileText },
  { name: 'Chats', icon: MessageSquare },
  { name: 'Billing', icon: CreditCard },
];

const UNAVAILABLE = 'Not available in this demo';

/** Props for controls whose feature isn't part of this app: announced as disabled, still focusable. */
const unavailable = { 'aria-disabled': true, title: UNAVAILABLE } as const;

function PatientAvatar({ className = '' }: { className?: string }) {
  return (
    <span className={`flex shrink-0 overflow-hidden rounded-full border border-brand-line bg-brand-soft ${className}`}>
      <img src={patientPhoto} alt={`Photo of ${PATIENT.name}`} className="h-full w-full object-cover object-top" />
    </span>
  );
}

export function TopNavigation({ onNavigate }: { onNavigate: (route: CycleRoute) => void }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (!drawerOpen) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setDrawerOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [drawerOpen]);

  const select = (name: string) => {
    if (name !== 'Dashboard') return;
    onNavigate('/overview');
    setDrawerOpen(false);
  };

  const iconBtn =
    'relative flex h-[clamp(36px,2.3vw,42px)] w-[clamp(36px,2.3vw,42px)] items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-[#F3F4F6] aria-disabled:cursor-not-allowed aria-disabled:hover:bg-transparent';

  return (
    <header className="flex items-center justify-between gap-4">
      {/* Desktop / tablet pill navigation */}
      <nav
        aria-label="Primary"
        className="hidden min-w-0 items-center gap-[clamp(12px,1.7vw,30px)] rounded-full border border-line bg-white p-1 pr-[clamp(16px,2vw,32px)] shadow-pill lg:flex"
      >
        {NAV_ITEMS.map(({ name, icon: Icon }) =>
          name === 'Dashboard' ? (
            <button
              key={name}
              type="button"
              onClick={() => select(name)}
              aria-current="page"
              className="flex h-[clamp(38px,2.5vw,44px)] items-center gap-2.5 rounded-full bg-gradient-to-r from-nav to-nav-light px-[clamp(14px,1.5vw,24px)] text-label font-semibold text-white shadow-soft"
            >
              <Icon className="h-[18px] w-[18px]" fill="currentColor" strokeWidth={1.5} />
              {name}
            </button>
          ) : (
            <button key={name} type="button" {...unavailable} className="cursor-not-allowed whitespace-nowrap text-label font-semibold text-ink">
              {name}
            </button>
          ),
        )}
      </nav>

      {/* Mobile menu trigger */}
      <button
        type="button"
        onClick={() => setDrawerOpen(true)}
        aria-label="Open navigation menu"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-white text-ink shadow-pill lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Actions + physician */}
      <div className="flex min-w-0 items-center gap-[clamp(4px,1vw,20px)]">
        <div className="flex items-center gap-[clamp(2px,0.5vw,10px)]">
          <button type="button" aria-label="Search" {...unavailable} className={`${iconBtn} bg-[#E5E7EB] aria-disabled:hover:bg-[#E5E7EB]`}>
            <Search className="h-[18px] w-[18px]" strokeWidth={2.2} />
          </button>
          <button type="button" aria-label="Cycle Tracker settings" onClick={() => onNavigate('/settings')} className={iconBtn}>
            <Settings className="h-5 w-5" fill="#6B7280" stroke="#6B7280" strokeWidth={1.6} />
            <span className="absolute h-[7px] w-[7px] rounded-full bg-white" />
          </button>
          <button type="button" aria-label="Notifications" {...unavailable} className={iconBtn}>
            <Bell className="h-5 w-5" fill="#6B7280" stroke="#6B7280" strokeWidth={1.6} />
          </button>
        </div>
        <div className="flex min-w-0 items-center gap-2.5" aria-label="Current patient" role="group">
          <PatientAvatar className="h-[clamp(32px,2.1vw,38px)] w-[clamp(32px,2.1vw,38px)]" />
          <div className="hidden min-w-0 flex-col sm:flex">
            <span className="truncate text-caption font-semibold text-ink">{PATIENT.name}</span>
            <span className="truncate text-caption text-ink-faint">
              <span className="sr-only">Patient ID </span>
              {PATIENT.id}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div role="dialog" aria-modal="true" aria-label="Navigation menu" className="fixed inset-0 z-50 flex animate-fadeIn lg:hidden">
          <div className="fixed inset-0 bg-black/40" onClick={() => setDrawerOpen(false)} aria-hidden="true" />
          <div className="relative z-10 flex h-full w-[280px] max-w-[82vw] animate-slideRight flex-col justify-between bg-white p-5 shadow-2xl">
            <div>
              <div className="flex items-center justify-between border-b border-line pb-4">
                <span className="text-body font-bold text-ink">Menu</span>
                <button type="button" onClick={() => setDrawerOpen(false)} aria-label="Close navigation menu" className="rounded-full p-1 text-ink-faint hover:bg-[#F3F4F6]">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <ul className="space-y-1 py-4">
                {NAV_ITEMS.map(({ name, icon: Icon }) => (
                  <li key={name}>
                    <button
                      type="button"
                      {...(name === 'Dashboard' ? { onClick: () => select(name), 'aria-current': 'page' as const } : unavailable)}
                      className={`flex w-full items-center justify-between rounded-xl px-3.5 py-3 text-label font-semibold ${
                        name === 'Dashboard' ? 'bg-gradient-to-r from-nav to-nav-light text-white' : 'cursor-not-allowed text-ink'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <Icon className="h-4 w-4" />
                        {name}
                      </span>
                      <ChevronRight className="h-4 w-4 opacity-50" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center gap-3 border-t border-line pt-4">
              <PatientAvatar className="h-9 w-9" />
              <div className="min-w-0">
                <p className="truncate text-label font-semibold text-ink">{PATIENT.name}</p>
                <p className="truncate text-caption text-ink-faint">
                  <span className="sr-only">Patient ID </span>
                  {PATIENT.id}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
