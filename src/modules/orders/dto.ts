import { z } from 'zod';
import { OrderCreateInputSchema, OrderFindUniqueArgsSchema } from 'prisma/zod';

export type CreateOrderDto = z.infer<typeof OrderCreateInputSchema>;
export const CreateOrderSchema = OrderCreateInputSchema;

export type GetOrderParams = z.infer<typeof OrderFindUniqueArgsSchema>;
export const GetOrderParamsSchema = OrderFindUniqueArgsSchema;
