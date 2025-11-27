import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth/AuthContext";
import toast from "react-hot-toast";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://your-server.vercel.app/allJobs/${id}`)
      .then((res) => setJob(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!job) return <p className="text-center mt-10">Loading details...</p>;

  // Accept job
  const handleAcceptJob = () => {
    if (job.userEmail === user?.email) {
      toast.error("❌ You cannot accept your own posted job!");
      return;
    }

    const acceptedData = {
      jobId: id,
      title: job.title,
      category: job.category,
      postedBy: job.postedBy,
      userEmail: user?.email,
      coverImage: job.coverImage,
      acceptedAt: new Date()
    };

    axios
      .post("https://your-server.vercel.app/acceptedTasks", acceptedData)
      .then(() => {
        toast.success("✔ Job accepted successfully!");
        navigate("/my-accepted-tasks");
      })
      .catch(() => toast.error("❌ Failed to accept job."));
  };

  return (
    <div className="px-8 py-10 max-w-3xl mx-auto">
      <img
        src={job.coverImage}
        className="w-full h-60 object-cover rounded-lg shadow mb-6"
        alt=""
      />

      <h1 className="text-4xl font-bold mb-3">{job.title}</h1>
      <p className="text-gray-600 mb-4">{job.summary}</p>

      <div className="grid grid-cols-2 gap-4 my-6">
        <p><strong>Category:</strong> {job.category}</p>
        <p><strong>Posted By:</strong> {job.postedBy}</p>
      </div>

      <button
        onClick={handleAcceptJob}
        className="mt-5 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg transition w-full"
      >
        Accept Job
      </button>
    </div>
  );
};

export default JobDetails;
