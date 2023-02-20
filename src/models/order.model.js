import { getDB } from "../config/mongodb.js";
const ProductCollectionName = "order";
const getOrder = async (data) => {
  try {
    const result = await getDB()
      .collection(ProductCollectionName)
      .insertOne(data);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
export const orderModel = { getOrder };
