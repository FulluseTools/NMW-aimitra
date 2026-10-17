import { GOV_OFFICES } from '../data/schoolData.ts';

export interface LetterTemplate {
  id: string;
  category: string;
  title: string;
  officeId: string;
  defaultSubject: string;
  defaultReference: string;
  bodyContent: string;
  enclosures: string[];
}

export interface GeneratedOfficialLetter {
  outwardNo: string;
  date: string;
  schoolName: string;
  schoolAddress: string;
  recipientTitle: string;
  recipientOffice: string;
  recipientLocation: string;
  subject: string;
  reference: string;
  salutation: string;
  bodyParagraphs: string[];
  enclosures: string[];
  copiesTo?: string[];
  place: string;
  signatoryTitle: string;
}

export const LETTER_TEMPLATES: LetterTemplate[] = [
  {
    id: 'salary_arrears',
    category: 'वेतन व भत्ते',
    title: 'शिक्षकांचे वेतन व थकबाकी मंजुरीबाबत पत्र',
    officeId: 'pay_unit',
    defaultSubject: 'शाळेतील सहाय्यक शिक्षकांच्या सातव्या वेतन आयोगाच्या थकबाकी देयके मंजुरीबाबत.',
    defaultReference: '१. शासन निर्णय क्र. संकीर्ण-२०१९/प्र.क्र./सेवा-३, दिनांक २८ फेब्रुवारी २०१९.',
    bodyContent: `सविनय सादर,
उपरोक्त विषयांकित संदर्भीय पत्रान्वये नामदार मुकुल वासनिक विद्यालय, आडोळ बु., ता. जळगाव जामोद येथील कार्यरत शिक्षक कर्मचाऱ्यांचे सातव्या वेतन आयोगाचे हप्ते व सुधारित वेतन निश्चितीनुसार फरक देयके तयार करण्यात आलेली आहेत.

सदर देयकांची कार्यालयाकडून विहित मुदतीत पडताळणी करण्यात येऊन शासनाकडून प्राप्त अनुदानातून थकबाकीची रक्कम मंजूर करून थेट संबंधित कर्मचाऱ्यांच्या बँक खात्यावर वर्ग करण्यात यावी, ही नम्र विनंती.

सोबत आवश्यक ती सर्व सेवापुस्तके, वेतन देयके, पडताळणी तक्ते व विहित नमुन्यातील विवरणपत्रे जोडण्यात आलेली आहेत.`,
    enclosures: [
      'वेतन थकबाकी तक्ता व देयक (२ प्रती)',
      'सेवापुस्तक पडताळणी प्रत',
      'मुख्याध्यापक शिफारस पत्र',
    ],
  },
  {
    id: 'service_book_verify',
    category: 'सेवापुस्तक व रजा',
    title: 'कर्मचाऱ्यांच्या सेवापुस्तक पडताळणी व नोंदणीबाबत',
    officeId: 'deo_sec',
    defaultSubject: 'कर्मचाऱ्यांचे प्रथम नियुक्ती ते आजपावेतोचे सेवापुस्तक नियमित पडताळणी करून घेण्याबाबत.',
    defaultReference: 'शालेय शिक्षण व क्रीडा विभाग परिपत्रक क्र. संकीर्ण-२०२१/सेवा-१.',
    bodyContent: `सविनय सादर,
आमच्या विद्यालयात कार्यरत असलेल्या शिक्षक व शिक्षकेतर कर्मचाऱ्यांच्या सेवापुस्तकातील नियमित नोंदी, पदोन्नती, निवडश्रेणी तसेच वरिष्ठ वेतनश्रेणी मंजुरीच्या अनुषंगाने सक्षम प्राधिकाऱ्यांमार्फत सेवापुस्तक पडताळणी करणे अत्यावश्यक आहे.

तरी मा. कार्यालयाने निश्चित केलेल्या दिनांकास संबंधित कर्मचाऱ्यांची मूळ सेवापुस्तके व आवश्यक कागदपत्रांसह हजर राहण्याची परवानगी मिळावी, ही नम्र विनंती आहे.`,
    enclosures: ['मूळ सेवापुस्तके', 'कर्मचारी नियुक्ती व पदमान्यता आदेश प्रत'],
  },
  {
    id: 'udise_correction',
    category: 'प्रशासकीय दुरुस्ती',
    title: 'शालेय माहिती व UDISE+ डेटा दुरुस्तीबाबत',
    officeId: 'beo_jj',
    defaultSubject: 'शैक्षणिक सत्र २०२६-२७ मधील शालेय पोर्टलवरील वर्ग तुकड्या व पटनोंद दुरुस्तीबाबत.',
    defaultReference: 'मा. शिक्षण संचालक यांचे पत्र जा.क्र. युडायस/२०२६/प्र.क्र.०५.',
    bodyContent: `महोदय,
आमच्या नामदार मुकुल वासनिक विद्यालय, आडोळ बु. या शाळेच्या ऑनलाईन पोर्टलवर शैक्षणिक सत्रातील इयत्ता ६ वी ते १० वी च्या विद्यार्थ्यांची पटनोंद व विषय निवडीमध्ये काही तांत्रिक त्रुटी निर्माण झाल्याचे निदर्शनास आले आहे.

विद्यार्थ्यांचे शैक्षणिक नुकसान होऊ नये याकरिता सदर दुरुस्ती तालुका स्तरावरून अनलॉक करून प्रमाणित करण्यात यावी.`,
    enclosures: ['वर्गनिहाय विद्यार्थ्यांची यादी व दुरुस्तीचा तपशील'],
  },
  {
    id: 'building_repair',
    category: 'इमारत व बांधकाम',
    title: 'शालेय इमारत दुरुस्ती व सुरक्षितता प्रमाणपत्र मागणी',
    officeId: 'pwd_engineer',
    defaultSubject: 'शालेय वर्गखोल्यांच्या छताची दुरुस्ती व इमारत संरचना सुरक्षितता प्रमाणपत्र मिळण्याबाबत.',
    defaultReference: 'शाळा व्यवस्थापन समिती ठराव क्र. ४, दिनांक १२ मे २०२६.',
    bodyContent: `महोदय,
आमच्या शाळेच्या इमारतीचे बांधकाम जुने असून पावसाळ्यामध्ये काही वर्गखोल्यांमध्ये पाणी गळती होण्याची शक्यता आहे. विद्यार्थ्यांच्या सुरक्षिततेच्या दृष्टीने शालेय इमारतीचे प्रत्यक्ष स्थळ पाहणी करून आवश्यक दुरुस्तीचे अंदाजपत्रक तयार करून मिळावे.

तसेच सक्षम प्राधिकाऱ्याचे इमारत सुरक्षितता प्रमाणपत्र तात्काळ निर्गमित करावे, ही विनंती.`,
    enclosures: ['शाळा व्यवस्थापन समितीचा ठराव', 'शालेय इमारतीची छायाचित्रे'],
  },
  {
    id: 'scholarship_forms',
    category: 'शिष्यवृत्ती व कल्याण',
    title: 'विद्यार्थी शिष्यवृत्ती प्रस्ताव सादर करणेबाबत',
    officeId: 'deo_sec',
    defaultSubject: 'सत्र २०२६-२७ मधील मागासवर्गीय व आर्थिक दुर्बल घटक शिष्यवृत्ती प्रस्ताव मान्यतेबाबत.',
    defaultReference: 'समाजकल्याण विभाग परिपत्रक क्र. संकीर्ण/शिष्यवृत्ती/२०२६.',
    bodyContent: `सविनय सादर,
आमच्या विद्यालयातील इयत्ता ६ वी ते १० वी मधील पात्र विद्यार्थ्यांचे शासन निर्णयानुसार सावित्रीबाई फुले दत्तक पालक योजना, माध्यमिक शिष्यवृत्ती व इतर योजनांचे अर्ज कागदपत्रांसह पडताळून ऑनलाईन भरण्यात आलेले आहेत.

सदर पात्र विद्यार्थ्यांची यादी व मूळ प्रस्ताव सोबत जोडून सादर करण्यात येत असून शिष्यवृत्तीची रक्कम विद्यार्थ्यांच्या थेट आधारसंलग्न बँक खात्यात जमा करण्याबाबत पुढील कार्यवाही व्हावी, ही नम्र विनंती.`,
    enclosures: ['पात्र विद्यार्थ्यांची प्रमाणित यादी', 'जात व उत्पन्न प्रमाणपत्रांच्या साक्षांकित प्रती'],
  },
  {
    id: 'bank_account_update',
    category: 'बँक कामकाज',
    title: 'शालेय पोषण आहार बँक खाते स्वाक्षरी बदल बाबत',
    officeId: 'sbi_jj',
    defaultSubject: 'शालेय बचत खात्यातील अधिकृत स्वाक्षरीकर्ता नोंद अद्ययावत करण्याबाबत.',
    defaultReference: 'शालेय समिती ठराव क्र. ०२.',
    bodyContent: `महोदय,
आमच्या शाळेचे आपल्या बँकेत शालेय कामकाजाचे बचत खाते कार्यरत आहे. प्रशासकीय कारणास्तव व नियमानुसार सदर खात्याचे संचालन मुख्याध्यापक यांच्या संयुक्त स्वाक्षरीने करणे आवश्यक आहे.

तरी आपल्या बँकेच्या नियमानुसार सदर खात्यावर आवश्यक ते बदल करून नवीन स्वाक्षरी कार्ड नोंदवून घ्यावे ही नम्र विनंती.`,
    enclosures: ['शालेय व्यवस्थापन समितीचा अधिकृत ठराव', 'मुख्याध्यापक ओळखपत्र व आधार कार्ड प्रत'],
  },
];

