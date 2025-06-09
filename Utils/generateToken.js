import jwt from "jsonwebtoken";
import dotenv from "dotenv/config";

export const createJWT = async (payload) => {
  return await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
