const AccountsModel = require('../models/accounts');
const {errorResp, successResp} = require("../helpers/response/response");
const {dbFindDocuments, dbDeleteDocument} = require("../helpers/db");
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const {secret} = require("../configs");

module.exports = {
  getAll: async (req, res) => {
    try {
      const users = await dbFindDocuments(AccountsModel);
      res.status(201).json(successResp('Got users', {users}));
    } catch (err) {
      console.log(err);
      res.status(400).send(errorResp('Getting data failed', err));
    }
  },
  deleteOne: async (req, res) => {
    try {
      const document = await dbDeleteDocument(AccountsModel, req.body.idToDelete);
      if (!document) return res.status(404).send(errorResp('no account to delete'));
      res.send(document);
    } catch (err) {
      console.log(err);
      res.status(400).send(errorResp("Deleting document failed", err));
    }
  }
};
