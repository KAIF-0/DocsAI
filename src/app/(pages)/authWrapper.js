"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "../stores/authStore";
import LoadingOverlay from "../loading";

const AuthWrapper = () => {
  const router = useRouter();
  const { getSessionInfo, cleanStore, isLoggedIn } = useAuthStore();
  const [sessionLoading, setSessionLoading] = useState(false);

  const isSessionPresent = async () => await getSessionInfo();
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
  }, []);

  return null;
};

export default AuthWrapper;
