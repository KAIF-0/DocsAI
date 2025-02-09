'use client'
import React from "react";
import {
  Brain,
  Zap,
  Database,
  MessageSquare,
  Shield,
  Clock,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";


const LandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 min-h-screen pb-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-purple-500/10 animate-pulse"></div>
        <div className="max-w-5xl mx-auto relative">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent animate-gradient">
            Transform Documentation Into Intelligence
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            AI-powered documentation scraping and intelligent querying system
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={"/signup"}
              className="px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-full text-lg font-semibold transition-all transform hover:scale-105"
            >
              Get Started Free
            </Link>
            <Link
              href={"/features"}
              className="px-8 py-3 bg-gray-800 hover:bg-gray-700 rounded-full text-lg font-semibold flex items-center gap-2 transition-all transform hover:scale-105"
            >
              Learn More <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Powerful Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="h-8 w-8 text-blue-400" />,
                title: "AI-Powered Analysis",
                description:
                  "Advanced AI models process and understand your documentation.",
              },
              {
                icon: <Database className="h-8 w-8 text-purple-400" />,
                title: "Smart Storage",
                description:
                  "Efficiently store and index all your documentation.",
              },
              {
                icon: <MessageSquare className="h-8 w-8 text-green-400" />,
                title: "Intelligent Chat",
                description:
                  "Natural conversation interface for quick answers.",
              },
              {
                icon: <Shield className="h-8 w-8 text-red-400" />,
                title: "Secure & Private",
                description: "Your data is encrypted and protected.",
              },
              {
                icon: <Zap className="h-8 w-8 text-yellow-400" />,
                title: "Lightning Fast",
                description: "Get instant responses to your queries.",
              },
              {
                icon: <Clock className="h-8 w-8 text-pink-400" />,
                title: "24/7 Available",
                description: "Access your documentation anytime, anywhere.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 transition-all transform hover:scale-105"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Documentation?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of developers who are already using DocsAI
          </p>
          <Link
            href={"/signup"}
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-full text-lg font-semibold transition-all transform hover:scale-105"
          >
            Start Free Trial <ChevronRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
