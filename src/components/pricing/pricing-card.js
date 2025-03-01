import { useSubscriptionStore } from "@/app/stores/subscriptionStore";
import { Check, X } from "lucide-react";
import Link from "next/link";
import React, { memo } from "react";

const PricingCard = ({ plans, isAnnual }) => {
  const { ispX01 } = useSubscriptionStore();
  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      {plans.map((plan) => (
        <div
          key={plan.name}
          className="relative bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 shadow-xl transform transition-all duration-300 hover:scale-105"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
            <p className="text-gray-400 mb-6">{plan.description}</p>
            <div className="mb-6">
              <span className="text-5xl font-bold text-white">
                ${plan.price}
              </span>
              <span className="text-gray-400">/month</span>
            </div>
            <Link
              href={
                plan.price === 0
                  ? "/feed-docs"
                  : ispX01
                  ? "/plan/details"
                  : `/plan/confirmation?plan=pro&isAnnual=${isAnnual}`
              }
              className="block w-full py-3 px-6 rounded-lg text-center font-semibold transition-all duration-200 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white mb-8"
            >
              {plan.price === 0
                ? "Get Started"
                : ispX01
                ? "Commence Your Subscription"
                : "Upgrade Now"}
            </Link>
          </div>

          <div className="space-y-4">
            <p className="text-sm font-semibold text-gray-300 text-left">
              Included features:
            </p>
            <ul className="space-y-3">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-green-400 mr-2" />
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>

            {plan.limitations.length > 0 && (
              <>
                <p className="text-sm font-semibold text-gray-300 text-left mt-6">
                  Limitations:
                </p>
                <ul className="space-y-3">
                  {plan.limitations.map((limitation, index) => (
                    <li key={index} className="flex items-start">
                      <X className="h-5 w-5 text-red-400 mr-2" />
                      <span className="text-gray-400">{limitation}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(PricingCard);
