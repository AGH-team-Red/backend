import { Router } from 'express';
import { UsersController } from './types';

const getUsersRoutes = (usersController: UsersController): Router => {
  const router = Router();

  return router;
};

export { getUsersRoutes };
