"use client";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Hero } from "@/components/landing-page/Hero";
import { Features } from "@/components/landing-page/Features";
import { Pricing } from "@/components/landing-page/Pricing";
import { FAQ } from "@/components/landing-page/FAQ";
import { Contact } from "@/components/landing-page/Contact";
import CTA from "@/components/landing-page/CTA";
const faqs = [
  {
    question: "What is this application used for?",
    answer:
      "This application allows users to scrape and store documentation from websites and use AI to answer questions based on the extracted data.",
  },
  {
    question: "Do I need technical skills to use this application?",
    answer:
      "No, the application is designed for both technical and non-technical users. Simply enter a website URL, and the AI will handle the rest.",
  },
  {
    question: "How accurate are the AI-generated answers?",
    answer:
      "The AI provides highly accurate answers based on the scraped documentation. However, accuracy depends on the quality and structure of the extracted content.",
  },
  {
    question: "Can I use this application to scrape any website?",
    answer:
      "The application is optimized for scraping documentation pages. It may not work correctly on websites with heavy security measures or dynamic content.",
  },
];
const LandingPage = () => {
  return (
    <div className="min-h-screen text-white">
      <Hero />
      <Features />
      <Pricing />
      <FAQ faqs = {faqs}/>
      <Contact />
      <CTA />
    </div>
  );
};

export default LandingPage;
