
import React from 'react';
import { students } from '../../data/sampleData';

interface StudentDetailsProps {
  schoolUid: string;
  onBack: () => void;
}

const StudentDetails: React.FC<StudentDetailsProps> = ({ schoolUid, onBack }) => {
  const schoolStudents = students[schoolUid] || [];
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-800 p-8">
      <button onClick={onBack} className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Back</button>
      <h2 className="text-2xl font-bold mb-4 text-white">Student Details</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-slate-700/80 rounded shadow text-white text-xs sm:text-sm">
          <thead>
            <tr>
              <th className="px-4 py-2 text-white">UID</th>
              <th className="px-4 py-2 text-white">Name</th>
              <th className="px-4 py-2 text-white">Class</th>
              <th className="px-4 py-2 text-white">Section</th>
              <th className="px-4 py-2 text-white">Father Name</th>
            </tr>
          </thead>
          <tbody>
            {schoolStudents.map(student => (
              <tr key={student.id}>
                <td className="border px-4 py-2 text-white">{student.id}</td>
                <td className="border px-4 py-2 text-white">{student.name}</td>
                <td className="border px-4 py-2 text-white">{student.class}</td>
                <td className="border px-4 py-2 text-white">{student.section}</td>
                <td className="border px-4 py-2 text-white">{student.fatherName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentDetails;
