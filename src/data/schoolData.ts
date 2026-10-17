export interface StaffMember {
  sr: number;
  name: string;
  nickName: string;
  designation: string;
  academicQual: string;
  profQual: string;
  subjects: string;
  classes: string;
  dob: string;
  appointmentDate: string;
  retirementDate: string;
  pastServiceYears: number;
  aadhaar: string;
  remarks?: string;
}

export interface SchoolInfo {
  name: string;
  address: string;
  village: string;
  taluka: string;
  district: string;
  state: string;
  udise: string;
  schoolIndex: string;
  shalarthId: string;
  contact: string;
  email: string;
  medium: string;
  board: string;
  classes: string;
  studentCountApprox: number;
  sanstha: string;
  headmaster: string;
}

export const SCHOOL_INFO: SchoolInfo = {
  name: "नामदार मुकुल वासनिक विद्यालय, आडोळ बु.",
  address: "मु. पो. आडोळ बु., ता. जळगाव जामोद, जि. बुलढाणा - ४४३४०२",
  village: "आडोळ बु.",
  taluka: "जळगाव जामोद",
  district: "बुलढाणा",
  state: "महाराष्ट्र",
  udise: "27040904602",
  schoolIndex: "04.12.018",
  shalarthId: "04630100223",
  contact: "9975889478",
  email: "nmwvidylaya@gmail.com",
  medium: "मराठी",
  board: "महाराष्ट्र राज्य माध्यमिक व उच्च माध्यमिक शिक्षण मंडळ",
  classes: "इयत्ता ६ वी ते १० वी",
  studentCountApprox: 150,
  sanstha: "समता बहुउद्देशीय शिक्षण प्रसारक मंडळ, जळगाव जामोद",
  headmaster: "श्री. विनोद जगन्नाथ ठोंबरे",
};

export const STAFF_MEMBERS: StaffMember[] = [
  {
    sr: 1,
    name: "श्री. विनोद जगन्नाथ ठोंबरे",
    nickName: "VJ",
    designation: "मुख्याध्यापक (H.M.)",
    academicQual: "M.Sc.",
    profQual: "B.Ed.",
    subjects: "गणित",
    classes: "६, १०",
    dob: "03-03-1971",
    appointmentDate: "21-06-1999",
    retirementDate: "31-03-2029",
    pastServiceYears: 25,
    aadhaar: "5293 2044 5395",
  },
  {
    sr: 2,
    name: "श्री. प्रकाश सखाराम साटोटे",
    nickName: "PS",
    designation: "ज्येष्ठ सहाय्यक शिक्षक",
    academicQual: "B.A.",
    profQual: "B.Ed.",
    subjects: "मराठी, हिन्दी, सामाजिक शास्त्रे (इतिहास)",
    classes: "८, ९, १०",
    dob: "14-02-1973",
    appointmentDate: "21-06-1999",
    retirementDate: "28-02-2031",
    pastServiceYears: 25,
    aadhaar: "3127 4351 4014",
    remarks: "मुख्याध्यापक अनुपस्थितीत प्रभारी",
  },
  {
    sr: 3,
    name: "सौ. शशिकला प्रल्हाद मोरे",
    nickName: "SP",
    designation: "ज्येष्ठ सहाय्यक शिक्षिका",
    academicQual: "B.A.",
    profQual: "B.Ed.",
    subjects: "इंग्रजी, सामाजिक शास्त्रे (भूगोल)",
    classes: "८, ९, १०",
    dob: "01-06-1975",
    appointmentDate: "21-06-1999",
    retirementDate: "30-05-2033",
    pastServiceYears: 25,
    aadhaar: "6133 2797 3288",
  },
  {
    sr: 4,
    name: "सौ. विशाखा आनंद धुंदाळे",
    nickName: "VD",
    designation: "सहाय्यक शिक्षिका",
    academicQual: "B.A.",
    profQual: "B.Ed.",
    subjects: "इंग्रजी, हिन्दी",
    classes: "६, ७, ८",
    dob: "16-10-1973",
    appointmentDate: "01-04-2001",
    retirementDate: "31-10-2031",
    pastServiceYears: 23,
    aadhaar: "9285 8171 6014",
  },
  {
    sr: 5,
    name: "श्री. निखिल सुरेशचंद्र राजवैद्य",
    nickName: "NS",
    designation: "सहाय्यक शिक्षक",
    academicQual: "B.Sc.",
    profQual: "B.Ed.",
    subjects: "विज्ञान, गणित",
    classes: "७, ८, ९, १०",
    dob: "22-03-1984",
    appointmentDate: "14-08-2007",
    retirementDate: "31-03-2042",
    pastServiceYears: 17,
    aadhaar: "2551 8149 6920",
  },
  {
    sr: 6,
    name: "श्री. प्रकाश विठ्ठल बावस्कर",
    nickName: "PV",
    designation: "सहाय्यक शिक्षक",
    academicQual: "S.S.C.",
    profQual: "A.M.",
    subjects: "मराठी, इतिहास",
    classes: "६, ७, ८",
    dob: "08-07-1979",
    appointmentDate: "18-06-2001",
    retirementDate: "31-07-2037",
    pastServiceYears: 23,
    aadhaar: "9155 6706 7771",
  },
  {
    sr: 7,
    name: "श्री. विनायक बाजीराव घ्यारे",
    nickName: "VB",
    designation: "कनिष्ठ लिपिक (Jr. Clerk)",
    academicQual: "H.S.C.",
    profQual: "-",
    subjects: "कार्यालयीन कामकाज",
    classes: "कार्यालय",
    dob: "30-04-1970",
    appointmentDate: "01-07-1996",
    retirementDate: "30-04-2028",
    pastServiceYears: 28,
    aadhaar: "5726 0341 8941",
  },
  {
    sr: 8,
    name: "श्री. दिनकर बाजीराव घ्यारे",
    nickName: "DB",
    designation: "प्रयोगशाळा परिचर (Lab Attendant)",
    academicQual: "H.S.C.",
    profQual: "-",
    subjects: "प्रयोगशाळा कार्य",
    classes: "प्रयोगशाळा",
    dob: "08-05-1974",
    appointmentDate: "21-06-1999",
    retirementDate: "31-05-2032",
    pastServiceYears: 25,
    aadhaar: "8572 8541 2222",
  },
  {
    sr: 9,
    name: "श्री. भिका तुकडा बारे",
    nickName: "BT",
    designation: "शिपाई (Peon)",
    academicQual: "८ वी पास",
    profQual: "-",
    subjects: "शालेय शिपाई कार्य",
    classes: "शाळा परिसर",
    dob: "14-12-1972",
    appointmentDate: "21-06-1999",
    retirementDate: "31-12-2032",
    pastServiceYears: 25,
    aadhaar: "2377 4010 8689",
  },
];

