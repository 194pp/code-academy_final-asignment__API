const mongoose = require('mongoose');
const {isEmail} = require('validator');
const {encrypt} = require("../helpers/encryption/encryption");

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
    select: false,
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
  archived: {
    type: Boolean,
    default: false,
    select: false,
  }
});

AccountsSchema.post('save', async function () {
  console.log('Naujas vartotojas sukurtas ir išsaugotas duomenų bazėje', this);
});
AccountsSchema.pre('save', async function () {
  this.password = await encrypt(this.password);
});

module.exports = mongoose.model('accounts', AccountsSchema);
