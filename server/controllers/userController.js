import User from "../models/User.js";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to get profile",
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const {
      name,
      avatar,
      college,
      degree,
      branch,
      graduationYear,
      skills,
      targetCompany,
      targetRole,
    } = req.body;

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (name !== undefined) user.name = name;
    if (avatar !== undefined) user.avatar = avatar;
    if (college !== undefined) user.college = college;
    if (degree !== undefined) user.degree = degree;
    if (branch !== undefined) user.branch = branch;
    if (graduationYear !== undefined)
      user.graduationYear = graduationYear;
    if (skills !== undefined) user.skills = skills;
    if (targetCompany !== undefined)
      user.targetCompany = targetCompany;
    if (targetRole !== undefined)
      user.targetRole = targetRole;

    await user.save();

    const updatedUser = await User.findById(req.userId).select("-password");

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update profile",
    });
  }
};