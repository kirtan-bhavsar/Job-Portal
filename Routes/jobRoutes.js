import express from "express";
import {
  getAllJobs,
  getJobById,
  createJob,
  editJobById,
  deleteJobById,
} from "../Controllers/jobController.js";
import {
  validateJob,
  validateId,
} from "../Middlewares/validationMiddleware.js";

const jobRouter = express.Router();

// get all jobs
jobRouter.get("/", getAllJobs);

// create job
jobRouter.post("/add", validateJob, createJob);

// get single job
jobRouter.get("/:id", validateId, getJobById);

// edit job
jobRouter.put("/edit/:id", validateId, validateJob, editJobById);

// delete job
jobRouter.delete("/delete/:id", validateId, deleteJobById);

export default jobRouter;
