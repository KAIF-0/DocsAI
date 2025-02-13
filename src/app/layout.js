import { Geist, Geist_Mono, Lato, Manrope, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import Footer from "@/components/footer";
import { Suspense, lazy } from "react";
import LoadingOverlay from "./loading";
import LoadingPage from "./loading";
const AuthWrapper = lazy(() => import("./authWrapper"));
import QueryProvider from "./QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({ subsets: ["latin"], weight: "200" });

export const metadata = {
  title: "DocsAI",
  description: "AI powered answers for any documentations!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} ${geistMono.variable} antialiased bg-gradient-to-br from-gray-900 via-black to-gray-900 bg-opacity-90 `}
      >
        <Suspense fallback={<LoadingPage />}>
          <QueryProvider>
            <AuthWrapper>
              <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
              >
                <Header />
                <main>{children}</main>
                <Footer />
              </ThemeProvider>
            </AuthWrapper>
          </QueryProvider>
        </Suspense>
      </body>
    </html>
  );
}
