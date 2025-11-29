import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/jobs",
  withCredentials: true,
});

const AddJob = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [jobData, setJobData] = useState({
    title: "",
    category: "",
    summary: "",
    coverImage: "",
  });

  const categories = [
    "Web Development",
    "Digital Marketing",
    "Graphics Design",
    "UI/UX",
    "Content Writing",
    "SEO",
    "Mobile App Development",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!jobData.title || !jobData.category || !jobData.summary || !jobData.coverImage) {
      toast.error("⚠ Please fill all required fields!");
      return;
    }

    const finalJobData = {
      ...jobData,
      postedBy: user?.displayName,
      userEmail: user?.email,
      postedDateTime: new Date(),
    };

    try {
      await axiosInstance.post("/", finalJobData);
      toast.success("🎉 Job added successfully!");
      navigate("/my-added-jobs");
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to add job");
    }
  };

  if (!user)
    return (
      <p className="text-center mt-10 text-red-500 text-xl">
        Please login to add a job.
      </p>
    );

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white dark:bg-gray-800 shadow-lg p-8 rounded-xl">
      
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
        Add New Job
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Title */}
        <div>
          <label className="text-gray-700 font-semibold dark:text-gray-300">
            Job Title *
          </label>
          <input
            type="text"
            name="title"
            value={jobData.title}
            onChange={handleChange}
            placeholder="Enter job title"
            className="w-full p-3 border rounded-md mt-1 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Category */}
        <div>
          <label className="text-gray-700 font-semibold dark:text-gray-300">
            Category *
          </label>
          <select
            name="category"
            value={jobData.category}
            onChange={handleChange}
            className="w-full p-3 border rounded-md mt-1 dark:bg-gray-700 dark:text-white"
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Summary */}
        <div>
          <label className="text-gray-700 font-semibold dark:text-gray-300">
            Summary *
          </label>
          <textarea
            name="summary"
            value={jobData.summary}
            onChange={handleChange}
            placeholder="Write job details..."
            rows="4"
            className="w-full p-3 border rounded-md mt-1 dark:bg-gray-700 dark:text-white"
          ></textarea>
        </div>

        {/* Cover Image */}
        <div>
          <label className="text-gray-700 font-semibold dark:text-gray-300">
            Cover Image URL *
          </label>
          <input
            type="text"
            name="coverImage"
            value={jobData.coverImage}
            onChange={handleChange}
            placeholder="Paste image link"
            className="w-full p-3 border rounded-md mt-1 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Auto-filled Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-gray-700 font-semibold dark:text-gray-300">
              Posted By
            </label>
            <input
              value={user?.displayName || ""}
              disabled
              className="w-full p-3 border rounded-md mt-1 bg-gray-100 cursor-not-allowed dark:bg-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label className="text-gray-700 font-semibold dark:text-gray-300">
              Email
            </label>
            <input
              value={user?.email}
              disabled
              className="w-full p-3 border rounded-md mt-1 bg-gray-100 cursor-not-allowed dark:bg-gray-600 dark:text-white"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg text-lg font-semibold transition"
        >
          Submit Job
        </button>
      </form>
    </div>
  );
};

export default AddJob;
