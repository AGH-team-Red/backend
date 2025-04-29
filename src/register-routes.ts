import { Application } from 'express';
import { getAuthController } from './auth/auth.controller';
import { getAuthRoutes } from './auth/auth.routes';
import { getAuthService } from './auth/auth.service';
import { getUsersRepository } from './users/users.repository';
import { getUsersService } from './users/users.service';
import { getUsersController } from './users/users.controller';
import { getUsersRoutes } from './users/users.routes';

const registerRoutes = (app: Application): void => {
  const usersRepository = getUsersRepository();
  const usersService = getUsersService(usersRepository);
  const usersController = getUsersController(usersService);
  const usersRoutes = getUsersRoutes(usersController);
  app.use('/users', usersRoutes);

  const authService = getAuthService(usersRepository);
  const authController = getAuthController(authService);
  const authRoutes = getAuthRoutes(authController);
  app.use('/auth', authRoutes);
};

export { registerRoutes };
