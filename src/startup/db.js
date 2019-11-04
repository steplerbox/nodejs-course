const mongoose = require('mongoose');
const winston = require('winston');

module.exports = () => {
  mongoose.connect('mongodb://localhost/nodejs-course', {
    useNewUrlParser: true,
    useCreateIndex: true,
    reconnectTries: 3
  })
    .then(() => winston.info('connected to mongoDB...'));
};