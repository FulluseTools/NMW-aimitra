import React, { useState, useMemo } from 'react';
import {
  FileSpreadsheet,
  Printer,
  UserCheck,
  Award,
  Sparkles,
  Download,
  Users,
  Plus,
  RefreshCw,
  Search,
  CheckCircle,
  FileText,
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
  const [studentCountInput, setStudentCountInput] = useState<number>(10);
  const [students, setStudents] = useState<StudentMarks[]>(() =>
    generateSampleStudents('std10', 10)
  );
  const [activeViewMode, setActiveViewMode] = useState<'consolidated' | 'individual'>('consolidated');
  const [selectedStudentRoll, setSelectedStudentRoll] = useState<number>(1);
  const [examType, setExamType] = useState<string>('द्वितीय सत्र / वार्षिक परीक्षा २०२६-२७');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Handle class change
  const handleClassChange = (classKey: string) => {
    setSelectedClass(classKey);
    const newStudents = generateSampleStudents(classKey, studentCountInput);
    setStudents(newStudents);
    setSelectedStudentRoll(1);
  };

  // Re-generate or adjust student count
  const handleUpdateStudentCount = () => {
    const count = Math.max(1, Math.min(60, Number(studentCountInput) || 10));
    setStudents(generateSampleStudents(selectedClass, count));
    setSelectedStudentRoll(1);
  };

  const currentSubjects = useMemo(() => {
    return getSubjectsForClass(selectedClass);
  }, [selectedClass]);

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
              महाराष्ट्र राज्य मंडळ अभ्यासक्रमानुसार शैक्षणिक व श्रेणी विषयांसह अचूक गुणनोंद
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs md:text-sm font-bold shadow-sm transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              गुणपत्रिका प्रिंट / PDF सेव्ह
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
                कार्यानुभव या ३ विषयांचे कम्पार्टमेंट यशस्वीरित्या समाविष्ट करण्यात आले आहे.
              </span>
            ) : (
              <span>
                <strong>इयत्ता ९ वी ते १० वी श्रेणी विषय:</strong> आरोग्य व शारीरिक शिक्षण, संरक्षण
                शास्त्र, जलसुरक्षा या ३ विषयांचे कम्पार्टमेंट यशस्वीरित्या समाविष्ट करण्यात आले आहे.
              </span>
            )}
          </div>
        </div>

        {/* Inputs Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-1">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              एकूण विद्यार्थी संख्या
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                max="60"
                value={studentCountInput}
                onChange={(e) => setStudentCountInput(Number(e.target.value))}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
              <button
                onClick={handleUpdateStudentCount}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer"
              >
                लागू करा
              </button>
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
                वैयक्तिक गुणपत्रिका
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

      {/* PRINT CONTAINER (Renders perfectly on screen and in print) */}
      <div className="print-container bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        {/* Printable Official School Header */}
        <div className="border-b-2 border-slate-800 pb-4 mb-4 text-center">
          <div className="text-xs text-slate-600 font-semibold uppercase tracking-wider">
            {SCHOOL_INFO.sanstha}
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 mt-1">
            {SCHOOL_INFO.name}
          </h1>
          <p className="text-xs text-slate-700 font-medium mt-0.5">
            {SCHOOL_INFO.address}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-800 mt-2">
            <span>UDISE+ क्र.: <strong>{SCHOOL_INFO.udise}</strong></span>
            <span>•</span>
            <span>इंडेक्स क्र.: <strong>{SCHOOL_INFO.schoolIndex}</strong></span>
            <span>•</span>
            <span>शालार्थ आयडी: <strong>{SCHOOL_INFO.shalarthId}</strong></span>
          </div>

          <div className="mt-3 inline-block bg-slate-100 px-4 py-1 rounded-full text-xs font-bold text-slate-900 border border-slate-300">
            {examType} — {classNameMap[selectedClass]}
          </div>
        </div>

        {/* VIEW MODE 1: CONSOLIDATED CLASS RESULT SHEET */}
        {activeViewMode === 'consolidated' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between no-print mb-2">
              <h3 className="text-sm font-bold text-slate-800">
                वर्गनिहाय सर्वसमावेशक निकाल नोंदवही ({classNameMap[selectedClass]})
              </h3>
              <span className="text-xs text-slate-500">
                (गुणांवर क्लिक करून हवे असल्यास बदल करू शकता)
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse border border-slate-400">
                <thead>
                  <tr className="bg-slate-100 text-slate-900 text-center font-bold">
                    <th className="p-2 border border-slate-300 w-12" rowSpan={2}>
                      हजेरी क्र.
                    </th>
                    <th className="p-2 border border-slate-300 text-left min-w-[140px]" rowSpan={2}>
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
                    <th className="p-2 border border-slate-300 w-16" rowSpan={2}>
                      एकूण गुण
                    </th>
                    <th className="p-2 border border-slate-300 w-14" rowSpan={2}>
                      टक्केवारी
                    </th>
                    <th className="p-2 border border-slate-300 w-12" rowSpan={2}>
                      श्रेणी
                    </th>
                    <th className="p-2 border border-slate-300 w-20" rowSpan={2}>
                      निकाल
                    </th>
                  </tr>
                  <tr className="bg-slate-50 text-[11px] text-center font-semibold">
                    {currentSubjects.academic.map((sub) => (
                      <th key={sub.id} className="p-1.5 border border-slate-300 min-w-[70px]">
                        <div>{sub.name}</div>
                        <div className="text-[10px] text-slate-500">({sub.maxMarks})</div>
                      </th>
                    ))}
                    {currentSubjects.graded.map((sub) => (
                      <th
                        key={sub.id}
                        className="p-1.5 border border-slate-300 min-w-[80px] bg-amber-50/50"
                      >
                        <div>{sub.name}</div>
                        <div className="text-[10px] text-amber-700">(श्रेणी A/B/C)</div>
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
                      <td className="p-2 border border-slate-300 font-bold">
                        {student.rollNo}
                      </td>
                      <td className="p-2 border border-slate-300 text-left font-medium">
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
                        <div className="text-[10px] text-slate-500">आई: {student.motherName}</div>
                      </td>

                      {/* Academic Subject Marks Inputs */}
                      {currentSubjects.academic.map((sub) => {
                        const marks = student.academicMarks[sub.id] || 0;
                        const isFail = marks < Math.ceil(sub.maxMarks * 0.35);
                        return (
                          <td
                            key={sub.id}
                            className={`p-1 border border-slate-300 ${
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
                              className="w-12 text-center py-1 rounded border border-transparent hover:border-slate-300 focus:border-amber-500 focus:bg-white text-xs font-semibold"
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
                            className="p-1 border border-slate-300 bg-amber-50/20"
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
                              className="px-1.5 py-1 text-center font-bold text-xs rounded border border-transparent hover:border-amber-300 bg-transparent cursor-pointer"
                            >
                              <option value="A">A</option>
                              <option value="B">B</option>
                              <option value="C">C</option>
                              <option value="D">D</option>
                            </select>
                          </td>
                        );
                      })}

                      <td className="p-2 border border-slate-300 font-bold">
                        {student.totalObtained} / {student.totalMax}
                      </td>
                      <td className="p-2 border border-slate-300 font-bold text-slate-900">
                        {student.percentage}%
                      </td>
                      <td className="p-2 border border-slate-300 font-extrabold text-blue-700">
                        {student.finalGrade}
                      </td>
                      <td className="p-2 border border-slate-300">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold ${
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Consolidated Signature Block for Print */}
            <div className="pt-8 grid grid-cols-3 text-center text-xs font-bold text-slate-800">
              <div>
                <p>वर्गशिक्षक स्वाक्षरी</p>
                <p className="mt-8 text-slate-500 font-normal">स्वाक्षरी व नाव</p>
              </div>
              <div>
                <p>परीक्षा प्रमुख स्वाक्षरी</p>
                <p className="mt-8 text-slate-500 font-normal">स्वाक्षरी व नाव</p>
              </div>
              <div>
                <p>मुख्याध्यापक स्वाक्षरी व शिक्का</p>
                <p className="mt-8 text-slate-900 font-semibold">
                  नामदार मुकुल वासनिक विद्यालय, आडोळ बु.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* VIEW MODE 2: INDIVIDUAL STUDENT REPORT CARD */}
        {activeViewMode === 'individual' && activeStudent && (
          <div className="space-y-6 max-w-3xl mx-auto">
            {/* Student Picker (Hidden in print) */}
            <div className="no-print flex items-center justify-between gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-xs font-bold text-slate-700">विद्यार्थी निवडा:</span>
              <div className="flex items-center gap-2 overflow-x-auto py-1">
                {calculatedResults.map((s) => (
                  <button
                    key={s.rollNo}
                    onClick={() => setSelectedStudentRoll(s.rollNo)}
                    className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
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

            {/* Individual Progress Card Document */}
            <div className="border-2 border-slate-900 p-6 rounded-lg bg-white relative">
              <div className="text-center pb-4 border-b border-slate-400">
                <span className="text-xs font-bold text-slate-700 uppercase">
                  वार्षिक प्रगती पत्रक (Progress Report Card)
                </span>
                <h2 className="text-lg font-black text-slate-900 mt-1">
                  {SCHOOL_INFO.name}
                </h2>
                <p className="text-xs text-slate-600">
                  {SCHOOL_INFO.address}
                </p>
              </div>

              {/* Student Bio Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 py-4 text-xs border-b border-slate-300">
                <div>
                  <span className="text-slate-500">विद्यार्थ्याचे नाव:</span>
                  <div className="font-bold text-slate-900">{activeStudent.name}</div>
                </div>
                <div>
                  <span className="text-slate-500">आईचे नाव:</span>
                  <div className="font-bold text-slate-900">{activeStudent.motherName}</div>
                </div>
                <div>
                  <span className="text-slate-500">इयत्ता / तुकडी:</span>
                  <div className="font-bold text-slate-900">{classNameMap[selectedClass]} (अ)</div>
                </div>
                <div>
                  <span className="text-slate-500">हजेरी क्रमांक (Roll No):</span>
                  <div className="font-bold text-slate-900">{activeStudent.rollNo}</div>
                </div>
              </div>

              {/* Subject Wise Marks Table */}
              <div className="py-4">
                <h4 className="text-xs font-bold text-slate-800 mb-2">
                  १. शैक्षणिक विषय (Academic Subjects)
                </h4>
                <table className="w-full text-xs border-collapse border border-slate-400 text-center mb-4">
                  <thead>
                    <tr className="bg-slate-100 font-bold">
                      <th className="p-2 border border-slate-300 text-left">विषय (Subject)</th>
                      <th className="p-2 border border-slate-300 w-24">एकूण गुण (Max)</th>
                      <th className="p-2 border border-slate-300 w-28">प्राप्त गुण (Obtained)</th>
                      <th className="p-2 border border-slate-300 w-24">श्रेणी (Grade)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentSubjects.academic.map((sub) => {
                      const marks = activeStudent.academicMarks[sub.id] || 0;
                      const subPct = (marks / sub.maxMarks) * 100;
                      return (
                        <tr key={sub.id} className="hover:bg-slate-50">
                          <td className="p-2 border border-slate-300 text-left font-semibold">
                            {sub.name}
                          </td>
                          <td className="p-2 border border-slate-300">{sub.maxMarks}</td>
                          <td className="p-2 border border-slate-300 font-bold">{marks}</td>
                          <td className="p-2 border border-slate-300 font-semibold text-blue-700">
                            {subPct >= 80 ? 'A' : subPct >= 60 ? 'B' : subPct >= 40 ? 'C' : 'D'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <h4 className="text-xs font-bold text-slate-800 mb-2">
                  २. श्रेणी विषय (Grade Subjects - सहशालेय उपक्रम)
                </h4>
                <table className="w-full text-xs border-collapse border border-slate-400 text-center">
                  <thead>
                    <tr className="bg-amber-50 text-amber-950 font-bold">
                      <th className="p-2 border border-slate-300 text-left">श्रेणी विषय</th>
                      <th className="p-2 border border-slate-300 w-32">मिळालेली श्रेणी</th>
                      <th className="p-2 border border-slate-300">वर्णनात्मक शेरा</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentSubjects.graded.map((sub) => {
                      const grade = activeStudent.gradeMarks[sub.id] || 'A';
                      return (
                        <tr key={sub.id} className="hover:bg-slate-50">
                          <td className="p-2 border border-slate-300 text-left font-semibold">
                            {sub.name}
                          </td>
                          <td className="p-2 border border-slate-300 font-extrabold text-amber-800">
                            श्रेणी '{grade}'
                          </td>
                          <td className="p-2 border border-slate-300 text-left text-slate-600">
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

              {/* Total & Result Summary Box */}
              <div className="bg-slate-50 border border-slate-300 rounded-lg p-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-center my-4">
                <div>
                  <div className="text-slate-500 text-[11px]">एकूण प्राप्त गुण</div>
                  <div className="font-black text-slate-900 text-sm">
                    {activeStudent.totalObtained} / {activeStudent.totalMax}
                  </div>
                </div>
                <div>
                  <div className="text-slate-500 text-[11px]">टक्केवारी (Percentage)</div>
                  <div className="font-black text-slate-900 text-sm">
                    {activeStudent.percentage}%
                  </div>
                </div>
                <div>
                  <div className="text-slate-500 text-[11px]">अंतिम श्रेणी (Grade)</div>
                  <div className="font-black text-blue-700 text-sm">
                    {activeStudent.finalGrade}
                  </div>
                </div>
                <div>
                  <div className="text-slate-500 text-[11px]">अंतिम निकाल (Status)</div>
                  <div className="font-black text-emerald-700 text-sm">
                    {activeStudent.resultStatus}
                  </div>
                </div>
              </div>

              {/* Signatures */}
              <div className="pt-8 grid grid-cols-3 text-center text-xs font-bold text-slate-800">
                <div>
                  <p>पालकाची स्वाक्षरी</p>
                  <p className="mt-8 text-slate-400 font-normal">पालक स्वाक्षरी</p>
                </div>
                <div>
                  <p>वर्गशिक्षक स्वाक्षरी</p>
                  <p className="mt-8 text-slate-400 font-normal">वर्गशिक्षक</p>
                </div>
                <div>
                  <p>मुख्याध्यापक स्वाक्षरी व शिक्का</p>
                  <p className="mt-8 text-slate-900 font-semibold">
                    नामदार मुकुल वासनिक विद्यालय, आडोळ बु.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
