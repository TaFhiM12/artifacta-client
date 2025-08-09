import { use, useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { AuthContext } from '../Contexts/AuthContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import useAxiosSecure from '../hooks/useAxiosSecure';

const ArtifactIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

const TimelineIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
  </svg>
);

const AddArtifactPage = () => {
  const { user } = use(AuthContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const axiosSecure = useAxiosSecure()

  const artifactTypes = [
    'Tools', 
    'Weapons', 
    'Documents', 
    'Writings', 
    'Jewelry', 
    'Pottery', 
    'Sculptures',
    'Coins',
    'Clothing',
    'Furniture'
  ];

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const artifactData = {
        ...data,
        likeCount: 0,
        addedBy: {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL
        },
        likedBy: [],
      };

      await axiosSecure.post(`/artifacts`, artifactData);
      
      toast.success('Artifact added successfully!', {
        position: 'top-center',
        duration: 3000,
        style: {
          background: '#FFBF00',
          color: '#fff',
          padding: '16px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#4BB543'
        }
      });
      
      reset();
    } catch (error) {
      toast.error('Failed to add artifact. Please try again.', {
        position: 'top-center',
        duration: 3000,
        style: {
          background: '#FF3333',
          color: '#fff',
          padding: '16px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#FF3333'
        }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-12  sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <Helmet>
          <title>Artifacta | Add New Artifact</title>
        </Helmet>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-amber-900 mb-4">
            <span className="relative">
              Add New Artifact
              <span className="absolute bottom-0 left-0 w-full h-1 bg-amber-400 transform translate-y-1"></span>
            </span>
          </h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Contribute to our collection of historical artifacts
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-amber-100">
          <div className="p-8">
            <div className="flex items-center mb-8">
              <div className="bg-amber-100 p-3 rounded-full mr-4">
                <ArtifactIcon className="text-amber-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-stone-800">New Artifact Details</h2>
                <p className="text-stone-600">Fill in the information about your historical artifact</p>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Artifact Name */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-stone-700 mb-1">
                    Artifact Name <span className="text-amber-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register("name", { required: "Artifact name is required" })}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-300 bg-red-50' : 'border-stone-200'} focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors`}
                    placeholder="e.g. Rosetta Stone"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Artifact Image URL */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-stone-700 mb-1">
                    Artifact Image URL <span className="text-amber-600">*</span>
                  </label>
                  <input
                    type="url"
                    id="imageUrl"
                    {...register("imageUrl", { 
                      required: "Image URL is required",
                      pattern: {
                        value: /^(https?:\/\/).+$/i,
                        message: "Please enter a valid URL"
                      }
                    })}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.imageUrl ? 'border-red-300 bg-red-50' : 'border-stone-200'} focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors`}
                    placeholder="https://example.com/image.jpg"
                  />
                  {errors.imageUrl && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.imageUrl.message}
                    </p>
                  )}
                </div>

                {/* Artifact Type */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">
                    Artifact Type <span className="text-amber-600">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="type"
                      {...register("type", { required: "Type is required" })}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.type ? 'border-red-300 bg-red-50' : 'border-stone-200'} focus:ring-2 focus:ring-amber-500 focus:border-amber-500 appearance-none transition-colors`}
                    >
                      <option value="">Select a type</option>
                      {artifactTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="h-5 w-5 text-stone-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    {errors.type && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.type.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Historical Context */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">
                    Historical Context <span className="text-amber-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="historicalContext"
                    {...register("historicalContext", { required: "Historical context is required" })}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.historicalContext ? 'border-red-300 bg-red-50' : 'border-stone-200'} focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors`}
                    placeholder="e.g. Ancient Egyptian artifact"
                  />
                  {errors.historicalContext && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.historicalContext.message}
                    </p>
                  )}
                </div>

                {/* Short Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-stone-700 mb-1">
                    Short Description <span className="text-amber-600">*</span>
                  </label>
                  <textarea
                    id="shortDescription"
                    {...register("shortDescription", { 
                      required: "Description is required",
                      minLength: {
                        value: 20,
                        message: "Description should be at least 20 characters"
                      }
                    })}
                    rows={4}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.shortDescription ? 'border-red-300 bg-red-50' : 'border-stone-200'} focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors`}
                    placeholder="Brief description of the artifact..."
                  />
                  {errors.shortDescription && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.shortDescription.message}
                    </p>
                  )}
                </div>

                {/* Created At */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">
                    Created At <span className="text-amber-600">*</span>
                    <span className="ml-2 text-xs text-stone-500">(e.g. "100 BC")</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <TimelineIcon className="text-amber-500" />
                    </div>
                    <input
                      type="text"
                      id="createdAt"
                      {...register("createdAt", { required: "Creation period is required" })}
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border ${errors.createdAt ? 'border-red-300 bg-red-50' : 'border-stone-200'} focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors`}
                      placeholder="e.g. 100 BC"
                    />
                    {errors.createdAt && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.createdAt.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Discovered At */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">
                    Discovered At <span className="text-amber-600">*</span>
                    <span className="ml-2 text-xs text-stone-500">(e.g. "1799")</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <TimelineIcon className="text-amber-500" />
                    </div>
                    <input
                      type="text"
                      id="discoveredAt"
                      {...register("discoveredAt", { required: "Discovery date is required" })}
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border ${errors.discoveredAt ? 'border-red-300 bg-red-50' : 'border-stone-200'} focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors`}
                      placeholder="e.g. 1799"
                    />
                    {errors.discoveredAt && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.discoveredAt.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Discovered By */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">
                    Discovered By <span className="text-amber-600">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="discoveredBy"
                      {...register("discoveredBy", { required: "Discoverer is required" })}
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border ${errors.discoveredBy ? 'border-red-300 bg-red-50' : 'border-stone-200'} focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors`}
                      placeholder="e.g. Pierre-François Bouchard"
                    />
                    {errors.discoveredBy && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.discoveredBy.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Present Location */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">
                    Present Location <span className="text-amber-600">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="presentLocation"
                      {...register("presentLocation", { required: "Current location is required" })}
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border ${errors.presentLocation ? 'border-red-300 bg-red-50' : 'border-stone-200'} focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors`}
                      placeholder="e.g. British Museum, London"
                    />
                    {errors.presentLocation && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.presentLocation.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Added By */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-stone-700 mb-1">
                    Added By
                  </label>
                  <div className="flex items-center p-4 rounded-lg bg-stone-50 border border-stone-200">
                    <div className="bg-amber-100 p-3 rounded-full mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-stone-800">{user?.displayName || "Anonymous"}</h3>
                      <p className="text-sm text-stone-600">{user?.email}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 flex justify-end">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`px-8 cursor-pointer py-3 bg-gradient-to-r from-amber-600 to-amber-700 rounded-lg text-white font-medium hover:from-amber-700 hover:to-amber-800 transition-colors shadow-md ${isSubmitting ? 'opacity-80 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Adding...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add Artifact
                    </span>
                  )}
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AddArtifactPage;