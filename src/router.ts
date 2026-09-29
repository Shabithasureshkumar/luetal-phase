import { useCallback, useEffect, useState } from 'react';

export type CycleRoute = '/overview' | '/calendar' | '/daily-log' | '/insights' | '/settings';

export const CYCLE_ROUTES: { path: CycleRoute; label: string }[] = [
  { path: '/overview', label: 'Overview' },
  { path: '/calendar', label: 'Calendar' },
  { path: '/daily-log', label: 'Daily Log' },
  { path: '/insights', label: 'Insights' },
  { path: '/settings', label: 'Settings' },
];

const DEFAULT_ROUTE: CycleRoute = '/overview';

function resolve(pathname: string): CycleRoute {
  const clean = pathname.replace(/\/+$/, '') || '/';
  return CYCLE_ROUTES.some((r) => r.path === clean) ? (clean as CycleRoute) : DEFAULT_ROUTE;
}

/** Minimal History-API router: keeps the URL and active route in sync. */
export function useRoute() {
  const [route, setRoute] = useState<CycleRoute>(() => resolve(window.location.pathname));

  useEffect(() => {
    // Normalise unknown paths (including "/") to the default route
    const initial = resolve(window.location.pathname);
    if (window.location.pathname !== initial) {
      window.history.replaceState(null, '', initial);
    }
    const onPop = () => setRoute(resolve(window.location.pathname));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = useCallback((to: CycleRoute) => {
    if (to !== window.location.pathname) {
      window.history.pushState(null, '', to);
    }
    setRoute(to);
    window.scrollTo({ top: 0 });
  }, []);

  return { route, navigate };
}
