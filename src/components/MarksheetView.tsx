import React, { useState, useMemo } from 'react';
import {
  FileSpreadsheet,
  Printer,
  UserCheck,
  Award,
  Sparkles,
  Users,
  Plus,
  RefreshCw,
  Search,
  CheckCircle,
  FileText,
  UserPlus,
  Trash2,
  X,
  Edit2,
  Check,
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData.ts';
import {
  getSubjectsForClass,
  calculateStudentResult,
  generateSampleStudents,
  StudentMarks,
  StudentCalculatedResult,
} from '../utils/marksheetCalc.ts';

export const MarksheetView: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState<string>('std10');
  const [studentCountInput, setStudentCountInput] = useState<number>(50);
  const [students, setStudents] = useState<StudentMarks[]>(() =>
    generateSampleStudents('std10', 50)
  );
  const [activeViewMode, setActiveViewMode] = useState<'consolidated' | 'individual'>('consolidated');
  const [selectedStudentRoll, setSelectedStudentRoll] = useState<number>(1);
  const [examType, setExamType] = useState<string>('द्वितीय सत्र / वार्षिक परीक्षा २०२६-२७');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Add Student Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [newRollNo, setNewRollNo] = useState<number>(51);
  const [newStudentName, setNewStudentName] = useState<string>('');
  const [newMotherName, setNewMotherName] = useState<string>('');
  const [newGender, setNewGender] = useState<'मुला' | 'मुलगी'>('मुला');

  // Inline editing of names
  const [editingRoll, setEditingRoll] = useState<number | null>(null);
  const [editNameValue, setEditNameValue] = useState<string>('');
  const [editMotherValue, setEditMotherValue] = useState<string>('');

  const currentSubjects = useMemo(() => {
    return getSubjectsForClass(selectedClass);
  }, [selectedClass]);

  // Handle class change
  const handleClassChange = (classKey: string) => {
    setSelectedClass(classKey);
    const count = Math.max(1, Math.min(60, Number(studentCountInput) || 50));
    const newStudents = generateSampleStudents(classKey, count);
    setStudents(newStudents);
    setSelectedStudentRoll(1);
  };

  // Re-generate or adjust student count
  const handleUpdateStudentCount = (targetCount?: number) => {
    const count = Math.max(1, Math.min(60, Number(targetCount ?? studentCountInput) || 50));
    setStudentCountInput(count);
    setStudents(generateSampleStudents(selectedClass, count));
    setSelectedStudentRoll(1);
  };

  // Open Add Student Modal
  const handleOpenAddModal = () => {
    const nextRoll = students.length > 0 ? Math.max(...students.map((s) => s.rollNo)) + 1 : 1;
    setNewRollNo(nextRoll);
    setNewStudentName('');
    setNewMotherName('');
    setNewGender('मुला');
    setIsAddModalOpen(true);
  };

  // Submit Add Student Form
  const handleAddStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const roll = Number(newRollNo) || (students.length > 0 ? Math.max(...students.map((s) => s.rollNo)) + 1 : 1);
    const name = newStudentName.trim() || `विद्यार्थी ${roll}`;
    const mother = newMotherName.trim() || 'माता';

    // Populate default academic marks (approx 70%) and grade 'A'
    const academicMarks: Record<string, number> = {};
    currentSubjects.academic.forEach((sub) => {
      academicMarks[sub.id] = Math.round(sub.maxMarks * 0.7);
    });

    const gradeMarks: Record<string, 'A' | 'B' | 'C' | 'D'> = {};
    currentSubjects.graded.forEach((sub) => {
      gradeMarks[sub.id] = 'A';
    });

    const newStudent: StudentMarks = {
      rollNo: roll,
      name,
      motherName: mother,
      gender: newGender,
      academicMarks,
      gradeMarks,
    };

    setStudents((prev) => {
      // Remove any existing student with same rollNo if exists, then sort
      const filtered = prev.filter((s) => s.rollNo !== roll);
      const updated = [...filtered, newStudent].sort((a, b) => a.rollNo - b.rollNo);
      return updated;
    });

    setStudentCountInput((prev) => Math.max(prev, students.length + 1));
    setIsAddModalOpen(false);
  };

  // Delete student
  const handleDeleteStudent = (rollNo: number) => {
    if (students.length <= 1) {
      alert('किमान १ विद्यार्थी असणे आवश्यक आहे.');
      return;
    }
    if (window.confirm(`रोल नं. ${rollNo} विद्यार्थ्याला यादीतून हटवायचे आहे का?`)) {
      setStudents((prev) => prev.filter((s) => s.rollNo !== rollNo));
      setStudentCountInput((prev) => Math.max(1, prev - 1));
      if (selectedStudentRoll === rollNo) {
        setSelectedStudentRoll(1);
      }
    }
  };

  // Start inline editing
  const handleStartEdit = (student: StudentMarks) => {
    setEditingRoll(student.rollNo);
    setEditNameValue(student.name);
    setEditMotherValue(student.motherName || '');
  };

  // Save inline edit
  const handleSaveEdit = (rollNo: number) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.rollNo === rollNo
          ? {
              ...s,
              name: editNameValue.trim() || s.name,
              motherName: editMotherValue.trim() || s.motherName,
            }
          : s
      )
    );
    setEditingRoll(null);
  };

  // Compute calculated results for all students
  const calculatedResults: StudentCalculatedResult[] = useMemo(() => {
    return students.map((s) => calculateStudentResult(s, selectedClass));
  }, [students, selectedClass]);

  // Filtered students for search
  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) return calculatedResults;
    return calculatedResults.filter(
      (s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(s.rollNo).includes(searchQuery)
    );
  }, [calculatedResults, searchQuery]);

  // Current student for individual card
  const activeStudent = useMemo(() => {
    return (
      calculatedResults.find((s) => s.rollNo === selectedStudentRoll) ||
      calculatedResults[0] ||
      null
    );
  }, [calculatedResults, selectedStudentRoll]);

  // Update a single mark
  const handleMarkChange = (rollNo: number, subjectId: string, value: number) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.rollNo !== rollNo) return s;
        return {
          ...s,
          academicMarks: {
            ...s.academicMarks,
            [subjectId]: Math.max(0, Number(value) || 0),
          },
        };
      })
    );
  };

  // Update a graded subject
  const handleGradeChange = (
    rollNo: number,
    subjectId: string,
    grade: 'A' | 'B' | 'C' | 'D'
  ) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.rollNo !== rollNo) return s;
        return {
          ...s,
          gradeMarks: {
            ...s.gradeMarks,
            [subjectId]: grade,
          },
        };
      })
    );
  };

  // Summary statistics
  const summaryStats = useMemo(() => {
    const total = calculatedResults.length;
    if (total === 0) return { total: 0, passed: 0, passPct: 0, distinction: 0 };
    const passed = calculatedResults.filter((s) => s.resultStatus !== 'अनुत्तीर्ण').length;
    const distinction = calculatedResults.filter(
      (s) => s.resultStatus === 'विशेष प्राविण्य'
    ).length;
    const passPct = Number(((passed / total) * 100).toFixed(1));
    return { total, passed, passPct, distinction };
  }, [calculatedResults]);

  const classNameMap: Record<string, string> = {
    std6: 'इयत्ता ६ वी',
    std7: 'इयत्ता ७ वी',
    std8: 'इयत्ता ८ वी',
    std9: 'इयत्ता ९ वी',
    std10: 'इयत्ता १० वी',
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Control Header Card (Hidden during print) */}
      <div className="no-print bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-amber-600" />
              वर्गनिहाय गुणपत्रिका व निकाल पत्रक
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              महाराष्ट्र राज्य मंडळ अभ्यासक्रमानुसार शैक्षणिक व श्रेणी विषयांसह ५० विद्यार्थ्यांचे अचूक निकाल व्यवस्थापन
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleOpenAddModal}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs md:text-sm font-bold shadow-sm transition-colors cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              + नवीन विद्यार्थी जोडा
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs md:text-sm font-bold shadow-sm transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              {activeViewMode === 'individual'
                ? 'वैयक्तिक गुणपत्रिका प्रिंट (१ पान PDF)'
                : 'वर्ग निकाल पत्रक प्रिंट / PDF'}
            </button>
          </div>
        </div>

        {/* Class Selection Tabs (इयत्ता ६ वी ते १० वी) */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-700 mr-2">वर्ग निवडा:</span>
          {Object.entries(classNameMap).map(([key, label]) => (
            <button
              key={key}
              onClick={() => handleClassChange(key)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedClass === key
                  ? 'bg-amber-600 text-white shadow-sm ring-2 ring-amber-400'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Category Subject Note */}
        <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            {['std6', 'std7', 'std8'].includes(selectedClass) ? (
              <span>
                <strong>इयत्ता ६ वी ते ८ वी श्रेणी विषय:</strong> आरोग्य व शारीरिक शिक्षण, कला,
                कार्यानुभव या ३ विषयांचे कम्पार्टमेंट यशस्वीरित्या समाविष्ट आहेत.
              </span>
            ) : (
              <span>
                <strong>इयत्ता ९ वी ते १० वी श्रेणी विषय:</strong> आरोग्य व शारीरिक शिक्षण, संरक्षण
                शास्त्र, जलसुरक्षा या ३ विषयांचे कम्पार्टमेंट यशस्वीरित्या समाविष्ट आहेत.
              </span>
            )}
          </div>
        </div>

        {/* Inputs & Quick Student Count Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-1">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              एकूण विद्यार्थी संख्या (सध्या {students.length})
            </label>
            <div className="flex items-center gap-1.5">
              <input
                type="number"
                min="1"
                max="60"
                value={studentCountInput}
                onChange={(e) => setStudentCountInput(Number(e.target.value))}
                className="w-16 px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-bold text-center focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
              <button
                onClick={() => handleUpdateStudentCount()}
                className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer"
              >
                लागू करा
              </button>
              {/* Quick 50 Students Preset Button */}
              <button
                onClick={() => handleUpdateStudentCount(50)}
                className="px-2.5 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer"
                title="थेट ५० विद्यार्थी लोड करा"
              >
                ५० विद्यार्थी
              </button>
            </div>
            {/* Quick Count Selector Buttons */}
            <div className="flex items-center gap-1 mt-1.5">
              <span className="text-[10px] text-slate-500">त्वरित संख्या:</span>
              {[10, 20, 30, 40, 50].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => handleUpdateStudentCount(num)}
                  className={`text-[10px] px-1.5 py-0.5 rounded border ${
                    students.length === num
                      ? 'bg-amber-600 text-white border-amber-600 font-bold'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              परीक्षेचे नाव
            </label>
            <input
              type="text"
              value={examType}
              onChange={(e) => setExamType(e.target.value)}
              className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              निकाल मांडणी स्वरूप
            </label>
            <div className="flex items-center rounded-lg border border-slate-300 p-0.5 bg-slate-50">
              <button
                onClick={() => setActiveViewMode('consolidated')}
                className={`flex-1 py-1 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                  activeViewMode === 'consolidated'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                वर्ग निकाल पत्रक
              </button>
              <button
                onClick={() => setActiveViewMode('individual')}
                className={`flex-1 py-1 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                  activeViewMode === 'individual'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                वैयक्तिक गुणपत्रिका (१ पान)
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              विद्यार्थी शोधा (नाव / रोल नं)
            </label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="उदा. आरव किंवा १"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Ribbon */}
      <div className="no-print grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-500 font-medium">एकूण प्रविष्ट विद्यार्थी</div>
            <div className="text-base font-bold text-slate-800">{summaryStats.total}</div>
          </div>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-500 font-medium">उत्तीर्ण विद्यार्थी</div>
            <div className="text-base font-bold text-emerald-700">
              {summaryStats.passed} ({summaryStats.passPct}%)
            </div>
          </div>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-500 font-medium">विशेष प्राविण्य (Distinction)</div>
            <div className="text-base font-bold text-amber-700">{summaryStats.distinction}</div>
          </div>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-500 font-medium">सध्याचा वर्ग</div>
            <div className="text-base font-bold text-slate-800">{classNameMap[selectedClass]}</div>
          </div>
        </div>
      </div>

      {/* PRINT CONTAINER (Renders on screen and in print) */}
      <div className="print-container bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        {/* Printable Official School Header - ONLY FOR CONSOLIDATED CLASS SHEET (avoids 2 pages on individual card) */}
        {activeViewMode === 'consolidated' && (
          <div className="border-b-2 border-slate-800 pb-3 mb-4 text-center">
            <div className="text-xs text-slate-600 font-semibold uppercase tracking-wider">
              {SCHOOL_INFO.sanstha}
            </div>
            <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 mt-1">
              {SCHOOL_INFO.name}
            </h1>
            <p className="text-xs text-slate-700 font-medium mt-0.5">
              {SCHOOL_INFO.address}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-800 mt-1.5">
              <span>UDISE+ क्र.: <strong>{SCHOOL_INFO.udise}</strong></span>
              <span>•</span>
              <span>इंडेक्स क्र.: <strong>{SCHOOL_INFO.schoolIndex}</strong></span>
              <span>•</span>
              <span>शालार्थ आयडी: <strong>{SCHOOL_INFO.shalarthId}</strong></span>
            </div>

            <div className="mt-2 inline-block bg-slate-100 px-4 py-0.5 rounded-full text-xs font-bold text-slate-900 border border-slate-300">
              {examType} — {classNameMap[selectedClass]} (एकूण विद्यार्थी: {students.length})
            </div>
          </div>
        )}

        {/* VIEW MODE 1: CONSOLIDATED CLASS RESULT SHEET */}
        {activeViewMode === 'consolidated' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 no-print mb-2">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-800">
                  वर्गनिहाय सर्वसमावेशक निकाल नोंदवही ({classNameMap[selectedClass]} — एकूण {students.length} विद्यार्थी)
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleOpenAddModal}
                  className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  विद्यार्थी ऍड करा
                </button>
                <span className="text-[11px] text-slate-500">
                  (गुणांवर किंवा नावावर क्लिक करून बदल करू शकता)
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse border border-slate-400">
                <thead>
                  <tr className="bg-slate-100 text-slate-900 text-center font-bold">
                    <th className="p-1.5 border border-slate-300 w-10" rowSpan={2}>
                      ह.क्र.
                    </th>
                    <th className="p-1.5 border border-slate-300 text-left min-w-[150px]" rowSpan={2}>
                      विद्यार्थ्याचे संपूर्ण नाव
                    </th>
                    {/* Academic subjects headers */}
                    <th
                      className="p-1 border border-slate-300 bg-blue-50 text-blue-950"
                      colSpan={currentSubjects.academic.length}
                    >
                      शैक्षणिक विषय गुण (Academic Subjects)
                    </th>
                    {/* Graded subjects headers */}
                    <th
                      className="p-1 border border-slate-300 bg-amber-50 text-amber-950"
                      colSpan={currentSubjects.graded.length}
                    >
                      श्रेणी विषय (Grade Subjects)
                    </th>
                    <th className="p-1.5 border border-slate-300 w-16" rowSpan={2}>
                      एकूण गुण
                    </th>
                    <th className="p-1.5 border border-slate-300 w-14" rowSpan={2}>
                      टक्केवारी
                    </th>
                    <th className="p-1.5 border border-slate-300 w-12" rowSpan={2}>
                      श्रेणी
                    </th>
                    <th className="p-1.5 border border-slate-300 w-20" rowSpan={2}>
                      निकाल
                    </th>
                    <th className="p-1.5 border border-slate-300 w-12 no-print" rowSpan={2}>
                      कृती
                    </th>
                  </tr>
                  <tr className="bg-slate-50 text-[10px] text-center font-semibold">
                    {currentSubjects.academic.map((sub) => (
                      <th key={sub.id} className="p-1 border border-slate-300 min-w-[65px]">
                        <div>{sub.name}</div>
                        <div className="text-[9px] text-slate-500">({sub.maxMarks})</div>
                      </th>
                    ))}
                    {currentSubjects.graded.map((sub) => (
                      <th
                        key={sub.id}
                        className="p-1 border border-slate-300 min-w-[75px] bg-amber-50/50"
                      >
                        <div>{sub.name}</div>
                        <div className="text-[9px] text-amber-700">(श्रेणी A/B/C)</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredResults.map((student) => (
                    <tr
                      key={student.rollNo}
                      className="hover:bg-amber-50/40 transition-colors text-center"
                    >
                      <td className="p-1.5 border border-slate-300 font-bold">
                        {student.rollNo}
                      </td>
                      <td className="p-1.5 border border-slate-300 text-left font-medium">
                        {editingRoll === student.rollNo ? (
                          <div className="space-y-1">
                            <input
                              type="text"
                              value={editNameValue}
                              onChange={(e) => setEditNameValue(e.target.value)}
                              className="w-full px-1.5 py-0.5 border border-amber-500 rounded text-xs font-bold"
                              placeholder="विद्यार्थ्याचे नाव"
                            />
                            <div className="flex items-center gap-1">
                              <input
                                type="text"
                                value={editMotherValue}
                                onChange={(e) => setEditMotherValue(e.target.value)}
                                className="w-24 px-1.5 py-0.5 border border-slate-300 rounded text-[10px]"
                                placeholder="आईचे नाव"
                              />
                              <button
                                type="button"
                                onClick={() => handleSaveEdit(student.rollNo)}
                                className="px-1.5 py-0.5 bg-emerald-600 text-white rounded text-[10px] font-bold"
                              >
                                <Check className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between group">
                            <div>
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedStudentRoll(student.rollNo);
                                  setActiveViewMode('individual');
                                }}
                                className="text-amber-800 hover:text-amber-950 hover:underline font-semibold text-left cursor-pointer"
                              >
                                {student.name}
                              </button>
                              <div className="text-[10px] text-slate-500">
                                आई: {student.motherName || 'माता'}
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleStartEdit(student)}
                              className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-amber-600 no-print ml-1"
                              title="नाव संपादन करा"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </td>

                      {/* Academic Subject Marks Inputs */}
                      {currentSubjects.academic.map((sub) => {
                        const marks = student.academicMarks[sub.id] || 0;
                        const isFail = marks < Math.ceil(sub.maxMarks * 0.35);
                        return (
                          <td
                            key={sub.id}
                            className={`p-0.5 border border-slate-300 ${
                              isFail ? 'bg-rose-50 text-rose-700 font-bold' : ''
                            }`}
                          >
                            <input
                              type="number"
                              min="0"
                              max={sub.maxMarks}
                              value={marks}
                              onChange={(e) =>
                                handleMarkChange(student.rollNo, sub.id, Number(e.target.value))
                              }
                              className="w-11 text-center py-0.5 rounded border border-transparent hover:border-slate-300 focus:border-amber-500 focus:bg-white text-xs font-semibold"
                            />
                          </td>
                        );
                      })}

                      {/* Graded Subject Selection */}
                      {currentSubjects.graded.map((sub) => {
                        const grade = student.gradeMarks[sub.id] || 'A';
                        return (
                          <td
                            key={sub.id}
                            className="p-0.5 border border-slate-300 bg-amber-50/20"
                          >
                            <select
                              value={grade}
                              onChange={(e) =>
                                handleGradeChange(
                                  student.rollNo,
                                  sub.id,
                                  e.target.value as 'A' | 'B' | 'C' | 'D'
                                )
                              }
                              className="px-1 py-0.5 text-center font-bold text-xs rounded border border-transparent hover:border-amber-300 bg-transparent cursor-pointer"
                            >
                              <option value="A">A</option>
                              <option value="B">B</option>
                              <option value="C">C</option>
                              <option value="D">D</option>
                            </select>
                          </td>
                        );
                      })}

                      <td className="p-1.5 border border-slate-300 font-bold">
                        {student.totalObtained} / {student.totalMax}
                      </td>
                      <td className="p-1.5 border border-slate-300 font-bold text-slate-900">
                        {student.percentage}%
                      </td>
                      <td className="p-1.5 border border-slate-300 font-extrabold text-blue-700">
                        {student.finalGrade}
                      </td>
                      <td className="p-1.5 border border-slate-300">
                        <span
                          className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold ${
                            student.resultStatus === 'विशेष प्राविण्य'
                              ? 'bg-purple-100 text-purple-800'
                              : student.resultStatus === 'प्रथम श्रेणी'
                              ? 'bg-blue-100 text-blue-800'
                              : student.resultStatus === 'उत्तीर्ण'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {student.resultStatus}
                        </span>
                      </td>
                      <td className="p-1 border border-slate-300 no-print">
                        <button
                          type="button"
                          onClick={() => handleDeleteStudent(student.rollNo)}
                          className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                          title="विद्यार्थी हटवा"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Quick Add Student Button Row at bottom of table */}
            <div className="no-print pt-2 flex items-center justify-between border-t border-slate-100">
              <button
                type="button"
                onClick={handleOpenAddModal}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-lg text-xs font-bold cursor-pointer"
              >
                <Plus className="w-4 h-4 text-emerald-600" />
                <span>या वर्गात आणखी विद्यार्थी ऍड करा</span>
              </button>
              <span className="text-xs text-slate-500 font-medium">
                सध्या एकूण: <strong>{students.length}</strong> विद्यार्थी नोंदवले आहेत (कमाल ५०/६० पर्यंत क्षमता).
              </span>
            </div>

            {/* Consolidated Signature Block for Print */}
            <div className="pt-6 grid grid-cols-3 text-center text-xs font-bold text-slate-800">
              <div>
                <p>वर्गशिक्षक स्वाक्षरी</p>
                <p className="mt-6 text-slate-500 font-normal">स्वाक्षरी व नाव</p>
              </div>
              <div>
                <p>परीक्षा प्रमुख स्वाक्षरी</p>
                <p className="mt-6 text-slate-500 font-normal">स्वाक्षरी व नाव</p>
              </div>
              <div>
                <p>मुख्याध्यापक स्वाक्षरी व शिक्का</p>
                <p className="mt-6 text-slate-900 font-semibold">
                  नामदार मुकुल वासनिक विद्यालय, आडोळ बु.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* VIEW MODE 2: INDIVIDUAL STUDENT REPORT CARD (Strictly formatted to fit on 1 Single A4 Page) */}
        {activeViewMode === 'individual' && activeStudent && (
          <div className="space-y-4 max-w-3xl mx-auto">
            {/* Student Picker (Hidden in print) */}
            <div className="no-print flex items-center justify-between gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-xs font-bold text-slate-700 whitespace-nowrap">
                विद्यार्थी निवडा ({students.length} पैकी):
              </span>
              <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                {calculatedResults.map((s) => (
                  <button
                    key={s.rollNo}
                    onClick={() => setSelectedStudentRoll(s.rollNo)}
                    className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      selectedStudentRoll === s.rollNo
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    ह.क्र. {s.rollNo} - {s.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Individual Progress Card Document (Targeted for STRICT 1 SINGLE PAGE PRINT) */}
            <div className="single-page-card border-2 border-slate-900 p-4 rounded-lg bg-white relative text-slate-900">
              {/* Official School Header */}
              <div className="text-center pb-2 border-b-2 border-slate-900">
                <div className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">
                  {SCHOOL_INFO.sanstha}
                </div>
                <h2 className="text-lg font-black text-slate-950 mt-0.5">
                  {SCHOOL_INFO.name}
                </h2>
                <p className="text-[11px] text-slate-700">
                  {SCHOOL_INFO.address} • UDISE: {SCHOOL_INFO.udise} • इंडेक्स: {SCHOOL_INFO.schoolIndex}
                </p>
                <div className="inline-block mt-1 bg-slate-100 px-3 py-0.5 rounded font-black text-xs border border-slate-300">
                  वार्षिक प्रगती पत्रक (Progress Report Card) — {examType}
                </div>
              </div>

              {/* Student Bio Details Grid (Compact, single-page fit) */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 py-2 text-xs border-b border-slate-300">
                <div>
                  <span className="text-slate-500 text-[10px]">विद्यार्थ्याचे नाव:</span>
                  <div className="font-bold text-slate-900 text-xs">{activeStudent.name}</div>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px]">आईचे नाव:</span>
                  <div className="font-bold text-slate-900 text-xs">{activeStudent.motherName || 'माता'}</div>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px]">इयत्ता / तुकडी:</span>
                  <div className="font-bold text-slate-900 text-xs">{classNameMap[selectedClass]} (अ)</div>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px]">हजेरी क्रमांक (Roll No):</span>
                  <div className="font-bold text-slate-900 text-xs">{activeStudent.rollNo}</div>
                </div>
              </div>

              {/* Subject Wise Marks Table */}
              <div className="py-2">
                <h4 className="text-[11px] font-bold text-slate-900 mb-1">
                  १. शैक्षणिक विषय (Academic Subjects)
                </h4>
                <table className="w-full text-xs border-collapse border border-slate-400 text-center mb-2">
                  <thead>
                    <tr className="bg-slate-100 font-bold text-[11px]">
                      <th className="py-1 px-2 border border-slate-300 text-left">विषय (Subject)</th>
                      <th className="py-1 px-2 border border-slate-300 w-24">एकूण गुण</th>
                      <th className="py-1 px-2 border border-slate-300 w-24">प्राप्त गुण</th>
                      <th className="py-1 px-2 border border-slate-300 w-20">श्रेणी</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentSubjects.academic.map((sub) => {
                      const marks = activeStudent.academicMarks[sub.id] || 0;
                      const subPct = (marks / sub.maxMarks) * 100;
                      return (
                        <tr key={sub.id} className="hover:bg-slate-50 text-[11px]">
                          <td className="py-1 px-2 border border-slate-300 text-left font-semibold">
                            {sub.name}
                          </td>
                          <td className="py-1 px-2 border border-slate-300">{sub.maxMarks}</td>
                          <td className="py-1 px-2 border border-slate-300 font-bold">{marks}</td>
                          <td className="py-1 px-2 border border-slate-300 font-semibold text-blue-700">
                            {subPct >= 80 ? 'A' : subPct >= 60 ? 'B' : subPct >= 40 ? 'C' : 'D'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <h4 className="text-[11px] font-bold text-slate-900 mb-1">
                  २. श्रेणी विषय (Grade Subjects - सहशालेय उपक्रम)
                </h4>
                <table className="w-full text-xs border-collapse border border-slate-400 text-center">
                  <thead>
                    <tr className="bg-amber-50 text-amber-950 font-bold text-[11px]">
                      <th className="py-1 px-2 border border-slate-300 text-left">श्रेणी विषय</th>
                      <th className="py-1 px-2 border border-slate-300 w-28">मिळालेली श्रेणी</th>
                      <th className="py-1 px-2 border border-slate-300">वर्णनात्मक शेरा</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentSubjects.graded.map((sub) => {
                      const grade = activeStudent.gradeMarks[sub.id] || 'A';
                      return (
                        <tr key={sub.id} className="hover:bg-slate-50 text-[11px]">
                          <td className="py-1 px-2 border border-slate-300 text-left font-semibold">
                            {sub.name}
                          </td>
                          <td className="py-1 px-2 border border-slate-300 font-extrabold text-amber-800">
                            श्रेणी '{grade}'
                          </td>
                          <td className="py-1 px-2 border border-slate-300 text-left text-slate-700">
                            {grade === 'A'
                              ? 'सक्रिय सहभाग व उत्कृष्ट कौशल्य'
                              : 'चांगली प्रगती व नियमित उपस्थिती'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Total & Result Summary Box (Single Line) */}
              <div className="bg-slate-50 border border-slate-400 rounded p-2 grid grid-cols-4 gap-2 text-center my-2">
                <div>
                  <div className="text-slate-600 text-[10px]">एकूण प्राप्त गुण</div>
                  <div className="font-black text-slate-950 text-xs">
                    {activeStudent.totalObtained} / {activeStudent.totalMax}
                  </div>
                </div>
                <div>
                  <div className="text-slate-600 text-[10px]">टक्केवारी</div>
                  <div className="font-black text-slate-950 text-xs">
                    {activeStudent.percentage}%
                  </div>
                </div>
                <div>
                  <div className="text-slate-600 text-[10px]">अंतिम श्रेणी</div>
                  <div className="font-black text-blue-700 text-xs">
                    {activeStudent.finalGrade}
                  </div>
                </div>
                <div>
                  <div className="text-slate-600 text-[10px]">अंतिम निकाल</div>
                  <div className="font-black text-emerald-700 text-xs">
                    {activeStudent.resultStatus}
                  </div>
                </div>
              </div>

              {/* Signatures (Tight vertical height to prevent 2nd page spill) */}
              <div className="pt-3 grid grid-cols-3 text-center text-xs font-bold text-slate-900 border-t border-slate-200 mt-2">
                <div>
                  <p>पालकाची स्वाक्षरी</p>
                  <div className="h-6"></div>
                  <p className="text-slate-500 text-[10px] font-normal">पालक स्वाक्षरी</p>
                </div>
                <div>
                  <p>वर्गशिक्षक स्वाक्षरी</p>
                  <div className="h-6"></div>
                  <p className="text-slate-500 text-[10px] font-normal">वर्गशिक्षक</p>
                </div>
                <div>
                  <p>मुख्याध्यापक स्वाक्षरी व शिक्का</p>
                  <div className="h-6"></div>
                  <p className="text-slate-900 text-[10px] font-semibold">
                    नामदार मुकुल वासनिक विद्यालय, आडोळ बु.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ADD STUDENT MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-amber-600 px-5 py-3 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                नवीन विद्यार्थी जोडा ({classNameMap[selectedClass]})
              </h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-white/80 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddStudentSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  हजेरी क्रमांक (Roll No.)
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={newRollNo}
                  onChange={(e) => setNewRollNo(Number(e.target.value))}
                  required
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-bold focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  विद्यार्थ्याचे संपूर्ण नाव
                </label>
                <input
                  type="text"
                  placeholder="उदा. आरव विनोद ठोंबरे"
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  required
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  आईचे नाव
                </label>
                <input
                  type="text"
                  placeholder="उदा. सुनिता"
                  value={newMotherName}
                  onChange={(e) => setNewMotherName(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  लिंग
                </label>
                <div className="flex items-center gap-4 text-xs font-semibold">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      checked={newGender === 'मुला'}
                      onChange={() => setNewGender('मुला')}
                    />
                    <span>मुलगा (Boy)</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      checked={newGender === 'मुलगी'}
                      onChange={() => setNewGender('मुलगी')}
                    />
                    <span>मुलगी (Girl)</span>
                  </label>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-[11px] text-slate-600">
                विद्यार्थी ऍड झाल्यानंतर टेबलमध्ये थेट गुणांवर क्लिक करून गुण बदलता येतील.
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  रद्द करा
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  विद्यार्थी जोडा
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
