require('dotenv').config();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ErrNotAuth = require('../utils/NotErrAuth');
const DuplicateEmail = require('../utils/DublicateEmail');// 400
const TokenError = require('../utils/TokenError');// 401

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = (req, res, next) => {
  bcrypt.hash(String(req.body.password), 10)
    .then((hashedPassword) => {
      User.create({ ...req.body, password: hashedPassword })
        .then((user) => {
          res
            .status(201)
            .send({ data: user.deletePassword() });
        })
        .catch((err) => {
          if (err.code === 11000) {
            return next(new DuplicateEmail('Пользователь с такой почтой уже существует'));
          } if (err.name === 'ValidationError') {
            return next(new ErrNotAuth('Переданы некоректные данные'));
          }
          next(err);
        });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .orFail(() => new TokenError('Пользователь не зарегистрирован'))
    .select('+password')
    .then((user) => {
      bcrypt.compare(String(password), user.password)
        .then((isValidUser) => {
          if (isValidUser) {
            const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
            res.cookie('token', token, {
              maxAge: 360000 * 24 * 7,
              httpOnly: true,
            });
            res.send({ token: jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' }) });
          } else {
            return next(new TokenError('Неправильные почта или пароль'));
          }
        })
        .catch(next);
    })
    .catch(next);
};

module.exports = { createUser, login };
