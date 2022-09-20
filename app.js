require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const process = require('process');
const cors = require('cors');
const helmet = require('helmet');
const { celebrate, Joi, errors } = require('celebrate');
const { errorsHandler } = require('./middlewares/errorsHandler');
const { createUser, login } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');

const { PORT = 3000, NODE_ENV, MONGODB_URI } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(helmet());

mongoose.connect(NODE_ENV === 'production' ? MONGODB_URI : 'mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true, /* ,
  useCreateIndex: true,
  useFindAndModify: false */
})
  .catch(errorsHandler);

app.options('*', cors());
app.use(cors());
app.use(requestLogger);
app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);

app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/movies', require('./routes/movies'));
app.use('/', require('./routes/nonexistent'));

app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

app.listen(PORT);
