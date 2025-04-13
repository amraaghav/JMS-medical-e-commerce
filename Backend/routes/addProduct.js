const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Product = require("../models/Product");

// 🧩 Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}${path.extname(file.originalname)}`),
});
const upload = multer({ storage });

// 🚀 Route: POST /api/add-product
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, price, description, stock, branch, category } = req.body;
    const product = new Product({
      name,
      price,
      description,
      stock,
      branch,
      category,
      imageUrl: req.file ? `/uploads/${req.file.filename}`.replace(/\\/g, "/") : "",
    });
    await product.save();
    res.status(201).json({ message: "✅ Product created successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Product creation failed", error: error.message });
  }
});

module.exports = router;