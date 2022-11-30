const jwt = require('jsonwebtoken');

const { DEV_JWT_SECRET } = require('../utils/dev-key');

require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  let payload = null;
  const token = req.cookies.jwt;
  if (token) {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : DEV_JWT_SECRET);
  }
  req.user = payload;
  next();
};
