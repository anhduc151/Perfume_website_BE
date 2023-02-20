import { orderModel } from "../models/order.model.js";

const getOrder = async (data) => {
  try {
    const result = await orderModel.getOrder(data);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
export const orderService = { getOrder };
