import { useState, useEffect } from 'react'
import HudRings from './components/HudRings'
import StatusPanel from './components/StatusPanel'
import DataFeed from './components/DataFeed'
import SystemMetrics from './components/SystemMetrics'
import WeatherWidget from './components/WeatherWidget'
import './App.css'

function App() {
  const [time, setTime] = useState(new Date())
  const [boot, setBoot] = useState(false)

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    const b = setTimeout(() => setBoot(true), 200)
    return () => { clearInterval(t); clearTimeout(b) }
  }, [])

  const pad = n => String(n).padStart(2, '0')
  const timeStr = `${pad(time.getHours())}:${pad(time.getMinutes())}:${pad(time.getSeconds())}`
  const dateStr = time.toLocaleDateString('en-GB', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  }).toUpperCase()

  return (
    <div className={`dashboard${boot ? ' booted' : ''}`}>
      <div className="bg-grid" />

      <header className="top-bar">
        <div className="top-bar-side">
          <span className="lbl">SYSTEM</span>
          <span className="val">ONLINE</span>
          <span className="sep">|</span>
          <span className="lbl">STATUS</span>
          <span className="val green">NOMINAL</span>
        </div>
        <div className="top-bar-center">
          {dateStr}
        </div>
        <div className="top-bar-side right">
          <span className="lbl">UPTIME</span>
          <span className="val">14:32:07</span>
          <span className="sep">|</span>
          <span className="lbl">USER</span>
          <span className="val">STARK</span>
        </div>
      </header>

      <main className="main-grid">
        <aside className="side-col">
          <StatusPanel />
          <SystemMetrics />
        </aside>

        <section className="center-col">
          <HudRings timeStr={timeStr} />
        </section>

        <aside className="side-col">
          <WeatherWidget />
          <DataFeed />
        </aside>
      </main>

      <footer className="bottom-bar">
        <span className="lbl">JARVIS</span>
        <span className="sep">//</span>
        <span className="val">JUST A RATHER VERY INTELLIGENT SYSTEM</span>
        <span className="sep">//</span>
        <span className="lbl">STARK INDUSTRIES</span>
        <span className="sep">//</span>
        <span className="val blink-text">■ READY</span>
      </footer>
    </div>
  )
}

export default App
