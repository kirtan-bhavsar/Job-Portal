import User from "../Models/User.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import { hashPassword, isPasswordMatches } from "../Utils/hashPassword.js";
import { UnauthenticatedError } from "../Errors/customErrors.js";
import { createJWT } from "../Utils/generateToken.js";

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

  const token = await createJWT({ id: user._id, role: user.role });

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({ message: "Login Successful" });
};

const logoutUser = async (req, res) => {
  await res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ message: "Logout Successful" });
};

export { registerUser, loginUser, logoutUser };
