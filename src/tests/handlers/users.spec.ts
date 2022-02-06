import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

describe('Users handler', () => {
  it('create a user', async () => {
    const response = await request
      .post('/users')
      .send({ username: 'aminoacid', password: '123456' });
    expect(response.status).toBe(201);
  });

  it('authenticate a user', async () => {
    const response = await request
      .post('/users/authenticate')
      .send({ username: 'aminoacid', password: '123456' });
    expect(response.status).toBe(200);
    expect(response.body.token).toBeTruthy();
  });

  it('get all users', async () => {
    const response = await request
      .get('/users')
      .set('Authorization', 'Bearer ' + process.env.TOKEN_TEST);
    expect(response.status).toBe(200);
  });

  it('get user by id', async () => {
    const response = await request
      .get('/users/1')
      .set('Authorization', 'Bearer ' + process.env.TOKEN_TEST);
    expect(response.status).toBe(200);
  });
});
