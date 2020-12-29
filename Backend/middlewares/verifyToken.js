const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  if (!req.headers['authorization'])
    return res.status(401).send('You are not logged in');
  try {
    const verified = jwt.verify(
      req.headers['authorization'].slice(7),
      process.env.JWT_KEY
    );
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({
      success: 0,
      error: 'Invalid Token',
    });
  }
};

module.exports = verifyToken;
