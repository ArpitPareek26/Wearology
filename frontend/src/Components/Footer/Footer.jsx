import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand Section */}
            <div>
              <h2 className="text-2xl font-bold">Wearology</h2>
              <p className="mt-4 text-gray-400">
                Your one-stop shop for stylish and comfortable clothing. Crafted
                with love and precision.
              </p>
            </div>

            {/* Navigation Links */}
            <div>
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link to="/" className="text-gray-400 hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-400 hover:text-white">
                    Shop
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-400 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-400 hover:text-white"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Media Links */}
            <div>
              <h3 className="text-lg font-semibold">Follow Us</h3>
              <div className="mt-4 flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                  aria-label="Facebook"
                >
                  <i className="bi bi-facebook"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                  aria-label="Instagram"
                >
                  <i className="bi bi-instagram"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                  aria-label="Twitter"
                >
                  <i className="bi bi-twitter-x"></i>
                </a>

                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                  aria-label="LinkedIn"
                >
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="mt-12 border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Wearology. All rights reserved by
              Arpit Pareek.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
