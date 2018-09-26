const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const api = require('./api');
const PORT = process.env.NODE_PORT || 3000;

app.use(bodyParser.json());
app.use(api);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
