import { useState, useEffect } from 'react'

export function useDashboardData() {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        Promise.all([
            fetch('https://jsonplaceholder.typicode.com/users').then(r => r.json()),
            fetch('https://jsonplaceholder.typicode.com/posts').then(r => r.json()),
            fetch('https://jsonplaceholder.typicode.com/todos').then(r => r.json()),
        ])
            .then(([users, posts, todos]) => {
                const totalCustomers = users.length
                const totalOrders = posts.length
                const completedTodos = todos.filter(t => t.completed).length
                const totalRevenue = posts.reduce((sum, p) => sum + p.id * 12, 0)

                // Revenue bar chart — posts grouped by day index
                const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                const revenueByDay = days.map((day, i) => {
                    const dayPosts = posts.filter(p => p.id % 7 === i)
                    return { day, online: dayPosts.length * 4, offline: dayPosts.length * 2 }
                })

                // Visitor Insights — cumulative counts over months
                const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
                const loyal = months.map((_, i) => 30 + (i * 5) + Math.sin(i) * 10)
                const newU = months.map((_, i) => 20 + (i * 4) + Math.cos(i) * 8)
                const unique = months.map((_, i) => 15 + (i * 3) + Math.sin(i * 0.5) * 6)

                // Customer Satisfaction — normalized wave data for clean overlapping lines
                const lastMonth = [40, 55, 35, 60, 45, 70, 50, 65, 42, 58]
                const thisMonth = [30, 48, 52, 42, 68, 58, 75, 50, 62, 72]
                const lastMonthTotal = users.reduce((sum, u) =>
                    sum + todos.filter(t => t.userId === u.id && t.completed).length * 5, 0)
                const thisMonthTotal = users.reduce((sum, u) =>
                    sum + todos.filter(t => t.userId === u.id).length * 4, 0)

                // Target vs Reality — posts vs todos per user (first 6)
                const targetVsReality = users.slice(0, 6).map(u => ({
                    month: u.name.split(' ')[0].slice(0, 3),
                    reality: posts.filter(p => p.userId === u.id).length * 6,
                    target: todos.filter(t => t.userId === u.id).length * 2,
                }))

                // Top Products — top 4 companies by post count
                const maxPostsPerUser = Math.max(...users.map(u => posts.filter(p => p.userId === u.id).length), 1)
                const topProducts = users
                    .map(u => ({
                        name: u.company.name,
                        count: posts.filter(p => p.userId === u.id).length,
                    }))
                    .sort((a, b) => b.count - a.count)
                    .slice(0, 4)
                    .map((p, i) => {
                        const colors = ['#6c5ce7', '#00cec9', '#fd79a8', '#fdcb6e']
                        return {
                            name: p.name,
                            popularity: Math.min(Math.round((p.count / maxPostsPerUser) * 100), 100),
                            sales: Math.round((p.count / totalOrders) * 100) + '%',
                            color: colors[i],
                        }
                    })

                // Volume vs Service — users grouped by city
                const cityGroups = {}
                users.forEach(u => {
                    const city = u.address.city
                    if (!cityGroups[city]) cityGroups[city] = { userCount: 0, postCount: 0 }
                    cityGroups[city].userCount++
                    cityGroups[city].postCount += posts.filter(p => p.userId === u.id).length
                })
                const volumeData = Object.entries(cityGroups)
                    .slice(0, 4)
                    .map(([label, val]) => ({
                        label: label.slice(0, 6),
                        volume: val.postCount * 2,
                        services: val.userCount * 10,
                    }))

                setData({
                    stats: {
                        totalRevenue: '$' + (totalRevenue / 1000).toFixed(1) + 'k',
                        totalOrders,
                        completedTodos,
                        totalCustomers,
                    },
                    revenueByDay,
                    visitorInsights: { months, loyal, newU, unique },
                    satisfaction: {
                        lastMonth,
                        thisMonth,
                        lastMonthTotal: '$' + lastMonthTotal.toLocaleString(),
                        thisMonthTotal: '$' + thisMonthTotal.toLocaleString(),
                    },
                    targetVsReality,
                    topProducts,
                    volumeData,
                })
                setLoading(false)
            })
            .catch(err => {
                setError(err.message)
                setLoading(false)
            })
    }, [])

    return { data, loading, error }
}
