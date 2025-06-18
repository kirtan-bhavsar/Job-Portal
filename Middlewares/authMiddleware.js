import cookieParser from "cookie-parser";
import {
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
} from "../Errors/customErrors.js";
import { verifyJWT } from "../Utils/generateToken.js";

export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    throw new UnauthenticatedError("Invalid authentication");
  }

  try {
    const { id, role } = await verifyJWT(token);
    const isTestUser = id === "68522ea775dcc332e5f0164d";
    req.user = { id, role, isTestUser };
    next();
  } catch (error) {
    console.log("error from the middleware");
    throw new UnauthenticatedError("Invalid authentication");
  }
};

export const authorizePermissions = (...roles) => {
  return async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("User not authorized to access this route");
    }
    next();
  };
};

export const restrictTestUserAccess = (req, res, next) => {
  if (req.user.isTestUser) throw new BadRequestError("Test User. Read Only !!");
  next();
};
