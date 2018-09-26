const Joi = require('joi');

module.exports = {
    email: Joi.string().email(),
    dob: Joi.date().iso(),
};
