import request from 'supertest';
import app from '../../src/app';
import {connect, closeDatabase} from  './../../src/models/__mocks__/db_handler';

jest.setTimeout(30000);

let server: any = null;
let agent: any = null;

describe('CONTACT USER', () => {
    beforeAll(async(done) => {
        await connect();
        server = app.listen(3010, () => {
            agent = request.agent(server);
            done();
        }).on('error', (err) => {
            done(err);
        });
    });

    let token = '';

    it('Create a new user correcly', async () => {
        const resp= await request(app).post('/v1/user').send({
            name:"test",
            email: "test@test.com",
            password: "12341234",
        });
        expect(resp.status).toEqual(200);
    });

    it('Create a new session', async () => {
        const resp= await request(app).post('/v1/auth').send({
            email: "test@test.com",
            password: "12341234",
        });
        expect(resp.status).toEqual(200);
        expect(typeof resp.body.token).toEqual('string');
        expect(resp.body.token.length).toBeGreaterThanOrEqual(1);
        token =resp.body.token;
    });    

    let contact_id = '';

    it('should get health status', async () => {
        const resp = await request(app)
            .post('/v1/contact/')
            .set({ 'x-auth-token': token })
            .send({
                "name":"Contact Testy",
                "email":"contact.test.2@email.com",
                "phone":"23452345"
            });
        expect(resp.status).toEqual(200);
        contact_id =resp.body.data._id;
    });
    
    it('should get health status', async () => {
        const resp = await request(app)
            .put('/v1/contact/')
            .set({ 'x-auth-token': token })
            .query({ id: contact_id })
            .send({
                "name":"Contact Testy2",
            });
        expect(resp.status).toEqual(200);
    });

    it('should get contact list', async () => {
        const resp = await request(app)
            .get('/v1/contact/')
            .set({ 'x-auth-token': token });
        expect(resp.status).toEqual(200);
    });

    it('should get fail in get method', async () => {
        const resp = await request(app)
            .get('/v1/contact/')
        expect(resp.status).toEqual(401);
    });

    it('should get health status', async () => {
        const resp = await request(app)
            .delete(`/v1/contact/${contact_id}`)
            .set({ 'x-auth-token': token });
        expect(resp.status).toEqual(200);
    });
 
    afterAll(async () => await closeDatabase());
});