const jwt = require('jsonwebtoken');
const token = require('../middlewares/jwtMiddleware');

const verifyToken = (req, res, next) => {
  const accessToken = req.headers.authorization;

  if (!accessToken) {
    return res.status(401).json({ error: 'Access denied' });
  }

  try {
    // Verification of the token. If verified, datas are added to userData
    const decoded = jwt.verify(accessToken, process.env.ACCESS_JWT_SECRET);
    req.userData = decoded.userData;

    next();
  } catch (error) {
    if (error) {
      const refreshToken = req.headers.refreshtoken;

      try {
        const decodedRefresh = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET);
        const newAccessToken = token.generateAccessToken(decodedRefresh.userId);

        const decoded = jwt.verify(newAccessToken, process.env.ACCESS_JWT_SECRET);
        req.userData = decoded.userData;

        next();
      } catch (error) {
        res.status(401).json({ error: 'Invalid refresh token' });
      }
    } else {
      res.status(401).json({ error: 'Invalid token' });
    }
  }
};

module.exports = verifyToken;