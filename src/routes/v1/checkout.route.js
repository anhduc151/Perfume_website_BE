import express from "express";
import { checkoutController } from "../../controllers/checkout.controller.js";
const router = express.Router();
import { UserVerifyToken } from "../../middlewares/verifyToken.js";
router
  .route("/checkout")
  .post(checkoutController.checkout)
  .get(checkoutController.getCheckout) // get all checkout
  .put(checkoutController.updateCheckout)
router
  .route("/checkout/current_checkout")
  .post(UserVerifyToken.verifyToken, checkoutController.getCheckoutUser); // get checkout for user
router
  .route("/checkout/:id")
  .get(checkoutController.getCheckoutbyId) // get checkout by id
  .delete(checkoutController.deleteCheckout);

export const checkoutRoute = router;
