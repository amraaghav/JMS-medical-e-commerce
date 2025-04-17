const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const authMiddleware = require("../middleware/authMiddleware");

// GET all orders for admin
router.get("/", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
});

module.exports = router;
