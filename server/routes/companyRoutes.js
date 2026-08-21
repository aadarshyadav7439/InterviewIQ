import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { prepareCompany } from "../controllers/companyController.js";

const router = express.Router();

router.post("/prepare", protect, prepareCompany);

export default router;