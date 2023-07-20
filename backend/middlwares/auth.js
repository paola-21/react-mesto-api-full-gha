const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const TokenError = require('../utils/TokenError');

const auth = (req, res, next) => {
  const { token } = req.cookies;
  let payload;

  if (!token) {
    next(new TokenError('Необходима авторизация'));
  }

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new TokenError('Необходима авторизация'));
  }
  req.user = payload;
  next();
};

module.exports = auth;
