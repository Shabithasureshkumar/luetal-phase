import React from 'react';
import {
  UserProfile,
  CycleSummaryData,
  ConnectedDevice,
} from '../../types/tracker';
import { ProfileCard } from './ProfileCard';
import { CycleSummaryCard } from './CycleSummaryCard';
import { TodayInsightsCard } from './TodayInsightsCard';
import { PersonalNotesCard } from './PersonalNotesCard';
import { ConnectedDevicesCard } from './ConnectedDevicesCard';
import { QuickLogCard } from './QuickLogCard';

interface RightSidebarProps {
  profile: UserProfile;
  summary: CycleSummaryData;
  insights: string[];
  notes: string;
  devices: ConnectedDevice[];
  onSaveNotes: (notes: string) => void;
  onQuickLog: (type: 'sleep' | 'flow' | 'symptoms' | 'water' | 'mood' | 'weight') => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({
  profile,
  summary,
  insights,
  notes,
  devices,
  onSaveNotes,
  onQuickLog,
}) => {
  return (
    <aside className="w-full lg:w-[329px] bg-white lg:border-l-[1.2px] border-[#F3F4F6] p-4 sm:p-[19.2px] space-y-5 sm:space-y-6 shrink-0">
      {/* 1. Profile Card */}
      <ProfileCard profile={profile} />

      {/* 2. Cycle Summary */}
      <CycleSummaryCard summary={summary} />

      {/* 3. Today's Insights */}
      <TodayInsightsCard insights={insights} />

      {/* 4. Personal Notes */}
      <PersonalNotesCard
        initialNotes={notes}
        onSaveNotes={onSaveNotes}
      />

      {/* 5. Connected Devices */}
      <ConnectedDevicesCard devices={devices} />

      {/* 6. Quick Log */}
      <QuickLogCard onQuickLog={onQuickLog} />
    </aside>
  );
};
