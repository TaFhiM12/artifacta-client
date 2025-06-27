import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import {
  FaSearch,
  FaPlus,
  FaArrowRight,
  FaArrowLeft,
  FaHistory,
} from "react-icons/fa";
import { Link } from "react-router";

const artifacts = [
  {
    image: "https://i.ibb.co/gcr2HVb/banner1.jpg",
    title: "Ancient Relics Unveiled",
    subtitle: "Discover artifacts from lost civilizations",
    era: "3000 BCE - 500 CE",
    color: "from-amber-800/90 to-amber-600/90",
    accent: "Egyptian • Roman • Mayan",
  },
  {
    image: "https://i.ibb.co/Y7yCCTmH/banner2.jpg",
    title: "Medieval Treasures",
    subtitle: "Explore artifacts from the Middle Ages",
    era: "500 CE - 1500 CE",
    color: "from-stone-800/90 to-stone-600/90",
    accent: "Gothic • Byzantine • Viking",
  },
  {
    image: "https://i.ibb.co/6R6Y4YnN/banner3.jpg",
    title: "Renaissance Masterpieces",
    subtitle: "Witness the rebirth of art and culture",
    era: "1400 CE - 1600 CE",
    color: "from-emerald-800/90 to-emerald-600/90",
    accent: "Italian • Dutch • Flemish",
  },
  {
    image: "https://i.ibb.co/0jn70D5J/banner4.jpg",
    title: "Modern Archaeological Finds",
    subtitle: "See recent discoveries reshaping history",
    era: "1800 CE - Present",
    color: "from-slate-800/90 to-slate-600/90",
    accent: "Industrial • Colonial • Contemporary",
  },
];

const ArtifactSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef(null);
  const autoplayRef = useRef(null);

  // Parallax effect values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, []);

  const startAutoplay = () => {
    autoplayRef.current = setInterval(() => {
      if (!isAnimating) {
        handleNext();
      }
    }, 7000);
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
  };

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % artifacts.length);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + artifacts.length) % artifacts.length);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const handleSlideClick = (index) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  return (
    <section
      ref={containerRef}
      className="relative h-[85vh] overflow-hidden bg-stone-900 mt-70 md:mt-30"
      onMouseMove={handleMouseMove}
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
    >
      {/* Background Images with Parallax */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="absolute inset-0"
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
          >
            <img
              src={artifacts[currentSlide].image}
              alt=""
              className="w-full h-full object-cover"
            />
            <div
              className={`absolute inset-0 bg-gradient-to-br ${artifacts[currentSlide].color} opacity-70`}
            />
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Ancient Paper Texture Overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/old-paper.png')] opacity-10 mix-blend-overlay pointer-events-none" />

      {/* Main Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-8 max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Era Badge */}
              <motion.div
                className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <FaHistory className="text-amber-400" />
                <span className="text-sm font-medium text-white">
                  {artifacts[currentSlide].era}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-4 leading-tight"
                initial={{ letterSpacing: "0.2em", opacity: 0 }}
                animate={{ letterSpacing: "0.05em", opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                {artifacts[currentSlide].title}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className="text-xl md:text-2xl text-amber-100 mb-8 max-w-3xl mx-auto font-light italic"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                {artifacts[currentSlide].subtitle}
              </motion.p>

              {/* Accent Text */}
              <motion.p
                className="text-sm uppercase tracking-widest text-amber-300 mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                {artifacts[currentSlide].accent}
              </motion.p>

              {/* Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <motion.button
                  className="group relative px-8 py-3 bg-amber-700 hover:bg-amber-600 text-white rounded-lg font-medium overflow-hidden transition-all duration-300 flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to='/allArtifacts' className="flex items-center justify-center gap-2">
                    <FaSearch className="transition-transform group-hover:rotate-12" />
                    <span>Explore Artifacts</span>
                    <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" /> 
                  </Link>
                </motion.button>

                <motion.button
                  className="group px-8 py-3 bg-transparent border border-amber-600 text-amber-100 hover:bg-amber-900/30 rounded-lg font-medium transition-all duration-300 flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaPlus />
                  <span>Contribute Finding</span>
                  <FaArrowRight className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </motion.button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide Navigation - Museum Label Style */}
      <div className="absolute bottom-8 left-0 right-0 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-black/30 backdrop-blur-sm p-4 rounded-xl border border-white/10">
            <div className="text-left">
              <h3 className="text-white font-serif text-lg">
                {artifacts[currentSlide].title}
              </h3>
              <p className="text-amber-200 text-sm">
                {artifacts[currentSlide].era}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                onClick={handlePrev}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaArrowLeft />
              </motion.button>

              <div className="flex gap-1 mx-2">
                {artifacts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleSlideClick(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentSlide
                        ? "bg-amber-400 w-6"
                        : "bg-white/40"
                    }`}
                  />
                ))}
              </div>

              <motion.button
                onClick={handleNext}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaArrowRight />
              </motion.button>
            </div>

            <div className="text-right hidden sm:block">
              <p className="text-white/80 text-sm">
                <span className="text-amber-300 font-medium">
                  {currentSlide + 1}
                </span>
                <span className="mx-1">/</span>
                <span>{artifacts.length}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Indicator - Aged Scroll Style */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/10">
        <motion.div
          className="h-full bg-gradient-to-r from-amber-600 to-amber-400"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 7, ease: "linear" }}
          key={currentSlide}
        />
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Dust Particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Crack Lines */}
        <div className="absolute inset-0 opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path
              d="M10,10 Q30,5 50,20 T90,10"
              stroke="white"
              strokeWidth="0.5"
              fill="none"
              strokeDasharray="1,2"
            />
            <path
              d="M20,80 Q40,70 60,90 T80,70"
              stroke="white"
              strokeWidth="0.5"
              fill="none"
              strokeDasharray="1,2"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default ArtifactSlider;
