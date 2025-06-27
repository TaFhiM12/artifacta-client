import React, { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FiLogIn, FiEye, FiEyeOff, FiArrowLeft } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router";
import { use } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import Lottie from "lottie-react";
import groovyWalkAnimation from "../assets/login.json";
import { Helmet } from "react-helmet";

const LoginPage = () => {
  const { signInUser, createUserWithGoogle } = use(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    toast.promise(signInUser(email, password), {
      loading: "Signing in...",
      success: () => {
        navigate(location.state ? location.state : "/");
        return `Welcome back!`;
      },
      error: (error) => {
        if (error.code === "auth/user-not-found") {
          return (
            <div>
              User not found.
              <Link
                to="/register"
                className="text-amber-600 ml-1 hover:underline"
              >
                Register here
              </Link>
            </div>
          );
        } else if (error.code === "auth/wrong-password") {
          return "Incorrect password. Please try again.";
        } else {
          return "Login failed. Please try again.";
        }
      },
    });
  };

  const handleSignInG = () => {
    toast.promise(createUserWithGoogle(), {
      loading: "Signing in with Google...",
      success: (result) => {
        navigate(location.state ? location.state : "/");
        return `Welcome, ${result.user.displayName || "User"}!`;
      },
      error: () => "Google sign-in failed. Please try again.",
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex  items-center justify-around  px-4 mt-64 md:mt-30 md:bg-gradient-to-b md:from-stone-100 md:to-amber-50"
    >
      
      <Helmet>
        <title>Artifacta | Login</title>
      </Helmet>
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg overflow-hidden border border-amber-100">
        <div className="p-8 space-y-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-amber-600 hover:text-amber-800 transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Back
          </button>

          <div className="text-center">
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-amber-700 mt-2">
              Sign in to your Artifacta account
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-amber-800 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-amber-800"
                >
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-amber-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition pr-10"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-amber-500 hover:text-amber-700"
                >
                  {showPassword ? (
                    <FiEyeOff className="h-5 w-5" />
                  ) : (
                    <FiEye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center cursor-pointer justify-center py-3 px-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all shadow-md"
            >
              <FiLogIn className="mr-2" />
              Sign In
            </motion.button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-amber-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-amber-500">
                Or continue with
              </span>
            </div>
          </div>

          <motion.button
            onClick={handleSignInG}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full cursor-pointer flex items-center justify-center p-3 border border-amber-200 rounded-lg hover:bg-amber-50 transition"
          >
            <FcGoogle className="w-5 h-5 mr-2" />
            <span>Continue with Google</span>
          </motion.button>

          <div className="text-center text-sm text-amber-700">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium hover:underline bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent"
            >
              {/* from-ambser-600 to-orange-600  */}
              {/* from-amber-600 to-orange-600 */}
              Register here
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden lg:block w-1/3 max-w-md">
        <Lottie animationData={groovyWalkAnimation} loop={true} />;
      </div>
    </motion.div>
  );
};

export default LoginPage;
