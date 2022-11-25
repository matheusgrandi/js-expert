const request = require('supertest');
const { describe, it } = require('mocha');
const app = require('./api');
const assert = require('assert');

describe('API Suite Test', () => {
  describe('/contact', () => {
    it('should request the contact page and return HTTP status 200', async () => {
      const response = await request(app).get('/contact').expect(200);
      assert.deepStrictEqual(response.text, 'contact us page');
    });
  });
  describe('/hello', () => {
    it('should request an inexistent route /hi and redirect to /hello', async () => {
      const response = await request(app).get('/hi').expect(200);
      assert.deepStrictEqual(response.text, 'Hello World!');
    });
  });
  describe('/login', () => {
    it('should be able to login with success on the login router and return status 200', async () => {
      const response = await request(app)
        .post('/login')
        .send({ username: 'Matheus Grandi', password: '123' })
        .expect(200);
      assert.deepStrictEqual(response.text, 'Login has succeeded!');
    });
    it('should unauthorize a request when requesing it using wrong credentials and return status 401', async () => {
      const response = await request(app)
        .post('/login')
        .send({ username: 'Nunes Filho', password: '321' })
        .expect(401);
      assert.ok(response.unauthorized);
      assert.deepStrictEqual(response.text, 'Logging failed!');
    });
  });
});
