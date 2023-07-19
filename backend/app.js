require('dotenv').config();
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlwares/logger');
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const router = require('./routes');
const errorHandler = require('./middlwares/error-handler');

const app = express();

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1/mestodb' } = process.env;

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

const limiter = rateLimit(
  {
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  },
);

app.use(express.json());
app.use(requestLogger);
app.use(cors({
  credentials: true,
  origin: 'http://paola.mesto.nomoreparties.sbs',
}));

// app.use(cors());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);
app.use(helmet());
app.use(limiter);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});