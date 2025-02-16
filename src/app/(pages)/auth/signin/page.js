"use client";
import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, LogIn, Brain, Loader } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/app/stores/authStore";
import { Account } from "appwrite";
import { account } from "@/configs/appwrite/appwrite-config";
import { useRouter } from "next/navigation";
import { loginWithOAuth } from "@/app/helpers/oAuthLogin";
import toast from "react-hot-toast";
import Toast from "@/components/toast";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const { login, logout } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.custom(<Toast type="warning" message={"Enter a valid Email!"} />, {
        position: "bottom-right",
      });
      return;
    }
    setLoading(true);
    const signin = await login(email);
    if (signin.success) {
      router.push("/auth/signin/otp");
    } else {
      toast.custom(<Toast type="error" message={signin.message} />, {
        position: "bottom-right",
      });
    }
    setLoading(false);
  };

  return (
    <div className="my-16 md:my-32 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="md:flex w-full max-w-6xl">
        {/* left side */}
        <div className="lg:w-1/2 w-full space-y-8 bg-gradient-to-br from-black/20 via-black/10 to-black/20 backdrop-blur-3xl rounded-2xl p-8 border border-white/40 shadow-xl">
          <div className="font-bold text-xl flex justify-center md:hidden">
            Sign-In
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Email address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-gray-900/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your work  email"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded bg-gray-900 border-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-300"
                >
                  Remember me
                </label>
              </div>
              {/* 
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-blue-400 hover:text-blue-300"
                >
                  Forgot password?
                </a>
              </div> */}
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-all duration-200 hover:scale-[1.02]"
            >
              {loading ? (
                <Loader className="animate-spin" />
              ) : (
                <span className="flex">
                  <LogIn className="w-5 h-5 mr-2" /> Sign in
                </span>
              )}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-800/50 text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => loginWithOAuth()}
                type="button"
                className="w-full flex justify-center items-center px-4 py-2 border border-gray-700 rounded-lg shadow-sm text-base font-medium text-white bg-gray-900/50 hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transform transition-all duration-200 hover:scale-[1.02]"
              >
                <img
                  className="h-5 w-5 mr-2"
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google logo"
                />
                Sign in with Google
              </button>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-gray-400">
            Don&apos;t have an account?{" "}
            <Link
              href={"/auth/signup"}
              className="font-medium text-blue-400 hover:text-blue-300"
            >
              Sign up
            </Link>
          </p>
        </div>

        {/* right side */}
        <div className="w-full lg:w-1/2 hidden md:flex flex-col items-center justify-center text-center lg:text-left">
          <Link href={"/"} className="inline-flex items-center space-x-2">
            <Brain className="h-12 w-12 text-blue-500" />
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              DocsAI
            </span>
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-white">Welcome back</h2>
          <p className="mt-2 text-gray-400">Sign in to your account</p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
