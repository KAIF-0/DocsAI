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
import toast from "react-hot-toast";
import Toast from "@/components/toast";
import { useParams, useRouter } from "next/navigation";

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
  const { data, isLoading, error, isSuccess, isError, isFetching } = useQuery({
    queryKey: ["userChats", userId],
    queryFn: getUserChats,
    staleTime: 10 * 60 * 1000,
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [chatDetails, setChatDetails] = useState({
    url: "",
    title: "",
    messages: null,
  });
  const router = useRouter();
  const { chatId = null } = useParams();

  // console.log(isLoading, !isSuccess);

  useEffect(() => {
    if (isLoading || !chatId || !data) return;

    const chat = data?.chats.find((chat) => chatId[0] === chat.id);
    if (chat) {
      // console.log(chat);
      setChatDetails((prev) => ({
        ...prev,
        url: chat.url,
        title: chat.key,
        messages: chat.messages,
      }));
    } else {
      toast.custom(<Toast type="error" message={"Chat not found!"} />);
      router.push("/chat");
    }
  }, [isLoading, data, chatId, router]);

  if (isLoading) return <LoadingPage />;

  return (
    <div className="min-h-fit">
      {/* Recent Chats Sidebar */}
      <RecentChats
        recentChats={data?.chats}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Main Chat Area */}
      <ChatInterface
        url={chatDetails.url}
        title={chatDetails.title}
        messages={chatDetails.messages}
        isSidebarOpen={isSidebarOpen}
      />
    </div>
  );
};

export default ChatRoom;
