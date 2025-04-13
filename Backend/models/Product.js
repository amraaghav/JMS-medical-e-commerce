const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  branch: String,
  category: String,
  description: String,
  stock: Number,
  imageUrl: String, // Store image file path
});

module.exports = mongoose.model("Product", ProductSchema);
