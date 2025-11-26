import React from "react";
import { Link } from "react-router";

const JobCard = ({ job }) => {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <img
        src={job.coverImage}
        alt={job.title}
        className="w-full h-40 object-cover rounded mb-4"
      />
      <h3 className="font-bold text-xl mb-2">{job.title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-2">{job.summary}</p>
      <p className="text-sm font-semibold text-blue-600 mb-2">{job.category}</p>
      <p className="text-sm">Posted by: {job.postedBy}</p>
      <Link
        to={`/allJobs/${job._id}`}
        className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      > View Details</Link>
    </div>
  );
};

export default JobCard;
