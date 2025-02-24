"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  ArrowLeft,
  Bot,
  User,
  Search,
  MoreVertical,
  ThumbsUp,
  MessageSquare,
  Share2,
  Copy,
  Paperclip,
  Image as ImageIcon,
  Smile,
  Mic,
  Brain,
  Loader2,
  Clock,
  ChevronLeft,
  ChevronRight,
  Plus,
  Code,
} from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { env } from "@/env";
import RecentChats from "@/components/chat-page/recents-chats";
import ChatInterface from "@/components/chat-page/chat-interface";
import { useAuthStore } from "@/app/stores/authStore";
import { getUserChats } from "@/app/helpers/chatHelper";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "@/app/(pages)/loading";

// interface Message {
//   id: number;
//   type: 'user' | 'ai';
//   content: string;
//   timestamp: Date;
//   reactions?: number;
//   isCode?: boolean;
// }

// interface RecentChat {
//   id: number;
//   title: string;
//   lastMessage: string;
//   timestamp: Date;
//   unread?: boolean;
// }

const ChatRoom = () => {
  const { userId } = useAuthStore();
  const { data, isLoading, error, isSuccess, isError } = useQuery({
    queryKey: ["userChats", userId],
    queryFn: getUserChats,
    staleTime: 10 * 60 * 1000,
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (isLoading) return <LoadingPage />;
  console.log(data);
  const recentChats = [
    {
      id: 1,
      title: "React Hooks Documentation",
      lastMessage: "Can you explain useEffect dependencies?",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      unread: true,
    },
    {
      id: 2,
      title: "TypeScript Types",
      lastMessage: "What's the difference between type and interface?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    },
    {
      id: 3,
      title: "Node.js Event Loop",
      lastMessage: "How does the event loop work in Node.js?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    },
    {
      id: 4,
      title: "Redux State Management",
      lastMessage: "Best practices for organizing Redux store",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Recent Chats Sidebar */}
      <RecentChats
        recentChats={data?.chats}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Main Chat Area */}
      <ChatInterface
        messages={data?.chats[2]?.messages}
        isSidebarOpen={isSidebarOpen}
      />
    </div>
  );
};

export default ChatRoom;
