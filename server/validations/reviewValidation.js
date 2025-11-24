const Joi = require('joi');

const createReviewSchema = Joi.object({
  rating: Joi.number().integer().min(1).max(5).required(),
  text: Joi.string().min(3).max(2000).allow('', null),
});

module.exports = {
  createReviewSchema,
};
