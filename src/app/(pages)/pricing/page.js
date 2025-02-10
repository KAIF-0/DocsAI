"use client";
import React, { useState } from "react";
import { Check, X } from "lucide-react";
import Link from "next/link";
import PricingCard from "@/components/pricing/pricing-card";
import FAQ from "@/components/pricing/FAQ";
import PricingToggle from "@/components/pricing/pricingToggle";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Free",
      description: "Perfect for trying out DocsAI",
      price: 0,
      features: [
        "10 documentation chats per month",
        "1 documentation site",
        "Basic AI responses",
        "Community support",
      ],
      limitations: [
        "Limited chat history",
        "No custom AI training",
        "No team collaboration",
      ],
    },
    {
      name: "Pro",
      description: "For power users and small teams",
      price: isAnnual ? 2 : 5,
      features: [
        "Unlimited documentation chats",
        "Unlimited documentation sites",
        "Advanced AI responses",
        "Priority support",
        "Custom AI training",
        "Team collaboration",
        "API access",
        "Analytics dashboard",
      ],
      limitations: [],
    },
  ];

  const faqs = [
    {
      question: "Is my scraped data stored permanently?",
      answer:
        "Your data is securely stored for easy retrieval. You can manage or delete your stored documentation from your dashboard at any time.",
    },
    {
      question: "Is this service free to use?",
      answer:
        "We offer a free plan with limited queries and a premium plan for unlimited access. Check our pricing page for more details.",
    },
    {
      question: "How does the AI process my questions?",
      answer:
        "The AI analyzes the scraped documentation, extracts relevant information, and generates concise and accurate responses based on the context.",
    },
    {
      question: "Can I share the AI-generated responses with others?",
      answer:
        "Yes, you can copy responses and share them as needed. Future updates may include a built-in sharing feature for easier collaboration.",
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Choose the perfect plan for your documentation needs
          </p>
          {/* Pricing Toggle */}
          <PricingToggle isAnnual={isAnnual} setIsAnnual={setIsAnnual} />
          {/* Pricing Cards */}
          <PricingCard plans={plans} />
          {/* FAQ Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-white mb-8">
              Frequently Asked Questions
            </h2>
            <FAQ faqs={faqs} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
