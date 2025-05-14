import { Application } from 'express';
import { PrismaClient } from '@prisma/client';
import { getAuthController } from 'modules/auth/auth.controller';
import { getAuthRoutes } from 'modules/auth/auth.routes';
import { getAuthService } from 'modules/auth/auth.service';
import { getUsersRepository } from 'modules/users/users.repository';
import { getUsersService } from 'modules/users/users.service';
import { getUsersController } from 'modules/users/users.controller';
import { getUsersRoutes } from 'modules/users/users.routes';
import { getOrdersRepository } from 'modules/orders/orders.repository';
import { getOrdersService } from 'modules/orders/orders.service';
import { getOrdersController } from 'modules/orders/orders.controller';
import { getOrderRoutes } from 'modules/orders/orders.routes';
import { getTasksRepository } from 'modules/tasks/tasks.repository';
import { getTasksService } from 'modules/tasks/tasks.service';
import { getTasksController } from 'modules/tasks/tasks.controller';
import { getTasksRoutes } from 'modules/tasks/tasks.routes';

const registerRoutes = (app: Application, prisma: PrismaClient): void => {
  const tasksRepository = getTasksRepository(prisma);
  const tasksService = getTasksService(tasksRepository);
  const tasksController = getTasksController(tasksService);
  const tasksRoutes = getTasksRoutes(tasksController);
  app.use('/tasks', tasksRoutes);

  const ordersRepository = getOrdersRepository(prisma);
  const ordersService = getOrdersService(ordersRepository);
  const ordersController = getOrdersController(ordersService);
  const ordersRoutes = getOrderRoutes(ordersController);
  app.use('/orders', ordersRoutes);

  const usersRepository = getUsersRepository();
  const usersService = getUsersService(usersRepository);
  const usersController = getUsersController(usersService);
  const usersRoutes = getUsersRoutes(usersController);
  app.use('/users', usersRoutes);

  const authService = getAuthService(usersRepository);
  const authController = getAuthController(authService);
  const authRoutes = getAuthRoutes(authController);
  app.use('/auth', authRoutes);

  console.log('registered routes');
};

export { registerRoutes };
