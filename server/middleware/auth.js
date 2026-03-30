const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No authorization token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretkey123');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error('Authentication Error:', error.message);
    res.status(401).json({ message: 'Authorization failed', error: error.message });
  }
};

module.exports = auth;
