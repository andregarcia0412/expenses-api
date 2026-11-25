import {
  createUserSchema,
  updateUserSchema,
} from "../schemas/user/user.schema.js";
import * as userService from "../services/user.service.js";

export const createUser = async (req, res) => {
  const data = createUserSchema.parse(req.body);
  res.status(201).json(await userService.create(data));
};

export const findUserById = async (req, res) => {
  res.status(200).json(await userService.findById(req.userId));
};

export const updateUserById = async (req, res) => {
  const data = updateUserSchema.parse(req.body);
  res.status(200).json(await userService.updateById(req.userId, data));
};

export const deleteUserById = async (req, res) => {
  await userService.deleteById(req.userId);
  res.status(204).send();
};
