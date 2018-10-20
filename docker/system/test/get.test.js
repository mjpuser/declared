const { fetch } = require('./helpers');

describe('GET', () => {

    let id;

    beforeEach(async (done) => {
        // create a resource
        const res = await fetch({
            path: '/',
            method: 'POST',
            body: JSON.stringify({
                username: 'username',
                password: 'password',
            }),
        });
        id = res.body.data.id;
        done();
    });

    afterEach(async (done) => {
        // remove a resource
        await fetch({
            path: `/${id}`,
            method: 'DELETE',
        });
        done();
    });

    it('should should return a status code 200', async () => {
        const res = await fetch({ path: `/${id}` });
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual('OK');
    });

    it('should return a 404 if it does not exist', async () => {
        const res = await fetch({ path: '/not-found' });
        expect(res.statusCode).toEqual(404);
        expect(res.body.status).toEqual('Not Found');
    });

});
