"use client";
import { Suspense, useEffect } from "react";
import AuthWrapper from "./authWrapper";
import LoadingPage from "./loading";

// export const metadata = {
//   title: "DocsAI",
//   description: "AI powered answers for any documentations!",
// };

export default function RootLayout({ children }) {
  useEffect(() => {
    console.log("useEffect");
  }, []);

  return (
    <div>
      <Suspense fallback={<LoadingPage />}>
        <AuthWrapper />
        {/* <Header /> */}
        <main>{children}</main>
        {/* <Footer /> */}
      </Suspense>
    </div>
  );
}
