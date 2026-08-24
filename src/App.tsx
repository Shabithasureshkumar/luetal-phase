import { DailyCalendarStrip } from './components/calendar/DailyCalendarStrip';
import { LutealPhasePage } from './components/luteal/LutealPhasePage';
import { OvulationPhasePage } from './components/ovulation/OvulationPhasePage';
import { WellnessMetrics } from './components/wellness/WellnessMetrics';
import { RightSidebar } from './components/sidebar/RightSidebar';
import { usePeriodTracker } from './hooks/usePeriodTracker';

export function App() {
  const {
    days,
    selectedDate,
    selectedDay,
    profile,
    devices,
    cycleSummary,
    insightsList,
    selectDate,
    goToToday,
    goToPreviousDay,
    goToNextDay,
    updateMood,
    toggleCraving,
    updateNotes,
    updateWellnessMetrics,
    quickLog,
  } = usePeriodTracker();

  return (
    <div className="min-h-screen w-full max-w-full bg-white text-[#1F2937] flex flex-col items-center pt-3 sm:pt-6 lg:pt-8 pb-8 px-3 sm:px-4 lg:px-6 font-sans antialiased overflow-x-hidden selection:bg-pink-100 selection:text-[#B01163]">
      {/* Main Content & Sidebar Wrapper (1380px max) */}
      <div className="w-full max-w-[1380px] min-w-0 flex flex-col lg:flex-row items-start justify-between gap-6 lg:gap-0">
        {/* Main Content Area */}
        <main className="w-full lg:flex-1 lg:max-w-[1039px] p-0 sm:p-4 md:p-6 space-y-4 sm:space-y-6 min-w-0">
          {/* Daily Log Title */}
          <div>
            <h1 className="text-[clamp(22px,2.6vw,28.8px)] font-bold text-[#111827] leading-tight sm:leading-[38.4px] tracking-tight">
              Daily Log
            </h1>
          </div>

          {/* Calendar Strip */}
          <DailyCalendarStrip
            days={days}
            selectedDate={selectedDate}
            onSelectDate={selectDate}
            onToday={goToToday}
            onPrevDay={goToPreviousDay}
            onNextDay={goToNextDay}
          />

          {/* Dynamic Phase Container */}
          {selectedDay.phase === 'ovulation' ? (
            <OvulationPhasePage day={selectedDay} />
          ) : (
            <LutealPhasePage
              day={selectedDay}
              onUpdateMood={updateMood}
              onToggleCraving={toggleCraving}
            />
          )}

          {/* Wellness Metrics Section */}
          <WellnessMetrics
            dateInfo={`Today, ${selectedDay.dayNumber}/06 – Cycle Day 1`}
            metrics={selectedDay.wellnessMetrics}
            onUpdateMetrics={updateWellnessMetrics}
          />
        </main>

        {/* Right Sidebar */}
        <RightSidebar
          profile={profile}
          summary={cycleSummary}
          insights={insightsList}
          notes={selectedDay.notes}
          devices={devices}
          onSaveNotes={updateNotes}
          onQuickLog={quickLog}
        />
      </div>
    </div>
  );
}

export default App;
