"use client"

import { motion } from "framer-motion"
import { Parallax } from "react-scroll-parallax"

export function AbyssZone() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-zinc-950 via-neutral-950 to-stone-950">
      {/* Smooth top transition */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-zinc-950 to-transparent z-10" />
      
      {/* Sonar pulse animation */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-500/30"
            initial={{ width: 0, height: 0, opacity: 0.8 }}
            animate={{
              width: [0, 600],
              height: [0, 600],
              opacity: [0.6, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 1,
              ease: "easeOut",
            }}
          />
        ))}
        <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500 shadow-[0_0_30px_#06b6d4]" />
      </div>

      {/* Giant creature silhouette */}
      <Parallax speed={5}>
        <motion.div
          className="absolute right-[-10%] top-1/3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <svg width="400" height="300" viewBox="0 0 400 300" className="opacity-20">
            {/* Giant squid silhouette */}
            <ellipse cx="200" cy="100" rx="80" ry="60" fill="#1e293b" />
            <path d="M150,130 Q100,200 80,280" stroke="#1e293b" strokeWidth="12" fill="none" />
            <path d="M170,140 Q140,220 130,290" stroke="#1e293b" strokeWidth="10" fill="none" />
            <path d="M190,145 Q180,230 180,300" stroke="#1e293b" strokeWidth="10" fill="none" />
            <path d="M210,145 Q220,230 220,300" stroke="#1e293b" strokeWidth="10" fill="none" />
            <path d="M230,140 Q260,220 270,290" stroke="#1e293b" strokeWidth="10" fill="none" />
            <path d="M250,130 Q300,200 320,280" stroke="#1e293b" strokeWidth="12" fill="none" />
            <circle cx="175" cy="90" r="15" fill="#0f172a" />
            <circle cx="225" cy="90" r="15" fill="#0f172a" />
          </svg>
        </motion.div>
      </Parallax>

      {/* Whale silhouette */}
      <Parallax speed={-3}>
        <motion.div
          className="absolute left-[-5%] bottom-1/4"
          animate={{ x: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        >
          <svg width="300" height="120" viewBox="0 0 300 120" className="opacity-15">
            <ellipse cx="150" cy="60" rx="130" ry="50" fill="#1e293b" />
            <path d="M280,60 Q320,30 290,10 Q260,30 280,60" fill="#1e293b" />
            <circle cx="50" cy="50" r="8" fill="#0f172a" />
          </svg>
        </motion.div>
      </Parallax>

      {/* Deep particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-0.5 w-0.5 rounded-full bg-cyan-500/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, 80],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 12 + Math.random() * 8,
              repeat: Infinity,
              delay: Math.random() * 8,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-20">
        <Parallax speed={-5}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <h2 className="mb-2 text-lg font-medium uppercase tracking-widest text-slate-400">
              4,000m - 6,000m
            </h2>
            <h3 className="mb-6 text-4xl font-bold text-white md:text-5xl">
              Abyssal Zone
            </h3>
            <p className="mx-auto mb-12 max-w-xl text-white/50">
              The abyss. Crushing pressure, near-freezing temperatures.
              Giant creatures lurk in the endless darkness.
            </p>
          </motion.div>
        </Parallax>

        {/* Data panels */}
        <div className="grid max-w-4xl gap-4 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="rounded-xl border border-cyan-500/20 bg-slate-900/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/50 hover:bg-slate-800/70 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] cursor-pointer"
          >
            <h4 className="mb-4 font-mono text-sm uppercase tracking-wider text-cyan-400">
              Pressure Analysis
            </h4>
            <div className="space-y-4">
              <div>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-white/60">Current</span>
                  <span className="font-mono text-cyan-300">450 atm</span>
                </div>
                <div className="h-2 rounded-full bg-slate-800">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400"
                    initial={{ width: 0 }}
                    whileInView={{ width: "75%" }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                  />
                </div>
              </div>
              <div>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-white/60">Hull Integrity</span>
                  <span className="font-mono text-green-400">98.2%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-800">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-green-500 to-green-400"
                    initial={{ width: 0 }}
                    whileInView={{ width: "98%" }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="rounded-xl border border-cyan-500/20 bg-slate-900/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/50 hover:bg-slate-800/70 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] cursor-pointer"
          >
            <h4 className="mb-4 font-mono text-sm uppercase tracking-wider text-cyan-400">
              Environmental Data
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-slate-800/60 p-3 text-center">
                <p className="font-mono text-2xl font-bold text-blue-300">1.5°C</p>
                <p className="text-xs text-white/50">Temperature</p>
              </div>
              <div className="rounded-lg bg-slate-800/60 p-3 text-center">
                <p className="font-mono text-2xl font-bold text-purple-300">4,850m</p>
                <p className="text-xs text-white/50">Depth</p>
              </div>
              <div className="rounded-lg bg-slate-800/60 p-3 text-center">
                <p className="font-mono text-2xl font-bold text-amber-300">34.9‰</p>
                <p className="text-xs text-white/50">Salinity</p>
              </div>
              <div className="rounded-lg bg-slate-800/60 p-3 text-center">
                <p className="font-mono text-2xl font-bold text-red-300">0 lux</p>
                <p className="text-xs text-white/50">Light Level</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
