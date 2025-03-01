"use client";
import { useRouter } from "next/navigation";
import React, { memo, useCallback, useEffect, useState } from "react";
import { useAuthStore } from "./stores/authStore";
import InitialLoadingPage from "./loading";
import { useMessageStore } from "./stores/messageStore";

const MessageWrapper = ({ children }) => {
  const { checkAndRefresh } = useMessageStore();
  useEffect(() => {
    checkAndRefresh();

    //check every minute
    const interval = setInterval(() => {
      checkAndRefresh();
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, [checkAndRefresh]);

  return null;
};

export default memo(MessageWrapper);
