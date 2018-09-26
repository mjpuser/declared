const model = require('./model.js');

// requires body-parser middleware
const api = (req, res, next) => {
    switch (req.method) {
        case 'GET':
            model.get(req.url.substr(1), (err, data) => {
                if (err) {
                    res.status(500).json({
                        message: 'error',
                        err,
                    });
                } else if (data === null) {
                    res.status(404).json({
                        message: 'not found'
                    });
                } else {
                    res.json({
                        message: 'ok',
                        data,
                    });
                }
            });
            break;
        case 'POST':
            model.create(req.body, (err, data) => {
                if (err) {
                    res.status(400).json({
                        message: 'error',
                        err,
                    });
                } else {
                    res.status(201).json({
                        message: 'created',
                        data,
                    });
                }
            });
            break;
        default:
            res.status(405).json({ message: 'Method not allowed' });
    }
};

module.exports = api;
