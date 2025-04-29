import { Application } from 'express';
import { getAuthController } from 'modules/auth/auth.controller';
import { getAuthRoutes } from 'modules/auth/auth.routes';
import { getAuthService } from 'modules/auth/auth.service';
import { getUsersRepository } from 'modules/users/users.repository';
import { getUsersService } from 'modules/users/users.service';
import { getUsersController } from 'modules/users/users.controller';
import { getUsersRoutes } from 'modules/users/users.routes';

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
