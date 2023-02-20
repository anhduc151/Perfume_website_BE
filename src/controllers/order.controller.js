import { orderService } from "../services/order.service.js";
import { HttpStatusCode } from "../utilities/constants.js";

const getOrder = async (req, res) => {
  try {
    const result = await orderService.getOrder(req.body);
    res.status(HttpStatusCode.OK).json({
      data: result,
    });
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      data: error,
    });
  }
};
export const orderController = { getOrder };
