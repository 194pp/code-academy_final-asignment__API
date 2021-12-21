const {validateTokenForFrontend} = require("../helpers/auth/jwtHelper");
module.exports = {
  validateToken: async (req, res) => {
    try {
      const token = req.headers["authorization"].split(' ')[1];
      validateTokenForFrontend(token);
      res.send(true);
    } catch (err) {
      res.send(false)
    }
  }
}
