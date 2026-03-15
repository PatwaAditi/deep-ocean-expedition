"use client"

import { useEffect, useState } from "react"

interface Blip {
  id: number
  angle: number
  distance: number
  type: "fish" | "debris" | "structure"
}

export function SonarScanner() {
  const [blips, setBlips] = useState<Blip[]>([])
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    const rotationInterval = setInterval(() => {
      setRotation((r) => (r + 3) % 360)
    }, 50)

    const blipInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newBlip: Blip = {
          id: Date.now(),
          angle: Math.random() * 360,
          distance: 20 + Math.random() * 70,
          type: ["fish", "debris", "structure"][Math.floor(Math.random() * 3)] as Blip["type"],
        }
        setBlips((prev) => [...prev.slice(-15), newBlip])
      }
    }, 500)

    return () => {
      clearInterval(rotationInterval)
      clearInterval(blipInterval)
    }
  }, [])

  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden rounded-lg border border-border bg-card p-4">
      <div className="flex items-center gap-2 absolute top-3 left-3">
        <div className="h-2 w-2 animate-pulse rounded-full bg-sonar" />
        <h3 className="font-mono text-sm font-semibold uppercase tracking-wider text-foreground">
          Sonar
        </h3>
      </div>

      <div className="relative aspect-square w-full max-w-[200px]">
        {/* Background circles */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 200 200">
          <defs>
            <radialGradient id="sonarGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--color-sonar)" stopOpacity="0.1" />
              <stop offset="100%" stopColor="var(--color-ocean-deep)" stopOpacity="0.3" />
            </radialGradient>
          </defs>
          
          <circle cx="100" cy="100" r="95" fill="url(#sonarGradient)" stroke="var(--color-border)" strokeWidth="1" />
          <circle cx="100" cy="100" r="70" fill="none" stroke="var(--color-sonar)" strokeWidth="0.5" strokeOpacity="0.3" />
          <circle cx="100" cy="100" r="45" fill="none" stroke="var(--color-sonar)" strokeWidth="0.5" strokeOpacity="0.3" />
          <circle cx="100" cy="100" r="20" fill="none" stroke="var(--color-sonar)" strokeWidth="0.5" strokeOpacity="0.3" />
          
          {/* Cross lines */}
          <line x1="100" y1="5" x2="100" y2="195" stroke="var(--color-sonar)" strokeWidth="0.5" strokeOpacity="0.2" />
          <line x1="5" y1="100" x2="195" y2="100" stroke="var(--color-sonar)" strokeWidth="0.5" strokeOpacity="0.2" />
          <line x1="30" y1="30" x2="170" y2="170" stroke="var(--color-sonar)" strokeWidth="0.5" strokeOpacity="0.15" />
          <line x1="170" y1="30" x2="30" y2="170" stroke="var(--color-sonar)" strokeWidth="0.5" strokeOpacity="0.15" />
        </svg>

        {/* Sweep line */}
        <div
          className="absolute left-1/2 top-1/2 h-[95px] w-0.5 origin-bottom"
          style={{
            transform: `translateX(-50%) rotate(${rotation}deg)`,
          }}
        >
          <div className="h-full w-full bg-gradient-to-t from-sonar to-transparent opacity-80" />
        </div>

        {/* Sweep trail */}
        <div
          className="absolute left-1/2 top-1/2 h-[95px] w-[95px] origin-bottom-left"
          style={{
            transform: `translateX(-50%) translateY(-100%) rotate(${rotation}deg)`,
            background: `conic-gradient(from -90deg, transparent 0deg, var(--color-sonar) 30deg, transparent 60deg)`,
            opacity: 0.15,
            borderRadius: "100% 0 0 0",
          }}
        />

        {/* Center dot */}
        <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sonar shadow-[0_0_10px_var(--color-sonar)]" />

        {/* Blips */}
        {blips.map((blip) => {
          const x = 100 + Math.cos((blip.angle * Math.PI) / 180) * blip.distance
          const y = 100 + Math.sin((blip.angle * Math.PI) / 180) * blip.distance
          return (
            <div
              key={blip.id}
              className={`absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full animate-pulse ${
                blip.type === "fish" ? "bg-success" : blip.type === "debris" ? "bg-warning" : "bg-primary"
              }`}
              style={{
                left: `${(x / 200) * 100}%`,
                top: `${(y / 200) * 100}%`,
                boxShadow: `0 0 6px ${blip.type === "fish" ? "var(--color-success)" : blip.type === "debris" ? "var(--color-warning)" : "var(--color-primary)"}`,
              }}
            />
          )
        })}
      </div>

      {/* Legend */}
      <div className="absolute bottom-2 right-2 flex flex-col gap-1 text-xs">
        <div className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          <span className="text-muted-foreground">Fish</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-warning" />
          <span className="text-muted-foreground">Debris</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          <span className="text-muted-foreground">Structure</span>
        </div>
      </div>
    </div>
  )
}
