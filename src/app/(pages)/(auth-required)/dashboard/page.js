"use client";
import React, { useState } from "react";
import Profile from "@/components/dashboard/profile-section";
import Chats from "@/components/dashboard/chats-section";

const Dashboard = () => {
  return (
    <div className="min-h-screen pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* profile section */}
        <Profile />

        {/* chat section */}
        <Chats />
      </div>
    </div>
  );
};

export default Dashboard;
