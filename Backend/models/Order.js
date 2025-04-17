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
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: String,
  address: String,
  phone: String,
  paymentMethod: String,
}, {
  timestamps: true,
});

module.exports = mongoose.model("Order", orderSchema);
