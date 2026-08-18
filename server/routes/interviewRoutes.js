import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {getInterviews,getInterview, createInterview, updateInterview, completeInterview } from "../controllers/interviewController.js";
const router = express.Router();

router.get("/", protect, getInterviews);
router.get("/:id", protect, getInterview);
router.post("/", protect, createInterview);
router.put("/:id", protect, updateInterview);
router.put("/:id/complete", protect, completeInterview)

export default router;