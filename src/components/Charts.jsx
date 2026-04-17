import './Charts.css'
import SalesMap from './SalesMap'

function toPointsShared(data, w, h, sharedMax) {
    if (!data || data.length < 2) return ''
    const max = sharedMax || Math.max(...data, 1)
    return data
        .map((v, i) => `${(i / (data.length - 1)) * w},${h - (v / max) * (h - 4)}`)
        .join(' ')
}

function toAreaPath(data, w, h, sharedMax) {
    if (!data || data.length < 2) return ''
    const max = sharedMax || Math.max(...data, 1)
    const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - (v / max) * (h - 4)}`)
    return `M ${pts.join(' L ')} L ${w},${h} L 0,${h} Z`
}

function LineChart({ datasets, width = 320, height = 100 }) {
    const sharedMax = Math.max(...datasets.flatMap(ds => ds.data), 1)
    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="line-svg" aria-label="Line chart">
            {/* Area fills first (behind lines) */}
            {datasets.map((ds, idx) => (
                <path
                    key={`fill-${idx}`}
                    d={toAreaPath(ds.data, width, height, sharedMax)}
                    fill={ds.color}
                    fillOpacity={ds.fillOpacity !== undefined ? ds.fillOpacity : 0.08}
                    stroke="none"
                />
            ))}
            {/* Lines on top */}
            {datasets.map((ds, idx) => (
                <polyline
                    key={`line-${idx}`}
                    points={toPointsShared(ds.data, width, height, sharedMax)}
                    fill="none"
                    stroke={ds.color}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray={ds.dashed ? '6 3' : undefined}
                />
            ))}
        </svg>
    )
}

function Charts({ chartData }) {
    if (!chartData) return null

    const { revenueByDay, satisfaction, targetVsReality, topProducts, volumeData } = chartData

    const maxRev = Math.max(...revenueByDay.map(d => d.online + d.offline), 1)
    const maxTarget = Math.max(...targetVsReality.map(d => Math.max(d.reality, d.target)), 1)
    const maxVol = Math.max(...volumeData.map(d => Math.max(d.volume, d.services)), 1)

    return (
        <div className="charts-container">

            {/* Row 1: Total Revenue + Customer Satisfaction + Target vs Reality */}
            <div className="charts-row three-col">
                <div className="chart-card">
                    <h3 className="chart-title">Total Revenue</h3>
                    <div className="bar-chart-wrap">
                        {revenueByDay.map((d) => (
                            <div key={d.day} className="bar-col">
                                <div className="bar-pair">
                                    <div className="bar online-bar"
                                        style={{ height: `${(d.online / maxRev) * 120}px` }}
                                        title={`Online: ${d.online}`}
                                    />
                                    <div className="bar offline-bar"
                                        style={{ height: `${(d.offline / maxRev) * 120}px` }}
                                        title={`Offline: ${d.offline}`}
                                    />
                                </div>
                                <span className="bar-label">{d.day}</span>
                            </div>
                        ))}
                    </div>
                    <div className="chart-legend">
                        <span><span className="dot" style={{ background: '#0095FF' }}></span>On. Sales</span>
                        <span><span className="dot" style={{ background: '#00E096' }}></span>Off. Sales</span>
                    </div>
                </div>

                <div className="chart-card satisfaction-card">
                    <h3 className="chart-title">Customer Satisfaction</h3>
                    <div className="satisfaction-chart-wrap">
                        <LineChart
                            datasets={[
                                { data: satisfaction.lastMonth, color: '#00cec9', dashed: true, fillOpacity: 0.25 },
                                { data: satisfaction.thisMonth, color: '#6c5ce7', fillOpacity: 0.20 },
                            ]}
                            width={260}
                            height={110}
                        />
                    </div>
                    <div className="satisfaction-stats">
                        <div>
                            <span className="sat-label">Last Month</span>
                            <span className="sat-value">{satisfaction.lastMonthTotal}</span>
                        </div>
                        <div>
                            <span className="sat-label">This Month</span>
                            <span className="sat-value">{satisfaction.thisMonthTotal}</span>
                        </div>
                    </div>
                    <div className="chart-legend">
                        <span><span className="dot" style={{ background: '#00cec9' }}></span>Last Month</span>
                        <span><span className="dot" style={{ background: '#6c5ce7' }}></span>This Month</span>
                    </div>
                </div>

                <div className="chart-card">
                    <h3 className="chart-title">Target vs Reality</h3>
                    <div className="bar-chart-wrap small">
                        {targetVsReality.map((d) => (
                            <div key={d.month} className="bar-col">
                                <div className="bar-pair">
                                    <div className="bar reality-bar"
                                        style={{ height: `${(d.reality / maxTarget) * 90}px` }}
                                        title={`Reality: ${d.reality}`}
                                    />
                                    <div className="bar target-bar"
                                        style={{ height: `${(d.target / maxTarget) * 90}px` }}
                                        title={`Target: ${d.target}`}
                                    />
                                </div>
                                <span className="bar-label">{d.month}</span>
                            </div>
                        ))}
                    </div>
                    <div className="target-stats">
                        <div className="target-stat">
                            <span className="dot" style={{ background: '#4AB58E' }}></span>
                            <span className="ts-label">Reality Sales</span>
                            <span className="ts-value">{targetVsReality.reduce((s, d) => s + d.reality, 0).toLocaleString()}</span>
                        </div>
                        <div className="target-stat">
                            <span className="dot" style={{ background: '#FFCF00' }}></span>
                            <span className="ts-label">Target Sales</span>
                            <span className="ts-value red">{targetVsReality.reduce((s, d) => s + d.target, 0).toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Row 2: Top Products + Sales Mapping + Volume */}
            <div className="charts-row three-col">
                <div className="chart-card">
                    <h3 className="chart-title">Top Products</h3>
                    <table className="products-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Popularity</th>
                                <th>Sales</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topProducts.map((p, i) => (
                                <tr key={p.name}>
                                    <td className="prod-num">0{i + 1}</td>
                                    <td className="prod-name">{p.name}</td>
                                    <td>
                                        <div className="mini-progress">
                                            <div className="mini-fill" style={{ width: `${p.popularity}%`, background: p.color }} />
                                        </div>
                                    </td>
                                    <td>
                                        <span className="sales-badge" style={{ background: p.color + '22', color: p.color }}>
                                            {p.sales}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="chart-card map-card">
                    <h3 className="chart-title">Sales Mapping by Country</h3>
                    <SalesMap />
                </div>

                <div className="chart-card">
                    <h3 className="chart-title">Volume vs Service Level</h3>
                    <div className="volume-chart">
                        {volumeData.map((d) => (
                            <div key={d.label} className="vol-group">
                                <div className="vol-bars">
                                    <div className="vol-bar"
                                        style={{ height: `${(d.volume / maxVol) * 100}px`, background: '#6c5ce7' }}
                                        title={`Volume: ${d.volume}`}
                                    />
                                    <div className="vol-bar"
                                        style={{ height: `${(d.services / maxVol) * 100}px`, background: '#00cec9' }}
                                        title={`Services: ${d.services}`}
                                    />
                                </div>
                                <span className="bar-label">{d.label}</span>
                            </div>
                        ))}
                    </div>
                    <div className="chart-legend">
                        <span><span className="dot" style={{ background: '#6c5ce7' }}></span>Volume</span>
                        <span><span className="dot" style={{ background: '#00cec9' }}></span>Services</span>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Charts
