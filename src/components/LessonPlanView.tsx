import React, { useState } from 'react';
import {
  BookOpen,
  Printer,
  Copy,
  Check,
  Sparkles,
  Layers,
  Clock,
  Calendar,
  CheckCircle2,
  FileText,
  HelpCircle,
  Lightbulb,
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData.ts';
import {
  generateLessonPlan,
  SYLLABUS_SUBTOPICS,
  LessonPlan,
} from '../utils/lessonPlanLogic.ts';

export const LessonPlanView: React.FC = () => {
  const [selectedStandard, setSelectedStandard] = useState<string>('std10');
  const [selectedSubject, setSelectedSubject] = useState<string>('maths');
  const [selectedChapter, setSelectedChapter] = useState<string>('दोन चलातील रेषीय समीकरणे');
  const [selectedSubtopic, setSelectedSubtopic] = useState<string>(
    'क्रेमर्स पद्धती (Cramer’s Rule - निश्चयक पद्धत)'
  );
  const [customSubtopicInput, setCustomSubtopicInput] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  // Lesson plan state
  const [lessonPlan, setLessonPlan] = useState<LessonPlan>(() =>
    generateLessonPlan(
      'std10',
      'maths',
      'दोन चलातील रेषीय समीकरणे',
      'क्रेमर्स पद्धती (Cramer’s Rule - निश्चयक पद्धत)'
    )
  );

  const availableChapters =
    SYLLABUS_SUBTOPICS[selectedStandard]?.[selectedSubject] ||
    SYLLABUS_SUBTOPICS.std10.maths;

  const currentChapterObj =
    availableChapters.find((c) => c.chapter === selectedChapter) || availableChapters[0];

  const handleStandardChange = (std: string) => {
    setSelectedStandard(std);
    const subjs = SYLLABUS_SUBTOPICS[std];
    const firstSubj = subjs ? Object.keys(subjs)[0] : 'maths';
    setSelectedSubject(firstSubj);
    const chaps = subjs?.[firstSubj] || [];
    const firstChap = chaps[0]?.chapter || 'धडा १';
    setSelectedChapter(firstChap);
    const firstSub = chaps[0]?.subtopics[0] || 'उपघटक';
    setSelectedSubtopic(firstSub);

    setLessonPlan(generateLessonPlan(std, firstSubj, firstChap, firstSub));
  };

  const handleSubjectChange = (subj: string) => {
    setSelectedSubject(subj);
    const chaps = SYLLABUS_SUBTOPICS[selectedStandard]?.[subj] || [];
    const firstChap = chaps[0]?.chapter || 'धडा १';
    setSelectedChapter(firstChap);
    const firstSub = chaps[0]?.subtopics[0] || 'उपघटक';
    setSelectedSubtopic(firstSub);

    setLessonPlan(generateLessonPlan(selectedStandard, subj, firstChap, firstSub));
  };

  const handleChapterChange = (chapName: string) => {
    setSelectedChapter(chapName);
    const chap = availableChapters.find((c) => c.chapter === chapName);
    const firstSub = chap?.subtopics[0] || 'उपघटक';
    setSelectedSubtopic(firstSub);

    setLessonPlan(
      generateLessonPlan(selectedStandard, selectedSubject, chapName, firstSub)
    );
  };

  const handleSubtopicChange = (sub: string) => {
    setSelectedSubtopic(sub);
    setLessonPlan(
      generateLessonPlan(selectedStandard, selectedSubject, selectedChapter, sub)
    );
  };

  const handleGenerateCustom = () => {
    if (!customSubtopicInput.trim()) return;
    const plan = generateLessonPlan(
      selectedStandard,
      selectedSubject,
      selectedChapter,
      customSubtopicInput.trim()
    );
    setLessonPlan(plan);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    const text = `
${SCHOOL_INFO.name}
दैनिक पाठ टाचण व पाठ नियोजन (Daily Lesson Plan)
इयत्ता: ${lessonPlan.standard} | विषय: ${lessonPlan.subject}
घटक: ${lessonPlan.chapter} | उपघटक: ${lessonPlan.subtopic}
कालावधी: ${lessonPlan.periodDuration} | दिनांक: ${lessonPlan.teachingDate}

१. पूर्वज्ञान:
${lessonPlan.previousKnowledge.map((k) => `• ${k}`).join('\n')}

२. अध्ययन निष्पत्ती:
${lessonPlan.learningOutcomes.map((o) => `• ${o}`).join('\n')}

३. प्रमुख नियम व सूत्रे:
${lessonPlan.coreRulesAndFormulas.join('\n')}

४. अध्यापन पायऱ्या व कृती:
${lessonPlan.teachingSteps.map((s) => `[${s.stepName}]\nशिक्षक कृती: ${s.teacherActivity}\nविद्यार्थी कृती: ${s.studentActivity}\nफलक कार्य: ${s.blackboardWork}`).join('\n\n')}

५. मूल्यमापन प्रश्न:
${lessonPlan.evaluationQuestions.join('\n')}

६. गृहपाठ:
${lessonPlan.homework}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Control Header Card (Hidden in print) */}
      <div className="no-print bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-600" />
              दैनिक पाठ नियोजन (Lesson Plan - ६ वी ते १० वी)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              ठराविक तासांचे उपघटकनिहाय नियोजन, नियम, सूत्रे, पायऱ्या व गृहपाठासह
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'कॉपी झाले!' : 'पाठ टाचण कॉपी करा'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs md:text-sm font-bold shadow-sm cursor-pointer transition-colors"
            >
              <Printer className="w-4 h-4" />
              पाठ टाचण प्रिंट / PDF
            </button>
          </div>
        </div>

        {/* Highlighted Cramer's Rule Preset Callout */}
        <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>विशेष सोय (उपघटक पद्धत):</strong> 'दोन चलातील रेषीय समीकरणे' मधील{' '}
              <strong>'क्रेमर्स पद्धती (Cramer’s Rule)'</strong> उपघटक निवडल्यास फक्त क्रेमर्स
              पद्धतीचे नियम व निश्चयक सूत्रे (D, Dx, Dy, x, y) अचूक येतात.
            </span>
          </div>
          <button
            onClick={() => {
              setSelectedStandard('std10');
              setSelectedSubject('maths');
              setSelectedChapter('दोन चलातील रेषीय समीकरणे');
              setSelectedSubtopic('क्रेमर्स पद्धती (Cramer’s Rule - निश्चयक पद्धत)');
              setLessonPlan(
                generateLessonPlan(
                  'std10',
                  'maths',
                  'दोन चलातील रेषीय समीकरणे',
                  'क्रेमर्स पद्धती (Cramer’s Rule - निश्चयक पद्धत)'
                )
              );
            }}
            className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded font-bold text-[11px] whitespace-nowrap cursor-pointer"
          >
            क्रेमर्स रूल लोड करा
          </button>
        </div>

        {/* Selection Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-slate-100">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              इयत्ता (Standard)
            </label>
            <select
              value={selectedStandard}
              onChange={(e) => handleStandardChange(e.target.value)}
              className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-none"
            >
              <option value="std6">इयत्ता ६ वी</option>
              <option value="std7">इयत्ता ७ वी</option>
              <option value="std8">इयत्ता ८ वी</option>
              <option value="std9">इयत्ता ९ वी</option>
              <option value="std10">इयत्ता १० वी</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              विषय (Subject)
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => handleSubjectChange(e.target.value)}
              className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-none"
            >
              <option value="maths">गणित (Mathematics)</option>
              <option value="science">विज्ञान (Science)</option>
              <option value="marathi">मराठी (Marathi)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              घटक (Chapter / Topic)
            </label>
            <select
              value={selectedChapter}
              onChange={(e) => handleChapterChange(e.target.value)}
              className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-none"
            >
              {availableChapters.map((c) => (
                <option key={c.chapter} value={c.chapter}>
                  {c.chapter}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              उपघटक (Subtopic - एका तासिकेसाठी)
            </label>
            <select
              value={selectedSubtopic}
              onChange={(e) => handleSubtopicChange(e.target.value)}
              className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-bold text-amber-900 bg-amber-50/50 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            >
              {currentChapterObj?.subtopics.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Manual Subtopic Entry */}
        <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
          <input
            type="text"
            placeholder="किंवा कोणताही दुसरा उपघटक येथे टाईप करा (उदा. त्रिकोणमिती, पायथागोरसचे प्रमेय)..."
            value={customSubtopicInput}
            onChange={(e) => setCustomSubtopicInput(e.target.value)}
            className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
          <button
            onClick={handleGenerateCustom}
            disabled={!customSubtopicInput.trim()}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold cursor-pointer disabled:opacity-50"
          >
            नवीन उपघटक प्लॅन तयार करा
          </button>
        </div>
      </div>

      {/* PRINTABLE LESSON PLAN SHEET (A4 Perfect Format) */}
      <div className="print-container bg-white rounded-xl border border-slate-300 p-8 shadow-sm space-y-6 text-slate-900 font-sans max-w-4xl mx-auto">
        {/* Document Header */}
        <div className="border-b-2 border-slate-900 pb-3 text-center">
          <div className="text-xs text-slate-600 font-bold uppercase tracking-wider">
            {SCHOOL_INFO.sanstha}
          </div>
          <h1 className="text-xl md:text-2xl font-black text-slate-950 mt-1">
            {SCHOOL_INFO.name}
          </h1>
          <p className="text-xs text-slate-700">
            {SCHOOL_INFO.address} • UDISE: {SCHOOL_INFO.udise}
          </p>
          <div className="mt-2 inline-block bg-slate-100 px-4 py-1 rounded-full text-xs font-black text-slate-900 border border-slate-300">
            दैनिक पाठ टाचण व पाठ नियोजन (Daily Lesson Plan)
          </div>
        </div>

        {/* Metadata Details Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-3 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold">
          <div>
            <span className="text-slate-500 font-normal">वर्ग व विषय:</span>
            <div className="font-bold text-slate-900">
              {lessonPlan.standard} — {lessonPlan.subject}
            </div>
          </div>
          <div>
            <span className="text-slate-500 font-normal">घटक (Chapter):</span>
            <div className="font-bold text-slate-900">{lessonPlan.chapter}</div>
          </div>
          <div>
            <span className="text-slate-500 font-normal">नियोजित उपघटक:</span>
            <div className="font-extrabold text-amber-900">{lessonPlan.subtopic}</div>
          </div>
          <div>
            <span className="text-slate-500 font-normal">कालावधी व दिनांक:</span>
            <div className="font-bold text-slate-900">
              {lessonPlan.periodDuration} | {lessonPlan.teachingDate}
            </div>
          </div>
        </div>

        {/* Section 1 & 2: Previous Knowledge & Learning Outcomes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3.5 border border-slate-200 rounded-lg bg-white space-y-1.5">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              १. पूर्वज्ञान (Previous Knowledge)
            </h4>
            <ul className="text-xs text-slate-700 space-y-1 pl-5 list-disc">
              {lessonPlan.previousKnowledge.map((pk, idx) => (
                <li key={idx}>{pk}</li>
              ))}
            </ul>
          </div>

          <div className="p-3.5 border border-slate-200 rounded-lg bg-white space-y-1.5">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              २. अध्ययन निष्पत्ती (Learning Outcomes)
            </h4>
            <ul className="text-xs text-slate-700 space-y-1 pl-5 list-disc">
              {lessonPlan.learningOutcomes.map((lo, idx) => (
                <li key={idx}>{lo}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Section 3: Core Rules & Formulas (Crucial for Cramer's Rule) */}
        <div className="p-4 rounded-lg bg-amber-50/60 border border-amber-300 space-y-2">
          <h4 className="text-xs font-extrabold text-amber-950 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-700" />
            ३. उपघटकाचे प्रमुख नियम व सूत्रे (Core Rules & Mathematical Formulas)
          </h4>
          <div className="space-y-1 text-xs text-amber-950 font-mono font-medium pl-2 leading-relaxed">
            {lessonPlan.coreRulesAndFormulas.map((rule, idx) => (
              <div key={idx} className="whitespace-pre-wrap">
                {rule}
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Teaching Stages Table */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-900">
            ४. अध्यापन पद्धती व प्रत्यक्ष तासिका पायऱ्या (Teaching Stages & Activities)
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border border-slate-300 border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-900 font-bold">
                  <th className="p-2 border border-slate-300 text-left w-1/4">पायरी व वेळ</th>
                  <th className="p-2 border border-slate-300 text-left w-1/3">शिक्षक कृती</th>
                  <th className="p-2 border border-slate-300 text-left w-1/4">विद्यार्थी कृती</th>
                  <th className="p-2 border border-slate-300 text-left">फलक कार्य (Board Work)</th>
                </tr>
              </thead>
              <tbody>
                {lessonPlan.teachingSteps.map((step, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-2 border border-slate-300 font-bold text-slate-900 align-top">
                      {step.stepName}
                    </td>
                    <td className="p-2 border border-slate-300 text-slate-700 align-top leading-relaxed">
                      {step.teacherActivity}
                    </td>
                    <td className="p-2 border border-slate-300 text-slate-700 align-top leading-relaxed">
                      {step.studentActivity}
                    </td>
                    <td className="p-2 border border-slate-300 font-mono text-slate-800 text-[11px] align-top whitespace-pre-wrap bg-slate-50/50">
                      {step.blackboardWork}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 5 & 6: Evaluation & Homework */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 border border-slate-200 rounded-lg">
            <h4 className="text-xs font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-blue-600" />
              ५. तासिकेतील मूल्यमापन प्रश्न
            </h4>
            <div className="text-xs text-slate-700 space-y-1 pl-4">
              {lessonPlan.evaluationQuestions.map((eq, idx) => (
                <div key={idx}>{eq}</div>
              ))}
            </div>
          </div>

          <div className="p-3 border border-slate-200 rounded-lg bg-slate-50">
            <h4 className="text-xs font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-purple-600" />
              ६. गृहपाठ व स्वाध्याय (Homework)
            </h4>
            <div className="text-xs text-slate-700 leading-relaxed pl-4">
              {lessonPlan.homework}
            </div>
          </div>
        </div>

        {/* Teacher Signature Line */}
        <div className="pt-6 border-t border-slate-400 flex items-center justify-between text-xs font-bold text-slate-900">
          <div>विषय शिक्षक स्वाक्षरी: ________________</div>
          <div>मुख्याध्यापक स्वाक्षरी व शेरा: ________________</div>
        </div>
      </div>
    </div>
  );
};
