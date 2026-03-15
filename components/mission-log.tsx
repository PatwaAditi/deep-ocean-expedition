"use client"

import { useEffect, useState } from "react"
import { Clock, AlertTriangle, CheckCircle, Info, Anchor, Zap } from "lucide-react"

interface LogEntry {
  id: number
  time: string
  type: "info" | "warning" | "success" | "alert"
  message: string
}

const initialLogs: LogEntry[] = [
  { id: 1, time: "08:00:00", type: "info", message: "Mission Alpha-7 initiated" },
  { id: 2, time: "08:15:32", type: "success", message: "Descent phase completed" },
  { id: 3, time: "08:45:18", type: "info", message: "Reached target depth 2500m" },
  { id: 4, time: "09:12:44", type: "warning", message: "Minor pressure variance detected" },
  { id: 5, time: "09:30:00", type: "success", message: "ROV deployed successfully" },
  { id: 6, time: "10:05:22", type: "info", message: "Specimen collection started" },
  { id: 7, time: "10:45:11", type: "alert", message: "Oxygen reserve below 90%" },
  { id: 8, time: "11:00:00", type: "success", message: "Sample container sealed" },
]

const randomMessages = {
  info: [
    "Sonar contact detected",
    "Water sample collected",
    "Navigation waypoint reached",
    "Sensor calibration complete",
    "Thermal reading logged",
  ],
  warning: [
    "Slight current increase",
    "Battery optimization active",
    "Hull stress within limits",
    "Communication delay detected",
  ],
  success: [
    "Target specimen located",
    "Photo documentation saved",
    "Depth record achieved",
    "Systems nominal",
  ],
  alert: [
    "Approaching crush depth",
    "External temperature anomaly",
    "Unidentified object nearby",
  ],
}

export function MissionLog() {
  const [logs, setLogs] = useState<LogEntry[]>(initialLogs)

  useEffect(() => {
    const interval = setInterval(() => {
      const types: LogEntry["type"][] = ["info", "warning", "success", "alert"]
      const weights = [0.5, 0.25, 0.2, 0.05]
      const random = Math.random()
      let cumulative = 0
      let selectedType: LogEntry["type"] = "info"
      
      for (let i = 0; i < weights.length; i++) {
        cumulative += weights[i]
        if (random <= cumulative) {
          selectedType = types[i]
          break
        }
      }

      const messages = randomMessages[selectedType]
      const message = messages[Math.floor(Math.random() * messages.length)]
      
      const newLog: LogEntry = {
        id: Date.now(),
        time: new Date().toLocaleTimeString("en-US", { hour12: false }),
        type: selectedType,
        message,
      }

      setLogs((prev) => [...prev.slice(-19), newLog])
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getIcon = (type: LogEntry["type"]) => {
    switch (type) {
      case "info":
        return <Info className="h-3 w-3" />
      case "warning":
        return <AlertTriangle className="h-3 w-3" />
      case "success":
        return <CheckCircle className="h-3 w-3" />
      case "alert":
        return <Zap className="h-3 w-3" />
    }
  }

  const getColor = (type: LogEntry["type"]) => {
    switch (type) {
      case "info":
        return "text-primary bg-primary/10 border-primary/30"
      case "warning":
        return "text-warning bg-warning/10 border-warning/30"
      case "success":
        return "text-success bg-success/10 border-success/30"
      case "alert":
        return "text-destructive bg-destructive/10 border-destructive/30 animate-pulse"
    }
  }

  return (
    <div className="flex h-full flex-col rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border p-3">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" />
          <h3 className="font-mono text-sm font-semibold uppercase tracking-wider text-foreground">
            Mission Log
          </h3>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Anchor className="h-3 w-3" />
          <span>Alpha-7</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-1">
          {logs.map((log) => (
            <div
              key={log.id}
              className={`flex items-start gap-2 rounded border p-2 text-xs ${getColor(log.type)}`}
            >
              <span className="mt-0.5">{getIcon(log.type)}</span>
              <div className="flex-1">
                <p className="font-medium">{log.message}</p>
              </div>
              <span className="font-mono text-[10px] opacity-70">{log.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
