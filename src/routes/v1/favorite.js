import express from "express";
import { favoriteController } from "../../controllers/favorite.controller.js";
const router = express.Router();
import { UserVerifyToken } from "../../middlewares/verifyToken.js";
router
  .route("/favorite")
  .post(favoriteController.createFavoriteProduct)
router.route("/favorite/current_favorite").post(UserVerifyToken.verifyToken,favoriteController.getFavoriteProduct);
router.route("/favorite/:id").delete(favoriteController.deleteFavoriteProduct)
export const favoriteProductRoute = router;
