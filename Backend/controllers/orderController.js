import Order from "../models/Order.js";

// ✅ Place Order
export const placeOrder = async (req, res) => {
  try {
    const { product, customerName, address, items, paymentMethod, price } = req.body;
    const order = new Order({ product, customerName, address, items, paymentMethod, price });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: "Error placing order" });
  }
};

// ✅ Get All Orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("product");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Error fetching orders" });
  }
};

// ✅ Update Payment Status
export const updatePaymentStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    order.paymentStatus = req.body.status;
    await order.save();
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: "Error updating payment status" });
  }
};
