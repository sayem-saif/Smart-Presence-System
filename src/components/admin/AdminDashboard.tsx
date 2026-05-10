import React, { useState, useMemo } from 'react';
import { Building2 } from 'lucide-react';
import { School, Users, TrendingUp, Download, Eye, BarChart3 } from 'lucide-react';
import { schools, dailySchoolAttendance } from '../../data/sampleData';
import SRUniversityAttendance from '../SRUniversityAttendance';

interface AdminDashboardProps {
  onViewSchool: (schoolUid: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onViewSchool }) => {
  // Color palette
  const cardShadow = 'shadow-lg';
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const schoolsWithStats = useMemo(() => {
    return schools.map(school => {
      const recentAttendance = dailySchoolAttendance
        .filter(record => record.schoolUid === school.uid)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 7);

      const avgAttendance = recentAttendance.length > 0 
        ? Math.round(recentAttendance.reduce((sum, record) => sum + record.attendancePercentage, 0) / recentAttendance.length)
        : 0;

      return {
        ...school,
        avgAttendance
      };
    });
  }, []);

  const filteredSchools = useMemo(() => {
    return schoolsWithStats.filter(school => 
      !selectedDistrict || school.district === selectedDistrict
    );
  }, [schoolsWithStats, selectedDistrict]);

  const uniqueDistricts = [...new Set(schools.map(school => school.district))].sort();
  
  const totalStudents = filteredSchools.reduce((sum, school) => sum + school.totalStudents, 0);
  const totalTeachers = filteredSchools.reduce((sum, school) => sum + school.totalTeachers, 0);
  const totalFunds = filteredSchools.reduce((sum, school) => sum + school.totalFundDisbursed, 0);
  const avgAttendance = filteredSchools.length > 0 
    ? Math.round(filteredSchools.reduce((sum, school) => sum + school.avgAttendance, 0) / filteredSchools.length)
    : 0;

  const downloadSystemReport = () => {
    const csvContent = [
      ['School UID', 'School Name', 'District', 'Head', 'Total Students', 'Total Teachers', 'Avg Attendance %', 'Fund Disbursed'],
      ...filteredSchools.map(school => [
        school.uid,
        school.name,
        school.district,
  school.viceChancellor || '',
        school.totalStudents,
        school.totalTeachers,
        school.avgAttendance,
        school.totalFundDisbursed
      ])
    ];
    
    const csvString = csvContent.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sms-system-report-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="page-shell flex flex-col">
      {/* Header Bar */}
      <header className="w-full flex items-center justify-between px-6 py-4 border-b border-slate-700 bg-slate-900 text-white shadow-xl">
        <div className="flex items-center gap-3">
          <Building2 className="w-8 h-8 text-slate-200" />
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
        {/* Admin Info Card */}
        <div className={`glass-card ${cardShadow} p-6 mb-8`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="display-title text-2xl sm:text-3xl font-bold mb-2">
                SMS Admin Dashboard
              </h1>
              <p className="subtle-text font-medium">Centralized monitoring for all schools</p>
            </div>
            <button
              onClick={downloadSystemReport}
              className="mt-4 sm:mt-0 flex items-center px-4 py-2 primary-btn"
            >
              <Download className="w-4 h-4 mr-2" />
              System Report
            </button>
          </div>
        </div>
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className={`stat-card ${cardShadow}`}>
            <div className="flex items-center">
              <div className="icon-chip">
                <School className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium subtle-text">Total Schools</p>
                <p className="text-2xl font-bold text-blue-300">{filteredSchools.length}</p>
              </div>
            </div>
          </div>

          <div className={`stat-card ${cardShadow}`}>
            <div className="flex items-center">
              <div className="icon-chip">
                <Users className="w-6 h-6 text-emerald-300" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium subtle-text">Total Students</p>
                <p className="text-2xl font-bold text-emerald-300">{totalStudents.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className={`stat-card ${cardShadow}`}>
            <div className="flex items-center">
              <div className="icon-chip">
                <TrendingUp className="w-6 h-6 text-violet-300" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium subtle-text">Avg Attendance</p>
                <p className="text-2xl font-bold text-violet-300">{avgAttendance}%</p>
              </div>
            </div>
          </div>

          <div className={`stat-card ${cardShadow}`}>
            <div className="flex items-center">
              <div className="icon-chip">
                <BarChart3 className="w-6 h-6 text-amber-300" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium subtle-text">Total Funds</p>
                <p className="text-2xl font-bold text-amber-300">₹{(totalFunds / 100000).toFixed(1)}L</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
  <div className={`glass-card ${cardShadow} p-6 mb-6`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <label className="block text-sm font-medium subtle-text mb-1">Filter by District</label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="dark-input"
              >
                <option value="">All Districts</option>
                {uniqueDistricts.map(district => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Schools Table */}
  <div className={`glass-card ${cardShadow} overflow-hidden`}>
      {/* Footer */}
      <footer className="w-full mt-auto py-3 px-6 bg-slate-900 text-slate-200 text-center text-sm shadow-inner border-b border-slate-700">
        &copy; {new Date().getFullYear()} Smart Monitoring System. Powered by State Government.
      </footer>
          <div className="px-6 py-4 border-b border-slate-700">
            <h3 className="text-lg font-semibold">School Overview</h3>
            <p className="text-sm subtle-text">
              Showing {filteredSchools.length} schools
            </p>
          </div>
          
          <div className="overflow-auto max-h-[60vh]">
            <table className="dark-table">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    School
                  </th>
                  <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    District
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Students
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Teachers
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Attendance %
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fund Disbursed
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredSchools.map((school) => (
                  <tr key={school.uid}>
                    <td className="px-2 sm:px-6 py-2 sm:py-4">
                      <div>
                        <div className="text-sm font-medium">{school.name}</div>
                        <div className="text-sm subtle-text">UID: {school.uid}</div>
                      </div>
                    </td>
                    <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm subtle-text">
                      {school.district}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {school.totalStudents}
                    </td>
                    <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm">
                      {school.totalTeachers}
                    </td>
                    <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-1 bg-slate-700 rounded-full h-2 mr-2">
                          <div 
                            className={`h-2 rounded-full ${
                              school.avgAttendance >= 80 ? 'bg-green-500' :
                              school.avgAttendance >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${school.avgAttendance}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{school.avgAttendance}%</span>
                      </div>
                    </td>
                    <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm">
                      ₹{school.totalFundDisbursed.toLocaleString()}
                    </td>
                    <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                      <button
                        onClick={() => onViewSchool(school.uid)}
                        className="flex items-center text-sky-300 hover:text-sky-200 transition-colors"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredSchools.length === 0 && (
            <div className="text-center py-12">
              <School className="mx-auto h-12 w-12 text-slate-400" />
              <h3 className="mt-2 text-sm font-medium">No schools found</h3>
              <p className="mt-1 text-sm subtle-text">
                No schools match the selected filters.
              </p>
            </div>
          )}
        </div>

        {/* SR University Attendance Section */}
        {filteredSchools.some(school => school.uid === 'SRU_077') && (
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-2">SR University Attendance</h2>
            <SRUniversityAttendance />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;