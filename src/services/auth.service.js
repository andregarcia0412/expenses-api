import * as bcrypt from "bcrypt";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../errors/unauthorized.error.js";
import * as userService from "../services/user.service.js";

export const register = async (data) => {
  data.password = await bcrypt.hash(data.password, 12);
  return await userService.create(data);
};

export const login = async (data) => {
  const user = await userService.findByEmail(data.email);
  if (!user || !(await bcrypt.compare(data.password, user.password)))
    throw new UnauthorizedError("Incorrect email or password");

  return {
    accessToken: generateAccessToken(user.id, user.name),
  };
};

const generateAccessToken = (id, name) => {
  return jwt.sign({ name }, process.env.JWT_ACCESS_SECRET, {
    subject: id.toString(),
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
  });
};
