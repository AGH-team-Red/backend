import { PrismaClient } from '@prisma/client';
import { OrderDto, OrdersRepository } from 'modules/orders/types';

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
  const getAllOrders = async (): Promise<Array<OrderDto>> => {
    const orders = await prisma.order.findMany({
      include: orderIncludes
    });

    return orders;
  };

  const getOrderById = async (orderId: string): Promise<OrderDto | null> => {
    const order = await prisma.order.findUnique({
      where: {
        id: orderId
      },
      include: orderIncludes
    });

    return order;
  };

  const createOrder = async (orderDto: OrderDto): Promise<OrderDto> => {
    const { name, description, startDate, endDate, budget, labelingLanguage, dataset } = orderDto;

    const order = await prisma.order.create({
      data: {
        name,
        description,
        startDate,
        endDate,
        budget: budget,
        labelingLanguage,
        dataset: {
          create: {
            name: dataset.name,
            description: dataset.description,
            minSamplesCount: dataset.minSamplesCount,
            features: {
              create: dataset.features.map((f) => ({
                name: f.name,
                description: f.description,
                imageGuidelines: f.imageGuidelines,
                labelGuidelines: f.labelGuidelines,
                type: f.type,
                examples: {
                  create: f.examples.map((e) => ({
                    imageUrl: e.imageUrl,
                    label: e.label
                  }))
                }
              }))
            }
          }
        }
      },
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
