import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { products } from "../../../product";
import { toast } from "react-hot-toast";

const Product = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const reviews = [
    { id: 1, name: "John Doe", rating: 4, comment: "Great quality and fit!" },
    { id: 2, name: "Jane Smith", rating: 5, comment: "Loved the material!" },
  ];

  const [selectedSize, setSelectedSize] = useState(null);
  const sizes = ["S", "M", "L", "XL"];

  const handleAddToCart = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please log in to add to cart.");
      navigate("/login"); // Redirect user to login page
      return;
    }

    // Ensure a size is selected before adding to cart
    if (!selectedSize) {
      toast.error("Please select a size.");
      return;
    }

    // Create a product item with additional properties
    const productToAdd = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      quantity: 1,
    };

    // Retrieve current cart items from local storage (or initialize an empty array)
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Check if the product with the same id and size already exists in the cart
    const existingIndex = cartItems.findIndex(
      (item) => item.id === productToAdd.id && item.size === productToAdd.size
    );

    if (existingIndex !== -1) {
      // Increase the quantity if it already exists
      cartItems[existingIndex].quantity += 1;
    } else {
      // Otherwise, add the new product to the cart
      cartItems.push(productToAdd);
    }

    // Save the updated cart back to local storage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Dispatch a custom event so components (like Navbar) listening for changes can update
    window.dispatchEvent(new Event("storage"));

    toast.success("Product added to cart!");
  };
  return (
    <div>
      <div className="bg-gray-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image Section */}
            <div>
              <img
                src={product.image}
                alt="Product"
                className="rounded-lg shadow-lg"
              />
            </div>

            {/* Product Details Section */}
            <div>
              <h1 className="text-3xl font-bold mb-4 text-gray-800">
                {product.name}
              </h1>
              <p className="text-lg text-gray-700 mb-6">
                A trendy and comfortable {product.name} for comfort and style.
                Perfect for any occasion.
              </p>
              <p className="mt-4 text-lg ">Price: Rs. {product.price}</p>
              <p className="mt-2 mb-2 text-gray-600">
                Category: {product.category}
              </p>
              {/* Size Options */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Available Sizes:</h3>
                <div className="flex space-x-4">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 px-4 rounded hover:bg-gray-300 transition-colors duration-200 cursor-pointer ${
                        selectedSize === size
                          ? "bg-gray-800 text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              {/* Add to Cart Button */}{" "}
              <div className="mb-6">
                {" "}
                <button
                  onClick={handleAddToCart}
                  className="w-full py-3 bg-gray-800 text-white rounded hover:bg-gray-900 cursor-pointer"
                >
                  {" "}
                  Add to Cart{" "}
                </button>{" "}
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Customer Reviews
            </h2>
            <div className="space-y-6">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white rounded-lg p-6 shadow-lg"
                >
                  <h3 className="text-lg font-semibold text-gray-800">
                    {review.name}
                  </h3>
                  <p className="text-yellow-500 mb-2">
                    Rating: {review.rating} ★
                  </p>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
