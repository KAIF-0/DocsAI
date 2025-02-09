import React from "react";
import { Brain, Loader } from "lucide-react";

const LoadingPage = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center z-50">
      <div className="max-w-md w-full space-y-8 text-center px-4">
        {/* Logo animation */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border-4 border-blue-500/50 animate-[spin_3s_linear_infinite]"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="w-32 h-32 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Brain className="w-16 h-16 text-blue-500 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Loading text */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center justify-center">
            <Loader className="w-6 h-6 mr-2 animate-spin" />
            {message}
          </h2>
        </div>

        {/* Progress bar */}
        <div className="max-w-xs mx-auto">
          <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 animate-progress"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
