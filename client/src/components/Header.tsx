import React from "react";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleIconClick = () => {
    navigate("/addproducts");
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            Pamasola Resources
          </h1>
          <p className="text-xl text-gray-600 mt-2">
            Solar & Power Storage Consultants
          </p>
        </div>
        <User
          className="cursor-pointer text-gray-600 hover:text-gray-800 transition"
          onClick={handleIconClick}
        />
      </div>
    </header>
  );
};

export default Header;
