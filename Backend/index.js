const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const connectDB = require("./db");
const Product = require("./models/Product");
const authRoutes = require("./routes/auth");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
connectDB();

// 🔥 Serve images from 'uploads' folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 🔥 Authentication Routes
app.use("/api/auth", authRoutes);

// 🔒 Protected Routes (User Must Be Signed In)
app.get("/api/cart", authMiddleware, (req, res) => {
  res.json({ message: "Your cart items are here." });
});

app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({ message: "Your profile details" });
});

app.get("/api/orders", authMiddleware, (req, res) => {
  res.json({ message: "Your orders list" });
});

// 🔥 Fetch All Products (Public)
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
});

// 🔥 Fetch Single Product
app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
