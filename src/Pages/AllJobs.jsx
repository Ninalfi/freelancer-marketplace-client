import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import JobCard from './JobCard';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/jobs', 
  withCredentials: true,
  });
   
const AllJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState('desc'); 

    useEffect(() => {
        setLoading(true);
        axiosInstance.get("http://localhost:3000/jobs?sort=${sortOrder}`")
           .then(res => {
            const rawJobs = res.data;
            const jobIds = new Set();
            const uniqueJobs = rawJobs.filter(job => {
                if (jobIds.has(job._id)) {
                    return false; 
                } else {
                    jobIds.add(job._id);
                    return true; 
                }
            });
            setJobs(uniqueJobs); 
            setLoading(false);
        })
        .catch(err => {
          
        });
}, [sortOrder]);

    if (loading) {
        return <div className="text-center my-20">Loading jobs...</div>; 
    }

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-4xl font-extrabold text-center mb-8 text-gray-900 dark:text-white">Explore All Job Openings</h2>
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