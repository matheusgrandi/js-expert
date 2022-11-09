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
});
