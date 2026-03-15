"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useState } from "react"

export function DepthIndicator() {
  const [mounted, setMounted] = useState(false)
  const [currentDepth, setCurrentDepth] = useState(0)
  const [currentPressure, setCurrentPressure] = useState(1)
  const [currentTemperature, setCurrentTemperature] = useState(25)
  
  const { scrollYProgress } = useScroll()
  
  const depth = useTransform(scrollYProgress, [0, 1], [0, 11000])
  const pressure = useTransform(scrollYProgress, [0, 1], [1, 1100])
  const temperature = useTransform(scrollYProgress, [0, 1], [25, 1])
  const heightPercent = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  useEffect(() => {
    setMounted(true)
    
    const unsubDepth = depth.on("change", (v) => setCurrentDepth(Math.round(v)))
    const unsubPressure = pressure.on("change", (v) => setCurrentPressure(Math.round(v)))
    const unsubTemp = temperature.on("change", (v) => setCurrentTemperature(v))
    
    return () => {
      unsubDepth()
      unsubPressure()
      unsubTemp()
    }
  }, [depth, pressure, temperature])

  const getZoneName = (d: number) => {
    if (d < 200) return "Epipelagic"
    if (d < 1000) return "Mesopelagic"
    if (d < 4000) return "Bathypelagic"
    if (d < 6000) return "Abyssopelagic"
    return "Hadopelagic"
  }

  if (!mounted) return null

  return (
    <motion.div
      className="fixed left-4 top-1/2 z-50 -translate-y-1/2 md:left-6"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <div className="rounded-xl border border-cyan-500/30 bg-slate-950/80 p-4 backdrop-blur-sm">
        {/* Depth */}
        <div className="mb-4">
          <p className="mb-1 text-[10px] uppercase tracking-wider text-cyan-400">Depth</p>
          <p className="w-24 font-mono text-xl font-bold tabular-nums text-white">
            {currentDepth.toLocaleString()}m
          </p>
        </div>

        {/* Visual depth bar */}
        <div className="mb-4 h-40 w-3 overflow-hidden rounded-full bg-slate-800">
          <motion.div
            className="w-full rounded-full bg-gradient-to-b from-cyan-400 via-blue-500 to-indigo-600"
            style={{ height: heightPercent }}
          />
        </div>

        {/* Zone indicator */}
        <div className="mb-4">
          <p className="mb-1 text-[10px] uppercase tracking-wider text-cyan-400">Zone</p>
          <p className="text-xs font-medium text-white">
            {getZoneName(currentDepth)}
          </p>
        </div>

        {/* Stats */}
        <div className="space-y-2 border-t border-cyan-500/20 pt-4">
          <div>
            <p className="text-[10px] text-cyan-400/60">Pressure</p>
            <p className="font-mono text-xs text-white/80">
              {currentPressure} atm
            </p>
          </div>
          <div>
            <p className="text-[10px] text-cyan-400/60">Temp</p>
            <p className="font-mono text-xs text-white/80">
              {currentTemperature.toFixed(1)}°C
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
