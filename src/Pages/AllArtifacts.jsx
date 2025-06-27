import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaHeart, FaHistory, FaGlobeAmericas } from 'react-icons/fa';
import { Link } from 'react-router';
import LoadingSpinner from '../Components/LoadingSpinner';
import { Helmet } from 'react-helmet';

const AllArtifactsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [artifacts, setArtifacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  useEffect(() => {
    const fetchArtifacts = async () => {
      setIsLoading(true);
      try {
        let url = `${import.meta.env.VITE_URL}artifacts`;
        if (debouncedSearchTerm) {
          url = `${import.meta.env.VITE_URL}search-artifacts?q=${encodeURIComponent(debouncedSearchTerm)}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        setArtifacts(data);
      } catch (error) {
        console.error("Error fetching artifacts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtifacts();
  }, [debouncedSearchTerm]);

  const filteredArtifacts = artifacts.filter(artifact => {
    const matchesType = selectedType === 'All' || artifact.type === selectedType;
    return matchesType;
  });

  const artifactTypes = ['All', ...new Set(artifacts.map(artifact => artifact.type))];

  return (
    <div className="min-h-screen md:bg-gradient-to-b md:from-stone-100 md:to-amber-50 px-4 sm:px-6 lg:px-8 pt-10 mt-70 md:mt-30 pb-12">
      <Helmet>
        <title>Artifacta | Explore Artifacts</title>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4 relative inline-block">
            <span className="relative">Explore Historical Artifacts</span>
          </h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Discover artifacts from ancient civilizations and historical periods
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12 p-6 bg-white rounded-xl shadow-md border border-stone-200">
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
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {artifactTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {filteredArtifacts.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArtifacts.map(artifact => (
                  <div key={artifact._id} className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-stone-100">
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={artifact.imageUrl} 
                        alt={artifact.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80';
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
                      
                      <Link to={`/artifact-details/${artifact._id}`}>
                        <button className="w-full cursor-pointer py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium rounded-lg transition-all shadow hover:shadow-md flex items-center justify-center">
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filteredArtifacts.length === 0 && !isLoading && (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center max-w-2xl mx-auto">
                <div className="bg-stone-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaSearch className="text-stone-400 text-3xl" />
                </div>
                <h3 className="text-2xl font-bold text-stone-700 mb-3">No Artifacts Found</h3>
                <p className="text-stone-500 mb-6">
                  Try adjusting your search terms or filters to find what you're looking for
                </p>
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedType('All');
                  }}
                  className="px-6 py-2 bg-stone-200 hover:bg-stone-300 text-stone-700 rounded-lg transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllArtifactsPage;