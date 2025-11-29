import { Briefcase, CalendarDays, User } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import defaultJobImg from '../assets/defaultJobImg.svg';

const JobCard = ({ job }) => {
  return (
     <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-xl text-center">
            <img src={job.coverImage || defaultJobImg } alt={job.title} className="w-full h-40 object-cover" />
            <div className="p-5 flex flex-col flex-grow text-center ">
                <h3 className="text-xl font-bold  text-green-500 dark:text-green-700 mb-2">{job.title}</h3>
                <p className="text-sm text-purple-600 dark:text-lime-400 font-semibold flex justify-center items-center  mb-3">
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
                    className="mt-4 w-full text-center bg-linear-to-r from-green-500 to-green-800 hover:bg-green-200 text-white font-medium py-2 rounded transition duration-300"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
  };

export default JobCard;