export function generateOfficialLetterText(
  templateId: string,
  customSubject?: string,
  customOfficeId?: string,
  customBody?: string,
  outwardNo: string = '_____',
  dateString?: string
): GeneratedOfficialLetter {
  const template = LETTER_TEMPLATES.find((t) => t.id === templateId) || LETTER_TEMPLATES[0];
  const office = GOV_OFFICES.find((o) => o.id === (customOfficeId || template.officeId)) || GOV_OFFICES[0];
  const currentDate = dateString || new Date().toLocaleDateString('mr-IN');

  const body = customBody || template.bodyContent;
  const paragraphs = body.split('\n\n').filter((p) => p.trim().length > 0);

  // NOTICE STRICT COMPLIANCE:
  // 1. "udise क्रमांक आणि shalarth id काढून टाकणे" - not present in the body/myana
  // 2. "जावक क्र . __ अस लिहावा" - "जावक क्र. ________"
  // 3. "स्थळ - आडोळ बु. व त्यासमोर फक्त मुख्याध्यापक स्वाक्षरी एवढेच लिहावे आपला विश्वासू, श्री. विनोद जगन्नाथ ठोंबरे हे काढून टाकावे"
  return {
    outwardNo: outwardNo.trim() ? outwardNo : '_______',
    date: currentDate,
    schoolName: 'नामदार मुकुल वासनिक विद्यालय, आडोळ बु.',
    schoolAddress: 'मु. पो. आडोळ बु., ता. जळगाव जामोद, जि. बुलढाणा',
    recipientTitle: office.title,
    recipientOffice: office.office,
    recipientLocation: office.location,
    subject: customSubject || template.defaultSubject,
    reference: template.defaultReference,
    salutation: office.title.includes('शिक्षणाधिकारी') || office.title.includes('उपसंचालक') ? 'सविनय सादर,' : 'महोदय,',
    bodyParagraphs: paragraphs,
    enclosures: template.enclosures,
    place: 'आडोळ बु.',
    signatoryTitle: 'मुख्याध्यापक स्वाक्षरी',
  };
}
