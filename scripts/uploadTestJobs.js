import dotenv from "dotenv/config";
import User from "../Models/User.js";
import Job from "../Models/Job.js";
import connectDb from "../db.js";

const uploadTestJob = async () => {
  await connectDb();

  const user = await User.findOne({ email: "cedric.diggory@gmail.com" });

  console.log(user);
};

uploadTestJob();
