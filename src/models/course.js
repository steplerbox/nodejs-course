const mongoose = require('mongoose');
const Joi = require('joi');
const { AuthorSchema } = require('./author');

const Course = mongoose.model('Course', new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  author: {
    type: AuthorSchema,
    required: true
  },
  tags: [ String ],
  isPublished: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
}));

const validate = course => {
  const schema = {
    name: Joi.string().required(),
    authorId: Joi.string(),
    isPublished: Joi.boolean(),
    date: Joi.date()
  };

  return Joi.validate(course, schema);
};

module.exports.Course = Course;
module.exports.validate = validate;