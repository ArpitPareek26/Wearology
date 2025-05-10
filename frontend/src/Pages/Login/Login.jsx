// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-hot-toast";

// const Login = ({ setIsLoggedIn }) => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const navigate = useNavigate();
//   const { pathname } = useLocation();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);

//   // Update state when any form field changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle the form submit without passing circular objects (like the event) to JSON.stringify
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Construct payload from component state only
//     const payload = { ...formData };

//     try {
//       const response = await axios.post(
//         "http://localhost:4000/api/users/login",
//         payload
//       );

//       if (response.status === 200) {
//         toast.success("Login successful!");
//         console.log("Login successful", response.data);

//         // Save token, update auth state, and navigate home
//         localStorage.setItem("token", response.data.token);
//         setIsLoggedIn(true);
//         navigate("/");
//       } else {
//         toast.error("Login failed!");
//         console.error("Login failed", response.data.message);
//       }
//     } catch (error) {
//       if (error.response) {
//         // Server responded with an error status code
//         const status = error.response.status;
//         if (status === 401) {
//           toast.error(
//             "Invalid credentials! Please check your email and password."
//           );
//         } else if (status === 400) {
//           toast.error("Bad request. Please verify your input.");
//         } else if (status === 409) {
//           toast.error("User already exists!");
//         } else if (status === 500) {
//           toast.error("Internal server error. Please try again later.");
//         } else {
//           toast.error(
//             error.response.data.message ||
//               "An error occurred. Please try again."
//           );
//         }
//         console.error("Server error:", error.response.data);
//       } else if (error.request) {
//         // Request made but no response received
//         toast.error(
//           "No response from server. Please check your network connection."
//         );
//         console.error("No response received:", error.request);
//       } else {
//         // Other errors during the request setup
//         toast.error("Error: " + error.message);
//         console.error("Error message:", error.message);
//       }
//     }
//   };

//   return (
//     <div>
//       <div className="min-h-screen bg-gray-100 flex items-center justify-center mt-16">
//         <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
//           {/* Logo Section */}
//           <div className="text-center mb-6">
//             <h1 className="text-3xl font-bold text-gray-800">Wearology</h1>
//             <p className="text-gray-600 mt-2">
//               Welcome back! Please login to your account.
//             </p>
//           </div>

//           {/* Login Form */}
//           <form className="space-y-6" onSubmit={handleSubmit}>
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
//                 placeholder="Enter your password"
//                 required
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="flex items-center justify-between">
//               <label className="flex items-center">
//                 <input
//                   type="checkbox"
//                   className="text-indigo-600 focus:ring-indigo-500 rounded"
//                 />
//                 <span className="ml-2 text-sm text-gray-600">Remember me</span>
//               </label>
//               <a href="#" className="text-sm text-indigo-600 hover:underline">
//                 Forgot password?
//               </a>
//             </div>
//             <button
//               type="submit"
//               className="w-full py-3 bg-gray-800 text-white rounded hover:bg-gray-900 cursor-pointer"
//             >
//               Login
//             </button>
//           </form>

//           {/* Divider */}
//           <div className="my-6 text-center">
//             <p className="text-gray-600">or</p>
//           </div>

//           {/* Register Link */}
//           <div className="text-center mt-6">
//             <p className="text-gray-600">
//               Don’t have an account?{" "}
//               <Link to="/signup" className="text-indigo-600 hover:underline">
//                 Register here
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const Login = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false); // loading state
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Update state when any form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle the form submit without passing circular objects (like the event) to JSON.stringify
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData };

    setLoading(true); // Begin loading state
    try {
      const response = await axios.post(
        "https://wearology-backend.onrender.com/api/users/login",
        payload
      );

      if (response.status === 200) {
        toast.success("Login successful!");
        console.log("Login successful", response.data);

        // Save token, update auth state, and navigate home
        localStorage.setItem("token", response.data.token);
        setIsLoggedIn(true);
        navigate("/");
      } else {
        toast.error("Login failed!");
        console.error("Login failed", response.data.message);
      }
    } catch (error) {
      if (error.response) {
        // Server responded with an error status code
        const status = error.response.status;
        if (status === 401) {
          toast.error(
            "Invalid credentials! Please check your email and password."
          );
        } else if (status === 400) {
          toast.error("Bad request. Please verify your input.");
        } else if (status === 409) {
          toast.error("User already exists!");
        } else if (status === 500) {
          toast.error("Internal server error. Please try again later.");
        } else {
          toast.error(
            error.response.data.message ||
              "An error occurred. Please try again."
          );
        }
        console.error("Server error:", error.response.data);
      } else if (error.request) {
        toast.error(
          "No response from server. Please check your network connection."
        );
        console.error("No response received:", error.request);
      } else {
        toast.error("Error: " + error.message);
        console.error("Error message:", error.message);
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
              Welcome back! Please login to your account.
            </p>
          </div>

          {/* Login Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
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
                placeholder="Enter your password"
                required
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="text-indigo-600 focus:ring-indigo-500 rounded"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-indigo-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-gray-800 hover:bg-gray-900 cursor-pointer"
              } text-white`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 text-center">
            <p className="text-gray-600">or</p>
          </div>

          {/* Register Link */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-indigo-600 hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
