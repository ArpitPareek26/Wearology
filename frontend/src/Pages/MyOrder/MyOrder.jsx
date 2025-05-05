import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const MyOrder = () => {
  const { pathname } = useLocation();

  // Local state to keep order details
  const [order, setOrder] = useState(null);

  // Scroll to top when route updates
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Fetch the order details from local storage
  useEffect(() => {
    const storedOrder = localStorage.getItem("orderDetails");
    if (storedOrder) {
      setOrder(JSON.parse(storedOrder));
    }
  }, []);

  // If no order is found, show a placeholder message
  if (!order) {
    return (
      <div className="container mx-auto p-4 mt-16">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          My Orders
        </h1>
        <p className="mt-4 text-center text-gray-600">
          No orders found. Place an order to see the details here.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 mt-16">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        Order Details
      </h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        {/* Order Info Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600">Order ID:</p>
            <p className="text-lg font-semibold text-gray-800">
              {order.orderId}
            </p>
          </div>
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600">Order Date:</p>
            <p className="text-lg font-semibold text-gray-800">{order.date}</p>
          </div>
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600">Total:</p>
            <p className="text-lg font-semibold text-gray-800">
              Rs. {order.total.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Status:</p>
            <p className="text-lg font-semibold text-gray-800">
              {order.status || "Processing"}
            </p>
          </div>
        </div>

        {/* Order Items */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Items Ordered
          </h2>
          {order.items && order.items.length > 0 ? (
            order.items.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row items-center border-b py-3"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div className="sm:ml-4 flex-grow mt-2 sm:mt-0">
                  <p className="text-lg font-medium text-gray-800">
                    {item.name}
                  </p>
                  <p className="text-gray-600">Size: {item.size}</p>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <div className="text-lg font-semibold text-gray-800">
                  Rs. {(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No items found in this order.</p>
          )}
        </div>

        {/* Shipping Details */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Shipping Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Full Name:</p>
              <p className="text-gray-800 font-medium">
                {order.shipping.fullName}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Address:</p>
              <p className="text-gray-800 font-medium">
                {order.shipping.address}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">City, State, ZIP:</p>
              <p className="text-gray-800 font-medium">
                {order.shipping.city}, {order.shipping.state}{" "}
                {order.shipping.zip}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Country:</p>
              <p className="text-gray-800 font-medium">
                {order.shipping.country}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
