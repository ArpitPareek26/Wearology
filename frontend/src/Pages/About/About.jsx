import React, { useEffect } from "react";
import about from "../../assets/about.jpg";
import { useLocation } from "react-router-dom";

const About = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div>
      <div className="bg-gray-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800">
              About Wearology
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Wearology - Where Style Meets Comfort. Crafted with precision,
              designed to inspire.
            </p>
          </div>

          {/* Brand Story */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Image */}
            <div>
              <img
                src={about}
                alt="Our Story"
                className="rounded-lg shadow-lg"
              />
            </div>
            {/* Story Text */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Our Story
              </h2>
              <p className="text-lg text-gray-700">
                Wearology began with a simple vision: to redefine fashion by
                blending style and comfort seamlessly. Our journey has been
                fueled by passion, creativity, and an unwavering commitment to
                quality. From handpicking fabrics to designing pieces that
                resonate with individuality, Wearology is dedicated to making
                every customer feel unique and empowered.
              </p>
            </div>
          </div>

          {/* Mission and Values */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              Our Mission and Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  Quality Craftsmanship
                </h3>
                <p className="text-gray-700 mt-2">
                  We ensure that every product is created with the utmost care,
                  using top-tier materials for lasting elegance.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  Sustainable Practices
                </h3>
                <p className="text-gray-700 mt-2">
                  Wearology is committed to eco-friendly processes that
                  prioritize the planet and future generations.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  Exceptional Service
                </h3>
                <p className="text-gray-700 mt-2">
                  We believe in forging lasting relationships by ensuring
                  customer satisfaction at every step.
                </p>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              Why Choose Wearology
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  Stylish and Versatile
                </h3>
                <p className="text-gray-700 mt-2">
                  Our designs cater to diverse tastes and occasions, offering
                  something for everyone.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  Affordable Luxury
                </h3>
                <p className="text-gray-700 mt-2">
                  Premium fashion at prices that won't break the bank. We make
                  luxury accessible to all.
                </p>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-700">
              Our team of passionate designers, craftsmen, and innovators work
              tirelessly to bring you the best in fashion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
