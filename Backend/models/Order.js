import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    customerName: { type: String, required: true },
    address: { type: String, required: true },
    items: { type: Number, required: true },
    paymentMethod: { type: String, enum: ["COD", "Online"], required: true },
    paymentStatus: { type: String, enum: ["Pending", "Paid"], default: "Pending" },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
