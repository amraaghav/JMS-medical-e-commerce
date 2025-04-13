const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  items: [
    {
      name: String,
      image: String,
      price: Number,
      quantity: Number,
    },
  ],
  total: Number,
  status: {
    type: String,
    default: "Processing",
  },
  user: {
    name: String,
    address: String,
    phone: String,
    paymentMethod: String,
  },
});

module.exports = mongoose.model("Order", orderSchema);
