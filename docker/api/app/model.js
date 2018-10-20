const dynamodb = require('dynamodb');
const { settings = {}, schema } = require('./model-config');
const MODEL = process.env.MODEL;

if (MODEL === undefined || MODEL.trim().length < 1) {
    throw new Error('Must specify MODEL environment variable');
}

dynamodb.AWS.config.update({ endpoint: process.env.ENDPOINT });

const model = dynamodb.define(MODEL, {
    hashKey: 'id',
    timestamps: true,
    schema: Object.assign({
        id: dynamodb.types.uuid(),
    }, schema)
});

dynamodb.createTables({
    [MODEL]: { readCapacity: 5, writeCapacity: 5 }
}, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Tables have been created');
    }
});

module.exports = { model, settings, schema };
