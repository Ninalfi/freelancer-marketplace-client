import React, { useState } from 'react';
import { Home, Briefcase, PlusCircle, Bookmark, LogIn, LogOut, Moon, Sun, Menu, X } from 'lucide-react';
//import { signOut } from 'firebase/auth';

const NavLink = ({ route, title, icon: Icon, currentPage, navigate, isDark, onClick }) => (
    <button
        onClick={() => { navigate(route); if(onClick) onClick(); }}
        className={`
        px-3 py-2 rounded-lg text-sm font-medium flex items-center transition duration-200 w-full text-left
        ${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}
      `}
    >
        <Icon className="w-4 h-4 mr-2" />
        {title}
    </button>
);

const MainButton = ({ children, onClick, primary = true, icon: Icon = null, className = '' }) => (
    <button
        type="button"
        onClick={onClick}
        className={`
        flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-lg transition duration-300 transform hover:-translate-y-0.5 shadow-md
        ${primary
            ? 'bg-indigo-600 text-white hover:bg-indigo-700'
            : 'bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50'
        }
        ${className}
      `}
    >
        {Icon && <Icon className="w-4 h-4 mr-2" />}
        {children}
    </button>
);

const Navbar = ({ navigate, userId, theme, setTheme, isDark, auth, showToast }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            showToast('Logged out successfully.', 'success');
            navigate('home');
            setIsMenuOpen(false);
        } catch (e) {
            showToast('Logout failed.', 'error');
        }
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const navItems = [
        { route: 'home', title: 'Home', icon: Home, requiresAuth: false },
        { route: 'allJobs', title: 'All Jobs', icon: Briefcase, requiresAuth: false },
        { route: 'addJob', title: 'Post Job', icon: PlusCircle, requiresAuth: true },
        { route: 'myAddedJobs', title: 'My Posted Jobs', icon: Briefcase, requiresAuth: true },
        { route: 'myAcceptedTasks', title: 'My Accepted Tasks', icon: Bookmark, requiresAuth: true },
    ];

    const currentRoute = 'home'; // Simplified for now, App.jsx handles true current page state

    return (
        <nav className={`sticky top-0 z-50 shadow-lg ${isDark ? 'bg-gray-900 border-b border-gray-700' : 'bg-white'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <h1 className={`text-2xl font-extrabold cursor-pointer ${isDark ? 'text-indigo-400' : 'text-indigo-700'}`} onClick={() => navigate('home')}>TalentLink</h1>
                        {userId && (
                            <span className={`ml-4 hidden sm:block text-xs font-mono px-2 py-1 rounded-full ${isDark ? 'bg-gray-700 text-indigo-300' : 'bg-indigo-100 text-indigo-600'}`}>
                                ID: {userId}
                            </span>
                        )}
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-2">
                        {navItems.filter(item => !item.requiresAuth || userId).map(item => (
                            <NavLink
                                key={item.route}
                                route={item.route}
                                title={item.title}
                                icon={item.icon}
                                navigate={navigate}
                                isDark={isDark}
                                currentPage={currentRoute}
                            />
                        ))}
                    </div>

                    {/* Right side controls */}
                    <div className="flex items-center space-x-3">
                        {/* Theme Toggle */}
                        <button
                            onClick={() => setTheme(isDark ? 'light' : 'dark')}
                            className={`p-2 rounded-full transition duration-300 ${isDark ? 'text-yellow-400 hover:bg-gray-800' : 'text-gray-800 hover:bg-gray-100'}`}
                            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                        >
                            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>

                        {/* Auth Buttons (Desktop) */}
                        <div className="hidden md:flex space-x-3">
                            {userId ? (
                                <MainButton onClick={handleLogout} primary={false} icon={LogOut}>
                                    Logout
                                </MainButton>
                            ) : (
                                <>
                                    <MainButton onClick={() => navigate('login')} primary={false} icon={LogIn}>
                                        Login
                                    </MainButton>
                                    <MainButton onClick={() => navigate('register')} primary={true}>
                                        Register
                                    </MainButton>
                                </>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button onClick={toggleMenu} className={`md:hidden p-2 rounded-lg transition duration-200 ${isDark ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'}`}>
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className={`md:hidden p-4 border-t ${isDark ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'}`}>
                    <div className="flex flex-col space-y-2">
                        {navItems.filter(item => !item.requiresAuth || userId).map(item => (
                            <NavLink
                                key={item.route}
                                route={item.route}
                                title={item.title}
                                icon={item.icon}
                                navigate={navigate}
                                isDark={isDark}
                                onClick={toggleMenu}
                            />
                        ))}
                        <div className={`pt-4 border-t mt-4 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                            {userId ? (
                                <MainButton onClick={handleLogout} primary={false} icon={LogOut} className="w-full">
                                    Logout
                                </MainButton>
                            ) : (
                                <div className='space-y-2'>
                                    <MainButton onClick={() => { navigate('login'); toggleMenu(); }} primary={false} icon={LogIn} className="w-full">
                                        Login
                                    </MainButton>
                                    <MainButton onClick={() => { navigate('register'); toggleMenu(); }} primary={true} className="w-full">
                                        Register
                                    </MainButton>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;