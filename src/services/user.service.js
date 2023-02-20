import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js";
import { env } from "../utilities/environment.js";
const createNew = async (data) => {
  try {
    const result = await UserModel.createNew(data);
    const token = jwt.sign({ userId: result._id }, env.APP_SECRET);
    return { ...result, token };
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (data) => {
  try {
    const result = await UserModel.loginUser(data);
    const token = jwt.sign({ userId: result._id }, env.APP_SECRET);
    return { ...result, token };
  } catch (error) {
    throw new Error(error);
  }
};
const getCurrentUser = async (data) => {
  const result = await UserModel.getCurrentUser(data);
  return result;
};
const changePassWord = async (password) => {
  const result = await UserModel.changePassWord(password);
  return result;
};
const getAllUser = async () => {
  const result = await UserModel.getAllUser();
  return result;
};
const updateUser = async (data) => {
  const result = await UserModel.updateUser(data);
  return result;
};
const deleteUser = async (data) => {
  const result = await UserModel.deleteUser(data);
  return result;
};
export const userService = {
  createNew,
  loginUser,
  getCurrentUser,
  changePassWord,
  getAllUser,
  updateUser,
  deleteUser,
};
