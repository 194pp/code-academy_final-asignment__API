const jwt = require('jsonwebtoken');
const {secret, tokenExpiration} = require("../../configs");
const {dbVerifyUser} = require("../db");
const AccountsModel = require('../../models/accounts');

function authenticateToken(req, res, next) {
  const token = req.body.token;
  console.log('token', token);

  if (!token) return res.status(401).json({ error: 'unauthorized request' });

  jwt.verify(token, secret, async (err, data) => {
    if (err) {
      return res.status(403).json({ error: 'token expired/invalid' });
    }
    console.log('data in jwt', data);
    const valid = await dbVerifyUser(data._id);
    if (!valid) {
      return res.status(403).json({ error: 'your user was deleted' });
    }
    req.username = data.username;
    req._id = data._id;
    console.log(req.user, req._id)
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
