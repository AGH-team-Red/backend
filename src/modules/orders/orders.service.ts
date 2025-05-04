import { OrdersRepository, OrdersService } from 'modules/orders/types';
import { Order, Prisma } from '@prisma/client';
import { GetOrderParams } from 'modules/orders/dto';

const getOrdersService = (ordersRepository: OrdersRepository): OrdersService => {
  const getAllOrders = async (): Promise<Array<Order>> => {
    const orders = await ordersRepository.getAllOrders();

    return orders;
  };

  const getOrderById = async (orderId: string): Promise<Order | null> => {
    const order = await ordersRepository.getOrderById(orderId);

    return order;
  };

  const createOrder = async (order: Prisma.OrderCreateInput): Promise<Order | null> => {
    const orderResult = await ordersRepository.createOrder(order);

    return orderResult;
  };

  return {
    getAllOrders,
    getOrderById,
    createOrder
  };
};

export { getOrdersService };
