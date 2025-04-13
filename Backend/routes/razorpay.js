// Import required modules
const Razorpay = require("razorpay");
const express = require("express");
const router = express.Router();
require("dotenv").config();

// Initialize Razorpay instance with environment variables
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,  // Your Razorpay Key ID
  key_secret: process.env.RAZORPAY_KEY_SECRET,  // Your Razorpay Key Secret
});

// POST route to create Razorpay order
router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;  // Amount in INR (₹100 = 10000 paise)

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount provided" });
    }

    const options = {
      amount: amount * 100,  // Convert to paise (₹1 = 100 paise)
      currency: "INR",  // Currency type
      receipt: `receipt_order_${Math.floor(Math.random() * 10000)}`,  // Unique receipt ID
    };

    // Create the Razorpay order
    const order = await razorpay.orders.create(options);

    // Respond with the order details
    res.status(200).json(order);
  } catch (err) {
    console.error("Error creating Razorpay order:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Export the router to be used in the main app
module.exports = router;
