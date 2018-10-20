const { fetch } = require('./helpers');

describe('DELETE', () => {

    let id;
    let res;
    const create = async () => {
        res = await fetch({
            path: '/',
            method: 'POST',
            body: JSON.stringify({
                username: 'username',
                password: 'password',
            }),
        });
        id = res.body.data.id;
    };

    beforeEach(async (done) => {
        await create();
        done();
    });

    const remove = async () => {
        return await fetch({
            path: `/${id}`,
            method: 'DELETE',
        });
    };

    it('should return a 204 after deleting a resource', async () => {
        const res = await remove();
        expect(res.statusCode).toEqual(204);
    });

    it('should return a 204 after deleting a non existant resource', async () => {
        id = 'non-existant';
        const res = await remove(id);
        expect(res.statusCode).toEqual(204);
    });
});
