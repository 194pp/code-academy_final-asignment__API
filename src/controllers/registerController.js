const AccountsModel = require('../models/accounts');
const { successResp, errorResp } = require('../helpers/response/response');

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = {};

  if (err.code === 11000) {
    if (err.keyPattern.username) {
      errors.username = 'Vartotojo vardas jau naudojamas';
    } else if (err.keyPattern.email) {
      errors.email = 'Elektroninis paštas jau naudojamas';
    }
    return errors;
  }

  if (err.message.includes('accounts validation failed')) {
    Object.values(err.errors).forEach(({properties}) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

module.exports = {
  registerNewUser: async (req, res) => {
    try {
      const account = await AccountsModel.create({...req.body});
      res.status(201).json(successResp('Account has been created', account));
    } catch (err) {
      const errors = handleErrors(err);
      res.status(400).send(errorResp('Registracijos klaida', errors));
    }
  },
};
