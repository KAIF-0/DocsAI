"use client";
import { useRouter } from "next/navigation";
import React, { memo, useCallback, useEffect, useState } from "react";
import { useAuthStore } from "./stores/authStore";
import InitialLoadingPage from "./loading";

const AuthWrapper = ({ children }) => {
  // const { getSessionInfo, cleanStore } = useAuthStore();
  // const [sessionLoading, setSessionLoading] = useState(true);

  // const isSessionPresent = useCallback(() => {
  //   return getSessionInfo();
  // }, [getSessionInfo]);
  // useEffect(() => {
  //   setSessionLoading(true);
  //   // if (isLoggedIn) {
  //   isSessionPresent() //checking appwrite auth session
  //     .then((sessionPresent) => {
  //       if (sessionPresent?.success === false) cleanStore(); //cleaning store if session is not present
  //       console.log("Session present!");
  //     })
  //     .finally(() => setSessionLoading(false));
  //   // } else {
  //   //   setSessionLoading(false);
  //   // }
  // }, [cleanStore, isSessionPresent]);

  // //loading session first
  // if (sessionLoading) {
  //   return <InitialLoadingPage />;
  // }

  return <>{children}</>;
};

export default memo(AuthWrapper);
