const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./db");
const Product = require("./models/Product");
const authRoutes = require("./routes/auth");
const authMiddleware = require("./middleware/authMiddleware");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/items");
const addProductRoute = require("./routes/addProduct");
const jwt = require('jsonwebtoken');
const contactRoute = require("./routes/contactRoute");
const adminOrderRoutes = require("./routes/adminOrderRoutes"); // admin side


const app = express();
app.use(cors());
app.use(express.json());
connectDB();

// Serve image statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/add-product", addProductRoute);
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.get("/api/cart", authMiddleware, (req, res) => res.json({ message: "Your cart items are here." }));
app.get("/api/profile", authMiddleware, (req, res) => res.json({ message: "Your profile details" }));

// Public product routes
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
});

//rozor

const razorpayRoute = require("./routes/razorpay");
app.use("/api/payment", razorpayRoute);





// Import and use the order route
const orderRoutes = require("./routes/orderRoute");
app.use("/api/orders", orderRoutes);



app.use("/api/admin/orders", require("./routes/orderRoute"));
app.use("/api/admin/orders", adminOrderRoutes);

app.use("/api/contact", contactRoute);






const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
