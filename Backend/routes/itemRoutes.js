import express from "express";
import asyncHandler from "express-async-handler";
import Item from "../models/ItemModel.js";

const router = express.Router();

// ✅ All Items API
router.get("/", asyncHandler(async (req, res) => {
  const items = await Item.find({});
  res.json(items);
}));

// ✅ Single Item API
router.get("/:id", asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: "Product Not Found" });
  }
}));

export default router;
