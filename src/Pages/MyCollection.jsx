import React, { useContext, useEffect, useState } from "react";
import LoadingSpinner from "../Components/LoadingSpinner";
import { AuthContext } from "../Contexts/AuthContext";
import { Link } from "react-router";
import Swal from "sweetalert2";
import {
  FaTrash,
  FaEdit,
  FaBoxOpen,
  FaPlus,
  FaHeart,
  FaClock,
  FaLayerGroup,
} from "react-icons/fa";
import { Helmet } from "react-helmet";
import useAxiosSecure from "../hooks/useAxiosSecure";

const MyCollection = () => {
  const { user } = useContext(AuthContext);
  const [myArtifacts, setMyArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchMyArtifacts = async () => {
      setLoading(true);
      try {
        if (user?.email) {
          const response = await axiosSecure.get(
            `/artifacts/myCollection/${user.email}`
          );
          setMyArtifacts(response.data);
          setError(null);
        }
      } catch (error) {
        console.error("Error fetching my collection:", error);
        if (error.response?.status !== 404) {
          setError("Failed to load your collection. Please try again later.");
        }
        setMyArtifacts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMyArtifacts();
  }, [user, axiosSecure]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete your artifact from the collection",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      background: "#f8f4e9",
      backdrop: `
        rgba(0,0,0,0.6)
        url("/images/archaeology-icon.png")
        center top
        no-repeat
      `,
      customClass: {
        popup: "border-2 border-amber-700 rounded-xl",
        title: "text-amber-800 font-bold",
        confirmButton: "hover:bg-red-700 transition-colors",
        cancelButton: "hover:bg-blue-700 transition-colors",
      },
    });

    if (result.isConfirmed) {
      try {
        const response = await axiosSecure.delete(
          `/artifacts/${id}`,
        );

        if (response.status === 200) {
          await Swal.fire({
            title: "Deleted!",
            text: "Your artifact has been removed.",
            icon: "success",
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
            background: "#f8f4e9",
            customClass: {
              popup: "border-2 border-green-500 rounded-xl",
              title: "text-green-700 font-bold",
            },
            willClose: () => {
              setMyArtifacts(
                myArtifacts.filter((artifact) => artifact._id !== id)
              );
            },
          });
        }
      } catch (error) {
        console.error("Error deleting artifact:", error);
        await Swal.fire({
          title: "Error!",
          text: error.response?.data?.message || "Failed to delete artifact",
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#3085d6",
          background: "#f8f4e9",
          customClass: {
            popup: "border-2 border-red-500 rounded-xl",
            title: "text-red-700 font-bold",
          },
        });
      }
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <div className="text-center mt-20 text-red-500 font-medium">{error}</div>
    );

  return (
    <div className="min-h-screen  md:px-4 py-8">
      <Helmet>
        <title>Artifacta | My Collection</title>
      </Helmet>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4 relative inline-block">
            <span className="relative">My Artifact Collection</span>
          </h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Your personal museum of historical treasures
          </p>
        </div>

        {myArtifacts.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto text-center">
            <div className="bg-amber-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaBoxOpen className="text-amber-600 text-4xl" />
            </div>
            <h2 className="text-2xl font-bold text-amber-800 mb-3">
              Your Collection is Empty
            </h2>
            <p className="text-amber-600 mb-6">
              Start your journey as a curator by adding your first historical
              artifact
            </p>
            <Link
              to="/addArtifacts"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all shadow-md hover:shadow-lg"
            >
              <FaPlus className="mr-2" />
              Add First Artifact
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {myArtifacts.map((artifact) => (
              <div
                key={artifact._id}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-amber-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={artifact.imageUrl}
                    alt={artifact.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80";
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-xl font-bold text-white">
                      {artifact.name}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                      {artifact.type}
                    </span>
                    <div className="flex items-center text-amber-600">
                      <FaHeart className="mr-1" />
                      <span>{artifact.likedBy.length}</span>
                    </div>
                  </div>

                  <div className="flex items-center text-sm text-amber-700 mb-3">
                    <FaClock className="mr-2" />
                    <span>{artifact.createdAt}</span>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {artifact.shortDescription}
                  </p>

                  <div className="flex justify-between mt-6">
                    <Link
                      to={`/dashboard/update-artifact/${artifact._id}`}
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      <FaEdit className="mr-2" />
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(artifact._id)}
                      className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                    >
                      <FaTrash className="mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCollection;
