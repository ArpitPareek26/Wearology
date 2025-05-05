import React, { useEffect } from "react";
import header from "../../assets/header.jpg";
import { Link, useLocation } from "react-router-dom";
import { products } from "../../../product";
import ProductCard from "../../Components/ProductCard/ProductCard";

function Home() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <>
      <div className="bg-gray-100 mt-16">
        <img src={header} alt="Example" className="max-w-full h-auto" />
        {/* Categories Section */}
        <section className="py-12 cursor-pointer">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
              Shop by Category
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Link to="/category/men">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">Men</h3>
                  <p className="text-gray-600">
                    Explore our collection for men.
                  </p>
                </div>
              </Link>
              <Link to="/category/women">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">
                    Women
                  </h3>
                  <p className="text-gray-600">
                    Discover the latest trends for women.
                  </p>
                </div>
              </Link>
              <Link to="/category/kids">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">Kids</h3>
                  <p className="text-gray-600">
                    Find cute and comfy outfits for kids.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-12 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
              Featured Clothing
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products
                .filter((product) => product.id >= 1 && product.id <= 8)
                .map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
