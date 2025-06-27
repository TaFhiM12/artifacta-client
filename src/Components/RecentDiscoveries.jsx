import axios from 'axios';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

const RecentDiscoveries = () => {
  const [recentArtifacts, setRecentArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_URL}artifacts/recent`)
      .then(res => {
        setRecentArtifacts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching recent discoveries:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="py-16 bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            Recently Discovered
          </h2>
          <p className="mt-4 text-lg text-amber-700 max-w-2xl mx-auto">
            Explore the latest additions to our historical collection
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        ) : recentArtifacts.length > 0 ? (
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden lg:block absolute left-1/2 h-full w-1 bg-amber-200 transform -translate-x-1/2"></div>
            
            <div className="space-y-8 lg:space-y-0">
              {recentArtifacts.map((artifact, index) => (
                <motion.div
                  key={artifact._id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className={`relative lg:flex ${index % 2 === 0 ? 'lg:justify-start' : 'lg:justify-end'}`}
                >
                  <div className={`lg:w-1/2 p-6 ${index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8'}`}>
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                      <div className="md:flex">
                        <div className="md:flex-shrink-0">
                          <img
                            className="h-48 w-full md:w-48 object-cover"
                            src={artifact.imageUrl}
                            alt={artifact.name}
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/300x200?text=Artifact+Image';
                            }}
                          />
                        </div>
                        <div className="p-6">
                          <div className="flex items-center">
                            <FaCalendarAlt className="text-amber-500 mr-2" />
                            <span className="text-sm text-amber-600">
                              Added: {new Date(artifact.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <h3 className="mt-2 text-xl font-semibold text-amber-900">{artifact.name}</h3>
                          <div className="mt-2 flex items-center">
                            <FaMapMarkerAlt className="text-amber-500 mr-2" />
                            <span className="text-sm text-gray-600">{artifact.presentLocation}</span>
                          </div>
                          <p className="mt-3 text-gray-600 line-clamp-2">{artifact.shortDescription}</p>
                          <div className="mt-4">
                            <Link
                              to={`/artifact-details/${artifact._id}`}
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700"
                            >
                              View Discovery
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-amber-500">No recent discoveries found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentDiscoveries;