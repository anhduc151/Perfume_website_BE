import jwt from 'jsonwebtoken'
import { env } from '../utilities/environment.js'
const verifyToken = (req, res, next) => {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    try {
      const {userId} = jwt.verify(token, env.APP_SECRET);
      req.user = userId;
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
    return next();
};

export const UserVerifyToken =  {verifyToken}