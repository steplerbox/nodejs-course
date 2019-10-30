const express = require('express');
const Joi = require('joi');
const bcrypt = require('bcrypt');

const { User } = require('../models/user');

const router = express.Router();

const validate = authData => {
  const schema = {
    email: Joi.string().max(255).email().required(),
    password: Joi.string().max(1024).required(),
  };

  return Joi.validate(authData, schema);
};

router.post('/', async (req, res) => {
  const {error} = validate(req.body);
  if (error) {
    return res.status(400).send(error);
  }

  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send('Invalid email or password.');
  }

  const isValid = await bcrypt.compare(req.body.password, user.password);

  if (!isValid) {
    return res.status(400).send('Invalid email or password.');
  }

  const token = user.generateAuthToken();

  res.header('x-auth-token', token).send({ id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin });
});

module.exports = router;