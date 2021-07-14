const Joi = require('@hapi/joi');

const registerValidation = data => {
    const schema = Joi.object({
        email: Joi.required(),
        username: Joi.required(),
        password: Joi.required(),
        first_name: Joi.required(),
        last_name: Joi.required(),
        age: Joi.required()
    });
    return schema.validate(data);
};

const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
    });
    return schema.validate(data);
};

module.exports = {registerValidation, loginValidation};