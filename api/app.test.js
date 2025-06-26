require('dotenv').config();
const request = require('supertest');
const app = require('./app');
const jwt = require('jsonwebtoken');
const { USERS } = require('./constants');
const JWT_SECRET = process.env.JWT_SECRET;

describe('RBAC DELETE /posts/:id', () => {
  let adminToken, userToken;
  beforeAll(() => {
    adminToken = jwt.sign(USERS[1] , JWT_SECRET);
    userToken = jwt.sign(USERS[0], JWT_SECRET);
  });

  it('allows admin to delete', async () => {
    const res = await request(app)
      .delete('/posts/123')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/deleted by u2/);
  });

  it('forbids normal user from deleting', async () => {
    const res = await request(app)
      .delete('/posts/123')
      .set('Authorization', `Bearer ${userToken}`);
    expect(res.statusCode).toBe(403);
    expect(res.body.error).toBe('Forbidden');
  });

  it('blocks missing/invalid token', async () => {
    const res = await request(app)
      .delete('/posts/123');
    expect(res.statusCode).toBe(401);
    expect(res.body.error).toMatch(/token/);
  });
});
