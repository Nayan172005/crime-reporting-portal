const express = require('express');
const router = express.Router();
const db = require('../config/db'); 
const multer = require('multer');

const upload = multer({ dest: 'public/uploads/' });

router.get('/', (req, res) => {
  db.all('SELECT * FROM reports', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

router.post('/', upload.single('evidence'), (req, res) => {
  const reportData = {
    ...req.body,
    evidencePath: req.file ? `/uploads/${req.file.filename}` : null
  };

  db.run(
    `INSERT INTO reports (
      crimeType, description, date, time, location, 
      evidencePath, isAnonymous, contactEmail, contactPhone
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      reportData.crimeType,
      reportData.description,
      reportData.date,
      reportData.time,
      reportData.location,
      reportData.evidencePath,
      reportData.anonymous ? 1 : 0,
      reportData.contactEmail,
      reportData.contactPhone
    ],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ 
        message: 'Report submitted successfully',
        id: this.lastID 
      });
    }
  );
});


router.get('/:id', (req, res) => {
  const reportId = req.params.id;

  db.get('SELECT * FROM reports WHERE id = ?', [reportId], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (!row) {
      return res.status(404).json({ error: 'Report not found' });
    }
    res.json(row);
  });
});

router.put('/:id', (req, res) => {
  const reportId = req.params.id;
  const { crimeType, description, date, time, location, status } = req.body;

  db.run(
    `UPDATE reports 
     SET crimeType = ?, description = ?, date = ?, time = ?, location = ?, status = ?
     WHERE id = ?`,
    [crimeType, description, date, time, location, status, reportId],
    function (err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to update report' });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Report not found' });
      }
      res.json({ message: 'Report updated successfully' });
    }
  );
});

module.exports = router;