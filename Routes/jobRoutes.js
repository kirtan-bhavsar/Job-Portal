import express from "express";
import {
  getAllJobs,
  getJobById,
  createJob,
  editJobById,
  deleteJobById,
} from "../Controllers/jobController.js";
import { validateJob } from "../Middlewares/validationMiddleware.js";

const jobRouter = express.Router();

// get all jobs
jobRouter.get("/", getAllJobs);

// create job
jobRouter.post("/add", validateJob, createJob);

// get single job
jobRouter.get("/:id", getJobById);

// edit job
jobRouter.put("/edit/:id", validateJob, editJobById);

// delete job
jobRouter.delete("/delete/:id", deleteJobById);

export default jobRouter;
