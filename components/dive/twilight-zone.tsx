"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Parallax } from "react-scroll-parallax"
import { useRef } from "react"

export function TwilightZone() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const submarineY = useTransform(scrollYProgress, [0, 1], ["-20%", "80%"])
  const submarineRotate = useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, -5])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[150vh] w-full overflow-hidden bg-gradient-to-b from-blue-800 via-blue-900 to-indigo-950"
    >
      {/* Smooth top transition */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-blue-800 to-transparent z-10" />
      {/* Fading light rays */}
      <Parallax speed={3}>
        <div className="absolute inset-0 overflow-hidden opacity-10">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute top-0 h-[60%] w-12 bg-gradient-to-b from-blue-400/30 to-transparent"
              style={{
                left: `${20 + i * 20}%`,
                transform: `rotate(${-5 + i * 3}deg)`,
              }}
            />
          ))}
        </div>
      </Parallax>

      {/* Jellyfish */}
      <Parallax speed={-8}>
        <div className="absolute left-[20%] top-[30%]">
          <motion.div
            animate={{
              y: [0, -30, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="relative">
              {/* Bell */}
              <div className="h-24 w-32 rounded-t-full bg-gradient-to-b from-pink-400/60 to-purple-500/40 backdrop-blur-sm" />
              {/* Tentacles */}
              <div className="flex justify-center gap-2">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-32 w-1 rounded-full bg-gradient-to-b from-pink-400/50 to-transparent"
                    animate={{
                      rotate: [-10, 10, -10],
                      scaleY: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </div>
              {/* Glow */}
              <div className="absolute -inset-4 rounded-full bg-pink-500/20 blur-xl" />
            </div>
          </motion.div>
        </div>
      </Parallax>

      {/* Second jellyfish */}
      <Parallax speed={-12}>
        <div className="absolute right-[15%] top-[50%]">
          <motion.div
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.03, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          >
            <div className="relative scale-75">
              <div className="h-20 w-28 rounded-t-full bg-gradient-to-b from-cyan-400/50 to-blue-500/30 backdrop-blur-sm" />
              <div className="flex justify-center gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-24 w-0.5 rounded-full bg-gradient-to-b from-cyan-400/40 to-transparent"
                    animate={{ rotate: [-8, 8, -8] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
              </div>
              <div className="absolute -inset-3 rounded-full bg-cyan-400/15 blur-lg" />
            </div>
          </motion.div>
        </div>
      </Parallax>

      {/* Submarine */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2"
        style={{ top: submarineY, rotate: submarineRotate }}
      >
        <div className="relative">
          {/* Hull */}
          <div className="relative h-20 w-48 rounded-full bg-gradient-to-b from-amber-600 to-amber-800">
            {/* Window */}
            <div className="absolute left-8 top-4 h-12 w-12 rounded-full border-4 border-amber-900 bg-gradient-to-br from-cyan-300/80 to-cyan-500/60">
              <div className="absolute inset-1 rounded-full bg-cyan-400/20" />
            </div>
            {/* Details */}
            <div className="absolute right-6 top-6 h-3 w-16 rounded bg-amber-900/60" />
            <div className="absolute right-8 top-11 h-2 w-12 rounded bg-amber-900/40" />
          </div>
          {/* Conning tower */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2">
            <div className="h-10 w-16 rounded-t-lg bg-gradient-to-b from-amber-500 to-amber-700" />
            <div className="absolute -top-2 left-1/2 h-6 w-1 -translate-x-1/2 rounded bg-amber-400" />
          </div>
          {/* Propeller */}
          <motion.div
            className="absolute -right-6 top-1/2 -translate-y-1/2"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
          >
            <div className="h-12 w-3 rounded bg-amber-900">
              <div className="absolute -top-1 left-1/2 h-4 w-8 -translate-x-1/2 rounded bg-amber-700" />
              <div className="absolute -bottom-1 left-1/2 h-4 w-8 -translate-x-1/2 rounded bg-amber-700" />
            </div>
          </motion.div>
          {/* Lights */}
          <motion.div
            className="absolute -bottom-2 left-6 h-4 w-4 rounded-full bg-yellow-300"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <div className="absolute -bottom-4 left-4 h-20 w-20 bg-gradient-to-b from-yellow-200/30 to-transparent blur-md"
            style={{ clipPath: "polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)" }}
          />
          {/* Bubble trail */}
          <div className="absolute -left-8 top-1/2">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-2 w-2 rounded-full bg-white/40"
                style={{ left: -i * 12 }}
                animate={{
                  y: [0, -20],
                  opacity: [0.6, 0],
                  scale: [1, 1.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Particles */}
      <div className="absolute inset-0">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-0.5 w-0.5 rounded-full bg-white/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, 50],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-20">
        <Parallax speed={-8}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <h2 className="mb-2 text-lg font-medium uppercase tracking-widest text-blue-300">
              200m - 1,000m
            </h2>
            <h3 className="mb-6 text-4xl font-bold text-white md:text-5xl">
              Twilight Zone
            </h3>
            <p className="mx-auto max-w-xl text-white/70">
              Light fades rapidly. Bioluminescence becomes the primary source of illumination.
              Many creatures migrate vertically through this zone daily.
            </p>
          </motion.div>
        </Parallax>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 rounded-xl border border-blue-500/30 bg-blue-900/50 p-6 backdrop-blur-sm"
        >
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="font-mono text-3xl font-bold text-blue-300">-18°C</p>
              <p className="text-sm text-blue-400">Temperature</p>
            </div>
            <div className="h-12 w-px bg-blue-500/30" />
            <div className="text-center">
              <p className="font-mono text-3xl font-bold text-blue-300">100 atm</p>
              <p className="text-sm text-blue-400">Pressure</p>
            </div>
            <div className="h-12 w-px bg-blue-500/30" />
            <div className="text-center">
              <p className="font-mono text-3xl font-bold text-blue-300">1%</p>
              <p className="text-sm text-blue-400">Sunlight</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
