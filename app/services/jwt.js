const jwt = require('jsonwebtoken');

const JWT_SECRET = 'versus_4_gamers';

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