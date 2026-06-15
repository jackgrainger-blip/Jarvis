import './WeatherWidget.css'

const forecasts = [
  { day: 'MON', icon: '◎', temp: '18°C', cond: 'CLEAR' },
  { day: 'TUE', icon: '≋', temp: '14°C', cond: 'RAIN' },
  { day: 'WED', icon: '◑', temp: '16°C', cond: 'PARTLY' },
  { day: 'THU', icon: '◎', temp: '21°C', cond: 'CLEAR' },
  { day: 'FRI', icon: '✦', temp: '22°C', cond: 'SUNNY' },
]

export default function WeatherWidget() {
  return (
    <div className="panel weather-panel">
      <div className="panel-title">▸ ENVIRONMENTAL SCAN</div>
      <div className="weather-current">
        <div className="weather-icon">◎</div>
        <div className="weather-info">
          <div className="weather-temp">19°C</div>
          <div className="weather-loc">NEW YORK · CLEAR</div>
          <div className="weather-detail">HUM 42% · WIND 12KPH · VIS 10KM</div>
        </div>
      </div>
      <div className="forecast-row">
        {forecasts.map(f => (
          <div key={f.day} className="forecast-day">
            <div className="fc-day">{f.day}</div>
            <div className="fc-icon">{f.icon}</div>
            <div className="fc-temp">{f.temp}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
