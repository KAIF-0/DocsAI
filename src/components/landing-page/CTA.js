import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const CTA = () => {
  return (
    <section className="py-20 px-4 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Transform Your Documentation?
        </h2>
        <p className="text-xl text-gray-200 mb-8">
          Join the developers who are already using DocsAI
        </p>
        <Link
          href={"/feed-docs"}
          className="inline-flex items-center px-8 py-3 bg-white text-blue-600 hover:bg-gray-100 rounded-full text-lg font-semibold transition-all transform hover:scale-105"
        >
          Start Free Trial <ChevronRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </section>
  );
};

export default CTA;
