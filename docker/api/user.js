const Joi = require('joi');

module.exports = {
    schema: {
        username: Joi.string().required(),
        password: Joi.string().required(),
        dob: Joi.date().iso(),
    },
    settings: {
        blacklist: ['password'],
    },
};
