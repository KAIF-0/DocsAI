import { Check } from "lucide-react";
import Link from "next/link";
import PricingCard from "../pricing/pricing-card";

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
    price: 5,
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

export const Pricing = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Choose Your Plan
        </h2>
        <div className="grid  gap-8">
          <PricingCard plans={plans} />
        </div>
      </div>
    </section>
  );
};
