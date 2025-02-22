"use client";
import React, { memo, useState } from "react";
import {
  Plus,
  MessageSquare,
  Settings,
  LogOut,
  Globe,
  Clock,
  Search,
  User,
  Mail,
  Edit2,
  Check,
  X,
  ChevronDown,
  Bell,
} from "lucide-react";
import { useAuthStore } from "@/app/stores/authStore";
import { useSubscriptionStore } from "@/app/stores/subscriptionStore";
import toast from "react-hot-toast";
import Toast from "../toast";
import Link from "next/link";

const Profile = ({}) => {
  const [isEditing, setIsEditing] = useState(false);
  const { username, email, updateUsername, logout } = useAuthStore();
  const [tempUsername, setTempUsername] = useState(username);
  const { subscription, ispX01 } = useSubscriptionStore();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleEditSubmit = () => {
    setTempUsername(tempUsername);
    setIsEditing(false);
    updateUsername(tempUsername).then((res) => {
      if (res.success) {
        toast.custom(
          <Toast type="success" message="Username updated successfully!" />,
          {
            position: "bottom-right",
          }
        );
      } else {
        toast.custom(
          <Toast type="error" message="Failed to update username!" />,
          {
            position: "bottom-right",
          }
        );
      }
    });
  };

  const handleEditCancel = () => {
    setTempUsername(username);
    setIsEditing(false);
  };

  const notifications = [
    { id: 1, text: "New feature available: AI-powered search", time: "1h ago" },
    { id: 2, text: "Documentation update completed", time: "2h ago" },
    { id: 3, text: "Weekly usage report ready", time: "1d ago" },
  ];
  return (
    <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 mb-8">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-[2px]">
              <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                <User className="w-8 h-8 text-gray-300" />
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900"></div>
          </div>

          <div className="ml-4">
            <div className="flex items-center space-x-2">
              {isEditing ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={tempUsername}
                    onChange={(e) => setTempUsername(e.target.value)}
                    className="bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-1 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                  />
                  <button
                    onClick={handleEditSubmit}
                    className="p-1 text-green-400 hover:text-green-300 transition-colors"
                  >
                    <Check className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleEditCancel}
                    className="p-1 text-red-400 hover:text-red-300 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-white">{username}</h2>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-1 text-gray-400 hover:text-white transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
            <div className="flex items-center mt-1">
              <Mail className="w-4 h-4 text-gray-400 mr-2" />
              <span className="text-gray-400">{email}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="relative p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-700/50"
            >
              <Bell className="w-6 h-6" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-xl shadow-lg py-2 z-[1000]">
                <div className="px-4 py-2 border-b border-gray-700">
                  <h3 className="text-sm font-semibold text-white">
                    Notifications
                  </h3>
                </div>
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="px-4 py-3 hover:bg-gray-700/50 transition-colors cursor-pointer"
                  >
                    <p className="text-sm text-gray-300">{notification.text}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {notification.time}
                    </p>
                  </div>
                ))}
                <div className="px-4 py-2 border-t border-gray-700">
                  <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="flex items-center space-x-2">
            <button onClick={()=>logout()} className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-700/50">
              <LogOut className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 mt-6">
        <div className="bg-gray-900/50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-gray-400">Plan</span>
              <p className="text-2xl font-bold text-white mt-2">
                {subscription}
              </p>
            </div>

            <div className="flex-col justify-center items-center">
              {ispX01 && (
                <>
                  <ChevronDown className="size-7 text-yellow-400 mx-auto" />

                  <Link
                    href="/plan/details"
                    className="text-sm text-yellow-400 hover:text-yellow-300 transition-colors"
                  >
                    View Details
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Profile);
