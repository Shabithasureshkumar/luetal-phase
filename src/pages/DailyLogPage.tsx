import { Zap } from 'lucide-react';
import { useDailyLog } from '../hooks/useDailyLog';
import { PHASE_INFO } from '../data/cycle';
import { longDate } from '../lib/date';
import type { CravingLevel, EnergyLevel, FatigueLevel, MoodType, SleepQuality } from '../types/tracker';
import patientPhoto from '../assets/patient.png';
import { Battery } from '../components/ui/Battery';
import { Emoji } from '../components/ui/Emoji';
import { AIWellnessInsights } from '../components/daily-log/AIWellnessInsights';
import { BodyWeightSection } from '../components/daily-log/BodyWeightSection';
import { ChoiceSection, type ChoiceOption } from '../components/daily-log/ChoiceSection';
import { CycleDayStrip } from '../components/daily-log/CycleDayStrip';
import { DailyActivitySection } from '../components/daily-log/DailyActivitySection';
import { HydrationSection } from '../components/daily-log/HydrationSection';
import { MedicationSection } from '../components/daily-log/MedicationSection';
import { SaveLogBar } from '../components/daily-log/SaveLogBar';
import { IntercourseSection, SymptomTrackingSection } from '../components/daily-log/LutealLogSections';

const tileEmoji = 'text-[clamp(26px,2.1vw,36px)]';
const headerEmoji = 'text-[clamp(22px,1.7vw,28px)]';

function MoodFace({ symbol, label }: { symbol: string; label: string }) {
  return (
    <span className="flex aspect-square h-full items-center justify-center rounded-full bg-brand-soft">
      <Emoji symbol={symbol} label={label} className="text-[clamp(20px,1.6vw,26px)]" />
    </span>
  );
}

const MOODS: ChoiceOption<MoodType>[] = [
  { value: 'Happy', visual: <MoodFace symbol="😊" label="Happy" /> },
  { value: 'Calm', visual: <MoodFace symbol="😌" label="Calm" /> },
  { value: 'Neutral', visual: <MoodFace symbol="😐" label="Neutral" /> },
  { value: 'Irritable', visual: <MoodFace symbol="😣" label="Irritable" /> },
  { value: 'Sad', visual: <MoodFace symbol="😢" label="Sad" /> },
];

const batteryH = 'h-[clamp(30px,2.5vw,42px)]';
const FATIGUE: ChoiceOption<FatigueLevel>[] = [
  { value: 'None', visual: <Battery level={0.12} color="#F43F5E" className={batteryH} /> },
  { value: 'Mild', visual: <Battery level={0.5} color="#F59E0B" className={batteryH} /> },
  { value: 'Moderate', visual: <Battery level={0.8} color="#22C55E" className={batteryH} /> },
  { value: 'High', visual: <Battery level={1} color="#22C55E" className={batteryH} /> },
];

const SLEEP: ChoiceOption<SleepQuality>[] = [
  { value: 'Poor', visual: <Emoji symbol="😟" label="Poor" className={tileEmoji} /> },
  { value: 'Fair', visual: <Emoji symbol="😥" label="Fair" className={tileEmoji} /> },
  { value: 'Good', visual: <Emoji symbol="😴" label="Good" className={tileEmoji} /> },
  { value: 'Excellent', visual: <Emoji symbol="🛌" label="Excellent" className={tileEmoji} /> },
];

const bolt = (color: string) => <Zap className="h-[clamp(26px,2.1vw,36px)] w-[clamp(26px,2.1vw,36px)]" fill={color} stroke={color} strokeWidth={1.2} aria-hidden="true" />;
const ENERGY: ChoiceOption<EnergyLevel>[] = [
  { value: 'Low', visual: bolt('#F9A8D4') },
  { value: 'Moderate', visual: bolt('#FACC15') },
  { value: 'High', visual: bolt('#F43F5E') },
];

const CRAVINGS: ChoiceOption<CravingLevel>[] = [
  { value: 'None', visual: <Emoji symbol="🍌" label="None" className={tileEmoji} /> },
  { value: 'Mild', visual: <Emoji symbol="🍫" label="Mild" className={tileEmoji} /> },
  { value: 'Moderate', visual: <Emoji symbol="🧁" label="Moderate" className={tileEmoji} /> },
  { value: 'High', visual: <Emoji symbol="🍫" label="High" className={tileEmoji} /> },
];

