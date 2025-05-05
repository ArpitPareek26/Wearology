import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import Login from "./Pages/Login/Login";
import Footer from "./Components/Footer/Footer";
import SignUp from "./Pages/Signup/SignUp";
import Product from "./Pages/Product/Product";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import Men from "./Pages/Category/Men";
import Women from "./Pages/Category/Women";
import Kids from "./Pages/Category/Kids";
import Cart from "./Pages/Cart/Cart";
import Checkout from "./Pages/Checkout/Checkout";
import MyOrder from "./Pages/MyOrder/MyOrder";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/category/men" element={<Men />} />
          <Route path="/category/women" element={<Women />} />
          <Route path="/category/kids" element={<Kids />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/myorder" element={<MyOrder />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default App;
