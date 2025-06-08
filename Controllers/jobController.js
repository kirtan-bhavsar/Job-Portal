import { nanoid } from "nanoid";
import Job from "../Models/Job.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../Errors/customErrors.js";

const getAllJobs = async (req, res) => {
  const jobs = await Job.find();
  res.status(StatusCodes.OK).json(jobs);
};

const createJob = async (req, res) => {
  const job = await Job.create(req.body);

  res.status(StatusCodes.CREATED).json(job);
};

const getJobById = async (req, res) => {
  const id = req.params.id;

  const job = await Job.findById(id);

  res.status(StatusCodes.OK).json(job);
};

const editJobById = async (req, res) => {
  const id = req.params.id;

  const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(StatusCodes.OK).json(updatedJob);
};

const deleteJobById = async (req, res) => {
  const id = req.params.id;

  await Job.findByIdAndDelete(id);

  res.status(StatusCodes.OK).json({ message: "Job deleted successfully" });
};

export { getAllJobs, getJobById, editJobById, deleteJobById, createJob };
