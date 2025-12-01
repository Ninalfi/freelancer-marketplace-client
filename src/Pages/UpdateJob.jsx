import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jobData, setJobData] = useState({
    title: "",
    category: "",
    summary: "",
    coverImage: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`https://freelance-marketplace-server-hazel.vercel.app/jobs/${id}`);
        setJobData(res.data);
      } catch (err) {
        console.error(err);
        toast.error("❌ Failed to load job data");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`https://freelance-marketplace-server-hazel.vercel.app/jobs/${id}`, jobData);
      toast.success("✅ Job updated successfully!");
      navigate("/my-added-jobs");
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to update job");
    }
  };

  if (loading) return <p className="text-center py-12">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white dark:bg-gray-800 shadow-lg p-8 rounded-xl">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
        Update Job
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
            {[
              "Web Development",
              "Digital Marketing",
              "Graphics Design",
              "UI/UX",
              "Content Writing",
              "SEO",
              "Mobile App Development",
            ].map((cat, idx) => (
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

        <button
          type="submit"
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg text-lg font-semibold transition"
        >
          Update Job
        </button>
      </form>
    </div>
  );
};

export default UpdateJob;
