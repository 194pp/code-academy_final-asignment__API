const jwt = require('jsonwebtoken');
const {secret, tokenExpiration} = require("../../configs");
const {dbVerifyUser} = require("../db");

function authenticateToken(req, res, next) {
  const token = req.headers["authorization"].split(' ')[1];

  if (!token) return res.status(401).json({ error: 'unauthorized request' });

  jwt.verify(token, secret, async (err, data) => {
    if (err) {
      return res.status(403).json({ error: 'token expired/invalid' });
    }
    const valid = await dbVerifyUser(data._id);
    if (!valid) {
      return res.status(403).json({ error: 'your user was deleted' });
    }
    next();
  });
}
function generateToken(data) {
  return jwt.sign(data, secret, {expiresIn: tokenExpiration});
}

module.exports = {
  authenticateToken,
  generateToken,
}
