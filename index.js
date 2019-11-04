const winston = require('winston');
const express = require('express');
const app = express();

require('./src/startup/logging')();
require('./src/startup/routes')(app);
require('./src/startup/db')();
require('./src/startup/config')();

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`listen on ${port} ...`));
