import React, { useState } from 'react';
import { useNavigate } from "react-router";
import { Home, Briefcase, PlusCircle, Bookmark, LogIn, LogOut, Moon, Sun, Menu, X } from 'lucide-react';
import { Fa500Px } from 'react-icons/fa';
//import { signOut } from 'firebase/auth';

const NavLink = ({ route, title, icon: Icon, navigate, isDark, onClick }) => (
  <button
    onClick={() => { navigate(`/${route}`); if (onClick) onClick(); }}
    className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center transition duration-200 w-full text-left
      ${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
  >
    <Icon className="w-4 h-4 mr-2" />
    {title}
  </button>
);

const MainButton = ({ children, onClick, primary = true, icon: Icon = null, className = '' }) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-lg transition duration-300 transform hover:-translate-y-0.5 shadow-md
      ${primary ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50'} ${className}`}
  >
    {Icon && <Icon className="w-4 h-4 mr-2" />}
    {children}
  </button>
);

const toggleTheme = () => {
  if (typeof setTheme === "function") {
    setTheme(isDark ? 'light' : 'dark');
  } else {
    console.warn("⚠ setTheme not provided to Navbar.");
  }
};

const navItems = [
  { route: '', title: 'Home', icon: Home },
  { route: 'allJobs', title: 'All Jobs', icon: Briefcase },
  { route: 'addJob', title: 'Post Job', icon: PlusCircle, requiresAuth: true },
  { route: 'myAddedJobs', title: 'My Posted Jobs', icon: Briefcase, requiresAuth: true },
  { route: 'myAcceptedTasks', title: 'My Accepted Tasks', icon: Bookmark, requiresAuth: true },
];


const Navbar = ({ userId, theme, setTheme, isDark, auth, showToast }) => {

  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      showToast('Logged out successfully.', 'success');
      navigate('/');
      setIsMenuOpen(false);
    } catch {
      showToast('Logout failed.', 'error');
    }
  };

  return (
    <nav className={`sticky top-0 z-50 shadow-lg ${isDark ? 'bg-gray-900 border-b border-gray-700' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 justify-between md:justify-center lg:justify-between">
          <div className="flex items-center cursor-pointer order-1" onClick={() => navigate('/')}>
            <h1 className={`text-2xl font-extrabold ${isDark ? 'text-indigo-400' : 'text-indigo-700'}`}><Fa500Px/>Skillio</h1>

            {userId && (
              <span className={`ml-4 hidden sm:block text-xs font-mono px-2 py-1 rounded-full 
                ${isDark ? 'bg-gray-700 text-indigo-300' : 'bg-indigo-100 text-indigo-700'}`}>
                ID: {userId}
              </span>
            )}
          </div>
          <div className="hidden md:flex items-center space-x-4 order-2">
            {navItems.filter(item => !item.requiresAuth || userId).map(item => (
              <NavLink key={item.route} {...item} navigate={navigate} isDark={isDark} />
            ))}
          </div>

          <div className="flex items-center space-x-3 order-3">
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition duration-300 ${isDark ? 'text-yellow-400 hover:bg-gray-800' : 'text-gray-800 hover:bg-gray-100'}`}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <div className="hidden md:flex space-x-3">
              {userId ? (
                <MainButton onClick={handleLogout} primary={false} icon={LogOut}>Logout</MainButton>
              ) : (
                <>
                  <MainButton onClick={() => navigate('/login')} primary={false} icon={LogIn}>Login</MainButton>
                  <MainButton onClick={() => navigate('/register')} primary>Register</MainButton>
                </>
              )}
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className={`md:hidden p-4 border-t ${isDark ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'}`}>
          <div className="flex flex-col space-y-2">
            {navItems.filter(item => !item.requiresAuth || userId).map(item => (
              <NavLink key={item.route} {...item} navigate={navigate} isDark={isDark} onClick={() => setIsMenuOpen(false)} />
            ))}

            {/* Auth Section */}
            <div className="pt-4 border-t mt-4">
              {userId ? (
                <MainButton onClick={handleLogout} primary={false} icon={LogOut} className="w-full">Logout</MainButton>
              ) : (
                <>
                  <MainButton onClick={() => { navigate('/login'); setIsMenuOpen(false); }} primary={false} icon={LogIn} className="w-full">Login</MainButton>
                  <MainButton onClick={() => { navigate('/register'); setIsMenuOpen(false); }} primary className="w-full">Register</MainButton>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
