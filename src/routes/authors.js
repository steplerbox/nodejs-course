const express = require('express');

const { Author, validate } = require('../models/author');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  const authors = await Author.find().sort('name');
  res.send(authors);
});

router.get('/:id', async (req, res) => {
  const author = await Author.findById(req.params.id);

  if (!author) {
    return res.status(404).send('Not found');
  }

  res.send(author);
});

router.post('/', auth, async (req, res) => {
  const {error} = validate(req.body);
  if (error) {
    return res.status(400).send(error);
  }

  let author = new Author(req.body);
  author = await author.save();
  res.send(author);
});

router.put('/:id', auth, async (req, res) => {
  const {error} = validate(req.body);
  if (error) {
    return res.status(400).send(error);
  }

  const author = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });

  if (!author) {
    return res.status(404).send('Not found');
  }

  res.send(author);
});

router.delete('/:id', auth, async (req, res) => {
  const author = await Author.findByIdAndRemove(req.params.id);

  if (!author) {
    return res.status(404).send('Not found');
  }

  res.send(author);
});

module.exports = router;