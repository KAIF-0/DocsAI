import React from "react";

import {
  ChevronDown,
  ChevronUp,
  Check,
  CreditCard,
  Shield,
  AlertTriangle,
  X,
  Zap,
  AlertCircleIcon,
} from "lucide-react";

const ConifrmationCard = ({
  setShowConfirmation,
  handlePurchase,
  isAnnual,
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-lg flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl p-6 max-w-md w-full animate-[float_0.3s_ease-out]">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <AlertTriangle className="h-6 w-6 text-yellow-500 mr-2" />
            <h3 className="text-xl font-semibold text-white">
              Confirm Purchase
            </h3>
          </div>
          <button
            onClick={() => setShowConfirmation(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-3">
          <p className="text-gray-300 mb-4">
            You&apos;re about to upgrade to the Pro subscription for{" "}
            <span className="font-black">
              {isAnnual ? "$2/month [ Total: $24 ]" : "$5/month"}
            </span>
            .
          </p>
          <div className="bg-yellow-500/10 rounded-lg p-4 flex items-start space-x-2">
            <Zap className="h-5 w-5 text-yellow-500 mt-1" />
            <p className="text-sm text-yellow-200">
              Your card will be charged immediately and you&apos;ll have instant
              access to all Pro features.
            </p>
          </div>
        </div>
        <div className="mb-3 flex gap-2 justify-center">
          <AlertCircleIcon className="h-3 w-3 text-gray-600 mt-1" />
          <p className="text-sm text-gray-400">Non-Refundable</p>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={handlePurchase}
            className="flex-1 py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg text-white font-semibold transform transition-all duration-200 hover:scale-[1.02]"
          >
            Confirm Purchase
          </button>
          <button
            onClick={() => setShowConfirmation(false)}
            className="flex-1 py-2 px-4 border border-gray-600 hover:bg-gray-700 rounded-lg text-gray-300 font-semibold transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConifrmationCard;
