const mongoose = require('mongoose');
const Joi = require('joi');

const AuthorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  bio: String
});

const Author = mongoose.model('Author', AuthorSchema);

const validate = author => {
  const schema = {
    name: Joi.string().required(),
    bio: Joi.string()
  };

  return Joi.validate(author, schema);
};

module.exports.Author = Author;
module.exports.AuthorSchema = AuthorSchema;
module.exports.validate = validate;