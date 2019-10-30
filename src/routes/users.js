const express = require('express');
const bcrypt = require('bcrypt');

const { User, validate } = require('../models/user');

const router = express.Router();

router.post('/', async (req, res) => {
  const {error} = validate(req.body);
  if (error) {
    return res.status(400).send(error);
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send('User with such email already registered.');
  }

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password
  });

  user = await user.save();
  res.send(user);
});

module.exports = router;