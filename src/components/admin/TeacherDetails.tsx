
import React from 'react';
import { schools, teachers } from '../../data/sampleData';

interface TeacherDetailsProps {
  schoolUid: string;
  onBack: () => void;
}

const TeacherDetails: React.FC<TeacherDetailsProps> = ({ schoolUid, onBack }) => {
  const school = schools.find(s => s.uid === schoolUid);
  const teacherList = teachers[schoolUid] || [];
  // Simulate attendance for today
  const today = new Date().toISOString().split('T')[0];
  // Generate attendance for last 30 days for percentage
  const days = 30;
  const attendanceHistory = teacherList.map(teacher => {
    let presentDays = 0;
    for (let d = 0; d < days; d++) {
      if (Math.random() < 0.85) presentDays++;
    }
    return {
      ...teacher,
      presentDays,
      percentage: Math.round((presentDays / days) * 100)
    };
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-800 p-8">
      <button onClick={onBack} className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Back</button>
      <h2 className="text-2xl font-bold mb-4 text-white">Teacher Details</h2>
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full bg-white dark:bg-slate-700/80 rounded shadow text-white text-xs sm:text-sm">
          <thead>
            <tr>
              <th className="px-4 py-2 text-white">UID</th>
              <th className="px-4 py-2 text-white">Name</th>
              <th className="px-4 py-2 text-white">Subject</th>
              <th className="px-4 py-2 text-white">Salary</th>
              <th className="px-4 py-2 text-white">Attendance</th>
            </tr>
          </thead>
          <tbody>
            {attendanceHistory.map(teacher => (
              <tr key={teacher.id}>
                <td className="border px-4 py-2 text-white">{teacher.id}</td>
                <td className="border px-4 py-2 text-white">{teacher.name}</td>
                <td className="border px-4 py-2 text-white">{teacher.subject}</td>
                <td className="border px-4 py-2 text-white">₹{teacher.salary}</td>
                <td className="border px-4 py-2 font-bold text-blue-600">{teacher.percentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mb-4">Total Teachers: {teacherList.length}</div>
      <div>Salary (Monthly): ₹{teacherList.length * 25000}</div>
    </div>
  );
};

export default TeacherDetails;
