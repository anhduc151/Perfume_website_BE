import { userService } from "../services/user.service.js";
import bcrypt from "bcryptjs";
import { HttpStatusCode } from "../utilities/constants.js";
const createNewUser = async (req, res) => {
  try {
    const result = await userService.createNew(req.body);
    res.status(HttpStatusCode.OK).json({
      status: "success",
      data: {
        token: {
          token: result.token,
        },
        message: "Đăng ký thành công",
        result,
      },
    });
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      status: "error",
      data: { errors: error, message: "Đăng ký thất bại" },
    });
  }
};

// login
const login = async (req, res) => {
  try {
    const result = await userService.loginUser(req.body);
    if (!result) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        status: "error",
        data: { message: "Email đã không đúng" },
      });
    } else {
      if (bcrypt.compareSync(req.body.password, result.password)) {
        res.status(HttpStatusCode.OK).json({
          status: "success",
          data: {
            token: {
              token: result.token,
            },
            message: "Đăng Nhập Thành Công",
            result,
          },
        });
      } else {
        res.status(HttpStatusCode.BAD_REQUEST).json({
          status: "error",
          data: { message: "Mật khẩu không đúng" },
        });
      }
    }
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      status: "error",
      data: { message: "Email không tồn tại" },
    });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user;
    const result = await userService.getCurrentUser(userId);

    res.status(HttpStatusCode.OK).json({
      status: "success",
      data: {
        result,
      },
    });
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      status: "error",
      data: error,
    });
  }
};

const changePassWord = async (req, res) => {
  try {
    const result = await userService.changePassWord(req.body);
    res.status(HttpStatusCode.OK).json({
      status: "success",
      data: {
        result,
      },
    });
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      status: "error",
      data: error,
    });
  }
};
const getAllUser = async (req, res) => {
  try {
    const result = await userService.getAllUser();
    res.status(HttpStatusCode.OK).json({
      status: "success",
      data: {
        result,
      },
    });
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      status: "error",
      data: error,
    });
  }
};
const updateUser = async (req, res) => {
  try {
    const result = await userService.updateUser(req.body);
    res.status(HttpStatusCode.OK).json({
      status: "success",
      data: {
        result,
      },
    });
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      status: "error",
      data: error,
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    const result = await userService.deleteUser(req.params.id);
    res.status(HttpStatusCode.OK).json({
      status: "success",
      data: {
        result,
      },
    });
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      status: "error",
      data: error,
    });
  }
};
export const UserController = {
  createNewUser,
  login,
  getCurrentUser,
  changePassWord,
  getAllUser,
  updateUser,
  deleteUser
};
