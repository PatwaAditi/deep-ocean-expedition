"use client"

import { useState } from "react"

const explorationZones = [
  { id: 1, name: "Mariana Trench", lat: 11.35, lng: 142.2, depth: 10994, status: "active" },
  { id: 2, name: "Puerto Rico Trench", lat: 19.7, lng: -67.5, depth: 8376, status: "completed" },
  { id: 3, name: "Java Trench", lat: -10.2, lng: 114.5, depth: 7725, status: "pending" },
  { id: 4, name: "Philippine Trench", lat: 10.5, lng: 126.6, depth: 10540, status: "active" },
  { id: 5, name: "Tonga Trench", lat: -22.5, lng: -174.7, depth: 10882, status: "pending" },
]

export function OceanMap() {
  const [selectedZone, setSelectedZone] = useState<number | null>(null)

  const latToY = (lat: number) => ((90 - lat) / 180) * 100
  const lngToX = (lng: number) => ((lng + 180) / 360) * 100

  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg bg-ocean-deep">
      {/* Animated ocean background */}
      <div className="absolute inset-0 opacity-30">
        <svg className="h-full w-full" preserveAspectRatio="none">
          <defs>
            <pattern id="oceanGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary/20" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#oceanGrid)" />
        </svg>
      </div>

      {/* Simplified world map outline */}
      <svg viewBox="0 0 100 50" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--color-ocean-surface)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--color-ocean-deep)" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <rect width="100" height="50" fill="url(#oceanGradient)" />
        
        {/* Continents simplified */}
        <g className="fill-muted/40 stroke-border" strokeWidth="0.1">
          {/* North America */}
          <path d="M5,8 Q15,5 20,10 L25,8 L30,12 L28,18 L22,22 L18,20 L12,25 L8,22 L5,15 Z" />
          {/* South America */}
          <path d="M18,26 L22,24 L26,28 L28,35 L24,42 L20,40 L18,32 Z" />
          {/* Europe/Africa */}
          <path d="M42,8 L48,6 L52,10 L50,14 L46,12 L44,15 L46,22 L50,28 L48,38 L42,42 L38,35 L40,25 L38,18 L42,12 Z" />
          {/* Asia */}
          <path d="M52,6 L65,4 L78,8 L85,12 L88,18 L82,22 L75,18 L68,20 L60,18 L55,22 L50,18 L52,12 Z" />
          {/* Australia */}
          <path d="M75,30 L85,28 L90,32 L88,38 L80,40 L75,36 Z" />
        </g>
      </svg>

      {/* Exploration zones */}
      {explorationZones.map((zone) => (
        <button
          key={zone.id}
          className="group absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none"
          style={{
            left: `${lngToX(zone.lng)}%`,
            top: `${latToY(zone.lat)}%`,
          }}
          onClick={() => setSelectedZone(selectedZone === zone.id ? null : zone.id)}
        >
          {/* Pulse animation */}
          <span
            className={`absolute inset-0 -m-2 animate-ping rounded-full ${
              zone.status === "active" ? "bg-success" : zone.status === "completed" ? "bg-primary" : "bg-warning"
            } opacity-40`}
          />
          <span
            className={`relative block h-3 w-3 rounded-full border-2 border-foreground/50 ${
              zone.status === "active" ? "bg-success" : zone.status === "completed" ? "bg-primary" : "bg-warning"
            }`}
          />
          
          {/* Tooltip */}
          {selectedZone === zone.id && (
            <div className="absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-card p-2 text-xs shadow-lg">
              <p className="font-semibold text-foreground">{zone.name}</p>
              <p className="text-muted-foreground">Depth: {zone.depth.toLocaleString()}m</p>
              <p className={`capitalize ${zone.status === "active" ? "text-success" : zone.status === "completed" ? "text-primary" : "text-warning"}`}>
                {zone.status}
              </p>
            </div>
          )}
        </button>
      ))}

      {/* Sonar scan line animation */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute h-full w-1 animate-[scan_4s_linear_infinite] bg-gradient-to-r from-transparent via-sonar/30 to-transparent" />
      </div>

      {/* Legend */}
      <div className="absolute bottom-2 left-2 flex gap-3 rounded-md bg-card/80 p-2 text-xs backdrop-blur-sm">
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-success" />
          <span className="text-muted-foreground">Active</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-primary" />
          <span className="text-muted-foreground">Completed</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-warning" />
          <span className="text-muted-foreground">Pending</span>
        </div>
      </div>
    </div>
  )
}
