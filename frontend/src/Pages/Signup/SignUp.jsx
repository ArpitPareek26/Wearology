// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-hot-toast";

// const SignUp = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         "http://localhost:4000/api/users/register",
//         formData
//       );
//       toast.success("Sign-up successful! Please login to continue.", {
//         duration: 5000,
//       });
//       navigate("/login");
//     } catch (error) {
//       if (error.response) {
//         // The request was made and the server responded with a status code
//         // Differentiate between error codes here
//         if (error.response.status === 409) {
//           // Conflict: User already exists
//           toast.error("User already exists!");
//         } else if (error.response.status === 500) {
//           // Internal Server Error
//           toast.error("Internal server error. Please try again later.");
//         } else {
//           // Other known status codes
//           toast.error(
//             error.response.data.message ||
//               "An error occurred. Please try again."
//           );
//         }
//       } else if (error.request) {
//         // The request was made but no response was received
//         toast.error("No response from server. Please check your connection.");
//       } else {
//         // Something happened in setting up the request that triggered an Error
//         toast.error("Error: " + error.message);
//       }
//     }
//   };
//   const { pathname } = useLocation();
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);
//   return (
//     <div>
//       <div className="min-h-screen bg-gray-100 flex items-center justify-center mt-16">
//         <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
//           {/* Logo Section */}
//           <div className="text-center mb-6">
//             <h1 className="text-3xl font-bold text-gray-800">Wearology</h1>
//             <p className="text-gray-600 mt-2">
//               Join us to experience style and comfort like never before.
//             </p>
//           </div>

//           {/* Sign-Up Form */}
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label
//                 htmlFor="name"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//                 placeholder="Enter your full name"
//                 required
//                 onChange={handleChange}
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//                 placeholder="Enter your email"
//                 required
//                 onChange={handleChange}
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 name="password"
//                 className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//                 placeholder="Create a password"
//                 required
//                 onChange={handleChange}
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full py-3 bg-gray-800 text-white rounded hover:bg-gray-900 cursor-pointer"
//             >
//               Sign Up
//             </button>
//           </form>

//           {/* Divider */}
//           <div className="my-6 text-center">
//             <p className="text-gray-600">or</p>
//           </div>

//           {/* Login Link */}
//           <div className="text-center mt-6">
//             <p className="text-gray-600">
//               Already have an account?{" "}
//               <Link to="/login" className="text-indigo-600 hover:underline">
//                 Login here
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;

import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // loading state

  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Begin loading state
    try {
      const response = await axios.post(
        "http://localhost:4000/api/users/register",
        formData
      );
      toast.success("Sign-up successful! Please login to continue.", {
        duration: 5000,
      });
      navigate("/login");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          toast.error("User already exists!");
        } else if (error.response.status === 500) {
          toast.error("Internal server error. Please try again later.");
        } else {
          toast.error(
            error.response.data.message ||
              "An error occurred. Please try again."
          );
        }
      } else if (error.request) {
        toast.error("No response from server. Please check your connection.");
      } else {
        toast.error("Error: " + error.message);
      }
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center mt-16">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          {/* Logo Section */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Wearology</h1>
            <p className="text-gray-600 mt-2">
              Join us to experience style and comfort like never before.
            </p>
          </div>

          {/* Sign-Up Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your full name"
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your email"
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Create a password"
                required
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded text-white ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-gray-800 hover:bg-gray-900 cursor-pointer"
              }`}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 text-center">
            <p className="text-gray-600">or</p>
          </div>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-600 hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
