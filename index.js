const Joi = require('joi');
const express = require('express');

const app = express();

app.use(express.json());

const courses = [
  {id: 0, name: 'js course'},
  {id: 1, name: 'node.js course'},
  {id: 2, name: 'mongoose course'}
];

const validateCourse = course => {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(course, schema);
};

app.get('/', (req, res) => {
  res.send('Test courses API');
});

app.get('/courses/get', (req, res) => {
  res.send(courses);
});

app.get('/courses/:id', (req, res) => {
  const course = courses.find(course => course.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send('Not found');
  }

  res.send(course);
});

app.post('/courses', (req, res) => {
  const {error} = validateCourse(req.body);
  if (error) {
    return res.status(400).send(error);
  }

  const course = {
    id: courses.length,
    name: req.body.name
  };

  courses.push(course);
  res.send(course);
});

app.put('/courses/:id', (req, res) => {
  const course = courses.find(course => course.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send('Not found');
  }

  const {error} = validateCourse(req.body);
  if (error) {
    return res.status(400).send(error);
  }

  course.name = req.body.name;
  res.send(course);
});

app.delete('/courses/:id', (req, res) => {
  const course = courses.find(course => course.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send('Not found');
  }

  courses.splice(courses.indexOf(course), 1);
  res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listen on ${port} ...`));
