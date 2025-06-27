import { useState, useEffect, use } from "react";
import { useParams } from "react-router";
import { motion } from "framer-motion";
import {
  FaHeart,
  FaRegHeart,
  FaMapMarkerAlt,
  FaHistory,
} from "react-icons/fa";
import LoadingSpinner from "../Components/LoadingSpinner";
import { Helmet } from "react-helmet";
import { AuthContext} from "../Contexts/AuthContext"; 
import useAxiosSecure from "../hooks/useAxiosSecure";

const MyLikedPage = () => {
  const { user } = use(AuthContext);
  const { email } = useParams();
  const [likedArtifacts, setLikedArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchLikedArtifacts = async () => {
      setLoading(true);
      try {
        if(user?.email) {
           const response = await axiosSecure.get(
          `/artifacts/likedBy/${user?.email}`
        );
        setLikedArtifacts(response.data);
        setError(null);
        }
      } catch (error) {
        console.error("Error fetching liked artifacts:", error);
        
        const errorMessage = error.response
          ? error.response.data.message || "Failed to fetch liked artifacts"
          : error.message || "Network error occurred";
          
        setError(`Failed to load your liked artifacts. ${errorMessage}`);
        setLikedArtifacts([]);
      } finally {
        setLoading(false);
      }
    };

    if (email && user?.accessToken) {
      fetchLikedArtifacts();
    }
  }, [email , user, axiosSecure]);

  if (loading) return <LoadingSpinner />;
  
  if (error) {
    return (
      <div className="text-center mt-20 text-red-500 font-medium">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen md:bg-gradient-to-b md:from-stone-100 md:to-amber-50 px-4 py-8 mt-70 md:mt-30">
      <Helmet>
        <title>Artifacta | My Liked Artifacts</title>
      </Helmet>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4 relative inline-block">
            <span className="relative">My Liked Artifacts</span>
          </h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Your collection of favorite historical treasures
          </p>
        </motion.div>

        {likedArtifacts.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center max-w-2xl mx-auto">
            <div className="bg-stone-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaRegHeart className="text-stone-400 text-3xl" />
            </div>
            <h3 className="text-2xl font-bold text-stone-700 mb-3">
              No Liked Artifacts Yet
            </h3>
            <p className="text-stone-500 mb-6">
              You haven't liked any artifacts yet. Start exploring and heart the
              ones you love!
            </p>
            <a
              href="/all-artifacts"
              className="inline-block px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all shadow-md"
            >
              Explore Artifacts
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {likedArtifacts.map((artifact) => (
              <motion.div
                key={artifact._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
                className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-stone-100"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={artifact.imageUrl}
                    alt={artifact.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <h3 className="text-white text-xl font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {artifact.name}
                    </h3>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full">
                    <FaHeart className="text-red-500 text-xl" />
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                      {artifact.type}
                    </span>
                    <div className="flex items-center text-amber-600">
                      <FaHeart className="mr-1" />
                      <span>{artifact.likedBy?.length || 0}</span>
                    </div>
                  </div>

                  <p className="text-stone-600 mb-4 line-clamp-2">
                    {artifact.shortDescription}
                  </p>

                  <div className="space-y-3 text-sm text-stone-600 mb-6">
                    <div className="flex items-center">
                      <FaHistory className="text-amber-500 mr-3" />
                      <span>{artifact.createdAt}</span>
                    </div>

                    <div className="flex items-center">
                      <FaMapMarkerAlt className="text-amber-500 mr-3" />
                      <span className="truncate">
                        {artifact.presentLocation}
                      </span>
                    </div>
                  </div>

                  <a
                    href={`/artifact-details/${artifact._id}`}
                    className="block cursor-pointer w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium rounded-lg transition-all shadow hover:shadow-md text-center"
                  >
                    View Details
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLikedPage;
