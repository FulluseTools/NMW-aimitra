import React, { useState, useEffect } from 'react';
import { Navbar, NavTab } from './components/Navbar.tsx';
import { DashboardView } from './components/DashboardView.tsx';
import { MarksheetView } from './components/MarksheetView.tsx';
import { QuestionPaperView } from './components/QuestionPaperView.tsx';
import { OfficialLetterView } from './components/OfficialLetterView.tsx';
import { LessonPlanView } from './components/LessonPlanView.tsx';
import { CceAndNoticesView } from './components/CceAndNoticesView.tsx';
import { StaffDirectoryView } from './components/StaffDirectoryView.tsx';
import { SettingsModal } from './components/SettingsModal.tsx';
import { SCHOOL_INFO } from './data/schoolData.ts';
import { School, Heart, Sparkles, BookOpen } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<any[]>([
    {
      id: 'notif_1',
      category: 'परिपत्रक',
      priority: 'उच्च',
      title: 'महाराष्ट्र राज्य मंडळ: इयत्ता १० वी परीक्षा अर्ज व शुल्काबाबत अंतिम मुदत',
      date: 'आज, ११:३० AM',
      source: 'महाराष्ट्र राज्य माध्यमिक व उच्च माध्यमिक शिक्षण मंडळ, पुणे',
      summary:
        'सत्र २०२६-२७ च्या माध्यमिक शालान्त प्रमाणपत्र (SSC) परीक्षेसाठी नियमित विद्यार्थ्यांचे ऑनलाईन अर्ज व शुल्क भरण्याची अंतिम मुदत २५ ऑक्टोबर २०२६ पर्यंत वाढविण्यात आली आहे.',
    },
    {
      id: 'notif_2',
      category: 'मूल्यमापन',
      priority: 'महत्त्वाचे',
      title: 'शासकीय आदेश: आकारिक मूल्यमापन (CCE) नोंदी अद्ययावत करणे',
      date: 'काल, ०४:१५ PM',
      source: 'शिक्षण संचालनालय (प्राथमिक व माध्यमिक), महाराष्ट्र राज्य',
      summary:
        'इयत्ता ६ वी ते ८ वी करिता RTE कायद्यानुसार विद्यार्थ्यांच्या दैनंदिन निरीक्षण, तोंडी काम, प्रात्यक्षिक व प्रकल्प नोंदी शालेय अभिलेखात अद्ययावत ठेवाव्यात.',
    },
    {
      id: 'notif_3',
      category: 'शिष्यवृत्ती',
      priority: 'सामान्य',
      title: 'सावित्रीबाई फुले दत्तक पालक व माध्यमिक शिष्यवृत्ती पडताळणी',
      date: '१६ ऑक्टोबर, ०२:०० PM',
      source: 'जिल्हा परिषद शिक्षण विभाग, बुलढाणा',
      summary:
        'सर्व मुख्याध्यापकांनी शिष्यवृत्तीधारक विद्यार्थ्यांचे आधार संलग्न बँक खाते पडताळणी विहित मुदतीत पूर्ण करून अहवाल सादर करावा.',
    },
    {
      id: 'notif_4',
      category: 'दिनविशेष',
      priority: 'माहिती',
      title: 'शालेय दिनविशेष: राष्ट्रीय विज्ञान दिन व स्पर्धा पूर्वतयारी',
      date: '१५ ऑक्टोबर, ०९:०० AM',
      source: 'शालेय उपक्रम कक्ष',
      summary:
        'विद्यालयात विज्ञान प्रदर्शन व वक्तृत्व स्पर्धेची पूर्वतयारी सुरू झाली असून विज्ञान शिक्षकांनी प्रकल्प तयार करून घ्यावेत.',
    },
  ]);

  // Fetch live notifications from server if available
  useEffect(() => {
    fetch('/api/notifications')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.notifications?.length) {
          setNotifications(data.notifications);
        }
      })
      .catch((err) => {
        // Fallback remains active
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900 font-sans">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSettings={() => setIsSettingsOpen(true)}
        unreadCount={notifications.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {activeTab === 'dashboard' && (
          <DashboardView setActiveTab={setActiveTab} notifications={notifications} />
        )}
        {activeTab === 'marksheet' && <MarksheetView />}
        {activeTab === 'question_paper' && <QuestionPaperView />}
        {activeTab === 'official_letter' && <OfficialLetterView />}
        {activeTab === 'lesson_plan' && <LessonPlanView />}
        {activeTab === 'cce_notices' && <CceAndNoticesView />}
        {activeTab === 'staff_directory' && <StaffDirectoryView />}
      </main>

      {/* Footer (Hidden in print) */}
      <footer className="no-print bg-slate-900 border-t border-slate-800 text-slate-400 py-6 text-xs mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <School className="w-4 h-4 text-amber-500" />
            <span className="font-semibold text-slate-200">
              {SCHOOL_INFO.name}
            </span>
            <span className="text-slate-500">|</span>
            <span>UDISE: {SCHOOL_INFO.udise}</span>
            <span className="text-slate-500">|</span>
            <span>इंडेक्स: {SCHOOL_INFO.schoolIndex}</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>मुख्याध्यापक: {SCHOOL_INFO.headmaster}</span>
            <span>•</span>
            <span>महाराष्ट्र शासन शालेय शिक्षण विभाग</span>
          </div>
        </div>
      </footer>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
}
