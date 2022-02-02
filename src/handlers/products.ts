import express, { Request, Response } from 'express';
import ProductsRepository from '../models/products';

const repository = new ProductsRepository();

const index = async (req: Request, res: Response) => {
  try {
    const products = await repository.index();
    return res.status(200).json(products);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res.status(400).json(error.message);
  }
};

const show = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const product = await repository.show(parseInt(id));
    if (!product) return res.status(404).json('No product found.');
    return res.status(200).json(product);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res.status(400).json(error.message);
  }
};

const create = async (req: Request, res: Response) => {
  const { name, price, category } = req.body;
  try {
    const product = await repository.create({ name, price, category });
    return res.status(201).json(product);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res.status(400).json(error.message);
  }
};

const getByCategory = async (req: Request, res: Response) => {
  const category = req.params.category;
  try {
    const products = await repository.productsByCategory(category);
    return res.status(200).json(products);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res.status(400).json(error.message);
  }
};
const products_routes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', create);
  app.get('/products/category/:category', getByCategory);
};

export default products_routes;
