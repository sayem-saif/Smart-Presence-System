import { School, Student, AttendanceRecord, DailySchoolAttendance, Teacher } from '../types';
// Teacher data for each school
export const teachers: { [schoolUid: string]: Teacher[] } = {
  PUN001: [
    { id: 'T001-001', name: 'Harpreet Singh', subject: 'Math', salary: 25000 },
    { id: 'T001-002', name: 'Kulwinder Kaur', subject: 'English', salary: 25000 },
    { id: 'T001-003', name: 'Balwinder Singh', subject: 'Punjabi', salary: 25000 },
    { id: 'T001-004', name: 'Simran Kaur', subject: 'Science', salary: 25000 },
    { id: 'T001-005', name: 'Jasbir Singh', subject: 'Social Studies', salary: 25000 },
    { id: 'T001-006', name: 'Manpreet Kaur', subject: 'Hindi', salary: 25000 },
    { id: 'T001-007', name: 'Gurpreet Singh', subject: 'EVS', salary: 25000 },
    { id: 'T001-008', name: 'Navjot Kaur', subject: 'Computer', salary: 25000 },
  ],
  PUN002: [
    { id: 'T002-001', name: 'Baljinder Singh', subject: 'Math', salary: 25000 },
    { id: 'T002-002', name: 'Jaswinder Kaur', subject: 'English', salary: 25000 },
    { id: 'T002-003', name: 'Harbhajan Singh', subject: 'Punjabi', salary: 25000 },
    { id: 'T002-004', name: 'Ramandeep Kaur', subject: 'Science', salary: 25000 },
    { id: 'T002-005', name: 'Sukhdeep Singh', subject: 'Social Studies', salary: 25000 },
    { id: 'T002-006', name: 'Navpreet Kaur', subject: 'Hindi', salary: 25000 },
    { id: 'T002-007', name: 'Balwinder Singh', subject: 'EVS', salary: 25000 },
    { id: 'T002-008', name: 'Simranjit Kaur', subject: 'Computer', salary: 25000 },
    { id: 'T002-009', name: 'Rajveer Singh', subject: 'Math', salary: 25000 },
    { id: 'T002-010', name: 'Harnoor Kaur', subject: 'English', salary: 25000 },
    { id: 'T002-011', name: 'Tejpreet Singh', subject: 'Punjabi', salary: 25000 },
    { id: 'T002-012', name: 'Kirandeep Kaur', subject: 'Science', salary: 25000 },
  ],
  SRU_077: [
    { id: 'SRU-T-001', name: 'Amit Sharma', subject: 'Mathematics', salary: 50000 },
    { id: 'SRU-T-002', name: 'Priya Verma', subject: 'Physics', salary: 52000 },
    { id: 'SRU-T-003', name: 'Rahul Mehta', subject: 'Chemistry', salary: 51000 }
  ]
};
export const schools: School[] = [
  // Amritsar District
  {
    uid: 'PUN001',
    name: 'Govt Primary School, Majitha',
    district: 'Amritsar',
    principalName: 'Sukhbir Singh',
    totalStudents: 156,
    totalTeachers: 8,
    totalFundDisbursed: 78000,
    password: 'school123'
  },
  {
    uid: 'PUN002',
    name: 'Govt Middle School, Rayya',
    district: 'Amritsar',
    principalName: 'Harleen Kaur',
    totalStudents: 189,
    totalTeachers: 12,
    totalFundDisbursed: 95000,
    password: 'school123'
  },
  {
    uid: 'PUN003',
    name: 'Govt Senior Secondary School, Tarn Taran',
    district: 'Amritsar',
    principalName: 'Manpreet Singh',
    totalStudents: 245,
    totalTeachers: 18,
    totalFundDisbursed: 125000,
    password: 'school123'
  },
  
  // Ludhiana District
  {
    uid: 'PUN004',
    name: 'Govt Primary School, Khanna',
    district: 'Ludhiana',
    principalName: 'Gurpreet Kaur',
    totalStudents: 134,
    totalTeachers: 7,
    totalFundDisbursed: 67000,
    password: 'school123'
  },
  {
    uid: 'PUN005',
    name: 'Govt Middle School, Samrala',
    district: 'Ludhiana',
    principalName: 'Jaswinder Singh',
    totalStudents: 198,
    totalTeachers: 14,
    totalFundDisbursed: 99000,
    password: 'school123'
  },
  {
    uid: 'PUN006',
    name: 'Govt High School, Payal',
    district: 'Ludhiana',
    principalName: 'Amandeep Kaur',
    totalStudents: 223,
    totalTeachers: 16,
    totalFundDisbursed: 112000,
    password: 'school123'
  },

  // Patiala District
  {
    uid: 'PUN007',
    name: 'Govt Primary School, Rajpura',
    district: 'Patiala',
    principalName: 'Baljit Singh',
    totalStudents: 142,
    totalTeachers: 8,
    totalFundDisbursed: 71000,
    password: 'school123'
  },
  {
    uid: 'PUN008',
    name: 'Govt Middle School, Nabha',
    district: 'Patiala',
    principalName: 'Navjot Kaur',
    totalStudents: 176,
    totalTeachers: 11,
    totalFundDisbursed: 88000,
    password: 'school123'
  },
  {
    uid: 'PUN009',
    name: 'Govt Senior Secondary School, Sanour',
    district: 'Patiala',
    principalName: 'Ranjit Singh',
    totalStudents: 267,
    totalTeachers: 20,
    totalFundDisbursed: 134000,
    password: 'school123'
  },

  // Jalandhar District
  {
    uid: 'PUN010',
    name: 'Govt Primary School, Nakodar',
    district: 'Jalandhar',
    principalName: 'Kirandeep Kaur',
    totalStudents: 128,
    totalTeachers: 7,
    totalFundDisbursed: 64000,
    password: 'school123'
  },
  {
    uid: 'PUN011',
    name: 'Govt Middle School, Phillaur',
    district: 'Jalandhar',
    principalName: 'Sukhdeep Singh',
    totalStudents: 201,
    totalTeachers: 13,
    totalFundDisbursed: 101000,
    password: 'school123'
  },
  {
    uid: 'PUN012',
    name: 'Govt High School, Shahkot',
    district: 'Jalandhar',
    principalName: 'Mandeep Kaur',
    totalStudents: 234,
    totalTeachers: 17,
    totalFundDisbursed: 117000,
    password: 'school123'
  },

  // Bathinda District
  {
    uid: 'PUN013',
    name: 'Govt Primary School, Rampura Phul',
    district: 'Bathinda',
    principalName: 'Harpreet Singh',
    totalStudents: 119,
    totalTeachers: 6,
    totalFundDisbursed: 60000,
    password: 'school123'
  },
  {
    uid: 'PUN014',
    name: 'Govt Middle School, Talwandi Sabo',
    district: 'Bathinda',
    principalName: 'Simranjeet Kaur',
    totalStudents: 187,
    totalTeachers: 12,
    totalFundDisbursed: 94000,
    password: 'school123'
  },
  {
    uid: 'PUN015',
    name: 'Govt Senior Secondary School, Maur',
    district: 'Bathinda',
    principalName: 'Gagandeep Singh',
    totalStudents: 289,
    totalTeachers: 22,
    totalFundDisbursed: 145000,
    password: 'school123'
  },

  // Ferozepur District
  {
    uid: 'PUN016',
    name: 'Govt Primary School, Zira',
    district: 'Ferozepur',
    principalName: 'Lovepreet Kaur',
    totalStudents: 145,
    totalTeachers: 8,
    totalFundDisbursed: 73000,
    password: 'school123'
  },
  {
    uid: 'PUN017',
    name: 'Govt Middle School, Fazilka',
    district: 'Ferozepur',
    principalName: 'Inderjeet Singh',
    totalStudents: 167,
    totalTeachers: 10,
    totalFundDisbursed: 84000,
    password: 'school123'
  },
  {
    uid: 'PUN018',
    name: 'Govt High School, Guru Har Sahai',
    district: 'Ferozepur',
    principalName: 'Ramandeep Kaur',
    totalStudents: 212,
    totalTeachers: 15,
    totalFundDisbursed: 106000,
    password: 'school123'
  },

  // Moga District
  {
    uid: 'PUN019',
    name: 'Govt Primary School, Baghapurana',
    district: 'Moga',
    principalName: 'Arshdeep Singh',
    totalStudents: 138,
    totalTeachers: 7,
    totalFundDisbursed: 69000,
    password: 'school123'
  },
  {
    uid: 'PUN020',
    name: 'Govt Middle School, Nihal Singh Wala',
    district: 'Moga',
    principalName: 'Jaspreet Kaur',
    totalStudents: 179,
    totalTeachers: 11,
    totalFundDisbursed: 90000,
    password: 'school123'
  },

  // Sangrur District
  {
    uid: 'PUN021',
    name: 'Govt Primary School, Dhuri',
    district: 'Sangrur',
    principalName: 'Karamjit Singh',
    totalStudents: 152,
    totalTeachers: 8,
    totalFundDisbursed: 76000,
    password: 'school123'
  },
  {
    uid: 'PUN022',
    name: 'Govt Middle School, Malerkotla',
    district: 'Sangrur',
    principalName: 'Navneet Kaur',
    totalStudents: 194,
    totalTeachers: 13,
    totalFundDisbursed: 97000,
    password: 'school123'
  },

  // Mansa District
  {
    uid: 'PUN023',
    name: 'Govt Primary School, Budhlada',
    district: 'Mansa',
    principalName: 'Gursewak Singh',
    totalStudents: 126,
    totalTeachers: 6,
    totalFundDisbursed: 63000,
    password: 'school123'
  },
  {
    uid: 'PUN024',
    name: 'Govt Middle School, Sardulgarh',
    district: 'Mansa',
    principalName: 'Rupinder Kaur',
    totalStudents: 158,
    totalTeachers: 9,
    totalFundDisbursed: 79000,
    password: 'school123'
  },

  // Fatehgarh Sahib District
  {
    uid: 'PUN025',
    name: 'Govt Primary School, Sirhind',
    district: 'Fatehgarh Sahib',
    principalName: 'Taranjeet Singh',
    totalStudents: 141,
    totalTeachers: 7,
    totalFundDisbursed: 71000,
    password: 'school123'
  },
  // SR University (Custom Entry)
  {
  uid: 'SRU_077',
  name: 'SR University',
  district: 'Warangal, Telangana',
  viceChancellor: 'Deepak Garg',
  principalName: 'Dr. S.S. Rao',
  totalStudents: 1200,
  totalTeachers: 80,
  totalFundDisbursed: 0,
  password: 'school123'
  }
];

