import cookieParser from "cookie-parser";
import { UnauthenticatedError } from "../Errors/customErrors.js";
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
