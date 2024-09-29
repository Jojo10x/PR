import React from 'react';
import { motion } from 'framer-motion';
import { Package, ArrowRight } from 'lucide-react';

interface Product {
  _id: string;
  productName: string;
  productImage: string;
  productDetails: string[];
  modelsSizes: string[];
}

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  imageBaseUrl: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect, imageBaseUrl }) => (
  <motion.div
    key={product._id}
    className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 ease-in-out hover:shadow-xl border border-indigo-100"
    whileHover={{ scale: 1.03 }}
    onClick={() => onSelect(product)}
  >
    <div className="relative">
      <img
        src={`${imageBaseUrl}${product.productImage}`}
        alt={product.productName}
        className=" w-full h-48 object-contain "
      />
      <div className="absolute top-2 left-2 bg-indigo-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
        {product.modelsSizes.length} sizes
      </div>
    </div>
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-2 text-indigo-700 flex items-center">
        <Package className="mr-2" size={20} />
        {product.productName}
      </h3>
      <p className="text-sm text-gray-600 mb-4">{product.productDetails[0]}</p>
      <div className="flex justify-end items-center">
        <motion.button 
          className="bg-indigo-500 text-white px-4 py-2 rounded-full text-sm hover:bg-indigo-600 transition duration-300 flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Compare
          <ArrowRight className="ml-1" size={16} />
        </motion.button>
      </div>
    </div>
  </motion.div>
);

export default ProductCard;