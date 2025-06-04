import express from "express";
import morgan from "morgan";
import dotenv from "dotenv/config";
import jobRouter from "./Routes/jobRoutes.js";

const app = express();
const port = process.env.PORT || 5100;

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

app.use("/api/v1/jobs", jobRouter);

// Not found route
app.use("*", (req, res) => {
  res.status(400).json({ message: "Not found" });
});

// Error Middleware
app.use((err, req, res, next) => {
  console.log(err);
  // res.status(500).json({ message: err.message });
  res.status(500).json({ message: "Internal Server Error" });
});

// Not found route will handle the requests that are not available in the routes, whereas the error middleware
// will handle the errors that are triggered from any existing route, due to some issue in the code.

app.listen(port, () => {
  console.log(`Server running successfully on PORT ${port}...`);
});
