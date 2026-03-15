"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useState } from "react"

interface Bubble {
  id: number
  x: number
  size: number
  delay: number
  duration: number
}

export function ParallaxBubbles() {
  const [bubbles, setBubbles] = useState<Bubble[]>([])
  const { scrollYProgress } = useScroll()
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 0.4, 0.2, 0.1])

  useEffect(() => {
    const generated: Bubble[] = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 4 + Math.random() * 12,
      delay: Math.random() * 10,
      duration: 8 + Math.random() * 12,
    }))
    setBubbles(generated)
  }, [])

  return (
    <motion.div 
      className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
      style={{ opacity }}
    >
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full border border-white/30 bg-white/10"
          style={{
            left: `${bubble.x}%`,
            width: bubble.size,
            height: bubble.size,
          }}
          initial={{ bottom: "-10%", opacity: 0 }}
          animate={{
            bottom: "110%",
            opacity: [0, 0.6, 0.4, 0],
          }}
          transition={{
            duration: bubble.duration,
            repeat: Infinity,
            delay: bubble.delay,
            ease: "linear",
          }}
        />
      ))}
    </motion.div>
  )
}
