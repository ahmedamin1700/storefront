import OrdersRepository from '../../models/orders';

const repo = new OrdersRepository();

describe('Order model', () => {
  it('should have current order by user method', () => {
    expect(repo.currentOrderByUser).toBeDefined();
  });

  it('should have complete orders by user method', () => {
    expect(repo.completedOrdersByUser).toBeDefined();
  });
});
