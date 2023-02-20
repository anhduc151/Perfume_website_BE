import { getDB } from "../config/mongodb.js";
import { ObjectId } from "mongodb";
import Joi from "joi";
const ProductCollectionName = "favorite";
const favoriteProductSchema = Joi.object({
  UserId: Joi.string(),
  productId: Joi.string(),
  productName: Joi.string(),
  productImg: Joi.string(),
  productPrice: Joi.string(),
  createAt: Joi.date().timestamp().default(Date.now()),
});
export const validateSchema = async (data) => {
  return await favoriteProductSchema.validateAsync(data, {
    abortEarly: false,
  });
};

const createFavoriteProduct = async (product) => {
  try {
    const value = await validateSchema(product);
    const result = await getDB()
      .collection(ProductCollectionName)
      .insertOne(value);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getFavoriteProduct = async (userId) => {
  try {
    const result = await getDB()
      .collection(ProductCollectionName)
      .find({ UserId: userId })
      .toArray();
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
const deleteFavoriteProduct = async (id) => {
  try {
    const pid = ObjectId(id);
    const result = await getDB()
      .collection(ProductCollectionName)
      .deleteOne({ _id: pid });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
export const favoriteModel = {
  createFavoriteProduct,
  getFavoriteProduct,
  deleteFavoriteProduct,
};
