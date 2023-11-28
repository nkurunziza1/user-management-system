import User from "../models/UserModel.js";
import { checkToken, verifyToken } from "./generateToken.service.js";

const extractToken = async (req, res, next) => {
  try {
    if (!req.header("Authorization")) {
      return res.status(401).json({ status: 401, message: "Anauthorized🔥" });
    }
    const token = req.header("Authorization").split(" ")[1];
   console.log("token", token);
    const details = verifyToken(token);
    console.log("details", details);
    const userExists = await User.findOne({ email: details.email });
    if (!userExists) {
      return res.status(401).json({ status: 401, message: "User not found!" });
    }
    req.user = userExists;
    next();
  } catch (error) {
    console.log("error", error);
    return res
      .status(401)
      .json({ status: 401, message: "No valid credentials" });
  }
};
export default extractToken;