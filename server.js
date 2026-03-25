const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// --- Mock Data ---
const students = [
  { id: 'S001', name: 'Arjun Sharma', rollNo: '21CS045', year: '3rd Year', branch: 'Computer Science', place: 'Tambaram', busId: 'BUS-03', email: 'arjun@college.edu', phone: '9876543210', avatar: 'AS' },
  { id: 'S002', name: 'Priya Nair',   rollNo: '22EC012', year: '2nd Year', branch: 'Electronics',      place: 'Velachery',  busId: 'BUS-01', email: 'priya@college.edu',  phone: '9876543211', avatar: 'PN' },
  { id: 'S003', name: 'Rahul Kumar',  rollNo: '20ME078', year: '4th Year', branch: 'Mechanical',       place: 'Chromepet',  busId: 'BUS-02', email: 'rahul@college.edu',  phone: '9876543212', avatar: 'RK' },
];

// Credentials: rollNo → password (demo: "password123")
const credentials = {
  '21CS045': 'password123',
  '22EC012': 'password123',
  '20ME078': 'password123',
};

// Bus base locations near Chennai area
const busRoutes = {
  'BUS-01': { name: 'Route A – Velachery Express', color: '#00d4aa', stops: ['Velachery','Guindy','Saidapet','College'], basePos: { lat: 12.9816, lng: 80.2209 } },
  'BUS-02': { name: 'Route B – Chromepet Link',    color: '#f59e0b', stops: ['Chromepet','Pallavaram','Tambaram','College'], basePos: { lat: 12.9516, lng: 80.1415 } },
  'BUS-03': { name: 'Route C – Tambaram Fast',     color: '#6366f1', stops: ['Tambaram','Perungalathur','Vandalur','College'], basePos: { lat: 12.9249, lng: 80.1000 } },
};

// Simulate live positions with slight drift per request
let tick = 0;
function getBusPositions() {
  tick += 0.015;
  return Object.entries(busRoutes).map(([id, route]) => ({
    id,
    name: route.name,
    color: route.color,
    stops: route.stops,
    status: Math.random() > 0.1 ? 'active' : 'delayed',
    speed: Math.floor(28 + Math.random() * 25),
    occupancy: Math.floor(18 + Math.random() * 22),
    capacity: 45,
    nextStop: route.stops[Math.floor((tick * 0.5) % route.stops.length)],
    eta: `${Math.floor(3 + Math.random() * 12)} min`,
    lat: route.basePos.lat + Math.sin(tick + id.charCodeAt(4)) * 0.02,
    lng: route.basePos.lng + Math.cos(tick + id.charCodeAt(4)) * 0.02,
    lastUpdated: new Date().toISOString(),
  }));
}

// --- Routes ---
app.post('/api/login', (req, res) => {
  const { rollNo, password } = req.body;
  if (!rollNo || !password) return res.status(400).json({ error: 'Missing credentials' });
  if (credentials[rollNo] !== password) return res.status(401).json({ error: 'Invalid credentials' });
  const student = students.find(s => s.rollNo === rollNo);
  res.json({ success: true, token: `tok_${rollNo}_${Date.now()}`, student });
});

app.get('/api/buses', (req, res) => {
  res.json({ buses: getBusPositions(), timestamp: new Date().toISOString() });
});

app.get('/api/student/:id', (req, res) => {
  const student = students.find(s => s.id === req.params.id);
  if (!student) return res.status(404).json({ error: 'Not found' });
  res.json(student);
});

app.get('/api/health', (_, res) => res.json({ status: 'ok', time: new Date() }));

const PORT = 3001;
app.listen(PORT, () => console.log(`🚌 Bus Tracker API running on http://localhost:${PORT}`));
