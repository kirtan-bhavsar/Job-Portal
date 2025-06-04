import { nanoid } from "nanoid";

let jobs = [
  { id: "abc123", company: "Apple", title: "Front End Developer" },
  { id: nanoid(), company: "Google", title: "Back End Developer" },
  { id: nanoid(), company: "Facebook", title: "Full Stack Developer" },
];

const getAllJobs = async (req, res) => {
  res.status(200).json(jobs);
};

const createJob = async (req, res) => {
  let { company, title } = req.body;
  company = company?.trim();
  title = title?.trim();
  if (!company) {
    return res.status(400).json({ message: "Please provide a valied company" });
  }
  if (!title) {
    return res.status(400).json({ message: "Please provide a valied title" });
  }
  const id = nanoid();
  const job = { id, company, title };
  jobs.push(job);
  res.status(200).json(job);
};

const getJobById = async (req, res) => {
  const id = req.params.id;

  // console.log(id);

  if (!id) {
    return res.status(400).json({ message: "Please provide a valid id" });
  }

  const job = jobs.find((job) => job.id === id);

  console.log(job);

  if (!job) {
    throw new Error("No job found with this id with throw new Error");
    return res.status(200).json({ message: "No job found with this id" });
  }

  res.status(200).json(job);
};

const editJobById = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ message: "Please provide a valid id" });
  }
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(400).json({ message: "No job found with this id" });
  }
  let { company, title } = req.body;
  company = company?.trim();
  title = title?.trim();
  job.company = company || job.company;
  job.title = title || job.title;
  res.status(200).json(job);
};

const deleteJobById = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: "Please provide a valid id" });
  }

  const job = jobs.find((job) => job.id === id);

  if (!job) {
    return res.status(400).json({ message: "No job found with this id" });
  }

  const remainingJobs = jobs.filter((job) => job.id !== id);
  jobs = remainingJobs;

  res.status(200).json({ message: "Job deleted successfully", remainingJobs });
};

export { getAllJobs, getJobById, editJobById, deleteJobById, createJob };
