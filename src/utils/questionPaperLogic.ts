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

export interface QuestionBankData {
  blanks: QuestionItem[];
  matches: MatchPair[];
  mcqs: QuestionItem[];
  oneLiners: QuestionItem[];
}

export const QUESTION_BANKS: Record<string, Record<string, QuestionBankData>> = {
  // 1. MATHS (गणित)
  maths: {
    general: {
      blanks: [
        { id: 'mb1', question: 'ax + by + c = 0 हे दोन चलातील रेषीय समीकरणाचे _____ रूप आहे.', correctAnswer: 'सामान्य (Standard)' },
        { id: 'mb2', question: 'क्रेमर्सच्या पद्धतीमध्ये चल x ची किंमत काढण्याचे सूत्र x = _____ आहे.', correctAnswer: 'Dx / D' },
        { id: 'mb3', question: 'क्रेमर्सच्या पद्धतीमध्ये निश्चयक D = ० असल्यास समीकरणांना _____ उकल नसते.', correctAnswer: 'अनन्य (एकमेव)' },
        { id: 'mb4', question: '३x + ५y = ९ या समीकरणात x = १ असल्यास y = _____ असेल.', correctAnswer: '१.२ (किंवा ६/५)' },
        { id: 'mb5', question: 'निश्चयक |२ ३; ४ ५| चे मूल्य २ × ५ - ३ × ४ = _____ येते.', correctAnswer: '-२' },
        { id: 'mb6', question: 'दोन चलातील रेषीय समीकरणाचा आलेख नेहमी एक _____ रेषा असतो.', correctAnswer: 'सरळ' },
        { id: 'mb7', question: 'चल y ची किंमत काढण्यासाठी क्रेमर्स सूत्र y = _____ हे वापरतात.', correctAnswer: 'Dy / D' },
        { id: 'mb8', question: 'काटकोन त्रिकोणात कर्ण² = पाया² + _____² हे पायथागोरसचे सूत्र आहे.', correctAnswer: 'उंची' },
      ],
      matches: [
        { id: 'mm1', left: 'निश्चयक पद्धती (क्रेमर्स रूल)', right: 'गॅब्रिएल क्रेमर' },
        { id: 'mm2', left: 'दोन चलातील रेषीय समीकरण कोटी', right: '१ (एक)' },
        { id: 'mm3', left: 'x ची किंमत (Cramer)', right: 'Dx / D' },
        { id: 'mm4', left: 'y ची किंमत (Cramer)', right: 'Dy / D' },
        { id: 'mm5', left: 'काटकोन त्रिकोण संबंध', right: 'पायथागोरसचे प्रमेय' },
        { id: 'mm6', left: 'D = 0 आणि Dx ≠ 0', right: 'उकल अस्तित्वात नाही' },
        { id: 'mm7', left: 'निश्चयकाची कोटी', right: '२ (दोन स्तंभ व दोन ओळी)' },
      ],
      mcqs: [
        {
          id: 'mc1',
          question: '४x + ५y = १९ या समीकरणात x = १ असल्यास y ची किंमत किती?',
          options: ['३', '४', '५', '२'],
          correctAnswer: '३'
        },
        {
          id: 'mc2',
          question: 'निश्चयक |३ २; ४ ५| चे मूल्य किती?',
          options: ['७', '-७', '२३', '१५'],
          correctAnswer: '७'
        },
        {
          id: 'mc3',
          question: 'क्रेमर्सच्या पद्धतीत Dx = २५ आणि D = ५ असल्यास x ची किंमत किती?',
          options: ['५', '२०', '१२५', '०'],
          correctAnswer: '५'
        },
        {
          id: 'mc4',
          question: 'पुढीलपैकी कोणते समीकरण दोन चलातील रेषीय समीकरण आहे?',
          options: ['२x + ५y = १०', 'x² + y = ७', 'xy + ५ = ८', '३/x + ४/y = २'],
          correctAnswer: '२x + ५y = १०'
        },
        {
          id: 'mc5',
          question: 'क्रेमर्सच्या नियमानुसार y = ?',
          options: ['Dy / D', 'Dx / D', 'D / Dy', 'Dx / Dy'],
          correctAnswer: 'Dy / D'
        },
        {
          id: 'mc6',
          question: 'काटकोन त्रिकोणात बाजू ३ सेमी व ४ सेमी असल्यास कर्ण किती सेमी असेल?',
          options: ['५ सेमी', '६ सेमी', '७ सेमी', '२५ सेमी'],
          correctAnswer: '५ सेमी'
        },
      ],
      oneLiners: [
        { id: 'md1', question: 'दोन चलातील रेषीय समीकरणाचे सामान्य रूप लिहा.', correctAnswer: 'ax + by + c = 0 (a, b एकाच वेळी शून्य नसतात)' },
        { id: 'md2', question: 'क्रेमर्सच्या पद्धतीमध्ये D ची किंमत काढताना कोणते सहगुणक घेतात?', correctAnswer: 'x आणि y या दोन्ही चलांचे सहगुणक (a1, a2 आणि b1, b2)' },
        { id: 'md3', question: 'दोन चलातील रेषीय समीकरणातील प्रत्येक पदातील चलाची सर्वोच्च कोटी किती असते?', correctAnswer: 'प्रत्येक चलाची सर्वोच्च कोटी १ असते.' },
        { id: 'md4', question: 'निश्चयक पद्धती कोणत्या स्विस गणितज्ञाने शोधून काढली?', correctAnswer: 'गॅब्रिएल क्रेमर (Gabriel Cramer)' },
        { id: 'md5', question: 'पायथागोरसचे प्रमेय कोणत्या प्रकारच्या त्रिकोणासाठी लागू होते?', correctAnswer: 'केवळ काटकोन त्रिकोणासाठी.' },
        { id: 'md6', question: 'जर D = ० असेल तर क्रेमर्स पद्धतीने उकल का काढता येत नाही?', correctAnswer: 'कारण शून्याने भागणे गणितीयदृष्ट्या अनिर्धारित असते.' },
      ],
    },
  },

  // 2. SCIENCE (विज्ञान व तंत्रज्ञान)
  science: {
    general: {
      blanks: [
        { id: 'sb1', question: 'पृथ्वीच्या पृष्ठभागावर गुरुत्वीय प्रवेग (g) चे सरासरी मूल्य _____ m/s² असते.', correctAnswer: '९.८' },
        { id: 'sb2', question: 'वस्तूचे वस्तुमान सर्व ठिकाणी _____ राहते.', correctAnswer: 'स्थिर / सारखे' },
        { id: 'sb3', question: 'चंद्रावरील गुरुत्वीय प्रवेग हा पृथ्वीच्या प्रवेगाच्या _____ पट असतो.', correctAnswer: '१/६' },
        { id: 'sb4', question: 'हवेमध्ये नायट्रोजन वायूचे प्रमाण सुमारे _____ टक्के असते.', correctAnswer: '७८' },
        { id: 'sb5', question: 'सूर्यापासून निघणारी अतिनील किरणे वातावरणातील _____ चा थर शोषून घेतो.', correctAnswer: 'ओझोन (O₃)' },
        { id: 'sb6', question: 'पाण्याचे रासायनिक सूत्र _____ हे आहे.', correctAnswer: 'H₂O' },
        { id: 'sb7', question: 'विद्युत धारेचे SI एकक _____ आहे.', correctAnswer: 'अँपिअर (A)' },
      ],
      matches: [
        { id: 'sm1', left: 'पृथ्वीवरील g चे मूल्य', right: '९.८ m/s²' },
        { id: 'sm2', left: 'ऑक्सिजन वायू', right: 'श्वसन व ज्वलनास मदत (२१%)' },
        { id: 'sm3', left: 'नायट्रोजन वायू', right: 'प्रथिने निर्मिती (७८%)' },
        { id: 'sm4', left: 'मुक्ती वेग (Escape Velocity)', right: '११.२ km/s' },
        { id: 'sm5', left: 'पाण्याचे रेणूसूत्र', right: 'H₂O' },
      ],
      mcqs: [
        {
          id: 'sc1',
          question: 'पृथ्वीच्या केंद्राशी गुरुत्वीय प्रवेग (g) चे मूल्य किती असते?',
          options: ['० m/s²', '९.८ m/s²', '४.९ m/s²', 'अनंत'],
          correctAnswer: '० m/s²'
        },
        {
          id: 'sc2',
          question: 'वातावरणात सर्वाधिक प्रमाणात आढळणारा वायू कोणता?',
          options: ['नायट्रोजन', 'ऑक्सिजन', 'कार्बन डायऑक्साइड', 'आर्गॉन'],
          correctAnswer: 'नायट्रोजन'
        },
        {
          id: 'sc3',
          question: 'वजन मोजण्याचे SI एकक कोणते आहे?',
          options: ['न्यूटन (N)', 'किलोग्रॅम (kg)', 'ज्यूल (J)', 'पास्कल (Pa)'],
          correctAnswer: 'न्यूटन (N)'
        },
        {
          id: 'sc4',
          question: 'जागतिक ओझोन दिन केव्हा साजरा केला जातो?',
          options: ['१६ सप्टेंबर', '५ जून', '२२ मार्च', '२८ फेब्रुवारी'],
          correctAnswer: '१६ सप्टेंबर'
        },
        {
          id: 'sc5',
          question: 'पृथ्वीवरून सोडलेल्या वस्तूचा मुक्ती वेग किती असतो?',
          options: ['११.२ km/s', '९.८ km/s', '१.६ km/s', '२५ km/s'],
          correctAnswer: '११.२ km/s'
        },
      ],
      oneLiners: [
        { id: 'sd1', question: 'न्यूटनचा पहिला गतीविषयक नियम सांगा.', correctAnswer: 'बाह्य असंतुलित बल प्रयुक्त नसेल तर वस्तू तिच्या विराम किंवा स्थिर अवस्थेत राहते.' },
        { id: 'sd2', question: 'मुक्त पतन (Free Fall) म्हणजे काय?', correctAnswer: 'केवळ गुरुत्वीय बलाच्या प्रभावाने वस्तू खाली पडत असल्यास त्या गतीला मुक्त पतन म्हणतात.' },
        { id: 'sd3', question: 'ओझोन वायूचा थर पृथ्वीसाठी संरक्षक कवच का मानला जातो?', correctAnswer: 'कारण तो सूर्यापासून निघणारी घातक अतिनील किरणे स्वतःमध्ये शोषून घेतो.' },
        { id: 'sd4', question: 'प्रकाश संश्लेषणासाठी वनस्पती कोणत्या वायूचा वापर करतात?', correctAnswer: 'कार्बन डायऑक्साइड (CO₂).' },
        { id: 'sd5', question: 'वस्तुमान आणि वजन यातील मुख्य फरक कोणता?', correctAnswer: 'वस्तुमान सर्वत्र स्थिर असते, तर वजन गुरुत्वीय बलानुसार बदलते.' },
      ],
    },
  },

  // 3. MARATHI (मराठी प्रथम भाषा)
  marathi: {
    general: {
      blanks: [
        { id: 'mb1', question: '‘गोपाळचे शौर्य’ या पाठात जंगलात लागलेल्या आगीला _____ म्हटले आहे.', correctAnswer: 'वणवा' },
        { id: 'mb2', question: 'ज्या समासात दोन्ही पदे महत्त्वाची असतात त्यास _____ समास म्हणतात.', correctAnswer: 'द्वंद्व समास' },
        { id: 'mb3', question: '‘सूर्य’ या शब्दाचा समानार्थी शब्द _____ हा आहे.', correctAnswer: 'भास्कर / रवी' },
        { id: 'mb4', question: 'मराठी भाषेची लिपी _____ ही आहे.', correctAnswer: 'देवनागरी' },
        { id: 'mb5', question: 'वाक्यात प्रश्न विचारलेला असतो त्या वाक्यास _____ वाक्य म्हणतात.', correctAnswer: 'प्रश्नार्थी' },
        { id: 'mb6', question: '‘हात टेकणे’ या वाक्प्रचाराचा अर्थ _____ पत्करणे असा होतो.', correctAnswer: 'हार' },
      ],
      matches: [
        { id: 'mm1', left: 'वणवा', right: 'डोंगरावरील मोठी आग' },
        { id: 'mm2', left: 'आई-वडील', right: 'इतरेतर द्वंद्व समास' },
        { id: 'mm3', left: 'रवी', right: 'सूर्य' },
        { id: 'mm4', left: 'प्रतिदिन', right: 'अव्ययीभाव समास' },
        { id: 'mm5', left: 'शौर्य', right: 'धाडस व पराक्रम' },
      ],
      mcqs: [
        {
          id: 'mc1',
          question: '‘वणवा’ या शब्दाचा योग्य अर्थ कोणता?',
          options: ['डोंगरावरील मोठी आग', 'नदीचा पूर', 'वादळ', 'भूकंप'],
          correctAnswer: 'डोंगरावरील मोठी आग'
        },
        {
          id: 'mc2',
          question: 'मराठी मुळाक्षरांमध्ये एकूण किती स्वर आहेत?',
          options: ['१४', '१२', '३४', '२'],
          correctAnswer: '१४'
        },
        {
          id: 'mc3',
          question: '‘सुंदर’ या शब्दाची जात कोणती?',
          options: ['विशेषण', 'नाम', 'सर्वनाम', 'क्रियापद'],
          correctAnswer: 'विशेषण'
        },
        {
          id: 'mc4',
          question: '‘हात टेकणे’ या वाक्प्रचाराचा अर्थ काय?',
          options: ['हार पत्करणे / असमर्थता दर्शवणे', 'हात धुणे', 'नमस्कार करणे', 'विश्रांती घेणे'],
          correctAnswer: 'हार पत्करणे / असमर्थता दर्शवणे'
        },
        {
          id: 'mc5',
          question: 'खालीलपैकी कोणता शब्द शुद्ध आहे?',
          options: ['विद्यार्थी', 'विद्यर्थी', 'विदयार्थी', 'विद्यर्धी'],
          correctAnswer: 'विद्यार्थी'
        },
      ],
      oneLiners: [
        { id: 'md1', question: 'मराठी भाषेची लिपी कोणत्या नावाने ओळखली जाते?', correctAnswer: 'देवनागरी लिपी.' },
        { id: 'md2', question: 'समास म्हणजे काय?', correctAnswer: 'शब्दांच्या परस्पर संबंधामुळे होणाऱ्या संक्षेपाला समास म्हणतात.' },
        { id: 'md3', question: '‘क्षणभंगुर’ या शब्दाचा अर्थ सांगा.', correctAnswer: 'क्षणात नाहीसे होणारे किंवा अल्पकाळ टिकणारे.' },
        { id: 'md4', question: 'वाक्याचे दोन मुख्य भाग कोणते असतात?', correctAnswer: 'उद्देश्य आणि विधेय.' },
        { id: 'md5', question: '‘अभिनंदन’ या शब्दाचा विरुद्धार्थी शब्द कोणता?', correctAnswer: 'धिक्कार किंवा निषेध.' },
      ],
    },
  },

  // 4. HINDI (हिंदी द्वितीय भाषा)
  hindi: {
    general: {
      blanks: [
        { id: 'hb1', question: 'कबीर दास जी के अनुसार विद्या _____ के बिना अधूरी है.', correctAnswer: 'विनम्रता / आचरण' },
        { id: 'hb2', question: '‘सूरज’ शब्द का शुद्ध पर्यायवाची शब्द _____ है.', correctAnswer: 'रवि / दिनकर' },
        { id: 'hb3', question: 'संज्ञा के स्थान पर प्रयोग होने वाले शब्दों को _____ कहते हैं.', correctAnswer: 'सर्वनाम' },
        { id: 'hb4', question: 'भारत की राजभाषा _____ है.', correctAnswer: 'हिंदी' },
        { id: 'hb5', question: '‘सच्चा मित्र’ वही है जो _____ में काम आए.', correctAnswer: 'मुसीबत / संकट' },
      ],
      matches: [
        { id: 'hm1', left: 'पेड़', right: 'वृक्ष / तरु' },
        { id: 'hm2', left: 'सूरज', right: 'रवि / भास्कर' },
        { id: 'hm3', left: 'पानी', right: 'जल / नीर' },
        { id: 'hm4', left: 'सर्वनाम', right: 'यह, वह, तुम' },
        { id: 'hm5', left: 'अहिंसा के पुजारी', right: 'महात्मा गांधी' },
      ],
      mcqs: [
        {
          id: 'hc1',
          question: 'हिंदी वर्णमाला में स्वरों की संख्या कितनी है?',
          options: ['११', '१२', '३३', '१०'],
          correctAnswer: '११'
        },
        {
          id: 'hc2',
          question: '‘फूल’ शब्द का पर्यायवाची शब्द कौन-सा है?',
          options: ['कुसुम', 'नयन', 'अंबर', 'पवन'],
          correctAnswer: 'कुसुम'
        },
        {
          id: 'hc3',
          question: '‘सत्य’ शब्द का विलोम (विरुद्धार्थी) शब्द क्या है?',
          options: ['असत्य', 'झूठ', 'कपट', 'अन्याय'],
          correctAnswer: 'असत्य'
        },
        {
          id: 'hc4',
          question: 'संज्ञा के कितने मुख्य भेद होते हैं?',
          options: ['तीन (या पांच)', 'दो', 'चार', 'सात'],
          correctAnswer: 'तीन (या पांच)'
        },
        {
          id: 'hc5',
          question: '‘आंखों का तारा’ मुहावरे का सही अर्थ क्या है?',
          options: ['बहुत प्यारा होना', 'तारे देखना', 'आंखें दुखना', 'अंधा होना'],
          correctAnswer: 'बहुत प्यारा होना'
        },
      ],
      oneLiners: [
        { id: 'hd1', question: 'संज्ञा किसे कहते हैं?', correctAnswer: 'किसी व्यक्ति, वस्तु, स्थान या भाव के नाम को संज्ञा कहते हैं.' },
        { id: 'hd2', question: 'विशेषण की परिभाषा लिखिए.', correctAnswer: 'जो शब्द संज्ञा या सर्वनाम की विशेषता बताते हैं, उन्हें विशेषण कहते हैं.' },
        { id: 'hd3', question: 'हिंदी दिवस कब मनाया जाता है?', correctAnswer: '१४ सितंबर को हिंदी दिवस मनाया जाता है.' },
        { id: 'hd4', question: '‘दिन’ शब्द का विलोम शब्द क्या है?', correctAnswer: 'रात.' },
        { id: 'hd5', question: '‘सदा सच बोलो’ यह किस प्रकार का वाक्य है?', correctAnswer: 'आज्ञार्थक / उपदेशात्मक वाक्य.' },
      ],
    },
  },

  // 5. ENGLISH (इंग्रजी तृतीय भाषा)
  english: {
    general: {
      blanks: [
        { id: 'eb1', question: 'A person who writes poems is called a _____.', correctAnswer: 'poet' },
        { id: 'eb2', question: 'The antonym (opposite) of "brave" is _____.', correctAnswer: 'coward' },
        { id: 'eb3', question: 'An apple a day keeps the _____ away.', correctAnswer: 'doctor' },
        { id: 'eb4', question: 'The plural form of "child" is _____.', correctAnswer: 'children' },
        { id: 'eb5', question: 'We use the article _____ before words beginning with a vowel sound.', correctAnswer: 'an' },
        { id: 'eb6', question: 'The past tense of "go" is _____.', correctAnswer: 'went' },
      ],
      matches: [
        { id: 'em1', left: 'Honest', right: 'Truthful' },
        { id: 'em2', left: 'Huge', right: 'Very big / Gigantic' },
        { id: 'em3', left: 'Fast', right: 'Quick' },
        { id: 'em4', left: 'Difficult', right: 'Hard' },
        { id: 'em5', left: 'Joy', right: 'Happiness' },
      ],
      mcqs: [
        {
          id: 'ec1',
          question: 'What is the synonym of the word "happy"?',
          options: ['Joyful', 'Sad', 'Angry', 'Tired'],
          correctAnswer: 'Joyful'
        },
        {
          id: 'ec2',
          question: 'Choose the correct article: "He is _____ honest boy."',
          options: ['an', 'a', 'the', 'no article'],
          correctAnswer: 'an'
        },
        {
          id: 'ec3',
          question: 'What is the past tense of the verb "write"?',
          options: ['wrote', 'written', 'writing', 'writes'],
          correctAnswer: 'wrote'
        },
        {
          id: 'ec4',
          question: 'Which of the following is a noun?',
          options: ['School', 'Quickly', 'Beautiful', 'Run'],
          correctAnswer: 'School'
        },
        {
          id: 'ec5',
          question: 'Identify the opposite word of "ancient":',
          options: ['Modern', 'Old', 'Historic', 'Past'],
          correctAnswer: 'Modern'
        },
      ],
      oneLiners: [
        { id: 'ed1', question: 'What is a sentence?', correctAnswer: 'A sentence is a group of words that makes complete sense.' },
        { id: 'ed2', question: 'Give two examples of proper nouns.', correctAnswer: 'India, Vinod, Buldhana.' },
        { id: 'ed3', question: 'What is the comparative degree of "tall"?', correctAnswer: 'Taller.' },
        { id: 'ed4', question: 'Name the punctuation mark used at the end of an interrogative sentence.', correctAnswer: 'Question mark (?).' },
        { id: 'ed5', question: 'What is the rhyming word for "light"?', correctAnswer: 'Bright / Night / Sight.' },
      ],
    },
  },

  // 6. HISTORY & CIVICS (इतिहास व नागरिकशास्त्र / राज्यशास्त्र)
  history: {
    general: {
      blanks: [
        { id: 'hb1', question: 'छत्रपती शिवाजी महाराजांचा राज्याभिषेक सन _____ मध्ये झाला.', correctAnswer: '१६७४' },
        { id: 'hb2', question: 'भारताचे संविधान _____ रोजी अंमलात आले.', correctAnswer: '२६ जानेवारी १९५०' },
        { id: 'hb3', question: 'भारतीय राज्यघटनेचे शिल्पकार डॉ. _____ हे आहेत.', correctAnswer: 'बाबासाहेब आंबेडकर' },
        { id: 'hb4', question: 'इतिहासाची भौतिक, लिखित आणि _____ ही प्रमुख तीन साधने आहेत.', correctAnswer: 'मौखिक' },
        { id: 'hb5', question: 'लोकसभेच्या सदस्यांची मुदत _____ वर्षे असते.', correctAnswer: '५ (पाच)' },
        { id: 'hb6', question: 'स्वतंत्र भारताचे पहिले पंतप्रधान पंडित _____ हे होते.', correctAnswer: 'जवाहरलाल नेहरू' },
      ],
      matches: [
        { id: 'hm1', left: 'शिवराज्याभिषेक वर्ष', right: 'इ.स. १६७४ (किल्ले रायगड)' },
        { id: 'hm2', left: 'राज्यघटनेचे शिल्पकार', right: 'डॉ. बाबासाहेब आंबेडकर' },
        { id: 'hm3', left: 'इतिहासाची साधने', right: 'भौतिक, लिखित व मौखिक' },
        { id: 'hm4', left: 'भारताचे राष्ट्रपती', right: 'देशाचे प्रथम नागरिक' },
        { id: 'hm5', left: 'लोकसभेचा कार्यकाळ', right: '५ वर्षे' },
      ],
      mcqs: [
        {
          id: 'hc1',
          question: 'भारतीय प्रजासत्ताक दिन कोणत्या दिवशी साजरा केला जातो?',
          options: ['२६ जानेवारी', '१५ ऑगस्ट', '२ ऑक्टोबर', '१ मे'],
          correctAnswer: '२६ जानेवारी'
        },
        {
          id: 'hc2',
          question: 'छत्रपती शिवाजी महाराजांचा राज्याभिषेक कोणत्या किल्ल्यावर झाला?',
          options: ['रायगड', 'शिवनेरी', 'राजगड', 'प्रतापगड'],
          correctAnswer: 'रायगड'
        },
        {
          id: 'hc3',
          question: 'भारतीय संविधानानुसार मतदानाचा अधिकार किती वर्षे पूर्ण झाल्यावर मिळतो?',
          options: ['१८ वर्षे', '२१ वर्षे', '२५ वर्षे', '१६ वर्षे'],
          correctAnswer: '१८ वर्षे'
        },
        {
          id: 'hc4',
          question: 'संसदेची दोन सभागृहे कोणती आहेत?',
          options: ['लोकसभा व राज्यसभा', 'विधानसभा व विधानपरिषद', 'न्यायालय व संसद', 'मंत्रिमंडळ व राष्ट्रपती'],
          correctAnswer: 'लोकसभा व राज्यसभा'
        },
        {
          id: 'hc5',
          question: 'सत्यशोधक समाजाची स्थापना कोणी केली?',
          options: ['महात्मा ज्योतिराव फुले', 'राजाराम मोहन रॉय', 'स्वामी विवेकानंद', 'लोकमान्य टिळक'],
          correctAnswer: 'महात्मा ज्योतिराव फुले'
        },
      ],
      oneLiners: [
        { id: 'hd1', question: 'इतिहासाची तीन मुख्य साधने कोणती?', correctAnswer: 'भौतिक साधने, लिखित साधने आणि मौखिक साधने.' },
        { id: 'hd2', question: 'भारतीय राज्यघटनेची मसुदा समितीचे अध्यक्ष कोण होते?', correctAnswer: 'डॉ. बाबासाहेब आंबेडकर.' },
        { id: 'hd3', question: 'शिवरायांच्या अष्टप्रधान मंडळातील पेशवे यांचे मुख्य काम काय होते?', correctAnswer: 'राज्यकारभार चालवणे आणि सैन्याचे आधिपत्य सांभाळणे.' },
        { id: 'hd4', question: 'ग्रामपंचायतीचा प्रशासकीय प्रमुख कोण असतो?', correctAnswer: 'ग्रामसेवक.' },
        { id: 'hd5', question: 'भारतात संसदीय शासन पद्धती कोणत्या देशाच्या प्रेरणेतून स्वीकारली गेली?', correctAnswer: 'इंग्लंड (ब्रिटन).' },
      ],
    },
  },

  // 7. GEOGRAPHY (भूगोल)
  geography: {
    general: {
      blanks: [
        { id: 'gb1', question: 'महाराष्ट्र राज्याची राजधानी _____ ही आहे.', correctAnswer: 'मुंबई' },
        { id: 'gb2', question: 'पृथ्वी स्वतःभोवती पश्चिमेकडून _____ दिशेकडे फिरते.', correctAnswer: 'पूर्वेकडे' },
        { id: 'gb3', question: 'क्षेत्रफळाच्या दृष्टीने भारतातील सर्वात मोठे राज्य _____ आहे.', correctAnswer: 'राजस्थान' },
        { id: 'gb4', question: 'महाराष्ट्रात सर्वात जास्त पाऊस पडणारे ठिकाण _____ आहे.', correctAnswer: 'आंबोली' },
        { id: 'gb5', question: 'जगातील सर्वात उंच पर्वतशिखर _____ हे आहे.', correctAnswer: 'माऊंट एव्हरेस्ट' },
        { id: 'gb6', question: 'कर्कवृत्त हे _____ अंश उत्तर अक्षांशावर आहे.', correctAnswer: '२३.५°' },
      ],
      matches: [
        { id: 'gm1', left: 'महाराष्ट्राची उपराजधानी', right: 'नागपूर' },
        { id: 'gm2', left: 'पृथ्वीचे परिवलन', right: 'स्वतःभोवती फिरणे (२४ तास)' },
        { id: 'gm3', left: 'पृथ्वीचे परिभ्रमण', right: 'सूर्याभोवती फिरणे (३६५ दिवस)' },
        { id: 'gm4', left: 'लोणार सरोवर', right: 'उल्कापातामुळे निर्मित (बुलढाणा)' },
        { id: 'gm5', left: 'सह्याद्री पर्वत', right: 'पश्चिम घाट' },
      ],
      mcqs: [
        {
          id: 'gc1',
          question: 'बुलढाणा जिल्ह्यातील प्रसिद्ध खाऱ्या पाण्याचे उल्कापात सरोवर कोणते?',
          options: ['लोणार सरोवर', 'वेण्णा तलाव', 'रानगंगा', 'पवई तलाव'],
          correctAnswer: 'लोणार सरोवर'
        },
        {
          id: 'gc2',
          question: 'सूर्याभोवती पृथ्वीच्या फिरण्यामुळे काय निर्माण होते?',
          options: ['ऋतुचक्र (वर्ष)', 'दिवस-रात्र', 'ग्रहण', 'भूकंप'],
          correctAnswer: 'ऋतुचक्र (वर्ष)'
        },
        {
          id: 'gc3',
          question: 'महाराष्ट्र राज्याला किती किलोमीटर लांबीचा समुद्रकिनारा लाभला आहे?',
          options: ['७२० किमी', '५०० किमी', '१००० किमी', '३०० किमी'],
          correctAnswer: '७२० किमी'
        },
        {
          id: 'gc4',
          question: 'नकाशातील उत्तर दिशा दर्शवण्यासाठी कोणत्या चिन्हाचा वापर करतात?',
          options: ['वर बाण व N अक्षर', 'खाली बाण', 'गोल', 'चौकोन'],
          correctAnswer: 'वर बाण व N अक्षर'
        },
        {
          id: 'gc5',
          question: 'भारतातील प्रमुख प्रमाणवेळ रेखावृत्त कोणते आहे?',
          options: ['८२° ३०\' पूर्व', '०° रेखावृत्त', '१८०° रेखावृत्त', '९०° पश्चिम'],
          correctAnswer: '८२° ३०\' पूर्व'
        },
      ],
      oneLiners: [
        { id: 'gd1', question: 'अक्षवृत्त म्हणजे काय?', correctAnswer: 'पृथ्वीच्या पृष्ठभागावर पूर्वेकडून पश्चिमेकडे काढलेल्या काल्पनिक आडव्या रेषांना अक्षवृत्त म्हणतात.' },
        { id: 'gd2', question: 'लोणार सरोवर कोणत्या जिल्ह्यात आहे?', correctAnswer: 'बुलढाणा जिल्हा (महाराष्ट्र).' },
        { id: 'gd3', question: 'वातावरणाचा सर्वात खालचा थर कोणता?', correctAnswer: 'तपांबर (Troposphere).' },
        { id: 'gd4', question: 'महाराष्ट्रातील सर्वोच्च पर्वतशिखर कोणते?', correctAnswer: 'कळसूबाई (१६४६ मीटर).' },
        { id: 'gd5', question: 'पर्जन्यछायेचा प्रदेश म्हणजे काय?', correctAnswer: 'डोंगराच्या विरुद्ध बाजूला जिथे पावसाचे प्रमाण अत्यल्प असते त्या भागास पर्जन्यछायेचा प्रदेश म्हणतात.' },
      ],
    },
  },

  // 8. DEFENSE STUDIES (संरक्षण शास्त्र)
  defense: {
    general: {
      blanks: [
        { id: 'db1', question: 'भारतीय तिन्ही संरक्षण दलांचे सरसेनापती _____ असतात.', correctAnswer: 'भारताचे राष्ट्रपती' },
        { id: 'db2', question: 'भूसेना दिन _____ जानेवारी रोजी साजरा केला जातो.', correctAnswer: '१५' },
        { id: 'db3', question: 'भारतीय नौसेनेचे मुख्यालय _____ येथे आहे.', correctAnswer: 'नवी दिल्ली' },
        { id: 'db4', question: 'राष्ट्रीय छात्र सेना (NCC) ची स्थापना सन _____ मध्ये झाली.', correctAnswer: '१९४८' },
        { id: 'db5', question: 'भारताच्या पश्चिम किनारपट्टीचे रक्षण प्रामुख्याने _____ दल करते.', correctAnswer: 'भारतीय नौदल' },
      ],
      matches: [
        { id: 'dm1', left: 'भूसेना (Army)', right: 'जमीन सीमांचे रक्षण' },
        { id: 'dm2', left: 'नौसेना (Navy)', right: 'सागरी सीमांचे रक्षण' },
        { id: 'dm3', left: 'वायुसेना (Air Force)', right: 'आकाशीय सुरक्षा' },
        { id: 'dm4', left: 'सरसेनापती', right: 'मा. राष्ट्रपती' },
        { id: 'dm5', left: 'एन.सी.सी. ध्येय', right: 'एकता आणि शिस्त (Unity and Discipline)' },
      ],
      mcqs: [
        {
          id: 'dc1',
          question: 'भारतीय संरक्षण दलाचे तिन्ही प्रमुख कोणाच्या मार्गदर्शनाखाली कार्य करतात?',
          options: ['राष्ट्रपती', 'पंतप्रधान', 'संरक्षण मंत्री', 'गृहमंत्री'],
          correctAnswer: 'राष्ट्रपती'
        },
        {
          id: 'dc2',
          question: 'राष्ट्रीय संरक्षण प्रबोधिनी (NDA) महाराष्ट्रात कोठे आहे?',
          options: ['खडकवासला (पुणे)', 'नाशिक', 'नागपूर', 'मुंबई'],
          correctAnswer: 'खडकवासला (पुणे)'
        },
        {
          id: 'dc3',
          question: 'नौदल दिन केव्हा साजरा केला जातो?',
          options: ['४ डिसेंबर', '१५ जानेवारी', '८ ऑक्टोबर', '२६ जानेवारी'],
          correctAnswer: '४ डिसेंबर'
        },
        {
          id: 'dc4',
          question: 'एन.सी.सी. (NCC) चे ब्रीदवाक्य कोणते आहे?',
          options: ['एकता आणि शिस्त', 'सेवा आणि समर्पण', 'शौर्य आणि निष्ठा', 'ज्ञान आणि विज्ञान'],
          correctAnswer: 'एकता आणि शिस्त'
        },
        {
          id: 'dc5',
          question: 'आपत्कालीन परिस्थितीत नागरी संरक्षण कोण पुरवते?',
          options: ['नागरी संरक्षण दल व NDRF', 'रेल्वे', 'टपाल', 'बँक'],
          correctAnswer: 'नागरी संरक्षण दल व NDRF'
        },
      ],
      oneLiners: [
        { id: 'dd1', question: 'भारताच्या तिन्ही संरक्षण दलांची नावे सांगा.', correctAnswer: 'भूसेना (Army), नौसेना (Navy) आणि वायुसेना (Air Force).' },
        { id: 'dd2', question: 'राष्ट्रीय छात्र सेनेचे (NCC) चे उद्दिष्ट काय आहे?', correctAnswer: 'विद्यार्थ्यांमध्ये शिस्त, राष्ट्रप्रेम, नेतृत्वगुण व देशसेवेची भावना निर्माण करणे.' },
        { id: 'dd3', question: 'एन.डी.ए. (NDA) चा पूर्ण विस्तार काय आहे?', correctAnswer: 'National Defence Academy (राष्ट्रीय संरक्षण प्रबोधिनी).' },
        { id: 'dd4', question: 'आपत्ती व्यवस्थापन म्हणजे काय?', correctAnswer: 'नैसर्गिक किंवा मानवनिर्मित आपत्तींपासून जीवित व वित्तहानी टाळण्यासाठी केलेली पूर्वतयारी व बचावकार्य.' },
        { id: 'dd5', question: 'वायुसेना दिन कोणत्या तारखेला असतो?', correctAnswer: '८ ऑक्टोबर.' },
      ],
    },
  },

  // 9. WATER SECURITY (जलसुरक्षा)
  water_sec: {
    general: {
      blanks: [
        { id: 'wb1', question: 'पृथ्वीवरील एकूण पाण्यापैकी पिण्यायोग्य गोडे पाणी केवळ _____ टक्के आहे.', correctAnswer: '०.३' },
        { id: 'wb2', question: 'पावसाचे पाणी साठवून भूगर्भात मुरवण्याच्या पद्धतीस _____ म्हणतात.', correctAnswer: 'रेन वॉटर हार्वेस्टिंग' },
        { id: 'wb3', question: 'जलदिंडी किंवा जलसाक्षरता दिंडी _____ जनजागृतीसाठी काढली जाते.', correctAnswer: 'पाणी संवर्धन' },
        { id: 'wb4', question: 'विहिरीतील पाण्याची पातळी वाढवण्यासाठी पाण्याचा पुनर्भरणास _____ म्हणतात.', correctAnswer: 'भूजल पुनर्भरण' },
        { id: 'wb5', question: 'शेतीसाठी पाणी बचत करणारी आधुनिक पद्धत _____ सिंचन आहे.', correctAnswer: 'ठिबक / तुषार' },
      ],
      matches: [
        { id: 'wm1', left: 'ठिबक सिंचन', right: 'मुळाशी थेंब थेंब पाणी देणे (पाणी बचत)' },
        { id: 'wm2', left: 'तुषार सिंचन', right: 'कारंज्यासारखे पाणी देणे' },
        { id: 'wm3', left: 'रेन वॉटर हार्वेस्टिंग', right: 'छतावरील पावसाचे पाणी साठवणे' },
        { id: 'wm4', left: 'भूजल पातळी', right: 'जमिनीतील पाण्याची पातळी' },
        { id: 'wm5', left: 'जागतिक जल दिन', right: '२२ मार्च' },
      ],
      mcqs: [
        {
          id: 'wc1',
          question: 'जागतिक जल दिन कोणत्या तारखेला साजरा केला जातो?',
          options: ['२२ मार्च', '५ जून', '१६ सप्टेंबर', '२२ एप्रिल'],
          correctAnswer: '२२ मार्च'
        },
        {
          id: 'wc2',
          question: 'शेतीसाठी सर्वाधिक पाणी बचत करणारी पद्धत कोणती?',
          options: ['ठिबक सिंचन', 'पाट पाणी', 'पूर पद्धत', 'धरण सिंचन'],
          correctAnswer: 'ठिबक सिंचन'
        },
        {
          id: 'wc3',
          question: 'छतावरील पावसाचे पाणी विहिरीत सोडण्याच्या प्रक्रियेस काय म्हणतात?',
          options: ['भूजल पुनर्भरण', 'जलप्रदूषण', 'बाष्पीभवन', 'जलचक्र'],
          correctAnswer: 'भूजल पुनर्भरण'
        },
        {
          id: 'wc4',
          question: 'पाण्याचे जैविक प्रदूषण कशामुळे होते?',
          options: ['सांडपाणी व कचरा मिसळल्याने', 'वाऱ्याने', 'मातीमुळे', 'उन्हामुळे'],
          correctAnswer: 'सांडपाणी व कचरा मिसळल्याने'
        },
        {
          id: 'wc5',
          question: 'पाण्याचा अपव्यय टाळण्यासाठी नळाची तोटी कशी ठेवावी?',
          options: ['वापरानंतर घट्ट बंद करावी', 'नेहमी चालू ठेवावी', 'गळकी ठेवावी', 'दुर्लक्ष करावी'],
          correctAnswer: 'वापरानंतर घट्ट बंद करावी'
        },
      ],
      oneLiners: [
        { id: 'wd1', question: 'जल संवर्धन म्हणजे काय?', correctAnswer: 'पाण्याचा काटकसरीने वापर करणे, साठवणूक करणे आणि भूगर्भात मुरवणे म्हणजे जल संवर्धन.' },
        { id: 'wd2', question: 'रेन वॉटर हार्वेस्टिंगचे दोन फायदे सांगा.', correctAnswer: '१) भूजल पातळी वाढते. २) उन्हाळ्यात पाण्याची टंचाई भासत नाही.' },
        { id: 'wd3', question: 'शेतीमध्ये पाणी बचतीसाठी कोणत्या दोन आधुनिक सिंचन पद्धती वापरतात?', correctAnswer: 'ठिबक सिंचन आणि तुषार सिंचन.' },
        { id: 'wd4', question: 'पिण्याच्या पाण्याची शुद्धता तपासण्यासाठी कशाचा वापर केला जातो?', correctAnswer: 'टीडीएस (TDS) मीटर व रासायनिक चाचण्या.' },
        { id: 'wd5', question: 'जल साक्षरता म्हणजे काय?', correctAnswer: 'पाण्याचे महत्त्व, त्याचे संवर्धन आणि नियोजन याविषयी लोकांमध्ये जागृती निर्माण करणे.' },
      ],
    },
  },

  // 10. HEALTH & PHYSICAL EDUCATION (आरोग्य व शारीरिक शिक्षण)
  health_pe: {
    general: {
      blanks: [
        { id: 'pb1', question: 'सूर्य नमस्कारामध्ये एकूण _____ स्थितींचा समावेश असतो.', correctAnswer: '१२' },
        { id: 'pb2', question: 'निरोगी आरोग्यासाठी दररोज किमान _____ तास गाढ झोप आवश्यक असते.', correctAnswer: '७ ते ८' },
        { id: 'pb3', question: 'शरीराला तत्काळ ऊर्जा पुरवणारा प्रमुख घटक _____ आहे.', correctAnswer: 'कर्बोदके (Carbohydrates)' },
        { id: 'pb4', question: 'आंतरराष्ट्रीय योग दिन दरवर्षी _____ जून रोजी साजरा केला जातो.', correctAnswer: '२१' },
        { id: 'pb5', question: 'कबड्डी खेळामध्ये एका संघात प्रत्यक्ष खेळणारे खेळाडू _____ असतात.', correctAnswer: '७' },
        { id: 'pb6', question: 'रक्ताभिसरण व फुप्फुसांची कार्यक्षमता सुधारण्यासाठी _____ चा सराव उपयुक्त ठरतो.', correctAnswer: 'प्राणायाम' },
      ],
      matches: [
        { id: 'pm1', left: 'सूर्य नमस्कार', right: '१२ आसनांची मालिका' },
        { id: 'pm2', left: 'आंतरराष्ट्रीय योग दिन', right: '२१ जून' },
        { id: 'pm3', left: 'कबड्डी प्रत्यक्ष खेळाडू', right: '७ खेळाडू' },
        { id: 'pm4', left: 'खो-खो बसणारे खेळाडू', right: '८ खेळाडू' },
        { id: 'pm5', left: 'समतोल आहार', right: 'प्रथिने, जीवनसत्त्वे व कर्बोदके' },
      ],
      mcqs: [
        {
          id: 'pc1',
          question: 'आंतरराष्ट्रीय योग दिन कोणत्या दिवशी साजरा केला जातो?',
          options: ['२१ जून', '१५ ऑगस्ट', '१ मे', '२६ जानेवारी'],
          correctAnswer: '२१ जून',
        },
        {
          id: 'pc2',
          question: 'शरीराची लवचिकता वाढवण्यासाठी काय सर्वात उपयुक्त ठरते?',
          options: ['योगासने व स्ट्रेचिंग', 'उष्णता', 'जास्त झोपणे', 'गोड खाणे'],
          correctAnswer: 'योगासने व स्ट्रेचिंग',
        },
        {
          id: 'pc3',
          question: 'खो-खो खेळामध्ये मैदानात चौरसात बसणाऱ्या खेळाडूंची संख्या किती असते?',
          options: ['८', '९', '७', '११'],
          correctAnswer: '८',
        },
        {
          id: 'pc4',
          question: 'हाडांच्या बळकटीसाठी कोणते जीवनसत्त्व आवश्यक असते?',
          options: ['जीवनसत्त्व D', 'जीवनसत्त्व C', 'जीवनसत्त्व B', 'जीवनसत्त्व K'],
          correctAnswer: 'जीवनसत्त्व D',
        },
        {
          id: 'pc5',
          question: 'धावण्याच्या शर्यतीमध्ये प्रारंभ करताना कोणता आदेश दिला जातो?',
          options: ['ऑन युवर मार्क्स, सेट, गो', 'थांबा', 'उभे राहा', 'बसा'],
          correctAnswer: 'ऑन युवर मार्क्स, सेट, गो',
        },
      ],
      oneLiners: [
        { id: 'pd1', question: 'समतोल आहार म्हणजे काय?', correctAnswer: 'ज्या आहारात शरीराला आवश्यक असणारे सर्व पोषक घटक योग्य प्रमाणात असतात त्यास समतोल आहार म्हणतात.' },
        { id: 'pd2', question: 'सूर्य नमस्काराचे दोन मुख्य फायदे सांगा.', correctAnswer: '१) स्नायू व हाडे बळकट होतात. २) शरीराची लवचिकता व रक्ताभिसरण सुधारते.' },
        { id: 'pd3', question: 'प्राणायामाचा मुख्य उद्देश कोणता?', correctAnswer: 'श्वसन क्रियेवर नियंत्रण मिळवून मानसिक एकाग्रता व फुप्फुसांची कार्यक्षमता वाढवणे.' },
        { id: 'pd4', question: 'मानवी शरीराला दररोज सरासरी किती लिटर पाण्याची गरज असते?', correctAnswer: 'दररोज सुमारे २ ते ३ लिटर पाणी पिणे आवश्यक असते.' },
        { id: 'pd5', question: 'शारीरिक शिक्षणाचे प्रमुख उद्दिष्ट कोणते?', correctAnswer: 'विद्यार्थ्यांचा सर्वांगीण शारीरिक, मानसिक व सामाजिक विकास घडवून आणणे.' },
      ],
    },
  },

  // 11. ART EDUCATION (कला शिक्षण)
  art: {
    general: {
      blanks: [
        { id: 'ab1', question: 'लाल, पिवळा आणि निळा हे _____ रंग म्हणून ओळखले जातात.', correctAnswer: 'प्राथमिक (मूलभूत)' },
        { id: 'ab2', question: 'निसर्गातील झाडे, डोंगर, नदी रेखाटण्याच्या चित्रास _____ म्हणतात.', correctAnswer: 'निसर्गचित्र (Landscape)' },
        { id: 'ab3', question: 'कागदाच्या घड्या घालून विविध आकृत्या बनवण्याच्या जपानी कलेला _____ म्हणतात.', correctAnswer: 'ओरिगामी' },
        { id: 'ab4', question: 'महाराष्ट्रातील ठाणे व पालघर जिल्ह्यातील _____ ही जगप्रसिद्ध आदिवासी लोककला आहे.', correctAnswer: 'वारली चित्रकला' },
        { id: 'ab5', question: 'काळा आणि पांढरा रंग एकत्र मिसळल्यास _____ रंग तयार होतो.', correctAnswer: 'राखाडी (Grey)' },
      ],
      matches: [
        { id: 'am1', left: 'प्राथमिक रंग', right: 'लाल, पिवळा, निळा' },
        { id: 'am2', left: 'द्वितीयक रंग', right: 'हिरवा, नारंगी, जांभळा' },
        { id: 'am3', left: 'वारली कला', right: 'आदिवासी भित्तीचित्रे' },
        { id: 'am4', left: 'ओरिगामी', right: 'कागदकाम व घडीकाम' },
        { id: 'am5', left: 'तटस्थ रंग', right: 'काळा व पांढरा' },
      ],
      mcqs: [
        {
          id: 'ac1',
          question: 'खालीलपैकी कोणता प्राथमिक रंग आहे?',
          options: ['लाल', 'हिरवा', 'नारंगी', 'गुलाबी'],
          correctAnswer: 'लाल',
        },
        {
          id: 'ac2',
          question: 'पिवळा आणि निळा रंग एकत्र मिसळल्यास कोणता रंग तयार होतो?',
          options: ['हिरवा', 'जांभळा', 'तपकिरी', 'केशरी'],
          correctAnswer: 'हिरवा',
        },
        {
          id: 'ac3',
          question: 'वारली चित्रकलेत मुख्यतः कोणती भूमितीय रूपे आढळतात?',
          options: ['त्रिकोण, वर्तुळ व रेषा', 'केवळ घन', 'दंडगोल', 'शंकू'],
          correctAnswer: 'त्रिकोण, वर्तुळ व रेषा',
        },
        {
          id: 'ac4',
          question: 'कागदाच्या विविध घड्या घालून प्राणी व पक्षी बनवण्याच्या कलेला काय म्हणतात?',
          options: ['ओरिगामी', 'मातीकाम', 'सुतारकाम', 'विणकाम'],
          correctAnswer: 'ओरिगामी',
        },
        {
          id: 'ac5',
          question: 'चित्रात प्रकाश व छायेद्वारे (Shading) कोणता परिणाम साधला जातो?',
          options: ['त्रिमितीय परिणाम (3D Effect)', 'रंगहीनता', 'अस्पष्टता', 'द्विमितीय सपाटपणा'],
          correctAnswer: 'त्रिमितीय परिणाम (3D Effect)',
        },
      ],
      oneLiners: [
        { id: 'ad1', question: 'प्राथमिक रंग म्हणजे काय?', correctAnswer: 'जे रंग इतर रंगांच्या मिश्रणाने तयार करता येत नाहीत त्यांना प्राथमिक रंग म्हणतात (लाल, पिवळा, निळा).' },
        { id: 'ad2', question: 'द्वितीयक रंग कसे तयार होतात?', correctAnswer: 'दोन प्राथमिक रंग समप्रमाणात मिसळल्याने द्वितीयक रंग तयार होतात (उदा. हिरवा, नारंगी).' },
        { id: 'ad3', question: 'वारली चित्रकलेचे प्रमुख वैशिष्ट्य कोणते?', correctAnswer: 'त्रिकोण व वर्तुळ या आकारांद्वारे आदिवासी लोकजीवन व निसर्गाचे सुंदर रेखाटन.' },
        { id: 'ad4', question: 'स्मृतिचित्र (Memory Drawing) म्हणजे काय?', correctAnswer: 'अनुभवलेल्या किंवा आठवणीतील प्रसंगाचे कल्पकतेने केलेले रेखाटन म्हणजे स्मृतिचित्र.' },
        { id: 'ad5', question: 'तटस्थ रंग (Neutral colors) कोणते आहेत?', correctAnswer: 'काळा आणि पांढरा.' },
      ],
    },
  },

  // 12. WORK EXPERIENCE (कार्यानुभव)
  work_exp: {
    general: {
      blanks: [
        { id: 'wb1', question: 'सेंद्रिय कचऱ्यापासून घरच्या घरी उत्तम दर्जाचे _____ खत तयार करता येते.', correctAnswer: 'कंपोस्ट (किंवा गांडूळ)' },
        { id: 'wb2', question: 'विजेचे काम करताना सुरक्षिततेसाठी हातामध्ये _____ चे हातमोजे वापरावेत.', correctAnswer: 'रबरी' },
        { id: 'wb3', question: 'शाळेच्या आवारात भाजीपाला व फुलांची लागवड करणे यास _____ म्हणतात.', correctAnswer: 'परसबाग' },
        { id: 'wb4', question: 'टाकाऊ वस्तूंचा योग्य वापर करून उपयुक्त वस्तू बनवण्यास _____ म्हणतात.', correctAnswer: 'पुनर्वापर (Recycling)' },
        { id: 'wb5', question: 'विद्युत प्रवाह तपासण्यासाठी _____ या उपकरणाचा वापर करतात.', correctAnswer: 'टेस्टर (Tester)' },
      ],
      matches: [
        { id: 'wm1', left: 'कंपोस्ट खत', right: 'ओला कचरा व पालापाचोळा' },
        { id: 'wm2', left: 'विद्युत टेस्टर', right: 'वीज प्रवाह तपासणे' },
        { id: 'wm3', left: 'परसबाग', right: 'सेंद्रिय भाजीपाला निर्मिती' },
        { id: 'wm4', left: 'टाकाऊतून टिकाऊ', right: 'पर्यावरण संवर्धन व पुनर्वापर' },
        { id: 'wm5', left: 'रबरी पादत्राणे', right: 'विजेच्या धक्क्यापासून संरक्षण' },
      ],
      mcqs: [
        {
          id: 'wc1',
          question: 'ओल्या कचऱ्यापासून घरच्या घरी कोणते खत सहज तयार होते?',
          options: ['कंपोस्ट खत', 'युरिया', 'सुपर फॉस्फेट', 'डीएपी'],
          correctAnswer: 'कंपोस्ट खत',
        },
        {
          id: 'wc2',
          question: 'विद्युत जोडणी किंवा बटण तपासण्यासाठी कशाचा वापर केला जातो?',
          options: ['टेस्टर (Tester)', 'हातोडी', 'कात्री', 'कटर'],
          correctAnswer: 'टेस्टर (Tester)',
        },
        {
          id: 'wc3',
          question: 'परसबागेमध्ये कोणती झाडे लावणे आरोग्यासाठी सर्वात फायदेशीर ठरते?',
          options: ['भाजीपाला व तुळस, कोरफड', 'बाभूळ', 'कॅक्टस', 'यूकॅलिप्टस'],
          correctAnswer: 'भाजीपाला व तुळस, कोरफड',
        },
        {
          id: 'wc4',
          question: 'प्लास्टिक कचरा जाळण्याऐवजी काय करणे पर्यावरणासाठी योग्य आहे?',
          options: ['पुनर्प्रक्रिया (Recycling) व वापर कमी करणे', 'जमिनीत गाडणे', 'नदीत टाकणे', 'उघड्यावर टाकणे'],
          correctAnswer: 'पुनर्प्रक्रिया (Recycling) व वापर कमी करणे',
        },
        {
          id: 'wc5',
          question: 'घरगुती गॅस सिलिंडरचा रेग्युलेटर रात्री झोपताना कसा ठेवावा?',
          options: ['बंद (Off) ठेवावा', 'कायम चालू ठेवावा', 'उघडा ठेवावा', 'काही फरक पडत नाही'],
          correctAnswer: 'बंद (Off) ठेवावा',
        },
      ],
      oneLiners: [
        { id: 'wd1', question: 'कार्यानुभव विषयाचा मुख्य उद्देश कोणता?', correctAnswer: 'विद्यार्थ्यांमध्ये श्रमाची प्रतिष्ठा, स्वावलंबन व व्यावसायिक कौशल्ये निर्माण करणे.' },
        { id: 'wd2', question: 'कंपोस्ट खत तयार करण्यासाठी कोणत्या प्रकारचा कचरा उपयोगी पडतो?', correctAnswer: 'फळे व भाज्यांची साले, खरकटे अन्न, सुका पालापाचोळा व शेण.' },
        { id: 'wd3', question: 'परसबागेचे कोणतेही दोन फायदे सांगा.', correctAnswer: '१) सेंद्रिय व विषमुक्त ताजी भाजी मिळते. २) पैशांची बचत होऊन निसर्गाचा आनंद मिळतो.' },
        { id: 'wd4', question: 'विजेचे उपकरण वापरताना घ्यावयाची एक प्रमुख दक्षता सांगा.', correctAnswer: 'ओल्या हाताने कधीही विजेचे बटण किंवा वायर स्पर्श करू नये.' },
        { id: 'wd5', question: 'टाकाऊतून टिकाऊ वस्तू बनवल्याने समाजाला काय फायदा होतो?', correctAnswer: 'कचऱ्याचे प्रदूषण कमी होते आणि सर्जनशीलतेला वाव मिळतो.' },
      ],
    },
  },

  // 13. ALGEBRA (गणित भाग १ / बीजगणित)
  maths_algebra: {
    general: {
      blanks: [
        { id: 'mab1', question: 'ax + by + c = 0 हे दोन चलातील रेषीय समीकरणाचे _____ रूप आहे.', correctAnswer: 'सामान्य (Standard)' },
        { id: 'mab2', question: 'क्रेमर्सच्या नियमात x ची किंमत काढण्याचे सूत्र x = _____ आहे.', correctAnswer: 'Dx / D' },
        { id: 'mab3', question: 'वर्गसमीकरणाचे प्रमाणरूप ax² + bx + c = _____ असे असते.', correctAnswer: '०' },
        { id: 'mab4', question: 'अंकगणिती श्रेढीमध्ये सामान्य फरक काढण्याचे सूत्र d = t₂ - _____ आहे.', correctAnswer: 't₁' },
        { id: 'mab5', question: 'निश्चयक |३ ५; २ ४| चे मूल्य १२ - १० = _____ येते.', correctAnswer: '२' },
      ],
      matches: [
        { id: 'mam1', left: 'क्रेमर्स पद्धती x', right: 'Dx / D' },
        { id: 'mam2', left: 'क्रेमर्स पद्धती y', right: 'Dy / D' },
        { id: 'mam3', left: 'वर्गसमीकरण विविक्तक', right: 'Δ = b² - 4ac' },
        { id: 'mam4', left: 'अंकगणिती श्रेढी n वे पद', right: 'tn = a + (n-1)d' },
        { id: 'mam5', left: 'संभाव्यता सूत्र P(A)', right: 'n(A) / n(S)' },
      ],
      mcqs: [
        {
          id: 'mac1',
          question: 'क्रेमर्सच्या पद्धतीने x ची किंमत काढण्याचे योग्य सूत्र कोणते?',
          options: ['Dx / D', 'Dy / D', 'D / Dx', 'Dx / Dy'],
          correctAnswer: 'Dx / D',
        },
        {
          id: 'mac2',
          question: 'पुढीलपैकी कोणते वर्गसमीकरण आहे?',
          options: ['x² + ५x - २ = ०', 'x³ - x + १ = ०', '३x + ५ = ९', '१/x + x = २'],
          correctAnswer: 'x² + ५x - २ = ०',
        },
        {
          id: 'mac3',
          question: 'अंकगणिती श्रेढी २, ४, ६, ८, ... चा सामान्य फरक (d) किती आहे?',
          options: ['२', '-२', '४', '१'],
          correctAnswer: '२',
        },
        {
          id: 'mac4',
          question: 'एक नाणे फेकले असता नमुना अवकाश n(S) किती असतो?',
          options: ['२', '४', '१', '६'],
          correctAnswer: '२',
        },
        {
          id: 'mac5',
          question: 'निश्चयक |२ ३; ४ ५| चे मूल्य किती?',
          options: ['-२', '२', '२२', '१०'],
          correctAnswer: '-२',
        },
      ],
      oneLiners: [
        { id: 'mad1', question: 'दोन चलातील रेषीय समीकरणाचे सामान्य रूप लिहा.', correctAnswer: 'ax + by + c = 0 (येथे a, b, c वास्तव संख्या आणि a, b एकाच वेळी शून्य नसतात).' },
        { id: 'mad2', question: 'क्रेमर्सच्या नियमात D = ० असल्यास काय होते?', correctAnswer: 'समीकरणांना अनन्य उकल नसते (किंवा उकल काढता येत नाही).' },
        { id: 'mad3', question: 'वर्गसमीकरणाच्या मुळांचे स्वरूप ठरवणारा घटक कोणता?', correctAnswer: 'विविक्तक (Discriminant) Δ = b² - 4ac.' },
        { id: 'mad4', question: 'अंकगणिती श्रेढीचे n वे पद काढण्याचे सूत्र सांगा.', correctAnswer: 'tn = a + (n - 1)d.' },
        { id: 'mad5', question: 'संभाव्यता P(A) चे कमाल मूल्य किती असू शकते?', correctAnswer: '१ (किंवा १००%).' },
      ],
    },
  },

  // 14. GEOMETRY (गणित भाग २ / भूमिती)
  maths_geometry: {
    general: {
      blanks: [
        { id: 'mgb1', question: 'काटकोन त्रिकोणात कर्ण² = पाया² + _____² हे पायथागोरसचे प्रमेय आहे.', correctAnswer: 'उंची' },
        { id: 'mgb2', question: 'त्रिकोणाच्या तिन्ही कोनांच्या मापांची बेरीज _____ अंश असते.', correctAnswer: '१८०' },
        { id: 'mgb3', question: 'वर्तुळाचा परीघ काढण्याचे सूत्र C = _____ आहे.', correctAnswer: '२πr' },
        { id: 'mgb4', question: 'त्रिकोणाच्या एका बाजूला समांतर असणारी रेषा इतर बाजूंना _____ प्रमाणात विभागते.', correctAnswer: 'समान' },
        { id: 'mgb5', question: 'sin²θ + cos²θ चे मूल्य नेहमी _____ असते.', correctAnswer: '१' },
      ],
      matches: [
        { id: 'mgm1', left: 'पायथागोरसचे प्रमेय', right: 'कर्ण² = पाया² + उंची²' },
        { id: 'mgm2', left: 'प्रमाणाचे मूलभूत प्रमेय', right: 'बाजूंची समप्रमाणता' },
        { id: 'mgm3', left: 'वर्तुळाचे क्षेत्रफळ', right: 'πr²' },
        { id: 'mgm4', left: 'त्रिकोणमितीय नित्यसमानता', right: 'sin²θ + cos²θ = 1' },
        { id: 'mgm5', left: 'स्पर्शिका-त्रिज्या प्रमेय', right: 'काटकोन (९०°)' },
      ],
      mcqs: [
        {
          id: 'mgc1',
          question: 'काटकोन त्रिकोणात पाया ३ सेमी व उंची ४ सेमी असल्यास कर्ण किती असेल?',
          options: ['५ सेमी', '६ सेमी', '७ सेमी', '२५ सेमी'],
          correctAnswer: '५ सेमी',
        },
        {
          id: 'mgc2',
          question: 'त्रिकोणाच्या तिन्ही कोनांच्या मापांची बेरीज किती असते?',
          options: ['१८०°', '३६०°', '९०°', '२७०°'],
          correctAnswer: '१८०°',
        },
        {
          id: 'mgc3',
          question: 'वर्तुळाची सर्वात मोठी जीवा कोणती असते?',
          options: ['व्यास', 'त्रिज्या', 'स्पर्शिका', 'छेदिका'],
          correctAnswer: 'व्यास',
        },
        {
          id: 'mgc4',
          question: 'tan 45° चे मूल्य किती असते?',
          options: ['१', '०', '१/√२', '√३'],
          correctAnswer: '१',
        },
        {
          id: 'mgc5',
          question: 'वर्तुळाच्या बाह्य बिंदूतून वर्तुळाला जास्तीत जास्त किती स्पर्शिका काढता येतात?',
          options: ['२', '१', '३', 'अनंत'],
          correctAnswer: '२',
        },
      ],
      oneLiners: [
        { id: 'mgd1', question: 'पायथागोरसचे प्रमेय शब्दरूपात सांगा.', correctAnswer: 'काटकोन त्रिकोणात कर्णाचा वर्ग हा इतर दोन बाजूंच्या वर्गांच्या बेरजेइतका असतो.' },
        { id: 'mgd2', question: 'समरूप त्रिकोण म्हणजे काय?', correctAnswer: 'ज्या त्रिकोणांचे संगत कोन एकरूप आणि संगत बाजू एकाच प्रमाणात असतात ते समरूप त्रिकोण असतात.' },
        { id: 'mgd3', question: 'वर्तुळाचा व्यास आणि त्रिज्या यातील संबंध काय?', correctAnswer: 'व्यास हा त्रिज्येच्या दुप्पट असतो (d = 2r).' },
        { id: 'mgd4', question: 'त्रिकोणमितीमधील sin θ चे गुणोत्तर सांगा.', correctAnswer: 'sin θ = कोनासमोरील बाजू / कर्ण.' },
        { id: 'mgd5', question: 'स्पर्शिका-त्रिज्या प्रमेय काय सांगते?', correctAnswer: 'वर्तुळाची स्पर्शिका ही स्पर्शबिंदूतून काढलेल्या त्रिज्येला लंब असते.' },
      ],
    },
  },

  // 15. SCIENCE 1 (विज्ञान आणि तंत्रज्ञान भाग १)
  science1: {
    general: {
      blanks: [
        { id: 's1b1', question: 'पृथ्वीच्या पृष्ठभागावर गुरुत्वीय प्रवेग (g) चे मूल्य _____ m/s² असते.', correctAnswer: '९.८' },
        { id: 's1b2', question: 'मूलद्रव्यांची आधुनिक आवर्तसारणी _____ यांनी अणुअंकावर आधारित मांडली.', correctAnswer: 'हेन्री मोस्ले' },
        { id: 's1b3', question: 'विद्युत धारेचे SI एकक _____ हे आहे.', correctAnswer: 'अँपिअर (A)' },
        { id: 's1b4', question: 'पाण्याचा अपवर्तनांक सुमारे _____ असतो.', correctAnswer: '१.३३' },
        { id: 's1b5', question: 'लोखंडाचे गंजणे ही एक मंद गतीची _____ अभिक्रिया आहे.', correctAnswer: 'ऑक्सिडीकरण' },
      ],
      matches: [
        { id: 's1m1', left: 'गुरुत्वीय प्रवेग (g)', right: '९.८ m/s²' },
        { id: 's1m2', left: 'विद्युत रोध (R)', right: 'ओहम (Ω)' },
        { id: 's1m3', left: 'विभवांतर (V)', right: 'व्होल्ट (V)' },
        { id: 's1m4', left: 'आधुनिक आवर्तसारणी', right: 'अणुअंक (Z)' },
        { id: 's1m5', left: 'अपवर्तन नियम', right: 'स्नेलचा नियम' },
      ],
      mcqs: [
        {
          id: 's1c1',
          question: 'आधुनिक आवर्तसारणी मूलद्रव्यांच्या कोणत्या गुणधर्मावर आधारित आहे?',
          options: ['अणुअंक', 'अणुवस्तुमानांकावर', 'घनता', 'संयुजा'],
          correctAnswer: 'अणुअंक',
        },
        {
          id: 's1c2',
          question: 'विद्युत दिव्यामध्ये कोणत्या धातूची तार वापरली जाते?',
          options: ['टंगस्टन', 'तांबे', 'अ‍ॅल्युमिनिअम', 'लोखंड'],
          correctAnswer: 'टंगस्टन',
        },
        {
          id: 's1c3',
          question: 'पृथ्वीवरून सोडलेल्या वस्तूचा मुक्ती वेग (Escape velocity) किती असतो?',
          options: ['११.२ km/s', '९.८ km/s', '१.६ km/s', '३.१ km/s'],
          correctAnswer: '११.२ km/s',
        },
        {
          id: 's1c4',
          question: 'पाण्याचे तापमान ०°C वरून ४°C पर्यंत वाढवल्यास त्याचे आकारमान काय होते?',
          options: ['कमी होते (आकुंचन)', 'वाढते', 'स्थिर राहते', 'शून्य होते'],
          correctAnswer: 'कमी होते (आकुंचन)',
        },
        {
          id: 's1c5',
          question: 'विद्युत शक्ती मोजण्याचे एकक कोणते आहे?',
          options: ['वॉट (Watt)', 'ज्यूल', 'व्होल्ट', 'कॅलरी'],
          correctAnswer: 'वॉट (Watt)',
        },
      ],
      oneLiners: [
        { id: 's1d1', question: 'न्यूटनचा वैश्विक गुरुत्वाकर्षणाचा नियम सांगा.', correctAnswer: 'विश्वातील प्रत्येक वस्तू इतर वस्तूला आकर्षून घेते, हे आकर्षण बल त्यांच्या वस्तुमानाच्या गुणाकाराशी समप्रमाणात व अंतराच्या वर्गाशी व्यस्त प्रमाणात असते.' },
        { id: 's1d2', question: 'ओहमचा नियम काय सांगतो?', correctAnswer: 'वाहकाची भौतिक अवस्था कायम असताना वाहकामधून वाहणारी विद्युत धारा ही वाहकाच्या दोन टोकांमधील विभवांतराशी समप्रमाणात असते (V = IR).' },
        { id: 's1d3', question: 'पाण्याचे असंगत आचरण म्हणजे काय?', correctAnswer: '०°C ते ४°C या तापमान मर्यादेत पाणी तापवल्यास प्रसरण पावण्याऐवजी आकुंचन पावते, या वर्तनाला पाण्याचे असंगत आचरण म्हणतात.' },
        { id: 's1d4', question: 'गंज म्हणजे काय?', correctAnswer: 'लोखंडाची ऑक्सिजन व ओलाव्याशी रासायनिक अभिक्रिया होऊन तयार झालेला तांबूस थर म्हणजे Fe₂O₃.xH₂O (गंज).' },
        { id: 's1d5', question: 'अपवर्तनांक म्हणजे काय?', correctAnswer: 'एका माध्यमातून दुसऱ्या माध्यमात जाताना प्रकाशाच्या वेगातील गुणोत्तराला अपवर्तनांक म्हणतात.' },
      ],
    },
  },

  // 16. SCIENCE 2 (विज्ञान आणि तंत्रज्ञान भाग २)
  science2: {
    general: {
      blanks: [
        { id: 's2b1', question: 'सजीवांमध्ये ऊर्जा निर्मितीसाठी पेशीमध्ये _____ चक्र घडून येते.', correctAnswer: 'क्रेब्स (Krebs)' },
        { id: 's2b2', question: 'उत्क्रांतीचा नैसर्गिक निवडीचा सिद्धांत _____ यांनी मांडला.', correctAnswer: 'चार्ल्स डार्विन' },
        { id: 's2b3', question: 'मानवामध्ये गुणसूत्रांची एकूण _____ जोड्या असतात.', correctAnswer: '२३' },
        { id: 's2b4', question: 'पर्यावरणामध्ये अजैविक व जैविक घटकांच्या परस्परसंबंधास _____ संस्था म्हणतात.', correctAnswer: 'परिसंस्था (Ecosystem)' },
        { id: 's2b5', question: 'जागतिक पर्यावरण दिन _____ जून रोजी साजरा केला जातो.', correctAnswer: '५' },
      ],
      matches: [
        { id: 's2m1', left: 'डार्विन सिद्धांत', right: 'नैसर्गिक निवडीचा सिद्धांत' },
        { id: 's2m2', left: 'पेशीचे ऊर्जा केंद्र', right: 'तंतुकणिका (Mitochondria)' },
        { id: 's2m3', left: 'जागतिक पर्यावरण दिन', right: '५ जून' },
        { id: 's2m4', left: 'मानवी गुणसूत्रे', right: '४६ (२३ जोड्या)' },
        { id: 's2m5', left: 'अनैसर्गिक ऊर्जा', right: 'सौर ऊर्जा, पवन ऊर्जा' },
      ],
      mcqs: [
        {
          id: 's2c1',
          question: 'उत्क्रांतीचा जनक कोणास मानले जाते?',
          options: ['चार्ल्स डार्विन', 'मेंडेल', 'लॅमार्क', 'रॉबर्ट हुक'],
          correctAnswer: 'चार्ल्स डार्विन',
        },
        {
          id: 's2c2',
          question: 'पेशीचे ‘ऊर्जा निर्मिती केंद्र’ कोणास म्हणतात?',
          options: ['तंतुकणिका', 'लयकारिका', 'केंद्रक', 'हरितलवक'],
          correctAnswer: 'तंतुकणिका',
        },
        {
          id: 's2c3',
          question: 'जागतिक पर्यावरण दिन कधी साजरा केला जातो?',
          options: ['५ जून', '२२ मार्च', '१६ सप्टेंबर', '२१ जून'],
          correctAnswer: '५ जून',
        },
        {
          id: 's2c4',
          question: 'अमीबामध्ये होणारे अलैंगिक प्रजनन कोणत्या पद्धतीचे असते?',
          options: ['द्विविभाजन (Binary fission)', 'मुकुलायन', 'खंडीभवन', 'पुनर्जनन'],
          correctAnswer: 'द्विविभाजन (Binary fission)',
        },
        {
          id: 's2c5',
          question: 'आपत्ती व्यवस्थापन कायद्याची अंमलबजावणी भारतात कोणत्या वर्षापासून झाली?',
          options: ['२००५', '२०००', '१९९५', '२०१०'],
          correctAnswer: '२००५',
        },
      ],
      oneLiners: [
        { id: 's2d1', question: 'उत्क्रांती म्हणजे काय?', correctAnswer: 'सजीवांमध्ये अत्यंत संथ गतीने होणारा क्रमिक व अनुकूल बदल म्हणजे उत्क्रांती.' },
        { id: 's2d2', question: 'एटीपी (ATP) चे पूर्ण रूप काय आहे?', correctAnswer: 'Adenosine Triphosphate (अ‍ॅडिनोसीन ट्रायफॉस्फेट - पेशीचे ऊर्जारूप चलन).' },
        { id: 's2d3', question: 'परिसंस्था म्हणजे काय?', correctAnswer: 'जैविक आणि अजैविक घटक आणि त्यांच्यातील परस्पर आंतरक्रिया मिळून परिसंस्था बनते.' },
        { id: 's2d4', question: 'पुनरुत्पादन (प्रजनन) म्हणजे काय?', correctAnswer: 'एका सजीवापासून त्याच प्रजातीचा नवीन सजीव तयार होण्याची जैविक प्रक्रिया म्हणजे प्रजनन.' },
        { id: 's2d5', question: 'आपत्तीचे दोन प्रमुख प्रकार कोणते?', correctAnswer: 'नैसर्गिक आपत्ती (उदा. भूकंप, पूर) आणि मानवनिर्मित आपत्ती (उदा. आग, अपघात).' },
      ],
    },
  },

  // 17. CIVICS & POLITICAL SCIENCE (नागरिकशास्त्र / राज्यशास्त्र)
  civics_pol: {
    general: {
      blanks: [
        { id: 'cb1', question: 'भारताचे संविधान _____ रोजी संपूर्ण देशात लागू झाले.', correctAnswer: '२६ जानेवारी १९५०' },
        { id: 'cb2', question: 'भारतीय राज्यघटनेचे शिल्पकार डॉ. _____ हे आहेत.', correctAnswer: 'बाबासाहेब आंबेडकर' },
        { id: 'cb3', question: 'लोकसभेच्या सदस्यांची निवडणूक दर _____ वर्षांनी होते.', correctAnswer: '५' },
        { id: 'cb4', question: 'महाराष्ट्राच्या विधिमंडळाची दोन सभागृहे विधानसभा व _____ ही आहेत.', correctAnswer: 'विधानपरिषद' },
        { id: 'cb5', question: 'मतदानाचा अधिकार मिळण्यासाठी किमान वय _____ वर्षे पूर्ण असावे लागते.', correctAnswer: '१८' },
      ],
      matches: [
        { id: 'cm1', left: 'राज्यघटनेचे शिल्पकार', right: 'डॉ. बाबासाहेब आंबेडकर' },
        { id: 'cm2', left: 'प्रजासत्ताक दिन', right: '२६ जानेवारी' },
        { id: 'cm3', left: 'मतदान पात्रता वय', right: '१८ वर्षे' },
        { id: 'cm4', left: 'लोकसभेचा कार्यकाळ', right: '५ वर्षे' },
        { id: 'cm5', left: 'ग्रामपंचायतीचे सचिव', right: 'ग्रामसेवक' },
      ],
      mcqs: [
        {
          id: 'cc1',
          question: 'भारतीय राज्यघटनेनुसार देशाचा सर्वोच्च नागरिक कोण असतो?',
          options: ['राष्ट्रपती', 'पंतप्रधान', 'मुख्य न्यायाधीश', 'राज्यपाल'],
          correctAnswer: 'राष्ट्रपती',
        },
        {
          id: 'cc2',
          question: 'संसदेचे वरिष्ठ सभागृह कोणते आहे?',
          options: ['राज्यसभा', 'लोकसभा', 'विधानपरिषद', 'मंत्रिमंडळ'],
          correctAnswer: 'राज्यसभा',
        },
        {
          id: 'cc3',
          question: 'ग्रामसभेचे अध्यक्षस्थान कोण भूषवतो?',
          options: ['सरपंच', 'ग्रामसेवक', 'तलाठी', 'तहसीलदार'],
          correctAnswer: 'सरपंच',
        },
        {
          id: 'cc4',
          question: 'महाराष्ट्राची राजधानी कोणती आहे?',
          options: ['मुंबई', 'पुणे', 'नागपूर', 'नाशिक'],
          correctAnswer: 'मुंबई',
        },
        {
          id: 'cc5',
          question: 'मूलभूत हक्कांचे संरक्षण करण्याचे काम कोणाकडे असते?',
          options: ['न्यायालय (न्यायव्यवस्था)', 'पोलीस', 'संसद', 'बँक'],
          correctAnswer: 'न्यायालय (न्यायव्यवस्था)',
        },
      ],
      oneLiners: [
        { id: 'cd1', question: 'संविधान म्हणजे काय?', correctAnswer: 'देशाचा कारभार चालवण्यासाठी तयार करण्यात आलेला मूलभूत नियमांचा अधिकृत ग्रंथ म्हणजे संविधान.' },
        { id: 'cd2', question: 'भारतात लोकशाहीचे कोणते स्वरूप स्वीकारले आहे?', correctAnswer: 'संसदीय प्रातिनिधिक लोकशाही.' },
        { id: 'cd3', question: 'संसदेची दोन सभागृहे कोणती?', correctAnswer: 'लोकसभा (कनिष्ठ सभागृह) आणि राज्यसभा (वरिष्ठ सभागृह).' },
        { id: 'cd4', question: 'ग्रामपंचायतीच्या मुख्य लोकनियुक्त पदाधिकाऱ्यास काय म्हणतात?', correctAnswer: 'सरपंच.' },
        { id: 'cd5', question: 'भारतीय नागरिकांना संविधानाने दिलेला कोणताही एक मूलभूत हक्क सांगा.', correctAnswer: 'समानतेचा हक्क किंवा स्वातंत्र्याचा हक्क.' },
      ],
    },
  },
};

