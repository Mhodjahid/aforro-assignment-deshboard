import { useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import StatsCards from './StatsCards'
import VisitorInsights from './VisitorInsights'
import Charts from './Charts'
import UsersTable from './UsersTable'
import { useDashboardData } from '../hooks/useDashboardData'
import './Dashboard.css'

function PlaceholderPage({ title }) {
    return (
        <div className="placeholder-page">
            <h2>{title}</h2>
            <p>This section is coming soon.</p>
        </div>
    )
}

function Dashboard() {
    const [activePage, setActivePage] = useState('dashboard')
    const [globalSearch, setGlobalSearch] = useState('')
    const { data, loading, error } = useDashboardData()

    function renderContent() {
        switch (activePage) {
            case 'dashboard':
                return (
                    <>
                        {loading && (
                            <div className="data-loading">
                                <div className="spinner" />
                                Loading dashboard data...
                            </div>
                        )}
                        {error && (
                            <div className="data-error">⚠️ Failed to load data: {error}</div>
                        )}
                        {!loading && !error && data && (
                            <>
                                {/* Row 1: Today's Sales + Visitor Insights */}
                                <div className="top-row">
                                    <StatsCards stats={data.stats} />
                                    <VisitorInsights visitorInsights={data.visitorInsights} />
                                </div>
                                {/* Charts: Total Revenue, Customer Satisfaction, Target vs Reality */}
                                <Charts chartData={data} />
                                {/* Users Table */}
                                <UsersTable globalSearch={globalSearch} />
                            </>
                        )}
                    </>
                )
            case 'leaderboard': return <PlaceholderPage title="Leaderboard" />
            case 'order': return <PlaceholderPage title="Orders" />
            case 'products': return <PlaceholderPage title="Products" />
            case 'sales': return <PlaceholderPage title="Sales Report" />
            case 'messages': return <PlaceholderPage title="Messages" />
            case 'settings': return <PlaceholderPage title="Settings" />
            case 'signout': return <PlaceholderPage title="Signed Out" />
            default: return null
        }
    }

    return (
        <div className="dashboard-layout">
            <Sidebar activePage={activePage} onNavigate={setActivePage} />
            <div className="dashboard-main">
                <Header activePage={activePage} onSearch={setGlobalSearch} />
                <div className="dashboard-content">
                    {renderContent()}
                </div>
            </div>
        </div>
    )
}

export default Dashboard
