import express, { Request, Response } from 'express';
import auth from '../middlewares/auth';
import OrdersRepository from '../models/orders';

const repository = new OrdersRepository();

const currentUserOrder = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const order = await repository.currentOrderByUser(parseInt(id));
    if (!order) return res.status(404).json('No orders found for this user.');
    return res.status(200).json(order);
  } catch (error) {
    return res.status(400).json((error as Error).message);
  }
};

const completeUserOrders = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const orders = await repository.completedOrdersByUser(parseInt(id));
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(400).json((error as Error).message);
  }
};

const orders_routes = (app: express.Application) => {
  app.get('/orders/:id/current', auth, currentUserOrder);
  app.get('/orders/:id/complete', auth, completeUserOrders);
};

export default orders_routes;
