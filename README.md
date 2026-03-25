# 🚌 CampusTrack — Bus Tracking System

A full-stack prototype for student bus tracking with live map, login, and student profiles.

---

## Project Structure

```
bus-tracker/
├── backend/
│   ├── server.js        ← Express API server
│   └── package.json
└── frontend/
    └── index.html       ← Single-file frontend (HTML/CSS/JS + Leaflet map)
```

---

## Quick Start

### 1. Start the Backend

```bash
cd backend
npm install
npm start
# API running at http://localhost:3001
```

### 2. Open the Frontend

Simply open `frontend/index.html` in any browser:
```bash
open frontend/index.html
# or double-click it in your file manager
```

---

## Demo Login Credentials

| Roll No  | Password    | Name          | Bus     |
|----------|-------------|---------------|---------|
| 21CS045  | password123 | Arjun Sharma  | BUS-03  |
| 22EC012  | password123 | Priya Nair    | BUS-01  |
| 20ME078  | password123 | Rahul Kumar   | BUS-02  |

---

## Features

### Login Page
- Roll number + password authentication
- Animated dark-themed UI with grid background
- Error handling with friendly messages

### Live Map (Dashboard)
- OpenStreetMap via Leaflet.js
- 3 buses with animated markers updating every 5 seconds
- Your assigned bus highlighted with green pulse indicator
- Click any bus marker for popup details
- College campus marker

### Bus Sidebar
- Live status (Active / Delayed)
- Speed, ETA, occupancy bar
- Stop chips showing route with current stop highlighted
- "MY BUS" tag on your assigned bus

### Student Profile
- Full student information (name, roll no, year, branch, place)
- Contact details (email, phone)
- Bus assignment section with live ETA
- Clean two-column layout

---

## API Endpoints

| Method | Endpoint          | Description              |
|--------|-------------------|--------------------------|
| POST   | /api/login        | Authenticate student     |
| GET    | /api/buses        | Get all live bus data    |
| GET    | /api/student/:id  | Get student by ID        |
| GET    | /api/health       | Health check             |

---

## Tech Stack

- **Frontend**: Vanilla HTML/CSS/JS + Leaflet.js (no build step needed)
- **Backend**: Node.js + Express
- **Map**: OpenStreetMap tiles (free, no API key needed)
- **Fonts**: Syne + Space Grotesk (Google Fonts)
