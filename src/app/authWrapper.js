"use client";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useAuthStore } from "./stores/authStore";

const AuthWrapper = ({ children }) => {
  const router = useRouter();
  const { getSessionInfo, cleanStore, isLoggedIn } = useAuthStore();
  const [sessionLoading, setSessionLoading] = useState(false);

  const isSessionPresent = useCallback(() => {
    return getSessionInfo();
  }, [getSessionInfo]);
  useEffect(() => {
    setSessionLoading(true);
    console.log(isLoggedIn);
    if (isLoggedIn) {
      isSessionPresent().then((sessionPresent) => {
        console.log(sessionPresent);
        if (sessionPresent.success === false) {
          cleanStore();
        }
        console.log("Session Present!");
      });
    }
    setSessionLoading(false);

  }, [cleanStore, isLoggedIn, isSessionPresent]);

  return null;
};

export default AuthWrapper;
