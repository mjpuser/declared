const { Router } = require('express');
const { STATUS_CODES } = require('http');
const model = require('./model.js');
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
            res.status(201).json({
                status: STATUS_CODES[201],
                data,
            });
        }
    });
});

router.patch('/:id', (req, res) => {
    const body = Object.assign(
        {}, req.body, { id: req.params.id }
    );
    const update = (data) => {
        console.log('updating', data);
        model.update(data, (err, data) => {
            if (err) {
                let statusCode = err.statusCode;
                if (err.isJoi) {
                    statusCode = 400;
                }
                res.status(statusCode).json({
                    status: STATUS_CODES[statusCode],
                    err,
                });
            } else {
                res.status(200).json({
                    status: STATUS_CODES[200],
                    data,
                });
            }
        });
    };
    model.get(req.params.id, (err, data) => {
        update(Object.assign(data, body));
    });
});

router.delete('/:id', (req, res) => {
    model.destroy(req.params.id, (err) => {
        res.status(204).end();
    });
});

module.exports = router;
