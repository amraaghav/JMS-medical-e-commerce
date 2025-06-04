// Example Node.js backend code to create Razorpay order
const razorpay = require("razorpay");

const instance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID, // Make sure to add your Razorpay key ID
    key_secret: process.env.RAZORPAY_KEY_SECRET, // Make sure to add your Razorpay secret key
});

app.post("/api/payment/create-order", async (req, res) => {
  const { amount } = req.body; // Amount in paise (e.g., ₹100 = 10000 paise)

  const options = {
    amount: amount, // Amount in paise
    currency: "INR",
    receipt: "receipt#1",
  };

  try {
    const order = await instance.orders.create(options);
    res.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err) {
    console.error("Error creating Razorpay order:", err);
    res.status(500).send("Payment initiation failed");
  }
});
