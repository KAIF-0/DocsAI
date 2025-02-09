import React from "react";
import { Loader2 } from "lucide-react";

const LoadingOverlay = ({ isVisible = false, message = "Processing..." }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed max-w-xl max-h-[30%] mx-auto my-auto inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 bg-opacity-90 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border-t-2 border-b-2 border-blue-500 animate-spin"></div>
          <Loader2 className="w-8 h-8 text-blue-500 absolute  animate-spin drop-shadow-glow" />
        </div>
        <div className="mt-4">
          <p className="text-xl font-semibold text-blue-400 tracking-widest uppercase">
            {message}
          </p>
          <div className="mt-2 w-48 h-1 bg-gray-800 rounded-full overflow-hidden relative">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 animate-progress"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent animate-shimmer"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