export const students: { [schoolUid: string]: Student[] } = {
  PUN001: [
    { id: 'S001-001', name: 'Arjun Singh', rollNumber: '001', class: '5', section: 'A', fatherName: 'Balwinder Singh' },
    { id: 'S001-002', name: 'Simran Kaur', rollNumber: '002', class: '5', section: 'A', fatherName: 'Gurdeep Singh' },
    { id: 'S001-003', name: 'Manpreet Singh', rollNumber: '003', class: '4', section: 'B', fatherName: 'Jasbir Singh' },
    { id: 'S001-004', name: 'Harleen Kaur', rollNumber: '004', class: '4', section: 'A', fatherName: 'Sukhwinder Singh' },
    { id: 'S001-005', name: 'Gurbir Singh', rollNumber: '005', class: '3', section: 'A', fatherName: 'Kuldeep Singh' },
    { id: 'S001-006', name: 'Jasleen Kaur', rollNumber: '006', class: '5', section: 'B', fatherName: 'Amarjit Singh' },
    { id: 'S001-007', name: 'Taranjit Singh', rollNumber: '007', class: '4', section: 'A', fatherName: 'Ranjit Singh' },
    { id: 'S001-008', name: 'Navneet Kaur', rollNumber: '008', class: '3', section: 'B', fatherName: 'Harjit Singh' },
    { id: 'S001-009', name: 'Jaskiran Kaur', rollNumber: '009', class: '5', section: 'A', fatherName: 'Maninder Singh' },
    { id: 'S001-010', name: 'Amarpreet Singh', rollNumber: '010', class: '2', section: 'A', fatherName: 'Sukhdev Singh' },
  ],
  PUN002: [
    { id: 'S002-001', name: 'Rajveer Singh', rollNumber: '001', class: '8', section: 'A', fatherName: 'Gurpreet Singh' },
    { id: 'S002-002', name: 'Harnoor Kaur', rollNumber: '002', class: '7', section: 'B', fatherName: 'Lakhwinder Singh' },
    { id: 'S002-003', name: 'Tejpreet Singh', rollNumber: '003', class: '8', section: 'A', fatherName: 'Inderjit Singh' },
    { id: 'S002-004', name: 'Kirandeep Kaur', rollNumber: '004', class: '6', section: 'B', fatherName: 'Baljit Singh' },
    { id: 'S002-005', name: 'Sukhmani Kaur', rollNumber: '005', class: '7', section: 'A', fatherName: 'Davinder Singh' },
    { id: 'S002-006', name: 'Amanbir Singh', rollNumber: '006', class: '8', section: 'B', fatherName: 'Gurjit Singh' },
    { id: 'S002-007', name: 'Pawanpreet Kaur', rollNumber: '007', class: '6', section: 'A', fatherName: 'Satvinder Singh' },
    { id: 'S002-008', name: 'Harmanpreet Singh', rollNumber: '008', class: '7', section: 'B', fatherName: 'Joginder Singh' },
    { id: 'S002-009', name: 'Jaspreet Kaur', rollNumber: '009', class: '8', section: 'A', fatherName: 'Paramjit Singh' },
    { id: 'S002-010', name: 'Navjot Singh', rollNumber: '010', class: '6', section: 'A', fatherName: 'Kulwant Singh' },
  ],
  PUN003: [
    { id: 'S003-001', name: 'Gurmeet Singh', rollNumber: '001', class: '12', section: 'A', fatherName: 'Paramjit Singh' },
    { id: 'S003-002', name: 'Jasbir Kaur', rollNumber: '002', class: '11', section: 'B', fatherName: 'Baljinder Singh' },
    { id: 'S003-003', name: 'Harjot Singh', rollNumber: '003', class: '12', section: 'A', fatherName: 'Surinder Singh' },
    { id: 'S003-004', name: 'Mandeep Kaur', rollNumber: '004', class: '10', section: 'A', fatherName: 'Jaswinder Singh' },
    { id: 'S003-005', name: 'Kulwinder Singh', rollNumber: '005', class: '11', section: 'B', fatherName: 'Harbhajan Singh' },
    { id: 'S003-006', name: 'Ramandeep Kaur', rollNumber: '006', class: '12', section: 'B', fatherName: 'Gurcharan Singh' },
    { id: 'S003-007', name: 'Sukhdeep Singh', rollNumber: '007', class: '10', section: 'A', fatherName: 'Avtar Singh' },
    { id: 'S003-008', name: 'Navpreet Kaur', rollNumber: '008', class: '11', section: 'A', fatherName: 'Mohinder Singh' },
    { id: 'S003-009', name: 'Balwinder Singh', rollNumber: '009', class: '12', section: 'A', fatherName: 'Kuldip Singh' },
    { id: 'S003-010', name: 'Simranjit Kaur', rollNumber: '010', class: '10', section: 'B', fatherName: 'Rajinder Singh' },
  ],
  PUN004: [
    { id: 'S004-001', name: 'Jasmeet Singh', rollNumber: '001', class: '4', section: 'A', fatherName: 'Harpreet Singh' },
    { id: 'S004-002', name: 'Komalpreet Kaur', rollNumber: '002', class: '3', section: 'B', fatherName: 'Sukhpal Singh' },
    { id: 'S004-003', name: 'Lovepreet Singh', rollNumber: '003', class: '5', section: 'A', fatherName: 'Manjit Singh' },
    { id: 'S004-004', name: 'Gurleen Kaur', rollNumber: '004', class: '4', section: 'B', fatherName: 'Baldev Singh' },
    { id: 'S004-005', name: 'Harkirat Singh', rollNumber: '005', class: '3', section: 'A', fatherName: 'Jagjit Singh' },
    { id: 'S004-006', name: 'Navleen Kaur', rollNumber: '006', class: '5', section: 'B', fatherName: 'Parminder Singh' },
    { id: 'S004-007', name: 'Sahibjot Singh', rollNumber: '007', class: '4', section: 'A', fatherName: 'Charanjit Singh' },
    { id: 'S004-008', name: 'Mannat Kaur', rollNumber: '008', class: '3', section: 'A', fatherName: 'Daljit Singh' },
    { id: 'S004-009', name: 'Ekampreet Singh', rollNumber: '009', class: '5', section: 'A', fatherName: 'Satpal Singh' },
    { id: 'S004-010', name: 'Gursharan Kaur', rollNumber: '010', class: '4', section: 'B', fatherName: 'Nirmal Singh' },
  ],
  PUN005: [
    { id: 'S005-001', name: 'Harshdeep Singh', rollNumber: '001', class: '7', section: 'A', fatherName: 'Kulbir Singh' },
    { id: 'S005-002', name: 'Jasnoor Kaur', rollNumber: '002', class: '6', section: 'B', fatherName: 'Raman Singh' },
    { id: 'S005-003', name: 'Navdeep Singh', rollNumber: '003', class: '8', section: 'A', fatherName: 'Balbir Singh' },
    { id: 'S005-004', name: 'Simranpreet Kaur', rollNumber: '004', class: '7', section: 'B', fatherName: 'Gurnam Singh' },
    { id: 'S005-005', name: 'Jatinder Singh', rollNumber: '005', class: '6', section: 'A', fatherName: 'Sukhchain Singh' },
    { id: 'S005-006', name: 'Harmandeep Kaur', rollNumber: '006', class: '8', section: 'B', fatherName: 'Jaswant Singh' },
    { id: 'S005-007', name: 'Gurpreet Singh', rollNumber: '007', class: '7', section: 'A', fatherName: 'Kartar Singh' },
    { id: 'S005-008', name: 'Navjeet Kaur', rollNumber: '008', class: '6', section: 'A', fatherName: 'Harbans Singh' },
    { id: 'S005-009', name: 'Sukhman Singh', rollNumber: '009', class: '8', section: 'A', fatherName: 'Gurbachan Singh' },
    { id: 'S005-010', name: 'Jaspreet Kaur', rollNumber: '010', class: '7', section: 'B', fatherName: 'Pritam Singh' },
  ]
};

