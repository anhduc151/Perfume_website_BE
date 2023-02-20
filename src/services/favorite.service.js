import { favoriteModel } from "../models/favorite.model.js";

const createFavoriteProduct = async (data) => {
  try {
    const result = await favoriteModel.createFavoriteProduct(data);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
const getFavoriteProduct = async (userId) => {
  try {
    const result = await favoriteModel.getFavoriteProduct(userId);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
const deleteFavoriteProduct = async (id) => {
  try {
    const result = await favoriteModel.deleteFavoriteProduct(id);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
export const favoriteService = {
  createFavoriteProduct,
  getFavoriteProduct,
  deleteFavoriteProduct,
};
