const Joi = require('joi');

const schema = Joi.object({
    UserId: Joi.string().required(),
    totalPrice: Joi.number().default(0)
});


exports.validateBody = async(body) => {
    const { error } = schema.validate(body)
    if (error) {
        throw error
    }
}