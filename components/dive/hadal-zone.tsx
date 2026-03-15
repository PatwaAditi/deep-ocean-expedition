"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Parallax } from "react-scroll-parallax"
import { useRef, useState, useEffect } from "react"

const missionLogs = [
  { time: "14:32:08", event: "Entering Hadal Zone", type: "info" },
  { time: "14:45:21", event: "Unknown species detected on sonar", type: "discovery" },
  { time: "15:02:47", event: "Pressure at maximum operational threshold", type: "warning" },
  { time: "15:18:33", event: "New amphipod species confirmed!", type: "discovery" },
  { time: "15:34:12", event: "Reached 10,994m - Challenger Deep", type: "milestone" },
]

const discoveries = [
  { name: "Mariana Snailfish", depth: "8,178m", status: "Deepest fish ever recorded" },
  { name: "Supergiant Amphipod", depth: "10,000m", status: "34cm crustacean" },
  { name: "Xenophyophores", depth: "10,641m", status: "Giant single-celled organisms" },
]

export function HadalZone() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const trenchDepth = useTransform(scrollYProgress, [0.2, 0.8], [0, 100])
  const lightOpacity = useTransform(scrollYProgress, [0.5, 0.8], [0, 1])
  const depthOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1])
  
  const [depthDisplay, setDepthDisplay] = useState("6,000m")
  
  useEffect(() => {
    const unsubscribe = trenchDepth.on("change", (v) => {
      setDepthDisplay(`${Math.round(6000 + v * 49.94).toLocaleString()}m`)
    })
    return () => unsubscribe()
  }, [trenchDepth])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[150vh] w-full overflow-hidden bg-gradient-to-b from-stone-950 to-black"
    >
      {/* Smooth top transition */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-stone-950 to-transparent z-10" />
      
      {/* Trench walls */}
      <div className="absolute inset-0">
        <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="trenchGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1c1917" />
              <stop offset="100%" stopColor="#000" />
            </linearGradient>
          </defs>
          {/* Left wall */}
          <path
            d="M0,0 L30,0 L25,100 L0,100 Z"
            fill="url(#trenchGrad)"
          />
          {/* Right wall */}
          <path
            d="M100,0 L70,0 L75,100 L100,100 Z"
            fill="url(#trenchGrad)"
          />
        </svg>
      </div>

      {/* Sediment particles at bottom */}
      <Parallax speed={8}>
        <div className="absolute bottom-0 left-0 right-0 h-40">
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-stone-700"
              style={{
                left: `${25 + Math.random() * 50}%`,
                bottom: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, 10, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>
      </Parallax>

      {/* Submarine light cone at bottom */}
      <motion.div
        className="absolute bottom-20 left-1/2 -translate-x-1/2"
        style={{ opacity: lightOpacity }}
      >
        <div 
          className="h-60 w-40 bg-gradient-to-b from-yellow-200/20 to-transparent blur-sm"
          style={{ clipPath: "polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)" }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-20">
        <Parallax speed={-4}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <h2 className="mb-2 text-lg font-medium uppercase tracking-widest text-stone-400">
              6,000m - 11,000m
            </h2>
            <h3 className="mb-6 text-4xl font-bold text-white md:text-5xl">
              Hadal Zone
            </h3>
            <p className="mx-auto mb-4 max-w-xl text-white/50">
              The deepest trenches on Earth. Challenger Deep: 10,994 meters below sea level.
              Pressure exceeds 1,000 atmospheres.
            </p>
            <motion.p
              className="font-mono text-5xl font-bold text-cyan-400"
              style={{ opacity: depthOpacity }}
            >
              {depthDisplay}
            </motion.p>
          </motion.div>
        </Parallax>

        {/* Mission Log */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-12 w-full max-w-2xl"
        >
          <h4 className="mb-4 font-mono text-sm uppercase tracking-wider text-cyan-400">
            Mission Log
          </h4>
          <div className="space-y-2 rounded-xl border border-stone-800 bg-black/60 p-4 backdrop-blur-sm">
            {missionLogs.map((log, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="flex items-center gap-3 rounded-lg border border-stone-800/50 bg-stone-900/30 px-4 py-2 transition-all duration-300 hover:border-stone-600 hover:bg-stone-800/50 cursor-pointer"
              >
                <span className="font-mono text-xs text-stone-500">{log.time}</span>
                <span 
                  className={`h-2 w-2 rounded-full ${
                    log.type === "discovery" ? "bg-green-500" :
                    log.type === "warning" ? "bg-amber-500" :
                    log.type === "milestone" ? "bg-cyan-500" : "bg-blue-500"
                  }`}
                />
                <span className="text-sm text-white/80">{log.event}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Discoveries */}
        <div className="mt-12 w-full max-w-4xl">
          <h4 className="mb-4 font-mono text-sm uppercase tracking-wider text-green-400">
            Rare Species Discovered
          </h4>
          <div className="grid gap-4 md:grid-cols-3">
            {discoveries.map((species, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="rounded-xl border border-green-500/20 bg-green-950/30 p-4 backdrop-blur-sm transition-all duration-300 hover:border-green-400/50 hover:bg-green-900/40 hover:shadow-[0_0_25px_rgba(74,222,128,0.15)] cursor-pointer"
              >
                <div className="mb-2 flex items-center gap-2">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                  <span className="text-xs text-green-400">NEW DISCOVERY</span>
                </div>
                <h5 className="mb-1 font-semibold text-white">{species.name}</h5>
                <p className="mb-2 font-mono text-xs text-green-300">{species.depth}</p>
                <p className="text-sm text-white/60">{species.status}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Complete Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 mx-auto mb-20 max-w-xl rounded-2xl border border-cyan-500/30 bg-gradient-to-b from-cyan-950/80 to-slate-950/80 p-8 text-center backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/60 hover:shadow-[0_0_40px_rgba(34,211,238,0.2)] cursor-pointer"
      >
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2">
          <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
          <span className="font-mono text-sm text-cyan-400">MISSION COMPLETE</span>
        </div>
        <h4 className="mb-2 text-2xl font-bold text-white">Challenger Deep Reached</h4>
        <p className="mb-4 font-mono text-4xl font-bold text-cyan-400">10,994m</p>
        <p className="text-white/60">
          You have descended to the deepest point on Earth.
          The pressure here is over 1,000 times atmospheric pressure at sea level.
        </p>
      </motion.div>
    </section>
  )
}
