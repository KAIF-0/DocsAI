import React, { useState } from "react";

import {
  ChevronDown,
  ChevronUp,
  Check,
  CreditCard,
  Shield,
  AlertTriangle,
  X,
  Zap,
  Phone,
  Mail,
  User,
  Brain,
} from "lucide-react";
import { useAuthStore } from "@/app/stores/authStore";

const PaymentCard = ({
  proFeatures,
  isDetailsOpen,
  setShowConfirmation,
  setIsDetailsOpen,
  submitForm,
  isAnnual,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      console.log("Please fill in all required fields");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      console.log("Please enter a valid email address");
      return;
    }
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(formData.phone)) {
      console.log("Please enter a valid phone number");
      return;
    }
    await submitForm(formData);
    setShowConfirmation(true);
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Left Side - Logo and Description */}
      <div className="backdrop-blur-xl rounded-2xl p-8 shadow-xl">
        <div className="flex flex-col items-center mb-8">
          <Brain className="h-16 w-16 text-blue-500 animate-pulse" />
          <h1 className="text-3xl font-bold text-white mt-4 mb-2">
            Upgrade to Pro
          </h1>
          <p className="text-xl text-gray-400 text-center">
            Unlock the full potential of AI-powered documentation
          </p>
        </div>

        {/* Price Tag */}
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-6 transform transition-all duration-300 hover:scale-105">
            <span className="text-5xl font-bold text-white">
              ${isAnnual ? 24 : 5}
            </span>
            <span className="text-xl text-gray-400">/{isAnnual ? 'year' : 'month'}</span>
          </div>
        </div>

        {/* Collapsible Details */}
        <div>
          <button
            onClick={() => setIsDetailsOpen(!isDetailsOpen)}
            className="w-full flex items-center justify-between p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <span className="text-lg font-semibold text-white">
              Pro Features
            </span>
            {isDetailsOpen ? (
              <ChevronUp className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            )}
          </button>

          {isDetailsOpen && (
            <div className="mt-4 space-y-4 p-4 bg-gray-900/50 rounded-lg animate-[float_0.3s_ease-out]">
              {proFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-800/50 transition-colors transform hover:scale-[1.02]"
                >
                  <Check className="h-5 w-5 text-green-400 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="max-w-lg w-full max-h-fit space-y-8 bg-gradient-to-br from-black/20 via-black/10 to-black/20 backdrop-blur-3xl rounded-2xl p-14 border border-white/40 shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-6">
          Complete Your Purchase
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-gray-900/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-gray-900/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Phone Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-gray-900/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your phone number"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg text-white font-semibold flex items-center justify-center space-x-2 transform transition-all duration-200 hover:scale-[1.02]"
          >
            <CreditCard className="h-5 w-5" />
            <span>Purchase Pro Subscription</span>
          </button>

          <div className="flex items-center justify-center text-sm text-gray-400">
            <Shield className="h-4 w-4 mr-2" />
            <span>Secure payment powered by RazorPay</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentCard;
