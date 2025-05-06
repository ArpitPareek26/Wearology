import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="flex flex-col bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-60 object-cover"
          loading="lazy"
        />
        {/* Optional badge if product is new */}
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
            NEW
          </span>
        )}
      </div>
      <div className="flex flex-col p-4 flex-grow">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {product.name}
        </h3>
        <p className="text-gray-600 mb-3 text-lg font-medium">
          Rs. {product.price}
        </p>
        <div className="mt-auto">
          <p className="text-sm text-gray-500 uppercase tracking-wide">
            {product.category}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
