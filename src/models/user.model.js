import Joi from "joi";
import { ObjectId } from "mongodb";
import { getDB } from "../config/mongodb.js";

const UserCollectionName = "users";
const UserCollectionSchema = Joi.object({
  name: Joi.string().required().min(6),
  email: Joi.string().required(),
  password: Joi.string(),
  createAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
});

export const validateSchema = async (data) => {
  return await UserCollectionSchema.validateAsync(data, { abortEarly: false });
};

const createNew = async (data) => {
  try {
    const value = await validateSchema(data);
    const insertUser = await getDB()
      .collection(UserCollectionName)
      .insertOne(value);
    const result = await getDB()
      .collection(UserCollectionName)
      .findOne(insertUser.insertedId);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const loginUser = async (data) => {
  try {
    const result = await getDB()
      .collection(UserCollectionName)
      .findOne({ email: data.email });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getCurrentUser = async (userId) => {
  try {
    const uid = new ObjectId(userId);
    const result = await getDB()
      .collection(UserCollectionName)
      .findOne({ _id: uid });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
const changePassWord = async (data) => {
  try {
    const result = await getDB()
      .collection(UserCollectionName)
      .updateOne(
        { email: data.email }, // Filter
        { $set: { password: data.password } } // Update
      );
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
const getAllUser = async () => {
  try {
    const result = await getDB()
      .collection(UserCollectionName)
      .find({})
      .toArray();
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
const updateUser = async (data) => {
  try {
    const { _id, ...rest } = data;
    const result = await getDB()
      .collection(UserCollectionName)
      .updateOne(
        { _id: ObjectId(_id) }, // Filter
        { $set: rest } // Update
      );
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
const deleteUser = async (data) => {
  try {
    const uid = ObjectId(data);
    const result = await getDB()
      .collection(UserCollectionName)
      .deleteOne({ _id: uid });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
export const UserModel = {
  createNew,
  loginUser,
  getCurrentUser,
  changePassWord,
  getAllUser,
  updateUser,
  deleteUser,
};
