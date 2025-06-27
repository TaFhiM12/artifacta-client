import React from "react";
import { motion } from "framer-motion";
import { BsCollection } from "react-icons/bs";
import { 
  FaYoutube, 
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaTwitter,
  FaUniversity,
  FaScroll,
  FaMonument,
  FaRing,
  FaHammer,
  FaLandmark,
  FaBookDead,
  FaHistory,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaClock
} from "react-icons/fa";
import { VscGithub } from "react-icons/vsc";
import { Link } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";

const Footer = () => {
  const { user } = useContext(AuthContext);
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <FaFacebook className="w-5 h-5" />, url: "https://www.facebook.com/", name: "Facebook" },
    { icon: <FaYoutube className="w-5 h-5" />, url: "https://www.youtube.com/", name: "YouTube" },
    { icon: <FaInstagram className="w-5 h-5" />, url: "https://www.instagram.com/", name: "Instagram" },
    { icon: <FaTwitter className="w-5 h-5" />, url: "https://x.com/", name: "Twitter" },
    { icon: <VscGithub className="w-5 h-5" />, url: "https://github.com/", name: "GitHub" }
  ];

  const artifactCategories = [
    { icon: <FaPhone  className="w-4 h-4" />, name: "Antiquities", path: "/allArtifacts" },
    { icon: <FaScroll className="w-4 h-4" />, name: "Manuscripts", path: "/allArtifacts" },
    { icon: <FaMonument className="w-4 h-4" />, name: "Monuments", path: "/allArtifacts" },
    { icon: <FaRing className="w-4 h-4" />, name: "Jewelry", path: "/allArtifacts" },
    { icon: <FaHammer className="w-4 h-4" />, name: "Tools", path: "/allArtifacts" },
    { icon: <FaLandmark className="w-4 h-4" />, name: "Sculptures", path: "/allArtifacts" },
    { icon: <FaBookDead className="w-4 h-4" />, name: "Codices", path: "/allArtifacts" },
    { icon: <FaHistory className="w-4 h-4" />, name: "Relics", path: "/allArtifacts" }
  ];

  const museumPartners = [
    { name: "British Museum", url: "#" },
    { name: "Louvre", url: "#" },
    { name: "Metropolitan", url: "#" },
    { name: "Cairo Museum", url: "#" }
  ];

  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-b from-amber-50 to-amber-100 pt-16 pb-8 px-4 sm:px-6 lg:px-8 border-t border-amber-200 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/papyrus.png')] opacity-10 pointer-events-none"></div>
      
      {/* Hieroglyphic border decoration */}
      <div className="absolute  top-0 left-0 right-0 h-6 bg-amber-700 flex justify-center overflow-hidden">
        <span className="text-white text-xs tracking-widest">𓃀 𓃁 𓃂 𓃃 𓃄 𓃅 𓃆 𓃇 𓃈 𓃉</span>
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column - Ancient Seal Design */}
          <div className="space-y-6">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3"
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-amber-700 flex items-center justify-center text-white text-xl">
                  {/* <FaPhone  /> */}
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-amber-600 border-2 border-white"></div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-amber-900 font-serif">ARTIFACTA</h2>
                <p className="text-xs text-amber-700 tracking-wider">CURATING HISTORICAL WONDERS</p>
              </div>
            </motion.div>
            
            <p className="text-sm text-amber-800 italic">
              "Preserving humanity's legacy through digital conservation since {currentYear - 3}"
            </p>
            
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="tooltip"
                  data-tip={link.name}
                >
                  <div className="p-2 bg-white rounded-full shadow-sm border border-amber-200 hover:bg-amber-200 transition-all text-amber-700">
                    {link.icon}
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links - Museum Style */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-800 mb-6 pb-2 border-b border-amber-200 flex items-center">
              <FaHistory className="mr-2 text-amber-600" />
              NAVIGATE
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "Artifact Gallery", path: "/allArtifacts" },
                { name: "Contribute", path: "/addArtifacts" },
                { name: "ArchaeoBot", path: "/assistant" },
                !user && { name: "Scholar Login", path: "/login" }
              ].filter(Boolean).map((item, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                >
                  <Link 
                    to={item.path}
                    className="text-sm text-amber-800 hover:text-amber-600 transition flex items-center group"
                  >
                    <span className="w-2 h-2 bg-amber-600 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition"></span>
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Artifact Categories - Interactive Grid */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-800 mb-6 pb-2 border-b border-amber-200 flex items-center">
              <BsCollection  className="mr-2 text-amber-600" />
              COLLECTIONS
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {artifactCategories.map((category, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ scale: 1.03 }}
                  className="relative"
                >
                  <Link 
                    to={category.path}
                    className="text-sm text-amber-800 hover:text-amber-600 transition flex items-center group"
                  >
                    <span className="mr-2 text-amber-600 group-hover:text-amber-800 transition">
                      {category.icon}
                    </span>
                    {category.name}
                    <span className="absolute -bottom-0.5 left-0 h-0.5 bg-amber-600 w-0 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact - Museum Card Style */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-800 mb-6 pb-2 border-b border-amber-200 flex items-center">
              <FaMapMarkerAlt className="mr-2 text-amber-600" />
              CURATORIAL OFFICE
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-amber-100 rounded-full mt-0.5">
                  <FaMapMarkerAlt className="text-amber-700" />
                </div>
                <p className="text-sm text-amber-800">
                  National Museum Bangladesh<br />
                  Shahbag, Dhaka 1000
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 bg-amber-100 rounded-full mt-0.5">
                  <FaEnvelope className="text-amber-700" />
                </div>
                <p className="text-sm text-amber-800">
                  <a href="mailto:curator@artifacta.org" className="hover:underline">curator@artifacta.org</a>
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 bg-amber-100 rounded-full mt-0.5">
                  <FaClock className="text-amber-700" />
                </div>
                <p className="text-sm text-amber-800">
                  Tue-Sun: 9AM–5PM<br />
                  Closed Mondays
                </p>
              </div>
            </div>

            <h4 className="text-xs font-semibold uppercase mt-6 mb-3 text-amber-700">ACCREDITED BY:</h4>
            <div className="flex flex-wrap gap-2">
              {museumPartners.map((museum, index) => (
                <motion.a
                  key={index}
                  href={museum.url}
                  whileHover={{ y: -2 }}
                  className="px-3 py-1 bg-white text-xs rounded-full border border-amber-200 text-amber-800 hover:bg-amber-50"
                >
                  {museum.name}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Footer - Ancient Seal */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-16 pt-8 border-t border-amber-200 flex flex-col md:flex-row justify-between items-center"
        >
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="w-8 h-8 rounded-full bg-amber-700 flex items-center justify-center text-white text-xs">
              AS
            </div>
            <p className="text-xs text-amber-700">
              © {currentYear} Artifacta Scholarly Archives
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/privacy" className="text-xs text-amber-700 hover:text-amber-900 transition hover:underline">
              Conservation Ethics
            </Link>
            <Link to="/terms" className="text-xs text-amber-700 hover:text-amber-900 transition hover:underline">
              Digital Stewardship
            </Link>
            <Link to="/donate" className="text-xs text-amber-700 hover:text-amber-900 transition hover:underline">
              Support Our Mission
            </Link>
            <Link to="/contact" className="text-xs text-amber-700 hover:text-amber-900 transition hover:underline">
              Become a Patron
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;