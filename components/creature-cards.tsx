"use client"

import { useState } from "react"
import { X, Fish, Ruler, Thermometer, MapPin } from "lucide-react"

const creatures = [
  {
    id: 1,
    name: "Giant Squid",
    scientificName: "Architeuthis dux",
    depth: "300-1000m",
    size: "Up to 13m",
    temperature: "3-12°C",
    location: "Worldwide deep oceans",
    description: "One of the largest invertebrates, with eyes the size of dinner plates. Rarely observed alive in its natural habitat.",
    rarity: "Rare",
    discovered: "1857",
  },
  {
    id: 2,
    name: "Anglerfish",
    scientificName: "Lophiiformes",
    depth: "200-2000m",
    size: "20cm - 1m",
    temperature: "1-4°C",
    location: "Atlantic & Antarctic",
    description: "Famous for their bioluminescent lure used to attract prey in the darkness of the deep ocean.",
    rarity: "Uncommon",
    discovered: "1833",
  },
  {
    id: 3,
    name: "Dumbo Octopus",
    scientificName: "Grimpoteuthis",
    depth: "3000-4000m",
    size: "20-30cm",
    temperature: "2-4°C",
    location: "Worldwide abyssal plains",
    description: "Named after Disney's Dumbo due to ear-like fins. One of the deepest-living octopus species.",
    rarity: "Rare",
    discovered: "1932",
  },
  {
    id: 4,
    name: "Snailfish",
    scientificName: "Pseudoliparis",
    depth: "6000-8200m",
    size: "Up to 30cm",
    temperature: "1-2°C",
    location: "Mariana Trench",
    description: "The deepest-living fish ever recorded, thriving in the extreme pressure of hadal trenches.",
    rarity: "Very Rare",
    discovered: "2017",
  },
]

export function CreatureCards() {
  const [selectedCreature, setSelectedCreature] = useState<typeof creatures[0] | null>(null)

  return (
    <>
      <div className="grid h-full grid-cols-2 gap-3 overflow-y-auto rounded-lg border border-border bg-card p-3">
        <div className="col-span-2 flex items-center gap-2 pb-1">
          <Fish className="h-4 w-4 text-primary" />
          <h3 className="font-mono text-sm font-semibold uppercase tracking-wider text-foreground">
            Species Database
          </h3>
        </div>
        
        {creatures.map((creature) => (
          <button
            key={creature.id}
            onClick={() => setSelectedCreature(creature)}
            className="group relative overflow-hidden rounded-lg border border-border bg-muted/30 p-3 text-left transition-all hover:border-primary/50 hover:bg-muted/50"
          >
            {/* Creature silhouette placeholder */}
            <div className="mb-2 flex h-16 items-center justify-center rounded bg-ocean-deep/50">
              <Fish className="h-8 w-8 text-primary/40 transition-colors group-hover:text-primary/60" />
            </div>
            
            <h4 className="font-semibold text-foreground text-sm">{creature.name}</h4>
            <p className="text-xs italic text-muted-foreground">{creature.scientificName}</p>
            
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{creature.depth}</span>
              <span className={`rounded px-1.5 py-0.5 text-xs font-medium ${
                creature.rarity === "Very Rare" ? "bg-destructive/20 text-destructive" :
                creature.rarity === "Rare" ? "bg-warning/20 text-warning" :
                "bg-primary/20 text-primary"
              }`}>
                {creature.rarity}
              </span>
            </div>
            
            {/* Glow effect */}
            <div className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100">
              <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
            </div>
          </button>
        ))}
      </div>

      {/* Modal */}
      {selectedCreature && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-2xl">
            <button
              onClick={() => setSelectedCreature(null)}
              className="absolute right-3 top-3 rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mb-4 flex h-32 items-center justify-center rounded-lg bg-ocean-deep">
              <Fish className="h-16 w-16 text-primary/60" />
            </div>

            <div className="mb-2 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground">{selectedCreature.name}</h2>
                <p className="text-sm italic text-muted-foreground">{selectedCreature.scientificName}</p>
              </div>
              <span className={`rounded px-2 py-1 text-xs font-medium ${
                selectedCreature.rarity === "Very Rare" ? "bg-destructive/20 text-destructive" :
                selectedCreature.rarity === "Rare" ? "bg-warning/20 text-warning" :
                "bg-primary/20 text-primary"
              }`}>
                {selectedCreature.rarity}
              </span>
            </div>

            <p className="mb-4 text-sm text-muted-foreground">{selectedCreature.description}</p>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 rounded bg-muted/50 p-2">
                <Ruler className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Size</p>
                  <p className="font-medium text-foreground">{selectedCreature.size}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded bg-muted/50 p-2">
                <Thermometer className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Temperature</p>
                  <p className="font-medium text-foreground">{selectedCreature.temperature}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded bg-muted/50 p-2">
                <Fish className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Depth Range</p>
                  <p className="font-medium text-foreground">{selectedCreature.depth}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded bg-muted/50 p-2">
                <MapPin className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="font-medium text-foreground text-xs">{selectedCreature.location}</p>
                </div>
              </div>
            </div>

            <p className="mt-4 text-xs text-muted-foreground text-center">
              First discovered: {selectedCreature.discovered}
            </p>
          </div>
        </div>
      )}
    </>
  )
}
