import { useState, useEffect, useMemo } from 'react'
import './UsersTable.css'

function UsersTable({ globalSearch = '' }) {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [search, setSearch] = useState('')
    const [sortOrder, setSortOrder] = useState('asc')
    const [cityFilter, setCityFilter] = useState('')

    // sync global search from header into local search
    useEffect(() => {
        setSearch(globalSearch)
    }, [globalSearch])

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch users')
                return res.json()
            })
            .then((data) => {
                setUsers(data)
                setLoading(false)
            })
            .catch((err) => {
                setError(err.message)
                setLoading(false)
            })
    }, [])

    // Unique cities for filter dropdown
    const cities = useMemo(
        () => [...new Set(users.map((u) => u.address.city))].sort(),
        [users]
    )

    const filtered = useMemo(() => {
        let result = users

        // Search by name or email
        if (search.trim()) {
            const q = search.toLowerCase()
            result = result.filter(
                (u) =>
                    u.name.toLowerCase().includes(q) ||
                    u.email.toLowerCase().includes(q)
            )
        }

        // Filter by city
        if (cityFilter) {
            result = result.filter((u) => u.address.city === cityFilter)
        }

        // Sort by name
        result = [...result].sort((a, b) =>
            sortOrder === 'asc'
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name)
        )

        return result
    }, [users, search, cityFilter, sortOrder])

    return (
        <div className="table-section">
            <div className="table-header">
                <h2>Users</h2>
                <div className="table-controls">
                    <input
                        type="text"
                        className="table-search"
                        placeholder="Search by name or email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        aria-label="Search users"
                    />
                    <select
                        className="city-filter"
                        value={cityFilter}
                        onChange={(e) => setCityFilter(e.target.value)}
                        aria-label="Filter by city"
                    >
                        <option value="">All Cities</option>
                        {cities.map((city) => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                    <button
                        className="sort-btn"
                        onClick={() => setSortOrder((o) => (o === 'asc' ? 'desc' : 'asc'))}
                        aria-label={`Sort by name ${sortOrder === 'asc' ? 'Z–A' : 'A–Z'}`}
                    >
                        Name {sortOrder === 'asc' ? '↑ A–Z' : '↓ Z–A'}
                    </button>
                </div>
            </div>

            {loading && (
                <div className="table-state">
                    <div className="spinner" aria-label="Loading"></div>
                    <p>Loading users...</p>
                </div>
            )}

            {error && (
                <div className="table-state error">
                    <p>⚠️ {error}</p>
                    <button onClick={() => window.location.reload()}>Retry</button>
                </div>
            )}

            {!loading && !error && (
                <>
                    <div className="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Company</th>
                                    <th>City</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="no-results">No users found</td>
                                    </tr>
                                ) : (
                                    filtered.map((user, i) => (
                                        <tr key={user.id}>
                                            <td>{i + 1}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.company.name}</td>
                                            <td>{user.address.city}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    <p className="table-count">{filtered.length} user{filtered.length !== 1 ? 's' : ''} found</p>
                </>
            )}
        </div>
    )
}

export default UsersTable
