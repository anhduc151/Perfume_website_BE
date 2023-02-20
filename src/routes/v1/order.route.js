import express from "express";
import { orderController } from "../../controllers/order.controller.js";
const router = express.Router();
router.route("/order").post(orderController.getOrder);
export const orderRoute = router;
