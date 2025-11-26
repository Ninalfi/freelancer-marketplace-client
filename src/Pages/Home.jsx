import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { motion } from "framer-motion"; // For animations
import JobCard from "./JobCard";


const Home = () => {
  const [latestJobs, setLatestJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch latest 6 jobs from backend
    axios
      .get("http://localhost:3000/allJobs?limit=6")
      .then((res) => {
        setLatestJobs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-16">
      {/* ----------- Banner ----------- */}
      <section className="relative bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-24 rounded-lg shadow-lg">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Freelance Marketplace
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Discover talented freelancers and get your tasks done efficiently.
          </p>
          <div className="space-x-4">
            <Link
              to="/addJob"
              className="bg-white text-blue-600 px-6 py-3 rounded font-semibold shadow hover:bg-gray-100 transition"
            >
              Create a Job
            </Link>
            <Link
              to="/allJobs"
              className="border border-white px-6 py-3 rounded hover:bg-white hover:text-blue-600 transition"
            >
              Explore Jobs
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ----------- Dynamic Latest Jobs ----------- */}
      <section className="px-8">
        <h2 className="text-3xl font-bold mb-6">Latest Jobs</h2>
        {loading ? (
          <p>Loading jobs...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestJobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </section>

      {/* ----------- Top Categories ----------- */}
      <section className="px-8">
        <h2 className="text-3xl font-bold mb-6">Top Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {["Web Development", "Graphic Design", "Digital Marketing", "Writing"].map(
            (category, idx) => (
              <div
                key={idx}
                className="bg-blue-100 dark:bg-gray-800 text-center p-6 rounded-lg shadow hover:scale-105 transition"
              >
                <p className="font-semibold">{category}</p>
              </div>
            )
          )}
        </div>
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
