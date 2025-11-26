import { Link } from 'react-router';
import { FaHome, FaArrowLeft } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Animation */}
        <div className="mb-8 animate-bounce">
          <h1 className="text-9xl font-black bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            404
          </h1>
        </div>

        {/* Icon */}
        <div className="text-6xl mb-6">🏠</div>

        {/* Message */}
        <h2 className="text-4xl font-black text-gray-900 dark:text-gray-500 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            to="/"
            className="flex items-center gap-2 bg-linear-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-bold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <FaHome /> Go to Home
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 bg-white text-gray-700 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all shadow-md hover:shadow-lg border-2 border-gray-200"
          >
            <FaArrowLeft /> Go Back
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="mt-16 grid grid-cols-3 gap-4 max-w-sm mx-auto opacity-50">
          <div className="h-2 bg-purple-200 rounded-full animate-pulse"></div>
          <div className="h-2 bg-pink-200 rounded-full animate-pulse delay-75"></div>
          <div className="h-2 bg-purple-200 rounded-full animate-pulse delay-150"></div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;