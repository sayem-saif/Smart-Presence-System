export interface Teacher {
  id: string;
  name: string;
  subject: string;
  salary: number;
}
export interface Student {
  id: string;
  name: string;
  rollNumber: string;
  class: string;
  section: string;
  fatherName: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  class: string;
  section: string;
  date: string;
  status: 'Present' | 'Absent';
  markedAt: string;
  method: 'Biometric';
}

export interface School {
  uid: string;
  name: string;
  district: string;
  viceChancellor?: string;
  totalStudents: number;
  totalTeachers: number;
  totalFundDisbursed: number;
  password: string;
}

export interface DailySchoolAttendance {
  schoolUid: string;
  date: string;
  studentsPresent: number;
  teachersPresent: number;
  totalStudents: number;
  totalTeachers: number;
  attendancePercentage: number;
}

export interface User {
  type: 'school' | 'admin';
  schoolUid?: string;
  schoolName?: string;
  adminId?: string;
}