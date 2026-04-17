import './StatsCards.css'

function StatsCards({ stats }) {
    if (!stats) return null

    const cards = [
        {
            label: 'Total Sales',
            value: stats.totalRevenue,
            change: '+8% from yesterday',
            up: true,
            bg: '#ffe2e5',
            iconBg: '#fa5a7d',
            icon: '🛍️',
        },
        {
            label: 'Total Order',
            value: stats.totalOrders,
            change: '+5% from yesterday',
            up: true,
            bg: '#fff4de',
            iconBg: '#ff947a',
            icon: '📦',
        },
        {
            label: 'Product Sold',
            value: stats.completedTodos,
            change: '+1.2% from yesterday',
            up: true,
            bg: '#dcfce7',
            iconBg: '#3cd856',
            icon: '✅',
        },
        {
            label: 'New Customers',
            value: stats.totalCustomers,
            change: '+0.5% from yesterday',
            up: true,
            bg: '#f3e8ff',
            iconBg: '#bf83ff',
            icon: '👤',
        },
    ]

    const handleExport = () => {
        const csv = [['Metric', 'Value'], ...cards.map(c => [c.label, c.value])]
            .map(row => row.join(','))
            .join('\n')
        const blob = new Blob([csv], { type: 'text/csv' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'sales-summary.csv'
        a.click()
        URL.revokeObjectURL(url)
    }

    return (
        <div className="sales-card">
            <div className="sales-header">
                <div>
                    <h2 className="section-title">Today's Sales</h2>
                    <p className="section-sub">Sales Summary</p>
                </div>
                <button className="export-btn" onClick={handleExport}>⬆ Export</button>
            </div>

            <div className="stats-grid">
                {cards.map((s) => (
                    <div key={s.label} className="stat-card" style={{ background: s.bg }}>
                        <div className="stat-icon-wrap" style={{ background: s.iconBg }}>
                            <span>{s.icon}</span>
                        </div>
                        <div className="stat-val">{s.value}</div>
                        <div className="stat-lbl">{s.label}</div>
                        <div className={`stat-chg ${s.up ? 'up' : 'down'}`}>
                            {s.up ? '▲' : '▼'} {s.change}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default StatsCards
