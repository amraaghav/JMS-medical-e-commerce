const jwt = require("jsonwebtoken");
const User = require("../models/User"); // adjust path as per your structure

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch user from DB to attach isAdmin
      const user = await User.findById(decoded.id).select("email isAdmin");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Attach full user info including isAdmin to req.user
      req.user = {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
      };

      next();
    } catch (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = verifyToken;
