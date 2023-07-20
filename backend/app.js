require('dotenv').config();
const cors = require('cors');
// const cookieSession = require('cookie-session');
const { requestLogger, errorLogger } = require('./middlwares/logger');
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const limiter = require('./utils/limiter');
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

app.use(express.json());
app.use(requestLogger);

app.use(helmet());
app.use(limiter);

app.use(cors({
  credentials: true,
  origin: [
    'https://paola.mesto.nomoreparties.sbs',
    'http://paola.mesto.nomoreparties.sbs',
    'http://localhost:3000'],
}));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});