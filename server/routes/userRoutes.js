import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    
    if(!user){
      return res.status(404).json({message: "User not found"});
    }

    res.json({
      message: "Profile fetched successfully",
      user: {
        id: user._id,
        name : user.name,
        email: user.email,
        role: user.role,
      }
    });
    
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

export default router;