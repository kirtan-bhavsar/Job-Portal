import User from "../Models/User.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import { hashPassword, isPasswordMatches } from "../Utils/hashPassword.js";
import { UnauthenticatedError } from "../Errors/customErrors.js";

const registerUser = async (req, res) => {
  const isFirstUser = (await User.countDocuments()) === 0;
  req.body.role = isFirstUser ? "admin" : "user";

  req.body.password = await hashPassword(req.body.password);

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json(user);
};

const loginUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  const isValidUser =
    user && (await isPasswordMatches(req.body.password, user.password));

  if (!isValidUser) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  res.status(200).json({ message: "Login Successful" });
};

export { registerUser, loginUser };
