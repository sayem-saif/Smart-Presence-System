import React, { useState, createContext, useContext } from 'react';
import { Routes, Route, useNavigate, Navigate, Outlet, useParams } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Navigation from './components/Navigation';
import SchoolLogin from './components/school/SchoolLogin';
import SchoolDashboard from './components/school/SchoolDashboard';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import SchoolDetails from './components/admin/SchoolDetails';
import StudentDetails from './components/admin/StudentDetails';
import TeacherDetails from './components/admin/TeacherDetails';
import SRUniversityAttendance from './components/SRUniversityAttendance';
import { User } from './types';
import { schools, adminCredentials } from './data/sampleData';

interface AuthContextType {
  currentUser: User | null;
  loginSchool: (schoolUid: string, password: string) => void;
  loginAdmin: (adminId: string, password: string) => void;
  logout: () => void;
  loginError: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  return useContext(AuthContext) as AuthContextType;
};

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loginError, setLoginError] = useState<string>('');
  const darkMode = true;
  const navigate = useNavigate();

  // Ensure dark class is set on <html> for Tailwind dark mode
  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleSchoolLogin = (schoolUid: string, password: string) => {
    const school = schools.find(s => s.uid === schoolUid && s.password === password);

    if (school) {
      const user: User = {
        type: 'school',
        schoolUid: school.uid,
        schoolName: school.name
      };
      setCurrentUser(user);
      setLoginError('');
      navigate('/school/dashboard');
    } else {
      setLoginError('Invalid School UID or password');
    }
  };

  const handleAdminLogin = (adminId: string, password: string) => {
    if (adminId === adminCredentials.adminId && password === adminCredentials.password) {
      const user: User = {
        type: 'admin',
        adminId
      };
      setCurrentUser(user);
      setLoginError('');
      navigate('/admin/dashboard');
    } else {
      setLoginError('Invalid Admin ID or password');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setLoginError('');
    navigate('/');
  };

  const handleHome = () => {
    if (currentUser) {
      if (currentUser.type === 'school') {
        navigate('/school/dashboard');
      } else {
        navigate('/admin/dashboard');
      }
    } else {
      navigate('/');
    }
  };

  const authContextValue: AuthContextType = {
    currentUser,
    loginSchool: handleSchoolLogin,
    loginAdmin: handleAdminLogin,
    logout: handleLogout,
    loginError,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      <div className={darkMode ? 'min-h-screen text-gray-100' : 'min-h-screen text-gray-900'}>
        <Navigation
          currentUser={currentUser}
          onLogout={handleLogout}
          onHome={handleHome}
          darkMode={darkMode}
          setDarkMode={() => {}}
        />
        <Routes>
          <Route path="/" element={<LandingPage onSchoolLogin={() => navigate('/login/school')} onAdminLogin={() => navigate('/login/admin')} />} />
          <Route path="/login/school" element={<SchoolLogin onLogin={handleSchoolLogin} error={loginError} />} />
          <Route path="/login/admin" element={<AdminLogin onLogin={handleAdminLogin} error={loginError} />} />

          {/* School Routes */}
          <Route element={<ProtectedRoute allowedRoles={['school']} />}>
            <Route path="/school/dashboard" element={currentUser?.type === 'school' ? <SchoolDashboard schoolUid={currentUser.schoolUid!} schoolName={currentUser.schoolName!} /> : null} />
          </Route>

          {/* Admin Routes */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard onViewSchool={(schoolUid) => navigate(`/admin/school/${schoolUid}`)} />} />
            <Route path="/admin/school/:schoolUid" element={<SchoolDetailsWrapper />} />
            <Route path="/admin/school/:schoolUid/students" element={<StudentDetailsWrapper />} />
            <Route path="/admin/school/:schoolUid/teachers" element={<TeacherDetailsWrapper />} />
            <Route path="/admin/sr-university" element={<SRUniversityAttendance />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

const ProtectedRoute = ({ allowedRoles }: { allowedRoles: Array<User['type']> }) => {
  const { currentUser } = useAuth();
  if (!currentUser || !allowedRoles.includes(currentUser.type)) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

// Wrapper components to extract params and pass them as props
const SchoolDetailsWrapper = () => {
  const { schoolUid } = useParams<{ schoolUid: string }>();
  const navigate = useNavigate();
  return <SchoolDetails schoolUid={schoolUid!} onBack={() => navigate('/admin/dashboard')} onViewStudentDetails={() => navigate(`/admin/school/${schoolUid}/students`)} onViewTeacherDetails={() => navigate(`/admin/school/${schoolUid}/teachers`)} />;
};

const StudentDetailsWrapper = () => {
  const { schoolUid } = useParams<{ schoolUid: string }>();
  const navigate = useNavigate();
  return <StudentDetails schoolUid={schoolUid!} onBack={() => navigate(`/admin/school/${schoolUid}`)} />;
};

const TeacherDetailsWrapper = () => {
  const { schoolUid } = useParams<{ schoolUid: string }>();
  const navigate = useNavigate();
  return <TeacherDetails schoolUid={schoolUid!} onBack={() => navigate(`/admin/school/${schoolUid}`)} />;
};

export default App;