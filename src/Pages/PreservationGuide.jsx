import { motion } from "framer-motion";
import { FaHistory, FaShieldAlt, FaTemperatureLow, FaLightbulb, FaLock, FaBookDead, FaEye, FaScroll } from "react-icons/fa";
import ArtifactModelViewer from "../Components/ArtifactModelViewer";
import ArtifactQuiz from "../Components/ArtifactQuiz";
import { Link } from "react-router";
import { Helmet } from "react-helmet";

const PreservationGuide = () => {
  const preservationPrinciples = [
    {
      icon: <FaHistory className="text-amber-700 text-3xl" />,
      title: "Handling Protocols",
      description: "Always wear cotton gloves. Oils from skin accelerate decay in metals, textiles, and organic materials.",
      tip: "Use padded trays for transport."
    },
    {
      icon: <FaTemperatureLow className="text-amber-700 text-3xl" />,
      title: "Climate Control",
      description: "Ideal conditions: 18-22°C & 45-55% humidity. Fluctuations cause cracking, warping, and mold.",
      tip: "Silica gel packs help regulate moisture."
    },
    {
      icon: <FaLightbulb className="text-amber-700 text-3xl" />,
      title: "Light Exposure",
      description: "UV rays fade pigments and weaken materials. Use LED lights with <50 lux for sensitive artifacts.",
      tip: "Rotate displayed items every 3 months."
    },
    {
      icon: <FaShieldAlt className="text-amber-700 text-3xl" />,
      title: "Material-Specific Care",
      description: "Metals need argon gas, ceramics require soft brushes, and parchment demands deacidification sprays.",
      tip: "Never use water on ivory or wood."
    }
  ];

 return (
    <motion.section 
      className="py-16 bg-[#FEF3C7] relative overflow-hidden mt-70 md:mt-30"
      style={{
        backgroundImage: "linear-gradient(to bottom, #FEF3C7, #FDE68A)",
      }}
    >
      <Helmet>
        <title>Artifacta | Preservation Guide</title>
      </Helmet>
      {/* Ancient Paper Texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/old-paper.png')] opacity-15"></div>
      
      <div className="container mx-auto px-4 relative">
        {/* Header with Hieroglyphic Decoration */}
        <div className="text-center mb-12 relative">
          <div className="absolute left-0 right-0 top-2 flex justify-center">
            <span className="text-4xl">𓃭𓃮𓃯</span>
          </div>
          <motion.h2 
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="text-3xl md:text-4xl font-bold text-amber-800 mb-4 font-serif"
          >
            The <span className="italic">Artifact Conservation</span> Lab
          </motion.h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
          <p className="text-sm md:text-lg text-amber-900 max-w-2xl mx-auto">
            Explore, learn, and test your knowledge of artifact preservation.
          </p>
        </div>

        {/* 3D Viewer + Quiz Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white p-4 rounded-lg shadow-lg border-2 border-amber-200">
              <h3 className="text-xl font-bold text-amber-800 mb-4 flex items-center">
                <FaEye className="mr-2" /> Interactive Artifact Inspection
              </h3>
              <ArtifactModelViewer modelPath="/models/rosetta_stone.glb" />
              <div className="mt-4 text-sm text-amber-700">
                <p>🔍 Rotate with mouse | Scroll to zoom</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <ArtifactQuiz />
          </motion.div>
        </div>

        {/* Principles Carousel (Now Horizontal Scroll) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-amber-800 mb-6 flex items-center">
            <FaScroll className="mr-2" /> Conservation Principles
          </h3>
          <div className="flex overflow-x-auto pb-4 space-x-4 scrollbar-hide">
            {preservationPrinciples.map((principle, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="flex-shrink-0 w-72 bg-white p-6 rounded-lg shadow-md border-l-4 border-amber-600"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-amber-100 rounded-full mr-4">
                    {principle.icon}
                  </div>
                  <h4 className="text-lg font-bold text-amber-800">{principle.title}</h4>
                </div>
                <p className="text-gray-700 mb-3">{principle.description}</p>
                <div className="px-3 py-1 bg-amber-50 rounded text-sm text-amber-800 border border-amber-200">
                  📜 {principle.tip}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call-to-Action with Ancient Seal */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-8"
        >
          <div className="inline-block relative">
            <button className="relative px-8 py-4 bg-gradient-to-r from-amber-700 to-amber-900 text-white rounded-lg shadow-xl hover:shadow-2xl transition-all group overflow-hidden">
              <Link to='/accessManual'>
              
              <span className="relative  flex items-center justify-center gap-2 text-lg">
                <FaBookDead className="text-amber-200" />
                <span>Access Full Conservation Manual</span>
              </span>
              </Link>
              <motion.span
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                className="absolute inset-0 bg-black opacity-10"
              />
            </button>
            <div className="absolute -bottom-2 -right-2 bg-amber-800 text-white p-2 rounded-full">
              <FaLock className="text-xs" />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default PreservationGuide;