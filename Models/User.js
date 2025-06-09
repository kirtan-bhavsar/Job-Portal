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
});

const User = mongoose.model("user", userSchema);

export default User;
