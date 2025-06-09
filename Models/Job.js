import mongoose from "mongoose";
import { JOB_STATUS, JOB_TYPE } from "../Utils/constants.js";

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      default: "My City",
    },
    jobType: {
      type: String,
      enum: Object.values(JOB_TYPE),
      default: JOB_STATUS.FULL_TIME,
    },
    jobStatus: {
      type: String,
      enum: Object.values(JOB_STATUS),
      default: JOB_STATUS.PENDING,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("job", jobSchema);

export default Job;
