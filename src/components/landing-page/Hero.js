import Link from "next/link"
import { ChevronRight } from "lucide-react"
import {motion} from "framer-motion"

export const Hero = () => {
  return (
    <section className="pt-20 md:pt-32 min-h-screen pb-20 px-4 text-center relative overflow-hidden">
      <div className="absolute inset-0"></div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

      {/* Animated particles
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-blue-500 rounded-full opacity-20 animate-float"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div> */}

      <div className="max-w-5xl mx-auto relative">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          {["Transform", "Documentation", "Into", "Intelligence"].map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.1,
                delay: i * 0.1,
                type: "spring",
                damping: 12
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in-up">
          AI-powered documentation scraping and intelligent querying system
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={"/feed-docs"}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-full text-lg font-semibold transition-all transform hover:scale-105"
          >
            Get Started Free
          </Link>
          <Link
            href={"/features"}
            className="px-8 py-3 bg-gray-800 hover:bg-gray-700 rounded-full text-lg font-semibold flex items-center gap-2 transition-all transform hover:scale-105 group"
          >
            Learn More <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Animated wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
          <path
            fill="#1e40af"
            fillOpacity="0.3"
            d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,117.3C960,107,1056,149,1152,154.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  )
}

