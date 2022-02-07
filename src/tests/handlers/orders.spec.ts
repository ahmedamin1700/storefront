import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

describe('Orders handler', () => {
  it('get current order by user', async () => {
    const response = await request
      .get('/orders/1/current')
      .set('Authorization', 'Bearer ' + process.env.TOKEN_TEST);

    expect(response.status).toBe(404);
  });

  it('get all completed orders by user', async () => {
    const response = await request
      .get('/orders/1/complete')
      .set('Authorization', 'Bearer ' + process.env.TOKEN_TEST);
    expect(response.status).toBe(200);
  });
});
