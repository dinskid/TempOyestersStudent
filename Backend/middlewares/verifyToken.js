const { verify } = require('crypto');
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  if (!req.headers['auth-token'])
    return res.status(401).send('You are not logged in');
  try {
    const verified = jwt.verify(req.headers['auth-token'], process.env.JWT_KEY);
    req.user = verified;
    console.log(req.user);
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};

module.exports = verifyToken;