export function DailyLogPage() {
  const log = useDailyLog();
  const { draft, update, selectedDate, info } = log;

  return (
    <div className="flex flex-col gap-grid">
      <CycleDayStrip
        today={log.today}
        dates={log.windowDates}
        selectedDate={selectedDate}
        info={info}
        cycleInfo={log.cycleInfo}
        isLogged={log.isLogged}
        onSelect={log.selectDate}
        onToday={log.goToToday}
        onShiftWeek={log.shiftWeek}
        onShiftMonth={log.shiftMonth}
      />

      <div className="pt-1">
        <h2 className="text-title font-bold text-ink">{PHASE_INFO[info.phase].title}</h2>
        <p className="mt-0.5 text-body text-ink-muted">
          {selectedDate === log.today ? 'Today, ' : ''}
          {longDate(selectedDate)}
        </p>
      </div>

      <AIWellnessInsights cycleDay={info.cycleDay} phase={info.phase} />

      <div className="grid grid-cols-1 gap-grid md:grid-cols-2 xl:grid-cols-3">
        <ChoiceSection
          icon={<img src={patientPhoto} alt="" className="h-full w-full object-cover object-top" />}
          title="Mood"
          subtitle="Select how you feel today"
          info
          // five tiles need the full row on tablets; back to a third of the row on desktop
          className="md:col-span-2 xl:col-span-1"
          options={MOODS}
          value={draft.mood}
          onChange={(v) => update('mood', v)}
        />
        <BodyWeightSection value={draft.weight} onChange={(v) => update('weight', v)} />
        <MedicationSection
          medications={log.medications}
          onAdd={log.addMedication}
          statuses={draft.medications}
          date={selectedDate}
          onStatusChange={(id, status) =>
            update('medications', { ...draft.medications, [id]: draft.medications[id] === status ? null : status })
          }
        />
      </div>

      <div className="grid grid-cols-1 gap-grid lg:grid-cols-2">
        <ChoiceSection
          icon={<Battery level={0.25} color="#F43F5E" className="h-[60%]" />}
          title="Fatigue Level"
          subtitle="How tired do you feel today?"
          options={FATIGUE}
          value={draft.fatigue}
          onChange={(v) => update('fatigue', v)}
        />
        <ChoiceSection
          icon={<Emoji symbol="😴" className={headerEmoji} />}
          title="Sleep Quality"
          subtitle="How was your sleep last night?"
          options={SLEEP}
          value={draft.sleep}
          onChange={(v) => update('sleep', v)}
        />
        <ChoiceSection
          icon={<Zap className="h-[45%] w-[45%]" fill="#F9A8D4" stroke="#F472B6" strokeWidth={1.2} aria-hidden="true" />}
          title="Energy Level"
          subtitle="How is your energy today?"
          options={ENERGY}
          value={draft.energy}
          onChange={(v) => update('energy', v)}
        />
        <ChoiceSection
          icon={<Emoji symbol="🧁" className={headerEmoji} />}
          title="Cravings"
          subtitle="Did you experience any cravings today?"
          options={CRAVINGS}
          value={draft.cravings}
          onChange={(v) => update('cravings', v)}
        />
      </div>

      <div className="grid grid-cols-1 gap-grid lg:grid-cols-2">
        <DailyActivitySection
          steps={draft.steps}
          goal={draft.stepGoal}
          onStepsChange={(v) => update('steps', v)}
          onGoalChange={(v) => update('stepGoal', v)}
        />
        <HydrationSection {...log.hydration} onChange={log.changeWater} />
      </div>

      {/* Luteal-only logging: shown when the selected date's detected phase is luteal */}
      {info.phase === 'luteal' && (
        <>
          <SymptomTrackingSection
            draft={draft}
            errors={log.fieldErrors}
            phaseLabel={PHASE_INFO.luteal.title}
            onToggleSymptom={log.luteal.toggleSymptom}
            onToggleNoSymptoms={log.luteal.toggleNoSymptoms}
            onSeverity={log.luteal.setSeverity}
            onCustomSymptom={log.luteal.setCustomSymptom}
          />
          <IntercourseSection
            draft={draft}
            errors={log.fieldErrors}
            onAnswer={log.luteal.setIntercourse}
            onProtection={log.luteal.setProtection}
            onProtectionOther={log.luteal.setProtectionOther}
          />
        </>
      )}

      <SaveLogBar
        date={selectedDate}
        onSave={log.save}
        error={log.error}
        noChanges={log.noChanges}
        status={log.justSaved ? 'saved' : log.isDirty ? 'dirty' : log.isSaved ? 'stored' : 'empty'}
      />
    </div>
  );
}
