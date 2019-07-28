const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Test courses API');
});

module.exports = router;