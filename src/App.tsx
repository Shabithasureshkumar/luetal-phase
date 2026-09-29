import { CYCLE_ROUTES, useRoute } from './router';
import { TopNavigation } from './components/layout/TopNavigation';
import { PageHeader } from './components/layout/PageHeader';
import { CycleNavigation } from './components/layout/CycleNavigation';
import { OverviewPage } from './pages/OverviewPage';
import { DailyLogPage } from './pages/DailyLogPage';
import { BlankPage } from './pages/BlankPage';

function App() {
  const { route, navigate } = useRoute();
  const label = CYCLE_ROUTES.find((r) => r.path === route)?.label ?? '';

  return (
    <div className="mx-auto flex w-full max-w-[1920px] flex-col gap-[clamp(16px,1.5vw,28px)] px-gutter pb-[clamp(28px,3vw,56px)] pt-[clamp(12px,1.3vw,24px)]">
      <TopNavigation onNavigate={navigate} />
      <PageHeader />
      <CycleNavigation active={route} onNavigate={navigate} />
      <main aria-label={label}>
        {route === '/overview' && <OverviewPage onNavigate={navigate} />}
        {route === '/daily-log' && <DailyLogPage />}
        {(route === '/calendar' || route === '/insights' || route === '/settings') && <BlankPage />}
      </main>
    </div>
  );
}

export default App;
