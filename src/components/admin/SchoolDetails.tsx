import React, { useState, useMemo } from 'react';
import { ArrowLeft, Users, TrendingUp, Download, Calendar, DollarSign, User } from 'lucide-react';
import { schools, dailySchoolAttendance, students } from '../../data/sampleData';

interface SchoolDetailsProps {
  schoolUid: string;
  onBack: () => void;
  onViewStudentDetails: () => void;
  onViewTeacherDetails: () => void;
}

const SchoolDetails: React.FC<SchoolDetailsProps> = ({ schoolUid, onBack, onViewStudentDetails, onViewTeacherDetails }) => {
  const school = schools.find(s => s.uid === schoolUid);
  const [viewPeriod, setViewPeriod] = useState(7); // days

  const schoolAttendanceData = useMemo(() => {
    const data = dailySchoolAttendance
      .filter(record => record.schoolUid === schoolUid)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, viewPeriod);
    
    return data.reverse(); // Show chronological order
  }, [schoolUid, viewPeriod]);

  const schoolStudents = students[schoolUid] || [];

  const avgAttendance = schoolAttendanceData.length > 0 
    ? Math.round(schoolAttendanceData.reduce((sum, record) => sum + record.attendancePercentage, 0) / schoolAttendanceData.length)
    : 0;

  const avgTeacherAttendance = schoolAttendanceData.length > 0 
    ? Math.round(schoolAttendanceData.reduce((sum, record) => sum + (record.teachersPresent / record.totalTeachers * 100), 0) / schoolAttendanceData.length)
    : 0;

  if (!school) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">School not found</h2>
          <button
            onClick={onBack}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const downloadSchoolReport = () => {
    const csvContent = [
      ['Date', 'Students Present', 'Total Students', 'Teachers Present', 'Total Teachers', 'Student Attendance %', 'Teacher Attendance %'],
      ...schoolAttendanceData.map(record => [
        record.date,
        record.studentsPresent,
        record.totalStudents,
        record.teachersPresent,
        record.totalTeachers,
        record.attendancePercentage,
        Math.round((record.teachersPresent / record.totalTeachers) * 100)
      ])
    ];
    
    const csvString = csvContent.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `school-report-${schoolUid}-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex space-x-4 mb-8">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={onViewStudentDetails}
        >
          View Student Details
        </button>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={onViewTeacherDetails}
        >
          View Teacher Details
        </button>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {school.name}
                </h1>
                <p className="text-gray-600">School UID: {school.uid} • {school.district} District</p>
              </div>
            </div>
            <button
              onClick={downloadSchoolReport}
              className="mt-4 sm:mt-0 flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Report
            </button>
          </div>
        </div>

        {/* School Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">School Profile</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Principal</p>
                    <p className="font-medium">{school.principalName}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-500">Total Students</p>
                    <p className="font-medium">{school.totalStudents}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="text-sm text-gray-500">Total Teachers</p>
                    <p className="font-medium">{school.totalTeachers}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <DollarSign className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="text-sm text-gray-500">Fund Disbursed</p>
                    <p className="font-medium">₹{school.totalFundDisbursed.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-2">
                <TrendingUp className="w-6 h-6 text-green-500" />
                <h4 className="font-semibold text-gray-900">Student Attendance</h4>
              </div>
              <p className="text-3xl font-bold text-green-600">{avgAttendance}%</p>
              <p className="text-sm text-gray-500">Last {viewPeriod} days average</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-2">
                <Users className="w-6 h-6 text-blue-500" />
                <h4 className="font-semibold text-gray-900">Teacher Attendance</h4>
              </div>
              <p className="text-3xl font-bold text-blue-600">{avgTeacherAttendance}%</p>
              <p className="text-sm text-gray-500">Last {viewPeriod} days average</p>
            </div>
          </div>
        </div>

        {/* Attendance Analytics */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Attendance Analytics</h3>
            <div className="mt-4 sm:mt-0">
              <label className="block text-sm font-medium text-gray-700 mb-1">View Period</label>
              <select
                value={viewPeriod}
                onChange={(e) => setViewPeriod(parseInt(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={7}>Last 7 days</option>
                <option value={14}>Last 14 days</option>
                <option value={30}>Last 30 days</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Students Present
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Teachers Present
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student Attendance %
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Teacher Attendance %
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {schoolAttendanceData.map((record) => (
                  <tr key={record.date} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {new Date(record.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.studentsPresent} / {record.totalStudents}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.teachersPresent} / {record.totalTeachers}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2 max-w-[100px]">
                          <div 
                            className={`h-2 rounded-full ${
                              record.attendancePercentage >= 80 ? 'bg-green-500' :
                              record.attendancePercentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${record.attendancePercentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{record.attendancePercentage}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2 max-w-[100px]">
                          <div 
                            className={`h-2 rounded-full ${
                              (record.teachersPresent / record.totalTeachers * 100) >= 80 ? 'bg-blue-500' :
                              (record.teachersPresent / record.totalTeachers * 100) >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${(record.teachersPresent / record.totalTeachers * 100)}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">
                          {Math.round((record.teachersPresent / record.totalTeachers) * 100)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {schoolAttendanceData.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No attendance data</h3>
              <p className="mt-1 text-sm text-gray-500">
                No attendance records found for the selected period.
              </p>
            </div>
          )}
        </div>
      </div>


    </div>
  );
};

export default SchoolDetails;