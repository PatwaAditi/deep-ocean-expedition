"use client"

import { useEffect, useState } from "react"
import { Video, Circle } from "lucide-react"

export function ROVCameraFeed() {
  const [depth, setDepth] = useState(2847)
  const [temperature, setTemperature] = useState(2.3)
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setDepth((d) => Math.max(0, d + (Math.random() - 0.5) * 10))
      setTemperature((t) => Math.max(-2, Math.min(30, t + (Math.random() - 0.5) * 0.2)))
      setTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-full overflow-hidden rounded-lg border border-border bg-ocean-deep">
      {/* Simulated underwater scene */}
      <div className="absolute inset-0">
        {/* Dark gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-surface/20 via-ocean-deep to-ocean-deep" />
        
        {/* Particles / Marine snow effect */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute h-0.5 w-0.5 rounded-full bg-foreground/20 animate-[float_8s_linear_infinite]"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${6 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* Simulated seafloor elements */}
        <svg className="absolute bottom-0 left-0 h-32 w-full opacity-30" preserveAspectRatio="none">
          <defs>
            <linearGradient id="seafloorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="100%" stopColor="var(--color-muted)" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <path
            d="M0,80 Q50,60 100,75 T200,70 T300,80 T400,65 T500,75 L500,128 L0,128 Z"
            fill="url(#seafloorGrad)"
          />
        </svg>

        {/* Light cone from ROV */}
        <div className="absolute left-1/2 top-0 h-full w-[300px] -translate-x-1/2 bg-gradient-to-b from-primary/5 via-primary/2 to-transparent" 
             style={{ clipPath: "polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)" }} />
      </div>

      {/* Scan lines overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.1)_2px,rgba(0,0,0,0.1)_4px)]" />

      {/* Camera UI Overlay */}
      <div className="absolute inset-0 p-3">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 rounded bg-destructive/80 px-2 py-1">
            <Circle className="h-2 w-2 animate-pulse fill-current text-foreground" />
            <span className="font-mono text-xs font-semibold text-foreground">REC</span>
          </div>
          <div className="rounded bg-card/80 px-2 py-1 font-mono text-xs text-foreground backdrop-blur-sm">
            {time.toLocaleTimeString()}
          </div>
        </div>

        {/* Corner brackets */}
        <div className="absolute left-6 top-10 h-8 w-8 border-l-2 border-t-2 border-primary/60" />
        <div className="absolute right-6 top-10 h-8 w-8 border-r-2 border-t-2 border-primary/60" />
        <div className="absolute bottom-10 left-6 h-8 w-8 border-b-2 border-l-2 border-primary/60" />
        <div className="absolute bottom-10 right-6 h-8 w-8 border-b-2 border-r-2 border-primary/60" />

        {/* Center crosshair */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="h-px w-6 bg-primary/60" />
          <div className="absolute left-1/2 top-1/2 h-6 w-px -translate-x-1/2 -translate-y-1/2 bg-primary/60" />
          <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/60" />
        </div>

        {/* Data overlay - Bottom left */}
        <div className="absolute bottom-3 left-3 space-y-1 rounded bg-card/80 p-2 font-mono text-xs backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <Video className="h-3 w-3 text-primary" />
            <span className="text-muted-foreground">ROV-1 CAM</span>
          </div>
          <p className="text-foreground">
            <span className="text-muted-foreground">DEPTH:</span> {depth.toFixed(1)}m
          </p>
          <p className="text-foreground">
            <span className="text-muted-foreground">TEMP:</span> {temperature.toFixed(1)}°C
          </p>
          <p className="text-foreground">
            <span className="text-muted-foreground">VIS:</span> 12m
          </p>
        </div>

        {/* Coordinates - Bottom right */}
        <div className="absolute bottom-3 right-3 rounded bg-card/80 p-2 font-mono text-xs backdrop-blur-sm">
          <p className="text-foreground">11°21.12'N</p>
          <p className="text-foreground">142°12.04'E</p>
        </div>
      </div>

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.5)_100%)]" />
    </div>
  )
}
