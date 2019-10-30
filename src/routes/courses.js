const express = require('express');

const { Course, validate } = require('../models/course');
const { Author } = require('../models/author');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  const courses = await Course.find().sort('date');
  res.send(courses);
});

router.get('/:id', async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return res.status(404).send('Not found');
  }

  res.send(course);
});

router.post('/', auth, async (req, res) => {
  const {authorId, ...restBodyProps} = req.body;
  const {error} = validate(req.body);
  if (error) {
    return res.status(400).send(error);
  }

  const author = await Author.findById(authorId);
  if (!author) {
    return res.status(400).send('Invalid author Id')
  }

  let course = new Course({
    ...restBodyProps,
    author: {
      _id: author._id,
      name: author.name
    }
  });

  course = await course.save();
  res.send(course);
});

router.put('/:id', auth, async (req, res) => {
  const {authorId, ...restBodyProps} = req.body;
  const {error} = validate(req.body);
  if (error) {
    return res.status(400).send(error);
  }

  let author;
  if (authorId) {
    author = await Author.findById(authorId);
    if (!author) {
      return res.status(400).send('Invalid author Id')
    }
  }

  let body = {...restBodyProps};
  if (author) {
    body = {
      ...restBodyProps,
      author: {
        _id: author._id,
        name: author.name
      }
    }
  }

  const course = await Course.findByIdAndUpdate(req.params.id, body, { new: true });

  if (!course) {
    return res.status(404).send('Not found');
  }

  res.send(course);
});

router.delete('/:id', auth, async (req, res) => {
  const course = await Course.findByIdAndRemove(req.params.id);

  if (!course) {
    return res.status(404).send('Not found');
  }

  res.send(course);
});

module.exports = router;