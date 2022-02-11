import express, { Request, Response } from 'express';
import auth from '../middlewares/auth';
import ProductsRepository from '../models/products';

const repository = new ProductsRepository();

const index = async (req: Request, res: Response) => {
  try {
    const products = await repository.index();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(400).json((error as Error).message);
  }
};

const show = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const product = await repository.show(parseInt(id));
    if (!product) return res.status(404).json('No product found.');
    return res.status(200).json(product);
  } catch (error) {
    return res.status(400).json((error as Error).message);
  }
};

const create = async (req: Request, res: Response) => {
  const { name, price, category } = req.body;
  try {
    const product = await repository.create({ name, price, category });
    return res.status(201).json(product);
  } catch (error) {
    return res.status(400).json((error as Error).message);
  }
};

const getByCategory = async (req: Request, res: Response) => {
  const category = req.params.category;
  try {
    const products = await repository.productsByCategory(category);
    return res.status(200).json(products);
  } catch (error) {
    return res.status(400).json((error as Error).message);
  }
};
const products_routes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', auth, create);
  app.get('/products/category/:category', getByCategory);
};

export default products_routes;
