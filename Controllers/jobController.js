import { nanoid } from "nanoid";
import Job from "../Models/Job.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../Errors/customErrors.js";

let jobs = [
  { id: "abc123", company: "Apple", title: "Front End Developer" },
  { id: nanoid(), company: "Google", title: "Back End Developer" },
  { id: nanoid(), company: "Facebook", title: "Full Stack Developer" },
];

const getAllJobs = async (req, res) => {
  const jobs = await Job.find();
  res.status(StatusCodes.OK).json(jobs);
};

const createJob = async (req, res) => {
  let { company, position } = req.body;
  company = company?.trim();
  position = position?.trim();
  if (!company) {
    return res.status(400).json({ message: "Please provide a valied company" });
  }
  if (!position) {
    return res
      .status(400)
      .json({ message: "Please provide a valied position" });
  }

  const job = await Job.create({ company, position });
  // const job = await Job.create('req body');
  res.status(StatusCodes.CREATED).json(job);
  console.log(error);
  res.status(500).json({ message: "Internal Server Error" });
};

const getJobById = async (req, res) => {
  const id = req.params.id;

  console.log(id + " job Id");

  if (!id) {
    return res.status(400).json({ message: "Please provide a valid id" });
  }

  const job = await Job.findById(id);

  if (!job) {
    // return res.status(400).json({ message: "No job found with this id" });
    throw new NotFoundError(`No job found with this id : ${id}`);
  }

  res.status(StatusCodes.OK).json(job);
};

const editJobById = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ message: "Please provide a valid id" });
  }
  const job = Job.findById(id);
  if (!job) {
    return res.status(400).json({ message: "No job found with this id" });
  }
  let { company, title } = req.body;
  company = company?.trim();
  title = title?.trim();
  req.body.company = company || job.company;
  req.body.title = title || job.title;
  const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.status(StatusCodes.OK).json(updatedJob);
};

const deleteJobById = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: "Please provide a valid id" });
  }

  const job = await Job.findById(id);

  if (!job) {
    return res.status(400).json({ message: "No job found with this id" });
  }

  await Job.findByIdAndDelete(id);

  res.status(StatusCodes.OK).json({ message: "Job deleted successfully" });
};

export { getAllJobs, getJobById, editJobById, deleteJobById, createJob };
