const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const verifyToken = require("../middleware/authMiddleware");

// ✅ Create new order (after Razorpay success)
router.post("/", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const newOrder = new Order({
      items: req.body.items,
      total: req.body.total,
      status: "Paid",
      user: userId,
      name: req.body.user.name,
      address: req.body.user.address,
      phone: req.body.user.phone,
      paymentMethod: req.body.user.paymentMethod,
    });

    const saved = await newOrder.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Order saving error:", err);
    res.status(500).json({ message: "Error saving order" });
  }
});

// ✅ Get only current user's orders
router.get("/", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});



router.get("/admin/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Update or cancel an order (user-specific)
router.put("/update/:orderId", verifyToken, async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId);

    if (!order) return res.status(404).json({ message: "Order not found" });

    // Only the user who placed the order can update/cancel it
    if (order.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Allow user to update only certain fields
    const { status, address, phone } = req.body;

    if (status) order.status = status; // "Cancelled", etc.
    if (address) order.address = address;
    if (phone) order.phone = phone;

    await order.save();

    res.json(order);
  } catch (error) {
    console.error("Order update error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/admin/orders", verifyToken, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Access denied" });
    }

    const orders = await Order.find().populate("user", "email");
    res.json(orders);
  } catch (error) {
    console.error("Admin get orders error:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});



router.put("/orders/:id/status", verifyToken, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = req.body.status || order.status;
    await order.save();

    res.json({ message: "Order status updated", order });
  } catch (err) {
    res.status(500).json({ message: "Error updating status" });
  }
});



router.delete("/orders/:id", verifyToken, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    await order.remove();
    res.json({ message: "Order cancelled" });
  } catch (err) {
    res.status(500).json({ message: "Error cancelling order" });
  }
});


module.exports = router;
