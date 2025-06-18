import {
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from "../Controllers/userController.js";
import express from "express";
import {
  authenticateUser,
  authorizePermissions,
  restrictTestUserAccess,
} from "../Middlewares/authMiddleware.js";
import { updateUserValidation } from "../Middlewares/validationMiddleware.js";

const userRouter = express.Router();

userRouter.get(
  "/admin/app-stats",
  authorizePermissions("admin"),
  getApplicationStats
);
userRouter.get("/current-user", getCurrentUser);
userRouter.post(
  "/update",
  restrictTestUserAccess,
  updateUserValidation,
  updateUser
);

export default userRouter;
