import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { Briefcase, User, Mail, CalendarDays } from 'lucide-react';
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "../Components/LoadingSpinner";
import defaultJobImg from "../assets/defaultJobImg.svg";

const axiosInstance = axios.create({
  baseURL: 'https://freelance-marketplace-server-hazel.vercel.app', 
  withCredentials: true,
  });

const JobDetails = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAccepted, setIsAccepted] = useState(false); 
    const { user, loading: authLoading } = useContext(AuthContext); 
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;
        setLoading(true);

        axiosInstance .get(`/jobs/${id}`)
          .then((res) => {
            setJob(res.data);
            setLoading(false);
          })
         .catch((err) => {
        console.error("Error fetching job details:", err.response?.data || err);
        toast.error(err.response?.data?.message || " Job not found.");
        setJob(null);
        setLoading(false);
      });
  }, [id]);
    const handleAcceptJob = () => {
        if (authLoading) return; 
        if (!user) {
            toast.error("🔒 You must be logged in to accept a job.");
            navigate("/login");
            return;
            
        }
        if (job.userEmail === user?.email) {
            toast.error(" You cannot accept your own posted job!");
            return;
        }

        const acceptedData = {
          jobId: id,
            title: job.title,
            category: job.category,
            postedBy: job.postedBy,
            accepterEmail: user.email,
            creatorEmail: job.postedBy,
            coverImage: job.coverImage,
            acceptedAt: new Date(),
        };
        axiosInstance
            .post("/my-accepted-tasks", acceptedData)
            .then(() => {
                toast.success("✔ Job accepted successfully! Check 'My Accepted Tasks'.");
                setIsAccepted(true); 
                navigate("/my-accepted-tasks");
            })
            .catch((err) => {
                console.error("Task acceptance failed:", err.response?.data);
                toast.error(err.response?.data?.message || " Failed to accept job.");
            });
    };

    if (loading || authLoading) return <LoadingSpinner></LoadingSpinner>;
    if (!job) return ( <div className="text-center mt-10">
      <p className="text-red-500 text-xl">Job not found.</p>
      <Link to="/" className="mt-4 inline-block text-green-600 hover:underline">
        Back to Home
      </Link>
    </div>
    );

    const canAccept = user && job.userEmail !== user?.email && !isAccepted;


    return (
        <div className="container mx-auto px-4 py-10">
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-2xl rounded-xl overflow-hidden">
                <img
                    src={job.coverImage || defaultJobImg}
                    className="w-full h-80 object-cover rounded-t-xl"
                    alt={`${job.title} cover`}
                />

                <div className="p-8">
                    <h1 className="text-4xl text-center font-extrabold text-gray-900 dark:text-white mb-3">{job.title}</h1>
                    <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-6">{job.summary}</p>

                    {/* Job Metadata */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 border-y py-4 dark:border-gray-700">
                        <p className="flex items-center text-gray-700 dark:text-gray-300">
                            <Briefcase size={20} className="mr-3 text-blue-500" />
                            <strong>Category: </strong> {job.category}
                        </p>
                        <p className="flex items-center text-gray-700 dark:text-gray-300">
                            <User size={20} className="mr-3 text-green-500" />
                            <strong>Posted By: </strong> {job.postedBy}
                        </p>
                        <p className="flex items-center text-gray-700 dark:text-gray-300">
                            <Mail size={20} className="mr-3 text-red-500" />
                            <strong>Creator Email: </strong> {job.userEmail}
                        </p>
                         {job.postedDateTime && (
                            <p className="flex items-center text-gray-700 dark:text-gray-300">
                                <CalendarDays size={20} className="mr-3 text-yellow-500" />
                                <strong>Posted On:</strong> {new Date(job.postedDateTime).toLocaleDateString()}
                            </p>
                        )}
                    </div>
                    <button
                        onClick={handleAcceptJob}
                        disabled={!canAccept && !isAccepted && user}
                        className={`mt-5 px-6 py-3 rounded-lg text-lg transition w-full font-semibold ${
                            !user 
                                ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed text-gray-700 dark:text-gray-400'
                            : isAccepted
                                ? 'bg-green-700 cursor-not-allowed text-white'
                            : job.userEmail === user?.email
                                ? 'bg-red-500 cursor-not-allowed text-white'
                            : 'bg-linear-to-r from-green-400 to-green-700 hover:bg-green-700 text-white'
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
                    <Link to={`/`} className="text-md dark:text-lime-300 text-green-600 hover:underline text-center mt-4 block">
                    Back to Home →
                  </Link>
                    
                    {!user && <p className="text-center text-sm mt-3 text-red-500">You must log in to accept tasks.</p>}
                </div>
            </div>
        </div>
    );
};

export default JobDetails;




        