const jwt = require('jsonwebtoken');
const {secret} = require("../../configs");

function authenticateToken(req, res, next) {
  const token = req.body.token;
  console.log('token', token);

  if (!token) return res.status(401).json({ error: 'unauthorized request' });

  jwt.verify(token, secret, (err, data) => {
    if (err) {
      return res.status(403).json({ error: 'token expired/invalid' });
    }
    console.log('data in jwt', data);
    req.user = data.email;
    req.userId = data.userId;
    console.log(req.user, req.userId)
    next();
  });
}

module.exports = authenticateToken
