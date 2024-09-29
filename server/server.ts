import express, { Router } from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import multer from "multer";
import dotenv from "dotenv";
import fs from "fs";
import { Product, IProduct } from "./models/product";


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173','https://pr-ryd0.onrender.com'], credentials: true })); 


const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error("MONGODB_URI is not defined in the environment variables");
  process.exit(1);
}

mongoose
  .connect(mongoUri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

const uploadsDir = "uploads";
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log(`Created directory: ${uploadsDir}`);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// POST /products to add a new product
app.post("/products", upload.single("productImage"), async (req, res) => {
  console.log(req.body); 
  console.log(req.file); 
  try {
    const { productName, productDetails, modelsSizes } = req.body;

    const newProduct: IProduct = new Product({
      productImage: req.file ? `/uploads/${req.file.filename}` : "",
      productName,
      productDetails: JSON.parse(productDetails),
      modelsSizes: JSON.parse(modelsSizes),
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add product" });
  }
});

// GET /products to fetch all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});
// Delete a product by ID
app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete product" });
  }
});
// Edit a product by ID
app.put("/api/products/:id", upload.single("productImage"), async (req, res) => {
  const { id } = req.params;
  try {
    const { productName, productDetails, modelsSizes } = req.body;

    const updatedProductData: Partial<IProduct> = {
      productName,
      productDetails: JSON.parse(productDetails),
      modelsSizes: JSON.parse(modelsSizes),
    };

    if (req.file) {
      updatedProductData.productImage = `/uploads/${req.file.filename}`;
    }

    await Product.findByIdAndUpdate(id, updatedProductData);
    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update product" });
  }
});



app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
