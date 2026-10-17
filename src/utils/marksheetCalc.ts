export type SchoolGrade = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'D' | 'E';

export interface SubjectConfig {
  id: string;
  name: string;
  maxMarks: number;
  isGradeOnly?: boolean;
}

export interface StudentMarks {
  rollNo: number;
  name: string;
  motherName: string;
  gender: 'मुला' | 'मुलगी';
  academicMarks: Record<string, number>; // subjectId -> mark
  gradeMarks: Record<string, 'A' | 'B' | 'C' | 'D'>; // subjectId -> grade
}

export interface StudentCalculatedResult {
  rollNo: number;
  name: string;
  motherName: string;
  gender: 'मुला' | 'मुलगी';
  academicMarks: Record<string, number>;
  gradeMarks: Record<string, 'A' | 'B' | 'C' | 'D'>;
  totalObtained: number;
  totalMax: number;
  percentage: number;
  finalGrade: SchoolGrade;
  resultStatus: 'उत्तीर्ण' | 'अनुत्तीर्ण' | 'विशेष प्राविण्य' | 'प्रथम श्रेणी';
  hasPassedAll: boolean;
}

export const CLASS_SUBJECTS_MAP: Record<string, { academic: SubjectConfig[]; graded: SubjectConfig[] }> = {
  // Std 6th to 8th: मराठी, हिंदी, इंग्रजी, गणित, विज्ञान, इतिहास नागरीकशास्त्र, भूगोल. श्रेणी: आरोग्य व शारीरिक शिक्षण, कला, कार्यानुभव.
  std6: {
    academic: [
      { id: 'marathi', name: 'मराठी (प्रथम भाषा)', maxMarks: 100 },
      { id: 'hindi', name: 'हिंदी (द्वितीय भाषा)', maxMarks: 100 },
      { id: 'english', name: 'इंग्रजी (तृतीय भाषा)', maxMarks: 100 },
      { id: 'maths', name: 'गणित', maxMarks: 100 },
      { id: 'science', name: 'सामान्य विज्ञान', maxMarks: 100 },
      { id: 'history_civics', name: 'इतिहास व नागरिकशास्त्र', maxMarks: 60 },
      { id: 'geography', name: 'भूगोल', maxMarks: 40 },
    ],
    graded: [
      { id: 'pe', name: 'आरोग्य व शारीरिक शिक्षण', maxMarks: 0, isGradeOnly: true },
      { id: 'art', name: 'कला', maxMarks: 0, isGradeOnly: true },
      { id: 'work_exp', name: 'कार्यानुभव', maxMarks: 0, isGradeOnly: true },
    ],
  },
  std7: {
    academic: [
      { id: 'marathi', name: 'मराठी (प्रथम भाषा)', maxMarks: 100 },
      { id: 'hindi', name: 'हिंदी (द्वितीय भाषा)', maxMarks: 100 },
      { id: 'english', name: 'इंग्रजी (तृतीय भाषा)', maxMarks: 100 },
      { id: 'maths', name: 'गणित', maxMarks: 100 },
      { id: 'science', name: 'सामान्य विज्ञान', maxMarks: 100 },
      { id: 'history_civics', name: 'इतिहास व नागरिकशास्त्र', maxMarks: 60 },
      { id: 'geography', name: 'भूगोल', maxMarks: 40 },
    ],
    graded: [
      { id: 'pe', name: 'आरोग्य व शारीरिक शिक्षण', maxMarks: 0, isGradeOnly: true },
      { id: 'art', name: 'कला', maxMarks: 0, isGradeOnly: true },
      { id: 'work_exp', name: 'कार्यानुभव', maxMarks: 0, isGradeOnly: true },
    ],
  },
  std8: {
    academic: [
      { id: 'marathi', name: 'मराठी (प्रथम भाषा)', maxMarks: 100 },
      { id: 'hindi', name: 'हिंदी (द्वितीय भाषा)', maxMarks: 100 },
      { id: 'english', name: 'इंग्रजी (तृतीय भाषा)', maxMarks: 100 },
      { id: 'maths', name: 'गणित', maxMarks: 100 },
      { id: 'science', name: 'सामान्य विज्ञान', maxMarks: 100 },
      { id: 'history_civics', name: 'इतिहास व नागरिकशास्त्र', maxMarks: 60 },
      { id: 'geography', name: 'भूगोल', maxMarks: 40 },
    ],
    graded: [
      { id: 'pe', name: 'आरोग्य व शारीरिक शिक्षण', maxMarks: 0, isGradeOnly: true },
      { id: 'art', name: 'कला', maxMarks: 0, isGradeOnly: true },
      { id: 'work_exp', name: 'कार्यानुभव', maxMarks: 0, isGradeOnly: true },
    ],
  },
  // Std 9th to 10th: मराठी, हिंदी, इंग्रजी, गणित, विज्ञान, इतिहास, भूगोल. श्रेणी: आरोग्य व शारीरिक शिक्षण, संरक्षण शास्त्र, जलसुरक्षा.
  std9: {
    academic: [
      { id: 'marathi', name: 'मराठी', maxMarks: 100 },
      { id: 'hindi', name: 'हिंदी', maxMarks: 100 },
      { id: 'english', name: 'इंग्रजी', maxMarks: 100 },
      { id: 'maths', name: 'गणित (भाग १ व २)', maxMarks: 100 },
      { id: 'science', name: 'विज्ञान आणि तंत्रज्ञान', maxMarks: 100 },
      { id: 'history', name: 'इतिहास व राज्यशास्त्र', maxMarks: 60 },
      { id: 'geography', name: 'भूगोल', maxMarks: 40 },
    ],
    graded: [
      { id: 'pe', name: 'आरोग्य व शारीरिक शिक्षण', maxMarks: 0, isGradeOnly: true },
      { id: 'defense', name: 'संरक्षण शास्त्र', maxMarks: 0, isGradeOnly: true },
      { id: 'water_sec', name: 'जलसुरक्षा', maxMarks: 0, isGradeOnly: true },
    ],
  },
  std10: {
    academic: [
      { id: 'marathi', name: 'मराठी (प्रथम भाषा)', maxMarks: 100 },
      { id: 'hindi', name: 'हिंदी (द्वितीय भाषा)', maxMarks: 100 },
      { id: 'english', name: 'इंग्रजी (तृतीय भाषा)', maxMarks: 100 },
      { id: 'maths', name: 'गणित (भाग १ व २)', maxMarks: 100 },
      { id: 'science', name: 'विज्ञान आणि तंत्रज्ञान (भाग १ व २)', maxMarks: 100 },
      { id: 'history', name: 'इतिहास व राज्यशास्त्र', maxMarks: 60 },
      { id: 'geography', name: 'भूगोल', maxMarks: 40 },
    ],
    graded: [
      { id: 'pe', name: 'आरोग्य व शारीरिक शिक्षण', maxMarks: 0, isGradeOnly: true },
      { id: 'defense', name: 'संरक्षण शास्त्र', maxMarks: 0, isGradeOnly: true },
      { id: 'water_sec', name: 'जलसुरक्षा', maxMarks: 0, isGradeOnly: true },
    ],
  },
};

