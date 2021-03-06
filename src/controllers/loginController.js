const AccountsModel = require('../models/accounts');
const bcrypt = require('bcrypt');
const {errorResp, successResp} = require("../helpers/response/response");
const {generateToken} = require("../helpers/auth/jwtHelper");

module.exports = {
  loginUser: async (req, res) => {
    try {
      const account = await AccountsModel.findOne(
        {username: req.body.username, archived: false}
      ).select('+password');
      if (!account) {
        return res.status(401).send(errorResp('Šis vartotojas neegzistuoja'));
      }
      await bcrypt.compare(req.body.password, account.password, function (err, result) {
        if (err) {
          res.status(400).send(errorResp('Klaida tikrinant slaptažodį', err));
        } else if (result) {
          const dataToEncrypt = {
            _id: account._id,
            username: account.username,
          };
          const token = generateToken(dataToEncrypt);
          res.status(201).json(successResp('Logged in', {token: token}));
        } else {
          res.status(401).send(errorResp('Netinkamas slaptažodis', err));
        }
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(errorResp('Prisijungti nepavyko', err));
    }
  },
};
