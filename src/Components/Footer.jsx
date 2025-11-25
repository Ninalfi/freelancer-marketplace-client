import React from 'react';

const Footer = ({ isDark }) => {
    return (
        <footer className={`mt-12 py-6 border-t ${isDark ? 'bg-gray-900 border-gray-700 text-gray-400' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
                &copy; {new Date().getFullYear()} Skillio. All rights reserved By Alfi Sharin Ninad. | Built with React and Firebase.
            </div>
        </footer>
    );
};

export default Footer;