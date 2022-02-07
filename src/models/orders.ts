import Client from '../database';

export interface Order {
  id?: number;
  user_id: number;
  status: 'complete' | 'active';
  product_id: number;
  quantity: number;
}

class OrdersRepository {
  currentOrderByUser = async (user_id: number): Promise<Order> => {
    try {
      const connection = await Client.connect();
      const sql = `
      SELECT * FROM orders
      INNER JOIN order_products
      ON orders.id = order_products.order_id
      WHERE user_id=$1 AND status='active'`;

      const result = await connection.query(sql, [user_id]);
      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error('can not return current orders.');
    }
  };

  completedOrdersByUser = async (user_id: number): Promise<Order[]> => {
    try {
      const connection = await Client.connect();
      const sql = `
      SELECT * FROM orders
      INNER JOIN order_products
      ON orders.id = order_products.order_id 
      WHERE user_id=$1 AND status='active'`;

      const result = await connection.query(sql, [user_id]);
      connection.release();

      return result.rows;
    } catch (error) {
      throw new Error('can not return current orders.');
    }
  };
}

export default OrdersRepository;
