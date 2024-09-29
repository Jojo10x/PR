import React from "react";
import { Product } from "../types/types";

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onEdit, onDelete }) => {
  return (
    <ul className="space-y-2">
      {products.map((p) => (
        <li key={p._id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
          <span>{p.productName}</span>
          <div>
            <button
              onClick={() => onEdit(p)}
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(p._id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
