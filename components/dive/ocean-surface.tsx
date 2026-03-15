"use client"

import { motion } from "framer-motion"
import { Parallax } from "react-scroll-parallax"
import { ChevronDown } from "lucide-react"

export function OceanSurface() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-sky-400 to-cyan-500" />
      
      {/* Sun - bright and radiant */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 z-20">
        <Parallax speed={-5}>
          <motion.div
            className="relative"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Outer glow layers */}
            <div className="absolute -inset-16 rounded-full bg-yellow-200/20 blur-3xl" />
            <div className="absolute -inset-12 rounded-full bg-yellow-300/30 blur-2xl" />
            <div className="absolute -inset-8 rounded-full bg-yellow-400/40 blur-xl" />
            
            {/* Main sun body */}
            <div className="relative h-32 w-32 rounded-full bg-gradient-to-br from-yellow-200 via-yellow-300 to-orange-300 shadow-[0_0_120px_60px_rgba(253,224,71,0.6),0_0_200px_100px_rgba(251,191,36,0.3)]" />
            
            {/* Inner bright core */}
            <div className="absolute inset-3 rounded-full bg-gradient-to-br from-white via-yellow-100 to-yellow-200" />
            <div className="absolute inset-6 rounded-full bg-white/80" />
          </motion.div>
        </Parallax>
      </div>

      {/* Sunlight rays */}
      <Parallax speed={-5}>
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-0 h-full w-8 bg-gradient-to-b from-yellow-200/40 via-yellow-100/20 to-transparent"
              style={{
                left: `${10 + i * 12}%`,
                transform: `rotate(${-15 + i * 4}deg)`,
                transformOrigin: "top center",
              }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </Parallax>

      {/* Water surface with waves */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2">
        <svg
          className="absolute top-0 w-full"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
            fill="url(#waterGradient)"
            animate={{
              d: [
                "M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z",
                "M0,60 C240,0 480,120 720,60 C960,0 1200,120 1440,60 L1440,120 L0,120 Z",
                "M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z",
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <defs>
            <linearGradient id="waterGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#0891b2" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute top-[60px] bottom-0 left-0 right-0 bg-gradient-to-b from-cyan-500 via-cyan-600 to-cyan-700" />
      </div>
      
      {/* Bottom gradient for smooth transition to next zone */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-cyan-600 z-5" />

      {/* Floating particles near surface */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white/40"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <Parallax speed={-20}>
        <div className="relative z-10 flex h-screen flex-col items-center justify-center px-4 pt-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="mb-4 text-5xl font-bold tracking-tight text-white drop-shadow-lg md:text-7xl">
              Deep Ocean Expedition
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-white/90 drop-shadow md:text-xl">
              Descend 11,000 meters into the unknown. Explore the mysterious depths 
              of the Mariana Trench and discover creatures never seen before.
            </p>
          </motion.div>
          
          <motion.div
            className="absolute bottom-20 flex flex-col items-center gap-2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-sm font-medium text-white/80">Begin Descent</span>
            <ChevronDown className="h-8 w-8 text-white/80" />
          </motion.div>
        </div>
      </Parallax>
    </section>
  )
}
