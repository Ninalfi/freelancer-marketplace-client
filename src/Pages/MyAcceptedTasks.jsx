import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import LoadingSpinner from "../Components/LoadingSpinner";
import Swal from "sweetalert2";

const MyAcceptedTasks = () => {
  const { user } = useContext(AuthContext);
  const [acceptedJobs, setAcceptedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    axios.get(`https://freelance-marketplace-server-hazel.vercel.app/my-accepted-tasks/${encodeURIComponent(user.email)}`)
      .then(res => {
        setAcceptedJobs(res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load accepted tasks");
        setLoading(false);
      });

  }, [user]);

  const handleRemove = async (id, action) => {
     if (action === "Completed") {
    // Directly show success alert for Done
    try {
      await axios.delete(`http://localhost:3000/my-accepted-tasks/${id}`);
      setAcceptedJobs(prev => prev.filter(job => job._id !== id));
      Swal.fire({
        title: "Job Completed!",
        text: "You have successfully completed this task.",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6"
      });
    } catch (error) {
      console.error("Failed to complete task:", error);
      Swal.fire("Error", "Failed to mark task as done.", "error");
    }
  } else if (action === "Cancelled") {
    // Show confirmation for cancelling
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This task will be cancelled.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, Cancel it!"
    });

    if (!result.isConfirmed) return;
    try {
      await axios.delete(`http://localhost:3000/my-accepted-tasks/${id}`);
      setAcceptedJobs(prev => prev.filter(job => job._id !== id));
      Swal.fire('Your job has been canceled.', 'success');
    } catch (error) {
        console.error("Failed to update task:", error);
      Swal.fire('Error', 'Failed to cancel job.', 'error');
    }
  }
  };

  if (!user)
    return <p className="text-center text-red-500 text-xl mt-10">Please login to view tasks.</p>;

  if (loading)
    return <LoadingSpinner></LoadingSpinner>

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">My Accepted Tasks</h2>

      {acceptedJobs.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No accepted tasks yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {acceptedJobs.map(job => (
            <div key={job._id} className="border p-5 rounded-lg shadow-md bg-white space-y-2">
              <img src={job.coverImage} alt="" className="h-32 w-full object-cover rounded" />

              <h3 className="text-xl text-center text-green-600 font-semibold">{job.title}</h3>
              <p className="text-gray-500 text-center">{job.category}</p>
              <p className="text-gray-600 text-sm">Posted By: {job.creatorEmail}</p>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleRemove(job._id, "Completed")}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  ✅ Done
                </button>

                <button
                  onClick={() => handleRemove(job._id, "Cancelled")}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  ❌ Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAcceptedTasks;
