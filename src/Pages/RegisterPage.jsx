import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { updateProfile } from "firebase/auth";
import { motion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiImage,
  FiLock,
  FiLogIn,
  FiEye,
  FiEyeOff,
  FiArrowLeft,
} from "react-icons/fi";
import { use } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import Lottie from "lottie-react";
import groovyWalkAnimation from "../assets/register.json";
import { Helmet } from "react-helmet";

const RegisterPage = () => {
  const { createUser, setUserProfileDetails } = use(AuthContext);
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const validatePassword = (password) => {
    const errors = [];

    if (!password) return ["All requirements"];
    if (password.length < 6) {
      errors.push("6+ characters");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("uppercase letter");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("lowercase letter");
    }

    return errors.length ? errors : null;
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const errors = validatePassword(newPassword);
    setPasswordError(errors ? `Missing: ${errors.join(", ")}` : "");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value || "https://i.imgur.com/8Km9tLL.png";
    const password = e.target.password.value;

    const errors = validatePassword(password);
    if (errors) {
      setPasswordError(`Missing: ${errors.join(", ")}`);
      toast.error("Please fix password requirements");
      return;
    }

    try {
      toast.promise(
        (async () => {
          const userCredential = await createUser(email, password);
          const user = userCredential.user;

          await updateProfile(user, {
            displayName: name,
            photoURL: photo,
          });

          if (setUserProfileDetails) {
            setUserProfileDetails({
              displayName: name,
              photoURL: photo,
              email: email,
            });
          }
          navigate("/");
        })(),
        {
          loading: "Creating your account...",
          success: <b>Registration successful! Please login</b>,
          error: (error) => {
            if (error.code === "auth/email-already-in-use") {
              return <b>Email already registered. Try logging in instead.</b>;
            } else {
              return <b>Registration failed. Please try again.</b>;
            }
          },
        }
      );
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const passwordRequirements = [
    { label: "6+ characters", valid: password?.length >= 6 },
    { label: "Uppercase letter", valid: /[A-Z]/.test(password) },
    { label: "Lowercase letter", valid: /[a-z]/.test(password) },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center space-x-10  px-4 mt-70 md:bg-gradient-to-b md:from-stone-100 md:to-amber-50 md:mt-30 md:pb-6"
    >
      <Helmet>
        <title>Artifacta | Register</title>
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
              Create Account
            </h1>
            <p className="text-amber-700 mt-2">Join our historical community</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-amber-800"
                >
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="text-amber-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    placeholder="John Doe"
                    className="pl-10 w-full px-4 py-3 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-amber-800"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-amber-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    placeholder="your@email.com"
                    className="pl-10 w-full px-4 py-3 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="photo"
                className="block text-sm font-medium text-amber-800"
              >
                Photo URL (Optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiImage className="text-amber-400" />
                </div>
                <input
                  type="url"
                  name="photo"
                  id="photo"
                  placeholder="https://example.com/photo.jpg"
                  className="pl-10 w-full px-4 py-3 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-amber-800"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-amber-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  required
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="••••••••"
                  className="pl-10 w-full px-4 py-3 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-amber-500 hover:text-amber-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FiEyeOff className="h-5 w-5" />
                  ) : (
                    <FiEye className="h-5 w-5" />
                  )}
                </button>
              </div>

              {passwordError && (
                <p className="text-sm text-red-600 mt-1">{passwordError}</p>
              )}

              <div className="mt-2 space-y-1 text-xs text-amber-700">
                <p>Password must contain:</p>
                <ul className="space-y-1 flex flex-col">
                  {passwordRequirements.map((req, index) => (
                    <li
                      key={index}
                      className={`flex items-center ${
                        req.valid ? "text-green-500" : ""
                      }`}
                    >
                      <span
                        className={`inline-block w-4 h-4 mr-1 ${
                          req.valid ? "text-green-500" : "text-amber-400"
                        }`}
                      >
                        {req.valid ? "✓" : "•"}
                      </span>
                      {req.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={!!passwordError || !password}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center justify-center py-3 px-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all shadow-md ${
                passwordError || !password
                  ? "opacity-70 cursor-not-allowed"
                  : ""
              }`}
            >
              <FiLogIn className="mr-2" />
              Register
            </motion.button>
          </form>

          <div className="text-center text-sm text-amber-700">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium hover:underline bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent"
            >
              Login here
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden lg:block w-1/3 max-w-md items-center justify-center ">
        <Lottie animationData={groovyWalkAnimation} loop={true} />
      </div>
    </motion.div>
  );
};

export default RegisterPage;
