import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { validateProfile } from "../middlewares/validate.js";
import {getProfile, updateProfile} from "../controllers/userController.js";

const router = express.Router();

router.get("/profile", protect, getProfile);
router.put("/profile", protect, validateProfile, updateProfile);

export default router;