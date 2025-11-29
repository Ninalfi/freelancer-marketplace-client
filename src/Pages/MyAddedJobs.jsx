import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/AuthContext";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/jobs",
  withCredentials: true,
});

export default function MyAddedJobs() {
  const { user } = useContext(AuthContext) || {};
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) {
      setJobs([]);
      setLoading(false);
      return;
    }

    const fetchMyJobs = async () => {
      try {
        setLoading(true);
        // Fetch only jobs by logged-in user
        const res = await axiosInstance.get(`/user/${encodeURIComponent(user.email)}`);
        setJobs(res.data || []);
      } catch (err) {
        console.error("Failed to fetch my jobs:", err);
        toast.error("🚫 Failed to load your jobs.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyJobs();
  }, [user]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this job?");
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/${id}`);
      setJobs((prev) => prev.filter((job) => job._id !== id));
      toast.success("🗑 Job deleted successfully.");
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("❌ Failed to delete job.");
    }
  };

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center">
        <p className="text-lg text-red-600 mb-4">You must be logged in to view your posted jobs.</p>
        <button onClick={() => navigate("/login")} className="bg-indigo-600 text-white px-4 py-2 rounded">
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">My Added Jobs</h2>

      {loading ? (
        <div className="text-center py-12">Loading your jobs...</div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">You haven't added any jobs yet.</p>
          <Link to="/addJob" className="inline-block bg-green-600 text-white px-5 py-2 rounded">
            Add a Job
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div key={job._id} className="bg-white dark:bg-gray-800 border rounded-lg overflow-hidden shadow-sm flex flex-col">
              <img
                src={job.coverImage || "https://via.placeholder.com/600x360?text=No+Image"}
                alt={job.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold mb-1">{job.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{job.category}</p>
                <p className="text-gray-700 text-sm mb-4 line-clamp-3">{job.summary}</p>

                <div className="mt-auto flex items-center justify-between gap-2">
                  <div className="flex gap-2">
                    <Link to={`/update-job/${job._id}`} className="px-3 py-1 bg-yellow-400 rounded text-sm font-medium">
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(job._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>

                  <Link to={`/job/${job._id}`} className="text-sm text-indigo-600 hover:underline">
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
