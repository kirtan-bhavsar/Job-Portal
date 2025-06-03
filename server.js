import express from "express";
import morgan from "morgan";
import dotenv from "dotenv/config";
import { nanoid } from "nanoid";

const app = express();
const port = process.env.PORT || 5100;
let jobs = [
  { id: "abc123", company: "Apple", title: "Front End Developer" },
  { id: nanoid(), company: "Google", title: "Back End Developer" },
  { id: nanoid(), company: "Facebook", title: "Full Stack Developer" },
];

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ msg: "Hello World !!" });
});

app.post("/", (req, res) => {
  res.json({ message: "data received", data: req.body });
});

// Job API Routes

// get all jobs
app.get("/api/v1/jobs", (req, res) => {
  res.status(200).json(jobs);
});

// create job
app.post("/api/v1/jobs/add", (req, res) => {
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
});

// get single job
app.get("/api/v1/jobs/:id", (req, res) => {
  const id = req.params.id;

  // console.log(id);

  if (!id) {
    return res.status(400).json({ message: "Please provide a valid id" });
  }

  const job = jobs.find((job) => job.id === id);

  console.log(job);

  if (!job) {
    return res.status(200).json({ message: "No job found with this id" });
  }

  res.status(200).json(job);
});

// edit job
app.put("/api/v1/jobs/edit/:id", (req, res) => {
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
});

// delete job
app.delete("/api/v1/jobs/delete/:id", (req, res) => {
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
});

app.listen(port, () => {
  console.log(`Server running successfully on PORT ${port}...`);
});
