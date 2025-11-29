import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="animate-spin rounded-full h-16 w-16 border-t-6 border-b-5 border-green-600 dark:border-green-400"></div>

      <p className="ml-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
        Loading...
      </p>
    </div>
  );
};

export default LoadingSpinner;