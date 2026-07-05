# EmployeeHub — Employee Dashboard

A frontend Employee Dashboard built as a take-home assignment for the Junior Frontend Developer role at RPS. Includes attendance tracking, leave management, a team directory, company announcements, and a live AI-powered summarizer and HR chat assistant.

**Live Demo:** https://employeehub-pi.vercel.app/
**Repository:** https://github.com/akshaykocharekar/Employeehub

---

## Features

- **Dashboard** — at-a-glance stats: attendance overview, leave summary, latest announcements, quick actions
- **Attendance** — table view of daily attendance status with a summary chart
- **Leave** — leave balance summary, leave request form with validation, pending requests list
- **Team Directory** — searchable, filterable team member grid
- **Announcements** — company announcements with an AI-powered "Summarize" action
- **Profile** — employee profile page
- **Dark Mode** — theme toggle, persisted across sessions
- **Notifications** — in-app notification panel
- **AI Chat Assistant** — ask questions about your attendance/leave/team, answered using live context
- **Responsive design** across mobile and desktop
- **Smooth animations** via Framer Motion

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | React 19 + Vite |
| Routing | React Router v7 |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Charts | Recharts |
| Toasts | react-hot-toast |
| Icons | lucide-react, react-icons |
| Theme | next-themes + custom ThemeContext |
| AI | Google Gemini API (`@google/genai`, model: `gemini-2.5-flash`) |
| Linting | oxlint |

No backend — all data (attendance, leave, team, announcements, profile, notifications) is served from local mock JSON files under `src/data/`, accessed through a simulated async API layer (`src/services/mockApi.js`) so components consume it the same way they would a real API.

## Setup

**Prerequisites:** Node.js 18+ and npm

```bash
# 1. Clone the repo
git clone https://github.com/akshaykocharekar/Employeehub.git
cd Employeehub

# 2. Install dependencies
npm install

# 3. Add your Gemini API key
# Create a .env file in the project root:
echo "VITE_GEMINI_API_KEY=your_gemini_api_key_here" > .env

# 4. Run the dev server
npm run dev

# 5. Build for production
npm run build

# 6. Preview the production build locally
npm run preview
```

Get a free Gemini API key at [Google AI Studio](https://aistudio.google.com/apikey).

## Architecture

```
src/
  components/
    announcements/     -> AnnouncementCard, AnnouncementList
    attendance/          -> AttendanceRow, AttendanceSummary, AttendanceTable
    chat/                 -> ChatBot, ChatInput, ChatMessage (AI assistant UI)
    common/               -> Button, Card, Container, Input, Loader (shared primitives)
    dashboard/            -> StatsGrid, StatsCard, AttendanceChart, AttendanceOverview,
                            AnnouncementsPanel, QuickActions, DashboardHeader, SectionHeading
    leave/                -> LeaveForm, LeaveSummary, PendingRequests
    navigation/           -> Navbar, Sidebar
    notifications/        -> NotificationPanel
    team/                 -> TeamCard, TeamFilters, TeamGrid
    ui/                   -> PageHeader, SectionHeader, EmptyState (generic UI helpers)
  context/
    ThemeContext.jsx      -> dark mode state, persisted to localStorage
  data/
    *.json                -> mock data for attendance, leave, team, announcements, profile, notifications
    navigation.js, dashboard.js -> static config data
  hooks/
    useFetch.js, useMockFetch.js -> data-fetching hooks wrapping the mock API layer
  layouts/
    MainLayout.jsx         -> shared shell (sidebar + navbar + content outlet)
  pages/
    Dashboard.jsx, Attendance.jsx, Leave.jsx, Team.jsx, Announcements.jsx, Profile.jsx, NotFound.jsx
  services/
    ai.js                  -> Gemini API integration (summarizeAnnouncement, askHR)
    mockApi.js              -> simulated async data layer over local JSON
  utils/
    constants.js, helpers.js, dashboardUtils.js, chartUtils.js, chatbot.js
  config/
    app.js, routes.js
```

**Design principles followed:**
- Feature-based component folders (`attendance/`, `leave/`, `team/`, etc.) rather than one flat `components/` dump — keeps related UI together
- A `mockApi.js` layer simulates real network latency (`await delay()`) so the rest of the app is written as if it's talking to a real backend — swapping in a real API later means changing this one file, not every component
- Shared primitives (`Button`, `Card`, `Input`, `Loader`) live in `common/` and are reused across every feature, avoiding duplicated styling
- Theme state lives in a single `ThemeContext`, avoiding prop-drilling dark mode through every component
- Routing and layout are separated (`App.jsx` defines routes, `MainLayout.jsx` defines the shared shell), so adding a new page is a two-line change

## AI Tools Used

- **ChatGPT** — used throughout development as a coding assistant: scaffolding components, debugging, refining Tailwind styling, and structuring the mock API layer.
- **Google Gemini (`gemini-2.5-flash`)** — the live AI feature integrated *into the product itself*, via `src/services/ai.js`:
  - `summarizeAnnouncement()` — condenses a company announcement into 3 concise bullet points
  - `askHR()` — powers the in-app AI chat assistant, answering employee questions using the employee's own mock data as context

## Assumptions & Trade-offs

- No authentication — the app assumes a single logged-in employee; all data is scoped to one mock user rather than supporting multiple accounts
- No real backend/database — all data is static local JSON, wrapped in an async mock API layer to simulate real fetch behavior (including artificial delay for realistic loading states)
- Leave requests submitted through the form update local state only (added to a "pending" list) and reset on page refresh — there's no persistence layer, by design, since this is a frontend-only assignment
- Voice search was intentionally left out — deprioritized in favor of polishing the core required features and the two AI integrations, given the assignment timeline
- Gemini was chosen over other AI APIs for the in-product feature due to its generous free tier, making it easy for reviewers to run the project locally with their own key
