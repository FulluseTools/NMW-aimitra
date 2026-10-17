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
  const sampleNames = [
    { name: 'आरव विनोद ठोंबरे', mother: 'सुनिता', gender: 'मुला' as const },
    { name: 'प्रियांका ज्ञानेश्वर देशमुख', mother: 'मंगला', gender: 'मुलगी' as const },
    { name: 'आदित्य गजानन इंगळे', mother: 'संगीता', gender: 'मुला' as const },
    { name: 'स्नेहा गजानन वासनिक', mother: 'उषा', gender: 'मुलगी' as const },
    { name: 'रोहन प्रकाश साटोटे', mother: 'प्रतिभा', gender: 'मुला' as const },
    { name: 'अनिकेत भास्कर तायडे', mother: 'आशा', gender: 'मुला' as const },
    { name: 'वैष्णवी कैलास वाघ', mother: 'अनिता', gender: 'मुलगी' as const },
    { name: 'ओंकार सुरेश चव्हाण', mother: 'अलका', gender: 'मुला' as const },
    { name: 'दिशा विठ्ठल बावस्कर', mother: 'कमल', gender: 'मुलगी' as const },
    { name: 'मयूर गजानन काळे', mother: 'सुरेखा', gender: 'मुला' as const },
    { name: 'सलोनी ज्ञानेश्वर सोनोने', mother: 'शोभा', gender: 'मुलगी' as const },
    { name: 'करण गजानन मोरे', mother: 'जयश्री', gender: 'मुला' as const },
    { name: 'रुतुजा संतोष बावस्कर', mother: 'छाया', gender: 'मुलगी' as const },
    { name: 'गौरव प्रल्हाद मोरे', mother: 'शशिकला', gender: 'मुला' as const },
    { name: 'साक्षी विनायक घ्यारे', mother: 'सरस्वती', gender: 'मुलगी' as const },
  ];

  const { academic, graded } = getSubjectsForClass(classKey);

  const students: StudentMarks[] = [];
  const limit = Math.min(count, sampleNames.length);

  for (let i = 0; i < limit; i++) {
    const s = sampleNames[i];
    const academicMarks: Record<string, number> = {};
    const gradeMarks: Record<string, 'A' | 'B' | 'C' | 'D'> = {};

    academic.forEach((sub, subIdx) => {
      // Deterministic marks between 60% and 92%
      const basePercentage = 68 + ((i * 7 + subIdx * 5) % 27);
      academicMarks[sub.id] = Math.round((sub.maxMarks * basePercentage) / 100);
    });

    graded.forEach((sub, gIdx) => {
      const grades: ('A' | 'B' | 'C')[] = ['A', 'A', 'B'];
      gradeMarks[sub.id] = grades[(i + gIdx) % grades.length];
    });

    students.push({
      rollNo: i + 1,
      name: s.name,
      motherName: s.mother,
      gender: s.gender,
      academicMarks,
      gradeMarks,
    });
  }

  return students;
}
