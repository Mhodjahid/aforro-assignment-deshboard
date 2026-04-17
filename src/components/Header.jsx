import { useState } from 'react'
import './Header.css'

const languages = ['Eng (US)', 'Hindi', 'French', 'Spanish', 'Arabic']

const pageTitles = {
    dashboard: 'Dashboard',
    leaderboard: 'Leaderboard',
    order: 'Orders',
    products: 'Products',
    sales: 'Sales Report',
    messages: 'Messages',
    settings: 'Settings',
    signout: 'Sign Out',
}

function Header({ activePage, onSearch }) {
    const [lang, setLang] = useState('Eng (US)')
    const [langOpen, setLangOpen] = useState(false)
    const [notifOpen, setNotifOpen] = useState(false)
    const [search, setSearch] = useState('')

    const title = pageTitles[activePage] || 'Dashboard'

    const handleSearchChange = (e) => {
        const value = e.target.value
        setSearch(value)
        if (onSearch) onSearch(value)
    }

    const handleClearSearch = () => {
        setSearch('')
        if (onSearch) onSearch('')
    }

    return (
        <header className="header">
            <h1 className="header-title">{title}</h1>

            <div className="header-right">

                {/* Search */}
                <div className="search-box">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        placeholder="Search here..."
                        aria-label="Search"
                        value={search}
                        onChange={handleSearchChange}
                    />
                    {search && (
                        <button className="clear-btn" onClick={handleClearSearch} aria-label="Clear search">✕</button>
                    )}
                </div>

                {/* Language Selector */}
                <div className="lang-wrapper">
                    <button
                        className="lang-selector"
                        onClick={() => { setLangOpen(o => !o); setNotifOpen(false) }}
                        aria-label="Select language"
                    >
                        <span>🌐</span>
                        <span>{lang}</span>
                        <span className={`arrow ${langOpen ? 'open' : ''}`}>▾</span>
                    </button>
                    {langOpen && (
                        <div className="dropdown lang-dropdown">
                            {languages.map((l) => (
                                <button
                                    key={l}
                                    className={`dropdown-item ${lang === l ? 'selected' : ''}`}
                                    onClick={() => { setLang(l); setLangOpen(false) }}
                                >
                                    {l}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Notifications */}
                <div className="notif-wrapper">
                    <button
                        className="icon-btn"
                        aria-label="Notifications"
                        onClick={() => { setNotifOpen(o => !o); setLangOpen(false) }}
                    >
                        🔔
                        <span className="notif-badge">3</span>
                    </button>
                    {notifOpen && (
                        <div className="dropdown notif-dropdown">
                            <p className="dropdown-heading">Notifications</p>
                            <div className="notif-item">🛒 New order received</div>
                            <div className="notif-item">👤 New customer signed up</div>
                            <div className="notif-item">📦 Product stock low</div>
                        </div>
                    )}
                </div>

                {/* User */}
                <div className="header-user">
                    <div className="avatar-placeholder">MQ</div>
                    <div className="user-meta">
                        <span className="user-name">Mustq</span>
                        <span className="user-role">Admin</span>
                    </div>
                </div>

            </div>

            {/* Close dropdowns on outside click overlay */}
            {(langOpen || notifOpen) && (
                <div
                    className="dropdown-overlay"
                    onClick={() => { setLangOpen(false); setNotifOpen(false) }}
                />
            )}
        </header>
    )
}

export default Header
