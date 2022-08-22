const Joi = require('joi');

const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    username: Joi.string().required(),
    idNumber: Joi.number().integer().required(),
    password: Joi.string().required(),
    city: Joi.string().required(),
    street: Joi.string().required(),
    role: Joi.string().valid('user', 'admin').default('user'),
    cartId: Joi.object()
});


exports.validateBody = async (body) => {
    const { error } = schema.validate(body)
    if (error) {
        throw error
    }
}