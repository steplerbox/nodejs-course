const config = require('config');

module.exports = () => {
  if (!config.get('jwtKey')) {
    throw new Error('ERROR: jwtKey is not defined.');
  }
};
