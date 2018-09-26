const Joi = require('joi');

module.exports = {
    task: Joi.string().required(),
};
