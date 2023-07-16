const jwt = require('jsonwebtoken');
const TokenError = require('../utils/TokenError');

const auth = (req, res, next) => {
  const { token } = req.cookies;
  let payload;

  if (!token) {
    next(new TokenError('Необходима авторизация'));
  }

  try {
    payload = jwt.verify(token, process.env['JWT_SECRET'], { expiresIn: '7d' });
  } catch (e) {
    next(new TokenError('Необходима авторизация'));
    next(e);
  }
  req.user = payload;
  next();
};
module.exports = auth;
