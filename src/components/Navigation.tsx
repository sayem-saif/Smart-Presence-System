import React, { useState } from 'react';
import { User, LogOut, Home, Menu, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

interface NavigationProps {
  currentUser: any;
  onLogout: () => void;
  onHome: () => void;
  darkMode: boolean;
  setDarkMode: (_val: boolean) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentUser, onLogout, onHome, darkMode, setDarkMode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  void setDarkMode;

  const dashboardPath = currentUser?.type === 'school' ? '/school/dashboard' : '/admin/dashboard';
  const isHomeActive = location.pathname === '/';
  const isDashboardActive = location.pathname.startsWith('/school') || location.pathname.startsWith('/admin');

  return (
    <nav className={`sticky top-0 z-50 border-b backdrop-blur-md ${darkMode ? 'border-slate-500/70 bg-slate-800/75' : 'border-white/70 bg-white/80'} shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Home button */}
          <div className="flex items-center">
            <button
              onClick={onHome}
              className={`flex items-center space-x-2 text-xl font-bold display-title ${darkMode ? 'text-slate-100 hover:text-cyan-300' : 'text-slate-800 hover:text-cyan-600'} transition-colors`}
            >
              <Home className="w-6 h-6" />
              <span className="hidden sm:block">SMS</span>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-3">
            <button onClick={onHome} className={`nav-pill ${isHomeActive ? 'nav-pill-active' : ''}`}>
              Home
            </button>
            {currentUser && (
              <button onClick={() => navigate(dashboardPath)} className={`nav-pill ${isDashboardActive ? 'nav-pill-active' : ''}`}>
                Dashboard
              </button>
            )}
            {currentUser && (
              <>
                <div className={`flex items-center space-x-2 text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  <User className="w-5 h-5" />
                  <span>
                    {currentUser.type === 'school' 
                      ? `${currentUser.schoolName}` 
                      : 'Administrator'}
                  </span>
                </div>
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-2 px-3 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors text-sm font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md ${darkMode ? 'text-slate-300 hover:text-white hover:bg-slate-700/80' : 'text-slate-600 hover:text-slate-800 hover:bg-slate-200/80'}`}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <div className="px-3 py-2 flex flex-col gap-2">
              <button onClick={onHome} className={`nav-pill justify-start ${isHomeActive ? 'nav-pill-active' : ''}`}>
                Home
              </button>
              {currentUser && (
                <button
                  onClick={() => {
                    navigate(dashboardPath);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`nav-pill justify-start ${isDashboardActive ? 'nav-pill-active' : ''}`}
                >
                  Dashboard
                </button>
              )}
            </div>
            {currentUser && (
              <div className="px-3 py-2">
                <div className={`flex items-center space-x-3 mb-3 ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                  <User className="w-6 h-6" />
                  <span className="font-medium">
                    {currentUser.type === 'school' 
                      ? `${currentUser.schoolName}` 
                      : 'Administrator'}
                  </span>
                </div>
                <button
                  onClick={onLogout}
                  className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors text-sm font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;