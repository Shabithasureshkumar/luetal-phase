import { Activity, Brain, CalendarDays, type LucideIcon } from 'lucide-react';

interface Insight {
  icon: LucideIcon;
  iconClass: string;
  category: string;
  title: string;
  text: string;
}

const INSIGHTS: Insight[] = [
  {
    icon: Activity,
    iconClass: 'bg-[#EDE9FE] text-[#8B5CF6]',
    category: 'Hormonal Changes',
    title: 'Progesterone is higher',
    text: 'Progesterone typically rises during the luteal phase and may contribute to changes in body temperature, mood and energy.',
  },
  {
    icon: Brain,
    iconClass: 'bg-brand-soft text-brand-strong',
    category: 'Body & Mind',
    title: 'Energy may be lower',
    text: 'You may feel more tired or less energetic during this phase. Rest and balanced nutrition can help support your wellbeing.',
  },
  {
    icon: CalendarDays,
    iconClass: 'bg-[#DCFCE7] text-[#16A34A]',
    category: 'Cycle Pattern',
    title: 'Luteal phase',
    text: 'Your body is preparing for the next menstrual phase.',
  },
];

export function CycleInsights({ onViewDetails }: { onViewDetails: () => void }) {
  return (
    <section className="card p-card">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-heading font-semibold text-ink">Cycle Insights</h2>
          <p className="mt-0.5 text-label text-ink-muted">Based on your logged data and current cycle phase.</p>
        </div>
        <button
          type="button"
          onClick={onViewDetails}
          className="inline-flex items-center gap-2 rounded-full bg-brand-tint px-4 py-2 text-label font-medium text-brand-strong transition-colors hover:bg-brand-soft"
        >
          <Activity className="h-4 w-4" aria-hidden="true" />
          View Details
        </button>
      </header>
      <ul className="mt-5 grid grid-cols-1 gap-grid md:grid-cols-3">
        {INSIGHTS.map(({ icon: Icon, iconClass, category, title, text }) => (
          <li key={title} className="rounded-[clamp(14px,1.2vw,20px)] bg-[#FFF7FA] p-[clamp(16px,1.4vw,24px)]">
            <span className={`flex h-10 w-10 items-center justify-center rounded-full ${iconClass}`}>
              <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
            </span>
            <p className="mt-4 text-label text-ink-muted">{category}</p>
            <h3 className="mt-1 text-body font-semibold text-ink">{title}</h3>
            <p className="mt-2.5 text-label text-ink-muted">{text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
