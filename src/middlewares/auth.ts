import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
  const authHeaders = req.headers.authorization;
  const token = authHeaders?.split(' ')[1];
  if (!token) return res.status(401).json('No token found.');
  let valid = null;
  try {
    valid = jwt.verify(token, process.env.JWT_SECRET as jwt.Secret);
  } catch (error) {
    // console.log(error);
    return res.status(401).json('Unauthorized token.');
  }

  if (!valid) return res.status(401).json('Unauthorized token.');
  return next();
};
