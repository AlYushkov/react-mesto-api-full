const express = require('express');

const bodyParser = require('body-parser'); // Parse incoming request bodies

const rateLimit = require('express-rate-limit'); // Use to limit repeated requests to public APIs

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const { celebrate, Joi, errors } = require('celebrate'); // function that wraps the joi validation library

const cookieParser = require('cookie-parser'); // Parse Cookie header and populate req.cookies

const mongoose = require('mongoose');

const helmet = require('helmet'); // secure Express apps by setting various HTTP headers

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3001 } = process.env;

const userRouter = require('./routes/users');

const cardRouter = require('./routes/cards');

const { createUser, login, logout } = require('./controllers/users');

const { AppError, appErrors } = require('./utils/app-error');

const ALLOWED_CORS = ['http://localhost:3000',
  'https://mesta.students.nomoredomains.club',
  'https://www.mesta.students.nomoredomains.club',
  'http://mesta.students.nomoredomains.club',
  'http://www.mesta.students.nomoredomains.club',
];
const ALLOWED_METHODS = ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'];

const app = express();

app.use((req, res, next) => {
  const { origin } = req.headers;
  if (ALLOWED_CORS.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  const reqHeaders = req.headers['access-control-request-headers'];
  const { method } = req;
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', reqHeaders);
    return res.send(); // no more headers sending
  }
  return next();
});

app.use(helmet());

app.use(limiter);

app.use(bodyParser.json());

app.use(cookieParser());

app.use(express.json());

app.use(requestLogger);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).default('Жак-Ив Кусто'),
    about: Joi.string().min(2).max(30).default('Исследователь'),
    avatar: Joi.string().regex(/^https?:\/\/[A-Za-z0-9-_~:@/!/$&'()*+,;=?#[].]*([/]*.*\/?)$/).default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);

app.get('/signuot', logout);

app.use('/users', userRouter);

app.use('/cards', cardRouter);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(errorLogger);

app.use((req, res, next) => {
  const err = new AppError(appErrors.notFound);
  next(err);
});

app.use(errors());

app.use((error, req, res, next) => {
  if (res.headersSent !== true) {
    const errMessage = error.statusCode ? error.message : 'Ошибка на серверe';
    res.status(error.statusCode || 500).send({ message: errMessage });
  }
  next();
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.listen(PORT);
