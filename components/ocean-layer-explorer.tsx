"use client"

import { useState } from "react"

const oceanLayers = [
  { name: "Epipelagic", alias: "Sunlight Zone", depth: "0-200m", color: "from-[#0077be] to-[#005a8e]", creatures: "Dolphins, Tuna, Jellyfish", temp: "20-25°C" },
  { name: "Mesopelagic", alias: "Twilight Zone", depth: "200-1000m", color: "from-[#005a8e] to-[#003d5c]", creatures: "Lanternfish, Squid, Swordfish", temp: "5-20°C" },
  { name: "Bathypelagic", alias: "Midnight Zone", depth: "1000-4000m", color: "from-[#003d5c] to-[#001f2e]", creatures: "Giant Squid, Anglerfish, Viperfish", temp: "4°C" },
  { name: "Abyssopelagic", alias: "Abyss Zone", depth: "4000-6000m", color: "from-[#001f2e] to-[#000f17]", creatures: "Dumbo Octopus, Sea Pig, Tripod Fish", temp: "1-4°C" },
  { name: "Hadopelagic", alias: "Hadal Zone", depth: "6000-11000m", color: "from-[#000f17] to-[#000509]", creatures: "Snailfish, Amphipods", temp: "1-4°C" },
]

export function OceanLayerExplorer() {
  const [selectedLayer, setSelectedLayer] = useState<number | null>(null)
  const [currentDepth, setCurrentDepth] = useState(2847)

  const getLayerIndex = (depth: number) => {
    if (depth < 200) return 0
    if (depth < 1000) return 1
    if (depth < 4000) return 2
    if (depth < 6000) return 3
    return 4
  }

  const currentLayerIndex = getLayerIndex(currentDepth)
  const depthPercentage = Math.min((currentDepth / 11000) * 100, 100)

  return (
    <div className="flex h-full flex-col rounded-lg border border-border bg-card p-4">
      <div className="mb-3 flex items-center gap-2">
        <h3 className="font-mono text-sm font-semibold uppercase tracking-wider text-foreground">
          Ocean Layers
        </h3>
      </div>

      <div className="relative flex-1">
        {/* Layer visualization */}
        <div className="relative h-full w-full overflow-hidden rounded-lg">
          {oceanLayers.map((layer, index) => (
            <button
              key={layer.name}
              className={`relative w-full transition-all duration-300 hover:brightness-110 ${
                selectedLayer === index ? "ring-1 ring-primary ring-inset" : ""
              }`}
              style={{ height: `${100 / oceanLayers.length}%` }}
              onClick={() => setSelectedLayer(selectedLayer === index ? null : index)}
            >
              <div className={`absolute inset-0 bg-gradient-to-b ${layer.color}`} />
              <div className="absolute inset-0 flex items-center justify-between px-3">
                <div className="text-left">
                  <p className="text-xs font-semibold text-foreground/90">{layer.name}</p>
                  <p className="text-xs text-foreground/60">{layer.alias}</p>
                </div>
                <p className="text-xs font-mono text-foreground/70">{layer.depth}</p>
              </div>
              
              {/* Current depth indicator */}
              {currentLayerIndex === index && (
                <div
                  className="absolute left-0 right-0 h-0.5 bg-warning shadow-[0_0_8px_var(--color-warning)]"
                  style={{
                    top: `${((currentDepth - (index === 0 ? 0 : [0, 200, 1000, 4000, 6000][index])) / 
                          ([200, 800, 3000, 2000, 5000][index])) * 100}%`
                  }}
                >
                  <div className="absolute -right-1 -top-1.5 whitespace-nowrap rounded bg-warning px-1 text-xs font-bold text-background">
                    {currentDepth}m
                  </div>
                </div>
              )}
            </button>
          ))}

          {/* Submarine icon */}
          <div 
            className="pointer-events-none absolute left-2 z-10 transition-all duration-1000"
            style={{ top: `${depthPercentage}%`, transform: "translateY(-50%)" }}
          >
            <svg width="24" height="12" viewBox="0 0 24 12" className="fill-warning drop-shadow-[0_0_6px_var(--color-warning)]">
              <ellipse cx="12" cy="6" rx="10" ry="5" />
              <circle cx="16" cy="6" r="2" className="fill-background/50" />
              <rect x="20" y="4" width="4" height="4" rx="1" />
              <rect x="10" y="2" width="2" height="2" rx="0.5" />
            </svg>
          </div>
        </div>

        {/* Selected layer info */}
        {selectedLayer !== null && (
          <div className="absolute inset-x-0 bottom-0 rounded-b-lg bg-card/95 p-3 backdrop-blur-sm border-t border-border">
            <h4 className="font-semibold text-foreground">{oceanLayers[selectedLayer].name}</h4>
            <p className="text-xs text-muted-foreground">{oceanLayers[selectedLayer].alias} • {oceanLayers[selectedLayer].depth}</p>
            <div className="mt-2 flex gap-4 text-xs">
              <div>
                <span className="text-muted-foreground">Temp: </span>
                <span className="text-foreground">{oceanLayers[selectedLayer].temp}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Life: </span>
                <span className="text-foreground">{oceanLayers[selectedLayer].creatures}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Depth slider */}
      <div className="mt-3 pt-3 border-t border-border">
        <label className="text-xs text-muted-foreground">Simulate Depth</label>
        <input
          type="range"
          min="0"
          max="11000"
          value={currentDepth}
          onChange={(e) => setCurrentDepth(Number(e.target.value))}
          className="w-full accent-primary"
        />
      </div>
    </div>
  )
}
