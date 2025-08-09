import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import { motion } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Components/LoadingSpinner";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    myArtifactsCount: 0,
    likedCount: 0,
    types: []
  });
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchStats = async () => {
      if (user?.email) {
        try {
          setLoading(true);
          const response = await axiosSecure.get(`/dashboard/stats/${user.email}`);
          if (response.data.success) {
            setStats(response.data.stats);
          }
        } catch (error) {
          console.error("Error fetching stats:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchStats();
  }, [user, axiosSecure]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-amber-100">
        <h2 className="text-2xl font-bold text-amber-800 mb-2">
          Welcome back, {user?.displayName || "Researcher"}!
        </h2>
        <p className="text-stone-600 mb-6">
          Manage your artifacts and collections from this dashboard.
        </p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-gradient-to-br from-amber-100 to-amber-50 p-4 rounded-lg border border-amber-200"
          >
            <h3 className="font-medium text-amber-800">Your Artifacts</h3>
            <p className="text-2xl font-bold text-amber-600">
              {stats.myArtifactsCount}
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-gradient-to-br from-amber-100 to-amber-50 p-4 rounded-lg border border-amber-200"
          >
            <h3 className="font-medium text-amber-800">Liked Items</h3>
            <p className="text-2xl font-bold text-amber-600">
              {stats.likedCount}
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-gradient-to-br from-amber-100 to-amber-50 p-4 rounded-lg border border-amber-200"
          >
            <h3 className="font-medium text-amber-800">Categories</h3>
            <p className="text-2xl font-bold text-amber-600">
              {stats.types.length}
            </p>
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-amber-100 p-4">
            <h3 className="text-lg font-semibold text-amber-800 mb-4">
              Your Artifacts by Type
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.types}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    dataKey="count" 
                    name="Artifacts" 
                    fill="#D97706"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-amber-100 p-4">
            <h3 className="text-lg font-semibold text-amber-800 mb-4">
              Type Distribution
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.types}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                    nameKey="type"
                    label={({ name, percent }) => 
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {stats.types.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]} 
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="bg-white rounded-lg border border-amber-100 p-6">
          <h3 className="text-lg font-semibold text-amber-800 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            <p className="text-stone-600">
              Your recently added artifacts will appear here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;