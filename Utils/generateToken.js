import jwt from "jsonwebtoken";
import dotenv from "dotenv/config";

export const createJWT = async (payload) => {
  return await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const verifyJWT = async (token) => {
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  // console.log(decoded);
  return decoded;
};
