const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const db = require('./config/db'); 

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/api/test', (req, res) => {
  res.json({ message: "Backend is working!" });
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/reports', require('./routes/reportRoutes'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;