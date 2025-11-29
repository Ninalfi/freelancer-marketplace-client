import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { Briefcase, User, Mail, CalendarDays } from 'lucide-react';
import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', 
  withCredentials: true,
  });

const JobDetails = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true); // Added loading state
    const [isAccepted, setIsAccepted] = useState(false); // To prevent double-accepts
    const { user, loading: authLoading } = useContext(AuthContext); // Destructure user and authLoading
    const navigate = useNavigate();

    // --- Data Fetching ---
    useEffect(() => {
        setLoading(true);
        // FIX: Use axiosInstance for correct base URL and credentials
        axiosInstance
          .get(`/jobs/${id}`)
          .then((res) => {
            setJob(res.data);
            setLoading(false);
          })
          .catch((err) => {
            console.error("Error fetching job details:", err);
            toast.error("❌ Failed to load job details.");
            setLoading(false);
          });
    }, [id]);
    const handleAcceptJob = () => {
        if (authLoading) return; // Wait until auth state is confirmed
        
        // 1. Check if user is logged in
        if (!user) {
            toast.error("🔒 You must be logged in to accept a job.");
            navigate("/login");
            return;
        }

        // 2. Check if user is the poster (already implemented)
        if (job.userEmail === user?.email) {
            toast.error("❌ You cannot accept your own posted job!");
            return;
        }

        const acceptedData = {
            jobId: id,
            title: job.title,
            category: job.category,
            postedBy: job.postedBy,
            userEmail: user?.email, // Email of the person accepting the job
            creatorEmail: job.userEmail, // Email of the person who posted the job
            coverImage: job.coverImage,
            acceptedAt: new Date(),
        };

        // FIX: Use axiosInstance for POST request
        axiosInstance
            .post("/acceptedTasks", acceptedData)
            .then(() => {
                toast.success("✔ Job accepted successfully! Check 'My Accepted Tasks'.");
                setIsAccepted(true); // Disable button immediately
                navigate("/my-accepted-tasks");
            })
            .catch((err) => {
                console.error("Task acceptance failed:", err.response?.data);
                toast.error(err.response?.data?.message || "❌ Failed to accept job.");
            });
    };

    if (loading || authLoading) return <p className="text-center mt-10">Loading details...</p>;
    if (!job) return <p className="text-center mt-10 text-red-500">Job not found.</p>;

    const canAccept = user && job.userEmail !== user.email && !isAccepted;

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-2xl rounded-xl overflow-hidden">
                <img
                    src={job.coverImage || 'placeholder.jpg'}
                    className="w-full h-80 object-cover rounded-t-xl"
                    alt={`${job.title} cover`}
                />

                <div className="p-8">
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3">{job.title}</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">{job.summary}</p>

                    {/* Job Metadata */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 border-y py-4 dark:border-gray-700">
                        <p className="flex items-center text-gray-700 dark:text-gray-300">
                            <Briefcase size={20} className="mr-3 text-blue-500" />
                            <strong>Category:</strong> {job.category}
                        </p>
                        <p className="flex items-center text-gray-700 dark:text-gray-300">
                            <User size={20} className="mr-3 text-purple-500" />
                            <strong>Posted By:</strong> {job.postedBy}
                        </p>
                        <p className="flex items-center text-gray-700 dark:text-gray-300">
                            <Mail size={20} className="mr-3 text-red-500" />
                            <strong>Creator Email:</strong> {job.userEmail}
                        </p>
                         {job.postedDateTime && (
                            <p className="flex items-center text-gray-700 dark:text-gray-300">
                                <CalendarDays size={20} className="mr-3 text-yellow-500" />
                                <strong>Posted On:</strong> {new Date(job.postedDateTime).toLocaleDateString()}
                            </p>
                        )}
                    </div>

                    {/* Accept Button with Conditional States */}
                    <button
                        onClick={handleAcceptJob}
                        disabled={!canAccept}
                        className={`mt-5 px-6 py-3 rounded-lg text-lg transition w-full font-semibold ${
                            !user 
                                ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed text-gray-700 dark:text-gray-400'
                            : isAccepted
                                ? 'bg-green-700 cursor-not-allowed text-white'
                            : job.userEmail === user?.email
                                ? 'bg-red-500 cursor-not-allowed text-white'
                            : 'bg-green-600 hover:bg-green-700 text-white'
                        }`}
                    >
                        {!user ? (
                            'Login to Accept'
                        ) : isAccepted ? (
                            'Task Accepted!'
                        ) : job.userEmail === user?.email ? (
                            'Cannot Accept Own Task'
                        ) : (
                            'Accept Job'
                        )}
                    </button>
                    
                    {!user && <p className="text-center text-sm mt-3 text-red-500">You must log in to accept tasks.</p>}
                </div>
            </div>
        </div>
    );
};

export default JobDetails;




        