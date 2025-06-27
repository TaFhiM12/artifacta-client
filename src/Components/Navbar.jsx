import React, { useState } from "react";
import { motion } from "framer-motion";
import { Bot, LogIn } from "lucide-react";
import "../App.css";
import {
  FiLogOut,
  FiUser,
  FiChevronDown,
  FiChevronUp,
  FiHome,
  FiArchive,
  FiHeart,
  FiPlusSquare,
  FiSearch,
} from "react-icons/fi";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../Contexts/AuthContext";
import { use } from "react";
import Swal from "sweetalert2";

const NavBar = () => {
  const { user, setUser, signOutUser } = use(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const Navigate = useNavigate();

  const handleSignOut = () => {
    Swal.fire({
      title: "Signing Out",
      text: "Please wait while we securely sign you out...",
      allowOutsideClick: false,
      showConfirmButton: false,
      timer: 1500,
      willOpen: () => {
        Swal.showLoading();
      },
    });

    signOutUser()
      .then(() => {
        setUser(null);
        Swal.fire({
          icon: "success",
          title: "Signed Out Successfully",
          text: "You have been securely signed out.",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          willClose: () => {
            Navigate("/login");
          },
        });
      })
      .catch((err) => {
        console.error("Sign out failed:", err);
        Swal.fire({
          icon: "error",
          title: "Sign Out Failed",
          text: "Could not sign out. Please try again.",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      });
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.toLowerCase().trim();

    const sectionMap = {
      feature: "features",
      features: "features",
      "feature group": "features",
      timeline: "timeline",
      history: "timeline",
      tips: "tips",
      preservation: "tips",
      "preservation tips": "tips",
      home: "hero",
      hero: "hero",
    };

    const sectionId = sectionMap[query];

    if (sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.classList.add("highlight-section");

        element.scrollIntoView({ behavior: "smooth" });

        setTimeout(() => {
          element.classList.remove("highlight-section");
        }, 2000);
      }
    } else {
      alert(
        `No section found for "${searchQuery}". Try "features", "timeline", or "tips".`
      );
    }

    setSearchQuery("");
  };

  const mainLinks = (
    <>
      <motion.li
        className="relative"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg text-base font-medium transition-all duration-300 flex items-center ${
              isActive
                ? "text-white bg-gradient-to-r from-amber-600 to-orange-600 shadow-lg"
                : "text-gray-700 hover:text-amber-700 hover:bg-amber-50"
            }`
          }
        >
          <FiHome className="mr-2" />
          Home
        </NavLink>
      </motion.li>

      <motion.li
        className="relative"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <NavLink
          to="/allArtifacts"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg text-base font-medium transition-all duration-300 flex items-center ${
              isActive
                ? "text-white bg-gradient-to-r from-amber-600 to-orange-600 shadow-lg"
                : "text-gray-700 hover:text-amber-700 hover:bg-amber-50"
            }`
          }
        >
          <FiArchive className="mr-2" />
          Browse
        </NavLink>
      </motion.li>
    </>
  );

  const authLinks = (
    <>
      {user ? (
        <div className="flex flex-col md:flex-row items-center space-x-1">
          <motion.li
            className="relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <NavLink
              to="/addArtifacts"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-base font-medium transition-all duration-300 flex items-center ${
                  isActive
                    ? "text-white bg-gradient-to-r from-amber-600 to-orange-600 shadow-lg"
                    : "text-gray-700 hover:text-amber-700 hover:bg-amber-50"
                }`
              }
            >
              <FiPlusSquare className="mr-2" />
              Contribute
            </NavLink>
          </motion.li>
          <motion.li
            className="relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <NavLink
              to="/assistant"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-base font-medium transition-all duration-300 flex items-center ${
                  isActive
                     ? "text-white bg-gradient-to-r from-amber-600 to-orange-600 shadow-lg"
                    : "text-gray-700 hover:text-amber-700 hover:bg-amber-50"
                }`
              }
            >
               <Bot className="mr-2" />
              ArchaeoBot
            </NavLink>
          </motion.li>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row items-center space-x-1 space-y-3 md:space-y-0">
          <motion.li
            className="relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-base font-medium transition-all duration-300 flex items-center ${
                  isActive
                    ? "text-white bg-gradient-to-r from-amber-600 to-orange-600 shadow-lg"
                    : "text-gray-700 hover:text-amber-700 hover:bg-amber-50"
                }`
              }
            >
              <LogIn className="mr-2" />
              Login
            </NavLink>
          </motion.li>

          <motion.li
            className="relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <NavLink
              to="/register"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-base font-medium transition-all duration-300 ${
                  isActive
                    ? "text-white bg-gradient-to-r from-amber-600 to-orange-600 shadow-lg"
                    : "text-gray-700 hover:text-amber-700 hover:bg-amber-50"
                }`
              }
            >
              Register
            </NavLink>
          </motion.li>
        </div>
      )}
    </>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white/90 backdrop-blur-md shadow-sm py-2 sticky top-0 z-50 border-b border-amber-100"
    >
      <div className="max-w-[96rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-22 items-center">
          {/* Left section - Logo */}
          <div className="flex-shrink-0 ">
            <Link
              to="/"
              className="flex items-center focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 rounded-md transition-all"
              aria-label="Home"
            >
              <div className="relative group">
                <img
                  className="w-36 h-auto transition-transform duration-200 group-hover:scale-[1.02]"
                  src="../logo1.png"
                  alt="Espresso Emporium Logo"
                />
                <div className="absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 bg-gradient-to-r from-amber-500 to-orange-500 transition-transform duration-300 group-hover:scale-x-100" />
                <div className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-amber-100/10 to-transparent pointer-events-none" />
              </div>
            </Link>
          </div>

          {/* Middle section - Search */}
          <div className="flex-1 max-w-md mx-4 hidden md:block">
            <motion.form
              onSubmit={handleSearch}
              whileHover={{ scale: 1.01 }}
              className="relative"
            >
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-amber-500" />
              </div>
              <input
                type="text"
                placeholder="Search features, timeline, or tips (press Enter)"
                className="block w-full pl-10 pr-3 py-2 border border-amber-600 rounded-full bg-gradient-to-r from-amber-50 to-orange-100 focus:outline-none focus:ring-2 focus:ring-amber-800 focus:border-transparent text-gray-700 placeholder-stone-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="hidden">
                Search
              </button>
            </motion.form>
          </div>

          {/* Right section - Navigation and user */}
          <div className="flex items-center">
            {/* Desktop navigation */}
            <nav className="hidden md:flex space-x-1 items-center">
              <ul className="flex space-x-1">{mainLinks}</ul>

              <div className="mx-2 h-6 w-px bg-amber-200"></div>

              <ul className="flex space-x-1">{authLinks}</ul>
            </nav>

            {/* User dropdown */}
            <div className="ml-4 relative">
              {user ? (
                <div className="relative">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <button
                      onClick={toggleDropdown}
                      className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-amber-50 transition-colors cursor-pointer"
                    >
                      <div className="avatar relative">
                        <div className="w-9 h-9 rounded-full border-2 border-white shadow-lg relative overflow-hidden">
                          {user.photoURL ? (
                            <motion.img
                              src={user.photoURL}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                              alt="User profile"
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-amber-100 to-amber-300 flex items-center justify-center">
                              <FiUser className="w-4 h-4 text-amber-700" />
                            </div>
                          )}
                        </div>
                        <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></span>
                      </div>
                      <span className="flex items-center text-sm text-amber-600">
                        {isDropdownOpen ? (
                          <FiChevronUp size={16} />
                        ) : (
                          <FiChevronDown size={16} />
                        )}
                      </span>
                    </button>
                  </motion.div>

                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-xl shadow-xl ring-1 ring-amber-100 focus:outline-none z-50 overflow-hidden"
                    >
                      <Link
                        to="/myProfile"
                        className="px-4 flex flex-col justify-center items-center py-3 border-b border-amber-50"
                      >
                        <p className="text-sm font-medium text-amber-900 truncate">
                          {user.displayName || "Welcome"}
                        </p>
                        <p className="text-xs text-amber-600 truncate">
                          {user.email}
                        </p>
                      </Link>

                      <div className="flex flex-col gap-1 p-2">
                        <NavLink
                          to={`/myCollection/${user.email}`}
                          className={({ isActive }) =>
                            `px-3 py-2 flex items-center rounded-lg text-sm font-medium transition-colors duration-200 ${
                              isActive
                                ? "text-white bg-gradient-to-r from-amber-500 to-amber-600 shadow-md"
                                : "text-gray-700 hover:text-amber-700 hover:bg-amber-50"
                            }`
                          }
                        >
                          <FiArchive className="mr-3" />
                          My Collection
                        </NavLink>

                        <NavLink
                          to={`/likedItems/${user.email}`}
                          className={({ isActive }) =>
                            `px-3 py-2 flex items-center rounded-lg text-sm font-medium transition-colors duration-200 ${
                              isActive
                                ? "text-white bg-gradient-to-r from-amber-500 to-amber-600 shadow-md"
                                : "text-gray-700 hover:text-amber-700 hover:bg-amber-50"
                            }`
                          }
                        >
                          <FiHeart className="mr-3 " />
                          Liked Items
                        </NavLink>
                       
                        <div className="border-t border-amber-50 my-1"></div>

                        <button
                          onClick={handleSignOut}
                          className="w-full text-left flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors duration-200 rounded-lg"
                        >
                          <FiLogOut className="mr-3" />
                          Sign out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/login"
                    className="flex items-center gap-2 group"
                    aria-label="Guest account"
                  >
                    <div className="relative">
                      <div className="w-9 h-9 rounded-full border-2 border-white shadow-lg relative overflow-hidden bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                        <FiUser className="w-4 h-4 text-amber-600 group-hover:text-amber-700 transition-colors" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden ml-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-md text-amber-600 hover:text-amber-700 hover:bg-amber-50 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden px-4 pt-2 pb-4 border-t border-amber-100">
        <div className="mb-3">
          <form onSubmit={handleSearch} className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-amber-500" />
            </div>
            <input
              type="text"
              placeholder="Search sections (features, timeline, tips)..."
              className="block w-full pl-10 pr-3 py-2 border border-amber-200 rounded-full bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-700 placeholder-amber-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="hidden">
              Search
            </button>
          </form>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <ul className="space-y-1">{mainLinks}</ul>
          <ul className="space-y-1">{authLinks}</ul>
        </div>
      </div>
    </motion.div>
  );
};

export default NavBar;
