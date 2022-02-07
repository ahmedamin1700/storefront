import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

describe('Products handler', () => {
  it('create a product', async () => {
    const response = await request
      .post('/products')
      .send({ name: 'Fanta', price: 12, category: 'soft drink' })
      .set('Authorization', 'Bearer ' + process.env.TOKEN_TEST);

    expect(response.status).toBe(201);
  });

  it('get all products', async () => {
    const response = await request.get('/products');
    expect(response.status).toBe(200);
  });

  it('get product by id', async () => {
    const response = await request.get('/products/1');
    expect(response.status).toBe(200);
  });

  it('get products by category', async () => {
    const response = await request.get('/products/category/soft drink');
    expect(response.status).toBe(200);
  });
});
