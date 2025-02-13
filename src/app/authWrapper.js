"use client";
import { useRouter } from "next/navigation";
import React, { memo, useCallback, useEffect, useState } from "react";
import { useAuthStore } from "./stores/authStore";
import LoadingPage from "./loading";

const AuthWrapper = ({ children }) => {
  const router = useRouter();
  const { getSessionInfo, cleanStore, isLoggedIn } = useAuthStore();
  const [sessionLoading, setSessionLoading] = useState(true);

  const isSessionPresent = useCallback(() => {
    return getSessionInfo();
  }, [getSessionInfo]);
  useEffect(() => {
    setSessionLoading(true);
    console.log(isLoggedIn);
    if (isLoggedIn) {
      isSessionPresent() //checking appwrite session
        .then((sessionPresent) => {
          if (sessionPresent?.success === false) cleanStore(); //cleaning store if session is not present
        })
        .finally(() => setSessionLoading(false));
    } else {
      setSessionLoading(false);
    }
  }, [cleanStore, isLoggedIn, isSessionPresent]);

  //loading session first
  if (sessionLoading) {
    return <LoadingPage />;
  }

  return <>{children}</>;
};

export default memo(AuthWrapper);
