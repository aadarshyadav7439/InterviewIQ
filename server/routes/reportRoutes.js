import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { getReports } from "../controllers/reportController.js";

const router = express.Router();

router.get("/", protect, getReports);

export default router;