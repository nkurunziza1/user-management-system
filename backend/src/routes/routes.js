import express from "express";
import {
  signup,
  login,
  getAllUsers,
  getSingleUser,
  updateUser,
  changePassword,
} from "../controllers/UserController.js";
import {
  loginValidation,
  signupValidation,
  updateValidate,
} from "../validation/Validate.js";
import authenticateToken from "../middleware/authenticateToken.js";
const router = express.Router();

router.post("/auth/signup", signupValidation, signup);
router.post("/auth/login", loginValidation, login);
router.get("/auth/profiles", authenticateToken, getAllUsers);
router.get("/auth/profile/:id", getSingleUser);
router.patch("/auth/update/:id", updateValidate, updateUser);
router.patch("/auth/changePassword/:id", updateValidate, changePassword);

export default router;
