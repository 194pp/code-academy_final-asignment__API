const AccountsModel = require('../models/accounts');
const bcrypt = require('bcrypt');
const {errorResp, successResp} = require("../helpers/response/response");
const jwt = require('jsonwebtoken');
const {secret} = require("../configs");

module.exports = {
  loginUser: async (req, res) => {

    try {
      const account = await AccountsModel.findOne(
        {username: req.body.username, archived: false}
      ).select('+password');
      if (!account) {
        return res.status(401).send(errorResp('Account does not exist'));
      }
      await bcrypt.compare(req.body.password, account.password, function (err, result) {
        if (err) {
          res.status(400).send(errorResp('Error checking password', err));
        } else if (result) {
          const dataToEncrypt = {
            _id: account._id,
            username: account.username,
            role: account.role,
          }
          const token = jwt.sign(dataToEncrypt, secret, {expiresIn: '24h'});
          res.status(201).json(successResp('Logged in', {token: token}));
        } else {
          res.status(401).send(errorResp('Wrong password', err));
        }
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(errorResp('Login failed', err));
    }
  },
};
