import React from "react";

interface ProductDetailsFormProps {
  productDetails: string[];
  modelsSizes: string[];
  handleDetailChange: (index: number, value: string) => void;
  handleSizeChange: (index: number, value: string) => void;
  addDetail: () => void;
  addSize: () => void;
  deleteDetail: (index: number) => void;
  deleteSize: (index: number) => void;
}

const ProductDetailsForm: React.FC<ProductDetailsFormProps> = ({
  productDetails,
  modelsSizes,
  handleDetailChange,
  handleSizeChange,
  addDetail,
  addSize,
  deleteDetail,
  deleteSize,
}) => {
  return (
    <>
      {productDetails.map((detail, index) => (
        <div key={index} className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Product Detail {index + 1}:
          </label>
          <input
            type="text"
            value={detail}
            onChange={(e) => handleDetailChange(index, e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            type="button"
            onClick={() => deleteDetail(index)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
          >
            Delete
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addDetail}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add More Details
      </button>

      {modelsSizes.map((size, index) => (
        <div key={index} className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Model/Size {index + 1}:
          </label>
          <input
            type="text"
            value={size}
            onChange={(e) => handleSizeChange(index, e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            type="button"
            onClick={() => deleteSize(index)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
          >
            Delete
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addSize}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Add More Models/Sizes
      </button>
    </>
  );
};

export default ProductDetailsForm;

