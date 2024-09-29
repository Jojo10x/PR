import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import ProductComparison from "../components/ProductComparison";
import ProductComparisonSection from "../components/ProductComparisonSection";

interface Product {
  _id: string;
  productName: string;
  productImage: string;
  productDetails: string[];
  modelsSizes: string[];
}

const productLinks: { [key: string]: string } = {
  "66f81783269750e4ae18fefe":
    "https://pamasola-resources.company.site/products/BR-Deep-Cycle-Gel-Battery-p641032638",
  "66f818f6269750e4ae18ff04":
    "https://pamasola-resources.company.site/products/BR-Lithium-Battery-LiFePO4-48V-p641043071",
  "66f819fe269750e4ae18ff0e":
    "https://pamasola-resources.company.site/products/Ingotta-Hybrid-Inverter-p640863530",
  "66f81ace269750e4ae18ff14":
    "https://pamasola-resources.company.site/products/BR-Half-Cell-PERC-MONO-Solar-Panel-p639958008",
  "66f81b49269750e4ae18ff18":
    "https://pamasola-resources.company.site/products/BR-Solar-Off-Grid-Inverters-p638547720",
};

const Compare: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Product[]>(`${apiUrl}/api/products`);
        console.log(response.data);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again later.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const apiUrl = "https://prserver.onrender.com";

  const handleSelect = (product: Product) => {
    setSelectedProducts((prev) => {
      if (prev.length === 2) return prev;
      if (prev.some((p) => p._id === product._id)) return prev;
      return [...prev, product];
    });
  };
  const handleClearSelection = () => {
    setSelectedProducts([]);
  };
  const imageBaseUrl = apiUrl + "/";
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <ProductComparisonSection/>

      <main className="container mx-auto px-4 py-8" id="items">
        <h2 className="text-3xl font-bold mb-8 text-center">Compare Products</h2>

        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onSelect={handleSelect}
                  imageBaseUrl={imageBaseUrl}
                />
              ))}
            </div>

            {selectedProducts.length > 0 && (
              <ProductComparison
                selectedProducts={selectedProducts}
                productLinks={productLinks}
                onClearSelection={handleClearSelection}
              />
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Compare;