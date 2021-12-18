const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');

const AccountsSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    minlength: 5,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    trim: true,
    minlength: 8,
    required: true,
  },
  age: {
    type: Number,
    min: 12,
    max: 130,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    validate: [isEmail, 'Please enter a valid email'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
});

AccountsSchema.post('save', async function () {
  console.log('Naujas vartotojas sukurtas ir išsaugotas duomenų bazėje', this);
});

AccountsSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt();
  console.log('Slaptažodis: ', this.password);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('accounts', AccountsSchema);
