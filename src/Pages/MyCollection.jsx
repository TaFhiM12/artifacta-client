import React, { useContext, useEffect, useState } from "react";
import LoadingSpinner from "../Components/LoadingSpinner";
import { AuthContext } from "../Contexts/AuthContext";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { FaTrash, FaEdit, FaBoxOpen, FaPlus, FaHeart, FaClock } from "react-icons/fa";
import { Helmet } from "react-helmet";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { motion } from "framer-motion";

const MyCollection = () => {
  const { user } = useContext(AuthContext);
  const [myArtifacts, setMyArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchMyArtifacts = async () => {
      setLoading(true);
      try {
        if (user?.email) {
          const response = await axiosSecure.get(
            `/artifacts/myCollection/${user.email}?page=${page}&limit=${limit}`
          );
          setMyArtifacts(response.data.data || []);
          setTotalPages(response.data.totalPages || 1);
          setError(null);
        }
      } catch (error) {
        console.error("Error fetching my collection:", error);
        setError(error.response?.data?.message || "Failed to load collection");
        setMyArtifacts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMyArtifacts();
  }, [user, axiosSecure, page]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete your artifact",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      background: "#f8f4e9",
      customClass: {
        popup: "border-2 border-amber-700 rounded-xl",
        title: "text-amber-800 font-bold"
      }
    });

    if (result.isConfirmed) {
      try {
        const response = await axiosSecure.delete(`/artifacts/${id}`);
        if (response.status === 200) {
          await Swal.fire({
            title: "Deleted!",
            text: "Artifact removed successfully",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
            background: "#f8f4e9",
            customClass: {
              popup: "border-2 border-green-500 rounded-xl"
            }
          });
          setMyArtifacts(prev => prev.filter(artifact => artifact._id !== id));
        }
      } catch (error) {
        await Swal.fire({
          title: "Error!",
          text: error.response?.data?.message || "Delete failed",
          icon: "error",
          background: "#f8f4e9",
          customClass: {
            popup: "border-2 border-red-500 rounded-xl"
          }
        });
      }
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center mt-20 text-red-500 font-medium">{error}</div>;

  return (
    <div className="min-h-screen bg-amber-50 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Artifacta | My Collection</title>
      </Helmet>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-amber-800 mb-2">
            My Artifact Collection
          </h1>
          <p className="text-lg text-amber-600">
            Your personal museum of historical treasures
          </p>
        </div>

        {myArtifacts.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto text-center border border-amber-200"
          >
            <div className="bg-amber-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaBoxOpen className="text-amber-600 text-4xl" />
            </div>
            <h2 className="text-2xl font-bold text-amber-800 mb-3">
              Your Collection is Empty
            </h2>
            <p className="text-amber-600 mb-6">
              Start your journey by adding your first historical artifact
            </p>
            <Link
              to="/addArtifacts"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all shadow-md hover:shadow-lg"
            >
              <FaPlus className="mr-2" /> Add First Artifact
            </Link>
          </motion.div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myArtifacts.map((artifact) => (
                <motion.div
                  key={artifact._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-amber-100 hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-60 overflow-hidden group">
                    <img
                      src={artifact.imageUrl}
                      alt={artifact.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=500&q=80";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent p-4 flex flex-col justify-end">
                      <h3 className="text-xl font-bold text-white">
                        {artifact.name}
                      </h3>
                      <div className="flex items-center text-sm text-amber-200 mt-1">
                        <FaClock className="mr-1" />
                        <span>{artifact.createdAt}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <div className="flex justify-between items-center mb-3">
                      <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold">
                        {artifact.type}
                      </span>
                      <div className="flex items-center text-amber-600">
                        <FaHeart className="mr-1" />
                        <span className="font-medium">{artifact.likedBy?.length || 0}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {artifact.shortDescription}
                    </p>

                    <div className="flex justify-between mt-4">
                      <Link
                        to={`/dashboard/update-artifact/${artifact._id}`}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        <FaEdit className="mr-2" /> Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(artifact._id)}
                        className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                      >
                        <FaTrash className="mr-2" /> Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-10 space-x-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 bg-amber-100 text-amber-800 rounded-lg border border-amber-200 hover:bg-amber-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (page <= 3) {
                    pageNum = i + 1;
                  } else if (page >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = page - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`px-4 py-2 rounded-lg border ${
                        page === pageNum
                          ? "bg-amber-600 text-white border-amber-600"
                          : "bg-white text-amber-800 border-amber-200 hover:bg-amber-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 bg-amber-100 text-amber-800 rounded-lg border border-amber-200 hover:bg-amber-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyCollection;