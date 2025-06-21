import { nanoid } from "nanoid";
import Job from "../Models/Job.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../Errors/customErrors.js";
import mongoose from "mongoose";
import day from "dayjs";
// import Stats from "./../client/src/pages/Stats";

const getAllJobs = async (req, res) => {
  const { search, jobStatus, jobType, sort, count, page } = req.query;

  const queryObject = {
    user: req.user.id,
  };

  if (search) {
    queryObject.$or = [
      { position: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
    ];
  }

  if (jobStatus && jobStatus !== "all") {
    queryObject.jobStatus = jobStatus;
  }

  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }

  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "company",
    "z-a": "-company",
  };

  const pageNumber = page || 1;
  const entriesPerPage = count || 10;
  const skip = entriesPerPage * (pageNumber - 1) || 0;

  const sortKey = sortOptions[sort] || sortOptions.newest;
  const jobs = await Job.find(queryObject)
    .sort(sortKey)
    .limit(entriesPerPage)
    .skip(skip);

  const totalJobs = await Job.countDocuments(queryObject);
  const numberOfPages = Math.ceil(totalJobs / entriesPerPage);

  res
    .status(StatusCodes.OK)
    .json({ totalJobs, numberOfPages, currentPage: pageNumber, jobs });
};

const createJob = async (req, res) => {
  req.body.user = req.user.id;
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

const getJobStats = async (req, res) => {
  let statsFromAggregation = await Job.aggregate([
    { $match: { user: new mongoose.Types.ObjectId(req.user.id) } },
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
  ]);

  console.log(statsFromAggregation);

  statsFromAggregation = statsFromAggregation.reduce((acc, curr) => {
    console.log(curr);
    const { _id: title, count } = curr;

    acc[title] = count;

    return acc;
  }, {});

  console.log(statsFromAggregation);

  const jobStats = {
    interview: statsFromAggregation.interview || 0,
    pending: statsFromAggregation.pending || 0,
    declined: statsFromAggregation.declined || 0,
  };

  let monthlyJobStats = await Job.aggregate([
    { $match: { user: new mongoose.Types.ObjectId(req.user.id) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);

  monthlyJobStats = monthlyJobStats
    .map((monthlyJobStat) => {
      const {
        _id: { year, month },
        count,
      } = monthlyJobStat;

      const date = day()
        .month(month - 1)
        .year(year)
        .format("MMM YY");

      return { date, count };
    })
    .reverse();

  // const monthlyJobStats = [
  //   {
  //     date: "April 25",
  //     count: 8,
  //   },
  //   {
  //     date: "May 25",
  //     count: 12,
  //   },
  //   {
  //     date: "June 25",
  //     count: 28,
  //   },
  // ];

  res.status(StatusCodes.OK).json({ jobStats, monthlyJobStats });
};

export {
  getAllJobs,
  getJobById,
  editJobById,
  deleteJobById,
  createJob,
  getJobStats,
};
