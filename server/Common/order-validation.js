const { ref } = require('joi');
const Joi = require('joi');
const { now } = require('mongoose');

const schema = Joi.object({
    userId: Joi.string().required(),
    cartId: Joi.string().required(),
    totalPrice: Joi.number().required(),
    city: Joi.string().required(),
    street: Joi.string().required(),
    shippingDate: Joi.date().required(),
    orderCreated: Joi.date(),
    creditCard: Joi.number().required()
});


exports.validateBody = async(body) => {
    const { error } = schema.validate(body)
    if (error) {
        throw error
    }
}