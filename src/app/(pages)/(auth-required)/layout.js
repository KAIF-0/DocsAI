import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "DocsAI",
  description: "AI powered answers for any documentations!",
};

export default function RootLayout({ children }) {
  return (
      <div>
        {/* <Header /> */}
        <main>{children}</main>
        {/* <Footer /> */}
      </div>
  );
}
