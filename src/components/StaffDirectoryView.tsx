import React, { useState } from 'react';
import {
  Users,
  Printer,
  Search,
  School,
  Building,
  Calendar,
  CheckCircle,
  FileBadge,
  Sparkles,
} from 'lucide-react';
import { SCHOOL_INFO, STAFF_MEMBERS } from '../data/schoolData.ts';

export const StaffDirectoryView: React.FC = () => {
  const [search, setSearch] = useState<string>('');

  const filteredStaff = STAFF_MEMBERS.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.designation.toLowerCase().includes(search.toLowerCase()) ||
      s.subjects.toLowerCase().includes(search.toLowerCase())
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner (Hidden in print) */}
      <div className="no-print bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-amber-600" />
              शाळा व कार्यरत कर्मचारी संच (Staff Directory २०२६-२७)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              नामदार मुकुल वासनिक विद्यालय, आडोळ बु. — मान्यताप्राप्त शिक्षक व शिक्षकेतर कर्मचारी यादी
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs md:text-sm font-bold shadow-sm cursor-pointer transition-colors"
            >
              <Printer className="w-4 h-4" />
              कर्मचारी यादी प्रिंट / PDF
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="कर्मचाऱ्याचे नाव, पद किंवा विषय शोधा..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>
          <span className="text-xs text-slate-600 font-semibold">
            एकूण मंजूर पदे: <strong>{STAFF_MEMBERS.length}</strong>
          </span>
        </div>
      </div>

      {/* School Information Cards */}
      <div className="no-print grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
            <School className="w-4 h-4 text-amber-600" />
            <span>शाळेची अधिकृत ओळख</span>
          </div>
          <div className="text-xs text-slate-600 space-y-1">
            <div>शाळेचे नाव: <strong>{SCHOOL_INFO.name}</strong></div>
            <div>संस्था: <strong>{SCHOOL_INFO.sanstha}</strong></div>
            <div>माध्यम: <strong>{SCHOOL_INFO.medium}</strong></div>
            <div>वर्ग: <strong>{SCHOOL_INFO.classes}</strong></div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
            <FileBadge className="w-4 h-4 text-blue-600" />
            <span>शासकीय सांकेतांक</span>
          </div>
          <div className="text-xs text-slate-600 space-y-1">
            <div>UDISE+ क्र.: <strong className="font-mono text-blue-900">{SCHOOL_INFO.udise}</strong></div>
            <div>शाळा इंडेक्स: <strong className="font-mono text-blue-900">{SCHOOL_INFO.schoolIndex}</strong></div>
            <div>शालार्थ आयडी: <strong className="font-mono text-blue-900">{SCHOOL_INFO.shalarthId}</strong></div>
            <div>विद्यार्थी संख्या: <strong>अंदाजे {SCHOOL_INFO.studentCountApprox}</strong></div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
            <Building className="w-4 h-4 text-emerald-600" />
            <span>पत्ता व संपर्क</span>
          </div>
          <div className="text-xs text-slate-600 space-y-1">
            <div>गाव: <strong>{SCHOOL_INFO.village}</strong>, ता. <strong>{SCHOOL_INFO.taluka}</strong></div>
            <div>जिल्हा: <strong>{SCHOOL_INFO.district}</strong>, राज्य: <strong>{SCHOOL_INFO.state}</strong></div>
            <div>ई-मेल: <strong>{SCHOOL_INFO.email}</strong></div>
            <div>फोन: <strong>{SCHOOL_INFO.contact}</strong></div>
          </div>
        </div>
      </div>

      {/* PRINTABLE STAFF SCHEDULE TABLE */}
      <div className="print-container bg-white rounded-xl border border-slate-300 p-6 shadow-sm space-y-4">
        <div className="border-b-2 border-slate-900 pb-3 text-center">
          <div className="text-xs text-slate-600 font-bold uppercase tracking-wider">
            {SCHOOL_INFO.sanstha}
          </div>
          <h1 className="text-xl md:text-2xl font-black text-slate-950 mt-1">
            {SCHOOL_INFO.name}
          </h1>
          <p className="text-xs text-slate-700">{SCHOOL_INFO.address}</p>
          <div className="mt-2 text-xs font-bold text-slate-900 bg-slate-100 py-1 px-4 rounded-full inline-block border border-slate-300">
            कार्यरत शिक्षक व शिक्षकेतर कर्मचारी यादी — सत्र २०२६-२७
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs border border-slate-400 border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-900 font-extrabold text-center">
                <th className="p-2 border border-slate-300 w-10">अ.क्र.</th>
                <th className="p-2 border border-slate-300 text-left">कर्मचाऱ्याचे नाव</th>
                <th className="p-2 border border-slate-300 w-28">पदनाम</th>
                <th className="p-2 border border-slate-300 w-24">शैक्षणिक पात्रता</th>
                <th className="p-2 border border-slate-300 text-left">अध्यापनाचे विषय</th>
                <th className="p-2 border border-slate-300 w-16">वर्ग</th>
                <th className="p-2 border border-slate-300 w-24">जन्मतारीख</th>
                <th className="p-2 border border-slate-300 w-24">नियुक्ती दिनांक</th>
                <th className="p-2 border border-slate-300 w-24">सेवानिवृत्ती</th>
                <th className="p-2 border border-slate-300 w-32">आधार क्रमांक</th>
              </tr>
            </thead>
            <tbody>
              {filteredStaff.map((staff) => (
                <tr key={staff.sr} className="hover:bg-slate-50 transition-colors">
                  <td className="p-2 border border-slate-300 text-center font-bold text-slate-900">
                    {staff.sr}
                  </td>
                  <td className="p-2 border border-slate-300 font-bold text-slate-900">
                    <div>{staff.name}</div>
                    {staff.remarks && (
                      <span className="text-[10px] text-amber-700 font-normal">
                        ({staff.remarks})
                      </span>
                    )}
                  </td>
                  <td className="p-2 border border-slate-300 text-center text-slate-800 font-semibold">
                    {staff.designation}
                  </td>
                  <td className="p-2 border border-slate-300 text-center font-mono">
                    {staff.academicQual} {staff.profQual !== '-' ? `, ${staff.profQual}` : ''}
                  </td>
                  <td className="p-2 border border-slate-300 text-slate-800 font-medium">
                    {staff.subjects}
                  </td>
                  <td className="p-2 border border-slate-300 text-center font-bold">
                    {staff.classes}
                  </td>
                  <td className="p-2 border border-slate-300 text-center font-mono text-[11px]">
                    {staff.dob}
                  </td>
                  <td className="p-2 border border-slate-300 text-center font-mono text-[11px]">
                    {staff.appointmentDate}
                  </td>
                  <td className="p-2 border border-slate-300 text-center font-mono text-[11px] text-amber-900 font-semibold">
                    {staff.retirementDate}
                  </td>
                  <td className="p-2 border border-slate-300 text-center font-mono text-[11px]">
                    {staff.aadhaar}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="pt-8 border-t border-slate-400 flex items-center justify-between text-xs font-bold text-slate-900">
          <div>कनिष्ठ लिपिक स्वाक्षरी</div>
          <div>मुख्याध्यापक स्वाक्षरी व शालेय शिक्का</div>
        </div>
      </div>
    </div>
  );
};
