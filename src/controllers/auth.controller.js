import * as authService from "../services/auth.service.js";
import { loginSchema } from "../schemas/auth/auth.schema.js";

export const login = async (req, res) => {
  const data = loginSchema.parse(req.body);
  res.status(200).json(await authService.login(data));
};
