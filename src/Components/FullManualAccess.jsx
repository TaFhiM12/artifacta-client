import { motion } from "framer-motion";
import {
  FaBook,
  FaLock,
  FaLockOpen,
  FaCheck,
  FaScroll,
  FaArrowRight,
} from "react-icons/fa";

const FullManualAccess = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className=" p-8 bg-[#FDE68A] rounded-xl border-2 border-amber-300 relative overflow-hidden mt-64 md:mt-30"
      style={{
        backgroundImage: "linear-gradient(to bottom right, #FDE68A, #FCD34D)",
        boxShadow: "0 10px 25px -5px rgba(251, 191, 36, 0.3)",
      }}
    >
      {/* Ancient paper texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/rice-paper.png')] opacity-20"></div>

      {/* Wax seal decoration */}
      <div className="absolute right-6 top-6 rotate-12">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <circle
            cx="30"
            cy="30"
            r="28"
            fill="#B45309"
            stroke="#92400E"
            strokeWidth="2"
          />
          <path
            d="M20 20 Q30 10 40 20 T60 30 T40 40 T20 30 T20 20"
            fill="#D97706"
          />
          <text
            x="30"
            y="35"
            textAnchor="middle"
            fill="white"
            fontFamily="serif"
            fontSize="10"
          >
            ARTIFACTA
          </text>
        </svg>
      </div>

      <div className="relative">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Ancient scroll illustration */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="hidden md:block flex-shrink-0"
          >
            <div className="w-32 h-40 bg-amber-100 rounded-lg border-2 border-amber-300 flex items-center justify-center shadow-inner">
              <FaScroll className="text-amber-700 text-4xl" />
            </div>
          </motion.div>

          {/* Content */}
          <div>
            <h3 className="text-2xl font-bold text-amber-900 mb-2 font-serif">
              <FaBook className="inline mr-2" />
              The Complete Artifact Conservation Manual
            </h3>
            <p className="text-amber-800 mb-6 max-w-2xl">
              Unlock <span className="font-semibold">200+ pages</span> of
              professional preservation techniques, material-specific care
              guides, and case studies from world museums.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-amber-200 rounded-full mt-1">
                  <FaCheck className="text-amber-800 text-sm" />
                </div>
                <p className="text-amber-900">
                  <span className="font-semibold">Digital + PDF versions</span>{" "}
                  with interactive 3D models
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-amber-200 rounded-full mt-1">
                  <FaCheck className="text-amber-800 text-sm" />
                </div>
                <p className="text-amber-900">
                  <span className="font-semibold">Expert interviews</span> from
                  the British Museum and MET
                </p>
              </div>
            </div>

            {/* Access Button with Hover Effect */}
            <motion.button
              whileHover={{
                scale: 1.02,
                boxShadow: "0 5px 15px rgba(180, 83, 9, 0.4)",
              }}
              whileTap={{ scale: 0.98 }}
              className="mt-8 px-8 py-4 bg-gradient-to-r from-amber-700 to-amber-800 text-white rounded-lg font-bold flex items-center gap-3 group"
            >
              <span className="relative">
                <FaLockOpen className="absolute -left-5 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                <FaLock className="group-hover:opacity-0 transition-all duration-300" />
              </span>
              <span>Access Full Conservation Manual</span>
              <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-amber-400 rounded-tr-full"></div>
      <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-amber-400 rounded-bl-full"></div>
    </motion.div>
  );
};

export default FullManualAccess;