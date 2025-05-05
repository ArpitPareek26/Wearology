import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";

const Contact = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.success("Message sent successfully!");
    e.target.reset();
  };
  return (
    <div>
      <div className="bg-gray-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800">Contact Us</h1>
            <p className="mt-4 text-lg text-gray-600">
              Have questions? We're here to help! Reach out to us for any
              queries or assistance.
            </p>
          </div>

          {/* Contact Form Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Get In Touch
            </h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows="5"
                  className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gray-800 text-white hover:bg-gray-900 rounded-lg cursor-pointer"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Customer Support Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Customer Support
              </h3>
              <p className="text-gray-700 mb-4">Email: support@wearology.com</p>
              <p className="text-gray-700 mb-4">Phone: +1 (123) 456-7890</p>
              <p className="text-gray-700">
                Hours: Monday - Friday, 9 AM - 6 PM
              </p>
            </div>

            {/* Location Map Section */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Our Location
              </h3>
              <p className="text-gray-700 mb-4">
                123 Fashion Avenue, Bhilwara, 311001, Rajasthan, India
              </p>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d57694.230254289345!2d74.59053623392799!3d25.341492393750734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1744339037270!5m2!1sen!2sin"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Our Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
