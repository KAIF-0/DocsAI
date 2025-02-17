"use client";
import React, { useEffect } from "react";
import { PartyPopper, Rocket, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/stores/authStore";

const SignUpSuccess = () => {
  const router = useRouter();
  const { setAuthCookies } = useAuthStore();

  useEffect(() => {
    setAuthCookies().then((isCookiesSaved) => {
      if (isCookiesSaved?.success) {
        setTimeout(() => {
          router.push("/dashboard");
        }, 10000);
      } else {
        console.log(isCookiesSaved?.message);
      }
    });
  }, [router, setAuthCookies]);

  return (
    <div className="my-10 md:my-24 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 text-center bg-gradient-to-br from-black/20 via-black/10 to-black/20 backdrop-blur-3xl rounded-2xl p-14 border border-white/40 shadow-xl">
        {/* Animated celebration container */}
        <div className="relative">
          {/* Animated confetti effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-40 h-40 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20 animate-[spin_4s_linear_infinite]"></div>
          </div>

          {/* Success icons */}
          <div className="relative flex justify-center space-x-4">
            <PartyPopper className="w-16 h-16 text-yellow-500 animate-[bounce_2s_ease-in-out_infinite]" />
            <Rocket className="w-16 h-16 text-blue-500 animate-[bounce_2s_ease-in-out_infinite_0.5s]" />
          </div>
        </div>

        <h2 className="mt-6 text-3xl font-bold text-white">
          Welcome to DocsAI!
        </h2>
        <p className="mt-2 text-xl text-gray-400">
          Your account has been created successfully
        </p>

        {/* Animated progress bar */}
        <div className="mt-8">
          <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 animate-progress"></div>
          </div>
          <p className="mt-2 text-sm text-gray-400">
            Setting up your dashboard...
          </p>
        </div>

        {/* Manual redirect button */}
        <button
          onClick={() => router.push("/dashboard")}
          className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105"
        >
          Start Your Journey
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default SignUpSuccess;
