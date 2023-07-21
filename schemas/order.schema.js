const Joi = require('joi');

const id = Joi.number().integer()
const customerId = Joi.number().integer();


const getOrderSchema = Joi.object({
	id: id.required(),         //solo requirimos el id p/ retornar la orden de compra
})

const createOrderSchema = Joi.object({     //necesitamos asignar una orde de compra a un cliente
	customerId: customerId.required(),
});

const orderId = Joi.number().integer();   //creamos el schema para agregar items a la orden de compra
const productId = Joi.number().integer();
const amount = Joi.number().integer().min(1);

const addItemSchema = Joi.object({
	orderId: orderId.required(),
	productId: productId.required(),
	amount: amount.required(),
	})

module.exports = { getOrderSchema,	createOrderSchema, addItemSchema }
