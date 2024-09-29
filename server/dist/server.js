"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const product_1 = require("./models/product");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
}));
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
    console.error("MONGODB_URI is not defined in the environment variables");
    process.exit(1);
}
mongoose_1.default
    .connect(mongoUri)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Could not connect to MongoDB:", err));
const uploadsDir = "uploads";
if (!fs_1.default.existsSync(uploadsDir)) {
    fs_1.default.mkdirSync(uploadsDir, { recursive: true });
    console.log(`Created directory: ${uploadsDir}`);
}
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
// POST /products to add a new product
app.post("/products", upload.single("productImage"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    console.log(req.file);
    try {
        const { productName, productDetails, modelsSizes } = req.body;
        const newProduct = new product_1.Product({
            productImage: req.file ? `/uploads/${req.file.filename}` : "",
            productName,
            productDetails: JSON.parse(productDetails),
            modelsSizes: JSON.parse(modelsSizes),
        });
        yield newProduct.save();
        res.status(201).json({ message: "Product added successfully" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to add product" });
    }
}));
// GET /products to fetch all products
app.get("/api/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_1.Product.find();
        res.json(products);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch products" });
    }
}));
// Delete a product by ID
app.delete("/api/products/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield product_1.Product.findByIdAndDelete(id);
        res.json({ message: "Product deleted successfully" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete product" });
    }
}));
// Edit a product by ID
app.put("/api/products/:id", upload.single("productImage"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const { productName, productDetails, modelsSizes } = req.body;
        const updatedProductData = {
            productName,
            productDetails: JSON.parse(productDetails),
            modelsSizes: JSON.parse(modelsSizes),
        };
        if (req.file) {
            updatedProductData.productImage = `/uploads/${req.file.filename}`;
        }
        yield product_1.Product.findByIdAndUpdate(id, updatedProductData);
        res.status(200).json({ message: "Product updated successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update product" });
    }
}));
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "uploads")));
const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
