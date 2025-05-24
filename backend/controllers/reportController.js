const Report = require('../models/Report');
const path = require('path');
const fs = require('fs');

const submitReport = async (req, res) => {
  try {
    let evidencePath = null;
    
    if (req.file) {
      evidencePath = `/uploads/${req.file.filename}`;
    }

    const reportData = {
      ...req.body,
      evidencePath,
      userId: req.user.id
    };

    Report.create(reportData, (err, reportId) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.status(201).json({ 
        message: 'Report submitted successfully',
        reportId 
      });
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  submitReport
};