import React, { useState } from 'react';
import { Shield, Lock, User, AlertCircle } from 'lucide-react';

interface AdminLoginProps {
  onLogin: (adminId: string, password: string) => void;
  error: string;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, error }) => {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(adminId, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <button
        className="absolute top-4 left-4 secondary-btn"
        onClick={() => window.history.back()}
      >
        ← Back
      </button>
      <div className="max-w-md w-full space-y-8">
        <div className="glass-card p-8">
          <div className="flex justify-center">
            <div className="bg-slate-900 dark:bg-slate-700 rounded-2xl p-4 shadow-xl">
              <Shield className="w-12 h-12 text-white" />
            </div>
          </div>
          <h2 className="display-title mt-6 text-center text-3xl font-extrabold text-slate-900 dark:text-white">
            Administrator Login
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-300">
            Access the SMS admin dashboard
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
              <label htmlFor="adminId" className="block text-sm font-medium text-gray-700">
                Admin ID
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="adminId"
                  name="adminId"
                  type="text"
                  required
                  className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-700 placeholder-slate-400 text-slate-900 dark:text-white rounded-xl bg-white/90 dark:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                  placeholder="Enter admin ID"
                  value={adminId}
                  onChange={(e) => setAdminId(e.target.value)}
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
              Access Admin Dashboard
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-slate-500 dark:text-slate-300">
            <p>Administrator Credentials:</p>
            <p className="font-mono">ID: admin, Password: admin123</p>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;