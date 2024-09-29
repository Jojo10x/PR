import React from 'react';
import { FiInfo } from 'react-icons/fi';
import { ArrowRight, CheckCircle, Gift } from 'lucide-react';

interface Product {
  _id: string;
  productName: string;
  productDetails: string[];
  modelsSizes: string[];
}

interface ProductComparisonProps {
  selectedProducts: Product[];
  productLinks: { [key: string]: string };
  onClearSelection: () => void;
}

const ProductComparison: React.FC<ProductComparisonProps> = ({ selectedProducts, productLinks, onClearSelection }) => (
  <div className="mt-12 bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl shadow-lg">
    <h3 className="text-2xl font-bold mb-6 text-indigo-800 flex items-center justify-center">
      <Gift className="mr-2" size={28} />
      Product Comparison
    </h3>
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {selectedProducts.map((product) => (
          <div key={product._id} className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold mb-4 text-indigo-700 flex items-center">
              <ArrowRight className="mr-2" size={20} />
              {product.productName}
            </h4>
            <h5 className="font-bold mb-2 text-indigo-600">Product Details:</h5>
            <ul className="list-none mb-4">
              {product.productDetails.map((detail, detailIndex) => (
                <li key={detailIndex} className="text-sm text-gray-600 mb-1 flex items-start">
                  <CheckCircle className="mr-2 text-green-500 flex-shrink-0" size={16} />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
            <h5 className="font-bold mb-2 text-indigo-600">Available Sizes:</h5>
            <ul className="list-none mb-4">
              {product.modelsSizes.map((size, sizeIndex) => (
                <li key={sizeIndex} className="text-sm text-gray-600 mb-1 flex items-center">
                  <CheckCircle className="mr-2 text-green-500" size={16} />
                  {size}
                </li>
              ))}
            </ul>
            <div className="flex justify-start items-center mt-4">
              <a
                href={productLinks[product._id]}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-indigo-600 hover:text-indigo-700 transition duration-300"
              >
                <FiInfo className="mr-1" size={18} /> Learn More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="mt-8 text-center">
      <button
        onClick={onClearSelection}
        className="bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-700 transition duration-300 ease-in-out flex items-center mx-auto"
      >
        <Gift className="mr-2" size={20} />
        Clear Selection
      </button>
    </div>
  </div>
);

export default ProductComparison;