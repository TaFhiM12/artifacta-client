import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaHeart, FaHistory, FaGlobeAmericas } from 'react-icons/fa';
import { Link } from 'react-router';
import LoadingSpinner from '../Components/LoadingSpinner';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import useAxiosSecure from '../hooks/useAxiosSecure';

const AllArtifactsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [artifacts, setArtifacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalArtifacts, setTotalArtifacts] = useState(0);
  const axiosSecure = useAxiosSecure();

  // Debounce search term
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setPage(1); 
    }, 500);
    return () => clearTimeout(timerId);
  }, [searchTerm]);

  useEffect(() => {
    const fetchArtifacts = async () => {
      setIsLoading(true);
      try {
        let url = `/artifacts/all?page=${page}&limit=9`;
        let params = { page, limit: 9 };

        if (debouncedSearchTerm) {
          url = `/search-artifacts`;
          params = { ...params, q: debouncedSearchTerm };
        }

        const response = await axiosSecure.get(url, { params });
        const data = response.data;

        if (data.artifacts) {
          setArtifacts(data.artifacts);
          setTotalPages(data.totalPages);
          setTotalArtifacts(data.total);
        } else {
          setArtifacts(data);
          setTotalPages(1);
          setTotalArtifacts(data.length);
        }
      } catch (error) {
        console.error("Error fetching artifacts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtifacts();
  }, [debouncedSearchTerm, page, axiosSecure]);

  useEffect(() => {
    if (artifacts.length === 0 && page > 1) {
      setPage(page - 1);
    }
  }, [artifacts, page]);

  const filteredArtifacts = artifacts.filter(
    (artifact) => selectedType === 'All' || artifact.type === selectedType
  );

  const artifactTypes = ['All', ...new Set(artifacts.map(a => a.type))];

  const getPaginationButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 5;

    if (totalPages <= maxVisibleButtons) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(i);
      }
    } else {
      buttons.push(1);

      if (page > 3) {
        buttons.push('...');
      }
      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);

      for (let i = start; i <= end; i++) {
        if (i > 1 && i < totalPages) {
          buttons.push(i);
        }
      }

      if (page < totalPages - 2) {
        buttons.push('...');
      }

      buttons.push(totalPages);
    }

    return buttons;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-100 to-amber-50 px-4 sm:px-6 lg:px-8 py-12 mt-70 md:mt-30">
      <Helmet>
        <title>Artifacta | Explore Artifacts</title>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-amber-900 mb-4"
          >
            Explore Historical Artifacts
          </motion.h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Discover {totalArtifacts} artifacts from ancient civilizations and historical periods
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12 p-6 bg-white rounded-xl shadow-md border border-stone-200"
        >
          <div className="relative w-full md:w-2/3">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaSearch className="text-amber-500 text-lg" />
            </div>
            <input
              type="text"
              placeholder="Search artifacts by name, period, or description..."
              className="pl-12 pr-4 py-3 w-full border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-sm text-stone-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="bg-amber-100 p-2 rounded-lg">
              <FaFilter className="text-amber-600" />
            </div>
            <select
              className="border border-stone-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 shadow-sm text-stone-700 w-full"
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value);
                setPage(1); 
              }}
            >
              {artifactTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </motion.div>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {filteredArtifacts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredArtifacts.map((artifact) => (
                    <motion.div 
                      key={artifact._id} 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -5 }}
                      className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-stone-100"
                    >
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={artifact.imageUrl}
                          alt={artifact.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=500&q=80';
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
                            <span>{artifact.likedBy?.length || 0}</span>
                          </div>
                        </div>
                        <p className="text-stone-600 mb-4 line-clamp-2">{artifact.shortDescription}</p>
                        <div className="space-y-3 text-sm text-stone-600 mb-6">
                          <div className="flex items-center">
                            <FaHistory className="text-amber-500 mr-3" />
                            <span>{artifact.createdAt}</span>
                          </div>
                          <div className="flex items-center">
                            <FaGlobeAmericas className="text-amber-500 mr-3" />
                            <span className="truncate">{artifact.presentLocation}</span>
                          </div>
                        </div>
                        <Link to={`/dashboard/artifact-details/${artifact._id}`}>
                          <button className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-lg transition-all shadow hover:shadow-md hover:from-amber-600 hover:to-amber-700">
                            View Details
                          </button>
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex justify-center mt-12 space-x-2">
                    <button
                      onClick={() => setPage((p) => Math.max(p - 1, 1))}
                      disabled={page === 1}
                      className="px-4 py-2 bg-stone-200 rounded-lg hover:bg-stone-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Previous
                    </button>

                    {getPaginationButtons().map((button, index) => (
                      button === '...' ? (
                        <span key={index} className="px-4 py-2">...</span>
                      ) : (
                        <button
                          key={index}
                          onClick={() => setPage(button)}
                          className={`px-4 py-2 rounded-lg ${page === button ? 'bg-amber-600 text-white' : 'bg-stone-200 hover:bg-stone-300'} transition-colors`}
                        >
                          {button}
                        </button>
                      )
                    ))}

                    <button
                      onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                      disabled={page === totalPages}
                      className="px-4 py-2 bg-stone-200 rounded-lg hover:bg-stone-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-xl shadow-lg p-12 text-center"
              >
                <h3 className="text-2xl font-bold text-stone-700 mb-4">No Artifacts Found</h3>
                <p className="text-stone-500 mb-6">Try adjusting your search or filters.</p>
                <button
                  onClick={() => { 
                    setSearchTerm(''); 
                    setSelectedType('All');
                    setPage(1);
                  }}
                  className="px-6 py-3 bg-stone-200 hover:bg-stone-300 text-stone-700 rounded-lg transition-colors"
                >
                  Reset Filters
                </button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllArtifactsPage;