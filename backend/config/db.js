const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./crime-portal.db', (err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to SQLite database');
    db.run(`
      CREATE TABLE IF NOT EXISTS reports (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        crimeType TEXT,
        description TEXT,
        date TEXT,
        time TEXT,
        location TEXT,
        evidencePath TEXT,
        isAnonymous INTEGER DEFAULT 0,
        contactEmail TEXT,
        contactPhone TEXT,
        status TEXT DEFAULT 'pending',
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }
});

module.exports = db;