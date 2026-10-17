import React from 'react';
import {
  GraduationCap,
  FileSpreadsheet,
  FileQuestion,
  MailCheck,
  BookOpen,
  ClipboardList,
  Users,
  Settings,
  Bell,
  School,
  Sparkles,
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData.ts';

export type NavTab =
  | 'dashboard'
  | 'marksheet'
  | 'question_paper'
  | 'official_letter'
  | 'lesson_plan'
  | 'cce_notices'
  | 'staff_directory';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  onOpenSettings: () => void;
  unreadCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenSettings,
  unreadCount = 2,
}) => {
  const navItems = [
    { id: 'dashboard' as NavTab, label: 'डॅशबोर्ड', icon: GraduationCap },
    { id: 'marksheet' as NavTab, label: 'वर्गनिहाय गुणपत्रिका', icon: FileSpreadsheet },
    { id: 'question_paper' as NavTab, label: 'प्रश्नपत्रिका निर्मिती (६-१०)', icon: FileQuestion },
    { id: 'official_letter' as NavTab, label: 'शासकीय पत्रव्यवहार', icon: MailCheck },
    { id: 'lesson_plan' as NavTab, label: 'दैनिक पाठ नियोजन', icon: BookOpen },
    { id: 'cce_notices' as NavTab, label: 'शेरे व सूचना फलक', icon: ClipboardList },
    { id: 'staff_directory' as NavTab, label: 'शाळा व कर्मचारी', icon: Users },
  ];

  return (
    <header className="no-print bg-slate-900 text-white shadow-xl border-b border-amber-500/30 sticky top-0 z-40">
      {/* Top Banner with School Name & Official Codes */}
      <div className="bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 px-4 py-2 text-xs md:text-sm font-medium text-amber-50 border-b border-amber-400/30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <School className="w-4 h-4 text-amber-200" />
            <span className="font-semibold text-white tracking-wide">
              {SCHOOL_INFO.name}
            </span>
            <span className="hidden md:inline text-amber-200">|</span>
            <span className="hidden md:inline">
              ता. {SCHOOL_INFO.taluka}, जि. {SCHOOL_INFO.district}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-[11px] md:text-xs">
            <span className="bg-amber-900/40 px-2 py-0.5 rounded border border-amber-400/30">
              UDISE+: <strong>{SCHOOL_INFO.udise}</strong>
            </span>
            <span className="bg-amber-900/40 px-2 py-0.5 rounded border border-amber-400/30">
              इंडेक्स: <strong>{SCHOOL_INFO.schoolIndex}</strong>
            </span>
            <span className="bg-amber-900/40 px-2 py-0.5 rounded border border-amber-400/30">
              शालार्थ ID: <strong>{SCHOOL_INFO.shalarthId}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & App Title */}
          <div
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg md:text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                  एआय शिक्षा मित्र
                  <span className="text-[10px] uppercase font-bold tracking-widest bg-amber-500/20 text-amber-300 border border-amber-500/40 px-1.5 py-0.5 rounded">
                    महाराष्ट्र शासन
                  </span>
                </h1>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                इयत्ता ६ वी ते १० वी शिक्षक व मुख्याध्यापक डिजिटल सहाय्यक
              </p>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="relative p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="सूचना व परिपत्रके"
              aria-label="शालेय सूचना"
            >
              <Bell className="w-5 h-5 text-amber-400" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenSettings}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium transition-colors"
              title="सेटिंग्ज व API Key"
            >
              <Settings className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">सेटिंग्ज</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <nav className="mt-3 flex items-center gap-1 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-700">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs md:text-sm font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
