import './Sidebar.css'

const navItems = [
    { id: 'dashboard', icon: '⊞', label: 'Dashboard' },
    { id: 'leaderboard', icon: '📋', label: 'Leaderboard' },
    { id: 'order', icon: '🛒', label: 'Order' },
    { id: 'products', icon: '📦', label: 'Products' },
    { id: 'sales', icon: '📈', label: 'Sales Report' },
    { id: 'messages', icon: '💬', label: 'Messages' },
    { id: 'settings', icon: '⚙️', label: 'Settings' },
    { id: 'signout', icon: '🚪', label: 'Sign Out' },
]

function Sidebar({ activePage, onNavigate }) {
    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <div className="logo-box"><span>D</span></div>
                <span className="logo-text">Dabang</span>
            </div>

            <nav className="sidebar-nav">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        className={`nav-item ${activePage === item.id ? 'active' : ''}`}
                        onClick={() => onNavigate(item.id)}
                        aria-current={activePage === item.id ? 'page' : undefined}
                    >
                        <span className="nav-icon">{item.icon}</span>
                        <span className="nav-label">{item.label}</span>
                    </button>
                ))}
            </nav>

            <div className="sidebar-promo">
                <div className="promo-icon">◈</div>
                <p className="promo-title">Dabang Pro</p>
                <p className="promo-desc">Get access to all features on any device.</p>
                <button className="promo-btn">Get Pro</button>
            </div>
        </aside>
    )
}

export default Sidebar
