const Joi = require('joi');

const schema = Joi.object({
    productId: Joi.string().required(),
    amount: Joi.number().default(1),
    totalPrice: Joi.number().default(0),
    cartId: Joi.string().required()
});


exports.validateBody = async(body) => {
    const { error } = schema.validate(body)
    if (error) {
        throw error
    }
}