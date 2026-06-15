import { useState, useEffect } from 'react'
import './DataFeed.css'

const INITIAL_LOGS = [
  { id: 1,  ts: '14:32:07', msg: 'Neural interface sync complete' },
  { id: 2,  ts: '14:31:54', msg: 'Arc reactor output: 3.0 GJ' },
  { id: 3,  ts: '14:31:33', msg: 'Satellite uplink established' },
  { id: 4,  ts: '14:31:12', msg: 'Threat assessment: CLEAR' },
  { id: 5,  ts: '14:30:58', msg: 'Repulsor calibration done' },
  { id: 6,  ts: '14:30:44', msg: 'Weather scan updated' },
  { id: 7,  ts: '14:30:31', msg: 'Facial recognition: ACTIVE' },
  { id: 8,  ts: '14:30:20', msg: 'Suit diagnostics: NOMINAL' },
  { id: 9,  ts: '14:30:05', msg: 'Security perimeter: SECURE' },
  { id: 10, ts: '14:29:50', msg: 'Communications encrypted' },
  { id: 11, ts: '14:29:35', msg: 'Power reserves: 98%' },
  { id: 12, ts: '14:29:20', msg: 'System boot sequence complete' },
]

const LIVE_MSGS = [
  'Scanning for anomalies...',
  'Energy fluctuation detected',
  'Compensating power draw',
  'Satellite repositioned',
  'New flight path calculated',
  'Biometric scan updated',
  'Threat vector: NONE',
  'Repulsor output stable',
  'Communication burst received',
  'Memory compression active',
]

export default function DataFeed() {
  const [logs, setLogs] = useState(INITIAL_LOGS)
  const [nextId, setNextId] = useState(13)

  useEffect(() => {
    const t = setInterval(() => {
      const now = new Date()
      const ts = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`
      const msg = LIVE_MSGS[Math.floor(Math.random() * LIVE_MSGS.length)]
      setLogs(prev => [{ id: nextId, ts, msg }, ...prev.slice(0, 18)])
      setNextId(n => n + 1)
    }, 2800)
    return () => clearInterval(t)
  }, [nextId])

  return (
    <div className="panel data-feed">
      <div className="panel-title">▸ ACTIVITY LOG</div>
      <div className="feed-list">
        {logs.map(l => (
          <div key={l.id} className="feed-item">
            <span className="feed-ts">{l.ts}</span>
            <span className="feed-msg">{l.msg}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
