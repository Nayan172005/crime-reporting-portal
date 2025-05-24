const jwt = require('jsonwebtoken');
const db = require('../config/db');

exports.login = (req, res) => {
  const user = {
    id: 1,
    email: 'test@example.com',
    role: 'user'
  };

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    'your-secret-key',
    { expiresIn: '1h' }
  );

  res.json({ token });
};

exports.register = (req, res) => {
  res.status(201).json({ message: 'User registered' });
};