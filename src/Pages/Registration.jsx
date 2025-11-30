import React, { use, useState } from 'react';
import { FaEnvelope, FaEye, FaEyeSlash, FaImage, FaLock, FaUser } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
//import useAuth from '../Hooks/useAuth';
import { AuthContext } from '../contexts/AuthContext';

const Registration = () => {
    const { createUser, signInWithGoogle, updateUserProfile } = use(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ name: '',email: '',photoURL: '',password: ''});
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({...formData,[e.target.name]: e.target.value});
    };
     const validatePassword = (password) => {
        const errors = [];
        if (password.length < 6) {
            errors.push('Password must be at least 6 characters long');
        }
        if (!/[A-Z]/.test(password)) {
            errors.push('Password must contain at least one uppercase letter');
        }
        if (!/[a-z]/.test(password)) {
            errors.push('Password must contain at least one lowercase letter');
        }
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const passwordErrors = validatePassword(formData.password);
        if (passwordErrors.length > 0) {
            passwordErrors.forEach(error => toast.error(error));
            setLoading(false);
            return;
        }

          try {
            // Create user
            await createUser(formData.email, formData.password);
            
            // Update profile
            await updateUserProfile(formData.name, formData.photoURL);
            
            toast.success('Registration successful! Welcome to HomeNest!');
            navigate('/');
             } catch (error) {
            console.error(error);
            if (error.code === 'auth/email-already-in-use') {
                toast.error('Email already in use!');
            } else if (error.code === 'auth/invalid-email') {
                toast.error('Invalid email address!');
            } else if (error.code === 'auth/weak-password') {
                toast.error('Password is too weak!');
            } else {
                toast.error(error.message || 'Registration failed!');
            }
        } finally {
            setLoading(false);
        }
    };
     const handleGoogleLogin = async () => {
        try {
            await signInWithGoogle();
            toast.success('Google registration successful!');
            navigate('/');
        } catch (error) {
            console.error(error);
            toast.error(error.message || 'Google registration failed!');
        }
    };
    return (
         <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-green-400 to-green-700 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-2xl shadow-2xl p-6 space-y-6 border border-gray-100">
                    <div className="text-center">
                        <div className="mx-auto w-12 h-12 bg-linear-to-r from-green-500 to-green-800 rounded-full flex items-center justify-center mb-3">
                            <FaUser className="text-white text-xl" />
                        </div>
                        <h2 className="text-2xl font-black text-gray-900">Skillio SignUp Now!</h2>
                        <p className="mt-1 text-sm text-gray-600">Join us and find your dream job today!</p>
                    </div>
                     <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><FaUser className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="name" name="name" type="text" required value={formData.name} onChange={handleChange} className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200" placeholder="Enter your full name"
                                />
                            </div>
                             </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaEnvelope className="h-5 w-5 text-gray-400" />
                                </div>
                                  <input id="email" name="email" type="email" autoComplete="email" required
                                    value={formData.email} onChange={handleChange} className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                                    placeholder="Enter your email"/>
                            </div>
                        </div>
                          <div>
                            <label htmlFor="photoURL" className="block text-sm font-semibold text-gray-700 mb-1">Photo URL
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaImage className="h-5 w-5 text-gray-400" />
                                </div>
                                <input id="photoURL" name="photoURL" type="url" value={formData.photoURL}
                                    onChange={handleChange} className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                                    placeholder="Enter photo URL (optional)"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1"> Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaLock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input id="password" name="password" type={showPassword ? 'text' : 'password'}
                                    autoComplete="new-password" required value={formData.password}
                                    onChange={handleChange} className="block w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                                    placeholder="Create a strong password"
                                />
                                 <button
                                    type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    {showPassword ? (
                                        <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    ) : (
                                        <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    )}
                                </button>
                            </div>
                            <p className="mt-2 text-xs text-gray-500"> Must contain uppercase, lowercase, and at least 6 characters
                            </p>
                        </div>
                          <button type="submit" disabled={loading} className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-md text-sm font-bold text-white bg-linear-to-r from-green-500 to-green-800 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                            {loading ? (
                                <div className="flex items-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    Creating account...
                                </div>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                         <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-gray-500 font-medium">Or continue with</span>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border-2 border-gray-300 rounded-lg shadow-sm bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-200"
                        >
                            <FcGoogle className="h-5 w-5 text-red-500" />
                            Sign up with Google
                        </button>
                    </form>
                     <div className="text-center pt-2">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link 
                                to="/login" 
                                className="font-semibold text-purple-600 hover:text-purple-500 transition duration-200"
                            >
                                Log/Sign In
                            </Link>
                        </p>
                    </div>
                </div>

    
            </div>
        </div>

    );
};

export default Registration;