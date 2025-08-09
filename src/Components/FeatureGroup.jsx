import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import LoadingSpinner from "./LoadingSpinner";
import {
  FaHeart,
  FaSearch,
  FaHistory,
  FaPlus,
  FaGlobeAmericas,
} from "react-icons/fa";
import { motion } from "framer-motion";

const FeatureGroup = () => {
  const [featuredArtifacts, setFeaturedArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtifacts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_URL}artifacts`
        );
        setFeaturedArtifacts(response.data);
      } catch (error) {
        console.error("Error fetching featured artifacts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtifacts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Sort by likes and take top 6
  const topArtifacts = [...featuredArtifacts]
    .sort((a, b) => (b.likeCount || 0) - (a.likeCount || 0))
    .slice(0, 6);

  return (
    <section className="max-w-7xl md:bg-gradient-to-b md:from-stone-100 md:to-amber-50 mx-auto sm:px-6 lg:px-8 py-16 md:py-20 my-6 mt-20">
      <div className="text-center mb-16">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-4 font-serif"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-4xl md:text-5xl font-bold text-amber-900 mb-4 relative inline-block">
            Curated Artifacts
          </span>
        </motion.h2>
        <motion.p
          className="text-lg text-stone-600 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Discover the most remarkable historical objects from our collection
        </motion.p>
      </div>

      {topArtifacts.length === 0 ? (
        <div className="text-center py-16 bg-stone-800/50 rounded-xl border border-stone-700">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <FaHistory className="mx-auto text-4xl text-amber-500 mb-4" />
            <h3 className="text-xl font-medium text-amber-400 mb-2">
              No Featured Artifacts Yet
            </h3>
            <p className="text-stone-300 max-w-md mx-auto">
              The most appreciated artifacts will appear here. Be the first to
              contribute!
            </p>
            <Link to="/add-artifact" className="mt-6 inline-block">
              <button className="flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors">
                <FaPlus /> Add an Artifact
              </button>
            </Link>
          </motion.div>
        </div>
      ) : (
        <>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {topArtifacts.map((artifact) => (
              <div
                key={artifact._id}
                className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-stone-100"
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
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                      {artifact.type}
                    </span>
                    <div className="flex items-center text-amber-600">
                      <FaHeart className="mr-1" />
                      <span>{artifact.likedBy.length || 0}</span>
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
                      <FaGlobeAmericas className="text-amber-500 mr-3" />
                      <span className="truncate">
                        {artifact.presentLocation}
                      </span>
                    </div>
                  </div>

                  <Link to={`/dashboard/artifact-details/${artifact._id}`}>
                    <button className="w-full cursor-pointer py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium rounded-lg transition-all shadow hover:shadow-md flex items-center justify-center">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </motion.div>

          {/* View All Button */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link to="/allArtifacts">
              <button className="group cursor-pointer relative inline-flex items-center px-8 py-3 bg-amber-600 hover:bg-amber-700 border border-amber-600 text-white rounded-lg overflow-hidden transition-all">
                <span className="relative z-10 flex items-center gap-2">
                  <FaSearch className="transition-transform group-hover:rotate-12" />
                  Browse Full Collection
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </Link>
          </motion.div>
        </>
      )}
    </section>
  );
};

export default FeatureGroup;
