"use client";
import React, { useEffect } from "react";
import { CheckCircle, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const SignInSuccess = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/dashboard");
    }, 10000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="my-16 md:my-24 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 text-center bg-gradient-to-br from-black/20 via-black/10 to-black/20 backdrop-blur-3xl rounded-2xl p-8 border border-white/40 shadow-xl">
        <div className="relative">
          {/* Animated success ring */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border-4 border-green-500 animate-[ping_1s_ease-in-out_1]"></div>
          </div>

          {/* Success icon */}
          <div className="relative flex justify-center">
            <div className="w-32 h-32 rounded-full bg-green-500/20 flex items-center justify-center animate-[bounce_1s_ease-in-out_1]">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
          </div>
        </div>

        <h2 className="mt-6 text-3xl font-bold text-white">Welcome Back!</h2>
        <p className="mt-2 text-xl text-gray-400">Successfully signed in</p>

        {/* Animated progress bar */}
        <div className="mt-8">
          <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 animate-progress"></div>
          </div>
          <p className="mt-2 text-sm text-gray-400">
            Redirecting to dashboard...
          </p>
        </div>

        {/* Manual redirect button */}
        <button
          onClick={() => router.push("/dashboard")}
          className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 transform hover:scale-105"
        >
          Go to Dashboard
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default SignInSuccess;
