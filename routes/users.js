const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  patchUserInfo, getCurrentUser,
} = require('../controllers/users');

router.get('/me', getCurrentUser);
router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required().email(),
    }),
  }),
  patchUserInfo,
);

module.exports = router;
