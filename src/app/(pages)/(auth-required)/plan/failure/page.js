"use client";
import React from "react";
import {
  XCircle,
  AlertTriangle,
  ArrowLeft,
  RefreshCw,
  CreditCard,
  HelpCircle,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const PaymentFailure = () => {
  const router = useRouter();
  const message = useSearchParams().get("message") || "";

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Error Message */}
        <div className="text-center">
          <h2 className="mt-2 text-red-500 text-3xl font-bold ">
            Payment Failed!
          </h2>
          <p className="mt-2 text-xl text-gray-400">
            We couldn&apos;t process your payment
          </p>
        </div>

        {/* Error Details */}
        <div className="max-w-6xl w-full space-y-5  bg-gradient-to-br from-black/20 via-black/10 to-black/20 backdrop-blur-3xl rounded-2xl p-14 border border-white/40 shadow-xl">
          {/* Alert Box */}
          <div className="bg-red-500/10 rounded-xl p-4">
            <div className="flex items-center">
              <AlertTriangle className="h-6 w-6 text-red-400 mr-3" />
              <div>
                <h3 className="text-lg font-medium text-red-400">
                  Transaction Failed
                </h3>
                <p className="mt-1 text-sm text-gray-300">
                  <span className="font-black">{message}</span> Please try a
                  different payment method or contact your bank.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => router.push("/plan/confirmation")}
              className="flex items-center justify-center space-x-2 p-4 bg-gray-700/50 rounded-xl hover:bg-gray-700 transition-colors group"
            >
              <RefreshCw className="h-5 w-5 text-gray-400 group-hover:text-white" />
              <span className="text-gray-400 group-hover:text-white">
                Try Again
              </span>
            </button>
            <button
              onClick={() => router.push("/contact")}
              className="flex items-center justify-center space-x-2 p-4 bg-gray-700/50 rounded-xl hover:bg-gray-700 transition-colors group"
            >
              <HelpCircle className="h-5 w-5 text-gray-400 group-hover:text-white" />
              <span className="text-gray-400 group-hover:text-white">
                Get Help
              </span>
            </button>
          </div>

          {/* Alternative Payment */}
          <div className="p-4 bg-gray-900/50 rounded-xl">
            <h4 className="text-sm font-medium text-gray-300 mb-3">
              Try a different payment method
            </h4>
            <button
              onClick={() => router.push("/plan/confirmation")}
              className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-colors"
            >
              <CreditCard className="h-5 w-5" />
              <span>Use Different Card</span>
            </button>
          </div>

          {/* Back Button */}
          <button
            onClick={() => router.push("/pricing")}
            className="w-full flex items-center justify-center space-x-2 py-3 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Payment</span>
          </button>
        </div>

        {/* Help Text */}
        <p className="text-center text-sm text-gray-500">
          Need assistance? Contact our support at{" "}
          <a
            href="mailto:support@docsai.com"
            className="text-blue-400 hover:text-blue-300"
          >
            support@docsai.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default PaymentFailure;
