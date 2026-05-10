import React from 'react';
import { School, Shield, Users, BarChart3, Tablet, Monitor, CalendarDays, CheckCircle2, Rocket, Target } from 'lucide-react';
import { schools, dailySchoolAttendance } from '../data/sampleData';

interface LandingPageProps {
  onSchoolLogin: () => void;
  onAdminLogin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onSchoolLogin, onAdminLogin }) => {
  const battlePlan = [
    {
      month: 'June',
      focus: 'Project 2 (RAG Chatbot)',
      note: 'Get confident with Gen AI basics.',
      accent: 'from-cyan-500/20 to-blue-500/20',
    },
    {
      month: 'July',
      focus: 'Project 1 (Multi-Agent) + Project 3 (Speech Emotion)',
      note: 'Build breadth across orchestration and audio ML.',
      accent: 'from-emerald-500/20 to-teal-500/20',
    },
    {
      month: 'August',
      focus: 'Project 4 (IoT Anomaly)',
      note: 'Do this during your NIT Warangal internship.',
      accent: 'from-amber-500/20 to-orange-500/20',
    },
    {
      month: 'Ongoing',
      focus: 'Project 5',
      note: 'Build it as a side product and deploy it publicly.',
      accent: 'from-fuchsia-500/20 to-pink-500/20',
    },
  ];

  const nonNegotiables = [
    'Every project must be on GitHub with a proper README, demo GIF or screenshot, and a clear explanation.',
    'Deploy at least 2 projects using Streamlit Cloud or Hugging Face Spaces so recruiters can see live links.',
    'Document results with numbers: accuracy, dataset size, response time reduction, or any measurable outcome.',
  ];

  // Attendance trend (last 7 days)
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const dateStr = date.toISOString().split('T')[0];
    const dayAttendance = dailySchoolAttendance.filter(a => a.date === dateStr);
    const present = dayAttendance.reduce((sum, a) => sum + a.studentsPresent, 0);
    return { date: dateStr, present };
  });

  // Quick stats (simulated)
  const avgInTime = '09:07';
  const avgOutTime = '16:49';
  const avgResponseTime = '0.60 sec';
  // Calculate statistics from sampleData
  const totalSchools = schools.length;
  const totalStudents = schools.reduce((sum, s) => sum + s.totalStudents, 0);
  const totalTeachers = schools.reduce((sum, s) => sum + s.totalTeachers, 0);
  const totalFunds = schools.reduce((sum, s) => sum + s.totalFundDisbursed, 0);
  const today = new Date().toISOString().split('T')[0];
  const todayAttendance = dailySchoolAttendance.filter(a => a.date === today);
  const presentToday = todayAttendance.reduce((sum, a) => sum + a.studentsPresent, 0);
  const absentToday = todayAttendance.reduce((sum, a) => sum + (a.totalStudents - a.studentsPresent), 0);
  const teachersPresentToday = todayAttendance.reduce((sum, a) => sum + a.teachersPresent, 0);
  // Device stats (simulate)
  const totalDevices = 156;
  const tabletDevices = 2;
  const desktopDevices = 154;

  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        <div className="text-center">
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="bg-slate-900 dark:bg-slate-700 rounded-3xl p-3 sm:p-4 shadow-2xl">
              <BarChart3 className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
            </div>
          </div>
          <h1 className="display-title text-3xl sm:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6">
            Smart Monitoring System
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-slate-700 dark:text-slate-300 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed">
            Real-time attendance visibility, cleaner reporting, and better school-level decision making.
          </p>

          <div className="grid grid-cols-1 xl:grid-cols-[1.35fr_0.9fr] gap-6 mb-12 text-left">
            <div className="glass-card p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="icon-chip">
                  <CalendarDays className="w-5 h-5 text-cyan-300" />
                </div>
                <div>
                  <h2 className="display-title text-2xl sm:text-3xl font-bold text-white">Your Battle Plan</h2>
                  <p className="subtle-text text-sm sm:text-base">June to August timeline for keeping the portfolio moving.</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {battlePlan.map((item) => (
                  <div key={item.month} className={`rounded-2xl border border-white/10 p-5 bg-gradient-to-br ${item.accent}`}>
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-100">
                        {item.month}
                      </span>
                      <Rocket className="w-4 h-4 text-slate-100/80" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{item.focus}</h3>
                    <p className="text-sm text-slate-100/80 leading-relaxed">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="icon-chip">
                  <Target className="w-5 h-5 text-emerald-300" />
                </div>
                <div>
                  <h2 className="display-title text-2xl sm:text-3xl font-bold text-white">3 Non-Negotiable Rules</h2>
                  <p className="subtle-text text-sm sm:text-base">From an HR lens, these make the work credible.</p>
                </div>
              </div>

              <div className="space-y-4">
                {nonNegotiables.map((rule, index) => (
                  <div key={rule} className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-300" />
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200/80 mb-1">Rule {index + 1}</div>
                      <p className="text-sm sm:text-base text-slate-100/90 leading-relaxed">{rule}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="stat-card flex flex-col items-center">
              <School className="w-10 h-10 text-cyan-600 mb-2" />
              <div className="text-3xl font-bold text-slate-900 dark:text-white">{totalSchools}</div>
              <div className="text-sm text-slate-500 dark:text-slate-300">Total Schools</div>
            </div>
            <div className="stat-card flex flex-col items-center">
              <Users className="w-10 h-10 text-emerald-600 mb-2" />
              <div className="text-3xl font-bold text-slate-900 dark:text-white">{totalStudents.toLocaleString()}</div>
              <div className="text-sm text-slate-500 dark:text-slate-300">Total Students</div>
            </div>
            <div className="stat-card flex flex-col items-center">
              <Users className="w-10 h-10 text-blue-600 mb-2" />
              <div className="text-3xl font-bold text-slate-900 dark:text-white">{totalTeachers.toLocaleString()}</div>
              <div className="text-sm text-slate-500 dark:text-slate-300">Total Teachers</div>
            </div>
            <div className="stat-card flex flex-col items-center">
              <BarChart3 className="w-10 h-10 text-indigo-600 mb-2" />
              <div className="text-3xl font-bold text-slate-900 dark:text-white">₹{(totalFunds / 100000).toFixed(1)}L</div>
              <div className="text-sm text-slate-500 dark:text-slate-300">Total Funds Disbursed</div>
            </div>
          </div>

          {/* Today's Attendance Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="glass-card p-6 flex flex-col items-center">
              <Users className="w-8 h-8 text-emerald-600 mb-2" />
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{presentToday}</div>
              <div className="text-sm text-emerald-700 dark:text-emerald-300">Present Today</div>
            </div>
            <div className="glass-card p-6 flex flex-col items-center">
              <Users className="w-8 h-8 text-red-600 mb-2" />
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{absentToday}</div>
              <div className="text-sm text-red-700 dark:text-red-300">Absent Today</div>
            </div>
            <div className="glass-card p-6 flex flex-col items-center">
              <Shield className="w-8 h-8 text-green-600 mb-2" />
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{teachersPresentToday}</div>
              <div className="text-sm text-green-700 dark:text-green-300">Teachers Present Today</div>
            </div>
            <div className="glass-card p-6 flex flex-col items-center">
              <Tablet className="w-8 h-8 text-blue-600 mb-2" />
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{totalDevices}</div>
              <div className="text-xs text-blue-700 dark:text-blue-300">Devices (Tablet: {tabletDevices}, Desktop: {desktopDevices})</div>
            </div>
          </div>

          {/* Attendance Trend & Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="glass-card p-6 flex flex-col items-center">
              <BarChart3 className="w-8 h-8 text-indigo-500 mb-2" />
              <div className="text-lg font-bold text-slate-900 dark:text-white mb-2">Attendance Trend (Last 7 Days)</div>
              <div className="w-full flex justify-between items-end h-24">
                {last7Days.map((d) => (
                  <div key={d.date} className="flex flex-col items-center w-8">
                    <div className="bg-slate-700 dark:bg-slate-500 rounded-t-lg" style={{height: `${Math.max(20, d.present / 100)}px`, width: '16px'}}></div>
                    <span className="text-xs text-slate-500 dark:text-slate-300 mt-1">{d.date.slice(5)}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-card p-6 flex flex-col items-center justify-center">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-6 h-6 text-blue-500" />
                <span className="text-lg font-bold text-slate-900 dark:text-white">Average In-Time</span>
              </div>
              <div className="text-2xl font-bold text-blue-700">{avgInTime}</div>
            </div>
            <div className="glass-card p-6 flex flex-col items-center justify-center">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-6 h-6 text-purple-500" />
                <span className="text-lg font-bold text-slate-900 dark:text-white">Average Out-Time</span>
              </div>
              <div className="text-2xl font-bold text-purple-700">{avgOutTime}</div>
              <div className="mt-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-green-500" />
                <span className="text-sm font-bold text-green-700">Avg Response: {avgResponseTime}</span>
              </div>
            </div>
          </div>

          {/* Login Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            <button
              onClick={onSchoolLogin}
              className="group glass-card p-8 border-2 border-transparent hover:border-cyan-400 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-cyan-100 group-hover:bg-cyan-500 rounded-full p-6 transition-colors">
                  <School className="w-12 h-12 text-cyan-700 group-hover:text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">Login as School</h3>
                <p className="text-slate-700 dark:text-slate-300 text-center">
                  Access your school dashboard to view and manage student attendance records
                </p>
                <span className="primary-btn">Open School Panel</span>
              </div>
            </button>

            <button
              onClick={onAdminLogin}
              className="group glass-card p-8 border-2 border-transparent hover:border-emerald-400 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-emerald-100 group-hover:bg-emerald-500 rounded-full p-6 transition-colors">
                  <Shield className="w-12 h-12 text-green-600 group-hover:text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">Login as Administrator</h3>
                <p className="text-slate-700 dark:text-slate-300 text-center">
                  Monitor all schools, analyze attendance patterns, and generate comprehensive reports
                </p>
                <span className="primary-btn">Open Admin Panel</span>
              </div>
            </button>
          </div>

          <div className="flex justify-center items-center gap-2 text-slate-500 dark:text-slate-300 text-sm">
            <Monitor className="w-4 h-4" />
            <span>Designed for desktop dashboards and mobile field checks</span>
          </div>
        </div>
      </div>
    </div>
  );

}
export default LandingPage;