const express = require('express');

const home = require('../routes/home');
const courses = require('../routes/courses');
const authors = require('../routes/authors');
const users = require('../routes/users');
const auth = require('../routes/auth');
const errorMiddleware = require('../middlewares/error');

module.exports = (app) => {
  app.use(express.json());
  app.use('/', home);
  app.use('/api/courses', courses);
  app.use('/api/authors', authors);
  app.use('/api/users', users);
  app.use('/api/auth', auth);
  app.use(errorMiddleware);
};