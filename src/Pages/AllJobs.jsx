import { useEffect, useState } from 'react';
import axios from 'axios';
import JobCard from './JobCard';
import LoadingSpinner from '../Components/LoadingSpinner';
   
const AllJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState('desc'); 
    const [searchQuery, setSearchQuery] = useState('');
   const [categoryFilter, setCategoryFilter] = useState('');


     const fetchJobs = async () => {
    try {
      setLoading(true);

      let url = `https://freelance-marketplace-server-hazel.vercel.app/jobs?sort=${sortOrder}`;
      if (searchQuery) url += `&search=${encodeURIComponent(searchQuery)}`;
      if (categoryFilter) url += `&category=${encodeURIComponent(categoryFilter)}`;

      const res = await axios.get(url, { withCredentials: true });

      const jobIds = new Set();
      const uniqueJobs = res.data.filter(job => {
        if (jobIds.has(job._id)) return false;
        jobIds.add(job._id);
        return true;
      });

      setJobs(uniqueJobs);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [sortOrder, searchQuery, categoryFilter]);

    if (loading) return <LoadingSpinner/>;

      const categories = Array.from(new Set(jobs.map(job => job.category)));

    return (
         <div className="container mx-auto p-6">
      <h2 className="text-4xl font-extrabold text-center mb-8 text-gray-900 dark:text-white">
        Explore All Job Openings
      </h2>

      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-3">
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md flex-1"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md"
        >
          <option value="">All Categories</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))}
        </select>

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

      {jobs.length === 0 && (
        <p className="text-center text-xl text-gray-500 mt-10">No jobs found.</p>
      )}
    </div>
  );
};
export default AllJobs;