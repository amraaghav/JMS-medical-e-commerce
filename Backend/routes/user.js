const express = require("express");
const router = express.Router();
const User = require("../models/User");
const verifyToken = require("../middleware/authMiddleware");

// @desc    Get user's profile info
// @route   GET /api/user/details
// @access  Private
router.get("/details", verifyToken, async (req, res) => {
  try {
    console.log("Authenticated user ID:", req.user.id); // 👈 Add this
    const user = await User.findById(req.user.id).select("name email phone profileImage");

    res.status(200).json({
      name: user.name,
      email: user.email,
      phone: user.phone || "",
      profileImage: user.profileImage || "",
    });
  } catch (error) {
    console.error("Error fetching user details:", error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

module.exports = router;
