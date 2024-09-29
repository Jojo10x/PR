import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import Modal from "./Modal";
import ProductList from "./ProductList";
import ProductDetailsForm from "./ProductDetailsForm";
import { useNavigate } from "react-router-dom";

interface Product {
  _id: string;
  productImage: File | null;
  productName: string;
  productDetails: string[];
  modelsSizes: string[];
}

const AddProduct: React.FC = () => {
  const [product, setProduct] = useState<Omit<Product, "_id">>({
    productImage: null,
    productName: "",
    productDetails: [""],
    modelsSizes: [""],
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  console.log("Updated Products:", products);

  useEffect(() => {
    fetchProducts();
  }, []);

  const apiUrl = "https://prserver.onrender.com";

  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product[]>(`${apiUrl}/api/products`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProduct({ ...product, productImage: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productName", product.productName);
    formData.append("productDetails", JSON.stringify(product.productDetails));
    formData.append("modelsSizes", JSON.stringify(product.modelsSizes));

    if (product.productImage) {
      formData.append("productImage", product.productImage as Blob);
    }

    try {
      if (editingProductId) {
        await axios.put(
          `${apiUrl}/api/products/${editingProductId}`,
          formData
        );
        setModalMessage("Product edited successfully!");
      } else {
        await axios.post(`${apiUrl}/products`, formData);
        setModalMessage("Product added successfully!");
      }

      fetchProducts();
      setModalVisible(true);
      setProduct({
        productImage: null,
        productName: "",
        productDetails: [""],
        modelsSizes: [""],
      });
      setEditingProductId(null);
    } catch (error) {
      setModalMessage("Error adding/editing product.");
      setModalVisible(true);
      console.error("Error submitting product:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${apiUrl}/api/products/${id}`);
      setModalMessage("Product deleted successfully!");
      setModalVisible(true);
      fetchProducts(); 
    } catch (error) {
      setModalMessage("Error deleting product.");
      setModalVisible(true);
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = (productToEdit: Product) => {
    setEditingProductId(productToEdit._id);
    setProduct({
      productImage: productToEdit.productImage || null,
      productName: productToEdit.productName,
      productDetails: [...productToEdit.productDetails],
      modelsSizes: [...productToEdit.modelsSizes],
    });
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalMessage(null);
    setEditingProductId(null);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <Modal
        message={modalMessage}
        isVisible={isModalVisible}
        onClose={closeModal}
      />

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="productImage"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Product Image:
          </label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>

        <div className="mb-4">
          <label
            htmlFor="productName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Product Name:
          </label>
          <input
            type="text"
            name="productName"
            value={product.productName}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <ProductDetailsForm
          productDetails={product.productDetails}
          modelsSizes={product.modelsSizes}
          handleDetailChange={(index, value) => {
            const newDetails = [...product.productDetails];
            newDetails[index] = value;
            setProduct({ ...product, productDetails: newDetails });
          }}
          handleSizeChange={(index, value) => {
            const newSizes = [...product.modelsSizes];
            newSizes[index] = value;
            setProduct({ ...product, modelsSizes: newSizes });
          }}
          addDetail={() =>
            setProduct({
              ...product,
              productDetails: [...product.productDetails, ""],
            })
          }
          addSize={() =>
            setProduct({
              ...product,
              modelsSizes: [...product.modelsSizes, ""],
            })
          }
          deleteDetail={(index) => {
            const newDetails = product.productDetails.filter(
              (_, i) => i !== index
            );
            setProduct({ ...product, productDetails: newDetails });
          }}
          deleteSize={(index) => {
            const newSizes = product.modelsSizes.filter((_, i) => i !== index);
            setProduct({ ...product, modelsSizes: newSizes });
          }}
        />

        <div className="mt-4">
          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {editingProductId ? "Edit Product" : "Add Product"}
          </button>
        </div>
      </form>

      <div>
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Product List</h2>
          <button
            onClick={handleClick}
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Go Back to Home Page
          </button>
        </div>

        <ProductList
          products={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default AddProduct;
