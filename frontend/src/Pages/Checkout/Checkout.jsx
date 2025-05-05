import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useLocation, Link, useNavigate } from "react-router-dom";

const Checkout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // State for cart items retrieved from local storage
  const [cartItems, setCartItems] = useState([]);

  // State for Shipping Details
  const [shipping, setShipping] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  // State for Payment Information
  const [payment, setPayment] = useState({
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  // Scroll to top on route change.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Function to get cart items from localStorage
  const fetchCartItems = () => {
    const storedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedItems);
  };

  // Fetch cart items on mount and listen for changes
  useEffect(() => {
    fetchCartItems();
    window.addEventListener("storage", fetchCartItems);
    return () => {
      window.removeEventListener("storage", fetchCartItems);
    };
  }, []);

  // Handle change for Shipping Details
  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShipping((prev) => ({ ...prev, [name]: value }));
  };

  // Handle change for Payment Information
  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPayment((prev) => ({ ...prev, [name]: value }));
  };

  // Calculate total price from cart items
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Handle Order Placement
  const handlePlaceOrder = (e) => {
    e.preventDefault();

    // Basic validation for shipping fields
    if (
      !shipping.fullName ||
      !shipping.address ||
      !shipping.city ||
      !shipping.state ||
      !shipping.zip ||
      !shipping.country
    ) {
      toast.error("Please fill in all shipping details.");
      return;
    }

    // Basic validation for payment fields
    if (
      !payment.cardholderName ||
      !payment.cardNumber ||
      !payment.expiryDate ||
      !payment.cvv
    ) {
      toast.error("Please fill in all payment details.");
      return;
    }

    const orderDetails = {
      orderId: "O1R2D3E4R5", // Ideally, generate a unique order ID
      date: new Date().toLocaleString(),
      items: cartItems, // The array of cart items
      shipping: shipping, // The shipping details collected from the form
      total: totalPrice, // The calculated total price
      status: "Processing",
    };

    // Save the order details to local storage
    localStorage.setItem("orderDetails", JSON.stringify(orderDetails));
    toast.success("Order placed successfully!");

    // Clear the cart after order placement
    localStorage.removeItem("cartItems");
    setCartItems([]);

    // Navigate to the MyOrder page
    navigate("/myorder");
  };

  return (
    <div className="container mx-auto p-4 mt-16">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        Checkout
      </h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Side: Order Summary */}
        <div className="md:w-1/2 bg-white p-6 shadow rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Order Summary
          </h2>
          {cartItems.length === 0 ? (
            <p className="text-gray-600">No items in your cart.</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex items-center p-4 border rounded-lg"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="ml-4 flex-grow">
                    <h3 className="text-lg font-medium text-gray-800">
                      {item.name}
                    </h3>
                    <p className="text-gray-600">Size: {item.size}</p>
                    <p className="text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-lg font-semibold text-gray-800">
                    Rs. {(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="mt-6 border-t pt-4">
            <span className="text-xl font-bold text-gray-800">
              Total: Rs. {totalPrice.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Right Side: Shipping & Payment Details */}
        <div className="md:w-1/2 bg-white p-6 shadow rounded-lg">
          <form onSubmit={handlePlaceOrder}>
            {/* Shipping Details */}
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Shipping Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  value={shipping.fullName}
                  onChange={handleShippingChange}
                  placeholder="John Doe"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={shipping.address}
                  onChange={handleShippingChange}
                  placeholder="123 Street Name"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={shipping.city}
                  onChange={handleShippingChange}
                  placeholder="City"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-700"
                >
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  id="state"
                  value={shipping.state}
                  onChange={handleShippingChange}
                  placeholder="State"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="zip"
                  className="block text-sm font-medium text-gray-700"
                >
                  ZIP Code
                </label>
                <input
                  type="text"
                  name="zip"
                  id="zip"
                  value={shipping.zip}
                  onChange={handleShippingChange}
                  placeholder="ZIP Code"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700"
                >
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  id="country"
                  value={shipping.country}
                  onChange={handleShippingChange}
                  placeholder="Country"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Payment Information */}
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">
              Payment Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label
                  htmlFor="cardholderName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Cardholder Name
                </label>
                <input
                  type="text"
                  name="cardholderName"
                  id="cardholderName"
                  value={payment.cardholderName}
                  onChange={handlePaymentChange}
                  placeholder="John Doe"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="cardNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Card Number
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  id="cardNumber"
                  value={payment.cardNumber}
                  onChange={handlePaymentChange}
                  placeholder="1234 5678 9012 3456"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="expiryDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Expiry Date
                </label>
                <input
                  type="text"
                  name="expiryDate"
                  id="expiryDate"
                  value={payment.expiryDate}
                  onChange={handlePaymentChange}
                  placeholder="MM/YY"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="cvv"
                  className="block text-sm font-medium text-gray-700"
                >
                  CVV
                </label>
                <input
                  type="password"
                  name="cvv"
                  id="cvv"
                  value={payment.cvv}
                  onChange={handlePaymentChange}
                  placeholder="123"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-gray-800 text-white hover:bg-gray-900 py-3 rounded-md cursor-pointer"
              >
                Place Order Securely
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
