import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [isAccordionVisible, setAccordionVisible] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  const handleToggle = () => {
    setAccordionVisible(!isAccordionVisible);
  };

  // Function to update the cart item count from localStorage.
  const updateCartCount = () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    // Summing up the quantities for each item.
    const count = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(count);
  };

  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    // Check right away on mount
    checkAuth();

    window.addEventListener("storage", checkAuth);
    window.addEventListener("storage", updateCartCount);

    // Update the cart count initially and at regular intervals.
    updateCartCount();
    const intervalId = setInterval(updateCartCount, 1000);
    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("storage", updateCartCount);
      clearInterval(intervalId);
    };
  }, [setIsLoggedIn]);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:4000/api/users/logout", {});
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  return (
    <div>
      <nav className="bg-gray-800 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Brand Name */}
            <div className="flex items-center">
              <Link
                to="/"
                className="text-2xl font-bold text-white hover:text-gray-300"
              >
                Wearology
              </Link>
            </div>
            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/"
                className="text-white px-3 py-2 text-sm font-medium hover:bg-gray-700 hover:text-gray-300"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-white px-3 py-2 text-sm font-medium hover:bg-gray-700 hover:text-gray-300"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-white px-3 py-2 text-sm font-medium hover:bg-gray-700 hover:text-gray-300"
              >
                Contact
              </Link>
              {/* Cart Icon: Only visible when the user is logged in */}
              {isLoggedIn && (
                <Link
                  to="/cart"
                  className="relative flex items-center px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 hover:text-gray-300"
                >
                  <i className="bi bi-bag-heart"></i>
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-1 text-xs font-bold">
                      {cartCount}
                    </span>
                  )}
                </Link>
              )}
              {isLoggedIn && (
                <Link
                  to="/myorder"
                  className="text-white px-3 py-2 text-sm font-medium hover:bg-gray-700 hover:text-gray-300"
                >
                  My Order
                </Link>
              )}
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="text-white px-3 py-2 text-sm font-medium hover:bg-gray-700 hover:text-gray-300 cursor-pointer"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="text-white px-3 py-2 text-sm font-medium hover:bg-gray-700 hover:text-gray-300"
                >
                  Login
                </Link>
              )}
            </div>
            {/* Mobile Menu */}
            <div className="flex md:hidden items-center">
              <button
                type="button"
                className="text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
                aria-expanded={isAccordionVisible}
                onClick={handleToggle} // Toggle visibility
              >
                {/* Icon for Mobile */}
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
          {/* Accordion Links */}
          {isAccordionVisible && (
            <div className="mt-4 md:hidden">
              <ul className="space-y-4 bg-gray-700 text-white p-4">
                <li onClick={handleToggle}>
                  <Link
                    to="/"
                    className="block text-sm font-medium hover:bg-gray-600 hover:text-gray-300 px-3 py-2 rounded"
                  >
                    Home
                  </Link>
                </li>
                <li onClick={handleToggle}>
                  <Link
                    to="/about"
                    className="block text-sm font-medium hover:bg-gray-600 hover:text-gray-300 px-3 py-2 rounded"
                  >
                    About
                  </Link>
                </li>
                <li onClick={handleToggle}>
                  <Link
                    to="/contact"
                    className="block text-sm font-medium hover:bg-gray-600 hover:text-gray-300 px-3 py-2 rounded"
                  >
                    Contact
                  </Link>
                </li>
                {isLoggedIn && (
                  <li onClick={handleToggle}>
                    <Link
                      to="/cart"
                      className="block text-sm font-medium hover:bg-gray-600 hover:text-gray-300 px-3 py-2 rounded"
                    >
                      Cart
                      {cartCount > 0 && (
                        <span className="ml-2 bg-red-500 text-white rounded-full px-2 text-xs font-bold">
                          {cartCount}
                        </span>
                      )}
                    </Link>
                  </li>
                )}
                {isLoggedIn && (
                  <li onClick={handleToggle}>
                    <Link
                      to="/myorder"
                      className="block text-sm font-medium hover:bg-gray-600 hover:text-gray-300 px-3 py-2 rounded"
                    >
                      My Order
                    </Link>
                  </li>
                )}
                {isLoggedIn ? (
                  <li onClick={handleToggle}>
                    <button
                      onClick={handleLogout}
                      className="block text-sm font-medium hover:bg-gray-600 hover:text-gray-300 px-3 py-2 rounded w-full text-left"
                    >
                      Logout
                    </button>
                  </li>
                ) : (
                  <li onClick={handleToggle}>
                    <Link
                      to="/login"
                      className="block text-sm font-medium hover:bg-gray-600 hover:text-gray-300 px-3 py-2 rounded"
                    >
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
