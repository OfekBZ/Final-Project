const Joi = require('joi');

const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=(?:.*\d){4,})(?=.*[!@#$%^&*_-]).{8,}$/;

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(passwordPattern).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = {
  registerSchema,
  loginSchema,
  passwordPattern,
};
