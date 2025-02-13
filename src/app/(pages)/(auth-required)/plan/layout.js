import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Suspense } from "react";
import LoadingPage from "../../loading";

export const metadata = {
  title: "DocsAI",
  description: "AI powered answers for any documentations!",
};

export default function RootLayout({ children }) {
  return (
    <div>
      <Suspense fallback={<LoadingPage />}>
        {/* <Header /> */}
        <main>{children}</main>
        {/* <Footer /> */}
      </Suspense>
    </div>
  );
}
