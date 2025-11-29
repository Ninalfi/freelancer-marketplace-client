import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react"
import JobCard from "./JobCard";
import { AuthContext} from "../contexts/AuthContext";
import LoadingSpinner from "../Components/LoadingSpinner";


const Home = () => {
  const [latestJobs, setLatestJobs] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext)

  useEffect(() => {
    axios
      .get("http://localhost:3000/jobs?limit=6")
      .then((res) => {
        setLatestJobs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
  // Simulate page load spinner (optional: use real data fetching)
  const timer = setTimeout(() => {
    setPageLoading(false);
  }, 700); 
  return () => clearTimeout(timer);
}, []);

    const navigate = useNavigate();
  const handleBrowseJobs = () => {
  if (user) {
    navigate("/allJobs");
  } else {
    navigate("/register"); 
  }
};

if (pageLoading) return <LoadingSpinner/>;

  return (
    <div className="space-y-16">
      <section className="relative flex flex-col lg:flex-row items-center justify-between  bg-linear-to-r from-green-500 to-green-800 text-white px-8 py-24 rounded-lg shadow-lg">
        <motion.div
    initial={{ x: -50, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.8 }}
    className="space-y-5 max-w-xl"
  >
    <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
      Hire Talent. <br /> Find Work. Faster.
    </h1>

    <p className="text-lg">
      Search thousands of freelance opportunities and hire experts with confidence.
    </p>
    <div className="flex bg-white rounded-full overflow-hidden max-w-md shadow-lg mt-4">
      <input
        type="text"
        placeholder="Search jobs e.g. web developer..."
        className="w-full px-5 py-3 outline-none text-gray-700"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            window.location.href = `/all-jobs?search=${e.target.value}`;
          }
        }}
      />
      <button
        onClick={() => {
          const value = document.querySelector("input")?.value;
          if (value) window.location.href = `/all-jobs?search=${value}`;
        }}
        className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6"
      >
        Search
      </button>
    </div>

    <div className="flex gap-4">
      <button
  onClick={handleBrowseJobs}
  className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200"
>
  Browse Jobs
</button>
      <Link
        to="/add-job"
        className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-purple-600 font-semibold"
      >
        Create a Job
      </Link>
    </div>
  </motion.div>

  <img
    src="https://i.ibb.co.com/GfWy1L3r/faizur-rehman-p-HPzd-EHN6-Os-unsplash.jpg"
    alt="Banner Illustration"
    className="w-full lg:w-1/2 mt-10 lg:mt-0"
  />
      </section>

      {/* ----------- Dynamic Latest Jobs ----------- */}
       <section className="px-6 md:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-6 text-center md:text-left">Latest Jobs</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 sm:text-center">
          {latestJobs?.slice(0, 6).map((job) => (
            <motion.div
              key={job._id}
              whileHover={{ scale: 1.05 }}
              className="border rounded-lg p-5 shadow-md bg-white"
            >
              <img src={job.coverImage} className="h-36 w-full rounded-md object-cover" />
              <h3 className="text-xl font-semibold mt-3 text-green-500">{job.title}</h3>
              <p className="text-gray-600">{job.category}</p>
              <Link
                to={`/jobs/${job._id}`}
                className="mt-4 inline-block bg-linear-to-r from-green-500 to-green-800 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                View Details
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

       <section className="px-4 md:px-6 lg:px-8 text-center mt-12">
         <h2 className="text-3xl font-bold mb-6">Top Categories</h2>

  {loading ? (
    <p className="text-gray-500">Loading categories...</p>
  ) : (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4  gap-6">

      {[...new Map(latestJobs.map(item => [item.category, item.coverImage])).entries()]
      .slice(0, 4)
        .map(([category, img], index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            onClick={() => window.location.href = `/all-jobs?category=${category}`} // clickable filter
            className="rounded-lg bg-linear-to-r from-green-500 to-green-800 overflow-hidden shadow-lg cursor-pointer border border-gray-200 hover:shadow-xl transition flex flex-col"
          >
            <img
              src={img}
              alt={category}
              className="h-32 w-full object-cover"
            />
            <p className="py-2 font-semibold">{category}</p>
          </motion.div>
        ))}
    </div>
  )}
      </section>

      {/* ----------- About Platform ----------- */}
      <section className="px-8 py-12 bg-gray-100 dark:bg-gray-900 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">About Freelance Marketplace</h2>
        <p className="text-lg md:text-xl">
          Freelance Marketplace is a reliable platform where clients can post jobs
          and freelancers can find meaningful work. We connect talent with
          opportunities efficiently, providing a seamless experience for everyone.
        </p>
      </section>
    </div>
  );
};

export default Home;


