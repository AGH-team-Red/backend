import { Request, Response } from 'express';
import { OrdersController, OrdersService } from 'modules/orders/types';
import { ServerError } from 'utils/server-error';
import { CreateOrderSchema, CreateOrderDto, GetOrderParamsSchema } from './dto';

const getOrdersController = (ordersService: OrdersService): OrdersController => {
  const getAllOrders = async (req: Request, res: Response): Promise<void> => {
    const orders = await ordersService.getAllOrders();

    if (!orders.length) {
      throw new ServerError('No orders found', 404);
    }

    res.json(orders);
  };

  const getOrderById = async (req: Request, res: Response): Promise<void> => {
    const orderId = req.params.orderId;
    const order = await ordersService.getOrderById(orderId);

    if (!order) {
      throw new ServerError(`No order found with id: ${orderId}`, 404);
    }

    res.json(order);
  };

  const createOrder = async (req: Request, res: Response): Promise<void> => {
    const data: CreateOrderDto = CreateOrderSchema.parse(req.body);
    const order = await ordersService.createOrder(data);

    if (!order) {
      throw new ServerError('Unable to create order', 400);
    }

    res.json(order);
  };

  return {
    getAllOrders,
    getOrderById,
    createOrder
  };
};

export { getOrdersController };
