import React, { useContext, useState } from "react";
import { NavLink, Link, Outlet } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlusSquare,
  FiArchive,
  FiHeart,
  FiLogOut,
  FiHome,
  FiMenu,
  FiX
} from "react-icons/fi";
import { AuthContext } from "../../Contexts/AuthContext";
import Swal from "sweetalert2";

const Dashboard = () => {
  const { user, signOutUser , setUser } = useContext(AuthContext);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  
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
  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-stone-50">
      {/* Mobile Header - Always Sticky */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-amber-100 sticky top-0 z-40">
        <h1 className="text-xl font-bold text-amber-800">Artifact Tracker</h1>
        <button 
          onClick={toggleMobileSidebar}
          className="p-2 text-amber-700 rounded-lg hover:bg-amber-50"
        >
          {mobileSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

     
      <AnimatePresence>
        {(mobileSidebarOpen || !window.matchMedia("(max-width: 768px)").matches) && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className={`fixed md:sticky top-0 z-30 w-64 bg-white shadow-lg md:shadow-none md:border-r border-amber-100 h-screen ${
              mobileSidebarOpen ? 'block' : 'hidden md:block'
            }`}
          >
            <div className="p-4 border-b border-amber-100">
              <h1 className="text-2xl font-bold text-amber-800">Artifact Tracker</h1>
              <p className="text-sm text-amber-600">Dashboard</p>
            </div>

            <div className="flex flex-col justify-between h-[calc(100vh-120px)] overflow-y-auto">
              <nav className="p-4 space-y-2">
                <NavLink
                  to="/dashboard"
                  end
                  onClick={() => setMobileSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-gradient-to-r from-amber-100 to-amber-50 text-amber-800 border-l-4 border-amber-500"
                        : "text-stone-700 hover:bg-amber-50 hover:text-amber-700"
                    }`
                  }
                >
                  <FiHome className="mr-3" />
                  Dashboard Home
                </NavLink>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <NavLink
                    to="/dashboard/addArtifacts"
                    onClick={() => setMobileSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center p-3 rounded-lg transition-colors ${
                        isActive
                          ? "bg-gradient-to-r from-amber-100 to-amber-50 text-amber-800 border-l-4 border-amber-500"
                          : "text-stone-700 hover:bg-amber-50 hover:text-amber-700"
                      }`
                    }
                  >
                    <FiPlusSquare className="mr-3" />
                    Contribute Artifact
                  </NavLink>
                </motion.div>

                <NavLink
                  to={`/dashboard/myCollection/${user?.email}`}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-gradient-to-r from-amber-100 to-amber-50 text-amber-800 border-l-4 border-amber-500"
                        : "text-stone-700 hover:bg-amber-50 hover:text-amber-700"
                    }`
                  }
                >
                  <FiArchive className="mr-3" />
                  My Collection
                </NavLink>

                <NavLink
                  to={`/dashboard/likedItems/${user?.email}`}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-gradient-to-r from-amber-100 to-amber-50 text-amber-800 border-l-4 border-amber-500"
                        : "text-stone-700 hover:bg-amber-50 hover:text-amber-700"
                    }`
                  }
                >
                  <FiHeart className="mr-3" />
                  Liked Items
                </NavLink>
              </nav>

              {/* Profile Section */}
              <div className="p-4 border-t border-amber-100">
                <NavLink
                  to="/dashboard/myProfile"
                  end
                  onClick={() => setMobileSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-gradient-to-r from-amber-100 to-amber-50 text-amber-800"
                        : "hover:bg-amber-50 hover:text-amber-700"
                    }`
                  }
                >
                  <div className="relative">
                    <img
                      src={user?.photoURL || "https://via.placeholder.com/150"}
                      alt={user?.displayName || "User"}
                      className="w-10 h-10 rounded-full object-cover border-2 border-amber-300"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-stone-800 truncate">
                      {user?.displayName || "My Profile"}
                    </p>
                    <p className="text-xs text-amber-600 truncate">
                      {user?.email || "View profile"}
                    </p>
                  </div>
                </NavLink>

                <button
                  onClick={handleSignOut}
                  className="w-full mt-2 flex items-center p-3 text-sm text-stone-700 hover:bg-amber-50 hover:text-amber-700 transition-colors rounded-lg"
                >
                  <FiLogOut className="mr-3" />
                  Sign out
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for mobile */}
      {mobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 p-6 bg-amber-50/50 overflow-y-auto">
        <Outlet/>
      </main>
    </div>
  );
};

export default Dashboard;