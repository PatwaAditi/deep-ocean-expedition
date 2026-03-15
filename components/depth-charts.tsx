"use client"

import { Area, AreaChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const depthPressureData = [
  { depth: 0, pressure: 1, temp: 25 },
  { depth: 1000, pressure: 101, temp: 10 },
  { depth: 2000, pressure: 201, temp: 4 },
  { depth: 3000, pressure: 301, temp: 3 },
  { depth: 4000, pressure: 401, temp: 2.5 },
  { depth: 5000, pressure: 501, temp: 2 },
  { depth: 6000, pressure: 601, temp: 1.8 },
  { depth: 7000, pressure: 701, temp: 1.5 },
  { depth: 8000, pressure: 801, temp: 1.3 },
  { depth: 9000, pressure: 901, temp: 1.2 },
  { depth: 10000, pressure: 1001, temp: 1.1 },
  { depth: 11000, pressure: 1100, temp: 1 },
]

const realtimeData = [
  { time: "00:00", depth: 2800 },
  { time: "00:05", depth: 2820 },
  { time: "00:10", depth: 2850 },
  { time: "00:15", depth: 2830 },
  { time: "00:20", depth: 2860 },
  { time: "00:25", depth: 2890 },
  { time: "00:30", depth: 2870 },
  { time: "00:35", depth: 2900 },
  { time: "00:40", depth: 2880 },
  { time: "00:45", depth: 2850 },
  { time: "00:50", depth: 2870 },
  { time: "00:55", depth: 2847 },
]

export function DepthCharts() {
  return (
    <div className="grid h-full grid-rows-2 gap-4 rounded-lg border border-border bg-card p-4">
      {/* Depth vs Pressure Chart */}
      <div className="flex flex-col">
        <h3 className="mb-2 font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Depth vs Pressure & Temperature
        </h3>
        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={depthPressureData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
              <XAxis 
                dataKey="depth" 
                tick={{ fill: 'var(--color-muted-foreground)', fontSize: 10 }}
                tickFormatter={(v) => `${v/1000}k`}
                axisLine={{ stroke: 'var(--color-border)' }}
                tickLine={{ stroke: 'var(--color-border)' }}
              />
              <YAxis 
                yAxisId="pressure"
                tick={{ fill: 'var(--color-muted-foreground)', fontSize: 10 }}
                axisLine={{ stroke: 'var(--color-border)' }}
                tickLine={{ stroke: 'var(--color-border)' }}
              />
              <YAxis 
                yAxisId="temp"
                orientation="right"
                tick={{ fill: 'var(--color-muted-foreground)', fontSize: 10 }}
                axisLine={{ stroke: 'var(--color-border)' }}
                tickLine={{ stroke: 'var(--color-border)' }}
                hide
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
                labelFormatter={(v) => `Depth: ${v}m`}
              />
              <Line 
                yAxisId="pressure"
                type="monotone" 
                dataKey="pressure" 
                stroke="var(--color-primary)" 
                strokeWidth={2}
                dot={false}
                name="Pressure (bar)"
              />
              <Line 
                yAxisId="temp"
                type="monotone" 
                dataKey="temp" 
                stroke="var(--color-accent)" 
                strokeWidth={2}
                dot={false}
                name="Temp (°C)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-muted-foreground">Pressure (bar)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-accent" />
            <span className="text-muted-foreground">Temperature (°C)</span>
          </div>
        </div>
      </div>

      {/* Realtime Depth Chart */}
      <div className="flex flex-col">
        <h3 className="mb-2 font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Realtime Depth Profile
        </h3>
        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={realtimeData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
              <defs>
                <linearGradient id="depthGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="time" 
                tick={{ fill: 'var(--color-muted-foreground)', fontSize: 10 }}
                axisLine={{ stroke: 'var(--color-border)' }}
                tickLine={{ stroke: 'var(--color-border)' }}
              />
              <YAxis 
                domain={[2750, 2950]}
                tick={{ fill: 'var(--color-muted-foreground)', fontSize: 10 }}
                axisLine={{ stroke: 'var(--color-border)' }}
                tickLine={{ stroke: 'var(--color-border)' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Area 
                type="monotone" 
                dataKey="depth" 
                stroke="var(--color-primary)" 
                strokeWidth={2}
                fill="url(#depthGradient)"
                name="Depth (m)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
