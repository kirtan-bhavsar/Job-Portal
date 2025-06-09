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

const authRouter = express.Router();

authRouter.post("/register", userValidate, registerUser);

authRouter.post("/login", loginValidate, loginUser);

authRouter.post("/logout", logoutUser);

export default authRouter;
