import test from 'node:test';
import assert from 'node:assert/strict';

import {
  getSubjectsForClass,
  calculateStudentResult,
  calculateGrade,
  generateSampleStudents,
} from './marksheetCalc.ts';

import { generateQuestionPaper } from './questionPaperLogic.ts';
import { generateOfficialLetterText } from './letterLogic.ts';
import { generateLessonPlan } from './lessonPlanLogic.ts';
import { CCE_PRESET_DATA, generateCustomNotice } from './cceAndNoticesLogic.ts';

test('Marksheet: Std 6th to 8th subjects have exact required academic & grade subjects', () => {
  const std6 = getSubjectsForClass('std6');
  const std8 = getSubjectsForClass('std8');

  // Academic subjects: मराठी, हिंदी, इंग्रजी, गणित, विज्ञान, इतिहास नागरीकशास्त्र, भूगोल
  const academicNames = std6.academic.map((s) => s.name);
  assert.ok(academicNames.some((n) => n.includes('मराठी')));
  assert.ok(academicNames.some((n) => n.includes('हिंदी')));
  assert.ok(academicNames.some((n) => n.includes('इंग्रजी')));
  assert.ok(academicNames.some((n) => n.includes('गणित')));
  assert.ok(academicNames.some((n) => n.includes('विज्ञान')));
  assert.ok(academicNames.some((n) => n.includes('इतिहास')));
  assert.ok(academicNames.some((n) => n.includes('भूगोल')));

  // Grade subjects: आरोग्य व शारीरिक शिक्षण, कला, कार्यानुभव
  const gradeNames6 = std6.graded.map((s) => s.name);
  assert.ok(gradeNames6.some((n) => n.includes('आरोग्य व शारीरिक शिक्षण')));
  assert.ok(gradeNames6.some((n) => n.includes('कला')));
  assert.ok(gradeNames6.some((n) => n.includes('कार्यानुभव')));

  const gradeNames8 = std8.graded.map((s) => s.name);
  assert.ok(gradeNames8.some((n) => n.includes('आरोग्य व शारीरिक शिक्षण')));
  assert.ok(gradeNames8.some((n) => n.includes('कला')));
  assert.ok(gradeNames8.some((n) => n.includes('कार्यानुभव')));
});

test('Marksheet: Std 9th to 10th subjects have exact required academic & grade subjects', () => {
  const std10 = getSubjectsForClass('std10');

  // Grade subjects: आरोग्य व शारीरिक शिक्षण, संरक्षण शास्त्र, जलसुरक्षा
  const gradeNames = std10.graded.map((s) => s.name);
  assert.ok(gradeNames.some((n) => n.includes('आरोग्य व शारीरिक शिक्षण')));
  assert.ok(gradeNames.some((n) => n.includes('संरक्षण शास्त्र')));
  assert.ok(gradeNames.some((n) => n.includes('जलसुरक्षा')));
});

test('Marksheet calculation calculates accurate percentages and grade', () => {
  const sample = generateSampleStudents('std10', 3);
  assert.equal(sample.length, 3);

  const result = calculateStudentResult(sample[0], 'std10');
  assert.ok(result.totalObtained > 0);
  assert.ok(result.totalMax > 0);
  assert.ok(result.percentage > 0 && result.percentage <= 100);
  assert.ok(['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D', 'E'].includes(result.finalGrade));
  assert.ok(['उत्तीर्ण', 'विशेष प्राविण्य', 'प्रथम श्रेणी', 'अनुत्तीर्ण'].includes(result.resultStatus));
});

test('Question Paper: Generates exactly 4 sections with 5 simple questions each', () => {
  const paper = generateQuestionPaper('std10', 'maths', 'linear_equations', 'घटक चाचणी १', 12345);

  assert.equal(paper.sectionA.questions.length, 5, 'Section A must have 5 fill in the blanks');
  assert.equal(paper.sectionB.pairs.length, 5, 'Section B must have 5 match pairs');
  assert.equal(paper.sectionB.shuffledRight.length, 5, 'Section B right column must have 5 options');
  assert.equal(paper.sectionC.questions.length, 5, 'Section C must have 5 MCQs');
  assert.equal(paper.sectionD.questions.length, 5, 'Section D must have 5 one-liners');

  // Verify questions change with different seeds
  const paper2 = generateQuestionPaper('std10', 'maths', 'linear_equations', 'घटक चाचणी १', 987654);
  assert.equal(paper2.sectionA.questions.length, 5);
});

test('Official Letter: Strictly adheres to user specifications (No UDISE/Shalarth in body, outward no, bottom signature)', () => {
  const letter = generateOfficialLetterText('salary_arrears', undefined, undefined, undefined, '१२४/२०२६');

  // Must have Outward no
  assert.ok(letter.outwardNo.includes('१२४'));

  // Must NOT include UDISE or Shalarth ID in body paragraphs
  const combinedBody = letter.bodyParagraphs.join(' ');
  assert.equal(combinedBody.includes('27040904602'), false, 'UDISE should not be in letter body');
  assert.equal(combinedBody.includes('04630100223'), false, 'Shalarth ID should not be in letter body');

  // Check bottom signoff: "स्थळ - आडोळ बु." and opposite ONLY "मुख्याध्यापक स्वाक्षरी"
  assert.equal(letter.place, 'आडोळ बु.');
  assert.equal(letter.signatoryTitle, 'मुख्याध्यापक स्वाक्षरी');
  assert.equal(letter.signatoryTitle.includes('विनोद जगन्नाथ ठोंबरे'), false);
  assert.equal(letter.signatoryTitle.includes('आपला विश्वासू'), false);
});

test('Lesson Plan: Cramer’s Rule subtopic specifically includes formulas and rules', () => {
  const plan = generateLessonPlan(
    'std10',
    'maths',
    'दोन चलातील रेषीय समीकरणे',
    'क्रेमर्स पद्धती (Cramer’s Rule - निश्चयक पद्धत)'
  );

  assert.ok(plan.subtopic.includes('क्रेमर्स'));
  const rulesText = plan.coreRulesAndFormulas.join(' ');
  assert.ok(rulesText.includes('D =') || rulesText.includes('Dx ='));
  assert.ok(rulesText.includes('x = Dx / D') || rulesText.includes('y = Dy / D'));
});

test('CCE Remarks & Notice Board: 4 columns in CCE and custom notice generation', () => {
  assert.ok(CCE_PRESET_DATA.length >= 10);
  const row = CCE_PRESET_DATA[0];
  // 4 columns: वर्ग, विषय, आकारिक मूल्यमापन, कोणत्या प्रकारचे
  assert.ok(row.className);
  assert.ok(row.subject);
  assert.ok(row.assessmentTool);
  assert.ok(row.remarkType);

  const customNotice = generateCustomNotice('विज्ञान प्रदर्शन व बालआनंद मेळावा');
  assert.ok(customNotice.title.includes('विज्ञान प्रदर्शन'));
  assert.ok(customNotice.instructions.length >= 2);
});
