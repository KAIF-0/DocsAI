"use client";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  MessageSquare,
  Plus,
  Search,
} from "lucide-react";
import Link from "next/link";
import React, { memo, useState } from "react";

const RecentChats = ({ recentChats, isSidebarOpen, setIsSidebarOpen }) => {
  const [chats, setChats] = useState(recentChats);
  const formatRelativeTime = (date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 1000 / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return "Just now";
  };

  const handleSearchChange = (e) => {
    const searchQuery = e.target.value;
    if (searchQuery === "") {
      setChats(recentChats);
    } else {
      setChats([
        ...recentChats.filter((chat) => {
          return chat.key.toLowerCase().includes(searchQuery);
        }),
      ]);
    }
  };

  return (
    <div>
      <div
        className={`fixed top-16 left-0 bottom-0 bg-gray-900/30 backdrop-blur-3xl border-r border-gray-800 transition-all duration-300 z-20 ${
          isSidebarOpen ? "w-80" : "w-0"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div
            className={`p-4 border-b border-gray-800 ${
              isSidebarOpen ? "" : "hidden"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Recent Chats</h2>
              <Link
                href="/feed-docs"
                className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800"
              >
                <Plus className="h-5 w-5" />
              </Link>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search chats..."
                onChange={handleSearchChange}
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            {chats && chats?.length > 0 ? (
              chats.map((chat) => (
                <Link
                  key={chat.id}
                  href={`/chat/${chat.id}`}
                  className="block p-4 hover:bg-gray-800/50 transition-colors border-b border-gray-800/50"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-white truncate">
                          {chat.key}
                        </h3>
                        <span className="text-xs text-gray-500 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatRelativeTime(new Date(chat.createdAt))}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm text-gray-400 truncate">
                          {chat?.messages[0]?.question || "No recent messages!"}
                        </p>
                        <span className="text-xs text-gray-500 ml-1 flex gap-1">
                          <span>{chat?.messages.length || 0} </span>
                          <span>
                            {chat?.messages.length === 1
                              ? "message"
                              : "messages"}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center text-gray-400 mt-36">
                <p className="text-lg font-semibold">
                  Oops! It seems you have no chats yet.
                </p>
                <p className="mt-2">
                  Start a conversation to see it listed here.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Toggle */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
        >
          {isSidebarOpen ? (
            <ChevronLeft className="h-5 w-5" />
          ) : (
            <ChevronRight className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default memo(RecentChats);
