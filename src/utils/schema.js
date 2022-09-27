const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const userSchema = Joi.object({
  displayName: Joi.string().min(8).required().messages({
      message: '"displayName" length must be at least 8 characters long',
    }),
  email: Joi.string()
  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().messages({
    message: '"email" must be a valid email',
  }),
  password: Joi.string().min(6).required().messages({
    message: '"password" length must be at least 6 characters long',
  }),
  image: Joi.string(),
});

const postSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array(),
});

module.exports = { loginSchema, userSchema, postSchema };