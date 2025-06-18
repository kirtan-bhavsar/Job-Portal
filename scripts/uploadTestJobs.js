import dotenv from "dotenv/config";
import User from "../Models/User.js";
import Job from "../Models/Job.js";
import connectDb from "../db.js";
import { readFile } from "fs/promises";

const uploadTestJob = async () => {
  try {
    await connectDb();

    const user = await User.findOne({ email: "cedric.diggory@gmail.com" });

    console.log(user.id);

    const fetchedJobs = JSON.parse(
      await readFile(new URL("../Utils/mockData.json", import.meta.url))
    );

    const jobs = fetchedJobs.map((job) => {
      return { ...job, user: user.id };
    });

    await Job.deleteMany({ user: user.id });

    await Job.create(jobs);

    process.exit(0);

    // console.log(jobs);
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
};

uploadTestJob();
