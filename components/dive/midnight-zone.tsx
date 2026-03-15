"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Parallax } from "react-scroll-parallax"
import { useState } from "react"
import { X } from "lucide-react"

const creatures = [
  {
    id: 1,
    name: "Anglerfish",
    depth: "1,000 - 4,000m",
    description: "Uses a bioluminescent lure to attract prey in complete darkness. Females can grow up to 1 meter long.",
    color: "#22d3ee",
    position: { x: 25, y: 40 },
  },
  {
    id: 2,
    name: "Vampire Squid",
    depth: "600 - 3,000m",
    description: "Despite its name, it feeds on marine snow. Has the largest eyes relative to body size of any animal.",
    color: "#f472b6",
    position: { x: 70, y: 30 },
  },
  {
    id: 3,
    name: "Barreleye Fish",
    depth: "600 - 2,500m",
    description: "Has a transparent head with tubular eyes that can rotate to look upward through its skull.",
    color: "#4ade80",
    position: { x: 45, y: 65 },
  },
]

export function MidnightZone() {
  const [selectedCreature, setSelectedCreature] = useState<typeof creatures[0] | null>(null)

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-indigo-950 via-slate-950 to-zinc-950">
      {/* Smooth top transition */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-indigo-950 to-transparent z-10" />
      
      {/* Darkness gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/50" />

      {/* Bioluminescent creatures */}
      {creatures.map((creature) => (
        <Parallax key={creature.id} speed={-5 + creature.id * 2}>
          <motion.button
            className="absolute cursor-pointer"
            style={{ left: `${creature.position.x}%`, top: `${creature.position.y}%` }}
            onClick={() => setSelectedCreature(creature)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Glow effect */}
            <motion.div
              className="absolute -inset-8 rounded-full blur-2xl"
              style={{ backgroundColor: creature.color }}
              animate={{
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: creature.id * 0.5,
              }}
            />
            {/* Core light */}
            <motion.div
              className="relative h-6 w-6 rounded-full"
              style={{ backgroundColor: creature.color, boxShadow: `0 0 30px ${creature.color}` }}
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
            {/* Label */}
            <span 
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium"
              style={{ color: creature.color }}
            >
              {creature.name}
            </span>
          </motion.button>
        </Parallax>
      ))}

      {/* Floating bioluminescent particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => {
          const color = ["#22d3ee", "#f472b6", "#4ade80", "#a78bfa"][i % 4]
          return (
            <motion.div
              key={i}
              className="absolute h-1 w-1 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: color,
                boxShadow: `0 0 8px ${color}`,
              }}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          )
        })}
      </div>

      {/* Drifting marine snow */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(60)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-0.5 w-0.5 rounded-full bg-white/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, 100],
              x: [0, Math.random() * 20 - 10],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 10,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-20">
        <Parallax speed={-6}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <h2 className="mb-2 text-lg font-medium uppercase tracking-widest text-indigo-300">
              1,000m - 4,000m
            </h2>
            <h3 className="mb-6 text-4xl font-bold text-white md:text-5xl">
              Midnight Zone
            </h3>
            <p className="mx-auto max-w-xl text-white/60">
              Complete darkness. No sunlight reaches here. 
              Click on the glowing creatures to learn more about life in eternal night.
            </p>
          </motion.div>
        </Parallax>
      </div>

      {/* Creature Info Modal */}
      <AnimatePresence>
        {selectedCreature && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            onClick={() => setSelectedCreature(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-md rounded-2xl border p-6"
              style={{ 
                backgroundColor: "rgba(15, 23, 42, 0.95)",
                borderColor: selectedCreature.color + "40",
                boxShadow: `0 0 60px ${selectedCreature.color}30`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedCreature(null)}
                className="absolute right-4 top-4 text-white/60 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div 
                className="mb-4 h-1 w-16 rounded"
                style={{ backgroundColor: selectedCreature.color }}
              />
              
              <h4 
                className="mb-1 text-2xl font-bold"
                style={{ color: selectedCreature.color }}
              >
                {selectedCreature.name}
              </h4>
              
              <p className="mb-4 font-mono text-sm text-white/50">
                Depth: {selectedCreature.depth}
              </p>
              
              <p className="text-white/80">
                {selectedCreature.description}
              </p>

              <div 
                className="mt-6 flex items-center gap-2 rounded-lg p-3"
                style={{ backgroundColor: selectedCreature.color + "15" }}
              >
                <div 
                  className="h-3 w-3 animate-pulse rounded-full"
                  style={{ backgroundColor: selectedCreature.color }}
                />
                <span className="text-sm" style={{ color: selectedCreature.color }}>
                  Bioluminescent species
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
