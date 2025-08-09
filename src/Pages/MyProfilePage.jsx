import React, { useContext } from "react";
import { FiUser, FiMail, FiEdit2, FiPhone, FiCalendar } from "react-icons/fi";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { AuthContext } from "../Contexts/AuthContext";
import { formatDistanceToNow, format } from 'date-fns';
import { Helmet } from "react-helmet";

const MyProfilePage = () => {
  const { user } = useContext(AuthContext);

  // Mock additional user data for demonstration
  const userData = {
    joinedDate: user?.metadata?.creationTime
      ? format(new Date(user.metadata.creationTime), "MMMM yyyy")
      : "Unknown date",
    lastActive: user?.metadata?.lastSignInTime
      ? formatDistanceToNow(new Date(user.metadata.lastSignInTime), {
          addSuffix: true,
        })
      : "Unknown time",
  };

  return (
    <div className="py-12 px-4 ">
      <Helmet>
        <title>Artifacta | {user.displayName || 'My Profile'}</title>
      </Helmet>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Profile Header */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 md:p-8 flex flex-col md:flex-row items-center">
              <div className="relative mb-6 md:mb-0 md:mr-8">
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 flex items-center justify-center shadow-lg">
                    <FiUser className="w-16 h-16 text-amber-500" />
                  </div>
                )}
              </div>

              <div className="text-center md:text-left">
                <h1 className="text-2xl font-bold text-gray-800">
                  {user?.displayName || "Anonymous User"}
                </h1>
                <p className="text-amber-600 mb-2">{user?.email}</p>

                <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                    Member since {userData.joinedDate}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                    Active {userData.lastActive}
                  </span>
                </div>
              </div>

              <div className="mt-6 md:mt-0 md:ml-auto">
                <Link
                  to="/dashboard/update-profile"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
                >
                  <FiEdit2 className="mr-2" />
                  Edit Profile
                </Link>
              </div>
            </div>
          </div>

          {/* Profile Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Info Card */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <FiUser className="text-amber-600 mr-2" />
                  Personal Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Display Name</p>
                    <p className="font-medium">
                      {user?.displayName || "Not set"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p className="font-medium">{user?.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Info Card */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <FiCalendar className="text-amber-600 mr-2" />
                  Account Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Account Created</p>
                    <p className="font-medium">{userData.joinedDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Last Active</p>
                    <p className="font-medium">{userData.lastActive}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MyProfilePage;
