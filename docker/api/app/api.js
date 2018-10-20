const { Router } = require('express');
const { STATUS_CODES } = require('http');
const Joi = require('joi');
const { model, settings: { blacklist = [] }, schema } = require('./model.js');
const router = Router();

// requires body-parser middleware
router.get('/:id', (req, res) => {
    model.get(req.params.id, (err, data) => {
        if (err) {
            res.status(err.statusCode).json({
                status: STATUS_CODES[err.statusCode],
                err,
            });
        } else if (data === null) {
            res.status(404).json({
                status: STATUS_CODES[404],
            });
        } else {
            data = Object.keys(data.attrs).reduce((acc, field) => {
                if (!blacklist.includes(field)) {
                    acc[field] = data.attrs[field];
                }
                return acc;
            }, {});
            res.json({
                status: STATUS_CODES[200],
                data,
            });
        }
    });
});

router.post('/', (req, res) => {
    model.create(req.body, (err, data) => {
        if (err) {
            let statusCode = err.statusCode;
            if (err.isJoi) {
                statusCode = 400;
            }
            res.status(statusCode).json({
                status: STATUS_CODES[statusCode],
                err,
            })
        } else {
            data = Object.keys(data.attrs).reduce((acc, field) => {
                if (!blacklist.includes(field)) {
                    acc[field] = data.attrs[field];
                }
                return acc;
            }, {});
            res.status(201).json({
                status: STATUS_CODES[201],
                data,
            });
        }
    });
});

router.patch('/:id', async (req, res) => {
    const body = Object.assign(
        {}, req.body, { id: req.params.id }
    );
    const validate = (data) => {
        return Joi.validate(data, schema);
    };
    try {
        const partialSchema = Object.keys(schema).reduce((partial, key) => {
            if (key in body) {
                partial = { ...partial, [key]: schema[key] };
            }
            return partial;
        }, {});
        const data = await new Promise((resolve, reject) => {
            model.get(req.params.id, (err, data) => {
                if (err) return reject(err);
                resolve(data);
            });
        });
        const merged = Object.assign({}, data.attrs, body);
        const partial = Object.keys(merged).reduce((cleaned, key) => {
            if (!['id', 'createdAt', 'updatedAt'].includes(key)) {
                return { ...cleaned, [key]: merged[key] };
            }
            return cleaned;
        }, {});
        const { error: err } = validate(partial);
        if (err) {
            res.status(400).json({
                status: STATUS_CODES[400],
                err,
            });
            return;
        }
        const result = await new Promise((resolve, reject) => {
            model.update(merged, (err, data) => {
                if (err) return reject(err);
                resolve(data);
            });
        });
        result = Object.keys(result.attrs).reduce((acc, field) => {
            if (!blacklist.includes(field)) {
                acc[field] = result.attrs[field];
            }
            return acc;
        }, {});
        res.status(200).json({
            status: STATUS_CODES[200],
            data: result,
        });
    } catch (err) {
        let statusCode = err.statusCode || 500;
        if (err.isJoi) {
            statusCode = 400;
        }
        res.status(statusCode).json({
            status: STATUS_CODES[statusCode],
            err,
        });
    }
});

router.delete('/:id', (req, res) => {
    model.destroy(req.params.id, (err) => {
        res.status(204).end();
    });
});

module.exports = router;
