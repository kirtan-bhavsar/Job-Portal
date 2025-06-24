import "express-async-errors";
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv/config";
import jobRouter from "./Routes/jobRoutes.js";
import authRouter from "./Routes/authRoutes.js";
import userRouter from "./Routes/userRoutes.js";
import mongoose from "mongoose";
import connectDb from "./db.js";
import errorHandlerMiddlware from "./Middlewares/errorHandlerMiddleware.js";
import { validateTest } from "./Middlewares/validationMiddleware.js";
import cookieParser from "cookie-parser";
import { authenticateUser } from "./Middlewares/authMiddleware.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import upload from "./Middlewares/multerMiddleware.js";
import cloudinary from "cloudinary";

// import errorHandlerMiddleware from "./Middlewares/errorHandlerMiddleware.js";

// Express-async-errors will catch the runtime errors in async block and will send to error middleware,
//  without using trycatch block

const app = express();
const port = process.env.PORT || 5100;

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cookieParser());
app.use(express.json());

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_secret: process.env.CLOUD_API_SECRET,
  api_key: process.env.CLOUD_API_KEY,
});

connectDb();

const __dirname = dirname(fileURLToPath(import.meta.url));
// app.use(express.static(path.resolve(__dirname, "./public")));
app.use(express.static(path.resolve(__dirname, "./client/dist")));
// ---Test Routes---

app.get("/", (req, res) => {
  res.json({ msg: "Hello World !!" });
});

app.get("/api/v1/test", (req, res) => {
  return res.status(200).json({ message: `Test route called successfully` });
});

// ---Test Routes End---

// Mounting the Routers
app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user/", upload.single("avatar"), authenticateUser, userRouter);

app.get("*", (req, res) => {
  // res.sendFile(__dirname, "./public", "index.html");
  res.sendFile(__dirname, "./client/dist", "index.html");
});

// Not found route
app.use("*", (req, res) => {
  res.status(400).json({ message: "Not found" });
});

// Error Middleware
app.use(errorHandlerMiddlware);
// Not found route will handle the requests that are not available in the routes, whereas the error middleware
// will handle the errors that are triggered from any existing route, due to some issue in the code.

app.listen(port, () => {
  console.log(`Server successfully running on port : ${port}`);
});
