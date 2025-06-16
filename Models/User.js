import mongoose from "mongoose";
import { ROLE } from "../Utils/constants.js";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  lastName: {
    type: String,
    default: "last name",
  },
  location: {
    type: String,
    default: "Vadodara",
  },
  role: {
    type: String,
    enum: Object.values(ROLE),
    default: ROLE.USER,
  },
  avatar: String,
  avatarPublicId: String,
});

userSchema.methods.toJSON = function () {
  // this is the instance of userSchema created in any of the file, mainly when we call
  // get current user in userRoutes, the password will be deleted, so it doesn't goes as reply
  let obj = this.toObject();
  delete obj.password;
  return obj;
};

const User = mongoose.model("user", userSchema);

export default User;
