"use client";
import React from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  CreditCard,
  Clock,
  Shield,
  Download,
  Share2,
  Printer,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { env } from "@/env";
import { useAuthStore } from "@/app/stores/authStore";
import { useRouter } from "next/navigation";
import { useSubscriptionStore } from "@/app/stores/subscriptionStore";
import LoadingPage from "@/app/(pages)/loading";

const SubscriptionDetails = () => {
  const { userId } = useAuthStore();
  const router = useRouter();
  const { details, getSubscriptionDetails } = useSubscriptionStore();
  let subscription;
  const { data, isLoading, error, isSuccess, isError } = useQuery({
    queryKey: ["subscriptionDetails", userId],
    queryFn: getSubscriptionDetails,
    staleTime: 10 * 60 * 1000,
  });

  if (isLoading) return <LoadingPage />;
  if (isSuccess) {
    console.log("Successfully loaded subscription");
    subscription = data.subscriptionDetails; 
  }

  return (
    <div className="min-h-screen pt-10 pb-12 ">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <Link
          href="/dashboard"
          className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Dashboard
        </Link>

        {/* Main Content */}
        {!isError ? (
          <div className="max-w-6xl w-full space-y-8 text-center bg-gradient-to-br from-black/20 via-black/10 to-black/20 backdrop-blur-3xl rounded-2xl p-14 border border-white/40 shadow-xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-full mb-4">
                <Shield className="h-8 w-8 text-blue-400" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Subscription Details
              </h1>
              <div className="inline-flex items-center px-4 py-1 bg-green-500/20 rounded-full">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                <span className="text-green-400 text-sm font-medium">
                  Active
                </span>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white mb-4">
                  Personal Information
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-gray-900/50 rounded-xl">
                    <div className="flex-shrink-0">
                      <User className="h-6 w-6 text-blue-400" />
                    </div>
                    <div className="text-start">
                      <p className="text-sm text-gray-400">Username</p>
                      <p className="text-white font-medium">
                        {subscription?.username}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-gray-900/50 rounded-xl">
                    <div className="flex-shrink-0">
                      <Mail className="h-6 w-6 text-purple-400" />
                    </div>
                    <div className="text-start">
                      <p className="text-sm text-gray-400">Email</p>
                      <p className="text-white font-medium">
                        {subscription?.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-gray-900/50 rounded-xl">
                    <div className="flex-shrink-0">
                      <Phone className="h-6 w-6 text-green-400" />
                    </div>
                    <div className="text-start">
                      <p className="text-sm text-gray-400">Phone</p>
                      <p className="text-white font-medium">
                        {subscription?.phone}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Subscription Information */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white mb-4">
                  Subscription Information
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-gray-900/50 rounded-xl">
                    <div className="flex-shrink-0">
                      <CreditCard className="h-6 w-6 text-yellow-400" />
                    </div>
                    <div className="text-start">
                      <p className="text-sm text-gray-400">Amount</p>
                      <p className="text-white font-medium">
                        ${subscription?.amount}/month
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-gray-900/50 rounded-xl">
                    <div className="flex-shrink-0">
                      <Shield className="h-6 w-6 text-red-400" />
                    </div>
                    <div className="text-start">
                      <p className="text-sm text-gray-400">Subscription Type</p>
                      <p className="text-white font-medium">
                        {subscription?.subscriptionType.toUpperCase()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-gray-900/50 rounded-xl">
                    <div className="flex-shrink-0">
                      <Calendar className="h-6 w-6 text-blue-400" />
                    </div>
                    <div className="text-start">
                      <p className="text-sm text-gray-400">Duration</p>
                      <p className="text-white font-medium">
                        {new Date(subscription?.startDate).toLocaleDateString()}{" "}
                        -{new Date(subscription?.endDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-gray-900/50 rounded-xl">
                    <div className="flex-shrink-0">
                      <Clock className="h-6 w-6 text-purple-400" />
                    </div>
                    <div className="text-start">
                      <p className="text-sm text-gray-400">Next Billing</p>
                      <p className="text-white font-medium">
                        {new Date(subscription?.endDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 bg-gray-900/50 rounded-xl">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <AlertCircle className="h-20 w-20 text-yellow-400 animate-pulse" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                No Active Subscription Found
              </h2>
              <p className="text-gray-400 max-w-md">
                Looks like you don&apos;t have an active subscription yet.
                Upgrade to access premium features and unlimited capabilities.
              </p>
              <Link
                href="/pricing"
                className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
              >
                <CreditCard className="mr-2 h-5 w-5" />
                View Pricing Plans
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionDetails;
