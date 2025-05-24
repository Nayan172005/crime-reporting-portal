const app = require('./app');
const db = require('./config/db');
const cors = require('cors');
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());

// Routes
app.get('/api/crime-stats', (req, res) => {
  db.all(`
    SELECT crimeType as name, COUNT(*) as cases 
    FROM reports 
    GROUP BY crimeType
    ORDER BY cases DESC
  `, [], (err, rows) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    const defaultCrimes = [
      'Cyber Crime', 'Theft', 'Fraud', 
      'Assault', 
      'Drug Offence', 'Other'
    ];
    
    const stats = defaultCrimes.map(crime => ({
      name: crime,
      cases: (rows.find(r => r.name === crime)?.cases) || 0
    }));
    
    res.json(stats);
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

app.use('/api/reports', require('./routes/reportRoutes'));


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});