import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  getPosts,
  createPost,
  toggleLike,
  addComment,
} from "../controllers/communityController.js";

const router = express.Router();

router.get("/", protect, getPosts);
router.post("/", protect, createPost);
router.post("/:id/like", protect, toggleLike);
router.post("/:id/comments", protect, addComment);

export default router;
