import cookieParser from "cookie-parser";
import {
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
    req.user = { id, role };
    next();
  } catch (error) {
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
