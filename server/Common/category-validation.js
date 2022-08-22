const Joi = require('joi');

const schema = Joi.object({
    categoryName: Joi.string().required(),
    categoryImage: Joi.string().required()
});


exports.validateBody = async(body) => {
    const { error } = schema.validate(body)
    if (error) {
        throw error
    }
}