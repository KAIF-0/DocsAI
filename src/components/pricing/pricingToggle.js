import React, { memo } from "react";

const PricingToggle = ({ setIsAnnual, isAnnual }) => {
  return (
    <div className="flex items-center justify-center mb-12">
      <span className={`text-sm ${!isAnnual ? "text-white" : "text-gray-400"}`}>
        Monthly
      </span>
      <button
        onClick={() => setIsAnnual(!isAnnual)}
        className="relative mx-4 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-gray-700"
      >
        <span
          className={`${
            isAnnual ? "translate-x-5" : "translate-x-0"
          } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
        />
      </button>
      <span className={`text-sm ${isAnnual ? "text-white" : "text-gray-400"}`}>
        Annually <span className="text-green-400">(Save 25%)</span>
      </span>
    </div>
  );
};

export default memo(PricingToggle);
