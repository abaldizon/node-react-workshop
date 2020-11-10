import request from 'supertest';
import app from '../../src/app';
import {connect, closeDatabase} from  './../../src/models/__mocks__/db_handler';

jest.setTimeout(30000);

let server: any = null;
let agent: any = null;

describe('AUTH USER, NEW SESSION', () => {
    beforeAll(async(done) => {
        await connect();
        server = app.listen(3005, () => {
            agent = request.agent(server);
            done();
        }).on('error', (err) => {
            done(err);
        });
    });

    it('Create a new user correctly', async () => {
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
    });

    it('Bad a password', async () => {
        const resp= await request(app).post('/v1/auth').send({
            email: "test@test.com",
            password: "1234",
        });
        expect(resp.status).toEqual(400);
        expect(typeof resp.body.message).toEqual('string');
        expect(resp.body.message).toEqual("Invalid Credentials");
    });

    it('Non valid user', async () => {
        const resp= await request(app).post('/v1/auth').send({
            email: "tet@test.com",
            password: "1234",
        });
        expect(resp.status).toEqual(400);
        expect(typeof resp.body.message).toEqual('string');
        expect(resp.body.message).toEqual("Invalid User");
    });

    afterAll(async () => await closeDatabase());
});