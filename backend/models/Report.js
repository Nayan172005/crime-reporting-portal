const db = require('../config/db');

class Report {
  static create(reportData, callback) {
    const { crimeType, description, date, time, location, evidencePath, isAnonymous, contactEmail, contactPhone, userId } = reportData;
    
    db.run(
      `INSERT INTO reports (
        crimeType, description, date, time, location, 
        evidencePath, isAnonymous, contactEmail, contactPhone, userId
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [crimeType, description, date, time, location, evidencePath, isAnonymous ? 1 : 0, contactEmail, contactPhone, userId],
      function(err) {
        callback(err, this.lastID);
      }
    );
  }

  static findByUserId(userId, callback) {
    db.all(
      'SELECT * FROM reports WHERE userId = ?',
      [userId],
      callback
    );
  }
}

module.exports = Report;