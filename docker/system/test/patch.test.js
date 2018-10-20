const { fetch } = require('./helpers');


describe('PATCH', () => {

    let id;

    const get = async () =>
        await fetch({
            path: `/${id}`,
        });

    const patch = async (body) =>
        await fetch({
            path: `/${id}`,
            method: 'PATCH',
            body: JSON.stringify(body),
        });

    beforeAll(async (done) => {
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

    afterAll(async (done) => {
        await fetch({
            path: `/${id}`,
            method: 'DELETE',
        });
        done();
    });

    it('should return a 200 if created successfully', async () => {
        const username = `${Math.random()}`;
        const res = await patch({ username });
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual('OK');
        expect(res.body.data.username).toEqual(username);
    });

    it('should update subsequent GET requests', async () => {
        const username = `${Math.random()}`;
        await patch({ username });
        const res = await get();
        expect(res.body.data.username).toEqual(username);
    });

    it('should return 400 if invalid type', async () => {
        const username = 1;
        const res = await patch({ username });
        expect(res.statusCode).toEqual(400);
        expect(res.body.status).toEqual('Bad Request');
    });

});
