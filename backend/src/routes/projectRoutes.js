import express from "express";
import {
  createProject,
  getAllProject,
} from "../controllers/ProjectController.js";
import extractToken from "../services/security.service.js";


const router = express.Router();
router.post("/create", createProject);
router.get("/", extractToken, getAllProject);

export default router;
