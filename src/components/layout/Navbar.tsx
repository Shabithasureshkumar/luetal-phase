import React from 'react';
import {
  LayoutDashboard,
  Search,
  Settings,
  Bell,
} from 'lucide-react';
import doctorImage from '../../assets/doctor.png';

interface NavbarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab = 'Dashboard',
  onTabChange,
}) => {
  const tabs = [
    'Appointment',
    'Patient',
    'Reports',
    'Chats',
    'Billing',
  ];

  return (
    <header className="w-full max-w-[1380px] mx-auto pt-6 pb-2 px-4 flex items-center justify-between gap-4">
      {/* Left Pill Navigation Bar */}
      <div className="bg-white rounded-full p-1 border border-[#4B48F7]/5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex items-center gap-6 sm:gap-10 h-[62px] pr-8">
        {/* Dashboard Active Pill Button */}
        <button
          onClick={() => onTabChange?.('Dashboard')}
          className={`flex items-center gap-3 px-7 h-[54px] rounded-full transition-all duration-200 font-manrope font-extrabold text-[14.8px] ${
            activeTab === 'Dashboard'
              ? 'bg-[#635BFF] text-white shadow-sm'
              : 'text-[#000000] hover:text-[#635BFF]'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Dashboard</span>
        </button>

        {/* Other Links */}
        <nav className="flex items-center gap-6 sm:gap-10">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => onTabChange?.(tab)}
                className={`text-[14.8px] font-manrope font-bold transition-colors ${
                  isActive
                    ? 'text-[#635BFF]'
                    : 'text-[#000000] hover:text-[#635BFF]'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Right Controls & Physician Info */}
      <div className="flex items-center gap-7">
        {/* 3 Circular Actions */}
        <div className="flex items-center gap-2.5">
          <button
            className="w-[51.5px] h-[51.5px] rounded-full bg-[#DDE2E8] hover:bg-gray-300 flex items-center justify-center text-gray-700 transition-colors"
            title="Search"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            className="w-[51.5px] h-[51.5px] rounded-full bg-white hover:bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-700 shadow-xs transition-colors"
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
          <button
            className="w-[51.5px] h-[51.5px] rounded-full bg-white hover:bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-700 shadow-xs transition-colors"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
          </button>
        </div>

        {/* Doctor Profile */}
        <div className="flex items-center gap-2.5">
          <div className="w-[41.4px] h-[41.4px] rounded-full overflow-hidden border border-gray-300/40 shadow-xs bg-purple-100 shrink-0">
            <img
              src={doctorImage}
              alt="David Brock"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[12px] font-manrope font-semibold text-[#232C2B] leading-tight">
              David Brock
            </span>
            <span className="text-[10.4px] font-manrope font-semibold text-[#232C2B]/50 leading-tight mt-0.5">
              General Physician
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
