import express from "express";
import {
  createTask,
  getAllTask,
  deleteSingleTask,
  updateSingleTask,
} from "../controllers/TaskController.js";
import extractToken from "../services/security.service.js";
import { taskValidation } from "../validation/TaskValidation.js";
const router = express.Router();
router.post("/create",extractToken, createTask);
router.delete("/delete/:id", extractToken, deleteSingleTask);
router.put("/update/:id",extractToken, updateSingleTask);
router.get("/",extractToken, getAllTask);

export default router;