// Generate comprehensive student data for all schools
schools.forEach(school => {
  if (school.uid === 'SRU_077') {
    // Do not generate students for SR University; use only database data
    return;
  }
  if (!students[school.uid]) {
    students[school.uid] = [];
  }
  const currentStudents = students[school.uid].length;
  const additionalStudents = school.totalStudents - currentStudents;
  const maleNames = ['Arshdeep', 'Balpreet', 'Charanjit', 'Diljit', 'Ekam', 'Fateh', 'Gagan', 'Harman', 'Ikjot', 'Jaskaran', 'Karan', 'Lakhwinder', 'Manveer', 'Navjot', 'Onkar'];
  const femaleNames = ['Amanpreet', 'Baljeet', 'Charanjeet', 'Dilpreet', 'Ekamjot', 'Fatehpreet', 'Gagandeep', 'Harpreet', 'Ikjeet', 'Jasmeet', 'Karanpreet', 'Lovepreet', 'Manpreet', 'Navpreet', 'Onkarpreet'];
  const fatherNames = ['Amarjit Singh', 'Baljinder Singh', 'Charanjit Singh', 'Daljit Singh', 'Gurbachan Singh', 'Harjit Singh', 'Jasbir Singh', 'Kulwinder Singh', 'Lakhwinder Singh', 'Manjit Singh'];
  for (let i = 0; i < additionalStudents; i++) {
    const isGirl = Math.random() > 0.5;
    const name = isGirl ? 
      femaleNames[Math.floor(Math.random() * femaleNames.length)] + ' Kaur' :
      maleNames[Math.floor(Math.random() * maleNames.length)] + ' Singh';
    const classes = school.name.includes('Primary') ? ['1', '2', '3', '4', '5'] :
                   school.name.includes('Middle') ? ['6', '7', '8'] :
                   school.name.includes('High') ? ['9', '10'] :
                   ['9', '10', '11', '12'];
    const sections = ['A', 'B', 'C'];
    students[school.uid].push({
      id: `${school.uid}-${String(currentStudents + i + 1).padStart(3, '0')}`,
      name: name,
      rollNumber: String(currentStudents + i + 1).padStart(3, '0'),
      class: classes[Math.floor(Math.random() * classes.length)],
      section: sections[Math.floor(Math.random() * sections.length)],
      fatherName: fatherNames[Math.floor(Math.random() * fatherNames.length)]
    });
  }
});

