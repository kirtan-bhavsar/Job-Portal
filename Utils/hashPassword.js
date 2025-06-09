import bcrypt, { hash } from "bcrypt";

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const isPasswordMatches = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
