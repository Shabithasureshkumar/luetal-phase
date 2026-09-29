import { useMemo, useState } from 'react';
import { MEDICATION_HISTORY, PATIENT } from '../data/cycle';
import type { CycleRoute } from '../router';
import { useTracker } from '../state/trackerStore';
import patientPhoto from '../assets/patient.png';
import { Battery } from '../components/ui/Battery';
import { Emoji } from '../components/ui/Emoji';
import { ScaleArt, WaterGlassArt } from '../components/ui/Illustrations';
import { AIRecommendation } from '../components/overview/AIRecommendation';
import { CycleInsights } from '../components/overview/CycleInsights';
import { CycleStatusCard } from '../components/overview/CycleStatusCard';
import { MedicationHistory } from '../components/overview/MedicationHistory';
import { MetricCard, type MetricCardProps } from '../components/overview/MetricCard';
import { PhaseCard } from '../components/overview/PhaseCard';
import { LogPeriodModal } from '../components/overview/LogPeriodModal';
import { AvaAssistantModal } from '../components/overview/AvaAssistantModal';
import { useAvaChat } from '../hooks/useAvaChat';
import type { AvaContext } from '../lib/ava';

const visualSize = 'w-[clamp(50px,4.2vw,72px)]';
const emojiSize = 'text-[clamp(36px,3vw,52px)]';

const METRICS: MetricCardProps[] = [
  {
    label: 'Mood',
    value: 'Irritable',
    description: 'How are you feeling today?',
    badge: { text: 'Balanced', className: 'bg-[#EDE9FE] text-[#7C3AED]' },
    accent: 'bg-[#EDE9FE] text-[#6D28D9]',
    visual: (
      <span className={`${visualSize} aspect-square overflow-hidden rounded-full bg-brand-soft`}>
        <img src={patientPhoto} alt="" className="h-full w-full object-cover object-top" />
      </span>
    ),
  },
  {
    label: 'Body Weight',
    value: '56.4 kg',
    description: 'Within healthy range',
    accent: 'bg-[#E0F2FE] text-[#0284C7]',
    visual: <ScaleArt className={visualSize} />,
  },
  {
    label: 'Hydration',
    value: '1.8 / 2.5L',
    description: 'Optimal daily goal',
    badge: { text: '72%', className: 'bg-[#CFFAFE] text-[#0E7490]' },
    accent: 'bg-[#CFFAFE] text-[#0891B2]',
    visual: <WaterGlassArt className={visualSize} />,
  },
  {
    label: 'Fatigue Level',
    value: 'Low Fatigue',
    description: 'Well rested today',
    accent: 'bg-[#FEF9C3] text-[#CA8A04]',
    visual: <Battery level={1} color="#22C55E" className="h-[clamp(50px,4.2vw,72px)]" />,
  },
  {
    label: 'Sleep Quality',
    value: '8h 15m',
    description: 'Deep sleep 2h 40m',
    accent: 'bg-[#E0E7FF] text-[#4F46E5]',
    visual: <Emoji symbol="😴" label="Sleep" className={emojiSize} />,
  },
  {
    label: 'Daily Activity',
    value: '8,420 steps',
    description: '84% of daily target',
    accent: 'bg-[#DCFCE7] text-[#16A34A]',
    visual: <Emoji symbol="👟" label="Activity" className={emojiSize} />,
  },
  {
    label: 'Energy Level',
    value: 'High Energy',
    description: 'Peak morning surge',
    badge: { text: 'Peak', className: 'bg-[#FEF3C7] text-[#D97706]' },
    accent: 'bg-[#FFEDD5] text-[#EA580C]',
    visual: (
      <span className={`${visualSize} flex aspect-square items-center justify-center rounded-full bg-[#FFF7ED]`}>
        <Emoji symbol="⚡" label="Energy" className="text-[clamp(26px,2.3vw,38px)]" />
      </span>
    ),
  },
  {
    label: 'Cravings',
    value: 'Minimal',
    description: 'Sweet balance tracked',
    accent: 'bg-[#ECFCCB] text-[#65A30D]',
    visual: <Emoji symbol="🧁" label="Cravings" className={emojiSize} />,
  },
];

function scrollToRecommendation() {
  const target = document.getElementById('ai-recommendation');
  if (!target) return;
  const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  target.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
  target.focus({ preventScroll: true });
}

export function OverviewPage({ onNavigate }: { onNavigate: (route: CycleRoute) => void }) {
  const { today, logs, periods, savePeriodLog, cycleInfo } = useTracker();
  const [logOpen, setLogOpen] = useState(false);
  const [avaOpen, setAvaOpen] = useState(false);
  const { cycleDay, phase } = cycleInfo(today);

  // Ava only sees data that actually exists in the app for today
  const avaContext = useMemo<AvaContext>(
    () => ({
      date: today,
      phase,
      cycleDay,
      cycleLength: PATIENT.cycleLengthDays,
      log: logs[today],
      period: periods[today],
    }),
    [today, phase, cycleDay, logs, periods],
  );
  const ava = useAvaChat(avaContext);

  return (
    <div className="flex flex-col gap-grid">
      <div className="grid grid-cols-1 gap-grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <CycleStatusCard cycleDay={cycleDay} cycleLength={PATIENT.cycleLengthDays} phase={phase} />
        <PhaseCard phase={phase} onLogPeriod={() => setLogOpen(true)} onViewTips={scrollToRecommendation} />
      </div>

      <div className="grid grid-cols-1 gap-grid sm:grid-cols-2 xl:grid-cols-4">
        {METRICS.map((m) => (
          <MetricCard key={m.label} {...m} onOpen={() => onNavigate('/daily-log')} />
        ))}
      </div>

      <AIRecommendation phase={phase} onAskAva={() => setAvaOpen(true)} />
      <MedicationHistory entries={MEDICATION_HISTORY} onViewAll={() => onNavigate('/daily-log')} />
      <CycleInsights onViewDetails={() => onNavigate('/insights')} />

      {avaOpen && (
        <AvaAssistantModal
          context={avaContext}
          greeting={ava.greeting}
          suggestions={ava.suggestions}
          messages={ava.messages}
          pending={ava.pending}
          onSend={ava.send}
          onClose={() => setAvaOpen(false)}
        />
      )}

      {logOpen && (
        <LogPeriodModal
          date={today}
          isToday
          initial={periods[today]}
          onClose={() => setLogOpen(false)}
          onSave={(log) => {
            savePeriodLog(today, log);
            setLogOpen(false);
          }}
        />
      )}
    </div>
  );
}
