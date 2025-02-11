"use client";
import { env } from "@/env";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import PaymentCard from "@/components/pricing/paymentCard";
import ConifrmationCard from "@/components/pricing/conifrmationCard";
import paymentGateway from "@/app/helpers/subscription/paymentGateway";
import PricingToggle from "@/components/pricing/pricingToggle";
import { createOrder } from "@/app/helpers/subscription/createOrder";
import { useAuthStore } from "@/app/stores/authStore";
import addSubscription from "@/app/helpers/subscription/addSubscription";
const Page = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [formData, setFormData] = useState(null);
  const router = useRouter();
  const { userId } = useAuthStore();
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const submitForm = async (data) => {
    setFormData(data);
  };
  const proFeatures = [
    {
      title: "Unlimited Documentation Sites",
      description:
        "Add as many documentation sites as you need without any restrictions.",
    },
    {
      title: "Advanced AI Responses",
      description:
        "Get more accurate and detailed responses with our advanced AI model.",
    },
    {
      title: "Priority Support",
      description:
        "24/7 priority support with guaranteed response within 2 hours.",
    },
    {
      title: "Custom AI Training",
      description: "Train the AI model on your specific documentation needs.",
    },
    {
      title: "Team Collaboration",
      description:
        "Add team members and collaborate on documentation projects.",
    },
    {
      title: "API Access",
      description: "Full access to our API for custom integrations.",
    },
    {
      title: "Analytics Dashboard",
      description:
        "Detailed analytics and insights about your documentation usage.",
    },
  ];
  const mutation = useMutation({
    mutationFn: createOrder,
    onSuccess: (res) => {
      console.log("Order created:", res);
      paymentGateway(res);
    },
    onError: (err) => {
      console.log("Error mutating:", err.message);
    },
  });

  const handlePurchase = () => {
    console.log({ ...formData, amount: isAnnual ? "24.0" : "5.0" });
    mutation.mutate({
      ...formData,
      userId: userId,
      subscriptionType: isAnnual ? "annually " : "monthly",
      amount: isAnnual ? "24.0" : "5.0",
    });
  };
  return (
    <div className="min-h-screen pt-12 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        <PricingToggle isAnnual={isAnnual} setIsAnnual={setIsAnnual} />
        {/* Main Card */}
        <PaymentCard
          proFeatures={proFeatures}
          isDetailsOpen={isDetailsOpen}
          setShowConfirmation={setShowConfirmation}
          setIsDetailsOpen={setIsDetailsOpen}
          submitForm={submitForm}
          isAnnual={isAnnual}
        />

        {/* Confirmation Modal */}
        {showConfirmation && (
          <ConifrmationCard
            setShowConfirmation={setShowConfirmation}
            handlePurchase={handlePurchase}
            isAnnual={isAnnual}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
