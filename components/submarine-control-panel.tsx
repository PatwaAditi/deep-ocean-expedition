"use client"

import { useEffect, useState } from "react"
import { Gauge, Battery, Wind, Activity } from "lucide-react"

interface MeterProps {
  label: string
  value: number
  max: number
  unit: string
  icon: React.ReactNode
  color: string
  warning?: number
  critical?: number
}

function CircularMeter({ label, value, max, unit, icon, color, warning, critical }: MeterProps) {
  const percentage = (value / max) * 100
  const circumference = 2 * Math.PI * 40
  const strokeDashoffset = circumference - (percentage / 100) * circumference
  
  const getColor = () => {
    if (critical && value >= critical) return "text-destructive"
    if (warning && value >= warning) return "text-warning"
    return color
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-24 w-24">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-muted/30"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={`transition-all duration-500 ${getColor()}`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`${getColor()}`}>{icon}</span>
          <span className={`text-sm font-bold ${getColor()}`}>
            {value.toLocaleString()}
          </span>
          <span className="text-xs text-muted-foreground">{unit}</span>
        </div>
      </div>
      <span className="mt-1 text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  )
}

function LinearMeter({ label, value, max, unit, icon, color, warning, critical }: MeterProps) {
  const percentage = (value / max) * 100
  
  const getColor = () => {
    if (critical && value <= critical) return "bg-destructive"
    if (warning && value <= warning) return "bg-warning"
    return color
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-primary">{icon}</span>
          <span className="text-xs font-medium text-foreground">{label}</span>
        </div>
        <span className="text-xs font-bold text-foreground">
          {value}{unit}
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted/30">
        <div
          className={`h-full transition-all duration-500 ${getColor()}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

export function SubmarineControlPanel() {
  const [depth, setDepth] = useState(2847)
  const [pressure, setPressure] = useState(285)
  const [oxygen, setOxygen] = useState(94)
  const [battery, setBattery] = useState(78)

  useEffect(() => {
    const interval = setInterval(() => {
      setDepth((d) => Math.max(0, Math.min(11000, d + (Math.random() - 0.48) * 50)))
      setPressure((p) => Math.max(0, Math.min(1100, p + (Math.random() - 0.48) * 5)))
      setOxygen((o) => Math.max(0, Math.min(100, o + (Math.random() - 0.52) * 0.5)))
      setBattery((b) => Math.max(0, Math.min(100, b - Math.random() * 0.1)))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex h-full flex-col gap-4 rounded-lg border border-border bg-card p-4">
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 animate-pulse rounded-full bg-success" />
        <h3 className="font-mono text-sm font-semibold uppercase tracking-wider text-foreground">
          Submarine Status
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <CircularMeter
          label="Depth"
          value={Math.round(depth)}
          max={11000}
          unit="m"
          icon={<Gauge className="h-4 w-4" />}
          color="text-primary"
        />
        <CircularMeter
          label="Pressure"
          value={Math.round(pressure)}
          max={1100}
          unit="bar"
          icon={<Activity className="h-4 w-4" />}
          color="text-accent"
          warning={800}
          critical={1000}
        />
      </div>

      <div className="flex flex-col gap-3">
        <LinearMeter
          label="Oxygen Level"
          value={Math.round(oxygen * 10) / 10}
          max={100}
          unit="%"
          icon={<Wind className="h-4 w-4" />}
          color="bg-success"
          warning={30}
          critical={15}
        />
        <LinearMeter
          label="Battery"
          value={Math.round(battery * 10) / 10}
          max={100}
          unit="%"
          icon={<Battery className="h-4 w-4" />}
          color="bg-primary"
          warning={25}
          critical={10}
        />
      </div>

      <div className="mt-auto grid grid-cols-3 gap-2 border-t border-border pt-3">
        <div className="text-center">
          <p className="text-lg font-bold text-foreground">3.2</p>
          <p className="text-xs text-muted-foreground">Speed (kn)</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-foreground">-45</p>
          <p className="text-xs text-muted-foreground">Pitch (deg)</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-foreground">127</p>
          <p className="text-xs text-muted-foreground">Heading</p>
        </div>
      </div>
    </div>
  )
}
