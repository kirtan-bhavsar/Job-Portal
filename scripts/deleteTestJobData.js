import connectDb from "../db.js";
import Job from "../Models/Job.js";
import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv/config";

const deleteTestJobData = async () => {
  connectDb();
  const jobs = await Job.find({ company: "Zomato" });
  jobs.map(async (job) => await Job.findByIdAndDelete(job.id));
  console.log("Test Job Data Deleted successfully");
};

deleteTestJobData();

export default deleteTestJobData;
