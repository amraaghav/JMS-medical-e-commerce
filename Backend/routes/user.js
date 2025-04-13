const express = require("express");
const router = express.Router();
const User = require("../models/User");
const verifyToken = require("../middleware/authMiddleware");

// @desc    Get user profile
// @route   GET /api/user/profile
// @access  Private
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Update user profile
// @route   PUT /api/user/profile
// @access  Private
router.put("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    const updatedUser = await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      username: updatedUser.username,
      email: updatedUser.email,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Failed to update profile" });
  }
});

module.exports = router;
