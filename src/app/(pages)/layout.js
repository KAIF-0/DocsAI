"use client";
import { Suspense, useEffect } from "react";
import LoadingPage from "./loading";
import AuthWrapper from "../messageWrapper";
import { Toaster } from "react-hot-toast";
import { useMessageStore } from "../stores/messageStore";

// export const metadata = {
//   title: "DocsAI",
//   description: "AI powered answers for any documentations!",
// };

export default function RootLayout({ children }) {
  useEffect(() => {
    console.log("Root Layout!");
  }, []);

  return (
    <Suspense fallback={<LoadingPage />}>
      <Toaster />
      {/* <AuthWrapper/> */}
      {/* <Header /> */}
      <div>{children}</div>
      {/* <Footer /> */}
    </Suspense>
  );
}
