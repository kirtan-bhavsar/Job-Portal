import { StatusCodes } from "http-status-codes";
import User from "../Models/User.js";
import Job from "../Models/Job.js";

const updateUser = async (req, res) => {
  const obj = { ...req.body };
  delete obj.password;
  // we need to delete if, at all password is also sent by the user in the request
  const updatedUser = await User.findByIdAndUpdate(req.user.id, obj);
  res.status(200).json({ message: "User updated successfully" });
};

const getCurrentUser = async (req, res) => {
  const user = await User.findById({ _id: req.user.id });
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json(userWithoutPassword);
};

const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();
  res.status(200).json({ users, jobs });
};

export { updateUser, getApplicationStats, getCurrentUser };
