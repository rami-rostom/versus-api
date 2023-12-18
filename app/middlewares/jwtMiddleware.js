const jwt = require('jsonwebtoken');

const token = {
  generateTokenForUser: (userData) => {
    return jwt.sign({
      userId: userData.id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '24h'
    });
  }
};

module.exports = token;