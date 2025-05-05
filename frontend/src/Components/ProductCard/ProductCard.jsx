import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div
      className="bg-white rounded-lg shadow p-4 cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <img
        src={product.image}
        alt={product.name}
        className="h-48 w-full object-cover rounded"
        loading="lazy"
      />
      <h3 className="mt-4 text-lg font-bold text-gray-800">{product.name}</h3>
      <p className="text-gray-500">Rs.{product.price}</p>
      <p className="text-gray-800 underline">{product.category}</p>
    </div>
  );
};

export default ProductCard;
