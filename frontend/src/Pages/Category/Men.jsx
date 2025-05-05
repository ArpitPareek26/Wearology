import React, { useEffect } from "react";
import { products } from "../../../product";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { useLocation } from "react-router-dom";

const Men = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className="bg-gray-100 mt-16">
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Explore our collection for men.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products
              .filter((product) => product.category === "Men")
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Men;
