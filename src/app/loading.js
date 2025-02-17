"use client";
import React, { useEffect, useState } from "react";
import { Brain, Sparkles, Zap, Shield, Database } from "lucide-react";

const InitialLoadingPage = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center z-50">
      <div className="max-w-md w-full space-y-5 p-8">
        {/* Logo Animation */}
        <div className="relative">
          {/* Middle pulsing ring */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border-4 border-blue-500/50 animate-[ping_2s_ease-in-out_infinite]"></div>
          </div>

          {/* Center logo */}
          <div className="relative flex justify-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl flex items-center justify-center">
              <Brain className="w-16 h-16 text-blue-500 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            DocsAI
          </h1>
          <div className="h-16">
            {" "}
            {/* Fixed height container for step text */}
            <div className="transition-all duration-500 animate-[float_0.5s_ease-out]">
              <div className="flex items-center justify-center space-x-2 text-gray-300">
                <Sparkles className="w-6 h-6 animate-spin" />
                <span>Loading Content...</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500/20 to-purple-500/30 animate-progress"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitialLoadingPage;