export function getSubjectsForClass(classKey: string) {
  return CLASS_SUBJECTS_MAP[classKey] || CLASS_SUBJECTS_MAP.std6;
}

export function calculateGrade(percentage: number): SchoolGrade {
  if (percentage >= 90) return 'A1';
  if (percentage >= 80) return 'A2';
  if (percentage >= 70) return 'B1';
  if (percentage >= 60) return 'B2';
  if (percentage >= 50) return 'C1';
  if (percentage >= 40) return 'C2';
  if (percentage >= 35) return 'D';
  return 'E';
}

export function calculateStudentResult(
  student: StudentMarks,
  classKey: string
): StudentCalculatedResult {
  const { academic } = getSubjectsForClass(classKey);

  let totalObtained = 0;
  let totalMax = 0;
  let hasPassedAll = true;

  for (const sub of academic) {
    const marks = student.academicMarks[sub.id] || 0;
    totalObtained += marks;
    totalMax += sub.maxMarks;
    const passingMark = Math.ceil(sub.maxMarks * 0.35);
    if (marks < passingMark) {
      hasPassedAll = false;
    }
  }

  const percentage = totalMax > 0 ? Number(((totalObtained / totalMax) * 100).toFixed(2)) : 0;
  const finalGrade = calculateGrade(percentage);

  let resultStatus: 'उत्तीर्ण' | 'अनुत्तीर्ण' | 'विशेष प्राविण्य' | 'प्रथम श्रेणी';
  if (!hasPassedAll || percentage < 35) {
    resultStatus = 'अनुत्तीर्ण';
  } else if (percentage >= 75) {
    resultStatus = 'विशेष प्राविण्य';
  } else if (percentage >= 60) {
    resultStatus = 'प्रथम श्रेणी';
  } else {
    resultStatus = 'उत्तीर्ण';
  }

  return {
    rollNo: student.rollNo,
    name: student.name,
    motherName: student.motherName,
    gender: student.gender,
    academicMarks: student.academicMarks,
    gradeMarks: student.gradeMarks,
    totalObtained,
    totalMax,
    percentage,
    finalGrade,
    resultStatus,
    hasPassedAll,
  };
}

