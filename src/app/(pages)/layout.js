"use client";
import { Suspense, useEffect } from "react";
import LoadingPage from "./loading";
import AuthWrapper from "../authWrapper";
import { Toaster } from "react-hot-toast";
import { useMessageStore } from "../stores/messageStore";

// export const metadata = {
//   title: "DocsAI",
//   description: "AI powered answers for any documentations!",
// };

export default function RootLayout({ children }) {
  const { checkAndRefresh } = useMessageStore();
  useEffect(() => {
    checkAndRefresh();

    //check every minute 
    const interval = setInterval(() => {
      checkAndRefresh(); 
    }, 60 * 1000); 

    return () => clearInterval(interval);
  }, [checkAndRefresh]);

  return (
    <div>
      <Suspense fallback={<LoadingPage />}>
        <Toaster />
        {/* <AuthWrapper/> */}
        {/* <Header /> */}
        <main>{children}</main>
        {/* <Footer /> */}
      </Suspense>
    </div>
  );
}
