const { Router } = require('express');

const { celebrate, Joi } = require('celebrate');

const cors = require('cors');

const auth = require('../middlewares/auth');

const access = require('../middlewares/access');

const corsOptions = {
  origin: ['http://localhost:5000',
    'http://mesta.students.nomoredomains.club',
    'https://mesta.students.nomoredomains.club/',
    'http://localhost:3000'],
  optionsSuccessStatus: 200,
  credentials: true,
};

const userRouter = Router();

const {
  getUser, getUsers, updateUser, updateAvatar, getMe, verifyAccess,
} = require('../controllers/users');

userRouter.get('/access', cors(corsOptions), access, verifyAccess);

userRouter.get('/me', auth, getMe);

userRouter.get('/', auth, getUsers);

userRouter.get('/:id', auth, celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex(),
  }),
}), getUser);

userRouter.patch('/me', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);

userRouter.patch('/me/avatar', auth, celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(/^https?:\/\/[A-Za-z0-9-_~:@/!/$&'()*+,;=?#[].]*([/]*.*\/?)$/),
  }).unknown(true),
}), updateAvatar);

module.exports = userRouter;
