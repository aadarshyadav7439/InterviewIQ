import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {getInterviews, createInterview } from "../controllers/interviewController.js";
const router = express.Router();

router.get("/", protect, getInterviews);
router.post("/", protect, createInterview);

export default router;