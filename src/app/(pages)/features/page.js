import React from 'react';
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
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';

const Features = () => {
  const features = [
    {
      icon: <Brain className="h-12 w-12 text-blue-400" />,
      title: 'AI-Powered Analysis',
      description: 'Our advanced AI models process and understand documentation context, providing accurate and relevant responses to your queries.'
    },
    {
      icon: <Search className="h-12 w-12 text-purple-400" />,
      title: 'Intelligent Search',
      description: 'Go beyond simple keyword matching with our context-aware search that understands the intent behind your questions.'
    },
    {
      icon: <MessageSquare className="h-12 w-12 text-green-400" />,
      title: 'Interactive Chat',
      description: 'Natural conversation interface that makes getting answers from your documentation as easy as chatting with a colleague.'
    },
    {
      icon: <Database className="h-12 w-12 text-yellow-400" />,
      title: 'Smart Storage',
      description: 'Efficient documentation storage and indexing system that ensures lightning-fast access to your information.'
    },
    {
      icon: <Shield className="h-12 w-12 text-red-400" />,
      title: 'Enterprise Security',
      description: 'Bank-grade encryption and security measures to keep your documentation and conversations private and secure.'
    },
    {
      icon: <RefreshCw className="h-12 w-12 text-cyan-400" />,
      title: 'Auto Updates',
      description: 'Automatic synchronization ensures your documentation is always up-to-date with the source material.'
    }
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-8 transform transition-all duration-300 hover:scale-105"
            >
              <div className="mb-6">{feature.icon}</div>
              <h3 className="text-2xl font-semibold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* How It Works Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">How It Works</h2>
          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform -translate-y-1/2 hidden lg:block"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Globe className="h-8 w-8 text-blue-400" />,
                  step: '01',
                  title: 'Add Your Docs',
                  description: 'Simply provide the URL of your documentation site.'
                },
                {
                  icon: <Brain className="h-8 w-8 text-purple-400" />,
                  step: '02',
                  title: 'AI Processing',
                  description: 'Our AI analyzes and indexes your documentation.'
                },
                {
                  icon: <MessageSquare className="h-8 w-8 text-green-400" />,
                  step: '03',
                  title: 'Start Chatting',
                  description: 'Ask questions in natural language.'
                },
                {
                  icon: <Code className="h-8 w-8 text-yellow-400" />,
                  step: '04',
                  title: 'Get Answers',
                  description: 'Receive accurate, contextual responses.'
                }
              ].map((step, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 relative"
                >
                  <div className="absolute -top-4 left-6 bg-blue-500 text-white text-sm font-bold py-1 px-3 rounded-full">
                    {step.step}
                  </div>
                  <div className="mb-4 mt-2">{step.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Transform Your Documentation?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of developers who are already using DocsAI to work smarter.
            </p>
            <Link
              href={"/signup"}
              className="inline-flex items-center px-8 py-3 border border-transparent rounded-lg text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-all duration-200 hover:scale-105"
            >
              Get Started Free <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;