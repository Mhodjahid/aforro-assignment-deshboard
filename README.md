# Dabang Sales Dashboard

A responsive sales analytics dashboard built with **React + Vite**, designed as a frontend assignment. The UI is based on a provided Figma design and uses live data from a public REST API.

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js (v18 or above)
- npm

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/Mhodjahid/aforro-assignment-deshboard.git

# 2. Navigate into the project folder
cd aforro-assignment-deshboard

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Then open your browser at **http://localhost:5173**

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| React 19 | UI library |
| Vite 8 | Build tool & dev server |
| Plain CSS | Styling (no CSS framework) |
| JSONPlaceholder API | Live data source |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Dashboard.jsx       # Main layout, routing between pages
│   ├── Header.jsx          # Search, language selector, notifications
│   ├── Sidebar.jsx         # Navigation menu
│   ├── StatsCards.jsx      # Today's Sales summary cards
│   ├── VisitorInsights.jsx # SVG line chart (Loyal / New / Unique customers)
│   ├── Charts.jsx          # Total Revenue, Customer Satisfaction, Target vs Reality,
│   │                         Top Products, Sales Map, Volume vs Service Level
│   ├── SalesMap.jsx        # World map with country highlights
│   └── UsersTable.jsx      # Searchable, sortable, filterable users table
├── hooks/
│   └── useDashboardData.js # Custom hook — fetches & transforms API data
├── App.jsx
└── main.jsx
```

---

## 💡 Implementation Approach

### 1. Data Layer — `useDashboardData` Custom Hook
All data fetching is centralized in a single custom hook. It makes **3 parallel API calls** using `Promise.all` to [JSONPlaceholder](https://jsonplaceholder.typicode.com):
- `/users` → customer data
- `/posts` → order/revenue data
- `/todos` → completion/product sold data

The raw API data is then **transformed and mapped** to match the dashboard's chart requirements — revenue by day, visitor trends, satisfaction scores, target vs reality, top products, and volume data.

### 2. Component Architecture
Each section of the dashboard is a **standalone component** with its own CSS file. Components receive only the data they need via props, keeping them reusable and easy to maintain.

### 3. Charts — Pure SVG (No Chart Library)
All charts are built using **raw SVG** — no external chart library (no Chart.js, no Recharts). This includes:
- **Line charts** with area fills (Visitor Insights, Customer Satisfaction)
- **Bar charts** (Total Revenue, Target vs Reality, Volume vs Service Level)
- Custom `toPoints()` and `toAreaPath()` helper functions normalize data to SVG coordinates with a shared max scale for accurate comparison

### 4. Users Table — Search, Filter & Sort
The users table supports:
- **Global search** from the header (synced via props)
- **Local search** by name or email
- **City filter** dropdown (dynamically populated from API data)
- **Name sort** toggle (A–Z / Z–A)
- All filtering/sorting is done client-side using `useMemo` for performance

### 5. Header Features
- **Live search** that filters the users table in real time
- **Language selector** dropdown (UI only)
- **Notifications** dropdown with badge count
- Dynamic **page title** based on active sidebar route

### 6. Sidebar Navigation
Client-side routing using React `useState` — no React Router needed. Each nav item switches the rendered content. Placeholder pages are shown for non-dashboard routes.

### 7. Export Feature
The **Today's Sales** section includes a CSV export button that downloads the current stats as a `.csv` file using the Blob API — no backend required.

### 8. Responsive Design
The layout uses CSS Grid with media query breakpoints:
- 3-column charts → 2-column → 1-column on smaller screens
- Sidebar and main content stack on mobile

---

## ✨ Key Features

- ✅ Figma design matched pixel-close
- ✅ Live data from REST API (no mock JSON files)
- ✅ Pure SVG charts — no chart libraries
- ✅ Real-time search across the dashboard
- ✅ CSV export for sales summary
- ✅ Loading states and error handling
- ✅ Fully responsive layout
- ✅ Accessible (aria-labels, aria-current, semantic HTML)
