import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500 dark:border-indigo-400"></div>

      <p className="ml-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
        Loading...
      </p>
    </div>
  );
};

export default LoadingSpinner;