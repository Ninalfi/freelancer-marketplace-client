import React from 'react';
//import useFirestore from '../hooks/useFirestore.js';
import { Briefcase, ArrowRight, DollarSign } from 'lucide-react';

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

const JobCard = ({ job, navigate, isDark }) => {
    const cardClasses = isDark ? 'bg-gray-800 border-gray-700 hover:border-indigo-500' : 'bg-white border-gray-200 hover:shadow-lg';
    const textClasses = isDark ? 'text-gray-100' : 'text-gray-900';
    const subTextClasses = isDark ? 'text-indigo-300' : 'text-indigo-600';

    return (
        <div className={`p-5 rounded-xl border transition duration-300 ${cardClasses}`}>
            <div className="flex justify-between items-start mb-3">
                <h3 className={`text-xl font-bold ${textClasses}`}>{job.title}</h3>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${isDark ? 'bg-indigo-900 text-indigo-300' : 'bg-indigo-100 text-indigo-700'}`}>
                    {job.category}
                </span>
            </div>

            <div className="mb-4">
                <img 
                    src={job.coverImage} 
                    alt={`Cover for ${job.title}`} 
                    className="w-full h-32 object-cover rounded-lg mb-3"
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x128/374151/ffffff?text=No+Image" }}
                />
            </div>

            <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'} line-clamp-3`}>
                {job.summary}
            </p>
            
            <div className={`flex items-center justify-between text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} mb-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-100'} pt-3`}>
                <div className="flex items-center">
                    <Briefcase className="w-4 h-4 mr-1" />
                    Posted by: <span className={`ml-1 font-medium ${subTextClasses}`}>{job.postedBy}</span>
                </div>
                <div className="text-xs">
                    {job.postedAt ? `Posted: ${new Date(job.postedAt.seconds * 1000).toLocaleDateString()}` : 'Date N/A'}
                </div>
            </div>

            <MainButton onClick={() => navigate('jobDetail', job.id)} primary={true} icon={ArrowRight} className="w-full">
                View Details
            </MainButton>
        </div>
    );
};

const AllJobs = ({ navigate, showToast, userId, isDark, db, appId }) => {
    const { jobs, loading } = useFirestore(db, appId, userId, showToast);
    
    if (loading) {
        return <div className={`text-center py-20 text-xl ${isDark ? 'text-white' : 'text-gray-800'}`}>Loading jobs...</div>;
    }

    return (
        <div className="space-y-8">
            <h1 className={`text-4xl font-extrabold text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Explore All Tasks
            </h1>
            <p className={`text-center ${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
                Browse high-quality jobs from top clients across various categories. Find your next project!
            </p>

            {jobs.length === 0 ? (
                <div className={`text-center py-20 border rounded-xl ${isDark ? 'border-gray-700 bg-gray-800 text-gray-400' : 'border-gray-200 bg-white text-gray-600'}`}>
                    <DollarSign className="w-12 h-12 mx-auto mb-4 text-indigo-500" />
                    <h2 className="text-2xl font-semibold mb-2">No Jobs Posted Yet</h2>
                    <p>Be the first to post a task or check back soon!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {jobs.map(job => (
                        <JobCard key={job.id} job={job} navigate={navigate} isDark={isDark} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllJobs;