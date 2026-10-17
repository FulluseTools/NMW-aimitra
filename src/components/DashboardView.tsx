import React from 'react';
import {
  FileSpreadsheet,
  FileQuestion,
  MailCheck,
  BookOpen,
  ClipboardList,
  Users,
  Bell,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  School,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { SCHOOL_INFO, STAFF_MEMBERS } from '../data/schoolData.ts';
import { NavTab } from './Navbar.tsx';

interface DashboardViewProps {
  setActiveTab: (tab: NavTab) => void;
  notifications: any[];
}

export const DashboardView: React.FC<DashboardViewProps> = ({ setActiveTab, notifications }) => {
  const tools = [
    {
      id: 'marksheet' as NavTab,
      title: '१. वर्गनिहाय गुणपत्रिका (Marksheet)',
      desc: 'इयत्ता ६ वी ते १० वी निकाल पत्रक. ६ वी ते ८ वी करिता (आरोग्य, कला, कार्यानुभव) व ९ वी ते १० वी करिता (आरोग्य, संरक्षण शास्त्र, जलसुरक्षा) श्रेणी विषयांसह.',
      icon: FileSpreadsheet,
      badge: '६ वी ते १० वी',
      color: 'from-blue-600 to-indigo-700',
    },
    {
      id: 'question_paper' as NavTab,
      title: '२. प्रश्नपत्रिका निर्मिती (Question Paper)',
      desc: 'सोपे सोपे प्रश्न: A) रिकाम्या जागा (५), B) जोड्या जुळवा (५), C) वस्तुनिष्ठ प्रश्न (५), D) एका वाक्यात उत्तरे (५). प्रत्येक वेळी नवनवीन प्रश्न, विना पुनरावृत्ती!',
      icon: FileQuestion,
      badge: 'नवीन प्रश्न (No Repeat)',
      color: 'from-amber-600 to-orange-600',
    },
    {
      id: 'official_letter' as NavTab,
      title: '३. शासकीय पत्रव्यवहार सहाय्यक',
      desc: 'मा. शिक्षणाधिकारी, गटशिक्षणाधिकारी, अमरावती उपसंचालक कार्यालयांसाठी अचूक मराठी पत्रे. जावक क्र. व शेवटी "स्थळ - आडोळ बु. व मुख्याध्यापक स्वाक्षरी" स्वरूप.',
      icon: MailCheck,
      badge: 'प्रशासकीय पत्रे',
      color: 'from-emerald-600 to-teal-700',
    },
    {
      id: 'lesson_plan' as NavTab,
      title: '४. दैनिक पाठ नियोजन (Lesson Plan)',
      desc: 'ठराविक तासांचे उपघटकनिहाय नियोजन. विशेष: "दोन चलातील रेषीय समीकरणे -> क्रेमर्स पद्धती (Cramer’s Rule)" चे नियम, निश्चयक सूत्रे (D, Dx, Dy, x, y) व उदाहरणे.',
      icon: BookOpen,
      badge: 'उपघटक व सूत्रे',
      color: 'from-purple-600 to-indigo-700',
    },
    {
      id: 'cce_notices' as NavTab,
      title: '५. प्रगती शेरे व शालेय सूचना फलक',
      desc: 'RTE नुसार ६ वी ते ८ वी आकारिक मूल्यमापन (वर्ग, विषय, मूल्यमापन साधन, शेरा) ४ कॉलम तक्ता. तसेच जयंती, सहल, सुट्टी, गणवेश व मॅन्युअल सूचना निर्मिती.',
      icon: ClipboardList,
      badge: 'RTE आकारिक शेरे',
      color: 'from-rose-600 to-pink-700',
    },
    {
      id: 'staff_directory' as NavTab,
      title: '६. शाळा व कर्मचारी माहिती',
      desc: 'नामदार मुकुल वासनिक विद्यालयातील सर्व ९ शिक्षक व शिक्षकेतर कर्मचारी यादी, जन्मतारीख, पद, विषय, आधार, शालार्थ व UDISE तपशील.',
      icon: Users,
      badge: 'कर्मचारी संच',
      color: 'from-cyan-600 to-blue-700',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-amber-500/30 p-6 md:p-8 text-white shadow-xl">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            महाराष्ट्र शासन शिक्षण विभाग मान्यताप्राप्त
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
            सस्नेह जय महाराष्ट्र!{' '}
            <span className="text-amber-400">श्री. विनोद जगन्नाथ ठोंबरे</span> सर
          </h2>
          <p className="mt-2 text-sm md:text-base text-slate-300 leading-relaxed">
            मुख्याध्यापक, <strong>{SCHOOL_INFO.name}</strong>, ता. {SCHOOL_INFO.taluka}, जि.{' '}
            {SCHOOL_INFO.district}. हे डिजिटल व्यासपीठ खास आपल्या विद्यालयाच्या इयत्ता ६ वी ते १० वी च्या
            दैनंदिन अध्यापन, परीक्षा व प्रशासकीय कामकाजास गती देण्यासाठी सज्ज आहे.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              <School className="w-4 h-4 text-amber-400" />
              <span>वर्ग: <strong>इयत्ता ६ वी ते १० वी</strong></span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              <Users className="w-4 h-4 text-blue-400" />
              <span>कार्यरत कर्मचारी: <strong>{STAFF_MEMBERS.length} (मंजूर पदे)</strong></span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>माध्यम: <strong>मराठी</strong></span>
            </div>
          </div>
        </div>

        {/* Decorative watermark */}
        <div className="absolute right-4 bottom-2 opacity-5 pointer-events-none select-none hidden lg:block">
          <School className="w-72 h-72 text-white" />
        </div>
      </div>

      {/* Real-time Notifications Alert Section */}
      <div className="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent px-5 py-3 border-b border-amber-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-sm md:text-base">
            <Bell className="w-4 h-4 text-amber-600 animate-bounce" />
            <span>थेट रिअल-टाइम शालेय सूचना व शासकीय परिपत्रके</span>
          </div>
          <span className="text-[11px] font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
            लाईव्ह अपडेट
          </span>
        </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-amber-50/50 hover:border-amber-300 transition-all"
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-amber-200/80 text-amber-900">
                  {notif.category}
                </span>
                <span className="text-[11px] text-slate-500">{notif.date}</span>
              </div>
              <h4 className="font-bold text-xs md:text-sm text-slate-800 line-clamp-1">
                {notif.title}
              </h4>
              <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                {notif.summary}
              </p>
              <div className="mt-2 text-[11px] text-slate-500 font-medium">
                स्त्रोत: {notif.source}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tool Shortcut Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <span>शालेय डिजिटल साधने (Tools)</span>
          </h3>
          <span className="text-xs text-slate-500">
            इयत्ता ६ वी ते १० वी महाराष्ट्र राज्य मंडळ
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.id}
                onClick={() => setActiveTab(tool.id)}
                className="group relative flex flex-col justify-between rounded-xl bg-white border border-slate-200 hover:border-amber-400 p-5 shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-11 h-11 rounded-lg bg-gradient-to-br ${tool.color} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {tool.badge}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-base group-hover:text-amber-700 transition-colors">
                    {tool.title}
                  </h4>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    {tool.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-amber-700 group-hover:text-amber-800">
                  <span>वापरण्यासाठी येथे क्लिक करा</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
