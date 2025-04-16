// routes/orders.js
const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const verifyToken = require("../middleware/authMiddleware");

// ➕ Create new order (after Razorpay success)
router.post("/", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const saved = await newOrder.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Error saving order" });
  }
});

// ✅ Get logged-in user's orders
router.get("/", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ "user.id": userId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders" });
  }
});

module.exports = router;
