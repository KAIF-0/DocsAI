'use client'
import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import Link from 'next/link';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'Free',
      description: 'Perfect for trying out DocsAI',
      price: 0,
      features: [
        '10 documentation chats per month',
        '1 documentation site',
        'Basic AI responses',
        'Community support'
      ],
      limitations: [
        'Limited chat history',
        'No custom AI training',
        'No team collaboration'
      ]
    },
    {
      name: 'Pro',
      description: 'For power users and small teams',
      price: isAnnual ? 2 : 5,
      features: [
        'Unlimited documentation chats',
        'Unlimited documentation sites',
        'Advanced AI responses',
        'Priority support',
        'Custom AI training',
        'Team collaboration',
        'API access',
        'Analytics dashboard'
      ],
      limitations: []
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-400 mb-8">
            Choose the perfect plan for your documentation needs
          </p>

          {/* Pricing Toggle */}
          <div className="flex items-center justify-center mb-12">
            <span className={`text-sm ${!isAnnual ? 'text-white' : 'text-gray-400'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative mx-4 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-gray-700"
            >
              <span
                className={`${
                  isAnnual ? 'translate-x-5' : 'translate-x-0'
                } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
              />
            </button>
            <span className={`text-sm ${isAnnual ? 'text-white' : 'text-gray-400'}`}>
              Annually{' '}
              <span className="text-green-400">(Save 25%)</span>
            </span>
          </div>

          {/* Pricing Cards */}
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
                    <span className="text-5xl font-bold text-white">${plan.price}</span>
                    <span className="text-gray-400">/month</span>
                  </div>
                  <Link
                    href={plan.price === 0 ? '/signup' : '#'}
                    className="block w-full py-3 px-6 rounded-lg text-center font-semibold transition-all duration-200 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white mb-8"
                  >
                    {plan.price === 0 ? 'Get Started' : 'Upgrade Now'}
                  </Link>
                </div>

                <div className="space-y-4">
                  <p className="text-sm font-semibold text-gray-300 text-left">Included features:</p>
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
                      <p className="text-sm font-semibold text-gray-300 text-left mt-6">Limitations:</p>
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

          {/* FAQ Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-white mb-8">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
              {[
                {
                  question: 'Can I switch plans anytime?',
                  answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.'
                },
                {
                  question: 'What happens when I reach the chat limit?',
                  answer: "On the free plan, you'll need to wait until the next month or upgrade to continue chatting. Pro plan has unlimited chats."
                },
                {
                  question: 'Do you offer refunds?',
                  answer: "Yes, we offer a 30-day money-back guarantee if you're not satisfied with our service."
                },
                {
                  question: 'Can I try the Pro features first?',
                  answer: 'You can start with the free plan to test our basic features. Upgrade anytime to access Pro features.'
                }
              ].map((faq, index) => (
                <div key={index} className="bg-gray-800/30 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                  <p className="text-gray-400">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;