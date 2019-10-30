const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 255
  },
  email: {
    type: String,
    required: true,
    maxLength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    maxLength: 1024
  }
});

UserSchema.methods.generateAuthToken = function() {
  return jwt.sign({ id: this._id, name: this.name, email: this.email }, config.get('jwtKey'));
};

const User = mongoose.model('User', UserSchema);

const validate = author => {
  const schema = {
    name: Joi.string().max(255).required(),
    email: Joi.string().max(255).email().required(),
    password: Joi.string().max(1024).required(),
  };

  return Joi.validate(author, schema);
};

module.exports.User = User;
module.exports.validate = validate;