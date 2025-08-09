import React, { useContext, useState } from "react";
import { NavLink, Link } from "react-router";
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

const Dashboard = () => {
  const { user, signInUser } = useContext(AuthContext);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  
  const handleSignOut = () => {
    signInUser();
  };

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-stone-50">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-amber-100">
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
            className={`fixed md:relative z-50 w-64 bg-white shadow-lg md:shadow-none md:border-r border-amber-100 h-full ${
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
                  to="/dashboard/myCollection/profile"
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
                  to="/dashboard/likedItems/profile"
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
                  to="/dashboard/profile"
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
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 p-6 bg-amber-50/50">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-amber-100">
            <h2 className="text-2xl font-bold text-amber-800 mb-2">
              Welcome back, {user?.displayName || "Researcher"}!
            </h2>
            <p className="text-stone-600 mb-6">
              Manage your artifacts and collections from this dashboard.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-amber-100 to-amber-50 p-4 rounded-lg border border-amber-200"
              >
                <h3 className="font-medium text-amber-800">Your Artifacts</h3>
                <p className="text-2xl font-bold text-amber-600">24</p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-amber-100 to-amber-50 p-4 rounded-lg border border-amber-200"
              >
                <h3 className="font-medium text-amber-800">Liked Items</h3>
                <p className="text-2xl font-bold text-amber-600">15</p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-amber-100 to-amber-50 p-4 rounded-lg border border-amber-200"
              >
                <h3 className="font-medium text-amber-800">Recent Activity</h3>
                <p className="text-2xl font-bold text-amber-600">3</p>
              </motion.div>
            </div>

            {/* Recent Artifacts */}
            <div className="bg-white rounded-lg border border-amber-100 p-6">
              <h3 className="text-lg font-semibold text-amber-800 mb-4">
                Recent Contributions
              </h3>
              <div className="space-y-4">
                <p className="text-stone-600">
                  Your recently added artifacts will appear here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;