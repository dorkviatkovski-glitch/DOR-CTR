import { Router } from 'express';
import { login, signup } from './domain/auth.service.js';

export const authRouter = Router();

authRouter.post('/signup', (req, res) => {
  const response = signup(req.body);
  return res.status(201).json(response);
});

authRouter.post('/login', (req, res) => {
  const response = login(req.body);
  return res.json(response);
});
