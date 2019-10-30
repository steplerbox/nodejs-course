const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const config = require('config');

if (!config.get('jwtKey')) {
  console.error('ERROR: jwtKey is not defined.');
  process.exit(1);
}

mongoose.connect('mongodb://localhost/nodejs-course', { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log('connected to mongoDB...'))
  .catch(err => console.error('failed connect to mongoDB...', err));

const home = require('./src/routes/home');
const courses = require('./src/routes/courses');
const authors = require('./src/routes/authors');
const users = require('./src/routes/users');
const auth = require('./src/routes/auth');

const app = express();

app.use(express.json());
app.use('/', home);
app.use('/api/courses', courses);
app.use('/api/authors', authors);
app.use('/api/users', users);
app.use('/api/auth', auth);

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listen on ${port} ...`));
