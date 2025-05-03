import { RequestHandler } from 'express';
import { Prisma } from '@prisma/client';
import { z } from 'zod';

export interface OrdersController {
  getOrderById: RequestHandler;
  getAllOrders: RequestHandler;
  createOrder: RequestHandler;
}

const LabelingLanguageValues = ['pl', 'en'] as const;
type LabelingLanguge = 'pl' | 'en';

interface DatasetFeatureExample {
  imageUrl: string;
  label: string;
}

interface DatasetFeatures {
  name: string;
  description: string;
  imageGuidelines: string;
  labelGuidelines: string;
  type: string;
  examples: Array<DatasetFeatureExample>;
}

export interface Dataset {
  name: string;
  description: string;
  minSamplesCount: number;
  features: Array<DatasetFeatures>;
}

export interface OrderDto {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  budget: Prisma.Decimal;
  labelingLanguage: LabelingLanguge;
  dataset: Dataset;
}

const DatasetFeaturesExampleSchema = z.array(
  z.object({
    imageUrl: z.string(),
    label: z.string()
  })
);

const DatasetFeaturesSchema = z.array(
  z.object({
    name: z.string(),
    description: z.string(),
    imageGuidelines: z.string(),
    labelGuidelines: z.string(),
    type: z.string(),
    examples: DatasetFeaturesExampleSchema
  })
);

const DatasetSchema = z.object({
  name: z.string(),
  description: z.string(),
  minSamplesCount: z.number(),
  features: DatasetFeaturesSchema
});

export const OrderDtoSchema = z.object({
  name: z.string(),
  description: z.string(),
  startDate: z.preprocess((val) => new Date(val as string), z.date()),
  endDate: z.preprocess((val) => new Date(val as string), z.date()),
  budget: z.preprocess((val) => {
    if (typeof val === 'string' || typeof val === 'number') {
      return new Prisma.Decimal(val);
    }

    return val;
  }, z.instanceof(Prisma.Decimal)),
  labelingLanguage: z.enum(LabelingLanguageValues),
  dataset: DatasetSchema
});

export interface OrdersService {
  getOrderById: (orderId: string) => Promise<OrderDto | null>;
  getAllOrders: () => Promise<Array<OrderDto>>;
  createOrder: (order: OrderDto) => Promise<OrderDto | null>;
}

export interface OrdersRepository {
  getOrderById: (orderId: string) => Promise<OrderDto | null>;
  createOrder: (order: OrderDto) => Promise<OrderDto>;
  getAllOrders: () => Promise<Array<OrderDto>>;
}
