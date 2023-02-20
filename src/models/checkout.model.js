import { getDB } from "../config/mongodb.js";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import Joi from "joi";

const ProductCollectionName = "checkout";
const CheckoutCollectionSchema = Joi.object({
  fName: Joi.string(),
  lName: Joi.string(),
  country: Joi.string(),
  email: Joi.string(),
  orders: Joi.array(),
  state: Joi.string(),
  phone: Joi.string(),
  street: Joi.string(),
  status: Joi.boolean().default(false),
  userId: Joi.string(),
  createAt: Joi.date().timestamp().default(Date.now()),
});
export const validateSchema = async (data) => {
  return await CheckoutCollectionSchema.validateAsync(data, {
    abortEarly: false,
  });
};
const checkout = async (checkout) => {
  try {
    const value = await validateSchema(checkout);
    const result = await getDB()
      .collection(ProductCollectionName)
      .insertOne(value);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
const getCheckout = async () => {
  try {
    const result = await getDB()
      .collection(ProductCollectionName)
      .find({})
      .toArray();
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
const getCheckoutbyId = async (id) => {
  try {
    const idCheckout = ObjectId(id);
    const result = await getDB()
      .collection(ProductCollectionName)
      .findOne({ _id: idCheckout });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
const getCheckoutUser = async (userId) => {
  try {
    const result = await getDB()
      .collection(ProductCollectionName)
      .find({ userId: userId })
      .sort({ createAt: -1 })
      .toArray();
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
const updateCheckout = async (data) => {
  try {
    const { _id, ...rest } = data;
    const result = await getDB()
      .collection(ProductCollectionName)
      .updateOne(
        { _id: ObjectId(_id) }, // Filter
        { $set: rest } // Update
      );
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
const deleteCheckout = async (data) => {
  try {
    const uid = ObjectId(data);
    const result = await getDB()
      .collection(ProductCollectionName)
      .deleteOne({ _id: uid });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
export const checkoutModel = {
  checkout,
  getCheckout,
  updateCheckout,
  getCheckoutUser,
  getCheckoutbyId,
  deleteCheckout,
};
