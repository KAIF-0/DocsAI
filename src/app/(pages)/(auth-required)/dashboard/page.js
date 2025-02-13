"use client";
import React from "react";
import {
  Plus,
  MessageSquare,
  Settings,
  LogOut,
  Globe,
  Clock,
  Search,
  CreditCard,
} from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/app/stores/authStore";
import { useSubscriptionStore } from "@/app/stores/subscriptionStore";
import { env } from "@/env";

const Dashboard = () => {
  const { logout } = useAuthStore();
  const { ispX01 } = useSubscriptionStore();
  const sites = [
    {
      id: 1,
      name: "React Documentation",
      url: "https://react.dev",
      lastUpdated: "2 hours ago",
      status: "active",
    },
    {
      id: 2,
      name: "TypeScript Handbook",
      url: "https://www.typescriptlang.org/docs/",
      lastUpdated: "1 day ago",
      status: "active",
    },
  ];

  const recentChats = [
    {
      id: 1,
      title: "React Hooks Usage",
      timestamp: "30 minutes ago",
      preview: "Can you explain how useEffect works?",
    },
    {
      id: 2,
      title: "TypeScript Types",
      timestamp: "2 hours ago",
      preview: "What are the differences between type and interface?",
    },
  ];

  return (
    <div className="min-h-screen pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="mt-1 text-gray-400">
              Manage your documentation sites and chats
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <Link
              href={"/feed-docs"}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add New Site
            </Link>
            {ispX01 && (
              <Link
                href="/plan/details"
                className="inline-flex items-center px-4 py-2 border border-gray-700 rounded-lg shadow-sm text-sm font-medium text-gray-300 bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <CreditCard className="h-5 w-5 mr-2" />
                Plan Details
              </Link>
            )}
            <button
              onClick={() => logout()}
              className="inline-flex items-center px-4 py-2 border border-gray-700 rounded-lg shadow-sm text-sm font-medium text-gray-300 bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-500" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-gray-900/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Search documentation sites or chats..."
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Documentation Sites */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                Documentation Sites
              </h2>
              <div className="space-y-4">
                {sites.map((site) => (
                  <div
                    key={site.id}
                    className="bg-gray-900/50 rounded-lg p-4 hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <Globe className="h-5 w-5 text-blue-400 mr-3" />
                        <div>
                          <h3 className="text-lg font-medium text-white">
                            {site.name}
                          </h3>
                          <p className="text-sm text-gray-400">{site.url}</p>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          site.status === "active"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {site.status}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center text-sm text-gray-400">
                      <Clock className="h-4 w-4 mr-1" />
                      Last updated {site.lastUpdated}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Chats */}
          <div className="space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                Recent Chats
              </h2>
              <div className="space-y-4">
                {recentChats.map((chat) => (
                  <Link
                    key={chat.id}
                    href={`/chat/${chat.id}`}
                    className="block bg-gray-900/50 rounded-lg p-4 hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex items-start">
                      <MessageSquare className="h-5 w-5 text-purple-400 mr-3 mt-1" />
                      <div>
                        <h3 className="text-lg font-medium text-white">
                          {chat.title}
                        </h3>
                        <p className="text-sm text-gray-400 mt-1">
                          {chat.preview}
                        </p>
                        <div className="mt-2 flex items-center text-xs text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          {chat.timestamp}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <Link
                href={"/chat/new"}
                className="mt-4 block text-center px-4 py-2 border border-gray-700 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-700 transition-colors"
              >
                View All Chats
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                Quick Stats
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <p className="text-sm text-gray-400">Total Sites</p>
                  <p className="text-2xl font-bold text-white">2</p>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <p className="text-sm text-gray-400">Total Chats</p>
                  <p className="text-2xl font-bold text-white">15</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
