import { useState, useEffect } from 'react'
import './SystemMetrics.css'

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function Sparkline({ values }) {
  const max = Math.max(...values)
  const min = Math.min(...values)
  const range = max - min || 1
  const w = 100
  const h = 24
  const points = values.map((v, i) => {
    const x = (i / (values.length - 1)) * w
    const y = h - ((v - min) / range) * (h - 2) - 1
    return `${x},${y}`
  }).join(' ')
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="sparkline">
      <polyline points={points} fill="none" stroke="#00e5ff" strokeWidth="1.5"
        vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

export default function SystemMetrics() {
  const [cpu, setCpu] = useState(() => Array.from({ length: 20 }, () => randomBetween(30, 80)))
  const [mem, setMem] = useState(() => Array.from({ length: 20 }, () => randomBetween(50, 75)))
  const [net, setNet] = useState(() => Array.from({ length: 20 }, () => randomBetween(10, 60)))

  useEffect(() => {
    const t = setInterval(() => {
      setCpu(p => [...p.slice(1), randomBetween(20, 90)])
      setMem(p => [...p.slice(1), randomBetween(48, 78)])
      setNet(p => [...p.slice(1), randomBetween(5, 70)])
    }, 1200)
    return () => clearInterval(t)
  }, [])

  const metrics = [
    { label: 'CPU', values: cpu, unit: '%' },
    { label: 'MEMORY', values: mem, unit: '%' },
    { label: 'NETWORK', values: net, unit: 'MB/s' },
  ]

  return (
    <div className="panel metrics-panel">
      <div className="panel-title">▸ SYSTEM METRICS</div>
      {metrics.map(m => (
        <div key={m.label} className="metric-row">
          <div className="metric-header">
            <span className="metric-label">{m.label}</span>
            <span className="metric-val">{m.values[m.values.length - 1]}{m.unit}</span>
          </div>
          <Sparkline values={m.values} />
        </div>
      ))}
    </div>
  )
}
