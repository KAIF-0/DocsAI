"use client";
import React, { useCallback, useEffect, useLayoutEffect } from "react";
import { LogIn, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/stores/authStore";

const GoogleSignInSuccess = () => {
  const router = useRouter();
  const { OAuthLogin } = useAuthStore();

  const googleLogin = useCallback(() => {
    return OAuthLogin();
  }, [OAuthLogin]);
  useLayoutEffect(() => {
    // OAuthLogin();
    googleLogin().then((isSuccess) => {
      if (isSuccess?.success === false) {
        router.push("/");
      } else {
        const timer = setTimeout(() => {
          router.push("/dashboard");
        }, 10000);
      }
      // console.log("User is Authenticated");
    });
  }, [googleLogin, router]);

  return (
    <div className="my-10 md:my-20  flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 text-center bg-gradient-to-br from-black/20 via-black/10 to-black/20 backdrop-blur-3xl rounded-2xl p-8 border border-white/40 shadow-xl">
        {/* Animated Google success container */}
        <div className="relative">
          {/* Google colors ring animation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border-4 border-t-blue-500 border-r-red-500 border-b-yellow-500 border-l-green-500 animate-[spin_2s_linear_infinite]"></div>
          </div>

          {/* Google logo */}
          <div className="relative flex justify-center">
            <div className="w-32 h-32 rounded-full bg-white/10 flex items-center justify-center">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google logo"
                className="w-16 h-16 animate-[bounce_1s_ease-in-out_1]"
              />
            </div>
          </div>
        </div>

        <h2 className="mt-6 text-3xl font-bold text-white">
          Google Sign-In Successful!
        </h2>
        <p className="mt-2 text-xl text-gray-400">
          Welcome to your DocsAI workspace
        </p>

        {/* Animated progress bar with Google colors */}
        <div className="mt-8">
          <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 animate-progress"></div>
          </div>
          <p className="mt-2 text-sm text-gray-400">
            Preparing your dashboard...
          </p>
        </div>

        {/* Manual redirect button */}
        <button
          onClick={() => router.push("/dashboard")}
          className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105"
        >
          Continue to Dashboard
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default GoogleSignInSuccess;
