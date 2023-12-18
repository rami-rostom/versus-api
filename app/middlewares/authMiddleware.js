const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }

  try {
    // Verification of the token. If verified, datas are added to userData
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = decoded.userData;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = verifyToken;