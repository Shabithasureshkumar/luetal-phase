import React, { useState } from 'react';
import {
  LayoutDashboard,
  Search,
  Settings,
  Bell,
  User,
  Menu,
  X,
  Calendar,
  Users,
  FileText,
  MessageSquare,
  CreditCard,
  ChevronRight,
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
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Appointment', icon: Calendar },
    { name: 'Patient', icon: Users },
    { name: 'Reports', icon: FileText },
    { name: 'Chats', icon: MessageSquare },
    { name: 'Billing', icon: CreditCard },
  ];

  const handleTabClick = (tabName: string) => {
    onTabChange?.(tabName);
    setIsMobileDrawerOpen(false);
  };

  return (
    <header className="w-full max-w-[1380px] mx-auto pt-2 sm:pt-6 pb-1 sm:pb-2 px-2 sm:px-4 block min-w-0 max-w-full">
      {/* ========================================================================= */}
      {/* Desktop & Large Tablet Navigation (>= 768px: md breakpoint)              */}
      {/* ========================================================================= */}
      <div className="hidden md:flex items-center justify-between gap-4 w-full">
        {/* Left Pill Navigation Bar (Figma exact match) */}
        <div className="bg-white rounded-full p-1 border border-[#4B48F7]/5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex items-center gap-5 lg:gap-10 h-[62px] pr-6 lg:pr-8 shrink-0">
          {/* Dashboard Active Pill Button */}
          <button
            onClick={() => handleTabClick('Dashboard')}
            className={`flex items-center gap-2.5 px-6 lg:px-7 h-[54px] rounded-full transition-all duration-200 font-manrope font-extrabold text-[14px] lg:text-[14.8px] shrink-0 ${
              activeTab === 'Dashboard'
                ? 'bg-[#635BFF] text-white shadow-sm'
                : 'text-[#000000] hover:text-[#635BFF]'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          {/* Navigation Links */}
          <nav className="flex items-center gap-5 lg:gap-10">
            {navItems
              .filter((item) => item.name !== 'Dashboard')
              .map((item) => {
                const isActive = activeTab === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => handleTabClick(item.name)}
                    className={`text-[13.5px] lg:text-[14.8px] font-manrope font-bold transition-colors whitespace-nowrap ${
                      isActive
                        ? 'text-[#635BFF]'
                        : 'text-[#000000] hover:text-[#635BFF]'
                    }`}
                  >
                    {item.name}
                  </button>
                );
              })}
          </nav>
        </div>

        {/* Right Controls & Physician Info */}
        <div className="flex items-center gap-4 lg:gap-7 shrink-0">
          {/* 3 Circular Actions */}
          <div className="flex items-center gap-2 lg:gap-2.5">
            <button
              className="w-10 h-10 lg:w-[51.5px] lg:h-[51.5px] rounded-full bg-[#DDE2E8] hover:bg-gray-300 flex items-center justify-center text-gray-700 transition-colors"
              title="Search"
            >
              <Search className="w-4 h-4 lg:w-5 lg:h-5" />
            </button>
            <button
              className="w-10 h-10 lg:w-[51.5px] lg:h-[51.5px] rounded-full bg-white hover:bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-700 shadow-xs transition-colors"
              title="Settings"
            >
              <Settings className="w-4 h-4 lg:w-5 lg:h-5" />
            </button>
            <button
              className="w-10 h-10 lg:w-[51.5px] lg:h-[51.5px] rounded-full bg-white hover:bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-700 shadow-xs transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4 lg:w-5 lg:h-5" />
            </button>
          </div>

          {/* Doctor Profile */}
          <div className="flex items-center gap-2.5 pl-1">
            <div className="w-10 h-10 lg:w-[41.4px] lg:h-[41.4px] rounded-full overflow-hidden border border-gray-300/40 shadow-xs bg-purple-100 shrink-0 flex items-center justify-center text-purple-700">
              {doctorImage ? (
                <img
                  src={doctorImage}
                  alt="David Brock"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              ) : (
                <User className="w-5 h-5" />
              )}
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[12px] font-manrope font-semibold text-[#232C2B] leading-tight whitespace-nowrap">
                David Brock
              </span>
              <span className="text-[10px] lg:text-[10.4px] font-manrope font-semibold text-[#232C2B]/50 leading-tight mt-0.5 whitespace-nowrap">
                General Physician
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* Purpose-Built Compact Mobile Header (< 768px: Mobile)                     */}
      {/* Pattern: [ Hamburger ]               [ Search ] [ Settings ] [ Bell ] [ Avatar ] */}
      {/* ========================================================================= */}
      <div className="flex md:hidden items-center justify-between w-full min-w-0 max-w-full py-1">
        {/* Left Side: Hamburger / Menu Toggle */}
        <button
          onClick={() => setIsMobileDrawerOpen(true)}
          className="w-10 h-10 rounded-full bg-white border border-gray-200/80 shadow-xs flex items-center justify-center text-[#1F2937] active:scale-95 transition-transform shrink-0"
          title="Open Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Right Side: Actions (Search, Settings, Notification, Profile Avatar) */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            className="w-9 h-9 rounded-full bg-[#DDE2E8] flex items-center justify-center text-gray-700 active:scale-95 transition-transform"
            title="Search"
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-700 active:scale-95 transition-transform shadow-xs"
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
          <button
            className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-700 active:scale-95 transition-transform shadow-xs relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
          </button>
          <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200 bg-purple-100 flex items-center justify-center text-purple-700 shrink-0 shadow-xs">
            {doctorImage ? (
              <img
                src={doctorImage}
                alt="David Brock"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            ) : (
              <User className="w-4 h-4" />
            )}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* Mobile Navigation Drawer / Slide-Over Overlay                             */}
      {/* ========================================================================= */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden animate-fadeIn">
          {/* Backdrop */}
          <div
            onClick={() => setIsMobileDrawerOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer Menu Content */}
          <div className="relative w-[280px] max-w-[80vw] bg-white h-full shadow-2xl p-5 flex flex-col justify-between z-10 animate-slideRight">
            <div>
              {/* Drawer Top Header */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#635BFF] text-white flex items-center justify-center font-bold text-xs">
                    <LayoutDashboard className="w-4 h-4" />
                  </div>
                  <span className="font-manrope font-extrabold text-sm text-[#1F2937]">
                    Navigation Menu
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Items */}
              <div className="py-4 space-y-1">
                {navItems.map((item) => {
                  const isActive = activeTab === item.name;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.name}
                      onClick={() => handleTabClick(item.name)}
                      className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-manrope font-bold transition-all text-left ${
                        isActive
                          ? 'bg-[#635BFF] text-white shadow-xs'
                          : 'text-gray-700 hover:bg-gray-50 active:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4 shrink-0" />
                        <span>{item.name}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 opacity-50" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Drawer Bottom Doctor Info */}
            <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200 bg-purple-100 flex items-center justify-center text-purple-700 shrink-0">
                {doctorImage ? (
                  <img
                    src={doctorImage}
                    alt="David Brock"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <User className="w-4 h-4" />
                )}
              </div>
              <div className="flex flex-col text-left min-w-0">
                <span className="text-xs font-manrope font-bold text-[#232C2B] leading-none truncate">
                  David Brock
                </span>
                <span className="text-[10px] font-manrope font-medium text-[#232C2B]/60 leading-none mt-1 truncate">
                  General Physician
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
