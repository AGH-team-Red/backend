import { Router } from 'express';
import { OrdersController } from 'modules/orders/types';
import { withErrorHandling } from 'middlewares/error';

const getOrderRoutes = (ordersController: OrdersController): Router => {
  const router = Router();

  router.get('/', withErrorHandling(ordersController.getAllOrders));
  router.get('/:id', withErrorHandling(ordersController.getOrderById));
  router.post('/', withErrorHandling(ordersController.createOrder));

  return router;
};

export { getOrderRoutes };
