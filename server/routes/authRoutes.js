import express from "express";
import {signup,login} from "../controllers/authController.js";
import { validateSignUp } from "../middlewares/validate.js";

const router = express.Router();

router.post("/signup", validateSignUp, signup);
router.post("/login",login);

export default router;