export function generateSampleStudents(classKey: string, count: number = 10): StudentMarks[] {
  const firstNamesBoys = ['आरव', 'आदित्य', 'रोहन', 'अनिकेत', 'ओंकार', 'मयूर', 'करण', 'गौरव', 'सुमित', 'प्रणव', 'साहिल', 'ऋषिकेश', 'ओम', 'विशाल', 'तेजस', 'हर्षल', 'स्वप्निल', 'वैभव', 'अक्षय', 'योगेश', 'समीर', 'दीपक', 'अमोल', 'शुभम', 'चेतन'];
  const firstNamesGirls = ['प्रियांका', 'स्नेहा', 'वैष्णवी', 'दिशा', 'सलोनी', 'रुतुजा', 'साक्षी', 'पुनम', 'अंकिता', 'दीक्षा', 'कोमल', 'नेहा', 'प्राजक्ता', 'मयुरी', 'पायल', 'निकिता', 'अश्विनी', 'भाग्यश्री', 'शितल', 'पूनम', 'कावेरी', 'गायत्री', 'पल्लवी', 'श्रद्धा', 'तनुजा'];
  const middleNames = ['विनोद', 'ज्ञानेश्वर', 'गजानन', 'प्रकाश', 'भास्कर', 'कैलास', 'सुरेश', 'विठ्ठल', 'संतोष', 'प्रल्हाद', 'विनायक', 'अशोक', 'रमेश', 'दिलीप', 'संजय', 'अनिल', 'नामदेव', 'शंकर', 'चंद्रकांत', 'मधुकर'];
  const lastNames = ['ठोंबरे', 'देशमुख', 'इंगळे', 'वासनिक', 'साटोटे', 'तायडे', 'वाघ', 'चव्हाण', 'बावस्कर', 'काळे', 'सोनोने', 'मोरे', 'घ्यारे', 'पाटील', 'शिंदे', 'गायकवाड', 'कदम', 'जाधव', 'पवार', 'राऊत'];
  const motherNames = ['सुनिता', 'मंगला', 'संगीता', 'उषा', 'प्रतिभा', 'आशा', 'अनिता', 'अलका', 'कमल', 'सुरेखा', 'शोभा', 'जयश्री', 'छाया', 'शशिकला', 'सरस्वती', 'सुमन', 'विमल', 'लता', 'कुंदा', 'मीना'];

  const { academic, graded } = getSubjectsForClass(classKey);
  const students: StudentMarks[] = [];
  const targetCount = Math.max(1, Math.min(60, count));

  for (let i = 0; i < targetCount; i++) {
    const isGirl = i % 2 === 1;
    const fNames = isGirl ? firstNamesGirls : firstNamesBoys;
    const fName = fNames[i % fNames.length];
    const mName = middleNames[i % middleNames.length];
    const lName = lastNames[i % lastNames.length];
    const mother = motherNames[i % motherNames.length];
    const fullName = `${fName} ${mName} ${lName}`;

    const academicMarks: Record<string, number> = {};
    const gradeMarks: Record<string, 'A' | 'B' | 'C' | 'D'> = {};

    academic.forEach((sub, subIdx) => {
      // Realistic varied marks between 55% and 94%
      const basePercentage = 60 + ((i * 11 + subIdx * 7) % 33);
      academicMarks[sub.id] = Math.round((sub.maxMarks * basePercentage) / 100);
    });

    graded.forEach((sub, gIdx) => {
      const grades: ('A' | 'B' | 'C')[] = ['A', 'A', 'B', 'A', 'B'];
      gradeMarks[sub.id] = grades[(i * 2 + gIdx) % grades.length];
    });

    students.push({
      rollNo: i + 1,
      name: fullName,
      motherName: mother,
      gender: isGirl ? 'मुलगी' : 'मुला',
      academicMarks,
      gradeMarks,
    });
  }

  return students;
}
