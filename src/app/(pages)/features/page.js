import React from "react";
import {
  Brain,
  Zap,
  Search,
  MessageSquare,
  Database,
  Shield,
  RefreshCw,
  Code,
  Globe,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import CTA from "@/components/landing-page/CTA";
import FeaturesGrid from "@/components/features/main-grid";
import Workflow from "@/components/features/workflow";

const Features = () => {
  const features = [
    {
      icon: <Brain className="h-12 w-12 text-blue-400" />,
      title: "AI-Powered Analysis",
      description:
        "Our advanced AI models process and understand documentation context, providing accurate and relevant responses to your queries.",
    },
    {
      icon: <Search className="h-12 w-12 text-purple-400" />,
      title: "Intelligent Search",
      description:
        "Go beyond simple keyword matching with our context-aware search that understands the intent behind your questions.",
    },
    {
      icon: <MessageSquare className="h-12 w-12 text-green-400" />,
      title: "Interactive Chat",
      description:
        "Natural conversation interface that makes getting answers from your documentation as easy as chatting with a colleague.",
    },
    {
      icon: <Database className="h-12 w-12 text-yellow-400" />,
      title: "Smart Storage",
      description:
        "Efficient documentation storage and indexing system that ensures lightning-fast access to your information.",
    },
    {
      icon: <Shield className="h-12 w-12 text-red-400" />,
      title: "Enterprise Security",
      description:
        "Bank-grade encryption and security measures to keep your documentation and conversations private and secure.",
    },
    {
      icon: <RefreshCw className="h-12 w-12 text-cyan-400" />,
      title: "Auto Updates",
      description:
        "Automatic synchronization ensures your documentation is always up-to-date with the source material.",
    },
  ];

  const flow = [
    {
      icon: <Globe className="h-8 w-8 text-blue-400" />,
      step: "01",
      title: "Add Your Docs",
      description: "Simply provide the URL of your documentation site.",
    },
    {
      icon: <Brain className="h-8 w-8 text-purple-400" />,
      step: "02",
      title: "AI Processing",
      description: "Our AI analyzes and indexes your documentation.",
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-green-400" />,
      step: "03",
      title: "Start Chatting",
      description: "Ask questions in natural language.",
    },
    {
      icon: <Code className="h-8 w-8 text-yellow-400" />,
      step: "04",
      title: "Get Answers",
      description: "Receive accurate, contextual responses.",
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Powerful Features for Modern Documentation
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Experience the next generation of documentation management with our
            comprehensive suite of AI-powered features.
          </p>
        </div>

        {/* Main Features Grid */}
        <FeaturesGrid features={features} />

        {/* How It Works Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            How It Works
          </h2>
          <Workflow flow={flow} />
        </div>

        {/* CTA Section */}
        <>
          <CTA />
        </>
      </div>
    </div>
  );
};

export default Features;
