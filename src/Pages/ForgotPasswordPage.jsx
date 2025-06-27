import React, {  useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { FiMail, FiArrowLeft, FiCheck } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { use } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import { Helmet } from 'react-helmet';

const ForgotPasswordPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { sendPasswordReset } = use(AuthContext);
  const [email, setEmail] = useState(location.state?.email || '');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await sendPasswordReset(email);
      if (success) {
        setEmailSent(true);
        toast.success('Password reset email sent!');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-50 to-white px-4 py-12 mt-40 md:mt-30"
    >
     <Helmet>
        <title>Artifacta | Forgot Password</title>
     </Helmet>
      
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden border border-amber-100">
        <div className="p-8 space-y-6">
          <button 
            onClick={() => navigate('/login')}
            className="flex items-center text-amber-600 hover:text-amber-800 transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Back to Login
          </button>

          <div className="text-center">
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              {emailSent ? 'Check Your Email' : 'Reset Password'}
            </h1>
            <p className="text-amber-700 mt-2">
              {emailSent ? 
                `We've sent a password reset link to ${email}` : 
                'Enter your email to receive a password reset link'}
            </p>
          </div>

          {emailSent ? (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <FiCheck className="h-6 w-6 text-green-600" />
              </div>
              <a
                href={`https://mail.google.com/mail/u/?authuser=${email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full flex items-center justify-center py-3 px-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all shadow-md"
              >
                Open Gmail
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-amber-800">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-amber-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="your@email.com"
                    className="pl-10 w-full px-4 py-3 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex items-center justify-center py-3 cursor-pointer px-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all shadow-md ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ForgotPasswordPage;