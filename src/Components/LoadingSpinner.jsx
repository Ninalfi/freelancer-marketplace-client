import React from 'react';

const LoadingSpinner = () => {
  return (
    // Centers the spinner on the screen with a flex container
    <div className="flex justify-center items-center h-screen w-full">
      {/* The spinner visual element */}
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500 dark:border-indigo-400"></div>
      
      {/* Optional: Loading text */}
      <p className="ml-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
        Loading...
      </p>
    </div>
  );
};

export default LoadingSpinner;