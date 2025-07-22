"use client";

import { useState } from "react";
import Link from "next/link";
import { Github, Wrench, Menu, X, Brain, Star, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/app/stores/authStore";
import { Avatar } from "flowbite-react";
import { usePathname, useRouter } from "next/navigation";
import { useSubscriptionStore } from "@/app/stores/subscriptionStore";
import { Skeleton } from "./ui/skeleton";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { ispX01 } = useSubscriptionStore();
  const { isLoggedIn, logout, isSessionLoading } = useAuthStore();
  const pathName = usePathname();
  const router = useRouter();
  const tierInfo = "free";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/50 p-2">
      <div className="flex h-14 items-center justify-between">
        <div>
          <Link href={"/"} className="inline-flex items-center space-x-2">
            <Brain className="h-12 w-12 text-blue-500" />
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              DocsAI
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center space-x-4">
          <nav className="hidden sm:flex items-center space-x-6 text-lg">
            <Link
              href={"/features"}
              className={`transition hover:text-foreground/80 ${
                pathName === "/features"
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
                  : ""
              }`}
            >
              Features
            </Link>
            <Link
              href={"/about"}
              className={`transition hover:text-foreground/80 ${
                pathName === "/about"
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
                  : ""
              }`}
            >
              About
            </Link>
            <Link
              href={"/pricing"}
              className={`transition hover:text-foreground/80 ${
                pathName === "/pricing"
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
                  : ""
              }`}
            >
              Pricing
            </Link>
            <Link
              href={"/contact"}
              className={`transition hover:text-foreground/80 ${
                pathName === "/contact"
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
                  : ""
              }`}
            >
              Contact
            </Link>
          </nav>
        </div>
        <div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="sm:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
            {isSessionLoading ? (
              <Skeleton className="bg-white/15 h-10 w-[120px]" />
            ) : isLoggedIn ? (
              <div className="text-xl">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar
                      img="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                      bordered
                      color="light"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>
                      <div className="flex gap-2">
                        <span>Tier :</span>
                        {!ispX01 ? (
                          <span>Free</span>
                        ) : (
                          <div className="flex gap-2">
                            <span>Pro</span>
                            <Star className="size-4 text-yellow-300" />
                          </div>
                        )}
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Link href="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <div
                        onClick={async () => {
                          logout();
                          router.push("/auth/signin");
                        }}
                      >
                        Sign Out
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="flex items-center space-x-1 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                {/* <LogIn className="h-4 w-4" /> */}
                <span>Get Started</span>
              </Link>
            )}
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="sm:hidden">
          <nav className="flex flex-col space-y-4 p-4 bg-background border-t border-border/50">
            <Link href="/about" className="transition hover:text-foreground/80">
              About
            </Link>
            <Link
              href="/features"
              className="transition hover:text-foreground/80"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="transition hover:text-foreground/80"
            >
              Pricing
            </Link>
            <Link
              href="/contact"
              className="transition hover:text-foreground/80"
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
