const Joi = require('joi');
const { passwordPattern } = require('./authValidation');

const updateProfileSchema = Joi.object({
  name: Joi.string().min(2).max(100),
  password: Joi.string().pattern(passwordPattern),
  email: Joi.forbidden(),
}).min(1);

module.exports = {
  updateProfileSchema,
};
