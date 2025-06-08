import { registerUser } from "../Controllers/authController.js";
import express from "express";

const userRouter = express.Router();

userRouter.post("/", registerUser);

export default userRouter;
