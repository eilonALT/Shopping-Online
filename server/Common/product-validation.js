const Joi = require('joi');
const mongoose = require('mongoose');

const schema = Joi.object({
    productName: Joi.string().required(),
    categoryId: Joi.string().required(),
    price: Joi.number().required(),
    image: Joi.string()
});


exports.validateBody = async (body) => {
    const { error } = schema.validate(body)
    if (error) {
        throw error
    }
}