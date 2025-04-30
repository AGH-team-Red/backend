import { OrderDto, OrdersRepository, OrdersService } from 'modules/orders/types';

const getOrdersService = (ordersRepository: OrdersRepository): OrdersService => {
  const getAllOrders = async (): Promise<Array<OrderDto>> => {
    const orders = await ordersRepository.getAllOrders();

    return orders;
  };

  const getOrderById = async (orderId: string): Promise<OrderDto | null> => {
    const order = await ordersRepository.getOrderById(orderId);

    return order;
  };

  const createOrder = async (order: OrderDto): Promise<OrderDto | null> => {
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
