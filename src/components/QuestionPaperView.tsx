import React, { useState } from 'react';
import {
  FileQuestion,
  Printer,
  RefreshCw,
  Sparkles,
  Eye,
  EyeOff,
  Copy,
  Check,
  BookOpen,
  Award,
  Layers,
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData.ts';
import {
  generateQuestionPaper,
  CompleteQuestionPaper,
} from '../utils/questionPaperLogic.ts';

export const QuestionPaperView: React.FC = () => {
  const [standard, setStandard] = useState<string>('std10');
  const [subject, setSubject] = useState<string>('maths');
  const [examTitle, setExamTitle] = useState<string>('घटक चाचणी परीक्षा क्र. १ (सत्र २०२६-२७)');
  const [showAnswerKey, setShowAnswerKey] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [seedCounter, setSeedCounter] = useState<number>(() => Date.now());

  // Generate question paper
  const [paper, setPaper] = useState<CompleteQuestionPaper>(() =>
    generateQuestionPaper('std10', 'maths', 'linear_equations', 'घटक चाचणी परीक्षा क्र. १ (सत्र २०२६-२७)', Date.now())
  );

  const handleGenerateFresh = () => {
    const nextSeed = Date.now() + Math.floor(Math.random() * 10000);
    setSeedCounter(nextSeed);
    const newPaper = generateQuestionPaper(standard, subject, '', examTitle, nextSeed);
    setPaper(newPaper);
  };

  const handleStandardChange = (newStd: string) => {
    setStandard(newStd);
    const newPaper = generateQuestionPaper(newStd, subject, '', examTitle, Date.now());
    setPaper(newPaper);
  };

  const handleSubjectChange = (newSub: string) => {
    setSubject(newSub);
    const newPaper = generateQuestionPaper(standard, newSub, '', examTitle, Date.now());
    setPaper(newPaper);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const textContent = `
${SCHOOL_INFO.name}
${examTitle}
इयत्ता: ${paper.standard} | विषय: ${paper.subject} | एकूण गुण: ${paper.totalMarks} | वेळ: ${paper.timeAllowed}
विद्यार्थ्याचे नाव: ___________________________ | हजेरी क्र.: ______ | गुण: _____

${paper.sectionA.title} (${paper.sectionA.marks} गुण)
${paper.sectionA.instructions}
${paper.sectionA.questions.map((q, i) => `${i + 1}. ${q.question}`).join('\n')}

${paper.sectionB.title} (${paper.sectionB.marks} गुण)
${paper.sectionB.instructions}
गट 'अ'                                    गट 'ब'
${paper.sectionB.pairs.map((p, i) => `${i + 1}. ${p.left.padEnd(25, ' ')} (${String.fromCharCode(65 + i)}) ${paper.sectionB.shuffledRight[i]}`).join('\n')}

${paper.sectionC.title} (${paper.sectionC.marks} गुण)
${paper.sectionC.instructions}
${paper.sectionC.questions.map((q, i) => `${i + 1}. ${q.question}\n   A) ${q.options?.[0]}  B) ${q.options?.[1]}  C) ${q.options?.[2]}  D) ${q.options?.[3]}`).join('\n')}

${paper.sectionD.title} (${paper.sectionD.marks} गुण)
${paper.sectionD.instructions}
${paper.sectionD.questions.map((q, i) => `${i + 1}. ${q.question}`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(textContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Control Configuration Card (Hidden during print) */}
      <div className="no-print bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <FileQuestion className="w-5 h-5 text-amber-600" />
              प्रश्नपत्रिका निर्मिती (इयत्ता ६ वी ते १० वी)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              सोपे सोपे प्रश्न, प्रत्येकी ५ गुणांचे ४ स्वतंत्र विभाग (एकूण २० गुण). प्रत्येक वेळी नवनवीन प्रश्न!
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowAnswerKey(!showAnswerKey)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer transition-colors"
            >
              {showAnswerKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{showAnswerKey ? 'उत्तरसूची लपवा' : 'उत्तरसूची (Answer Key)'}</span>
            </button>

            <button
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'कॉपी झाले!' : 'प्रश्नपत्रिका कॉपी करा'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs md:text-sm font-bold cursor-pointer transition-colors"
            >
              <Printer className="w-4 h-4" />
              प्रिंट / PDF जतन
            </button>

            <button
              onClick={handleGenerateFresh}
              className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white rounded-lg text-xs md:text-sm font-bold shadow-sm cursor-pointer transition-all transform active:scale-95"
            >
              <RefreshCw className="w-4 h-4 animate-spin-hover" />
              नवीन प्रश्नपत्रिका तयार करा (No Repeat)
            </button>
          </div>
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2 border-t border-slate-100">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              वर्ग निवडा
            </label>
            <select
              value={standard}
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
              विषय निवडा (सर्व शैक्षणिक व श्रेणी विषय उपलब्ध)
            </label>
            <select
              value={subject}
              onChange={(e) => handleSubjectChange(e.target.value)}
              className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-none"
            >
              <optgroup label="१. भाषा विषय (Languages)">
                <option value="marathi">मराठी (प्रथम भाषा)</option>
                <option value="hindi">हिंदी (द्वितीय भाषा / संयुक्त हिंदी)</option>
                <option value="english">इंग्रजी (तृतीय भाषा / English)</option>
              </optgroup>

              <optgroup label="२. गणित व विज्ञान (Maths & Science)">
                <option value="maths">गणित (सर्वसाधारण / एकत्रित)</option>
                <option value="maths_algebra">गणित भाग १ (बीजगणित / Algebra)</option>
                <option value="maths_geometry">गणित भाग २ (भूमिती / Geometry)</option>
                <option value="science">विज्ञान आणि तंत्रज्ञान (सामान्य विज्ञान)</option>
                <option value="science1">विज्ञान आणि तंत्रज्ञान भाग १ (Science 1)</option>
                <option value="science2">विज्ञान आणि तंत्रज्ञान भाग २ (Science 2)</option>
              </optgroup>

              <optgroup label="३. सामाजिक शास्त्रे (Social Sciences)">
                <option value="history">इतिहास (History)</option>
                <option value="civics_pol">नागरिकशास्त्र व राज्यशास्त्र (Civics & Pol. Science)</option>
                <option value="geography">भूगोल (Geography)</option>
              </optgroup>

              <optgroup label="४. श्रेणी व विशेष विषय (Special & Grade Subjects)">
                <option value="health_pe">आरोग्य व शारीरिक शिक्षण (Health & P.E.)</option>
                <option value="art">कला शिक्षण (Art Education)</option>
                <option value="work_exp">कार्यानुभव (Work Experience)</option>
                <option value="defense">संरक्षण शास्त्र (Defense Studies - ९वी व १०वी)</option>
                <option value="water_sec">जलसुरक्षा (Water Security - ९वी व १०वी)</option>
              </optgroup>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              परीक्षेचे नाव व सत्र
            </label>
            <input
              type="text"
              value={examTitle}
              onChange={(e) => setExamTitle(e.target.value)}
              className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Quick Subject Access Pills */}
        <div className="pt-2 border-t border-slate-100 space-y-1.5">
          <div className="text-[11px] font-bold text-slate-600">त्वरित विषय निवडा:</div>
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'marathi', label: 'मराठी' },
              { id: 'hindi', label: 'हिंदी' },
              { id: 'english', label: 'इंग्रजी' },
              { id: 'maths', label: 'गणित' },
              { id: 'maths_algebra', label: 'बीजगणित (भाग १)' },
              { id: 'maths_geometry', label: 'भूमिती (भाग २)' },
              { id: 'science', label: 'विज्ञान' },
              { id: 'science1', label: 'विज्ञान भाग १' },
              { id: 'science2', label: 'विज्ञान भाग २' },
              { id: 'history', label: 'इतिहास' },
              { id: 'civics_pol', label: 'नागरिकशास्त्र' },
              { id: 'geography', label: 'भूगोल' },
              { id: 'health_pe', label: 'आरोग्य व शा.शि.' },
              { id: 'art', label: 'कला' },
              { id: 'work_exp', label: 'कार्यानुभव' },
              { id: 'defense', label: 'संरक्षण शास्त्र' },
              { id: 'water_sec', label: 'जलसुरक्षा' },
            ].map((sub) => (
              <button
                key={sub.id}
                type="button"
                onClick={() => handleSubjectChange(sub.id)}
                className={`px-2 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                  subject === sub.id
                    ? 'bg-amber-600 text-white shadow-xs ring-1 ring-amber-500'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {sub.label}
              </button>
            ))}
          </div>
        </div>

        {/* Format Guarantee Alert */}
        <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>प्रश्नरचना नियमावली:</strong> प्रश्न A) रिकाम्या जागा (५), प्रश्न B) जोड्या
              जुळवा (५), प्रश्न C) वस्तुनिष्ठ प्रश्न (५), प्रश्न D) एका वाक्यात उत्तरे (५). सर्व प्रश्न
              सोपे, सुटसुटीत व पाठ्यपुस्तकानुरूप आहेत.
            </span>
          </div>
          <span className="text-[11px] bg-white border border-amber-300 px-2 py-0.5 rounded font-bold text-amber-800 whitespace-nowrap">
            एकूण: २० गुण
          </span>
        </div>
      </div>

      {/* QUESTION PAPER PRINTABLE SHEET */}
      <div className="print-container bg-white rounded-xl border border-slate-300 p-8 shadow-sm space-y-6 text-slate-900 font-sans">
        {/* Paper Header */}
        <div className="border-b-2 border-slate-900 pb-3 text-center space-y-1">
          <div className="text-xs text-slate-600 font-bold uppercase tracking-wider">
            {SCHOOL_INFO.sanstha}
          </div>
          <h1 className="text-xl md:text-2xl font-black text-slate-950 tracking-wide">
            {SCHOOL_INFO.name}
          </h1>
          <p className="text-xs text-slate-700">
            {SCHOOL_INFO.address} • UDISE: {SCHOOL_INFO.udise} • इंडेक्स: {SCHOOL_INFO.schoolIndex}
          </p>

          <div className="pt-2 text-sm md:text-base font-extrabold text-slate-900 border-t border-slate-300 mt-2">
            {examTitle}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold pt-2 border-t border-slate-200">
            <div>इयत्ता: <span className="underline">{paper.standard}</span></div>
            <div>विषय: <span className="underline">{paper.subject}</span></div>
            <div>वेळ: <span className="underline">{paper.timeAllowed}</span></div>
            <div>एकूण गुण: <span className="underline">{paper.totalMarks}</span></div>
          </div>

          {/* Student Exam Details Line */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs font-semibold pt-2 text-left border-t border-slate-200">
            <div>विद्यार्थ्याचे नाव: ___________________________</div>
            <div>हजेरी क्र.: ________</div>
            <div>प्राप्त गुण: ________ / २०</div>
          </div>
        </div>

        {/* SECTION A: रिकाम्या जागा भरा */}
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-slate-300 pb-1">
            <h3 className="font-extrabold text-sm text-slate-900">
              {paper.sectionA.title}
            </h3>
            <span className="font-bold text-xs bg-slate-100 px-2 py-0.5 rounded border border-slate-300">
              ({paper.sectionA.marks} गुण)
            </span>
          </div>
          <p className="text-xs text-slate-600 italic">
            {paper.sectionA.instructions}
          </p>

          <div className="space-y-2.5 pt-1 pl-2">
            {paper.sectionA.questions.map((q, idx) => (
              <div key={q.id} className="text-xs leading-relaxed flex items-start gap-2">
                <span className="font-bold text-slate-800">{idx + 1})</span>
                <div className="flex-1">
                  <span>{q.question}</span>
                  {showAnswerKey && (
                    <span className="ml-2 font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded text-[11px]">
                      [उत्तर: {q.correctAnswer}]
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-slate-500 font-medium">(१ गुण)</span>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION B: जोड्या जुळवा */}
        <div className="space-y-3 pt-3">
          <div className="flex items-center justify-between border-b border-slate-300 pb-1">
            <h3 className="font-extrabold text-sm text-slate-900">
              {paper.sectionB.title}
            </h3>
            <span className="font-bold text-xs bg-slate-100 px-2 py-0.5 rounded border border-slate-300">
              ({paper.sectionB.marks} गुण)
            </span>
          </div>
          <p className="text-xs text-slate-600 italic">
            {paper.sectionB.instructions}
          </p>

          <div className="overflow-x-auto pt-1">
            <table className="w-full text-xs border border-slate-300">
              <thead>
                <tr className="bg-slate-100 text-slate-900 font-bold">
                  <th className="p-2 border border-slate-300 text-left w-1/2">
                    गट 'अ' (स्तंभ A)
                  </th>
                  <th className="p-2 border border-slate-300 text-left w-1/2">
                    गट 'ब' (स्तंभ B)
                  </th>
                  <th className="p-2 border border-slate-300 text-center w-24">
                    उत्तर
                  </th>
                </tr>
              </thead>
              <tbody>
                {paper.sectionB.pairs.map((pair, idx) => {
                  const letterOption = String.fromCharCode(65 + idx); // A, B, C, D, E
                  const rightText = paper.sectionB.shuffledRight[idx];
                  return (
                    <tr key={pair.id} className="hover:bg-slate-50">
                      <td className="p-2 border border-slate-300 font-medium">
                        {idx + 1}. {pair.left}
                      </td>
                      <td className="p-2 border border-slate-300 font-medium">
                        ({letterOption}) {rightText}
                      </td>
                      <td className="p-2 border border-slate-300 text-center text-slate-400">
                        {showAnswerKey ? (
                          <span className="font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                            {pair.right}
                          </span>
                        ) : (
                          '________'
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION C: वस्तुनिष्ठ प्रश्न (MCQ) */}
        <div className="space-y-3 pt-3">
          <div className="flex items-center justify-between border-b border-slate-300 pb-1">
            <h3 className="font-extrabold text-sm text-slate-900">
              {paper.sectionC.title}
            </h3>
            <span className="font-bold text-xs bg-slate-100 px-2 py-0.5 rounded border border-slate-300">
              ({paper.sectionC.marks} गुण)
            </span>
          </div>
          <p className="text-xs text-slate-600 italic">
            {paper.sectionC.instructions}
          </p>

          <div className="space-y-3 pt-1 pl-2">
            {paper.sectionC.questions.map((q, idx) => (
              <div key={q.id} className="text-xs leading-relaxed space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <span className="font-bold text-slate-800">
                    {idx + 1}) {q.question}
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium shrink-0">(१ गुण)</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pl-4 text-slate-700 pt-1">
                  {q.options?.map((opt, oIdx) => {
                    const optLabel = ['A', 'B', 'C', 'D'][oIdx];
                    const isCorrect = opt === q.correctAnswer;
                    return (
                      <div
                        key={oIdx}
                        className={`p-1 rounded ${
                          showAnswerKey && isCorrect
                            ? 'bg-emerald-100 text-emerald-900 font-bold border border-emerald-300'
                            : 'hover:bg-slate-100'
                        }`}
                      >
                        ({optLabel}) {opt}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION D: एका वाक्यात उत्तरे द्या */}
        <div className="space-y-3 pt-3">
          <div className="flex items-center justify-between border-b border-slate-300 pb-1">
            <h3 className="font-extrabold text-sm text-slate-900">
              {paper.sectionD.title}
            </h3>
            <span className="font-bold text-xs bg-slate-100 px-2 py-0.5 rounded border border-slate-300">
              ({paper.sectionD.marks} गुण)
            </span>
          </div>
          <p className="text-xs text-slate-600 italic">
            {paper.sectionD.instructions}
          </p>

          <div className="space-y-3 pt-1 pl-2">
            {paper.sectionD.questions.map((q, idx) => (
              <div key={q.id} className="text-xs leading-relaxed space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <span className="font-bold text-slate-800">
                    {idx + 1}) {q.question}
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium shrink-0">(१ गुण)</span>
                </div>
                {showAnswerKey ? (
                  <div className="pl-4 text-[11px] font-semibold text-emerald-800 bg-emerald-50 p-1.5 rounded border border-emerald-200">
                    उत्तर: {q.correctAnswer}
                  </div>
                ) : (
                  <div className="pt-2 text-slate-300 border-b border-dashed border-slate-300 pb-1">
                    उत्तर: ____________________________________________________________________
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Paper Footer / Teacher Sign */}
        <div className="pt-6 border-t border-slate-400 flex items-center justify-between text-xs font-bold text-slate-800">
          <div>विषय शिक्षक स्वाक्षरी: _______________</div>
          <div>मुख्याध्यापक स्वाक्षरी व शालेय शिक्का</div>
        </div>
      </div>
    </div>
  );
};
