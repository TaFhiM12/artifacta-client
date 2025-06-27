import React from 'react';
import { motion } from 'framer-motion';
import { FiAlertTriangle, FiX, FiRefreshCw, FiHome } from 'react-icons/fi';
import { Link } from 'react-router';

const ErrorComponent = ({ 
  title = "Something went wrong", 
  message = "We encountered an unexpected error. Please try again.", 
  showRefresh = true,
  showHomeLink = true,
  onDismiss,
  isFullPage = false,
  statusCode = null
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, type: 'spring', damping: 15 }}
      className={`${isFullPage ? 'flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4' : ''}`}
    >
      <div className={`relative bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl overflow-hidden ${isFullPage ? 'max-w-md w-full' : 'w-full'}`}>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500"></div>
        
        {statusCode && (
          <div className="absolute top-4 right-4 text-6xl font-bold text-gray-100 dark:text-gray-700 z-0">
            {statusCode}
          </div>
        )}

        <div className="relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center">
              <motion.div 
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: 'mirror' }}
                className="p-3 rounded-full bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 mr-4"
              >
                <FiAlertTriangle className="w-6 h-6" />
              </motion.div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
                {statusCode && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">Error {statusCode}</p>
                )}
              </div>
            </div>
            {onDismiss && (
              <motion.button 
                onClick={onDismiss}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <FiX className="w-5 h-5" />
              </motion.button>
            )}
          </div>

          <div className="pl-16">
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
            >
              {message}
            </motion.p>
            
            <div className="flex flex-wrap gap-3">
              {showRefresh && (
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.location.reload()}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg hover:shadow-lg transition-all cursor-pointer"
                >
                  <FiRefreshCw className="w-4 h-4" />
                  Refresh Page
                </motion.button>
              )}
              
              {showHomeLink && (
                <motion.div
                  whileHover={{ y: -2 }}
                >
                  <Link
                    to="/"
                    className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <FiHome className="w-4 h-4" />
                    Go to Home
                  </Link>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgZmlsbD0iIzAwMDAwMCIgY3g9IjIwIiBjeT0iMjAiIHI9IjEuNSIvPjwvZz48L3N2Zz4=')]"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default ErrorComponent;