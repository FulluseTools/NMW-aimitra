import React, { useState, useEffect } from 'react';
import { X, Key, ShieldCheck, Check, Sparkles, HelpCircle } from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData.ts';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState<string>('');
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  useEffect(() => {
    const saved = localStorage.getItem('user_gemini_api_key') || '';
    setApiKey(saved);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    localStorage.setItem('user_gemini_api_key', apiKey.trim());
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="bg-gradient-to-r from-slate-900 to-indigo-950 px-5 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base">सिस्टीम सेटिंग्ज व API Key</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Active School Profile Card */}
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              शाळा प्रोफाइल: {SCHOOL_INFO.name}
            </div>
            <div>UDISE: {SCHOOL_INFO.udise} | इंडेक्स: {SCHOOL_INFO.schoolIndex} | शालार्थ: {SCHOOL_INFO.shalarthId}</div>
          </div>

          {/* API Key Input */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-800">
              Gemini AI API Key (पर्यायी / Optional)
            </label>
            <p className="text-xs text-slate-500 leading-relaxed">
              अॅपमध्ये पूर्व-स्थापित बुद्धिमान मराठी शैक्षणिक मॉडेल्स आधीपासूनच कार्यरत आहेत. तथापि, अतिरिक्त अमर्याद AI निर्मितीसाठी आपण आपली Google Gemini API Key येथे टाकू शकता.
            </p>
            <input
              type="password"
              placeholder="AIzaSy..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          {/* Privacy Note */}
          <div className="flex items-start gap-2 text-[11px] text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              आपली API Key केवळ आपल्या ब्राउझरच्या सुरक्षित लोकल स्टोरेजमध्ये साठवली जाते आणि केवळ अधिकृत AI कॉल्ससाठी वापरली जाते.
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer"
            >
              बंद करा
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold shadow-sm cursor-pointer"
            >
              {savedSuccess ? <Check className="w-4 h-4 text-white" /> : null}
              <span>{savedSuccess ? 'जतन झाले!' : 'सेव्ह करा'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
