const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(35);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();
const description = Joi.string().min(20);
const categoryId = Joi.number().integer();

const limit = Joi.number().integer();
const offset = Joi.number().integer();

//Para filtrar por rango de precio:
const price_max = Joi.number().integer();
const price_min = Joi.number().integer();

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  description: description.required(),
  categoryId: categoryId
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image
});

const getProductSchema = Joi.object({
  id: id.required(),
});

const queryProductSchema = Joi.object({
  limit,
  offset,
  price,
  price_max: price_max.when('price_min', {   //opcional, pero obligatorio si le mandamos el price_min como query param
    is: Joi.number().integer(),    //tenemos que validar de nuevo que proce_min es integer
    then: Joi.required()      //si price_min es enviado -> price_max oblogatorio
  }),
  price_min
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema }
