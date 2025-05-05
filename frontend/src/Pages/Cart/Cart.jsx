import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useLocation, Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Function to fetch the cart items from localStorage
  const fetchCartItems = () => {
    const storedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedItems);
  };

  useEffect(() => {
    // Fetch cart items when component mounts
    fetchCartItems();

    // Listen for external localStorage changes (or custom dispatched "storage" events)
    window.addEventListener("storage", fetchCartItems);
    return () => {
      window.removeEventListener("storage", fetchCartItems);
    };
  }, []);

  // Update the quantity of an item (identified by both id and size)
  const updateQuantity = (id, size, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedCartItems = cartItems.map((item) => {
      if (item.id === id && item.size === size) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    // Dispatch a custom event so other components (like Navbar) can update.
    window.dispatchEvent(new Event("storage"));
  };

  // Remove an item from the cart
  const removeItem = (id, size) => {
    const updatedCartItems = cartItems.filter(
      (item) => !(item.id === id && item.size === size)
    );
    toast.success("Item removed from cart.");
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    window.dispatchEvent(new Event("storage"));
  };

  // Calculate the total cost
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto p-4 mt-16">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Your Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-center text-lg sm:text-xl md:text-2xl font-medium text-gray-800">
            Your cart is empty.
          </p>
          <p className="mt-4 text-center text-base text-gray-500 max-w-md">
            Looks like you haven't added any items yet. Start exploring and fill
            your cart with some great finds!
          </p>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="flex flex-col space-y-4">
            {cartItems.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="flex flex-col md:flex-row items-center bg-white shadow rounded-lg p-4"
              >
                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-md"
                />

                {/* Details and Controls */}
                <div className="flex flex-col flex-grow md:ml-4 mt-4 md:mt-0">
                  <span className="text-xl font-semibold text-gray-800">
                    {item.name}
                  </span>
                  <p className="text-gray-600">Size: {item.size}</p>
                  <p className="text-gray-600">Price: Rs. {item.price}</p>

                  {/* Quantity Controls */}
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.size, item.quantity - 1)
                      }
                      className="bg-gray-200 px-3 py-1 rounded-l hover:bg-gray-300 transition-colors duration-200 cursor-pointer"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(
                          item.id,
                          item.size,
                          parseInt(e.target.value, 10) || 1
                        )
                      }
                      className="w-16 text-center border-t border-b border-gray-200 focus:outline-none"
                    />
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.size, item.quantity + 1)
                      }
                      className="bg-gray-200 px-3 py-1 rounded-r hover:bg-gray-300 transition-colors duration-200 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Remove Button */}
                <div className="mt-4 md:mt-0 md:ml-4">
                  <button
                    onClick={() => removeItem(item.id, item.size)}
                    className="text-red-500 hover:underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="mt-8 border-t pt-4 flex flex-col md:flex-row justify-between items-center">
            <span className="text-2xl font-bold text-gray-800">
              Total: Rs. {totalPrice.toFixed(2)}
            </span>
            <Link to="/checkout">
              <button className="mt-4 md:mt-0 bg-gray-800 text-white hover:bg-gray-900 px-6 py-2 rounded cursor-pointer">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
