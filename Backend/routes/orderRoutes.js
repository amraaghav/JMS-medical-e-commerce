import express from "express";
import { placeOrder, getOrders, updatePaymentStatus } from "../controllers/orderController.js";

const router = express.Router();

router.post("/place", placeOrder); // ✅ Place Order
router.get("/list", getOrders); // ✅ Get All Orders
router.put("/update/:id", updatePaymentStatus); // ✅ Update Payment Status

export default router;
