import React from 'react';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

const ToastDisplay = ({ toast, isDark }) => {
    if (!toast) return null;

    let icon, colorClasses, backgroundClasses;

    switch (toast.type) {
        case 'success':
            icon = <CheckCircle className="w-5 h-5" />;
            colorClasses = 'text-green-500';
            backgroundClasses = 'bg-green-50 border-green-400';
            break;
        case 'error':
            icon = <XCircle className="w-5 h-5" />;
            colorClasses = 'text-red-500';
            backgroundClasses = 'bg-red-50 border-red-400';
            break;
        case 'warning':
            icon = <AlertTriangle className="w-5 h-5" />;
            colorClasses = 'text-yellow-500';
            backgroundClasses = 'bg-yellow-50 border-yellow-400';
            break;
        default:
            icon = <AlertTriangle className="w-5 h-5" />;
            colorClasses = 'text-blue-500';
            backgroundClasses = 'bg-blue-50 border-blue-400';
    }

    const toastClasses = isDark ? 'bg-gray-700 text-white shadow-xl' : `${backgroundClasses} text-gray-800 shadow-lg`;

    return (
        <div className="fixed top-20 right-4 z-[100] transition-all duration-300 transform translate-x-0">
            <div className={`flex items-center p-4 rounded-lg border-l-4 ${toastClasses} ${colorClasses.replace('text-', 'border-')}`}>
                <div className={`flex-shrink-0 ${colorClasses}`}>
                    {icon}
                </div>
                <div className="ml-3 text-sm font-medium">
                    {toast.message}
                </div>
            </div>
        </div>
    );
};

export default ToastDisplay;