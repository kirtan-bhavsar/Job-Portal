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
import rateLimiter from "express-rate-limit";

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: { message: "IP rate limit reached... Please try in 15 minutes" },
});

const authRouter = express.Router();

authRouter.post("/register", apiLimiter, userValidate, registerUser);

authRouter.post("/login", apiLimiter, loginValidate, loginUser);

authRouter.post("/logout", logoutUser);

export default authRouter;
