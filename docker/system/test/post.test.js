const { fetch } = require('./helpers');


describe('POST', () => {

    let id;
    let res;
    const create = async (body) => {
        if (body) {
            body = JSON.stringify(body);
        }
        res = await fetch({
            path: '/',
            method: 'POST',
            body,
        });
        if (res.body && res.body.data) {
            id = res.body.data.id;
        }
    };

    afterEach(async (done) => {
        // remove a resource
        await fetch({
            path: `/${id}`,
            method: 'DELETE',
        });
        done();
    });

    it('should return a 201 if created successfully', async () => {
        await create({ username: 'username', password: 'password' });
        expect(res.statusCode).toEqual(201);
        expect(res.body.status).toEqual('Created');
    });

    it('should return the id in the body', async () => {
        await create({ username: 'username', password: 'password' });
        expect(res.body.id).not.toBeNull();
    });

    it('should return a 400 if there no body is sent', async () => {
        await create();
        expect(res.statusCode).toEqual(400);
        expect(res.body.status).toEqual('Bad Request');
    });

    it('should return a 400 if invalid type sent', async () => {
        await create({ username: 1, password: 'password' });
        expect(res.statusCode).toEqual(400);
        expect(res.body.status).toEqual('Bad Request');
    });

});