// Generate attendance records for previous 30 days for all students
const generateAttendanceRecords = (): AttendanceRecord[] => {
  const records: AttendanceRecord[] = [];
  const days = 30;
  for (let d = 0; d < days; d++) {
    const dateObj = new Date();
    dateObj.setDate(dateObj.getDate() - d);
    const date = dateObj.toISOString().split('T')[0];
    Object.entries(students).forEach(([schoolUid, schoolStudents]) => {
      schoolStudents.forEach((student) => {
        // Rural schools typically have 70-85% attendance
        const baseAttendanceRate = 0.75 + Math.random() * 0.1;
        const isPresent = Math.random() < baseAttendanceRate;
        records.push({
          id: `ATT-${schoolUid}-${student.id}-${date}`,
          studentId: student.id,
          studentName: student.name,
          class: student.class,
          section: student.section,
          date: date,
          status: isPresent ? 'Present' : 'Absent',
          markedAt: `${date} ${String(8 + Math.floor(Math.random() * 2)).padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}:00`,
          method: 'Biometric'
        });
      });
    });
  }
  return records;
};

export const attendanceRecords = generateAttendanceRecords();

// Generate daily school attendance for the past month with teacher data
export const dailySchoolAttendance: DailySchoolAttendance[] = [];

schools.forEach(school => {
  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    // Rural schools have varying attendance patterns
    const baseStudentAttendance = 0.70 + Math.random() * 0.20;
    const baseTeacherAttendance = 0.80 + Math.random() * 0.15;
    
    const studentsPresent = Math.floor(school.totalStudents * baseStudentAttendance);
    const teachersPresent = Math.floor(school.totalTeachers * baseTeacherAttendance);
    
    dailySchoolAttendance.push({
      schoolUid: school.uid,
      date: dateStr,
      studentsPresent,
      teachersPresent,
      totalStudents: school.totalStudents,
      totalTeachers: school.totalTeachers,
      attendancePercentage: Math.round((studentsPresent / school.totalStudents) * 100)
    });
  }
});

