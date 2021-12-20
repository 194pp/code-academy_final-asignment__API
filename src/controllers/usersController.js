const {errorResp, successResp} = require("../helpers/response/response");
const {dbFindUsers, dbDeleteUser, dbModifyUser, dbFindUser} = require("../helpers/db");

module.exports = {
  getAll: async (req, res) => {
    try {
      const users = await dbFindUsers();
      res.status(201).json(successResp('Got users', {users}));
    } catch (err) {
      console.log(err);
      res.status(400).send(errorResp('Getting data failed', err));
    }
  },
  getOne: async (req, res) => {
    try {
      const user = await dbFindUser(req.params._id);
      res.status(201).json(successResp('Got user', {user}));
    } catch (err) {
      console.log(err);
      res.status(400).send(errorResp('Getting data failed', err));
    }
  },
  deleteOne: async (req, res) => {
    try {
      console.log({requestBody: req.body});
      const deletedUser = await dbDeleteUser(req.body.idToDelete);
      console.log({deletedUser: deletedUser});
      if (!document) return res.status(404).send(errorResp('no account to delete'));
      res.status(200).json(successResp('User was deleted'));
    } catch (err) {
      console.log(err);
      res.status(400).send(errorResp("Deleting document failed", err));
    }
  },
  modifyOne: async (req, res) => {
    try {
      const newData = {};
      if (req.body.username) newData.username = req.body.username;
      if (req.body.age) newData.age = req.body.age;
      if (req.body.password) newData.username = req.body.password;
      if (req.body.email) newData.email = req.body.email;
      if (!newData) return res.status(204).send(errorResp("No data to edit"));

      await dbModifyUser(req.body.idToModify, {...req.body});
      const modifiedUser = await dbFindUser(req.body.idToModify);
      res.status(201).json(successResp('User modified', {modifiedUser}));
    } catch (err) {
      console.log(err);
      res.status(400).send(errorResp("Editing document failed", err));
    }
  }
};
