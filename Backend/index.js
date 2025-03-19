const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const connectDB = require("./db");
const Product = require("./models/Product");

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
connectDB();

// 🔥 Serve images from 'uploads' folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Fetch All Products (with Image URLs)
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
