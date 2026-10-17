import React, { useState } from 'react';
import {
  MailCheck,
  Printer,
  Copy,
  Check,
  Sparkles,
  RefreshCw,
  FileText,
  Building2,
  Calendar,
  Hash,
  Send,
} from 'lucide-react';
import { SCHOOL_INFO, GOV_OFFICES } from '../data/schoolData.ts';
import {
  LETTER_TEMPLATES,
  generateOfficialLetterText,
  GeneratedOfficialLetter,
} from '../utils/letterLogic.ts';

export const OfficialLetterView: React.FC = () => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');
  const [selectedOfficeId, setSelectedOfficeId] = useState<string>('pay_unit');
  const [outwardNo, setOutwardNo] = useState<string>('जावक क्र. _____ / २०२६-२७');
  const [letterDate, setLetterDate] = useState<string>(
    new Date().toLocaleDateString('mr-IN')
  );
  const [customSubject, setCustomSubject] = useState<string>('');
  const [customReference, setCustomReference] = useState<string>('');
  const [customBody, setCustomBody] = useState<string>('');
  const [customEnclosuresText, setCustomEnclosuresText] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [aiCustomPrompt, setAiCustomPrompt] = useState<string>('');

  const parsedEnclosures = customEnclosuresText.trim()
    ? customEnclosuresText
        .split('\n')
        .map((e) => e.trim())
        .filter((e) => e.length > 0)
    : undefined;

  // Generate current letter object
  const currentLetter: GeneratedOfficialLetter = generateOfficialLetterText(
    selectedTemplateId,
    customSubject,
    selectedOfficeId,
    customBody,
    outwardNo,
    letterDate,
    customReference,
    parsedEnclosures
  );

  const handleTemplateChange = (tmplId: string) => {
    setSelectedTemplateId(tmplId);
    if (!tmplId) {
      setCustomSubject('');
      setCustomReference('');
      setCustomBody('');
      setCustomEnclosuresText('');
      return;
    }
    const tmpl = LETTER_TEMPLATES.find((t) => t.id === tmplId);
    if (tmpl) {
      setSelectedOfficeId(tmpl.officeId);
      setCustomSubject(tmpl.defaultSubject);
      setCustomReference(tmpl.defaultReference);
      setCustomBody(tmpl.bodyContent);
      setCustomEnclosuresText(tmpl.enclosures.join('\n'));
    }
  };

  const handleResetToBlank = () => {
    setSelectedTemplateId('');
    setCustomSubject('');
    setCustomReference('');
    setCustomBody('');
    setCustomEnclosuresText('');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const text = `
${currentLetter.schoolName}
${currentLetter.schoolAddress}

${currentLetter.outwardNo}                                          दिनांक: ${currentLetter.date}

प्रति,
${currentLetter.recipientTitle},
${currentLetter.recipientOffice},
${currentLetter.recipientLocation}.

विषय: ${currentLetter.subject}
${currentLetter.reference ? `संदर्भ: ${currentLetter.reference}\n` : ''}
${currentLetter.salutation}

${currentLetter.bodyParagraphs.join('\n\n')}

${
  currentLetter.enclosures && currentLetter.enclosures.length > 0
    ? `सोबत जोडलेली कागदपत्रे (संलग्नक):\n${currentLetter.enclosures.map((enc, idx) => `${idx + 1}. ${enc}`).join('\n')}\n\n`
    : ''
}
स्थळ - ${currentLetter.place}                                       ${currentLetter.signatoryTitle}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleGenerateAiLetter = async () => {
    if (!aiCustomPrompt.trim()) return;
    setIsAiLoading(true);
    try {
      const res = await fetch('/api/generate-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          task: 'official_letter',
          prompt: `महाराष्ट्र शासनाच्या शिक्षण विभागाशी संबंधित अधिकृत कार्यालयीन पत्र तयार करा.
शाळेचे नाव: नामदार मुकुल वासनिक विद्यालय, आडोळ बु., ता. जळगाव जामोद, जि. बुलढाणा.
पत्राचा विषय किंवा अडचण: ${aiCustomPrompt}
नियमावली:
१. पत्राच्या मायण्यात व मजकुरात UDISE क्रमांक व शालार्थ आयडी टाकू नका.
२. जावक क्र. _____ अशी नोंद ठेवा.
३. पत्राच्या सर्वात शेवटी डाव्या बाजूस 'स्थळ - आडोळ बु.' आणि उजव्या बाजूस फक्त 'मुख्याध्यापक स्वाक्षरी' एवढेच असावे ('आपला विश्वासू' किंवा मुख्याध्यापकांचे वैयक्तिक नाव टाकू नये).`,
        }),
      });
      const data = await res.json();
      if (data.success && data.text) {
        setCustomBody(data.text);
        if (!customSubject) {
          setCustomSubject(aiCustomPrompt);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Control Configuration (Hidden during print) */}
      <div className="no-print bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <MailCheck className="w-5 h-5 text-amber-600" />
              शासकीय पत्रव्यवहार सहाय्यक
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              नामदार मुकुल वासनिक विद्यालय, आडोळ बु. — अधिकृत मराठी प्रशासकीय पत्रलेखन
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'पत्र कॉपी झाले!' : 'पत्र कॉपी करा (Word साठी)'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs md:text-sm font-bold shadow-sm cursor-pointer transition-colors"
            >
              <Printer className="w-4 h-4" />
              पत्र प्रिंट / PDF जतन
            </button>
          </div>
        </div>

        {/* User Strict Rule Confirmation Notice */}
        <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2">
          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>नियम अंमलबजावणी:</strong> १) पत्राच्या मायण्यात व मजकुरात UDISE क्रमांक व
            शालार्थ आयडी वगळण्यात आला आहे. २) वर "जावक क्र. _______" नोंद आहे. ३) सर्वात शेवटी{' '}
            <strong>"स्थळ - आडोळ बु."</strong> आणि त्यासमोर फक्त{' '}
            <strong>"मुख्याध्यापक स्वाक्षरी"</strong> ठेवले असून 'आपला विश्वासू, श्री. विनोद
            जगन्नाथ ठोंबरे' वगळले आहे.
          </div>
        </div>

        {/* Office & Template Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2 border-t border-slate-100">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-bold text-slate-700">
                पत्राचा प्रकार / विषय निवडा
              </label>
              {selectedTemplateId && (
                <button
                  type="button"
                  onClick={handleResetToBlank}
                  className="text-[10px] text-amber-700 hover:text-amber-900 font-semibold underline cursor-pointer"
                >
                  कोरा करा (स्वतःचा मजकूर)
                </button>
              )}
            </div>
            <select
              value={selectedTemplateId}
              onChange={(e) => handleTemplateChange(e.target.value)}
              className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-none"
            >
              <option value="">-- कोरा / स्वतःचा मजकूर (Specific पत्र लिहा) --</option>
              {LETTER_TEMPLATES.map((tmpl) => (
                <option key={tmpl.id} value={tmpl.id}>
                  {tmpl.title} ({tmpl.category})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              प्रति (संबधित शासकीय कार्यालय निवडा)
            </label>
            <select
              value={selectedOfficeId}
              onChange={(e) => setSelectedOfficeId(e.target.value)}
              className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-none"
            >
              {GOV_OFFICES.map((off) => (
                <option key={off.id} value={off.id}>
                  {off.title}, {off.office} ({off.location})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              जावक क्रमांक (Outward No.)
            </label>
            <input
              type="text"
              value={outwardNo}
              onChange={(e) => setOutwardNo(e.target.value)}
              placeholder="उदा. जावक क्र. ४५ / २०२६-२७"
              className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Live Subject, Reference and Paragraph Editing */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                पत्राचा विषय (Subject - येथे स्वतःचा विषय लिहा)
              </label>
              <input
                type="text"
                placeholder="उदा. प्रयोगशाळा साहित्य अनुदान मागणीबाबत किंवा शिक्षकांच्या रजेबाबत..."
                value={customSubject}
                onChange={(e) => setCustomSubject(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                संदर्भ (Reference - असल्यास लिहा किंवा रिकामे ठेवा)
              </label>
              <input
                type="text"
                placeholder="उदा. १. शासन परिपत्रक क्र. संकीर्ण-२०२६/सेवा-१"
                value={customReference}
                onChange={(e) => setCustomReference(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-bold text-slate-700">
                पत्राचा मुख्य मजकूर (Body - येथे थेट आपला विशिष्ट मजकूर टाईप किंवा पेस्ट करा)
              </label>
              <span className="text-[10px] text-slate-500">
                (दोन परिच्छेदांमध्ये १ ओळ मोकळी सोडा)
              </span>
            </div>
            <textarea
              rows={6}
              placeholder="महोदय / सविनय सादर,&#10;&#10;उपरोक्त विषयान्वये नामदार मुकुल वासनिक विद्यालय, आडोळ बु. येथून सविनय सादर करण्यात येते की...&#10;&#10;तरी याबाबत सकारात्मक निर्णय घेण्यात यावा, ही नम्र विनंती."
              value={customBody}
              onChange={(e) => setCustomBody(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              सोबत जोडलेली कागदपत्रे / संलग्नक (Enclosures - प्रत्येकी एका ओळीवर एक कागदपत्र लिहा)
            </label>
            <textarea
              rows={2}
              placeholder="१. शाळा व्यवस्थापन समिती ठराव प्रत&#10;२. आवश्यक विवरणपत्रे"
              value={customEnclosuresText}
              onChange={(e) => setCustomEnclosuresText(e.target.value)}
              className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>
        </div>

        {/* AI Custom Letter Helper */}
        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>AI शासकीय पत्र सहाय्यक (इतर कोणत्याही विषयावर नवीन पत्र तयार करा)</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="उदा. क्रीडांगण सुधारणेसाठी अनुदान मागणी किंवा शिक्षकांच्या वैद्यकीय रजेचा प्रस्ताव"
              value={aiCustomPrompt}
              onChange={(e) => setAiCustomPrompt(e.target.value)}
              className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
            <button
              onClick={handleGenerateAiLetter}
              disabled={isAiLoading || !aiCustomPrompt.trim()}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold cursor-pointer disabled:opacity-50"
            >
              {isAiLoading ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Send className="w-3.5 h-3.5 text-amber-400" />
              )}
              <span>पत्र तयार करा</span>
            </button>
          </div>
        </div>
      </div>

      {/* PRINTABLE OFFICIAL LETTER SHEET (A4 Perfect Format) */}
      <div className="print-container bg-white rounded-xl border border-slate-300 p-10 md:p-14 shadow-sm space-y-7 text-slate-900 leading-relaxed font-sans max-w-4xl mx-auto">
        {/* Letterhead */}
        <div className="border-b-2 border-slate-900 pb-3 text-center">
          <div className="text-xs text-slate-700 font-bold uppercase tracking-wider">
            {SCHOOL_INFO.sanstha}
          </div>
          <h1 className="text-xl md:text-2xl font-black text-slate-950 mt-1">
            {SCHOOL_INFO.name}
          </h1>
          <p className="text-xs text-slate-800 font-medium mt-0.5">
            {SCHOOL_INFO.address}
          </p>
          <div className="text-[11px] text-slate-600 mt-1">
            ई-मेल: {SCHOOL_INFO.email} | संपर्क: {SCHOOL_INFO.contact}
          </div>
        </div>

        {/* Dispatch Number & Date */}
        <div className="flex items-center justify-between text-xs md:text-sm font-bold pt-1">
          <div>{currentLetter.outwardNo}</div>
          <div>दिनांक: {currentLetter.date}</div>
        </div>

        {/* Recipient Details (प्रति) */}
        <div className="text-xs md:text-sm leading-relaxed">
          <p className="font-bold">प्रति,</p>
          <p className="font-bold pl-4">{currentLetter.recipientTitle},</p>
          <p className="pl-4">{currentLetter.recipientOffice},</p>
          <p className="pl-4 font-semibold">{currentLetter.recipientLocation}.</p>
        </div>

        {/* Subject & Reference */}
        <div className="space-y-1 pl-4 border-l-2 border-slate-400 text-xs md:text-sm">
          <div className="font-bold">
            विषय: <span className="font-extrabold">{currentLetter.subject || '________________________________________________'}</span>
          </div>
          {currentLetter.reference ? (
            <div className="text-slate-700 text-xs">
              संदर्भ: {currentLetter.reference}
            </div>
          ) : null}
        </div>

        {/* Salutation */}
        <div className="text-xs md:text-sm font-semibold">
          {currentLetter.salutation}
        </div>

        {/* Body Paragraphs */}
        <div className="space-y-4 text-xs md:text-sm text-justify leading-relaxed indent-8 min-h-[120px]">
          {currentLetter.bodyParagraphs.length > 0 ? (
            currentLetter.bodyParagraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))
          ) : (
            <p className="text-slate-400 italic font-mono no-print">
              [येथे पत्राचा मुख्य मजकूर दिसेल. वरील 'पत्राचा मुख्य मजकूर' बॉक्समध्ये आपला मजकूर टाईप करा.]
            </p>
          )}
        </div>

        {/* Enclosures (संलग्नक) */}
        {currentLetter.enclosures && currentLetter.enclosures.length > 0 && (
          <div className="text-xs pt-4 border-t border-slate-200">
            <span className="font-bold text-slate-800">सोबत जोडलेली कागदपत्रे (संलग्नक):</span>
            <ol className="list-decimal list-inside mt-1 space-y-0.5 text-slate-700 pl-2">
              {currentLetter.enclosures.map((enc, idx) => (
                <li key={idx}>{enc}</li>
              ))}
            </ol>
          </div>
        )}

        {/* Bottom Signoff (Strictly conforming to user requirement) */}
        <div className="pt-12 flex items-end justify-between text-xs md:text-sm font-bold text-slate-900">
          <div>
            <span>स्थळ - {currentLetter.place}</span>
          </div>
          <div className="text-right">
            <div className="h-10"></div>
            <div>{currentLetter.signatoryTitle}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
