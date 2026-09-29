import { CYCLE_ROUTES, type CycleRoute } from '../../router';

interface CycleNavigationProps {
  active: CycleRoute;
  onNavigate: (route: CycleRoute) => void;
}

export function CycleNavigation({ active, onNavigate }: CycleNavigationProps) {
  return (
    <nav aria-label="Cycle tracker" className="no-scrollbar overflow-x-auto rounded-full bg-[#FDF0F6] p-[clamp(4px,0.35vw,6px)]">
      <ul className="flex min-w-max items-center gap-[clamp(2px,0.6vw,12px)]">
        {CYCLE_ROUTES.map(({ path, label }) => {
          const isActive = path === active;
          return (
            <li key={path}>
              <a
                href={path}
                aria-current={isActive ? 'page' : undefined}
                onClick={(e) => {
                  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
                  e.preventDefault();
                  onNavigate(path);
                }}
                className={`block whitespace-nowrap rounded-full px-[clamp(14px,1.5vw,24px)] py-[clamp(7px,0.55vw,10px)] text-body transition-colors ${
                  isActive ? 'bg-white font-semibold text-brand-strong shadow-pill' : 'font-medium text-ink-soft hover:text-brand-strong'
                }`}
              >
                {label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
