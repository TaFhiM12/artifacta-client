import React, { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import { motion } from 'framer-motion';

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <div className="max-w-7xl mx-auto">
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
    </div>
  );
};

export default DashboardHome;