export const adminCredentials = {
  adminId: 'admin',
  password: 'admin123'
};

// Auto-generate teacher data for schools missing it
const teacherNames = [
  'Harpreet Singh', 'Kulwinder Kaur', 'Balwinder Singh', 'Simran Kaur', 'Jasbir Singh', 'Manpreet Kaur', 'Gurpreet Singh', 'Navjot Kaur',
  'Baljinder Singh', 'Jaswinder Kaur', 'Harbhajan Singh', 'Ramandeep Kaur', 'Sukhdeep Singh', 'Navpreet Kaur', 'Simranjit Kaur', 'Rajveer Singh',
  'Harnoor Kaur', 'Tejpreet Singh', 'Kirandeep Kaur', 'Paramjit Kaur', 'Amandeep Singh', 'Sandeep Kaur', 'Gagandeep Singh', 'Ravinder Kaur'
];
const subjects = ['Math', 'English', 'Punjabi', 'Science', 'Social Studies', 'Hindi', 'EVS', 'Computer'];

schools.forEach(school => {
  if (!teachers[school.uid]) {
    teachers[school.uid] = [];
    for (let i = 0; i < school.totalTeachers; i++) {
      teachers[school.uid].push({
        id: `${school.uid}-T${String(i+1).padStart(3, '0')}`,
        name: teacherNames[(i + school.totalTeachers) % teacherNames.length],
        subject: subjects[i % subjects.length],
        salary: 25000
      });
    }
  }
});

// Auto-generate teacher attendance records for last 30 days
const teacherAttendanceRecords: { [teacherId: string]: AttendanceRecord[] } = {};
schools.forEach(school => {
  if (teachers[school.uid]) {
    teachers[school.uid].forEach(teacher => {
      teacherAttendanceRecords[teacher.id] = [];
      for (let d = 0; d < 30; d++) {
        const date = new Date();
        date.setDate(date.getDate() - d);
        teacherAttendanceRecords[teacher.id].push({
          id: `${teacher.id}-A${d+1}`,
          studentId: teacher.id, // For teachers, use teacher.id as studentId
          studentName: teacher.name, // For teachers, use teacher.name
          class: teacher.subject, // For teachers, use subject as class
          section: '',
          date: date.toISOString().slice(0, 10),
          status: Math.random() < 0.92 ? 'Present' : 'Absent',
          markedAt: date.toISOString(),
          method: 'Biometric'
        });
      }
    });
  }
});