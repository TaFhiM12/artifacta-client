import React, { useState, use, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { FaHeart, FaMapMarkerAlt, FaClock, FaArrowLeft } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "./../Contexts/AuthContext";
import { Helmet } from "react-helmet";
import { Heart } from "lucide-react";
import useAxiosSecure from "../hooks/useAxiosSecure";

const ArtifactDetail = () => {
  const navigate = useNavigate();
  const { user } = use(AuthContext);
  const initialData = useLoaderData();
  const [artifact, setArtifact] = useState(initialData);

  const { _id, likedBy, likeCount, addedBy } = artifact;
  const [isLiked, setIsLiked] = useState(likedBy?.includes(false));
  const [count, setCount] = useState(likeCount);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    setIsLiked(likedBy?.includes(user?.email));
  }, [likedBy, user]);

  const handleLike = () => {
    if (user?.email === addedBy?.email) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "You cannot like your own artifact.",
      });
      return;
    }

    axiosSecure
      .patch(`/like/${_id}`, { email: user?.email })
      .then((data) => {
        setIsLiked(data.data.liked);
        setCount((prevCount) =>
          data.data.liked ? prevCount + 1 : prevCount - 1
        );
      })
      .catch((error) => {
        console.error("Error liking artifact:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to like the artifact.",
        });
      });
  };

  if (!artifact) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center mt-64">
        <div className="text-center">
          <h2 className="text-xl font-medium text-amber-600">
            Artifact not found
          </h2>
          <button
            onClick={() => navigate("/artifacts")}
            className="mt-4 px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600"
          >
            Back to Artifacts
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Artifacta | {artifact.name || "artifact details"}</title>
      </Helmet>
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-amber-600 hover:text-amber-800 mb-8"
        >
          <FaArrowLeft className="mr-2" />
          Back to Artifacts
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Artifact Image */}
          <div className="relative h-64 sm:h-80 lg:h-96">
            <img
              src={artifact.imageUrl}
              alt={artifact.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/800x500?text=Artifact+Image";
              }}
            />
          </div>

          {/* Artifact Content */}
          <div className="p-6 sm:p-8">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-amber-900">
                {artifact.name}
              </h1>
              <span className="bg-amber-100 text-amber-800 text-sm px-3 py-1 rounded-full">
                {artifact.type}
              </span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center bg-gradient-to-r from-amber-100 to-amber-50 px-3 py-1.5 rounded-lg border border-amber-200">
                <Heart className="w-5 h-5 text-amber-600 mr-2" />
                <span className="font-medium text-amber-800">{count || 0}</span>
              </div>

              <button
                onClick={handleLike}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer ${
                  isLiked
                    ? "bg-amber-600 text-white hover:bg-amber-700 shadow-sm"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                {isLiked ? (
                  <>
                    <Heart className="w-5 h-5 fill-current" />
                    <span>Liked</span>
                  </>
                ) : (
                  <>
                    <Heart className="w-5 h-5" />
                    <span>Like</span>
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-amber-50 p-4 rounded-lg">
                <h3 className="flex items-center text-amber-700 mb-2">
                  <FaClock className="mr-2" />
                  <span className="font-medium">Creation Period</span>
                </h3>
                <p>{artifact.createdAt}</p>
              </div>

              <div className="bg-amber-50 p-4 rounded-lg">
                <h3 className="flex items-center text-amber-700 mb-2">
                  <FaMapMarkerAlt className="mr-2" />
                  <span className="font-medium">Current Location</span>
                </h3>
                <p>{artifact.presentLocation}</p>
              </div>
            </div>

            {/* Historical Context */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-amber-800 mb-3">
                Historical Context
              </h2>
              <p className="text-gray-700 whitespace-pre-line">
                {artifact.historicalContext}
              </p>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-amber-800 mb-3">
                Description
              </h2>
              <p className="text-gray-700 whitespace-pre-line">
                {artifact.shortDescription}
              </p>
            </div>

            {/* Discovery Info */}
            {artifact.discoveredBy && (
              <div className="bg-amber-50 p-4 rounded-lg">
                <h3 className="font-medium text-amber-700 mb-2">
                  Discovery Information
                </h3>
                <p>
                  <span className="font-medium">Discovered by:</span>{" "}
                  {artifact.discoveredBy}
                </p>
                {artifact.discoveredAt && (
                  <p>
                    <span className="font-medium">Discovery date:</span>{" "}
                    {artifact.discoveredAt}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtifactDetail;
