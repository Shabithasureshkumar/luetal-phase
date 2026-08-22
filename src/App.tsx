import { Navbar } from './components/layout/Navbar';
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
    <div className="min-h-screen bg-white text-[#1F2937] flex flex-col items-center py-6 font-sans">
      {/* 1. Top Navbar (1380px) */}
      <Navbar />

      {/* 2. Main Content & Sidebar Wrapper (1380px) */}
      <div className="w-full max-w-[1380px] flex flex-col lg:flex-row items-start justify-between mt-2">
        {/* Main Content Area (1039px) */}
        <main className="w-full lg:w-[1039px] p-6 space-y-6 shrink-0">
          {/* Daily Log Title */}
          <div>
            <h1 className="text-[28.8px] font-bold text-[#111827] leading-[38.4px] tracking-tight">
              Daily Log
            </h1>
          </div>

          {/* Calendar Strip (993px) */}
          <DailyCalendarStrip
            days={days}
            selectedDate={selectedDate}
            onSelectDate={selectDate}
            onToday={goToToday}
            onPrevDay={goToPreviousDay}
            onNextDay={goToNextDay}
          />

          {/* Dynamic Phase Container (991px) */}
          {selectedDay.phase === 'ovulation' ? (
            <OvulationPhasePage day={selectedDay} />
          ) : (
            <LutealPhasePage
              day={selectedDay}
              onUpdateMood={updateMood}
              onToggleCraving={toggleCraving}
            />
          )}

          {/* Wellness Metrics Section (991px) */}
          <WellnessMetrics
            dateInfo={`Today, ${selectedDay.dayNumber}/06 – Cycle Day 1`}
            metrics={selectedDay.wellnessMetrics}
            onUpdateMetrics={updateWellnessMetrics}
          />
        </main>

        {/* Right Sidebar (329px) */}
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
