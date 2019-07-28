const express = require('express');
const Joi = require('joi');

const router = express.Router();

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

router.get('/', (req, res) => {
  res.send(courses);
});

router.get('/:id', (req, res) => {
  const course = courses.find(course => course.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send('Not found');
  }

  res.send(course);
});

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
  const course = courses.find(course => course.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send('Not found');
  }

  courses.splice(courses.indexOf(course), 1);
  res.send(course);
});

module.exports = router;