import {
  loginUser,
  logoutUser,
  registerUser,
} from "../Controllers/authController.js";
import express from "express";
import {
  loginValidate,
  userValidate,
} from "../Middlewares/validationMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register", userValidate, registerUser);

userRouter.post("/login", loginValidate, loginUser);

userRouter.post("/logout", logoutUser);

export default userRouter;
