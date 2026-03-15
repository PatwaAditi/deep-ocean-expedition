"use client"

import { motion } from "framer-motion"
import { Parallax } from "react-scroll-parallax"

const fishSchool = [
  { x: 10, y: 30, size: 1, delay: 0 },
  { x: 15, y: 35, size: 0.8, delay: 0.1 },
  { x: 12, y: 40, size: 1.2, delay: 0.2 },
  { x: 18, y: 32, size: 0.9, delay: 0.15 },
  { x: 8, y: 38, size: 1.1, delay: 0.25 },
]

const facts = [
  { title: "Epipelagic Zone", depth: "0 - 200m", fact: "90% of all marine life lives in this zone" },
  { title: "Sunlight Penetration", depth: "Up to 200m", fact: "Enough light for photosynthesis" },
  { title: "Temperature", depth: "Surface", fact: "Ranges from 20°C to 30°C" },
]

export function SunlightZone() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-cyan-700 via-cyan-800 to-blue-800">
      {/* Smooth top transition gradient */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-cyan-600 to-transparent z-10" />
      
      {/* Light rays from above */}
      <Parallax speed={5}>
        <div className="absolute inset-0 overflow-hidden opacity-30">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute top-0 h-[150%] w-16 bg-gradient-to-b from-cyan-300/50 via-cyan-400/20 to-transparent"
              style={{
                left: `${15 + i * 15}%`,
                transform: `rotate(${-10 + i * 4}deg)`,
                transformOrigin: "top center",
              }}
            />
          ))}
        </div>
      </Parallax>

      {/* Coral reef bottom */}
      <Parallax speed={10}>
        <div className="absolute bottom-0 left-0 right-0 h-64">
          <svg viewBox="0 0 1440 256" className="absolute bottom-0 w-full" preserveAspectRatio="none">
            <path
              d="M0,256 L0,180 Q120,120 240,160 Q360,200 480,140 Q600,80 720,150 Q840,220 960,130 Q1080,40 1200,120 Q1320,200 1440,150 L1440,256 Z"
              fill="#1e3a5f"
            />
            <path
              d="M0,256 L0,200 Q180,150 360,190 Q540,230 720,170 Q900,110 1080,180 Q1260,250 1440,180 L1440,256 Z"
              fill="#0f2942"
            />
          </svg>
          
          {/* Coral decorations */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bottom-10"
              style={{ left: `${10 + i * 12}%` }}
              animate={{ rotate: [-2, 2, -2] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
            >
              <div 
                className="h-16 w-8 rounded-t-full"
                style={{
                  background: ["#f97316", "#ec4899", "#8b5cf6", "#10b981"][i % 4],
                  opacity: 0.8,
                }}
              />
            </motion.div>
          ))}
        </div>
      </Parallax>

      {/* Fish school - swimming right */}
      <Parallax speed={-5}>
        <div className="absolute inset-0">
          {fishSchool.map((fish, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ left: `${fish.x}%`, top: `${fish.y}%` }}
              animate={{
                x: [0, 100, 200, 300],
                y: [0, -20, 10, -10],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                delay: fish.delay,
                ease: "linear",
              }}
            >
              <svg
                width={40 * fish.size}
                height={24 * fish.size}
                viewBox="0 0 40 24"
                className="text-yellow-400"
              >
                {/* Fish facing right: tail on left, head on right */}
                <ellipse cx="22" cy="12" rx="15" ry="8" fill="currentColor" />
                <polygon points="5,12 -5,6 -5,18" fill="currentColor" />
                <circle cx="30" cy="10" r="2" fill="#1e3a5f" />
              </svg>
            </motion.div>
          ))}
        </div>
      </Parallax>

      {/* Large fish swimming right */}
      <motion.div
        className="absolute top-1/2 -left-40"
        animate={{ x: ["0vw", "120vw"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <svg width="120" height="60" viewBox="0 0 120 60" className="text-blue-300">
          {/* Fish facing right: tail on left, head on right */}
          <ellipse cx="70" cy="30" rx="40" ry="20" fill="currentColor" />
          <polygon points="30,30 0,10 0,50" fill="currentColor" />
          <circle cx="95" cy="25" r="5" fill="#1e3a5f" />
          <path d="M80,15 Q90,5 100,15" stroke="#1e3a5f" strokeWidth="2" fill="none" />
        </svg>
      </motion.div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-30, 30],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-20">
        <Parallax speed={-10}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <h2 className="mb-2 text-lg font-medium uppercase tracking-widest text-cyan-300">
              0m - 200m
            </h2>
            <h3 className="mb-8 text-4xl font-bold text-white md:text-5xl">
              Sunlight Zone
            </h3>
          </motion.div>
        </Parallax>

        <div className="mt-8 grid max-w-4xl gap-6 md:grid-cols-3">
          {facts.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="rounded-xl border border-cyan-500/30 bg-cyan-900/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/60 hover:bg-cyan-800/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] cursor-pointer"
            >
              <h4 className="mb-1 font-semibold text-cyan-300">{item.title}</h4>
              <p className="mb-2 font-mono text-sm text-cyan-400">{item.depth}</p>
              <p className="text-sm text-white/80">{item.fact}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
