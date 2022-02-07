import ProductsRepository, { Product } from '../../models/products';

const repo = new ProductsRepository();

describe('Product model', () => {
  it('should have index method', () => {
    expect(repo.index).toBeDefined();
  });

  it('should have show method', () => {
    expect(repo.show).toBeDefined();
  });

  it('should have create method', () => {
    expect(repo.create).toBeDefined();
  });

  it('should have get products by category method', () => {
    expect(repo.productsByCategory).toBeDefined();
  });

  it('should create a product using create method', async () => {
    const result: Product = await repo.create({
      name: 'Pepsi',
      price: 10,
      category: 'soft drink',
    });

    expect(result.name).toEqual('Pepsi');
  });

  it('should get products by category', async () => {
    const result: Product[] = await repo.productsByCategory('soft drink');
    expect(result[0].name).toBe('Pepsi');
  });

  it('should show a specific product using show method', async () => {
    const result: Product = await repo.show(1);
    expect(result.name).toEqual('Pepsi');
  });

  it('should list all users using index method', async () => {
    const result: Product[] = await repo.index();
    expect(result.length).toEqual(1);
  });
});