// Shuffler
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
  subject: string,  // 'maths' | 'science' | 'marathi' | 'hindi' | 'english' | 'history' | 'geography' | 'defense' | 'water_sec'
  unitKey: string = '',
  examTitle: string = 'घटक चाचणी परीक्षा क्र. १',
  seed: number = Date.now()
): CompleteQuestionPaper {
  // Find bank for subject
  const subjectBanks = QUESTION_BANKS[subject] || QUESTION_BANKS['maths'];
  const firstUnitKey = unitKey && subjectBanks[unitKey] ? unitKey : Object.keys(subjectBanks)[0];
  const bank = subjectBanks[firstUnitKey];

  // Pick exactly 5 items for each section, shuffled using the seed to ensure NO duplicates and FRESH questions
  const shuffledBlanks = shuffleArray(bank.blanks, seed).slice(0, 5);
  const shuffledMatches = shuffleArray(bank.matches, seed + 101).slice(0, 5);
  const shuffledMcqs = shuffleArray(bank.mcqs, seed + 202).slice(0, 5);
  const shuffledOneLiners = shuffleArray(bank.oneLiners, seed + 303).slice(0, 5);

  const shuffledRightColumn = shuffleArray(shuffledMatches.map((m) => m.right), seed + 404);

  const stdNameMap: Record<string, string> = {
    std6: 'इयत्ता ६ वी',
    std7: 'इयत्ता ७ वी',
    std8: 'इयत्ता ८ वी',
    std9: 'इयत्ता ९ वी',
    std10: 'इयत्ता १० वी',
  };

  const subjectNameMap: Record<string, string> = {
    marathi: 'मराठी (प्रथम भाषा)',
    hindi: 'हिंदी (द्वितीय भाषा)',
    english: 'इंग्रजी (तृतीय भाषा)',
    maths: 'गणित (Mathematics)',
    maths_algebra: 'गणित भाग १ (बीजगणित / Algebra)',
    maths_geometry: 'गणित भाग २ (भूमिती / Geometry)',
    science: 'विज्ञान आणि तंत्रज्ञान (General Science)',
    science1: 'विज्ञान आणि तंत्रज्ञान भाग १ (Science 1)',
    science2: 'विज्ञान आणि तंत्रज्ञान भाग २ (Science 2)',
    history: 'इतिहास (History)',
    civics_pol: 'नागरिकशास्त्र व राज्यशास्त्र (Civics & Pol. Science)',
    geography: 'भूगोल (Geography)',
    defense: 'संरक्षण शास्त्र (Defense Studies)',
    water_sec: 'जलसुरक्षा (Water Security)',
    health_pe: 'आरोग्य व शारीरिक शिक्षण (Health & P.E.)',
    art: 'कला शिक्षण (Art Education)',
    work_exp: 'कार्यानुभव (Work Experience)',
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
