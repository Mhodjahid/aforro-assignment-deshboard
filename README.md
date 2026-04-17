# aforro-assignment-deshboard

A sales dashboard built with React + Vite as part of a frontend assignment. UI is based on a Figma design and uses live data from JSONPlaceholder API.

---

## Getting Started

Make sure Node.js v18 or above and npm are installed on your machine.

First clone the repo, then go into the project folder and run npm install to install dependencies. After that run npm run dev and open http://localhost:5173 in your browser.

For production build run npm run build and then npm run preview.

---

## Tech Used

- React 19
- Vite
- Plain CSS
- JSONPlaceholder API

---

## Project Structure

The src folder has two main parts — components and hooks.

Components include Dashboard which handles the main layout, Header for search and notifications, Sidebar for navigation, StatsCards for the sales summary, VisitorInsights and Charts for all the graphs, SalesMap for the world map, and UsersTable for the users list.

The hooks folder has one file useDashboardData.js which handles all the API calls and data transformation.

---

## How I Built It

**Data fetching** — I created a custom hook that calls 3 API endpoints at the same time using Promise.all. The response data is then shaped into whatever format each chart needs.

**Charts** — I built all charts using raw SVG without any chart library. Wrote my own helper functions to convert number arrays into SVG coordinates and area paths.

**Users table** — supports search by name or email, filter by city, and sort by name. Everything is client side using useMemo.

**Header search** — connected directly to the users table so typing in the header filters the table in real time.

**Export** — the stats section has a button that downloads current data as a CSV using the Blob API.

**Routing** — used simple useState instead of React Router since only the dashboard page has actual content.

---

## What Works

- live data from API with loading and error states
- all charts built with SVG, no chart library used
- search, filter and sort on users table
- CSV export for sales stats
- responsive on different screen sizes
- UI close to the Figma design
