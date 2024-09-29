const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productImage: String,
  productName: String,
  productDetails: [String],
  modelsSizes: [String]
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
