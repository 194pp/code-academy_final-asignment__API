const mongoose = require('mongoose');
const configs = require("../../configs");
const AccountsModel = require('../../models/accounts');

const dbConnect = async (app) => {
  mongoose.connect(configs.dbString, { useNewUrlParser: true, useUnifiedTopology: true})
    .then( _ => app.listen(configs.serverPort, () => {
      console.log(`Running on port: ${configs.serverPort}`);
    }))
    .catch((err) => console.log(err));
}
const dbCreateUser = async (data) => {
  return await AccountsModel.create(data).then(doc => doc);
}
const dbFindUsers = async (filter = {}) => {
  return AccountsModel.find({...filter, archived: false});
}
const dbFindUser = async (id) => {
  return AccountsModel.findOne({_id: id, archived: false});
}
const dbDeleteUser = async (id) => {
  return AccountsModel.findOneAndUpdate({_id: id}, {$set: {archived: true}});
}
const dbVerifyUser = async (id) => {
  const user = await AccountsModel.findOne({_id: id, archived: false});
  return !!user;
}
const dbModifyUser = async (id, data) => {
  return AccountsModel.updateOne({_id: id}, {$set: {...data}});
}

module.exports = {
  dbConnect,
  dbCreateUser,
  dbFindUsers,
  dbFindUser,
  dbDeleteUser,
  dbVerifyUser,
  dbModifyUser,
};
