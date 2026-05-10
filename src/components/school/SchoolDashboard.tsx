import React, { useState, useMemo } from 'react';
import { Shield } from 'lucide-react';
import { Calendar, Users, Download, CheckCircle, XCircle } from 'lucide-react';
import { students, attendanceRecords, schools } from '../../data/sampleData';
import SRUniversityAttendance from '../SRUniversityAttendance';

interface SchoolDashboardProps {
  schoolUid: string;
  schoolName: string;
}

const SchoolDashboard: React.FC<SchoolDashboardProps> = ({ schoolUid, schoolName }) => {
  const cardShadow = 'shadow-lg';
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  // Removed manual attendance state

  const schoolStudents = students[schoolUid] || [];
  const schoolInfo = schools.find(s => s.uid === schoolUid);
  const schoolAttendance = attendanceRecords.filter(record => {
    const student = schoolStudents.find(s => s.id === record.studentId);
    return student && record.date === selectedDate;
  });

  const filteredAttendance = useMemo(() => {
    return schoolAttendance.filter(record => {
      const classMatch = !selectedClass || record.class === selectedClass;
      const sectionMatch = !selectedSection || record.section === selectedSection;
      return classMatch && sectionMatch;
    });
  }, [schoolAttendance, selectedClass, selectedSection]);

  const presentCount = filteredAttendance.filter(record => record.status === 'Present').length;
  const totalCount = filteredAttendance.length;
  const attendancePercentage = totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0;

  const uniqueClasses = [...new Set(schoolStudents.map(student => student.class))].sort();
  const uniqueSections = [...new Set(schoolStudents.map(student => student.section))].sort();

  const downloadReport = () => {
    const csvContent = [
      ['Date', 'Student Name', 'Roll Number', 'Class', 'Section', 'Father Name', 'Status', 'Marked At', 'Method'],
      ...filteredAttendance.map(record => [
        record.date,
        record.studentName,
        schoolStudents.find(s => s.id === record.studentId)?.rollNumber || '',
        record.class,
        record.section,
        schoolStudents.find(s => s.id === record.studentId)?.fatherName || '',
        record.status,
        record.markedAt,
        record.method
      ])
    ];
    
    const csvString = csvContent.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `attendance-report-${schoolUid}-${selectedDate}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
  <div className="page-shell flex flex-col">
    {/* Header Bar */}
    <header className="w-full flex items-center justify-between px-6 py-4 border-b border-slate-700 bg-slate-900 text-white shadow-xl">
      <div className="flex items-center gap-3">
        <Shield className="w-8 h-8 text-slate-200" />
        <span className="display-title text-xl font-bold tracking-wide">Smart Monitoring System</span>
      </div>
      <span className="font-medium subtle-text">State Government</span>
    </header>
      <button
  className="mb-4 mt-4 ml-4 secondary-btn w-fit"
        onClick={() => window.history.back()}
      >
        ← Back
      </button>
  <div className="page-container">
    {/* School Info Card */}
  <div className={`glass-card ${cardShadow} p-6 mb-8`}>
          <h1 className="display-title text-2xl sm:text-3xl font-bold mb-2">
            <span>{schoolName}</span>
          </h1>
          <p className="subtle-text font-medium">{schoolInfo?.district} District</p>
        </div>

        {/* Stats Cards */}
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className={`stat-card ${cardShadow}`}>
            <div className="flex items-center">
              <div className="icon-chip">
                <CheckCircle className="w-6 h-6 text-emerald-300" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium subtle-text">Present Today</p>
                <p className="text-2xl font-bold text-emerald-300">{presentCount}</p>
              </div>
            </div>
          </div>

          <div className={`stat-card ${cardShadow}`}>
            <div className="flex items-center">
              <div className="icon-chip">
                <XCircle className="w-6 h-6 text-rose-300" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium subtle-text">Absent Today</p>
                <p className="text-2xl font-bold text-rose-300">{totalCount - presentCount}</p>
              </div>
            </div>
          </div>

          <div className={`stat-card ${cardShadow}`}>
            <div className="flex items-center">
              <div className="icon-chip">
                <Users className="w-6 h-6 text-sky-300" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium subtle-text">Total Students</p>
                <p className="text-2xl font-bold text-sky-300">{schoolStudents.length}</p>
              </div>
            </div>
          </div>

          <div className={`stat-card ${cardShadow}`}>
            <div className="flex items-center">
              <div className="icon-chip">
                <Calendar className="w-6 h-6 text-violet-300" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium subtle-text">Attendance %</p>
                <p className="text-2xl font-bold text-violet-300">{attendancePercentage}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Actions */}
  <div className={`glass-card ${cardShadow} p-6 mb-6`}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div>
                <label className="block text-sm font-medium subtle-text mb-1">Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="dark-input"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium subtle-text mb-1">Class</label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="dark-input"
                >
                  <option value="">All Classes</option>
                  {uniqueClasses.map(cls => (
                    <option key={cls} value={cls}>Class {cls}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium subtle-text mb-1">Section</label>
                <select
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                  className="dark-input"
                >
                  <option value="">All Sections</option>
                  {uniqueSections.map(section => (
                    <option key={section} value={section}>Section {section}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              {/* Removed Manual Attendance button */}
              <button
                onClick={downloadReport}
                className="flex items-center justify-center px-4 py-2 primary-btn"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </button>
            </div>
          </div>
        </div>

        {/* Attendance Table */}
  <div className={`glass-card ${cardShadow} overflow-hidden`}>
    {/* Footer */}
    <footer className="w-full mt-auto py-3 px-6 bg-slate-900 text-slate-200 text-center text-sm shadow-inner border-b border-slate-700">
      &copy; {new Date().getFullYear()} Smart Monitoring System. Powered by State Government.
    </footer>
          <div className="px-6 py-4 border-b border-slate-700">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Student Attendance - {selectedDate}
            </h3>
            <p className="text-sm subtle-text">
              Showing {filteredAttendance.length} students
            </p>
          </div>
          
          <div className="overflow-auto max-h-[60vh]">
            <table className="dark-table">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student Name
                  </th>
                  <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Roll No.
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Class
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Section
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Father's Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Marked At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Method
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredAttendance.map((record) => {
                  const student = schoolStudents.find(s => s.id === record.studentId);
                  return (
                    <tr key={record.id}>
                      <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                        {record.studentName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm subtle-text">
                        {student?.rollNumber}
                      </td>
                      <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm subtle-text">
                        {record.class}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm subtle-text">
                        {record.section}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm subtle-text">
                        {student?.fatherName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          record.status === 'Present' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {record.status === 'Present' ? (
                            <CheckCircle className="w-3 h-3 mr-1" />
                          ) : (
                            <XCircle className="w-3 h-3 mr-1" />
                          )}
                          {record.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm subtle-text">
                        {record.markedAt}
                      </td>
                      <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          record.method === 'Biometric' 
                            ? 'bg-green-100 text-green-800' 
                            : 'hidden'
                        }`}>
                          {record.method === 'Biometric' ? 'Biometric' : ''}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredAttendance.length === 0 && (
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-slate-500" />
              <h3 className="mt-2 text-sm font-medium">No attendance records</h3>
              <p className="mt-1 text-sm subtle-text">
                No attendance records found for the selected filters.
              </p>
            </div>
          )}
        </div>

        {/* SR University Attendance Section - Only for SRU_077 */}
        {schoolUid === 'SRU_077' && (
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-2">SR University Attendance</h2>
            <SRUniversityAttendance />
          </div>
        )}
      </div>
    </div>
  );
};

export default SchoolDashboard;