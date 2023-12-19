const jwt = require('jsonwebtoken');
const token = require('../middlewares/jwtMiddleware');

const verifyToken = (req, res, next) => {
  const accessToken = req.headers.authorization;

  if (!accessToken) {
    return res
      .status(401)
      .json({ 'error': 'Access denied.' });
  }

  try {
    // Verification of the access token. If verified, datas are added to userData and user can access to resources
    const decoded = jwt.verify(accessToken, process.env.ACCESS_JWT_SECRET);
    req.userData = decoded.userData;

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      // If access token is expired, using refresh token
      console.log('Access token expired');
      const refreshToken = req.headers.refreshtoken;

      try {
        // Verification of the refresh token. If verified, new access token generated
        const decodedRefresh = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET);
        const newAccessToken = token.generateAccessToken(decodedRefresh.userId);
        console.log('New access token generated');

        // Verification of the access token. If verified, datas are added to userData and user can access to resources
        const decoded = jwt.verify(newAccessToken, process.env.ACCESS_JWT_SECRET);
        req.userData = decoded.userData;
        console.log('Access token verified');

        next();
      } catch (error) {
        res
          .status(401)
          .json({ 'error': 'Invalid refresh token' });
      }
    } else {
      res
        .status(401)
        .json({ 'error': 'Invalid token' });
    }
  }
};

module.exports = verifyToken;