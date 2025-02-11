import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Suspense } from "react";
import LoadingPage from "./loading";
import Script from "next/script";

export const metadata = {
  title: "DocsAI",
  description: "AI powered answers for any documentations!",
};

export default function RootLayout({ children }) {
  return (
    <div>
      <Suspense fallback={<LoadingPage />}>
        {/* for razorpay  */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />
        {/* <Header /> */}
        <main>{children}</main>
        {/* <Footer /> */}
      </Suspense>
    </div>
  );
}
