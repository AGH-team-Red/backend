import { DatasetFeature, DatasetFeatureExample, Order, PrismaClient, Prisma } from '@prisma/client';
import { OrdersRepository } from 'modules/orders/types';
import { GetOrderParams } from 'modules/orders/dto';

const orderIncludes = {
  dataset: {
    include: {
      features: {
        include: {
          examples: true
        }
      }
    }
  }
} as const;

const getOrdersRepository = (prisma: PrismaClient): OrdersRepository => {
  const getAllOrders = async (): Promise<Array<Order>> => {
    const orders = await prisma.order.findMany({
      include: orderIncludes
    });

    return orders;
  };

  const getOrderById = async (orderId: string): Promise<Order | null> => {
    const order = await prisma.order.findUnique({
      where: {
        id: orderId
      },
      include: orderIncludes
    });

    return order;
  };

  const createOrder = async (orderDto: Prisma.OrderCreateInput): Promise<Order> => {
    const order = await prisma.order.create({
      data: orderDto,
      include: orderIncludes
    });

    return order;
  };

  return {
    getAllOrders,
    getOrderById,
    createOrder
  };
};

export { getOrdersRepository };
