"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Globe,
  ArrowLeft,
  Brain,
  Zap,
  Database,
  Shield,
  Search,
  Loader2,
  CheckCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import Toast from "@/components/toast";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/app/stores/authStore";
import { createChat } from "@/app/helpers/chatHelper";

const SiteInsertion = () => {
  const [url, setUrl] = useState("");
  const router = useRouter();
  const [chatId, setChatId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const { userId } = useAuthStore();

  const steps = [
    {
      icon: <Search className="h-6 w-6" />,
      title: "Analyze URL",
      loadingText: "Analyzing website structure...",
      color: "blue",
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Fetch Files",
      loadingText: "Fetching documentation pages...",
      color: "purple",
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Process Text",
      loadingText: "Processing content...",
      color: "green",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Optimize before Finalization",
      loadingText: "Optimizing for AI...",
      color: "yellow",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure Data",
      loadingText: "Finalizing security measures...",
      color: "red",
    },
  ];
  const docs_mutation = useMutation({
    mutationFn: createChat,
    onSuccess: (res) => {
      console.log("Success mutating:", res);
      setChatId(res?.chat.id);
      setIsComplete(true);
    },
    onError: (err) => {
      console.log("Error mutating:", err.message);
      toast.custom(
        <Toast
          type="error"
          message="Failed to process documentation. Please try again!"
        />,
        {
          position: "bottom-right",
        }
      );
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // checking if url contains /docs endpoint
    if (!url.includes("/docs")) {
      toast.custom(
        <Toast
          type="warning"
          message="Please enter a valid documentation URL that should contain '/docs' endpoint!"
        />,
        {
          position: "bottom-right",
        }
      );
      return;
    }
    setIsLoading(true);

    const loadingInterval = setInterval(async () => {
      setCurrentStep((prev) => {
        if (prev === steps.length - 1) {
          return prev;
        }
        return prev + 1;
      });
    }, 2000);

    try {
      await docs_mutation.mutateAsync({
        userId,
        url,
      });

      // clearInterval(loadingInterval);
    } catch (error) {
      console.log("Error submitting:", error.message);
    } finally {
      clearInterval(loadingInterval);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-10 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          onClick={() => router.back()}
          className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </div>

        <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-8">
          <div className="flex items-center mb-6">
            <Globe className="h-8 w-8 text-blue-500 mr-3" />
            <h1 className="text-2xl font-bold text-white">
              Add New Documentation Site
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="url"
                className="block text-sm font-medium text-gray-300"
              >
                Documentation URL
              </label>
              <div className="mt-1">
                <input
                  type="url"
                  id="url"
                  name="url"
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="block w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-900/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://docs.example.com"
                />
              </div>
              <p className="mt-2 text-sm text-gray-400">
                Enter the main URL of the documentation site you want to add
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">
                What we&apos;ll do:
              </h3>
              <ul className="space-y-3">
                {steps.map((step, index) => (
                  <li key={index} className="flex items-start">
                    <div
                      className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isLoading
                          ? index === currentStep
                            ? `bg-${step.color}-500 animate-pulse`
                            : index < currentStep
                            ? `bg-${step.color}-500`
                            : "bg-gray-700"
                          : "bg-gray-700 group-hover:bg-gray-600"
                      }`}
                    >
                      {isLoading && index === currentStep ? (
                        <Loader2 className="w-4 h-4 text-white animate-spin" />
                      ) : (
                        <div
                          className={`${
                            isLoading && index < currentStep
                              ? "text-white"
                              : "text-gray-400"
                          }`}
                        >
                          {step.icon}
                        </div>
                      )}
                    </div>
                    <span className="ml-3 text-gray-300">
                      {isLoading && index === currentStep
                        ? step.loadingText
                        : step.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Success Message */}
            {isComplete && (
              <div className="mt-6 md:flex gap-6 p-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border rounded-xl space-y-4">
                <div className="flex items-center space-x-4">
                  <CheckCircle className="h-8 w-8" />
                  <div>
                    <h3 className="text-lg font-semibold">Success!</h3>
                    <p className="text-sm">
                      Your documentation site has been successfully added and is
                      ready to use.
                    </p>
                  </div>
                </div>
                <Link
                  href={`/chat/${chatId}`}
                  className="max-w-fit mx-auto flex justify-center items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-all duration-200 hover:scale-[1.02]"
                >
                  Start with Your Docs
                </Link>
              </div>
            )}

            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading || isComplete}
                className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-[1.02]"
              >
                {isLoading
                  ? "Processing..."
                  : isComplete
                  ? "Site Added Successfully"
                  : "Add Documentation Site"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SiteInsertion;
