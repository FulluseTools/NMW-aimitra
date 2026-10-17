import React, { useState } from 'react';
import {
  ClipboardList,
  Printer,
  Copy,
  Check,
  Plus,
  Filter,
  Sparkles,
  Calendar,
  Bell,
  Send,
  FileText,
  Trash2,
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData.ts';
import {
  CCE_PRESET_DATA,
  NOTICE_PRESETS,
  generateCustomNotice,
  CceRemarkRow,
  SchoolNotice,
} from '../utils/cceAndNoticesLogic.ts';

export const CceAndNoticesView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'cce' | 'notices'>('cce');

  // CCE state
  const [cceRows, setCceRows] = useState<CceRemarkRow[]>(CCE_PRESET_DATA);
  const [cceClassFilter, setCceClassFilter] = useState<string>('सर्व');
  const [cceSubjectFilter, setCceSubjectFilter] = useState<string>('सर्व');
  const [newClass, setNewClass] = useState<string>('इयत्ता ६ वी');
  const [newSubject, setNewSubject] = useState<string>('मराठी');
  const [newTool, setNewTool] = useState<string>('दैनंदिन निरीक्षण');
  const [newRemark, setNewRemark] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // Notices state
  const [noticesList, setNoticesList] = useState<SchoolNotice[]>(NOTICE_PRESETS);
  const [activeNoticeId, setActiveNoticeId] = useState<string>(NOTICE_PRESETS[0].id);
  const [customTopicTitle, setCustomTopicTitle] = useState<string>('');
  const [customTopicDetails, setCustomTopicDetails] = useState<string>('');
  const [copiedNotice, setCopiedNotice] = useState<boolean>(false);
  const [copiedCce, setCopiedCce] = useState<boolean>(false);

  const activeNotice =
    noticesList.find((n) => n.id === activeNoticeId) || noticesList[0];

  // Filtered CCE Rows
  const filteredCceRows = cceRows.filter((row) => {
    const classMatch = cceClassFilter === 'सर्व' || row.className === cceClassFilter;
    const subMatch = cceSubjectFilter === 'सर्व' || row.subject === cceSubjectFilter;
    return classMatch && subMatch;
  });

  const handleAddCceRow = () => {
    if (!newRemark.trim()) return;
    const newRow: CceRemarkRow = {
      id: `cce_custom_${Date.now()}`,
      className: newClass,
      subject: newSubject,
      assessmentTool: newTool,
      remarkType: newRemark.trim(),
    };
    setCceRows([newRow, ...cceRows]);
    setNewRemark('');
    setShowAddModal(false);
  };

  const handleDeleteCceRow = (id: string) => {
    setCceRows(cceRows.filter((r) => r.id !== id));
  };

  const handleCreateCustomNotice = () => {
    if (!customTopicTitle.trim()) return;
    const newNotice = generateCustomNotice(
      customTopicTitle.trim(),
      'इतर/मॅन्युअल',
      customTopicDetails.trim()
    );
    setNoticesList([newNotice, ...noticesList]);
    setActiveNoticeId(newNotice.id);
    setCustomTopicTitle('');
    setCustomTopicDetails('');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyNotice = () => {
    if (!activeNotice) return;
    const text = `
${SCHOOL_INFO.name}
${activeNotice.title}
दिनांक: ${activeNotice.date}

विषय: ${activeNotice.subject}

${activeNotice.content}

सूचना व नियमावली:
${activeNotice.instructions.map((ins, i) => `${i + 1}. ${ins}`).join('\n')}

- ${activeNotice.signatory}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopiedNotice(true);
    setTimeout(() => setCopiedNotice(false), 2500);
  };

  const handleCopyCce = () => {
    const text = filteredCceRows
      .map(
        (r, i) =>
          `${i + 1}) [${r.className}] [${r.subject}] [${r.assessmentTool}] -> ${r.remarkType}`
      )
      .join('\n');
    navigator.clipboard.writeText(text);
    setCopiedCce(true);
    setTimeout(() => setCopiedCce(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card (Hidden in print) */}
      <div className="no-print bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-amber-600" />
              प्रगती पुस्तकातील शेरे व शालेय सूचना फलक
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              बालकांचा मोफत व सक्तीच्या शिक्षणाचा अधिकार (RTE) आकारिक मूल्यमापन व शालेय सूचना
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs md:text-sm font-bold shadow-sm cursor-pointer transition-colors"
            >
              <Printer className="w-4 h-4" />
              प्रिंट / PDF जतन
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-slate-200 pt-1">
          <button
            onClick={() => setActiveSubTab('cce')}
            className={`pb-2.5 px-4 text-xs md:text-sm font-bold border-b-2 transition-all cursor-pointer ${
              activeSubTab === 'cce'
                ? 'border-amber-600 text-amber-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            १. इयत्ता ६ वी ते ८ वी आकारिक मूल्यमापन (CCE ४ कॉलम शेरे)
          </button>
          <button
            onClick={() => setActiveSubTab('notices')}
            className={`pb-2.5 px-4 text-xs md:text-sm font-bold border-b-2 transition-all cursor-pointer ${
              activeSubTab === 'notices'
                ? 'border-amber-600 text-amber-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            २. शालेय सूचना फलक (जयंती, सहल, सुट्टी, गणवेश व मॅन्युअल सूचना)
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: CCE REMARKS TABLE (4 COLUMNS STRICTLY) */}
      {activeSubTab === 'cce' && (
        <div className="space-y-4">
          {/* CCE Filters & Add Action Bar */}
          <div className="no-print bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                <Filter className="w-4 h-4 text-slate-500" />
                <span>वर्ग फिल्टर:</span>
                <select
                  value={cceClassFilter}
                  onChange={(e) => setCceClassFilter(e.target.value)}
                  className="px-2.5 py-1 border border-slate-300 rounded text-xs font-semibold focus:outline-none"
                >
                  <option value="सर्व">सर्व वर्ग (६ ते ८)</option>
                  <option value="इयत्ता ६ वी">इयत्ता ६ वी</option>
                  <option value="इयत्ता ७ वी">इयत्ता ७ वी</option>
                  <option value="इयत्ता ८ वी">इयत्ता ८ वी</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                <span>विषय:</span>
                <select
                  value={cceSubjectFilter}
                  onChange={(e) => setCceSubjectFilter(e.target.value)}
                  className="px-2.5 py-1 border border-slate-300 rounded text-xs font-semibold focus:outline-none"
                >
                  <option value="सर्व">सर्व विषय</option>
                  <option value="मराठी">मराठी</option>
                  <option value="गणित">गणित</option>
                  <option value="सामान्य विज्ञान">सामान्य विज्ञान</option>
                  <option value="इंग्रजी">इंग्रजी</option>
                  <option value="इतिहास व नागरिकशास्त्र">इतिहास व नागरिकशास्त्र</option>
                  <option value="भूगोल">भूगोल</option>
                  <option value="आरोग्य व शारीरिक शिक्षण">आरोग्य व शारीरिक शिक्षण</option>
                  <option value="कला">कला</option>
                  <option value="कार्यानुभव">कार्यानुभव</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyCce}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer"
              >
                {copiedCce ? 'शेरे कॉपी झाले!' : 'शेरे कॉपी करा'}
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-1 px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                नवीन शेरा जोडा
              </button>
            </div>
          </div>

          {/* Add New CCE Row Form */}
          {showAddModal && (
            <div className="no-print p-4 bg-amber-50/70 rounded-xl border border-amber-300 space-y-3">
              <h4 className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-amber-700" />
                नवीन आकारिक मूल्यमापन शेरा नोंदणी
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-700">वर्ग</label>
                  <select
                    value={newClass}
                    onChange={(e) => setNewClass(e.target.value)}
                    className="w-full px-2 py-1 text-xs border border-slate-300 rounded bg-white"
                  >
                    <option value="इयत्ता ६ वी">इयत्ता ६ वी</option>
                    <option value="इयत्ता ७ वी">इयत्ता ७ वी</option>
                    <option value="इयत्ता ८ वी">इयत्ता ८ वी</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-700">विषय</label>
                  <input
                    type="text"
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    placeholder="उदा. गणित, विज्ञान, कला..."
                    className="w-full px-2 py-1 text-xs border border-slate-300 rounded bg-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-700">आकारिक मूल्यमापन साधन</label>
                  <select
                    value={newTool}
                    onChange={(e) => setNewTool(e.target.value)}
                    className="w-full px-2 py-1 text-xs border border-slate-300 rounded bg-white"
                  >
                    <option value="दैनंदिन निरीक्षण">दैनंदिन निरीक्षण</option>
                    <option value="तोंडी काम">तोंडी काम</option>
                    <option value="प्रात्यक्षिक / प्रयोग">प्रात्यक्षिक / प्रयोग</option>
                    <option value="प्रकल्प">प्रकल्प</option>
                    <option value="स्वाध्याय व गृहकार्य">स्वाध्याय व गृहकार्य</option>
                    <option value="इतर उपक्रम">इतर उपक्रम</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-700">
                  कोणत्या प्रकारचे (वर्णनात्मक शेरा / निकष)
                </label>
                <input
                  type="text"
                  value={newRemark}
                  onChange={(e) => setNewRemark(e.target.value)}
                  placeholder="उदा. गणितातील क्रिया अचूक करतो, सूत्रांचा वापर समजून घेतो..."
                  className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1 bg-slate-200 text-slate-700 rounded text-xs cursor-pointer"
                >
                  रद्द करा
                </button>
                <button
                  onClick={handleAddCceRow}
                  className="px-4 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded text-xs font-bold cursor-pointer"
                >
                  शेरा सेव्ह करा
                </button>
              </div>
            </div>
          )}

          {/* PRINTABLE CCE REGISTER (4 STRICT COLUMNS) */}
          <div className="print-container bg-white rounded-xl border border-slate-300 p-6 shadow-sm space-y-4">
            <div className="border-b-2 border-slate-900 pb-3 text-center">
              <div className="text-xs text-slate-600 font-bold uppercase tracking-wider">
                {SCHOOL_INFO.sanstha}
              </div>
              <h1 className="text-xl font-black text-slate-950 mt-1">
                {SCHOOL_INFO.name}
              </h1>
              <p className="text-xs text-slate-700">{SCHOOL_INFO.address}</p>
              <div className="mt-2 text-xs font-bold text-slate-900 bg-slate-100 py-1 px-4 rounded-full inline-block border border-slate-300">
                इयत्ता ६ वी ते ८ वी वर्षभराचे आकारिक मूल्यमापन नोंदी (RTE अधिनियम अंतर्गत)
              </div>
            </div>

            {/* 4 COLUMNS TABLE */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs border border-slate-300 border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-900 font-extrabold text-center">
                    <th className="p-2.5 border border-slate-300 w-28">१. वर्ग (Class)</th>
                    <th className="p-2.5 border border-slate-300 w-36">२. विषय (Subject)</th>
                    <th className="p-2.5 border border-slate-300 w-44">
                      ३. आकारिक मूल्यमापन (Tool)
                    </th>
                    <th className="p-2.5 border border-slate-300 text-left">
                      ४. कोणत्या प्रकारचे (वर्णनात्मक शेरा / नोंदी)
                    </th>
                    <th className="p-2.5 border border-slate-300 w-12 no-print">क्रिया</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCceRows.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-2 border border-slate-300 text-center font-bold text-slate-900 bg-slate-50/50">
                        {row.className}
                      </td>
                      <td className="p-2 border border-slate-300 text-center font-semibold text-slate-800">
                        {row.subject}
                      </td>
                      <td className="p-2 border border-slate-300 text-center text-amber-900 font-semibold bg-amber-50/30">
                        {row.assessmentTool}
                      </td>
                      <td className="p-2 border border-slate-300 text-slate-800 leading-relaxed font-medium">
                        {row.remarkType}
                      </td>
                      <td className="p-2 border border-slate-300 text-center no-print">
                        <button
                          onClick={() => handleDeleteCceRow(row.id)}
                          className="text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                          title="काढून टाका"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer Sign */}
            <div className="pt-6 border-t border-slate-400 flex items-center justify-between text-xs font-bold text-slate-800">
              <div>वर्गशिक्षक स्वाक्षरी: _______________</div>
              <div>मुख्याध्यापक स्वाक्षरी: नामदार मुकुल वासनिक विद्यालय, आडोळ बु.</div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: SCHOOL NOTICE BOARD (जयंती, सहल, सुट्टी, गणवेश, मॅन्युअल सूचना) */}
      {activeSubTab === 'notices' && (
        <div className="space-y-6">
          {/* Controls: Preset Switcher + Manual Topic Creator */}
          <div className="no-print bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div>
              <span className="text-xs font-bold text-slate-700 block mb-2">
                तयार सूचना प्रकार निवडा:
              </span>
              <div className="flex flex-wrap gap-2">
                {noticesList.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => setActiveNoticeId(n.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeNoticeId === n.id
                        ? 'bg-amber-600 text-white shadow-xs ring-2 ring-amber-400'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {n.category}: {n.title.slice(0, 22)}...
                  </button>
                ))}
              </div>
            </div>

            {/* Manual Custom Topic Input (मॅन्युअली विषय टाकण्याची सुविधा) */}
            <div className="pt-3 border-t border-slate-200 space-y-2">
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                मॅन्युअली नवीन विषय टाकून सूचना तयार करा (Custom Notice)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div className="md:col-span-1">
                  <input
                    type="text"
                    placeholder="विषय टाका (उदा. पालक सभा, आरोग्य तपासणी, क्रीडा स्पर्धा)"
                    value={customTopicTitle}
                    onChange={(e) => setCustomTopicTitle(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div className="md:col-span-2 flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="तपशील (पर्यायी - रिकामा सोडल्यास आपोआप परिपूर्ण सूचना तयार होईल)"
                    value={customTopicDetails}
                    onChange={(e) => setCustomTopicDetails(e.target.value)}
                    className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                  <button
                    onClick={handleCreateCustomNotice}
                    disabled={!customTopicTitle.trim()}
                    className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer disabled:opacity-50"
                  >
                    सूचना तयार करा
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* PRINTABLE NOTICE BOARD SHEET (A4 Standard Notice Sheet) */}
          {activeNotice && (
            <div className="print-container bg-white rounded-xl border border-slate-300 p-10 md:p-12 shadow-sm space-y-6 text-slate-900 max-w-3xl mx-auto font-sans">
              {/* Notice Heading */}
              <div className="border-b-2 border-slate-900 pb-3 text-center space-y-1">
                <div className="text-xs text-slate-600 font-bold uppercase tracking-wider">
                  {SCHOOL_INFO.sanstha}
                </div>
                <h1 className="text-xl md:text-2xl font-black text-slate-950">
                  {SCHOOL_INFO.name}
                </h1>
                <p className="text-xs text-slate-700">{SCHOOL_INFO.address}</p>

                <div className="pt-3">
                  <span className="inline-block bg-red-600 text-white font-black text-sm md:text-base px-6 py-1 rounded-full uppercase tracking-widest shadow-xs">
                    शालेय सूचना फलक (NOTICE)
                  </span>
                </div>
              </div>

              {/* Date & Ref */}
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <div>प्रवर्ग: {activeNotice.category}</div>
                <div>दिनांक: {activeNotice.date}</div>
              </div>

              {/* Title & Subject */}
              <div className="text-center space-y-1">
                <h2 className="text-base md:text-lg font-black text-slate-950 underline decoration-amber-500 underline-offset-4">
                  {activeNotice.title}
                </h2>
                <p className="text-xs font-bold text-slate-700 mt-1">
                  विषय: {activeNotice.subject}
                </p>
              </div>

              {/* Notice Body */}
              <div className="text-xs md:text-sm leading-relaxed text-justify indent-6 space-y-3 font-normal text-slate-800">
                {activeNotice.content.split('\n\n').map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {/* Instructions */}
              <div className="p-4 bg-slate-50 border border-slate-300 rounded-lg space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase">
                  विद्यार्थी व पालकांसाठी महत्त्वाच्या सूचना व नियमावली:
                </h4>
                <ol className="list-decimal list-inside text-xs space-y-1 text-slate-700 pl-2">
                  {activeNotice.instructions.map((ins, i) => (
                    <li key={i}>{ins}</li>
                  ))}
                </ol>
              </div>

              {/* Signoff */}
              <div className="pt-8 flex items-center justify-between text-xs font-bold text-slate-900">
                <div>
                  <button
                    onClick={handleCopyNotice}
                    className="no-print px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 text-xs font-semibold cursor-pointer"
                  >
                    {copiedNotice ? 'सूचना कॉपी झाली!' : 'सूचना कॉपी करा'}
                  </button>
                </div>
                <div className="text-right">
                  <div className="h-10"></div>
                  <div>{activeNotice.signatory}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
