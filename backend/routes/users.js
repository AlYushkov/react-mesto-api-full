const { Router } = require('express');

const { celebrate, Joi } = require('celebrate');

const auth = require('../middlewares/auth');

const access = require('../middlewares/access');

const userRouter = Router();

const {
  getUser, getUsers, updateUser, updateAvatar, getMe, verifyAccess,
} = require('../controllers/users');

userRouter.get('/access', access, verifyAccess);

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
