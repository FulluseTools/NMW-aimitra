export interface QuestionItem {
  id: string;
  question: string;
  options?: string[]; // for MCQ (वस्तुनिष्ठ)
  correctAnswer: string;
  subtopic?: string;
}

export interface MatchPair {
  id: string;
  left: string;
  right: string;
}

export interface QuestionPaperSectionA {
  title: string;
  marks: number;
  instructions: string;
  questions: QuestionItem[]; // 5 questions
}

export interface QuestionPaperSectionB {
  title: string;
  marks: number;
  instructions: string;
  pairs: MatchPair[]; // 5 pairs
  shuffledRight: string[]; // 5 shuffled options for column B
}

export interface QuestionPaperSectionC {
  title: string;
  marks: number;
  instructions: string;
  questions: QuestionItem[]; // 5 questions with 4 options each
}

export interface QuestionPaperSectionD {
  title: string;
  marks: number;
  instructions: string;
  questions: QuestionItem[]; // 5 questions
}

export interface CompleteQuestionPaper {
  id: string;
  schoolName: string;
  examTitle: string;
  standard: string;
  subject: string;
  unitName: string;
  totalMarks: number;
  timeAllowed: string;
  generatedDate: string;
  sectionA: QuestionPaperSectionA;
  sectionB: QuestionPaperSectionB;
  sectionC: QuestionPaperSectionC;
  sectionD: QuestionPaperSectionD;
}

// Question Bank for Maharashtra Board Std 6 to 10
export interface QuestionBankData {
  blanks: QuestionItem[];
  matches: MatchPair[];
  mcqs: QuestionItem[];
  oneLiners: QuestionItem[];
}

