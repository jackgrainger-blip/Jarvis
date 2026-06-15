import './HudRings.css'

function Ring({ r, speed, ccw, dashes, strokeWidth = 1, opacity = 1 }) {
  const circ = 2 * Math.PI * r
  const dashArr = dashes ? `${circ / dashes * 0.6} ${circ / dashes * 0.4}` : undefined
  const style = {
    animationDuration: `${speed}s`,
    animationDirection: ccw ? 'reverse' : 'normal',
  }
  return (
    <circle
      cx="50%" cy="50%" r={r}
      fill="none"
      stroke="#00e5ff"
      strokeWidth={strokeWidth}
      strokeDasharray={dashArr}
      opacity={opacity}
      style={style}
      className="ring"
    />
  )
}

function TickMarks({ r, count, len = 8, strokeWidth = 1, opacity = 0.5 }) {
  const ticks = []
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * 2 * Math.PI - Math.PI / 2
    const x1 = 50 + r * Math.cos(angle)
    const y1 = 50 + r * Math.sin(angle)
    const x2 = 50 + (r + len) * Math.cos(angle)
    const y2 = 50 + (r + len) * Math.sin(angle)
    ticks.push(
      <line key={i} x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`}
        stroke="#00e5ff" strokeWidth={strokeWidth} opacity={opacity} />
    )
  }
  return <>{ticks}</>
}

export default function HudRings({ timeStr }) {
  return (
    <div className="hud-wrap">
      {/* Outer scan line */}
      <div className="scan-line" />

      <svg className="hud-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        {/* Static outer decorative arcs */}
        <circle cx="50%" cy="50%" r="46" fill="none" stroke="#00e5ff" strokeWidth="0.3" opacity="0.2"
          strokeDasharray="2 4" />

        {/* Rotating rings */}
        <g style={{ transformOrigin: '50% 50%', animation: `spin-cw 18s linear infinite` }}>
          <Ring r={42} speed={18} dashes={60} strokeWidth={0.8} opacity={0.7} />
        </g>
        <g style={{ transformOrigin: '50% 50%', animation: `spin-ccw 12s linear infinite` }}>
          <Ring r={37} speed={12} ccw dashes={40} strokeWidth={1} opacity={0.6} />
        </g>
        <g style={{ transformOrigin: '50% 50%', animation: `spin-cw 30s linear infinite` }}>
          <Ring r={33} speed={30} dashes={80} strokeWidth={0.5} opacity={0.5} />
        </g>
        <g style={{ transformOrigin: '50% 50%', animation: `spin-ccw 8s linear infinite` }}>
          <Ring r={28} speed={8} ccw dashes={24} strokeWidth={1.2} opacity={0.8} />
        </g>

        {/* Static tick marks on outer ring */}
        <TickMarks r={44} count={72} len={2} strokeWidth={0.4} opacity={0.35} />
        <TickMarks r={44} count={12} len={5} strokeWidth={0.7} opacity={0.6} />

        {/* Inner solid ring */}
        <circle cx="50%" cy="50%" r="22" fill="rgba(0,20,40,0.9)"
          stroke="#00e5ff" strokeWidth="0.8" opacity="0.9" />

        {/* Glow core */}
        <circle cx="50%" cy="50%" r="18" fill="rgba(0,229,255,0.04)"
          stroke="#00e5ff" strokeWidth="0.3" opacity="0.5" />
      </svg>

      {/* Centre text overlay */}
      <div className="hud-center">
        <div className="jarvis-title">J.A.R.V.I.S</div>
        <div className="hud-time">{timeStr}</div>
        <div className="hud-subtitle">ONLINE</div>
      </div>

      {/* Cardinal labels */}
      <div className="cardinal n">N</div>
      <div className="cardinal s">S</div>
      <div className="cardinal e">E</div>
      <div className="cardinal w">W</div>
    </div>
  )
}
