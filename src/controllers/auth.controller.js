import { loginSchema } from "../schemas/auth/auth.schema.js";
import { createUserSchema } from "../schemas/user/user.schema.js";
import * as authService from "../services/auth.service.js";

export const register = async (req, res) => {
  const data = createUserSchema.parse(req.body);
  res.status(201).json(await authService.register(data));
};

export const login = async (req, res) => {
  const data = loginSchema.parse(req.body);
  res.status(200).json(await authService.login(data));
};
