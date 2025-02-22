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
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      content:
        "Hi, I'm DocsAI! 👋\n\nI'm ready to help you with your documentation questions. What would you like to know?",
      timestamp: new Date(),
      reactions: 0,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showCommands, setShowCommands] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const messagesEndRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Mock recent chats data
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: "user",
      content: input,
      timestamp: new Date(),
      reactions: 0,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate AI response
    await simulateTyping();

    const aiMessage = {
      id: messages.length + 2,
      type: "ai",
      content:
        "Here's a simulated response to your question. In a real implementation, this would be replaced with actual AI-generated content based on the documentation.",
      timestamp: new Date(),
      reactions: 0,
    };
    setMessages((prev) => [...prev, aiMessage]);
  };

  const formatMessage = (content) => {
    return content.split("\n").map((line, i) => (
      <React.Fragment key={i}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

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

  return (
    <div className="min-h-screen pt-16 flex">
      {/* Recent Chats Sidebar */}
      <div
        className={`fixed top-16 left-0 bottom-0 bg-gray-900/50 backdrop-blur-md border-r border-gray-800 transition-all duration-300 z-20 ${
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
                href="/chat/new"
                className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800"
              >
                <Plus className="h-5 w-5" />
              </Link>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search chats..."
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            {recentChats.map((chat) => (
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
                        {chat.title}
                      </h3>
                      <span className="text-xs text-gray-500 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatRelativeTime(chat.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 truncate mt-1">
                      {chat.lastMessage}
                    </p>
                  </div>
                  {chat.unread && (
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  )}
                </div>
              </Link>
            ))}
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

      {/* Main Chat Area */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-80" : "ml-0"
        }`}
      >
        {/* Header */}
        <div className="fixed top-16 left-0 right-0 bg-gray-900/50 backdrop-blur-md z-10">
          <div
            className={`mx-auto px-4 sm:px-6 lg:px-8 py-4 transition-all duration-300 ${
              isSidebarOpen ? "ml-80" : "ml-0"
            }`}
          >
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
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800"
                >
                  <Search className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Search Bar */}
            {isSearchOpen && (
              <div className="mt-4 relative animate-[float_0.3s_ease-out]">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search in conversation..."
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </div>
        </div>

        {/* Chat Messages */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="space-y-6 pt-8">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.type === "user"
                    ? "flex-row-reverse space-x-reverse"
                    : ""
                }`}
              >
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    message.type === "ai"
                      ? "bg-blue-500/20"
                      : "bg-purple-500/20"
                  }`}
                >
                  {message.type === "ai" ? (
                    <Bot className="h-6 w-6 text-blue-400" />
                  ) : (
                    <User className="h-6 w-6 text-purple-400" />
                  )}
                </div>

                <div className="flex-1 max-w-[80%]">
                  <div
                    className={`rounded-2xl px-4 py-2 ${
                      message.type === "ai"
                        ? "bg-gray-800/50 text-white"
                        : "bg-blue-500/20 text-blue-100"
                    }`}
                  >
                    <div className="prose prose-invert">
                      {formatMessage(message.content)}
                    </div>

                    <div className="mt-2 flex items-center justify-between text-xs opacity-50">
                      <span>{message.timestamp.toLocaleTimeString()}</span>
                      <div className="flex items-center space-x-2">
                        {message.reactions > 0 && (
                          <span className="flex items-center">
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            {message.reactions}
                          </span>
                        )}
                        <button
                          onClick={() => handleReaction(message.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <ThumbsUp className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1 hover:text-white text-gray-400 transition-colors">
                      <MessageSquare className="h-4 w-4" />
                    </button>
                    <button className="p-1 hover:text-white text-gray-400 transition-colors">
                      <Share2 className="h-4 w-4" />
                    </button>
                    <button className="p-1 hover:text-white text-gray-400 transition-colors">
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start space-x-3">
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
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900/50 backdrop-blur-md border-t border-gray-800">
          <div
            className={`mx-auto px-4 sm:px-6 lg:px-8 py-4 transition-all duration-300 ${
              isSidebarOpen ? "ml-80" : "ml-0"
            }`}
          >
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

export default ChatRoom;