export const QUESTION_BANKS: Record<string, Record<string, QuestionBankData>> = {
  // Std 10 Maths (दोन चलातील रेषीय समीकरणे, अंकगणिती श्रेढी, वर्गसमीकरणे)
  std10_maths: {
    linear_equations: {
      blanks: [
        { id: 'b1', question: 'ax + by + c = 0 हे दोन चलातील रेषीय समीकरणाचे _____ रूप आहे.', correctAnswer: 'सामान्य (Standard)' },
        { id: 'b2', question: 'क्रेमर्सच्या पद्धतीमध्ये चल x ची किंमत काढण्याचे सूत्र x = _____ आहे.', correctAnswer: 'Dx / D' },
        { id: 'b3', question: 'क्रेमर्सच्या पद्धतीमध्ये निश्चयक D = ० असल्यास समीकरणांना _____ उकल नसते.', correctAnswer: 'अनन्य (एकमेव)' },
        { id: 'b4', question: '३x + ५y = ९ या समीकरणात x = १ असल्यास y = _____ असेल.', correctAnswer: '१.२ (किंवा ६/५)' },
        { id: 'b5', question: 'निश्चयक |२ ३; ४ ५| चे मूल्य २ × ५ - ३ × ४ = _____ येते.', correctAnswer: '-२' },
        { id: 'b6', question: 'दोन चलातील रेषीय समीकरणाचा आलेख नेहमी एक _____ रेषा असतो.', correctAnswer: 'सरळ' },
        { id: 'b7', question: 'चल y ची किंमत काढण्यासाठी क्रेमर्स सूत्र y = _____ हे वापरतात.', correctAnswer: 'Dy / D' },
        { id: 'b8', question: '४x + ३y = ११ मध्ये दोन्ही चलांची कोटी प्रत्येकी _____ असते.', correctAnswer: '१ (एक)' },
      ],
      matches: [
        { id: 'm1', left: 'निश्चयक पद्धती (क्रेमर्स रूल)', right: 'गॅब्रिएल क्रेमर' },
        { id: 'm2', left: 'दोन चलातील रेषीय समीकरण कोटी', right: '१ (एक)' },
        { id: 'm3', left: 'x ची किंमत (Cramer)', right: 'Dx / D' },
        { id: 'm4', left: 'y ची किंमत (Cramer)', right: 'Dy / D' },
        { id: 'm5', left: 'आलेखाचे स्वरूप', right: 'सरळ रेषा' },
        { id: 'm6', left: 'D = 0 आणि Dx ≠ 0', right: 'उकल अस्तित्वात नाही' },
        { id: 'm7', left: 'निश्चयकाची कोटी', right: '२ (दोन स्तंभ व दोन ओळी)' },
      ],
      mcqs: [
        {
          id: 'c1',
          question: '४x + ५y = १९ या समीकरणात x = १ असल्यास y ची किंमत किती?',
          options: ['३', '४', '५', '२'],
          correctAnswer: '३'
        },
        {
          id: 'c2',
          question: 'निश्चयक |३ २; ४ ५| चे मूल्य किती?',
          options: ['७', '-७', '२३', '१५'],
          correctAnswer: '७'
        },
        {
          id: 'c3',
          question: 'क्रेमर्सच्या पद्धतीत Dx = २५ आणि D = ५ असल्यास x ची किंमत किती?',
          options: ['५', '२०', '१२५', '०'],
          correctAnswer: '५'
        },
        {
          id: 'c4',
          question: 'पुढीलपैकी कोणते समीकरण दोन चलातील रेषीय समीकरण आहे?',
          options: ['२x + ५y = १०', 'x² + y = ७', 'xy + ५ = ८', '३/x + ४/y = २'],
          correctAnswer: '२x + ५y = १०'
        },
        {
          id: 'c5',
          question: 'क्रेमर्सच्या नियमानुसार y = ?',
          options: ['Dy / D', 'Dx / D', 'D / Dy', 'Dx / Dy'],
          correctAnswer: 'Dy / D'
        },
        {
          id: 'c6',
          question: '३x - २y = ६ या समीकरणाचा आलेख काढण्यासाठी x = ० असताना y = ?',
          options: ['-३', '३', '२', '-२'],
          correctAnswer: '-३'
        },
      ],
      oneLiners: [
        { id: 'd1', question: 'दोन चलातील रेषीय समीकरणाचे सामान्य रूप लिहा.', correctAnswer: 'ax + by + c = 0 (येथे a, b, c वास्तव संख्या आणि a, b एकाच वेळी शून्य नसतात)' },
        { id: 'd2', question: 'क्रेमर्सच्या पद्धतीमध्ये D ची किंमत काढताना कोणते सहगुणक घेतात?', correctAnswer: 'x आणि y या दोन्ही चलांचे सहगुणक (a1, a2 आणि b1, b2)' },
        { id: 'd3', question: 'दोन चलातील रेषीय समीकरणातील प्रत्येक पदातील चलाची सर्वोच्च कोटी किती असते?', correctAnswer: 'प्रत्येक चलाची सर्वोच्च कोटी १ असते.' },
        { id: 'd4', question: 'निश्चयक पद्धती कोणत्या स्विस गणितज्ञाने शोधून काढली?', correctAnswer: 'गॅब्रिएल क्रेमर (Gabriel Cramer)' },
        { id: 'd5', question: 'जर D = ० असेल तर क्रेमर्स पद्धतीने उकल का काढता येत नाही?', correctAnswer: 'कारण शून्याने भागणे गणितीयदृष्ट्या अनिर्धारित असते.' },
        { id: 'd6', question: 'एकसामयिक समीकरणे म्हणजे काय?', correctAnswer: 'जेव्हा दोन चलांमधील दोन रेषीय समीकरणांचा एकाच वेळी विचार केला जातो तेव्हा त्यांना एकसामयिक समीकरणे म्हणतात.' },
      ],
    },
  },

  // Std 10 Science (विज्ञान व तंत्रज्ञान - गुरुत्वाकर्षण, मूलद्रव्यांचे आवर्ती वर्गीकरण)
  std10_science: {
    gravitation: {
      blanks: [
        { id: 'b1', question: 'न्यूटनचा वैश्विक गुरुत्वाकर्षणाचा सिद्धांत _____ बलावर आधारित आहे.', correctAnswer: 'गुरुत्वीय (Gravitational)' },
        { id: 'b2', question: 'पृथ्वीच्या पृष्ठभागावर गुरुत्वीय प्रवेग (g) चे सरासरी मूल्य _____ m/s² असते.', correctAnswer: '९.८' },
        { id: 'b3', question: 'वस्तूचे वस्तुमान सर्व ठिकाणी _____ राहते.', correctAnswer: 'स्थिर / सारखे' },
        { id: 'b4', question: 'चंद्रावरील गुरुत्वीय प्रवेग हा पृथ्वीच्या प्रवेगाच्या _____ पट असतो.', correctAnswer: '१/६' },
        { id: 'b5', question: 'गुरुत्वीय स्थिरांक (G) चे SI पद्धतीतील एकक _____ आहे.', correctAnswer: 'N m²/kg²' },
        { id: 'b6', question: 'पृथ्वीचे वस्तुमान केंद्र पृथ्वीच्या _____ असते.', correctAnswer: 'केंद्रावर' },
      ],
      matches: [
        { id: 'm1', left: 'गुरुत्वीय स्थिरांक (G)', right: '६.६७ × १०⁻¹¹ N m²/kg²' },
        { id: 'm2', left: 'पृथ्वीच्या पृष्ठभागावरील g', right: '९.८ m/s²' },
        { id: 'm3', left: 'केप्लरचा पहिला नियम', right: 'ग्रहांची कक्षा लंबवर्तुळाकार असते' },
        { id: 'm4', left: 'मुक्ती वेग (Escape Velocity)', right: '११.२ km/s' },
        { id: 'm5', left: 'वस्तुमान', right: 'अदिश राशी (SI एकक: kg)' },
      ],
      mcqs: [
        {
          id: 'c1',
          question: 'पृथ्वीच्या केंद्राशी गुरुत्वीय प्रवेग (g) चे मूल्य किती असते?',
          options: ['० m/s²', '९.८ m/s²', '४.९ m/s²', 'अनंत'],
          correctAnswer: '० m/s²'
        },
        {
          id: 'c2',
          question: 'केप्लरच्या तिसऱ्या नियमानुसार T² हे कशाच्या समप्रमाणात असते?',
          options: ['r³', 'r²', 'r', '१/r³'],
          correctAnswer: 'r³'
        },
        {
          id: 'c3',
          question: 'वजन मोजण्याचे SI एकक कोणते आहे?',
          options: ['न्यूटन (N)', 'किलोग्रॅम (kg)', 'ज्यूल (J)', 'पास्कल (Pa)'],
          correctAnswer: 'न्यूटन (N)'
        },
        {
          id: 'c4',
          question: 'पृथ्वीवरून सोडलेल्या वस्तूचा मुक्ती वेग (Escape Velocity) किती असतो?',
          options: ['११.२ km/s', '९.८ km/s', '१.६ km/s', '२५ km/s'],
          correctAnswer: '११.२ km/s'
        },
        {
          id: 'c5',
          question: 'दोन वस्तूंमधील अंतर दुप्पट केल्यास गुरुत्वीय बल किती पट होईल?',
          options: ['१/४ पट', '१/२ पट', 'दुप्पट', 'चौपट'],
          correctAnswer: '१/४ पट'
        },
      ],
      oneLiners: [
        { id: 'd1', question: 'न्यूटनचा वैश्विक गुरुत्वाकर्षणाचा नियम सांगा.', correctAnswer: 'विश्वातील प्रत्येक वस्तू इतर वस्तूला विशिष्ट बलाने आकर्षित करते; हे बल वस्तूंच्या वस्तुमानांच्या गुणाकाराशी समप्रमाणात आणि अंतराच्या वर्गाशी व्यस्त प्रमाणात असते.' },
        { id: 'd2', question: 'मुक्त पतन (Free Fall) म्हणजे काय?', correctAnswer: 'जेव्हा एखादी वस्तू केवळ गुरुत्वीय बलाच्या प्रभावाने खाली पडत असते, तेव्हा त्या गतीला मुक्त पतन म्हणतात.' },
        { id: 'd3', question: 'वस्तुमान आणि वजन यातील मुख्य फरक कोणता?', correctAnswer: 'वस्तुमान हे द्रव्याचे प्रमाण असून स्थिर असते; तर वजन हे त्या वस्तूवरील गुरुत्वीय बल असून ठिकाणानुसार बदलते.' },
        { id: 'd4', question: 'पृथ्वीच्या ध्रुवावर g चे मूल्य विषुववृत्तापेक्षा जास्त का असते?', correctAnswer: 'ध्रुवावर पृथ्वी चपटी असल्याने केंद्रकापासूनचे अंतर कमी असते, त्यामुळे ध्रुवावर g चे मूल्य सर्वाधिक (९.८३ m/s²) असते.' },
        { id: 'd5', question: 'अभिकेंद्री बल (Centripetal Force) म्हणजे काय?', correctAnswer: 'वर्तुळाकार कक्षेत फिरणाऱ्या वस्तूवर वर्तुळाच्या केंद्राच्या दिशेने प्रयुक्त होणाऱ्या बलास अभिकेंद्री बल म्हणतात.' },
      ],
    },
  },

  // Std 8 Maths (समांतर रेषा व छेदिका, घातांक व घनमूळ)
  std8_maths: {
    parallel_lines: {
      blanks: [
        { id: 'b1', question: 'एकाच प्रतलात असणाऱ्या आणि एकमेकींना न छेदणाऱ्या रेषांना _____ रेषा म्हणतात.', correctAnswer: 'समांतर' },
        { id: 'b2', question: 'दोन समांतर रेषांना एका छेदिकेने छेदले असता संगत कोणांच्या जोड्या _____ असतात.', correctAnswer: 'एकसमान (एकजीव)' },
        { id: 'b3', question: 'आंतरकोनांच्या मापांची बेरीज नेहमी _____ अंश असते.', correctAnswer: '१८०°' },
        { id: 'b4', question: 'व्युत्क्रम कोनांच्या जोड्या परस्परांशी _____ असतात.', correctAnswer: 'समान मापाच्या' },
        { id: 'b5', question: 'छेदिकेमुळे एकूण _____ कोन तयार होतात.', correctAnswer: '८ (आठ)' },
      ],
      matches: [
        { id: 'm1', left: 'संगत कोन', right: 'मापे समान असतात' },
        { id: 'm2', left: 'व्युत्क्रम कोन (Z आकार)', right: 'मापे एकरूप असतात' },
        { id: 'm3', left: 'आंतरकोन (C आकार)', right: 'बेरीज १८०° (पूरक कोन)' },
        { id: 'm4', left: 'रेशीय जोडीतील कोन', right: 'बेरीज १८०°' },
        { id: 'm5', left: 'विरुद्ध कोन (X आकार)', right: 'परस्पर एकरूप' },
      ],
      mcqs: [
        {
          id: 'c1',
          question: 'दोन समांतर रेषांना छेदिकेने छेदल्यावर अंतरकोनांची बेरीज किती असते?',
          options: ['१८०°', '९०°', '३६०°', '१००°'],
          correctAnswer: '१८०°'
        },
        {
          id: 'c2',
          question: 'जर एका संगत कोनाचे माप ७०° असेल तर दुसऱ्या संगत कोनाचे माप किती असेल?',
          options: ['७०°', '११०°', '२०°', '१८०°'],
          correctAnswer: '७०°'
        },
        {
          id: 'c3',
          question: 'छेदिकेच्या एकाच बाजूला असणाऱ्या अंतरकोनांपैकी एक ५०° असल्यास दुसरा किती असेल?',
          options: ['१३०°', '५०°', '४०°', '१५०°'],
          correctAnswer: '१३०°'
        },
        {
          id: 'c4',
          question: 'छेदिकेमुळे तयार होणाऱ्या संगत कोनांच्या एकूण किती जोड्या असतात?',
          options: ['४', '२', '८', '६'],
          correctAnswer: '४'
        },
        {
          id: 'c5',
          question: 'एका रेषीय जोडीतील कोनाचे माप १००° असल्यास दुसऱ्या कोनाचे माप किती?',
          options: ['८०°', '१००°', '९०°', '२६०°'],
          correctAnswer: '८०°'
        },
      ],
      oneLiners: [
        { id: 'd1', question: 'समांतर रेषांची व्याख्या लिहा.', correctAnswer: 'एकाच प्रतलात असणाऱ्या आणि एकमेकींना कधीही न छेदणाऱ्या रेषांना समांतर रेषा म्हणतात.' },
        { id: 'd2', question: 'छेदिका म्हणजे काय?', correctAnswer: 'जर एखादी रेषा दिलेल्या दोन रेषांना दोन भिन्न बिंदूंत छेदत असेल तर त्या रेषेला छेदिका म्हणतात.' },
        { id: 'd3', question: 'व्युत्क्रम कोनांचे दोन प्रकार कोणते?', correctAnswer: 'आंतरव्युत्क्रम कोन आणि बाह्यव्युत्क्रम कोन.' },
        { id: 'd4', question: 'दोन रेषा समांतर असण्याची आंतरकोन कसोटी काय आहे?', correctAnswer: 'छेदिकेच्या एकाच बाजूच्या आंतरकोनांची बेरीज १८०° असल्यास त्या रेषा समांतर असतात.' },
        { id: 'd5', question: 'छेदिकेमुळे संगत कोनांच्या किती जोड्या तयार होतात?', correctAnswer: 'संगत कोनांच्या एकूण ४ जोड्या तयार होतात.' },
      ],
    },
  },

  // Std 6 Science (नैसर्गिक संसाधने - हवा, पाणी आणि जमीन)
  std6_science: {
    natural_resources: {
      blanks: [
        { id: 'b1', question: 'हवेमध्ये नायट्रोजन वायूचे प्रमाण सुमारे _____ टक्के असते.', correctAnswer: '७८' },
        { id: 'b2', question: 'सजीवांना श्वासोच्छ्वासासाठी हवेतील _____ वायूची आवश्यकता असते.', correctAnswer: 'ऑक्सिजन' },
        { id: 'b3', question: 'पृथ्वीच्या पृष्ठभागाचा सुमारे _____ टक्के भाग पाण्याने व्यापलेला आहे.', correctAnswer: '७१' },
        { id: 'b4', question: 'ओझोनचा थर सूर्यापासून येणारी घातक _____ किरणे शोषून घेतो.', correctAnswer: 'अतिनील (Ultra-violet)' },
        { id: 'b5', question: 'परिपक्व जमिनीचा वरचा थर _____ या सुपीक मातीचा असतो.', correctAnswer: 'ह्युमस (कुथित मृदा)' },
      ],
      matches: [
        { id: 'm1', left: 'नायट्रोजन वायू', right: 'प्रथिनांची निर्मिती (७८%)' },
        { id: 'm2', left: 'ऑक्सिजन वायू', right: 'श्वसन व ज्वलन (२१%)' },
        { id: 'm3', left: 'कार्बन डायऑक्साइड', right: 'वनस्पतींचे अन्न तयार करणे' },
        { id: 'm4', left: 'ओझोन वायू (O₃)', right: 'संरक्षक कवच' },
        { id: 'm5', left: 'पिण्यायोग्य गोडे पाणी', right: '०.३ टक्के' },
      ],
      mcqs: [
        {
          id: 'c1',
          question: 'पृथ्वीच्या वातावरणात सर्वाधिक प्रमाणात कोणता वायू आढळतो?',
          options: ['नायट्रोजन', 'ऑक्सिजन', 'आर्गॉन', 'कार्बन डायऑक्साइड'],
          correctAnswer: 'नायट्रोजन'
        },
        {
          id: 'c2',
          question: 'जागतिक ओझोन संरक्षण दिन केव्हा साजरा केला जातो?',
          options: ['१६ सप्टेंबर', '५ जून', '२२ मार्च', '२८ फेब्रुवारी'],
          correctAnswer: '१६ सप्टेंबर'
        },
        {
          id: 'c3',
          question: 'जमिनीवर २.५ सेमी जाडीचा मृदेचा थर तयार होण्यासाठी सुमारे किती वर्षे लागतात?',
          options: ['हजार वर्षे', '१० वर्षे', '१०० वर्षे', '५० वर्षे'],
          correctAnswer: 'हजार वर्षे'
        },
        {
          id: 'c4',
          question: 'अग्निशामक नळकांड्यांमध्ये कोणता वायू वापरतात?',
          options: ['कार्बन डायऑक्साइड', 'ऑक्सिजन', 'नायट्रोजन', 'हायड्रोजन'],
          correctAnswer: 'कार्बन डायऑक्साइड'
        },
        {
          id: 'c5',
          question: 'पृथ्वीवर पिण्यासाठी उपलब्ध असणारे गोडे पाणी किती टक्के आहे?',
          options: ['०.३%', '२.७%', '७१%', '२९%'],
          correctAnswer: '०.३%'
        },
      ],
      oneLiners: [
        { id: 'd1', question: 'नैसर्गिक संसाधने म्हणजे काय?', correctAnswer: 'निसर्गातून मिळणारे आणि सजीवांच्या गरजा पूर्ण करणारे घटक म्हणजे नैसर्गिक संसाधने होत.' },
        { id: 'd2', question: 'जीवावरण कशास म्हणतात?', correctAnswer: 'शिलावरण, जलावरण आणि वातावरणातील सजीव व त्यांनी व्यापलेल्या भागास जीवावरण म्हणतात.' },
        { id: 'd3', question: 'ओझोन वायूचा थर पृथ्वीसाठी संरक्षक कवच का मानला जातो?', correctAnswer: 'कारण तो सूर्यापासून निघणारी घातक अतिनील किरणे स्वतःमध्ये शोषून घेतो.' },
        { id: 'd4', question: 'मृदा निर्मितीमध्ये कोणकोणत्या घटकांचा सहभाग असतो?', correctAnswer: 'मूळ खडक, हवामान, जैविक घटक, जमिनीचा उतार आणि कालावधी यांचा सहभाग असतो.' },
        { id: 'd5', question: 'पाण्याचा काटकसरीने वापर करण्याचे दोन सोपे नियम सांगा.', correctAnswer: 'पाणी वाया न घालवणे आणि पाण्याचा पुनर्वापर करणे.' },
      ],
    },
  },

  // Std 7 Marathi (गोपाळचे शौर्य, स्वप्न विकणारा माणूस)
  std7_marathi: {
    gopal_shaurya: {
      blanks: [
        { id: 'b1', question: 'गोपाळ हा _____ आश्रमशाळेत शिकणारा हुशार मुलगा होता.', correctAnswer: 'कर्णावती' },
        { id: 'b2', question: 'डोंगरावर अचानक लागलेल्या आगीला _____ म्हणतात.', correctAnswer: 'वणवा' },
        { id: 'b3', question: 'गोपाळने आग विझवण्यासाठी जवळच्या नदीतील पाण्याचा _____ वापरला.', correctAnswer: 'रबरी पाईप' },
        { id: 'b4', question: 'गोपाळच्या धाडसाचे कौतुक सर्वांनी _____ वाजवून केले.', correctAnswer: 'टाळ्या' },
        { id: 'b5', question: 'अशक्य वाटणारी गोष्ट प्रयत्नांनी _____ करता येते.', correctAnswer: 'शक्य' },
      ],
      matches: [
        { id: 'm1', left: 'वणवा', right: 'डोंगरावरील मोठी आग' },
        { id: 'm2', left: 'शौर्य', right: 'धाडस / पराक्रम' },
        { id: 'm3', left: 'निसर्गरम्य परिसर', right: 'हिरवेगार डोंगर' },
        { id: 'm4', left: 'शाळेची सहल', right: 'आश्रमशाळेतील विद्यार्थी' },
        { id: 'm5', left: 'प्रशंसा', right: 'कौतुक करणे' },
      ],
      mcqs: [
        {
          id: 'c1',
          question: 'डोंगरावर लागलेला वणवा विझवण्यासाठी कोणी पुढाकार घेतला?',
          options: ['गोपाळने', 'शिक्षकांनी', 'चालकाने', 'ग्रामस्थांनी'],
          correctAnswer: 'गोपाळने'
        },
        {
          id: 'c2',
          question: 'गोपाळच्या स्वभावाचे कोणते वैशिष्ट्य पाठातून दिसून येते?',
          options: ['समयसूचकता व शौर्य', 'आळशीपणा', 'घाबरटपणा', 'रागीटपणा'],
          correctAnswer: 'समयसूचकता व शौर्य'
        },
        {
          id: 'c3',
          question: '‘वणवा’ या शब्दाचा योग्य अर्थ कोणता?',
          options: ['मोठी आग', 'नदीचा पूर', 'वादळ', 'भूकंप'],
          correctAnswer: 'मोठी आग'
        },
        {
          id: 'c4',
          question: 'गोपाळने आग विझवण्यासाठी कशाचा वापर केला?',
          options: ['शेतातील पाण्याचा पाईप', 'माती', 'झाडांच्या फांद्या', 'फायर ब्रिगेड'],
          correctAnswer: 'शेतातील पाण्याचा पाईप'
        },
        {
          id: 'c5',
          question: 'या पाठातून विद्यार्थ्यांना कोणती प्रेरणा मिळते?',
          options: ['संकटात न डगमगता मदत करणे', 'पळून जाणे', 'गप्प बसणे', 'दुर्लक्ष करणे'],
          correctAnswer: 'संकटात न डगमगता मदत करणे'
        },
      ],
      oneLiners: [
        { id: 'd1', question: 'गोपाळने वणवा पाहून शिक्षकांना गाडी थांबवायला का सांगितले?', correctAnswer: 'डोंगरावरील जनावरे आणि झाडे आगीत होरपळून जाऊ नयेत म्हणून गाडी थांबवली.' },
        { id: 'd2', question: 'वणवा विझवण्यासाठी गोपाळला कोणी मदत केली?', correctAnswer: 'स्थानिक गुराखी, गावकरी आणि नंतर आलेले इतर शिक्षक व मित्र यांनी मदत केली.' },
        { id: 'd3', question: '‘होरपळणे’ या शब्दाचा अर्थ काय?', correctAnswer: 'आगीच्या झळा लागून जळणे किंवा भाजणे.' },
        { id: 'd4', question: 'गोपाळ कोणत्या शाळेत शिकत होता?', correctAnswer: 'गोपाळ कर्णावती येथील आश्रमशाळेत शिकत होता.' },
        { id: 'd5', question: 'या पाठाचे लेखक कोण आहेत?', correctAnswer: 'लक्ष्मीकांत देशमुख.' },
      ],
    },
  },
};

