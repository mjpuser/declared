const http = require('http');

const fetch = (options) => {
    return new Promise((resolve, reject) => {
        const opts = {
            hostname: 'localhost',
            port: parseInt(process.env.API_PORT, 10),
            path: options.path,
            method: options.method || 'GET',
            headers: Object.assign({}, {
                'content-type': 'application/json',
            }, options.headers || {}),
        };
        const req = http.request(opts, (res) => {
            let body = '';
            res.on('data', (chunk) => {
                body += chunk;
            });
            res.on('end', () => {
                try {
                    const json = JSON.parse(body);
                    res.body = json;
                } catch (e) {
                }
                resolve(res);
            });
        });
        req.on('error', (e) => {
            reject(e);
        });
        if (options.body) {
            req.write(options.body);
        }
        req.end();
    });
};

module.exports = { fetch };
