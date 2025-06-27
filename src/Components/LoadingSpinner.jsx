import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-amber-500 border-t-transparent animate-spin"></div>
        <div className="absolute inset-2 rounded-full border-4 border-amber-300 border-b-transparent animate-spin-reverse"></div>
      </div>
      <p className="mt-4 text-amber-600 text-lg font-medium">
        Loading Artifacts...
      </p>
    </div>
  );
};

export default LoadingSpinner;
