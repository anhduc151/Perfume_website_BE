import { ObjectId } from "mongodb";
import { getDB } from "../config/mongodb.js";
import { HttpStatusCode } from "../utilities/constants.js";

const ProductCollectionName = "products";
const getProducts = async () => {
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

const getProductSingle = async (idProduct) => {
  try {
    const pid = new ObjectId(idProduct);
    const result = await getDB()
      .collection(ProductCollectionName)
      .findOne({ _id: pid });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getProdutcsById = async (listId) => {
  try {
    if (listId.length > 0) {
      const listIdProduct = listId.map((product) => {
        return ObjectId(product._id);
      });
      let updateProduct = listId.map((product) => {
        return {
          updateOne: {
            filter: { _id: ObjectId(product._id) },
            update: { $set: { quantity: product.quantity } },
          },
        };
      });
      await getDB().collection(ProductCollectionName).bulkWrite(updateProduct);
      const result = await getDB()
        .collection(ProductCollectionName)
        .find({ _id: { $in: listIdProduct } })
        .toArray();
      return result;
    } else {
      const listIdProduct = listId.map((product) => {
        return ObjectId(product._id);
      });
      const result = await getDB()
        .collection(ProductCollectionName)
        .find({ _id: { $in: listIdProduct } })
        .toArray();
      return result;
    }
  } catch (error) {
    throw new Error(error);
  }
};

const getSearchProduct = async (textSearch) => {
  try {
    await getDB()
      .collection(ProductCollectionName)
      .createIndex({ name: "text", desc: "text" });
    const result = await getDB()
      .collection(ProductCollectionName)
      .find({ $text: { $search: textSearch } });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const createProduct = async (data) => {
  try {
    const result = await getDB()
      .collection(ProductCollectionName)
      .insertOne(data);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
const deleteProduct = async (data) => {
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
export const productModel = {
  getProducts,
  getProductSingle,
  getProdutcsById,
  getSearchProduct,
  createProduct,
  deleteProduct,
};
