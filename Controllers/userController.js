import { StatusCodes } from "http-status-codes";
import User from "../Models/User.js";
import Job from "../Models/Job.js";
import cloudinary from "cloudinary";
import { promises as fs } from "fs";
import { formatFile } from "../Middlewares/multerMiddleware.js";

const updateUser = async (req, res) => {
  // console.log(req.file);
  const newUser = { ...req.body };
  delete newUser.password;
  // we need to delete if, at all password is also sent by the user in the request

  if (req.file) {
    const file = formatFile(req.file);
    // return;
    const response = await cloudinary.v2.uploader.upload(file);
    // this will upload the image on cloudinary
    // await fs.unlink(req.file.path);
    // this will remove the image from temp storage
    newUser.avatar = response.secure_url;
    // this will store the cloudinary url
    newUser.avatarPublicId = response.public_id;
    // this will store the cloudinary public_id
  }

  const updatedUser = await User.findByIdAndUpdate(req.user.id, newUser);

  if (req.file && updatedUser.avatarPublicId) {
    // here in the updatedUser, as we haven't used the new:true, so the the updatedUser would just be the old user
    // with the id, but the mongodb will definitely update the user, irrespective of new:true or not
    // the new:true is just for the response to contian the updated values or the old values
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
  }

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
