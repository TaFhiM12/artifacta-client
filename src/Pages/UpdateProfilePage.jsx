import React, { useContext, useState } from 'react';
import { FiUser, FiCamera, FiArrowLeft, FiSave } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

const UpdateProfilePage = () => {
    const { user, updateUserProfile } = useContext(AuthContext);
    const [displayName, setDisplayName] = useState(user?.displayName || '');
    const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
    const [isUpdating, setIsUpdating] = useState(false);

    const showSuccessAlert = () => {
        Swal.fire({
            title: 'Profile Updated!',
            text: 'Your changes have been saved successfully',
            icon: 'success',
            confirmButtonColor: '#FFBF00',
            confirmButtonText: 'Continue',
            timer: 3000,
            timerProgressBar: true,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!displayName.trim()) {
            Swal.fire('Error', 'Display name cannot be empty', 'error');
            return;
        }

        setIsUpdating(true);

        try {
            await updateUserProfile({ 
                name: displayName, 
                photo: photoURL 
            });
            showSuccessAlert();
        } catch (error) {
            Swal.fire('Error', error.message || 'Update failed', 'error');
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="py-12 px-4 ">
            
            <Helmet>
                <title>Artifacta | Update Profile</title>
            </Helmet>
            <div className="max-w-5xl mx-auto">
                <Link 
                    to="/dashboard/myProfile" 
                    className="inline-flex items-center text-amber-600 hover:text-amber-800 mb-8"
                >
                    <FiArrowLeft className="mr-2" />
                    Back to Profile
                </Link>

                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                    <div className="md:flex">
                        {/* Left Side - Profile Picture */}
                        <div className="md:w-1/3 bg-gradient-to-br from-amber-50 to-orange-50 p-8 flex flex-col items-center justify-center">
                            <div className="relative mb-6">
                                {photoURL ? (
                                    <img 
                                        src={photoURL} 
                                        alt="Profile" 
                                        className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-md"
                                        onError={() => setPhotoURL('')}
                                    />
                                ) : (
                                    <div className="w-40 h-40 rounded-full bg-white flex items-center justify-center shadow-md">
                                        <FiUser className="w-20 h-20 text-amber-400" />
                                    </div>
                                )}
                                <div className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-sm">
                                    <FiCamera className="text-amber-600" />
                                </div>
                            </div>
                            
                            <div className="w-full">
                                <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
                                    Profile Image URL
                                </label>
                                <input
                                    type="url"
                                    value={photoURL}
                                    onChange={(e) => setPhotoURL(e.target.value)}
                                    placeholder="https://example.com/photo.jpg"
                                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 text-sm"
                                    pattern="https://.*"
                                />
                            </div>
                        </div>

                        {/* Right Side - Form */}
                        <div className="md:w-2/3 p-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Update Profile</h2>
                            
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-2">
                                        Display Name
                                    </label>
                                    <div className="relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FiUser className="text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            id="displayName"
                                            value={displayName}
                                            onChange={(e) => setDisplayName(e.target.value)}
                                            className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                                            placeholder="Your name"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <motion.button
                                        type="submit"
                                        disabled={isUpdating}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 focus:outline-none ${
                                            isUpdating ? 'opacity-70 cursor-not-allowed' : ''
                                        }`}
                                    >
                                        <FiSave className="mr-2" />
                                        {isUpdating ? 'Saving...' : 'Save Changes'}
                                    </motion.button>
                                </div>
                            </form>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default UpdateProfilePage;