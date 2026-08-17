import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";
import { uploadResume, getResume, analyzeUserResume } from "../controllers/resumeController.js";

const router = express.Router();

router.get("/",protect,getResume);
router.post("/", protect, upload.single("resume"), uploadResume);
router.post("/analyze", protect, analyzeUserResume);

export default router;