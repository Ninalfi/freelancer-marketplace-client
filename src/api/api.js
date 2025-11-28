const baseURL = "http://localhost:3000";

export const getJobs = async () => {
  const res = await fetch(`${baseURL}/jobs`);
  return res.json();
};

export const getJobById = async (id) => {
  const res = await fetch(`${baseURL}/jobs/${id}`);
  return res.json();
};

export const createJob = async (jobData) => {
  const res = await fetch(`${baseURL}/jobs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(jobData),
  });

  return res.json();
};
