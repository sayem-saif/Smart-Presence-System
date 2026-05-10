import React, { useState } from 'react';
import { School, Lock, User, AlertCircle, Search } from 'lucide-react';
import { schools } from '../../data/sampleData';

interface SchoolLoginProps {
  onLogin: (schoolUid: string, password: string) => void;
  error: string;
}

const SchoolLogin: React.FC<SchoolLoginProps> = ({ onLogin, error }) => {
  const [schoolUid, setSchoolUid] = useState('');
  const [password, setPassword] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredSchools = schools.filter(school => 
    school.uid.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(schoolUid, password);
  };

  const handleSchoolSelect = (school: any) => {
    setSchoolUid(school.uid);
    setSearchTerm(`${school.name} (${school.uid})`);
    setShowDropdown(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 relative">
      <button
        className="fixed top-4 left-4 z-50 secondary-btn"
        onClick={() => window.history.back()}
      >
        ← Back
      </button>
      <div className="max-w-md w-full space-y-8">
        <div className="glass-card p-8">
          <div className="flex justify-center">
            <div className="bg-slate-900 dark:bg-slate-700 rounded-2xl p-4 shadow-xl">
              <School className="w-12 h-12 text-white" />
            </div>
          </div>
          <h2 className="display-title mt-6 text-center text-3xl font-extrabold text-slate-900 dark:text-white">
            School Login
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-300">
            Access your school attendance dashboard
          </p>
        
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <span className="text-red-700">{error}</span>
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label htmlFor="schoolSearch" className="block text-sm font-medium text-gray-700">
                Search School by Name or UID
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="schoolSearch"
                  name="schoolSearch"
                  type="text"
                  className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-700 placeholder-slate-400 text-slate-900 dark:text-white rounded-xl bg-white/90 dark:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                  placeholder="Search by school name or UID..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => setShowDropdown(true)}
                />
                
                {showDropdown && searchTerm && filteredSchools.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl max-h-60 overflow-y-auto">
                    {filteredSchools.map((school) => (
                      <button
                        key={school.uid}
                        type="button"
                        className="w-full text-left px-4 py-3 hover:bg-cyan-50 dark:hover:bg-slate-700 border-b border-slate-100 dark:border-slate-700 last:border-b-0"
                        onClick={() => handleSchoolSelect(school)}
                      >
                        <div className="font-medium text-slate-900 dark:text-white">{school.name}</div>
                        <div className="text-sm text-slate-500 dark:text-slate-300">UID: {school.uid} • {school.district} District</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="schoolUid" className="block text-sm font-medium text-gray-700">
                Selected School UID
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="schoolUid"
                  name="schoolUid"
                  type="text"
                  required
                  className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-700 placeholder-slate-400 text-slate-900 dark:text-white rounded-xl bg-slate-100 dark:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                  placeholder="Select school from above"
                  value={schoolUid}
                  readOnly
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-700 placeholder-slate-400 text-slate-900 dark:text-white rounded-xl bg-white/90 dark:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="primary-btn w-full"
            >
              Sign In to Dashboard
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-slate-500 dark:text-slate-300">
            <p>Sample School UIDs: PUN001, PUN002, PUN003...</p>
            <p className="font-mono">Password: school123 (for all schools)</p>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
};

export default SchoolLogin;