// Utility to shuffle an array deterministically or with random seed
function shuffleArray<T>(array: T[], seed: number = Date.now()): T[] {
  const arr = [...array];
  let m = arr.length;
  let s = seed;
  while (m) {
    s = (s * 9301 + 49297) % 233280;
    const i = Math.floor((s / 233280) * m--);
    const t = arr[m];
    arr[m] = arr[i];
    arr[i] = t;
  }
  return arr;
}

export function generateQuestionPaper(
  standard: string, // 'std6' | 'std7' | 'std8' | 'std9' | 'std10'
  subject: string,  // 'maths' | 'science' | 'marathi' | 'history' | etc.
  unitKey: string = '',
  examTitle: string = 'घटक चाचणी परीक्षा क्र. १',
  seed: number = Date.now()
): CompleteQuestionPaper {
  // Find matching bank or fall back intelligently
  const key = `${standard}_${subject}`;
  let bank = QUESTION_BANKS[key]?.[unitKey];
  if (!bank) {
    // Pick first available in that subject/class, or fallback to std10_maths
    const firstGroup = QUESTION_BANKS[key] || QUESTION_BANKS['std10_maths'];
    const firstUnitKey = Object.keys(firstGroup)[0];
    bank = firstGroup[firstUnitKey];
  }

  // Pick exactly 5 items for each section, shuffled using the seed to ensure NO duplicates and FRESH questions
  const shuffledBlanks = shuffleArray(bank.blanks, seed).slice(0, 5);
  const shuffledMatches = shuffleArray(bank.matches, seed + 101).slice(0, 5);
  const shuffledMcqs = shuffleArray(bank.mcqs, seed + 202).slice(0, 5);
  const shuffledOneLiners = shuffleArray(bank.oneLiners, seed + 303).slice(0, 5);

  // For Section B (जोड्या जुळवा), shuffle the right column so student has to match
  const shuffledRightColumn = shuffleArray(shuffledMatches.map((m) => m.right), seed + 404);

  const stdNameMap: Record<string, string> = {
    std6: 'इयत्ता ६ वी',
    std7: 'इयत्ता ७ वी',
    std8: 'इयत्ता ८ वी',
    std9: 'इयत्ता ९ वी',
    std10: 'इयत्ता १० वी',
  };

  const subjectNameMap: Record<string, string> = {
    maths: 'गणित',
    science: 'विज्ञान व तंत्रज्ञान',
    marathi: 'मराठी',
    english: 'इंग्रजी',
    hindi: 'हिंदी',
    history: 'इतिहास व नागरिकशास्त्र/भूगोल',
  };

  return {
    id: `qp_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    schoolName: 'नामदार मुकुल वासनिक विद्यालय, आडोळ बु.',
    examTitle,
    standard: stdNameMap[standard] || 'इयत्ता १० वी',
    subject: subjectNameMap[subject] || 'गणित',
    unitName: unitKey || 'नियोजित अभ्यासक्रम घटक',
    totalMarks: 20,
    timeAllowed: '१ तास',
    generatedDate: new Date().toLocaleDateString('mr-IN'),
    sectionA: {
      title: 'प्रश्न १ (A) रिकाम्या जागा भरा.',
      marks: 5,
      instructions: 'कंसात दिलेले योग्य शब्द निवडून रिकाम्या जागा भरा. (प्रत्येकी १ गुण)',
      questions: shuffledBlanks,
    },
    sectionB: {
      title: 'प्रश्न २ (B) योग्य जोड्या जुळवा.',
      marks: 5,
      instructions: "गट 'अ' आणि गट 'ब' यांच्या योग्य जोड्या जुळवा. (प्रत्येकी १ गुण)",
      pairs: shuffledMatches,
      shuffledRight: shuffledRightColumn,
    },
    sectionC: {
      title: 'प्रश्न ३ (C) वस्तुनिष्ठ बहुपर्यायी प्रश्न (योग्य पर्याय निवडा).',
      marks: 5,
      instructions: 'खालील प्रश्नांसाठी दिलेल्या चार पर्यायांपैकी योग्य पर्यायाचे वर्णाक्षर निवडा. (प्रत्येकी १ गुण)',
      questions: shuffledMcqs,
    },
    sectionD: {
      title: 'प्रश्न ४ (D) एका वाक्यात उत्तरे द्या.',
      marks: 5,
      instructions: 'खालील प्रश्नांची उत्तरे एका वाक्यात स्पष्टपणे लिहा. (प्रत्येकी १ गुण)',
      questions: shuffledOneLiners,
    },
  };
}
