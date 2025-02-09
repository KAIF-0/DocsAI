"use client";
import React from "react";
import { XOctagon, RefreshCcw, Home, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";

const ErrorPage = () => {
  const router = useRouter();

  return (
    <div className="my-12 md:my-14 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Error animation container */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-40 h-40 rounded-full border-4 border-red-500/50 animate-[ping_2s_ease-in-out_infinite]"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="w-40 h-40 rounded-full bg-red-500/10 flex items-center justify-center">
              <XOctagon className="w-20 h-20 text-red-500 animate-[shake_0.5s_ease-in-out_infinite]" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-white">
            Oops! Something went wrong
          </h1>
          <p className="text-xl text-gray-400">
            We encountered an unexpected error
          </p>
        </div>

        <div className="bg-red-500/10 rounded-xl p-6">
          <div className="flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6 text-red-500 mr-2" />
            <span className="text-red-400">Error Details</span>
          </div>
          <p className="text-gray-400 text-sm">
            The server encountered an internal error and was unable to complete
            your request.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg text-base font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
          >
            <RefreshCcw className="w-5 h-5 mr-2" />
            Try Again
          </button>
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-700 rounded-lg text-base font-medium text-gray-300 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
