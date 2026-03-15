"use client"

import { useEffect, useState } from "react"
import { AlertTriangle, X, Bell } from "lucide-react"

interface Alert {
  id: number
  severity: "low" | "medium" | "high" | "critical"
  title: string
  message: string
  timestamp: Date
}

const possibleAlerts: Omit<Alert, "id" | "timestamp">[] = [
  { severity: "low", title: "System Update", message: "Navigation firmware update available" },
  { severity: "low", title: "Maintenance", message: "Scheduled maintenance in 4 hours" },
  { severity: "medium", title: "Pressure Variance", message: "Hull pressure differential at 2%" },
  { severity: "medium", title: "Temperature Alert", message: "External temp dropped 0.5°C" },
  { severity: "high", title: "Battery Warning", message: "Reserve power below 25%" },
  { severity: "high", title: "Communication", message: "Signal strength degraded" },
  { severity: "critical", title: "Depth Limit", message: "Approaching maximum rated depth" },
]

export function WarningAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([
    { id: 1, severity: "medium", title: "Pressure Variance", message: "Minor fluctuation detected", timestamp: new Date() },
    { id: 2, severity: "low", title: "Scheduled Check", message: "Life support inspection due", timestamp: new Date() },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7 && alerts.length < 5) {
        const randomAlert = possibleAlerts[Math.floor(Math.random() * possibleAlerts.length)]
        setAlerts((prev) => [
          ...prev,
          { ...randomAlert, id: Date.now(), timestamp: new Date() },
        ])
      }
    }, 8000)
    return () => clearInterval(interval)
  }, [alerts.length])

  const dismissAlert = (id: number) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id))
  }

  const getSeverityStyles = (severity: Alert["severity"]) => {
    switch (severity) {
      case "low":
        return "border-primary/50 bg-primary/10 text-primary"
      case "medium":
        return "border-warning/50 bg-warning/10 text-warning"
      case "high":
        return "border-destructive/50 bg-destructive/10 text-destructive"
      case "critical":
        return "border-destructive bg-destructive/20 text-destructive animate-pulse"
    }
  }

  return (
    <div className="flex h-full flex-col rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border p-3">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-warning" />
          <h3 className="font-mono text-sm font-semibold uppercase tracking-wider text-foreground">
            Alerts
          </h3>
        </div>
        {alerts.length > 0 && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs font-bold text-destructive-foreground">
            {alerts.length}
          </span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {alerts.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="rounded-full bg-success/10 p-3">
              <AlertTriangle className="h-6 w-6 text-success" />
            </div>
            <p className="mt-2 text-sm font-medium text-foreground">All Clear</p>
            <p className="text-xs text-muted-foreground">No active alerts</p>
          </div>
        ) : (
          <div className="space-y-2">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`relative rounded-lg border p-3 ${getSeverityStyles(alert.severity)}`}
              >
                <button
                  onClick={() => dismissAlert(alert.id)}
                  className="absolute right-2 top-2 rounded p-0.5 opacity-60 hover:opacity-100"
                >
                  <X className="h-3 w-3" />
                </button>
                <div className="flex items-start gap-2">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                  <div className="pr-4">
                    <p className="font-semibold text-sm">{alert.title}</p>
                    <p className="text-xs opacity-80">{alert.message}</p>
                    <p className="mt-1 text-[10px] opacity-60">
                      {alert.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
