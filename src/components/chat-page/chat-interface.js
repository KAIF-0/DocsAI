"use client";
import React, { useRef, useState } from "react";
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
  MessageSquareCodeIcon,
  Share2Icon,
  CopyIcon,
} from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { env } from "@/env";
import { useMutation } from "@tanstack/react-query";
import { getResponse } from "@/app/helpers/chatHelper";
import { useAuthStore } from "@/app/stores/authStore";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // Enables GitHub Flavored Markdown (tables, strikethrough, etc.)
import rehypeHighlight from "rehype-highlight"; // Syntax highlighting for code blocks
import "highlight.js/styles/github.css";

const ChatInterface = ({ isSidebarOpen, messages: messageArray }) => {
  const [messages, setMessages] = useState(messageArray);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showCommands, setShowCommands] = useState(false);
  const { userId } = useAuthStore();
  const chat_mutation = useMutation({
    mutationFn: getResponse,
    onSuccess: (res) => {
      console.log("Success mutating:", res);
      setMessages((prev) => [...prev, res.chatMessage]);
    },
    onError: (err) => {
      console.log("Error mutating:", err.message);
    },
  });

  const messagesEndRef = useRef(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setInput("");

    chat_mutation.mutate({
      chatId: "29d0e8e4-90e3-44e5-b467-ec4bd335468f",
      question: input,
      userId,
    });
  };

  const handleReaction = (messageId) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId
          ? { ...msg, reactions: (msg.reactions || 0) + 1 }
          : msg
      )
    );
  };

  const simulateTyping = async () => {
    setIsTyping(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsTyping(false);
  };

  const formatMessage = (content) => {
    return content
      .split("\n")
      .map((line, i) => <React.Fragment key={i}>{line}</React.Fragment>);
  };

  return (
    <div className="mx-auto">
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-80" : "ml-0"
        }`}
      >
        {/* Header */}
        <div
          className={`fixed mx-auto top-16 left-0 right-0  z-10 ${
            isSidebarOpen ? "ml-80" : "ml-0"
          }`}
        >
          <div className="px-4 sm:px-6 lg:px-8 py-4 transition-all rounded-xl bg-gray-900/30 backdrop-blur-3xl m-5 duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Link>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Brain className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h1 className="text-xl font-semibold text-white">
                      Documentation Assistant
                    </h1>
                    <p className="text-sm text-gray-400">Always here to help</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="min-w-[60%] mx-auto px-4 sm:px-6 lg:px-8 pb-24 my-28 overflow-y-auto">
          <div className="space-y-3 pt-8">
            {messages && messages?.length ? (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start justify-center space-x-3 `}
                >
                  {/* Avatar
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      messageType === "user"
                        ? "bg-blue-500/20"
                        : "bg-purple-500/20"
                    }`}
                  >
                    {messageType === "ai" ? (
                      >
                    ) : (
                      
                    )}
                  </div> */}

                  {/* Message Content */}
                  <div className="flex-1 max-w-4xl">
                    <div className=" space-y-5">
                      <div className="flex gap-2 justify-self-end">
                        <div className="bg-blue-500 text-white p-3 rounded-lg">
                          {formatMessage(message.question)}
                        </div>
                        <div className="flex-shrink-0 mt-1 w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                          <User className="size-6 text-blue-400" />
                        </div>
                      </div>
                      <div className="flex gap-2 justify-self-start">
                        <div className="flex-shrink-0 mt-1 w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                          <Bot className="h-6 w-6 text-purple-400" />
                        </div>
                        <div className="bg-gray-300 text-black p-3 rounded-lg max-w-xs md:max-w-3xl">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeHighlight]}
                            components={{
                              p: ({ children }) => (
                                <p className="mb-2 text-sm sm:text-base">
                                  {children}
                                </p>
                              ),
                              strong: ({ children }) => (
                                <strong className="font-bold">
                                  {children}
                                </strong>
                              ),
                              em: ({ children }) => (
                                <em className="italic">{children}</em>
                              ),
                              code: ({ inline, children }) =>
                                inline ? (
                                  <code className="px-1 py-0.5 bg-gray-200 text-red-500 rounded text-xs sm:text-sm">
                                    {children}
                                  </code>
                                ) : (
                                  <pre className="p-3 bg-gray-900 text-white rounded-md overflow-x-auto text-xs sm:text-sm">
                                    <code>{children}</code>
                                  </pre>
                                ),
                            }}
                          >
                            {message.response}
                          </ReactMarkdown>
                        </div>

                        {/* Copy Button */}
                        <button className="p-1 hover:text-white text-gray-400 transition-colors">
                          <CopyIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex-col text-center items-center justify-center p-4 mt-24 md:mt-24">
                <div className="flex justify-center items-center gap-2 mb-1">
                  <Brain className="h-12 w-12 text-blue-500" />
                  <h2 className="text-xl font-semibold text-white">
                    Hi, I&apos;m DocsAI.
                  </h2>
                </div>
                <p className="text-md text-gray-300">
                  How can I help you today?
                </p>
              </div>
            )}

            {/* Typing Indicator */}
            {chat_mutation.isPending && (
              <div className="min-w-[60%] flex items-start self-center space-x-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Bot className="h-6 w-6 text-blue-400" />
                </div>
                <div className="bg-gray-800/50 rounded-2xl px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin text-blue-400" />
                    <span className="text-gray-400">DocsAI is typing...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Form */}
        <div
          className={`absolute rounded-xl bottom-0 left-0 right-0 bg-gray-900/30 backdrop-blur-3xl border-t border-gray-800 ${
            isSidebarOpen ? "ml-80" : "ml-0"
          }`}
        >
          <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4 transition-all duration-300">
            <form onSubmit={handleSubmit} className="relative">
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setShowCommands(!showCommands)}
                  className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800"
                >
                  <Smile className="h-5 w-5" />
                </button>

                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask a question about the documentation..."
                    className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  {showCommands && (
                    <div className="absolute bottom-full mb-2 w-full bg-gray-800 rounded-lg shadow-lg p-2 animate-[float_0.3s_ease-out]">
                      <div className="grid grid-cols-2 gap-2">
                        <button className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors">
                          <ImageIcon className="h-4 w-4" />
                          <span>Add Image</span>
                        </button>
                        <button className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors">
                          <Paperclip className="h-4 w-4" />
                          <span>Attach File</span>
                        </button>
                        <button className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors">
                          <Code className="h-4 w-4" />
                          <span>Code Block</span>
                        </button>
                        <button className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors">
                          <Mic className="h-4 w-4" />
                          <span>Voice Input</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!input.trim()}
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
