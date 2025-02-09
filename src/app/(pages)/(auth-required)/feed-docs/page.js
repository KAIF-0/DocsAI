'use client'
import React, { useState } from 'react';
import { Globe, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import LoadingOverlay from '@/components/docsLoader';

const SiteInsertion = () => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    'Analyzing website structure...',
    'Fetching documentation pages...',
    'Processing content...',
    'Optimizing for AI...',
    'Finalizing...'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate the loading process
    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    setIsLoading(false);
    // Handle the actual submission
  };

  return (
    <div className="min-h-screen pt-10 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href={"/dashboard"}
          className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Dashboard
        </Link>

        <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-8">
          <div className="flex items-center mb-6">
            <Globe className="h-8 w-8 text-blue-500 mr-3" />
            <h1 className="text-2xl font-bold text-white">Add New Documentation Site</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-300">
                Documentation URL
              </label>
              <div className="mt-1">
                <input
                  type="url"
                  id="url"
                  name="url"
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="block w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-900/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://docs.example.com"
                />
              </div>
              <p className="mt-2 text-sm text-gray-400">
                Enter the main URL of the documentation site you want to add
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">What we&apos;ll do:</h3>
              <ul className="space-y-3">
                {[
                  'Analyze the website structure',
                  'Extract all documentation pages',
                  'Process and optimize content for AI',
                  'Index everything for quick search',
                  'Enable intelligent querying'
                ].map((step, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-blue-500/20 text-blue-400 text-sm">
                      {index + 1}
                    </span>
                    <span className="ml-3 text-gray-300">{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-[1.02]"
              >
                {isLoading ? 'Processing...' : 'Add Documentation Site'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <LoadingOverlay 
        isVisible={isLoading} 
        message={steps[currentStep]} 
      />
    </div>
  );
};

export default SiteInsertion;