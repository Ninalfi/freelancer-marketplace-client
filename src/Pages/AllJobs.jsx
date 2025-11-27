import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Clock, Briefcase, User, CalendarDays } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/jobs', 
  withCredentials: true,
  });

const JobCard = ({ job }) => (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-xl">
        <img src={job.coverImage || 'placeholder.jpg'} alt={job.title} className="w-full h-40 object-cover" />
        <div className="p-5 flex flex-col flex-grow">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{job.title}</h3>
            <p className="text-sm text-purple-600 dark:text-purple-400 font-semibold flex items-center mb-3">
                <Briefcase size={16} className="mr-2" />{job.category}
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm flex-grow mb-4 line-clamp-3">
                {job.summary}
            </p>
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-auto">
                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center mb-2">
                    <User size={14} className="mr-1" /> Posted By: {job.postedBy}
                </p>
                {/* Displaying posted date/time for sorting context */}
                {job.postedDateTime && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                         <CalendarDays size={14} className="mr-1" /> Posted On: {new Date(job.postedDateTime).toLocaleDateString()}
                    </p>
                )}
            </div>

            <Link 
                to={`/allJobs/${job._id}`} 
                className="mt-4 w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition duration-300"
            >
                View Details
            </Link>
        </div>
    </div>
);

const AllJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    // State for Challenge 1: Sorting
    const [sortOrder, setSortOrder] = useState('desc'); // 'desc' (newest) or 'asc' (oldest)

    useEffect(() => {
        setLoading(true);
        // Fetch jobs, passing the sort order as a query parameter
        axiosInstance.get("http://localhost:3000/jobs")
            .then(res => {
                setJobs(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching jobs:", err);
                toast.error("Failed to load jobs.");
                setLoading(false);
            });
    }, [sortOrder]); // Refetch when sortOrder changes

    if (loading) {
        return <div className="text-center my-20">Loading jobs...</div>; 
    }

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-4xl font-extrabold text-center mb-8 text-gray-900 dark:text-white">Explore All Job Openings</h2>
            
            {/* Sorting Control (Challenge 1) */}
            <div className="flex justify-end mb-6">
                <label className="text-gray-700 dark:text-gray-300 mr-3 font-medium">Sort By Date:</label>
                <select 
                    value={sortOrder} 
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md"
                >
                    <option value="desc">Newest First</option>
                    <option value="asc">Oldest First</option>
                </select>
            </div>

            {/* Job Grid Display */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {jobs.map(job => (
                    <JobCard key={job._id} job={job} />
                ))}
            </div>

            {jobs.length === 0 && <p className="text-center text-xl text-gray-500 mt-10">No jobs posted yet.</p>}
        </div>
    );
};

export default AllJobs;