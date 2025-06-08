import User from "../Models/User.js";
import { StatusCodes } from "http-status-codes";

const registerUser = async (req, res) => {
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json(user);
};

export { registerUser };
