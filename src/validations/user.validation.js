import Joi from "joi";
import bcrypt from "bcryptjs";
import { HttpStatusCode } from "../utilities/constants.js";
import { getDB } from "../config/mongodb.js";

const createNewUser = async (req, res, next) => {
  const conditon = Joi.object({
    name: Joi.string().required().min(6),
    email: Joi.string().required(),
    password: Joi.string(),
    createAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false),
  });
  try {
    await conditon.validateAsync(req.body, { abortEarly: false });
    const username = await getDB()
      .collection("users")
      .findOne({ name: req.body.name });
    const email = await getDB()
      .collection("users")
      .findOne({ email: req.body.email });

    if (username) {
      if (email) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
          status: "error",
          message: [
            { message: "Username has already existed" },
            { message: "Email already exists" },
          ],
        });
      } else {
        res.status(HttpStatusCode.BAD_REQUEST).json({
          status: "error",
          message: [{ message: "Username has already existed" }],
        });
      }
    } else if (email) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        status: "error",
        message: [{ message: "Email already exists" }],
      });
    } else {
      bcrypt.hash(req.body.password, 10, function (error, hash) {
        if (error) {
          return next(error);
        } else {
          req.body.password = hash;
          next();
        }
      });
    }
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      status: "error",
      message: error.details,
    });
  }
};

export const UserValidation = { createNewUser };
