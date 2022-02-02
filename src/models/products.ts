import Client from '../database';

export interface Product {
  id?: number;
  name: string;
  price: number;
  category: string;
}

class ProductsRepository {
  index = async (): Promise<Product[]> => {
    try {
      const connection = await Client.connect();
      const sql = 'SELECT * FROM products';
      const result = await connection.query(sql);
      return result.rows;
    } catch (error) {
      throw new Error('can not return products.');
    }
  };

  show = async (id: number): Promise<Product> => {
    try {
      const connection = await Client.connect();
      const sql = 'SELECT * FROM products WHERE id=$1';
      const result = await connection.query(sql, [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`can't return product with id ${id}.`);
    }
  };

  create = async (product: Product): Promise<Product> => {
    const { name, price, category } = product;
    try {
      const connection = await Client.connect();
      const sql = 'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *';
      const result = await connection.query(sql, [name, price, category]);
      return result.rows[0];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(`can't create product with this name ${name} ${error.message}.`);
    }
  };

  productsByCategory = async (category: string): Promise<Product[]> => {
    try {
      const connection = await Client.connect();
      const sql = 'SELECT * FROM products WHERE category=$1';

      const result = await connection.query(sql, [category]);

      return result.rows;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(`can not find products by this category ${category} ${error.message}.`);
    }
  };
}

export default ProductsRepository;
