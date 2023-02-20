import { checkoutService } from "../services/checkout.service.js";
import { HttpStatusCode } from "../utilities/constants.js";

const checkout = async (req, res) => {
  try {
    const result = await checkoutService.checkout(req.body);
    res.status(HttpStatusCode.OK).json({
      data: result,
    });
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      data: error,
    });
  }
};

const getCheckout = async (req, res) => {
  try {
    const result = await checkoutService.getCheckout();
    res.status(HttpStatusCode.OK).json({
      data: result,
    });
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      data: error,
    });
  }
};
const getCheckoutUser = async (req, res) => {
  try {
    const userId = req.user;
    const result = await checkoutService.getCheckoutUser(userId);
    res.status(HttpStatusCode.OK).json({
      data: result,
    });
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      data: error,
    });
  }
};
const getCheckoutbyId = async (req, res) => {
  try {
    const result = await checkoutService.getCheckoutbyId(req.params.id);
    res.status(HttpStatusCode.OK).json({
      data: result,
    });
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      data: error,
    });
  }
};
const updateCheckout = async (req, res) => {
  try {
    const result = await checkoutService.updateCheckout(req.body);
    res.status(HttpStatusCode.OK).json({
      data: result,
    });
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      data: error,
    });
  }
};
const deleteCheckout = async (req, res) => {
  try {
    const result = await checkoutService.deleteCheckout(req.params.id);
    res.status(HttpStatusCode.OK).json({
      data: result,
    });
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      data: error,
    });
  }
};
export const checkoutController = {
  checkout,
  getCheckout,
  getCheckoutUser,
  updateCheckout,
  getCheckoutbyId,
  deleteCheckout,
};
