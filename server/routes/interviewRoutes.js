import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  getInterviews,
  getInterview,
  createInterview,
  updateInterview,
  completeInterview,
  generateQuestions,
  evaluateAnswer,
} from "../controllers/interviewController.js";
const router = express.Router();

router.get("/", protect, getInterviews);
router.get("/:id", protect, getInterview);
router.post("/", protect, createInterview);
router.post("/:id/generate-questions", protect, generateQuestions);
router.post("/:id/evaluate-answer", protect, evaluateAnswer);
router.put("/:id", protect, updateInterview);
router.put("/:id/complete", protect, completeInterview);

export default router;
