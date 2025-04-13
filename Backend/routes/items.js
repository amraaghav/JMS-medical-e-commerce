const express = require("express");
const router = express.Router();
const path = require("path");
const Product = require("../models/Product");

// 👉 Update Product
router.put("/:id", async (req, res) => {
  try {
    const { name, price, branch, category, description, stock, image } = req.body;
    const updatedData = { name, price, branch, category, description, stock, image };
    const product = await Product.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
});

// 👉 Delete Product
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
