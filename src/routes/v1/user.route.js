import express from "express";
import { UserController } from "../../controllers/user.controller.js";
import { UserValidation } from "../../validations/user.validation.js";
import { UserVerifyToken } from "../../middlewares/verifyToken.js";
import bcrypt from "bcryptjs";
const router = express.Router();

router
  .route("/register")
  .post(UserValidation.createNewUser, UserController.createNewUser);

router.route("/login").post(UserController.login);

router
  .route("/current_user")
  .post(UserVerifyToken.verifyToken, UserController.getCurrentUser);
router.route("/users/:id").delete(UserController.deleteUser);
router
  .route("/users")
  .get(UserController.getAllUser)
  .post(UserValidation.createNewUser,UserController.createNewUser);
router.route("/current_user/change_pass").post((req, res, next) => {
  bcrypt.hash(req.body.password, 10, function (error, hash) {
    if (error) {
      return next(error);
    } else {
      req.body.password = hash;
      next();
    }
  });
}, UserController.changePassWord);
export const UserRoutes = router;
