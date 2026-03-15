"use client"

import { ParallaxProvider } from "react-scroll-parallax"
import { OceanSurface } from "@/components/dive/ocean-surface"
import { SunlightZone } from "@/components/dive/sunlight-zone"
import { TwilightZone } from "@/components/dive/twilight-zone"
import { MidnightZone } from "@/components/dive/midnight-zone"
import { AbyssZone } from "@/components/dive/abyss-zone"
import { HadalZone } from "@/components/dive/hadal-zone"
import { DepthIndicator } from "@/components/dive/depth-indicator"
import { ParallaxBubbles } from "@/components/dive/parallax-bubbles"

export default function DeepOceanDive() {
  return (
    <ParallaxProvider>
      <main className="relative">
        {/* Fixed UI Elements */}
        <DepthIndicator />
        <ParallaxBubbles />

        {/* Ocean Sections */}
        <OceanSurface />
        <SunlightZone />
        <TwilightZone />
        <MidnightZone />
        <AbyssZone />
        <HadalZone />
      </main>
    </ParallaxProvider>
  )
}
