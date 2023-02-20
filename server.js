//dotenv
import express from "express";
import cors from "cors";
import { connectDB } from "./src/config/mongodb.js";
import { UserRoutes } from "./src/routes/v1/user.route.js";
import { env } from "./src/utilities/environment.js";
import { ProductRoute } from "./src/routes/v1/product.route.js";
import { checkoutRoute } from "./src/routes/v1/checkout.route.js";
import { favoriteProductRoute } from "./src/routes/v1/favorite.js";
connectDB()
  .then(() => console.log("Connected Sucessfully to database"))
  .then(() => bootServer())
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

const bootServer = () => {
  const app = express();
  app.use(cors());
  //Body Parser : Cho phép chuyển đổi thông số người dùng từ server
  app.use(express.json());
  app.use("/api/v1/auth", UserRoutes); // user route
  app.use("/api/v1", ProductRoute); // product route
  app.use("/api/v1", checkoutRoute);
  app.use("/api/v1", favoriteProductRoute);
  // app.use("/api/v1", orderRoute);
  app.listen(env.APP_PORT, env.APP_LOCALHOST, () => {
    console.log(
      `Hello haodev, I'm running at ${env.APP_LOCALHOST} : ${env.APP_PORT}/`
    );
  });
};
