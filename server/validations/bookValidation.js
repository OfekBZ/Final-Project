const Joi = require('joi');

const baseSchema = {
  title: Joi.string().min(1).max(200),
  author: Joi.string().min(1).max(200),
  description: Joi.string().min(10),
  genres: Joi.array().items(Joi.string().min(1)),
  tags: Joi.array().items(Joi.string().min(1)),
  year: Joi.number().integer().min(0),
  pages: Joi.number().integer().min(1),
  isbn: Joi.string().min(5).max(50),
  language: Joi.string().min(2).max(50),
  coverImageUrl: Joi.string().uri(),
  rating: Joi.number().min(0).max(5),
  price: Joi.number().min(0),
};

const createBookSchema = Joi.object({
  ...baseSchema,
  title: baseSchema.title.required(),
  author: baseSchema.author.required(),
  description: baseSchema.description.required(),
});

const updateBookSchema = Joi.object(baseSchema).min(1);

module.exports = {
  createBookSchema,
  updateBookSchema,
};