export const GOV_OFFICES = [
  {
    id: "deo_sec",
    title: "मा. शिक्षणाधिकारी (माध्यमिक)",
    office: "जिल्हा परिषद, बुलढाणा",
    location: "बुलढाणा",
  },
  {
    id: "deo_pri",
    title: "मा. शिक्षणाधिकारी (प्राथमिक)",
    office: "जिल्हा परिषद, बुलढाणा",
    location: "बुलढाणा",
  },
  {
    id: "beo_jj",
    title: "मा. गटशिक्षणाधिकारी",
    office: "पंचायत समिती, जळगाव जामोद",
    location: "जळगाव जामोद",
  },
  {
    id: "dd_amravati",
    title: "मा. शिक्षण उपसंचालक",
    office: "अमरावती विभाग",
    location: "अमरावती",
  },
  {
    id: "pay_unit",
    title: "मा. वेतन अधीक्षक",
    office: "वेतन पथक कार्यालय (माध्यमिक)",
    location: "बुलढाणा",
  },
  {
    id: "acct_officer",
    title: "मा. लेखाधिकारी",
    office: "शिक्षण विभाग, जिल्हा परिषद",
    location: "बुलढाणा",
  },
  {
    id: "tahsildar",
    title: "मा. तहसीलदार साहेब",
    office: "तहसील कार्यालय",
    location: "जळगाव जामोद",
  },
  {
    id: "pwd_engineer",
    title: "मा. शाखा अभियंता",
    office: "सार्वजनिक बांधकाम उपविभाग",
    location: "पिंपळगाव काळे",
  },
  {
    id: "sbi_jj",
    title: "मा. शाखाधिकारी",
    office: "भारतीय स्टेट बँक (SBI), शाखा जळगाव जामोद",
    location: "जळगाव जामोद (IFSC: SBIN0001052)",
  },
  {
    id: "cbi_pk",
    title: "मा. शाखाधिकारी",
    office: "सेंट्रल बँक ऑफ इंडिया, शाखा पिंपळगाव काळे",
    location: "पिंपळगाव काळे (IFSC: CBIN0281732)",
  },
];
