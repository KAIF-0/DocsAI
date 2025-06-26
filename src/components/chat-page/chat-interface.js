"use client";
import React, { memo, useEffect, useRef, useState } from "react";
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
  X,
  LoaderCircleIcon,
  Loader,
  Info,
  LinkIcon,
  FileText,
  ThumbsDown,
  ShieldCheck,
  ShieldBan,
} from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { env } from "@/env";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getResponse } from "@/app/helpers/chatHelper";
import { useAuthStore } from "@/app/stores/authStore";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import Toast from "../toast";
import { useMessageStore } from "@/app/stores/messageStore";
import { useSubscriptionStore } from "@/app/stores/subscriptionStore";

const ChatInterface = ({
  url,
  isActive,
  title,
  isSidebarOpen,
  messages: messagesArray = [],
}) => {
  const queryClient = useQueryClient();
  const [messages, setMessages] = useState(null);
  const [input, setInput] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const { userId } = useAuthStore();
  const { chatId = null } = useParams();
  const { ispX01 } = useSubscriptionStore();
  const { msgCount, increaseMsgCount } = useMessageStore();
  const [showMessagesLeft, setShowMessagesLeft] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = () => {
    if (url.length > 0) {
      navigator.clipboard.writeText(url);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    }
  };
  const chat_mutation = useMutation({
    mutationFn: getResponse,
    onSuccess: (res) => {
      console.log("Success mutating:", res);
      setMessages((prev) => [...prev, res.chatMessage]);
      queryClient.invalidateQueries([
        "userChats",
        userId,
        "dashboardUserChats",
      ]);

      //increase message count in message store
      increaseMsgCount();
    },
    onError: (err) => {
      console.log("Error mutating:", err.message);
    },
    onSettled: () => {
      setInput("");
      scrollToBottom();
    },
  });

  useEffect(() => {
    setMessages(messagesArray);
  }, [messagesArray]);

  const messagesEndRef = useRef(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    if (!chatId) {
      toast.custom(
        <Toast type="warning" message="Please start a documentation first!" />,
        {
          position: "bottom-right",
        }
      );
      return;
    }

    //check for pro subscription
    if (!ispX01 && msgCount >= 5) {
      toast.custom(
        <Toast
          type="warning"
          message="You have reached the message limit. Upgrade to Pro to send more messages!"
        />,
        {
          position: "bottom-right",
        }
      );
      return;
    }

    chat_mutation.mutate({
      url: url,
      key: title,
      chatId: chatId,
      question: input,
      userId,
    });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatMessage = (content) => {
    return content
      .split("\n")
      .map((line, i) => <React.Fragment key={i}>{line}</React.Fragment>);
  };

  return (
    <div className="mx-auto">
      <div
        className={`flex-1 transition-all duration-300 space-y-3 ${
          isSidebarOpen ? "ml-80" : "ml-0"
        } ${isSidebarOpen ? "hidden md:block" : ""}`}
      >
        {/* Header */}
        <div
          className={`fixed mx-auto left-0 right-0 z-10 ${
            isSidebarOpen ? "ml-80" : "ml-0"
          }`}
        >
          <div className="px-4 sm:px-6 lg:px-8 py-4 transition-all rounded-xl bg-gray-900/30 backdrop-blur-3xl mx-5 duration-300">
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
                    <span>
                      <Brain className="h-6 w-6 text-blue-400" />
                    </span>
                  </div>
                  <div>
                    <h1 className="text-xl font-semibold text-white">
                      {title.charAt(0).toUpperCase() + title.slice(1)}{" "}
                      Documentation
                    </h1>
                    <p className="text-sm text-gray-400">
                      URL : {url.length > 0 ? url : "Not Available!"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {isActive ? (
                    <span className="flex flex-col justify-center items-center text-green-500">
                      <ShieldCheck className="h-5 w-5 mr-1" />
                      <span className="text-md">Active</span>
                    </span>
                  ) : (
                    <span className="flex animate-pulse flex-col justify-center items-center text-red-500">
                      <ShieldBan className="h-5 w-5 mr-1" />
                      <span className="text-md ">Processing...</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="min-w-[60%] mx-auto px-4 lg:px-8 sm:px-6 md:max-h-[560px] max-h-[750px] overflow-y-auto overflow-hidden">
          <div className="space-y-4 pt-5 md:mt-20 mt-24">
            {messages && messages?.length > 0 ? (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start justify-center space-x-3`}
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
                  <div className="flex-1 max-w-4xl ">
                    <div className="space-y-5">
                      <div className="flex gap-2 justify-self-end">
                        <button
                          className="p-1 hover:text-white text-gray-400 transition-colors"
                          onClick={() => {
                            navigator.clipboard.writeText(message.question);
                            toast.custom(
                              <Toast
                                type="success"
                                message="Question copied to clipboard!"
                              />,
                              {
                                position: "bottom-right",
                              }
                            );
                          }}
                        >
                          <CopyIcon />
                        </button>
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
                              code: ({ inline, children }) => (
                                <div className="relative">
                                  {inline ? (
                                    <code className="px-1 py-0.5 bg-gray-200 text-red-500 rounded text-xs sm:text-sm">
                                      {children}
                                    </code>
                                  ) : (
                                    <pre className="p-3 bg-gray-900 text-white rounded-md overflow-x-auto text-xs sm:text-sm">
                                      <code>{children}</code>
                                    </pre>
                                  )}
                                  <button
                                    className="absolute right-2 top-2 p-1 hover:text-white text-gray-400 transition-colors"
                                    onClick={() => {
                                      navigator.clipboard.writeText(children);
                                      toast.custom(
                                        <Toast
                                          type="success"
                                          message="Code copied to clipboard!"
                                        />,
                                        {
                                          position: "bottom-right",
                                        }
                                      );
                                    }}
                                  >
                                    <CopyIcon />
                                  </button>
                                </div>
                              ),
                            }}
                          >
                            {message.response}
                          </ReactMarkdown>
                        </div>

                        {/* Copy Button */}
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(message.response);
                            toast.custom(
                              <Toast
                                type="success"
                                message="Response copied to clipboard!"
                              />,
                              {
                                position: "bottom-right",
                              }
                            );
                          }}
                          className="p-1 hover:text-white text-gray-400 transition-colors"
                        >
                          <CopyIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex-col text-center items-center justify-center p-4 mt-48 md:mt-32">
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

            {/* if error */}
            {chat_mutation.isError && (
              //   <div className="flex justify-center items-center p-4 mt-4 bg-red-500 text-white rounded-md">
              //     <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
              //       <Bot className="h-6 w-6 text-blue-400" />
              //     </div>
              //     <p>Failed to get response!</p>
              //   </div>
              <div className=" min-w-full justify-center flex items-start  space-x-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Bot className="h-6 w-6 text-red-400" />
                </div>
                <div className="bg-red-500 rounded-2xl px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <p>Failed to get response!</p>
                  </div>
                </div>
              </div>
            )}

            {/* typing indicator */}
            {chat_mutation.isPending && (
              <div className=" min-w-full justify-center flex items-start  space-x-3">
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
          className={`fixed rounded-xl bottom-0 left-0 right-0 bg-gray-900/30 backdrop-blur-3xl border-t border-gray-800 ${
            isSidebarOpen ? "ml-80" : "ml-0"
          }`}
        >
          {!ispX01 && showMessagesLeft && (
            <div className="relative px-5 flex justify-between items-center top-0 left-0 right-0 border-b-[1px] border-white p-2 text-white text-center">
              <p>You have now {5 - msgCount} messages left! </p>
              <button
                onClick={() => setShowMessagesLeft(false)}
                className=" text-gray-400 hover:text-white"
              >
                <X className="size-6" />{" "}
              </button>
            </div>
          )}
          <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4 transition-all duration-300">
            <form onSubmit={handleSubmit} className="relative">
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setShowInfo(!showInfo)}
                  className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800"
                >
                  <Info className="h-5 w-5" />
                </button>

                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask a question about the documentation..."
                    className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  {showInfo && (
                    <div className="absolute bottom-full mb-3 w-full bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 rounded-xl shadow-2xl p-4 md:p-5 transform transition-all duration-300 ease-out animate-[float_0.5s_ease-out] ">
                      {/* Header Section with Icon and Close Button */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-blue-400" />
                          <h2 className="text-xl text-white font-bold tracking-tight bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                            Documentation Info
                          </h2>
                        </div>
                        <button
                          onClick={() => setShowInfo(!showInfo)}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Document Name */}
                      <p className=" text-gray-300 text-sm flex items-center gap-2">
                        <span className="font-medium">
                          Name of the Document:
                        </span>
                        <span className="text-blue-300">
                          {title.length > 0
                            ? title.charAt(0).toUpperCase() + title.slice(1)
                            : "Not Available"}
                        </span>
                      </p>

                      {/* Site URL with Copy Button */}
                      <p className=" text-gray-300 text-sm flex items-center gap-2">
                        <span className="font-medium">Site URL:</span>
                        <a
                          href={url.length > 0 ? url : undefined}
                          target={url.length > 0 ? "_blank" : undefined}
                          rel={
                            url.length > 0 ? "noopener noreferrer" : undefined
                          }
                          className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200 underline underline-offset-2 flex items-center gap-1"
                        >
                          <LinkIcon className="w-4 h-4" />
                          {url.length > 0 ? url : "Not Available!"}
                        </a>
                        {url.length > 0 && (
                          <button
                            onClick={handleCopy}
                            className=" p-1 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors text-gray-300 hover:text-white"
                            title={isCopied ? "Copied!" : "Copy URL"}
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        )}
                      </p>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-800"
                  disabled={!input.trim() || chat_mutation.isPending}
                >
                  {chat_mutation.isPending ? (
                    <Loader className="h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ChatInterface);
