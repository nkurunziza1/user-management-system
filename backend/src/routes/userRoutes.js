import express from "express";
import {
  signup,
  login,
  getAllUsers,
  getSingleUser,
  updateUser,
  fillEmail,
  ResetPassword,
  verifyEmail,
} from "../controllers/UserController.js";
import {
  loginValidation,
  signupValidation,
  updateValidate,
} from "../validation/Validate.js";
import authenticateToken from "../middleware/authenticateToken.js";
import extractToken from "../services/security.service.js";
import upload from "../services/claudinary.service.js";

const router = express.Router();

router.post("/auth/signup", signupValidation, signup);
router.post("/auth/login", loginValidation, login);
router.get("/profiles", authenticateToken, getAllUsers);
router.get("/profile/:id", getSingleUser);
router.post("/auth/reset-password", fillEmail);
router.patch("/auth/reset-password/:token", ResetPassword);
router.get("/auth/verify-email/:token", verifyEmail);
router.put(
  "/profile/update/:id",
  extractToken,
  upload.single("profilePic"),
  updateUser
);


export default router;
