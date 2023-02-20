import { favoriteService } from "../services/favorite.service.js";
import { HttpStatusCode } from "../utilities/constants.js";

const createFavoriteProduct = async (req, res) => {
  try {
    const result = await favoriteService.createFavoriteProduct(req.body);
    res.status(HttpStatusCode.OK).json({
      data: result,
    });
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      data: error,
    });
  }
};

const getFavoriteProduct = async (req, res) => {
  try {
    const userId = req.user;
    const result = await favoriteService.getFavoriteProduct(userId);
    res.status(HttpStatusCode.OK).json({
      data: result,
    });
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      data: error,
    });
  }
};

const deleteFavoriteProduct = async (req, res) => {
  try {
    const result = await favoriteService.deleteFavoriteProduct(req.params.id);
    res.status(HttpStatusCode.OK).json({
      data: result,
    });
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      data: error,
    });
  }
};
export const favoriteController = {
  createFavoriteProduct,
  getFavoriteProduct,
  deleteFavoriteProduct,
};
