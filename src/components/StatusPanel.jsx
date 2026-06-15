import './StatusPanel.css'

const systems = [
  { name: 'ARC REACTOR',    level: 98, status: 'OPTIMAL' },
  { name: 'REPULSOR ARRAY', level: 87, status: 'ACTIVE' },
  { name: 'NEURAL LINK',    level: 94, status: 'SYNCED' },
  { name: 'TARGETING SYS',  level: 76, status: 'STANDBY' },
  { name: 'PROPULSION',     level: 91, status: 'READY' },
  { name: 'SHIELDS',        level: 63, status: 'CHARGING' },
]

function Bar({ level }) {
  const color = level > 80 ? '#00e5ff' : level > 50 ? '#ffb300' : '#ff3d3d'
  return (
    <div className="bar-track">
      <div className="bar-fill" style={{ width: `${level}%`, background: color }} />
    </div>
  )
}

export default function StatusPanel() {
  return (
    <div className="panel status-panel">
      <div className="panel-title">▸ SYSTEM STATUS</div>
      {systems.map(s => (
        <div key={s.name} className="sys-row">
          <div className="sys-name">{s.name}</div>
          <Bar level={s.level} />
          <div className="sys-meta">
            <span className="sys-pct">{s.level}%</span>
            <span className={`sys-status ${s.status === 'OPTIMAL' || s.status === 'SYNCED' ? 'ok' : ''}`}>
              {s.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
