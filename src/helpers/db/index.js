const mongoose = require('mongoose');
const configs = require("../../configs");

const dbConnect = async (app) => {
  mongoose.connect(configs.dbString, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(configs.serverPort, () => {
      console.log(`Running on port: ${configs.serverPort}`);
    }))
    .catch((err) => console.log(err));
}
const dbCreateDoc = async (model, data) => {
  await model.create(data).then(doc => doc);
}
const dbFindDocuments = async (model, filter = {}) => {
  return await model.find({...filter, archived: false});
}
const dbDeleteDocument = async (model, id) => {
  return await model.findOneAndUpdate({_id: id}, {$set: {archived: true}});
}

module.exports = {
  dbConnect,
  dbCreateDoc,
  dbFindDocuments,
  dbDeleteDocument
};
