import { RequestHandler } from 'express';
import { Order } from '@prisma/client';
import { CreateOrderDto } from 'modules/orders/dto';

export interface OrdersController {
  getOrderById: RequestHandler;
  getAllOrders: RequestHandler;
  createOrder: RequestHandler;
}

export interface OrdersService {
  getOrderById: (orderId: string) => Promise<Order | null>;
  getAllOrders: () => Promise<Array<Order>>;
  createOrder: (order: CreateOrderDto) => Promise<Order | null>;
}

export interface OrdersRepository {
  getOrderById: (orderId: string) => Promise<Order | null>;
  getAllOrders: () => Promise<Array<Order>>;
  createOrder: (orderDto: CreateOrderDto) => Promise<Order>;
}
