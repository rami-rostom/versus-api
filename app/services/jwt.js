const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const token = {
  generateTokenForUser: (userData) => {
    return jwt.sign({
      userId: userData.id,
    },
    JWT_SECRET,
    {
      expiresIn: '24h'
    });
  }
};

module.exports = token;