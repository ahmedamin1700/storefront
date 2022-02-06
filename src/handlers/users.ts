import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import UsersRepository from '../models/users';
import auth from '../middlewares/auth';

const repository = new UsersRepository();

const index = async (req: Request, res: Response) => {
  try {
    const users = await repository.index();
    return res.status(200).json(users);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res.status(400).json(error.message);
  }
};

const show = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const user = await repository.show(parseInt(id));
    if (!user) return res.status(404).json('No user found.');
    return res.status(200).json(user);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res.status(400).json(error.message);
  }
};

const create = async (req: Request, res: Response) => {
  const { username, password, firstname, lastname } = req.body;
  try {
    const user = await repository.create({ username, password, firstname, lastname });

    return res.status(201).json(user);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res.status(400).json(error.message);
  }
};

const authenticate = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await repository.authenticate(username, password);
    if (!user) return res.status(400).json('unauthorized access.');

    const token = jwt.sign(user, process.env.JWT_SECRET as jwt.Secret);
    return res.status(200).json({ token: token });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res.status(400).json(error.message);
  }
};

const users_routes = (app: express.Application) => {
  app.get('/users', auth, index);
  app.get('/users/:id', auth, show);
  app.post('/users', create);
  app.post('/users/authenticate', authenticate);
};

export default users_routes;
