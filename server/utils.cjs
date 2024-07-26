/* eslint-disable no-undef */
const crypto = require('crypto');

module.exports = {
  generateRandomId: (length = 8) => crypto.randomBytes(length).toString('hex'),
  generateRandomNumber: () => Math.floor(Math.random() * 5) + 1,
};
