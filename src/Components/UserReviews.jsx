import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

const ProfessionalReviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const reviews = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Senior Archaeologist",
      company: "National Heritage Institute",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      comment: "This platform has fundamentally transformed our archaeological documentation process. The precision of artifact tracking and the collaborative features have elevated our research capabilities to unprecedented levels.",
      rating: 5,
      highlight: "Transformed our documentation process"
    },
    {
      id: 2,
      name: "Prof. David Chen",
      role: "Museum Director",
      company: "Metropolitan Cultural Center",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      comment: "As someone who has worked in preservation for over two decades, I can confidently say this is the most comprehensive and intuitive system I've encountered. It's become indispensable to our operations.",
      rating: 5,
      highlight: "Most comprehensive system encountered"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Research Coordinator",
      company: "Historical Preservation Society",
      avatar: "https://randomuser.me/api/portraits/women/63.jpg",
      comment: "The community-driven approach and advanced analytics have opened new avenues for historical research. The platform's ability to connect researchers globally is remarkable.",
      rating: 5,
      highlight: "Opened new research avenues"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, reviews.length]);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
    setIsAutoPlaying(false);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    setIsAutoPlaying(false);
  };

  const goToReview = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-stone-100 to-amber-50 relative overflow-hidden mt-6">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-amber-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative ">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-amber-800 mb-4">
            Trusted by Professionals
          </h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
          <p className="text-lg text-stone-700 max-w-2xl mx-auto">
            Discover why leading institutions choose our platform for their most critical projects
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          {/* Main Review Card */}
          <div className="relative h-96 mb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100, rotateY: 90 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -100, rotateY: -90 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <div className="bg-white p-8 h-full rounded-xl shadow-lg border border-amber-200 relative overflow-hidden">
                  {/* Quote Icon */}
                  <div className="absolute top-6 right-6 opacity-10">
                    <Quote size={80} className="text-amber-600" />
                  </div>

                  <div className="relative  h-full flex flex-col justify-between">
                    <div>
                      {/* Highlight Badge */}
                      <div className="inline-block bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-amber-200">
                        "{reviews[currentIndex].highlight}"
                      </div>

                      {/* Review Text */}
                      <blockquote className="text-xl text-stone-700 leading-relaxed mb-8">
                        "{reviews[currentIndex].comment}"
                      </blockquote>
                    </div>

                    {/* Author Info */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="relative">
                          <img
                            src={reviews[currentIndex].avatar}
                            alt={reviews[currentIndex].name}
                            className="w-16 h-16 rounded-full object-cover border-2 border-amber-500"
                          />
                          <div className="absolute -bottom-2 -right-2 bg-amber-500 rounded-full p-1">
                            <Star size={12} className="text-white fill-current" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <h4 className="text-lg font-bold text-stone-800">{reviews[currentIndex].name}</h4>
                          <p className="text-amber-700 font-medium">{reviews[currentIndex].role}</p>
                          <p className="text-stone-500 text-sm">{reviews[currentIndex].company}</p>
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="flex flex-col items-end">
                        <div className="flex mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={20}
                              className="text-amber-500 fill-current"
                            />
                          ))}
                        </div>
                        <span className="text-amber-600 text-sm font-semibold">5.0 out of 5</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center space-x-8 mb-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevReview}
              className="bg-amber-100 border border-amber-300 rounded-full p-3 text-amber-700 hover:bg-amber-200 transition-all duration-300"
            >
              <ChevronLeft size={24} />
            </motion.button>

            {/* Dots Indicator */}
            <div className="flex space-x-3">
              {reviews.map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => goToReview(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-amber-600 shadow-lg shadow-amber-400/50' 
                      : 'bg-amber-300 hover:bg-amber-400'
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextReview}
              className="bg-amber-100 border border-amber-300 rounded-full p-3 text-amber-700 hover:bg-amber-200 transition-all duration-300"
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>

          {/* Progress Bar */}
          <div className="max-w-md mx-auto">
            <div className="bg-amber-200 rounded-full h-1 overflow-hidden">
              <motion.div
                className="bg-amber-600 h-full rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${((currentIndex + 1) / reviews.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Auto-play indicator */}
          <div className="text-center mt-4">
            <motion.button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="text-amber-700 hover:text-amber-800 text-sm transition-colors duration-300"
            >
              {isAutoPlaying ? '⏸️ Pause' : '▶️ Auto-play'} reviews
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalReviews;