'use client'
import React from 'react';
import { XCircle, AlertTriangle, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const GoogleSignInFailure = () => {
  const router =useRouter();

  return (
    <div className="my-10 md:my-7  flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 text-center bg-gradient-to-br from-black/20 via-black/10 to-black/20 backdrop-blur-3xl rounded-2xl p-8 border border-white/40 shadow-xl">
        {/* Error animation container */}
        <div className="relative">
          {/* Error pulse animation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border-4 border-red-500 animate-[ping_1s_ease-in-out_infinite]"></div>
          </div>
          
          {/* Error icon */}
          <div className="relative flex justify-center">
            <div className="w-32 h-32 rounded-full bg-red-500/20 flex items-center justify-center">
              <XCircle className="w-16 h-16 text-red-500 animate-[shake_0.5s_ease-in-out_infinite]" />
            </div>
          </div>
        </div>

        <h2 className="mt-6 text-3xl font-bold text-white">Google Sign-In Failed</h2>
        <p className="mt-2 text-xl text-gray-400">Unable to authenticate with Google</p>

        {/* Error details */}
        <div className="mt-8 bg-red-500/10 rounded-lg p-4">
          <div className="flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6 text-red-500 mr-2" />
            <span className="text-red-400">Authentication Error</span>
          </div>
          <p className="text-gray-400 text-sm">
            There was a problem signing in with your Google account. 
            Please try again or use another sign-in method.
          </p>
        </div>

        {/* Action buttons */}
        <div className="mt-8 space-y-4">
          
          <button
            onClick={() => router.push('/auth/signin')}
            className="w-full inline-flex items-center justify-center px-6 py-3 border border-gray-700 text-base font-medium rounded-md text-gray-300 bg-transparent hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Sign In
          </button>
        </div>

        {/* Help text */}
        <p className="mt-6 text-sm text-gray-500">
          If the problem persists, please contact support at{' '}
          <a href="mailto:support@docsai.com" className="text-blue-400 hover:text-blue-300">
            support@docsai.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default GoogleSignInFailure;