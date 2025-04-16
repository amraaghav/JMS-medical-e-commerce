const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const rawHeader = req.headers['authorization']; // safer way
  console.log("Authorization header:", rawHeader); // ✅ should show Bearer ...

  const token = rawHeader?.replace("Bearer ", "");
  console.log("Token received in backend:", token); // ✅ should show only token part

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    console.log("Decoded user from token:", req.user);
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = verifyToken;
