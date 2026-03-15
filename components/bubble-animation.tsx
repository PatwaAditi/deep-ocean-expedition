"use client"

import { useEffect, useState } from "react"

interface Bubble {
  id: number
  x: number
  size: number
  delay: number
  duration: number
}

export function BubbleAnimation() {
  const [bubbles, setBubbles] = useState<Bubble[]>([])

  useEffect(() => {
    const initialBubbles: Bubble[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 2 + Math.random() * 6,
      delay: Math.random() * 10,
      duration: 8 + Math.random() * 12,
    }))
    setBubbles(initialBubbles)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute bottom-0 rounded-full bg-primary/10 animate-[rise_linear_infinite]"
          style={{
            left: `${bubble.x}%`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            animationDuration: `${bubble.duration}s`,
            animationDelay: `${bubble.delay}s`,
            boxShadow: `inset 0 0 ${bubble.size / 2}px rgba(var(--color-primary), 0.3)`,
          }}
        />
      ))}
    </div>
  )
}
