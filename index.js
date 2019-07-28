const express = require('express');
const morgan = require('morgan');

const home = require('./src/routes/home');
const courses = require('./src/routes/courses');

const app = express();

app.use(express.json());
app.use('/', home);
app.use('/api/courses', courses);

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listen on ${port} ...`));
