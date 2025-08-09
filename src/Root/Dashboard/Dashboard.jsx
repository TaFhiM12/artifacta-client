import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router';
import { motion } from 'framer-motion';
import { 
  FiPlusSquare, 
  FiArchive, 
  FiHeart, 
  FiLogOut,
  FiHome,
  FiBook,
  FiUsers,
  FiSettings,
  FiHelpCircle,
  FiAward,
  FiMessageSquare
} from 'react-icons/fi';
import { AuthContext } from '../../Contexts/AuthContext';

const Dashboard = () => {
  const { user, signInUser } = useContext(AuthContext); // Assuming you have auth context
  const handleSignOut = () => {
    signInUser();
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-stone-50">
      {/* Sidebar Navigation - Hidden on mobile by default */}
      <motion.div 
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="w-full md:w-64 bg-white shadow-lg md:shadow-none md:border-r border-amber-100"
      >
        <div className="p-4 border-b border-amber-100">
          <h1 className="text-2xl font-bold text-amber-800">Artifact Tracker</h1>
          <p className="text-sm text-amber-600">Dashboard</p>
        </div>

        {/* Main Navigation Links */}
        <nav className="p-4 space-y-2">
          <NavLink 
            to="/dashboard" 
            end
            className={({ isActive }) => 
              `flex items-center p-3 rounded-lg transition-colors ${isActive ? 
                'bg-gradient-to-r from-amber-100 to-amber-50 text-amber-800 border-l-4 border-amber-500' : 
                'text-stone-700 hover:bg-amber-50 hover:text-amber-700'}`
            }
          >
            <FiHome className="mr-3" />
            Dashboard Home
          </NavLink>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <NavLink
              to="/addArtifacts"
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg transition-colors ${isActive ?
                  'bg-gradient-to-r from-amber-100 to-amber-50 text-amber-800 border-l-4 border-amber-500' :
                  'text-stone-700 hover:bg-amber-50 hover:text-amber-700'}`
              }
            >
              <FiPlusSquare className="mr-3" />
              Contribute Artifact
            </NavLink>
          </motion.div>

          <NavLink
            to={`/myCollection/${user?.email}`}
            className={({ isActive }) =>
              `flex items-center p-3 rounded-lg transition-colors ${isActive ?
                'bg-gradient-to-r from-amber-100 to-amber-50 text-amber-800 border-l-4 border-amber-500' :
                'text-stone-700 hover:bg-amber-50 hover:text-amber-700'}`
            }
          >
            <FiArchive className="mr-3" />
            My Collection
          </NavLink>

          <NavLink
            to={`/likedItems/${user?.email}`}
            className={({ isActive }) =>
              `flex items-center p-3 rounded-lg transition-colors ${isActive ?
                'bg-gradient-to-r from-amber-100 to-amber-50 text-amber-800 border-l-4 border-amber-500' :
                'text-stone-700 hover:bg-amber-50 hover:text-amber-700'}`
            }
          >
            <FiHeart className="mr-3" />
            Liked Items
          </NavLink>

          <NavLink
            to="/allArtifacts"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-lg transition-colors ${isActive ?
                'bg-gradient-to-r from-amber-100 to-amber-50 text-amber-800 border-l-4 border-amber-500' :
                'text-stone-700 hover:bg-amber-50 hover:text-amber-700'}`
            }
          >
            <FiBook className="mr-3" />
            Browse Artifacts
          </NavLink>

          <NavLink
            to="/preservation-guide"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-lg transition-colors ${isActive ?
                'bg-gradient-to-r from-amber-100 to-amber-50 text-amber-800 border-l-4 border-amber-500' :
                'text-stone-700 hover:bg-amber-50 hover:text-amber-700'}`
            }
          >
            <FiHelpCircle className="mr-3" />
            Preservation Guide
          </NavLink>

          <NavLink
            to="/assistant"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-lg transition-colors ${isActive ?
                'bg-gradient-to-r from-amber-100 to-amber-50 text-amber-800 border-l-4 border-amber-500' :
                'text-stone-700 hover:bg-amber-50 hover:text-amber-700'}`
            }
          >
            <FiMessageSquare className="mr-3" />
            AI Assistant
          </NavLink>
        </nav>

        {/* Profile Section */}
        <div className="p-4 border-t border-amber-100 mt-auto">
          <Link
            to="/myProfile"
            className="flex items-center p-3 rounded-lg hover:bg-amber-50 transition-colors"
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
          </Link>

          <button
            onClick={handleSignOut}
            className="w-full mt-2 flex items-center p-3 text-sm text-stone-700 hover:bg-amber-50 hover:text-amber-700 transition-colors rounded-lg"
          >
            <FiLogOut className="mr-3" />
            Sign out
          </button>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <main className="flex-1 p-6 bg-amber-50/50">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-amber-100">
            <h2 className="text-2xl font-bold text-amber-800 mb-2">Welcome back, {user?.displayName || 'Researcher'}!</h2>
            <p className="text-stone-600 mb-6">Manage your artifacts and collections from this dashboard.</p>
            
            {/* Quick Stats or Overview Cards can go here */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
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

            {/* Recent Artifacts or other dashboard content */}
            <div className="bg-white rounded-lg border border-amber-100 p-6">
              <h3 className="text-lg font-semibold text-amber-800 mb-4">Recent Contributions</h3>
              <div className="space-y-4">
                <p className="text-stone-600">Your recently added artifacts will appear here.</p>
                {/* Map through recent artifacts here */}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;