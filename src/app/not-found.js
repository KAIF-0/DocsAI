'use client'
import React from "react";
import { Search, Home, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="my-12 md:my-24 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* 404 animation container */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-40 h-40 rounded-full border-4 border-blue-500/50 animate-pulse"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="w-40 h-40 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Search className="w-20 h-20 text-blue-500 animate-[bounce_2s_ease-in-out_infinite]" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-7xl font-bold text-white">404</h1>
          <h2 className="text-3xl font-semibold text-gray-300">
            Page Not Found
          </h2>
          <p className="text-xl text-gray-400">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-700 rounded-lg text-base font-medium text-gray-300 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg text-base font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
