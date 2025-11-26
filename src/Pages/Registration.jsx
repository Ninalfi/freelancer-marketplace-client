import React, { useState } from 'react';
import { UserPlus, Send, AlertCircle } from 'lucide-react';
import useAuth from '../hooks/useAuth.js';

const MainButton = ({ children, onClick, primary = true, disabled = false, icon: Icon = null, type = 'button' }) => (
    <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`
        flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-lg transition duration-300 shadow-lg w-full
        ${primary
            ? 'bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-indigo-400'
            : 'bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50 disabled:bg-gray-100'
        }
      `}
    >
        {Icon && <Icon className="w-4 h-4 mr-2" />}
        {children}
    </button>
);

const PasswordRule = ({ isValid, message, isDark }) => (
    <p className={`flex items-center text-xs ${isValid ? 'text-green-500' : (isDark ? 'text-gray-400' : 'text-gray-500')}`}>
        {isValid ? <UserPlus className="w-3 h-3 mr-1 text-green-500" /> : <AlertCircle className="w-3 h-3 mr-1" />}
        {message}
    </p>
);

const Registration = ({ navigate, showToast, auth, isDark }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const { validatePassword, handleRegistration, handleGoogleAuth } = useAuth(auth, showToast, navigate);
    const passwordError = validatePassword(password);

    const isMinLength = password.length >= 6;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwordError) {
            showToast(passwordError, 'error');
            return;
        }

        setLoading(true);
        await handleRegistration(name, email, photoURL, password);
        setLoading(false);
    };

    const handleGoogleClick = async () => {
        setLoading(true);
        await handleGoogleAuth();
        setLoading(false);
    };

    const inputClasses = `w-full p-3 border rounded-lg transition duration-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'}`;
    const labelClasses = `block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`;

    return (
        <div className={`max-w-xl mx-auto p-8 rounded-xl shadow-2xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-3xl font-bold mb-6 text-center ${isDark ? 'text-indigo-400' : 'text-indigo-700'}`}>Create Your TalentLink Account</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className={labelClasses}>Full Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className={inputClasses} />
                </div>
                <div>
                    <label className={labelClasses}>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputClasses} />
                </div>
                <div>
                    <label className={labelClasses}>Photo URL (Optional)</label>
                    <input type="url" value={photoURL} onChange={(e) => setPhotoURL(e.target.value)} className={inputClasses} />
                </div>
                <div>
                    <label className={labelClasses}>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className={inputClasses} />
                    <div className="mt-2 grid grid-cols-3 gap-2">
                        <PasswordRule isValid={isMinLength} message="6 characters minimum" isDark={isDark} />
                        <PasswordRule isValid={hasUpperCase} message="One uppercase letter" isDark={isDark} />
                        <PasswordRule isValid={hasLowerCase} message="One lowercase letter" isDark={isDark} />
                    </div>
                </div>
                <MainButton type="submit" primary={true} disabled={loading || !!passwordError} icon={UserPlus}>
                    {loading ? 'Registering...' : 'Register'}
                </MainButton>
            </form>

            <div className="mt-6 space-y-3">
                <div className={`relative flex justify-center text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <span className={`px-2 ${isDark ? 'bg-gray-800' : 'bg-white'} z-10`}>OR</span>
                    <div className={`absolute inset-y-0 left-0 right-0 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} mt-3`}></div>
                </div>
                <MainButton onClick={handleGoogleClick} primary={false} disabled={loading} icon={Send}>
                    Register with Google
                </MainButton>
            </div>
            <p className={`mt-6 text-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Already have an account? <button onClick={() => navigate('login')} className="text-indigo-600 hover:underline font-semibold">Login</button>
            </p>
        </div>
    );
};

export default Registration;