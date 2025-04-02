"use client";
import { useAuthStore } from "@/app/stores/authStore";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRightFromLine,
  ArrowUpRightSquare,
  Clock,
  Globe,
  MessageSquare,
  Search,
} from "lucide-react";
import Link from "next/link";
import React, { memo, useMemo, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getUserChats } from "@/app/helpers/chatHelper";
import { useRouter } from "next/navigation";

const Chats = () => {
  const { userId } = useAuthStore();
  const router = useRouter();
  const { data, isLoading, error, isSuccess, isError } = useQuery({
    queryKey: ["dashboardUserChats", userId],
    queryFn: getUserChats,
    staleTime: 10 * 60 * 1000,
  });

  //counting messages
  const messageCounts = useMemo(() => {
    console.log("Calculating message counts");
    return data?.chats.length === 0
      ? 0
      : data?.chats.reduce((total, chat) => total + chat?.messages.length, 0);
  }, [data]);

  return (
    <div>
      {/* Search Bar */}
      <div className="relative max-w-2xl flex gap-2 mx-auto mb-8">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-500" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-gray-900/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Search documentation sites or chats..."
        />
        <ArrowRightFromLine
          onClick={() => router.push("/chat")}
          className="size-10 text-gray-500 hover:text-gray-400 cursor-pointer mr-2"
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
              {isLoading ? (
                <>
                  <div className="flex items-center space-x-4 mt-7">
                    <Skeleton className="size-8 md:size-20 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                </>
              ) : data && data?.chats.length > 0 ? (
                data?.chats.slice(0, 3).map((chat) => (
                  <div
                    key={chat.id}
                    className="bg-gray-900/50 rounded-lg p-4 hover:bg-gray-700/50 transition-colors"
                  >
                    <Link href={`/chat/${chat.id}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center">
                          <Globe className="h-5 w-5 text-blue-400 mr-3" />
                          <div>
                            <h3 className="text-lg font-medium text-white">
                              {chat.key.charAt(0).toUpperCase() +
                                chat.key.slice(1)}{" "}
                              Documentation
                            </h3>
                            <p className="text-sm text-gray-400">{chat.url}</p>
                          </div>
                        </div>
                        {chat.isActive ? (
                          <span
                            className="px-2 py-1 text-xs font-medium rounded-full
                                   bg-green-500/20 text-green-400"
                          >
                            Active
                          </span>
                        ) : (
                          <span
                            className="px-2 py-1 text-xs font-medium rounded-full
                                   bg-red-500/20 text-red-400"
                          >
                            Inactive
                          </span>
                        )}
                      </div>
                      <div className="mt-3 flex items-center text-sm text-gray-400">
                        <Clock className="size-4 mr-2" />
                        Last updated{" "}
                        {new Date(chat.createdAt).toLocaleDateString()}
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-400 mt-7">
                  <p>
                    Oops! No documentation sites found. Please add a new site to
                    see them here.
                  </p>
                  <Link
                    href="/feed-docs"
                    className="mt-4 inline-block px-4 py-2 border border-blue-500 rounded-lg text-sm font-medium text-blue-500 hover:bg-gradient-to-r from-blue-500 to-purple-500 hover:text-white transition-colors"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recent Chats */}
        <div className="space-y-6">
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Recent Chats
            </h2>
            <div>
              {isLoading ? (
                <>
                  <div className="flex items-center space-x-4 mt-7">
                    <Skeleton className="size-8 md:size-16 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                </>
              ) : data &&
                data?.chats.length > 0 &&
                data?.chats[0].messages.length > 0 ? (
                <div className="space-y-4">
                  {data?.chats[0].messages.slice(0, 2).map((message) => (
                    <Link
                      key={message.id}
                      href={`/chat/${message.chatId}`}
                      className="block bg-gray-900/50 rounded-lg p-4 hover:bg-gray-700/50 transition-colors"
                    >
                      <div className="flex items-start">
                        <span>
                          <MessageSquare className="h-5 w-5 text-purple-400 mr-3 mt-1" />
                        </span>
                        <div>
                          <h3 className="text-lg font-medium text-white line-clamp-1">
                            {message.question}
                          </h3>
                          <p className="text-sm text-gray-400 mt-1 line-clamp-1">
                            {message.response}
                          </p>
                          <div className="mt-2 flex items-center text-xs text-gray-500">
                            <Clock className="size-4 mr-1" />
                            {new Date(message.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                  <Link
                    disabled={isLoading}
                    href="/chat"
                    className="mt-4 block text-center px-4 py-2 border border-gray-700 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-700 transition-colors"
                  >
                    View All Chats
                  </Link>
                </div>
              ) : (
                <div className="text-center text-gray-400 mt-7">
                  <p>Oops! It seems like you have no chats yet.</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Quick Stats
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-900/50 rounded-lg p-4">
                <p className="text-sm text-gray-400">Total Sites</p>
                <p className="text-2xl font-bold text-white">
                  {data && data?.chats.length > 0 ? data?.chats.length : 0}
                </p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <p className="text-sm text-gray-400">Total Chats</p>
                <p className="text-2xl font-bold text-white">
                  {data && data?.chats.length > 0 ? messageCounts : 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Chats);
