import './VisitorInsights.css'

const W = 320
const H = 120

function toPoints(data, w, h, sharedMax) {
    if (!data || data.length < 2) return ''
    const max = sharedMax || Math.max(...data, 1)
    return data
        .map((v, i) => `${(i / (data.length - 1)) * w},${h - (v / max) * (h - 10)}`)
        .join(' ')
}


const lines = [
    { key: 'loyal', color: '#6c5ce7', label: 'Loyal Customers' },
    { key: 'newU', color: '#00cec9', label: 'New Customers' },
    { key: 'unique', color: '#fd79a8', label: 'Unique Customers' },
]

function VisitorInsights({ visitorInsights }) {
    if (!visitorInsights) return null
    const { months, loyal, newU, unique } = visitorInsights
    const dataMap = { loyal, newU, unique }
    const sharedMax = Math.max(...[loyal, newU, unique].flat(), 1)

    return (
        <div className="visitor-card">
            <h3 className="visitor-title">Visitor Insights</h3>
            <div className="visitor-chart-wrap">
                <svg viewBox={`0 0 ${W} ${H}`} className="visitor-svg" aria-label="Visitor Insights">
                    {/* Area fills removed */}
                    {/* Lines */}
                    {lines.map(l => (
                        <polyline
                            key={`line-${l.key}`}
                            points={toPoints(dataMap[l.key], W, H, sharedMax)}
                            fill="none"
                            stroke={l.color}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    ))}
                </svg>
            </div>
            <div className="visitor-x-labels">
                {months.map(m => <span key={m}>{m}</span>)}
            </div>
            <div className="visitor-legend">
                {lines.map(l => (
                    <span key={l.key}>
                        <span className="vdot" style={{ background: l.color }}></span>
                        {l.label}
                    </span>
                ))}
            </div>
        </div>
    )
}

export default VisitorInsights
