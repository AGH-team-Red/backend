import { z } from 'zod';
import { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// DECIMAL
//------------------------------------------------------

export const DecimalJsLikeSchema: z.ZodType<Prisma.DecimalJsLike> = z.object({
  d: z.array(z.number()),
  e: z.number(),
  s: z.number(),
  toFixed: z.function(z.tuple([]), z.string()),
})

export const DECIMAL_STRING_REGEX = /^(?:-?Infinity|NaN|-?(?:0[bB][01]+(?:\.[01]+)?(?:[pP][-+]?\d+)?|0[oO][0-7]+(?:\.[0-7]+)?(?:[pP][-+]?\d+)?|0[xX][\da-fA-F]+(?:\.[\da-fA-F]+)?(?:[pP][-+]?\d+)?|(?:\d+|\d*\.\d+)(?:[eE][-+]?\d+)?))$/;

export const isValidDecimalInput =
  (v?: null | string | number | Prisma.DecimalJsLike): v is string | number | Prisma.DecimalJsLike => {
    if (v === undefined || v === null) return false;
    return (
      (typeof v === 'object' && 'd' in v && 'e' in v && 's' in v && 'toFixed' in v) ||
      (typeof v === 'string' && DECIMAL_STRING_REGEX.test(v)) ||
      typeof v === 'number'
    )
  };

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const OrderScalarFieldEnumSchema = z.enum(['id','name','description','startDate','endDate','budget','labelingLanguage','datasetId']);

export const DatasetScalarFieldEnumSchema = z.enum(['id','name','description','minSamplesCount']);

export const DatasetFeatureScalarFieldEnumSchema = z.enum(['id','name','description','imageGuidelines','labelGuidelines','type','datasetId']);

export const DatasetFeatureExampleScalarFieldEnumSchema = z.enum(['id','imageUrl','label','featureId']);

export const TaskScalarFieldEnumSchema = z.enum(['id','datasetId','type','endDate']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const LabelingLanguageSchema = z.enum(['pl','en']);

export type LabelingLanguageType = `${z.infer<typeof LabelingLanguageSchema>}`

export const TaskTypeSchema = z.enum(['labeling','crossChecking']);

export type TaskTypeType = `${z.infer<typeof TaskTypeSchema>}`

export const OrderStatusSchema = z.enum(['active','pending','completed','expired']);

export type OrderStatusType = `${z.infer<typeof OrderStatusSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// ORDER SCHEMA
/////////////////////////////////////////

export const OrderSchema = z.object({
  labelingLanguage: LabelingLanguageSchema,
  id: z.string().cuid(),
  name: z.string(),
  description: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  budget: z.instanceof(Prisma.Decimal, { message: "Field 'budget' must be a Decimal. Location: ['Models', 'Order']"}),
  datasetId: z.string(),
})

export type Order = z.infer<typeof OrderSchema>

/////////////////////////////////////////
// DATASET SCHEMA
/////////////////////////////////////////

export const DatasetSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  description: z.string(),
  minSamplesCount: z.number().int(),
})

export type Dataset = z.infer<typeof DatasetSchema>

/////////////////////////////////////////
// DATASET FEATURE SCHEMA
/////////////////////////////////////////

export const DatasetFeatureSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  description: z.string(),
  imageGuidelines: z.string(),
  labelGuidelines: z.string(),
  type: z.string(),
  datasetId: z.string(),
})

export type DatasetFeature = z.infer<typeof DatasetFeatureSchema>

/////////////////////////////////////////
// DATASET FEATURE EXAMPLE SCHEMA
/////////////////////////////////////////

export const DatasetFeatureExampleSchema = z.object({
  id: z.string().cuid(),
  imageUrl: z.string(),
  label: z.string(),
  featureId: z.string(),
})

export type DatasetFeatureExample = z.infer<typeof DatasetFeatureExampleSchema>

/////////////////////////////////////////
// TASK SCHEMA
/////////////////////////////////////////

export const TaskSchema = z.object({
  type: TaskTypeSchema,
  id: z.string().cuid(),
  datasetId: z.string(),
  endDate: z.coerce.date(),
})

export type Task = z.infer<typeof TaskSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// ORDER
//------------------------------------------------------

export const OrderIncludeSchema: z.ZodType<Prisma.OrderInclude> = z.object({
  dataset: z.union([z.boolean(),z.lazy(() => DatasetArgsSchema)]).optional(),
}).strict()

export const OrderArgsSchema: z.ZodType<Prisma.OrderDefaultArgs> = z.object({
  select: z.lazy(() => OrderSelectSchema).optional(),
  include: z.lazy(() => OrderIncludeSchema).optional(),
}).strict();

export const OrderSelectSchema: z.ZodType<Prisma.OrderSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  startDate: z.boolean().optional(),
  endDate: z.boolean().optional(),
  budget: z.boolean().optional(),
  labelingLanguage: z.boolean().optional(),
  datasetId: z.boolean().optional(),
  dataset: z.union([z.boolean(),z.lazy(() => DatasetArgsSchema)]).optional(),
}).strict()

// DATASET
//------------------------------------------------------

export const DatasetIncludeSchema: z.ZodType<Prisma.DatasetInclude> = z.object({
  features: z.union([z.boolean(),z.lazy(() => DatasetFeatureFindManyArgsSchema)]).optional(),
  Order: z.union([z.boolean(),z.lazy(() => OrderArgsSchema)]).optional(),
  Task: z.union([z.boolean(),z.lazy(() => TaskArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => DatasetCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const DatasetArgsSchema: z.ZodType<Prisma.DatasetDefaultArgs> = z.object({
  select: z.lazy(() => DatasetSelectSchema).optional(),
  include: z.lazy(() => DatasetIncludeSchema).optional(),
}).strict();

export const DatasetCountOutputTypeArgsSchema: z.ZodType<Prisma.DatasetCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => DatasetCountOutputTypeSelectSchema).nullish(),
}).strict();

export const DatasetCountOutputTypeSelectSchema: z.ZodType<Prisma.DatasetCountOutputTypeSelect> = z.object({
  features: z.boolean().optional(),
}).strict();

export const DatasetSelectSchema: z.ZodType<Prisma.DatasetSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  minSamplesCount: z.boolean().optional(),
  features: z.union([z.boolean(),z.lazy(() => DatasetFeatureFindManyArgsSchema)]).optional(),
  Order: z.union([z.boolean(),z.lazy(() => OrderArgsSchema)]).optional(),
  Task: z.union([z.boolean(),z.lazy(() => TaskArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => DatasetCountOutputTypeArgsSchema)]).optional(),
}).strict()

// DATASET FEATURE
//------------------------------------------------------

export const DatasetFeatureIncludeSchema: z.ZodType<Prisma.DatasetFeatureInclude> = z.object({
  dataset: z.union([z.boolean(),z.lazy(() => DatasetArgsSchema)]).optional(),
  examples: z.union([z.boolean(),z.lazy(() => DatasetFeatureExampleFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => DatasetFeatureCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const DatasetFeatureArgsSchema: z.ZodType<Prisma.DatasetFeatureDefaultArgs> = z.object({
  select: z.lazy(() => DatasetFeatureSelectSchema).optional(),
  include: z.lazy(() => DatasetFeatureIncludeSchema).optional(),
}).strict();

export const DatasetFeatureCountOutputTypeArgsSchema: z.ZodType<Prisma.DatasetFeatureCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => DatasetFeatureCountOutputTypeSelectSchema).nullish(),
}).strict();

export const DatasetFeatureCountOutputTypeSelectSchema: z.ZodType<Prisma.DatasetFeatureCountOutputTypeSelect> = z.object({
  examples: z.boolean().optional(),
}).strict();

export const DatasetFeatureSelectSchema: z.ZodType<Prisma.DatasetFeatureSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  imageGuidelines: z.boolean().optional(),
  labelGuidelines: z.boolean().optional(),
  type: z.boolean().optional(),
  datasetId: z.boolean().optional(),
  dataset: z.union([z.boolean(),z.lazy(() => DatasetArgsSchema)]).optional(),
  examples: z.union([z.boolean(),z.lazy(() => DatasetFeatureExampleFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => DatasetFeatureCountOutputTypeArgsSchema)]).optional(),
}).strict()

// DATASET FEATURE EXAMPLE
//------------------------------------------------------

export const DatasetFeatureExampleIncludeSchema: z.ZodType<Prisma.DatasetFeatureExampleInclude> = z.object({
  feature: z.union([z.boolean(),z.lazy(() => DatasetFeatureArgsSchema)]).optional(),
}).strict()

export const DatasetFeatureExampleArgsSchema: z.ZodType<Prisma.DatasetFeatureExampleDefaultArgs> = z.object({
  select: z.lazy(() => DatasetFeatureExampleSelectSchema).optional(),
  include: z.lazy(() => DatasetFeatureExampleIncludeSchema).optional(),
}).strict();

export const DatasetFeatureExampleSelectSchema: z.ZodType<Prisma.DatasetFeatureExampleSelect> = z.object({
  id: z.boolean().optional(),
  imageUrl: z.boolean().optional(),
  label: z.boolean().optional(),
  featureId: z.boolean().optional(),
  feature: z.union([z.boolean(),z.lazy(() => DatasetFeatureArgsSchema)]).optional(),
}).strict()

// TASK
//------------------------------------------------------

export const TaskIncludeSchema: z.ZodType<Prisma.TaskInclude> = z.object({
  dataset: z.union([z.boolean(),z.lazy(() => DatasetArgsSchema)]).optional(),
}).strict()

export const TaskArgsSchema: z.ZodType<Prisma.TaskDefaultArgs> = z.object({
  select: z.lazy(() => TaskSelectSchema).optional(),
  include: z.lazy(() => TaskIncludeSchema).optional(),
}).strict();

export const TaskSelectSchema: z.ZodType<Prisma.TaskSelect> = z.object({
  id: z.boolean().optional(),
  datasetId: z.boolean().optional(),
  type: z.boolean().optional(),
  endDate: z.boolean().optional(),
  dataset: z.union([z.boolean(),z.lazy(() => DatasetArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const OrderWhereInputSchema: z.ZodType<Prisma.OrderWhereInput> = z.object({
  AND: z.union([ z.lazy(() => OrderWhereInputSchema),z.lazy(() => OrderWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => OrderWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => OrderWhereInputSchema),z.lazy(() => OrderWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  startDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  endDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  budget: z.union([ z.lazy(() => DecimalFilterSchema),z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  labelingLanguage: z.union([ z.lazy(() => EnumLabelingLanguageFilterSchema),z.lazy(() => LabelingLanguageSchema) ]).optional(),
  datasetId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  dataset: z.union([ z.lazy(() => DatasetScalarRelationFilterSchema),z.lazy(() => DatasetWhereInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.OrderWhereInput>;

export const OrderOrderByWithRelationInputSchema: z.ZodType<Prisma.OrderOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  budget: z.lazy(() => SortOrderSchema).optional(),
  labelingLanguage: z.lazy(() => SortOrderSchema).optional(),
  datasetId: z.lazy(() => SortOrderSchema).optional(),
  dataset: z.lazy(() => DatasetOrderByWithRelationInputSchema).optional()
}).strict() as z.ZodType<Prisma.OrderOrderByWithRelationInput>;

export const OrderWhereUniqueInputSchema: z.ZodType<Prisma.OrderWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    datasetId: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    datasetId: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  datasetId: z.string().optional(),
  AND: z.union([ z.lazy(() => OrderWhereInputSchema),z.lazy(() => OrderWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => OrderWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => OrderWhereInputSchema),z.lazy(() => OrderWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  startDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  endDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  budget: z.union([ z.lazy(() => DecimalFilterSchema),z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  labelingLanguage: z.union([ z.lazy(() => EnumLabelingLanguageFilterSchema),z.lazy(() => LabelingLanguageSchema) ]).optional(),
  dataset: z.union([ z.lazy(() => DatasetScalarRelationFilterSchema),z.lazy(() => DatasetWhereInputSchema) ]).optional(),
}).strict()) as z.ZodType<Prisma.OrderWhereUniqueInput>;

export const OrderOrderByWithAggregationInputSchema: z.ZodType<Prisma.OrderOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  budget: z.lazy(() => SortOrderSchema).optional(),
  labelingLanguage: z.lazy(() => SortOrderSchema).optional(),
  datasetId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => OrderCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => OrderAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => OrderMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => OrderMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => OrderSumOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.OrderOrderByWithAggregationInput>;

export const OrderScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.OrderScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => OrderScalarWhereWithAggregatesInputSchema),z.lazy(() => OrderScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => OrderScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => OrderScalarWhereWithAggregatesInputSchema),z.lazy(() => OrderScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  startDate: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  endDate: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  budget: z.union([ z.lazy(() => DecimalWithAggregatesFilterSchema),z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  labelingLanguage: z.union([ z.lazy(() => EnumLabelingLanguageWithAggregatesFilterSchema),z.lazy(() => LabelingLanguageSchema) ]).optional(),
  datasetId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict() as z.ZodType<Prisma.OrderScalarWhereWithAggregatesInput>;

export const DatasetWhereInputSchema: z.ZodType<Prisma.DatasetWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DatasetWhereInputSchema),z.lazy(() => DatasetWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DatasetWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DatasetWhereInputSchema),z.lazy(() => DatasetWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  minSamplesCount: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  features: z.lazy(() => DatasetFeatureListRelationFilterSchema).optional(),
  Order: z.union([ z.lazy(() => OrderNullableScalarRelationFilterSchema),z.lazy(() => OrderWhereInputSchema) ]).optional().nullable(),
  Task: z.union([ z.lazy(() => TaskNullableScalarRelationFilterSchema),z.lazy(() => TaskWhereInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.DatasetWhereInput>;

export const DatasetOrderByWithRelationInputSchema: z.ZodType<Prisma.DatasetOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  minSamplesCount: z.lazy(() => SortOrderSchema).optional(),
  features: z.lazy(() => DatasetFeatureOrderByRelationAggregateInputSchema).optional(),
  Order: z.lazy(() => OrderOrderByWithRelationInputSchema).optional(),
  Task: z.lazy(() => TaskOrderByWithRelationInputSchema).optional()
}).strict() as z.ZodType<Prisma.DatasetOrderByWithRelationInput>;

export const DatasetWhereUniqueInputSchema: z.ZodType<Prisma.DatasetWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => DatasetWhereInputSchema),z.lazy(() => DatasetWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DatasetWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DatasetWhereInputSchema),z.lazy(() => DatasetWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  minSamplesCount: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  features: z.lazy(() => DatasetFeatureListRelationFilterSchema).optional(),
  Order: z.union([ z.lazy(() => OrderNullableScalarRelationFilterSchema),z.lazy(() => OrderWhereInputSchema) ]).optional().nullable(),
  Task: z.union([ z.lazy(() => TaskNullableScalarRelationFilterSchema),z.lazy(() => TaskWhereInputSchema) ]).optional().nullable(),
}).strict()) as z.ZodType<Prisma.DatasetWhereUniqueInput>;

export const DatasetOrderByWithAggregationInputSchema: z.ZodType<Prisma.DatasetOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  minSamplesCount: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => DatasetCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => DatasetAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => DatasetMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => DatasetMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => DatasetSumOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.DatasetOrderByWithAggregationInput>;

export const DatasetScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.DatasetScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => DatasetScalarWhereWithAggregatesInputSchema),z.lazy(() => DatasetScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => DatasetScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DatasetScalarWhereWithAggregatesInputSchema),z.lazy(() => DatasetScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  minSamplesCount: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict() as z.ZodType<Prisma.DatasetScalarWhereWithAggregatesInput>;

export const DatasetFeatureWhereInputSchema: z.ZodType<Prisma.DatasetFeatureWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DatasetFeatureWhereInputSchema),z.lazy(() => DatasetFeatureWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DatasetFeatureWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DatasetFeatureWhereInputSchema),z.lazy(() => DatasetFeatureWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  imageGuidelines: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  labelGuidelines: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  datasetId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  dataset: z.union([ z.lazy(() => DatasetScalarRelationFilterSchema),z.lazy(() => DatasetWhereInputSchema) ]).optional(),
  examples: z.lazy(() => DatasetFeatureExampleListRelationFilterSchema).optional()
}).strict() as z.ZodType<Prisma.DatasetFeatureWhereInput>;

export const DatasetFeatureOrderByWithRelationInputSchema: z.ZodType<Prisma.DatasetFeatureOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  imageGuidelines: z.lazy(() => SortOrderSchema).optional(),
  labelGuidelines: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  datasetId: z.lazy(() => SortOrderSchema).optional(),
  dataset: z.lazy(() => DatasetOrderByWithRelationInputSchema).optional(),
  examples: z.lazy(() => DatasetFeatureExampleOrderByRelationAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.DatasetFeatureOrderByWithRelationInput>;

export const DatasetFeatureWhereUniqueInputSchema: z.ZodType<Prisma.DatasetFeatureWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => DatasetFeatureWhereInputSchema),z.lazy(() => DatasetFeatureWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DatasetFeatureWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DatasetFeatureWhereInputSchema),z.lazy(() => DatasetFeatureWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  imageGuidelines: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  labelGuidelines: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  datasetId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  dataset: z.union([ z.lazy(() => DatasetScalarRelationFilterSchema),z.lazy(() => DatasetWhereInputSchema) ]).optional(),
  examples: z.lazy(() => DatasetFeatureExampleListRelationFilterSchema).optional()
}).strict()) as z.ZodType<Prisma.DatasetFeatureWhereUniqueInput>;

export const DatasetFeatureOrderByWithAggregationInputSchema: z.ZodType<Prisma.DatasetFeatureOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  imageGuidelines: z.lazy(() => SortOrderSchema).optional(),
  labelGuidelines: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  datasetId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => DatasetFeatureCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => DatasetFeatureMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => DatasetFeatureMinOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.DatasetFeatureOrderByWithAggregationInput>;

export const DatasetFeatureScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.DatasetFeatureScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => DatasetFeatureScalarWhereWithAggregatesInputSchema),z.lazy(() => DatasetFeatureScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => DatasetFeatureScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DatasetFeatureScalarWhereWithAggregatesInputSchema),z.lazy(() => DatasetFeatureScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  imageGuidelines: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  labelGuidelines: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  datasetId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict() as z.ZodType<Prisma.DatasetFeatureScalarWhereWithAggregatesInput>;

export const DatasetFeatureExampleWhereInputSchema: z.ZodType<Prisma.DatasetFeatureExampleWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DatasetFeatureExampleWhereInputSchema),z.lazy(() => DatasetFeatureExampleWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DatasetFeatureExampleWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DatasetFeatureExampleWhereInputSchema),z.lazy(() => DatasetFeatureExampleWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  imageUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  label: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  featureId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  feature: z.union([ z.lazy(() => DatasetFeatureScalarRelationFilterSchema),z.lazy(() => DatasetFeatureWhereInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.DatasetFeatureExampleWhereInput>;

export const DatasetFeatureExampleOrderByWithRelationInputSchema: z.ZodType<Prisma.DatasetFeatureExampleOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  featureId: z.lazy(() => SortOrderSchema).optional(),
  feature: z.lazy(() => DatasetFeatureOrderByWithRelationInputSchema).optional()
}).strict() as z.ZodType<Prisma.DatasetFeatureExampleOrderByWithRelationInput>;

export const DatasetFeatureExampleWhereUniqueInputSchema: z.ZodType<Prisma.DatasetFeatureExampleWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => DatasetFeatureExampleWhereInputSchema),z.lazy(() => DatasetFeatureExampleWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DatasetFeatureExampleWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DatasetFeatureExampleWhereInputSchema),z.lazy(() => DatasetFeatureExampleWhereInputSchema).array() ]).optional(),
  imageUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  label: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  featureId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  feature: z.union([ z.lazy(() => DatasetFeatureScalarRelationFilterSchema),z.lazy(() => DatasetFeatureWhereInputSchema) ]).optional(),
}).strict()) as z.ZodType<Prisma.DatasetFeatureExampleWhereUniqueInput>;

export const DatasetFeatureExampleOrderByWithAggregationInputSchema: z.ZodType<Prisma.DatasetFeatureExampleOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  featureId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => DatasetFeatureExampleCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => DatasetFeatureExampleMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => DatasetFeatureExampleMinOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.DatasetFeatureExampleOrderByWithAggregationInput>;

export const DatasetFeatureExampleScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.DatasetFeatureExampleScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => DatasetFeatureExampleScalarWhereWithAggregatesInputSchema),z.lazy(() => DatasetFeatureExampleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => DatasetFeatureExampleScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DatasetFeatureExampleScalarWhereWithAggregatesInputSchema),z.lazy(() => DatasetFeatureExampleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  imageUrl: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  label: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  featureId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict() as z.ZodType<Prisma.DatasetFeatureExampleScalarWhereWithAggregatesInput>;

export const TaskWhereInputSchema: z.ZodType<Prisma.TaskWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TaskWhereInputSchema),z.lazy(() => TaskWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskWhereInputSchema),z.lazy(() => TaskWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  datasetId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumTaskTypeFilterSchema),z.lazy(() => TaskTypeSchema) ]).optional(),
  endDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  dataset: z.union([ z.lazy(() => DatasetScalarRelationFilterSchema),z.lazy(() => DatasetWhereInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.TaskWhereInput>;

export const TaskOrderByWithRelationInputSchema: z.ZodType<Prisma.TaskOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  datasetId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  dataset: z.lazy(() => DatasetOrderByWithRelationInputSchema).optional()
}).strict() as z.ZodType<Prisma.TaskOrderByWithRelationInput>;

export const TaskWhereUniqueInputSchema: z.ZodType<Prisma.TaskWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    datasetId: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    datasetId: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  datasetId: z.string().optional(),
  AND: z.union([ z.lazy(() => TaskWhereInputSchema),z.lazy(() => TaskWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskWhereInputSchema),z.lazy(() => TaskWhereInputSchema).array() ]).optional(),
  type: z.union([ z.lazy(() => EnumTaskTypeFilterSchema),z.lazy(() => TaskTypeSchema) ]).optional(),
  endDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  dataset: z.union([ z.lazy(() => DatasetScalarRelationFilterSchema),z.lazy(() => DatasetWhereInputSchema) ]).optional(),
}).strict()) as z.ZodType<Prisma.TaskWhereUniqueInput>;

export const TaskOrderByWithAggregationInputSchema: z.ZodType<Prisma.TaskOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  datasetId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TaskCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TaskMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TaskMinOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.TaskOrderByWithAggregationInput>;

export const TaskScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TaskScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TaskScalarWhereWithAggregatesInputSchema),z.lazy(() => TaskScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskScalarWhereWithAggregatesInputSchema),z.lazy(() => TaskScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  datasetId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumTaskTypeWithAggregatesFilterSchema),z.lazy(() => TaskTypeSchema) ]).optional(),
  endDate: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict() as z.ZodType<Prisma.TaskScalarWhereWithAggregatesInput>;

export const OrderCreateInputSchema: z.ZodType<Prisma.OrderCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  budget: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  labelingLanguage: z.lazy(() => LabelingLanguageSchema),
  dataset: z.lazy(() => DatasetCreateNestedOneWithoutOrderInputSchema)
}).strict() as z.ZodType<Prisma.OrderCreateInput>;

export const OrderUncheckedCreateInputSchema: z.ZodType<Prisma.OrderUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  budget: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  labelingLanguage: z.lazy(() => LabelingLanguageSchema),
  datasetId: z.string()
}).strict() as z.ZodType<Prisma.OrderUncheckedCreateInput>;

export const OrderUpdateInputSchema: z.ZodType<Prisma.OrderUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  budget: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  labelingLanguage: z.union([ z.lazy(() => LabelingLanguageSchema),z.lazy(() => EnumLabelingLanguageFieldUpdateOperationsInputSchema) ]).optional(),
  dataset: z.lazy(() => DatasetUpdateOneRequiredWithoutOrderNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.OrderUpdateInput>;

export const OrderUncheckedUpdateInputSchema: z.ZodType<Prisma.OrderUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  budget: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  labelingLanguage: z.union([ z.lazy(() => LabelingLanguageSchema),z.lazy(() => EnumLabelingLanguageFieldUpdateOperationsInputSchema) ]).optional(),
  datasetId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.OrderUncheckedUpdateInput>;

export const OrderCreateManyInputSchema: z.ZodType<Prisma.OrderCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  budget: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  labelingLanguage: z.lazy(() => LabelingLanguageSchema),
  datasetId: z.string()
}).strict() as z.ZodType<Prisma.OrderCreateManyInput>;

export const OrderUpdateManyMutationInputSchema: z.ZodType<Prisma.OrderUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  budget: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  labelingLanguage: z.union([ z.lazy(() => LabelingLanguageSchema),z.lazy(() => EnumLabelingLanguageFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.OrderUpdateManyMutationInput>;

export const OrderUncheckedUpdateManyInputSchema: z.ZodType<Prisma.OrderUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  budget: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  labelingLanguage: z.union([ z.lazy(() => LabelingLanguageSchema),z.lazy(() => EnumLabelingLanguageFieldUpdateOperationsInputSchema) ]).optional(),
  datasetId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.OrderUncheckedUpdateManyInput>;

export const DatasetCreateInputSchema: z.ZodType<Prisma.DatasetCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  minSamplesCount: z.number().int(),
  features: z.lazy(() => DatasetFeatureCreateNestedManyWithoutDatasetInputSchema).optional(),
  Order: z.lazy(() => OrderCreateNestedOneWithoutDatasetInputSchema).optional(),
  Task: z.lazy(() => TaskCreateNestedOneWithoutDatasetInputSchema).optional()
}).strict() as z.ZodType<Prisma.DatasetCreateInput>;

export const DatasetUncheckedCreateInputSchema: z.ZodType<Prisma.DatasetUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  minSamplesCount: z.number().int(),
  features: z.lazy(() => DatasetFeatureUncheckedCreateNestedManyWithoutDatasetInputSchema).optional(),
  Order: z.lazy(() => OrderUncheckedCreateNestedOneWithoutDatasetInputSchema).optional(),
  Task: z.lazy(() => TaskUncheckedCreateNestedOneWithoutDatasetInputSchema).optional()
}).strict() as z.ZodType<Prisma.DatasetUncheckedCreateInput>;

export const DatasetUpdateInputSchema: z.ZodType<Prisma.DatasetUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  minSamplesCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  features: z.lazy(() => DatasetFeatureUpdateManyWithoutDatasetNestedInputSchema).optional(),
  Order: z.lazy(() => OrderUpdateOneWithoutDatasetNestedInputSchema).optional(),
  Task: z.lazy(() => TaskUpdateOneWithoutDatasetNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.DatasetUpdateInput>;

export const DatasetUncheckedUpdateInputSchema: z.ZodType<Prisma.DatasetUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  minSamplesCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  features: z.lazy(() => DatasetFeatureUncheckedUpdateManyWithoutDatasetNestedInputSchema).optional(),
  Order: z.lazy(() => OrderUncheckedUpdateOneWithoutDatasetNestedInputSchema).optional(),
  Task: z.lazy(() => TaskUncheckedUpdateOneWithoutDatasetNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.DatasetUncheckedUpdateInput>;

export const DatasetCreateManyInputSchema: z.ZodType<Prisma.DatasetCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  minSamplesCount: z.number().int()
}).strict() as z.ZodType<Prisma.DatasetCreateManyInput>;

export const DatasetUpdateManyMutationInputSchema: z.ZodType<Prisma.DatasetUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  minSamplesCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.DatasetUpdateManyMutationInput>;

export const DatasetUncheckedUpdateManyInputSchema: z.ZodType<Prisma.DatasetUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  minSamplesCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.DatasetUncheckedUpdateManyInput>;

export const DatasetFeatureCreateInputSchema: z.ZodType<Prisma.DatasetFeatureCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  imageGuidelines: z.string(),
  labelGuidelines: z.string(),
  type: z.string(),
  dataset: z.lazy(() => DatasetCreateNestedOneWithoutFeaturesInputSchema),
  examples: z.lazy(() => DatasetFeatureExampleCreateNestedManyWithoutFeatureInputSchema).optional()
}).strict() as z.ZodType<Prisma.DatasetFeatureCreateInput>;

export const DatasetFeatureUncheckedCreateInputSchema: z.ZodType<Prisma.DatasetFeatureUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  imageGuidelines: z.string(),
  labelGuidelines: z.string(),
  type: z.string(),
  datasetId: z.string(),
  examples: z.lazy(() => DatasetFeatureExampleUncheckedCreateNestedManyWithoutFeatureInputSchema).optional()
}).strict() as z.ZodType<Prisma.DatasetFeatureUncheckedCreateInput>;

export const DatasetFeatureUpdateInputSchema: z.ZodType<Prisma.DatasetFeatureUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageGuidelines: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  labelGuidelines: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataset: z.lazy(() => DatasetUpdateOneRequiredWithoutFeaturesNestedInputSchema).optional(),
  examples: z.lazy(() => DatasetFeatureExampleUpdateManyWithoutFeatureNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.DatasetFeatureUpdateInput>;

export const DatasetFeatureUncheckedUpdateInputSchema: z.ZodType<Prisma.DatasetFeatureUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageGuidelines: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  labelGuidelines: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  datasetId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  examples: z.lazy(() => DatasetFeatureExampleUncheckedUpdateManyWithoutFeatureNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.DatasetFeatureUncheckedUpdateInput>;

export const DatasetFeatureCreateManyInputSchema: z.ZodType<Prisma.DatasetFeatureCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  imageGuidelines: z.string(),
  labelGuidelines: z.string(),
  type: z.string(),
  datasetId: z.string()
}).strict() as z.ZodType<Prisma.DatasetFeatureCreateManyInput>;

export const DatasetFeatureUpdateManyMutationInputSchema: z.ZodType<Prisma.DatasetFeatureUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageGuidelines: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  labelGuidelines: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.DatasetFeatureUpdateManyMutationInput>;

export const DatasetFeatureUncheckedUpdateManyInputSchema: z.ZodType<Prisma.DatasetFeatureUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageGuidelines: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  labelGuidelines: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  datasetId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.DatasetFeatureUncheckedUpdateManyInput>;

export const DatasetFeatureExampleCreateInputSchema: z.ZodType<Prisma.DatasetFeatureExampleCreateInput> = z.object({
  id: z.string().cuid().optional(),
  imageUrl: z.string(),
  label: z.string(),
  feature: z.lazy(() => DatasetFeatureCreateNestedOneWithoutExamplesInputSchema)
}).strict() as z.ZodType<Prisma.DatasetFeatureExampleCreateInput>;

export const DatasetFeatureExampleUncheckedCreateInputSchema: z.ZodType<Prisma.DatasetFeatureExampleUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  imageUrl: z.string(),
  label: z.string(),
  featureId: z.string()
}).strict() as z.ZodType<Prisma.DatasetFeatureExampleUncheckedCreateInput>;

export const DatasetFeatureExampleUpdateInputSchema: z.ZodType<Prisma.DatasetFeatureExampleUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  feature: z.lazy(() => DatasetFeatureUpdateOneRequiredWithoutExamplesNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.DatasetFeatureExampleUpdateInput>;

export const DatasetFeatureExampleUncheckedUpdateInputSchema: z.ZodType<Prisma.DatasetFeatureExampleUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  featureId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.DatasetFeatureExampleUncheckedUpdateInput>;

export const DatasetFeatureExampleCreateManyInputSchema: z.ZodType<Prisma.DatasetFeatureExampleCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  imageUrl: z.string(),
  label: z.string(),
  featureId: z.string()
}).strict() as z.ZodType<Prisma.DatasetFeatureExampleCreateManyInput>;

export const DatasetFeatureExampleUpdateManyMutationInputSchema: z.ZodType<Prisma.DatasetFeatureExampleUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.DatasetFeatureExampleUpdateManyMutationInput>;

export const DatasetFeatureExampleUncheckedUpdateManyInputSchema: z.ZodType<Prisma.DatasetFeatureExampleUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  featureId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.DatasetFeatureExampleUncheckedUpdateManyInput>;

export const TaskCreateInputSchema: z.ZodType<Prisma.TaskCreateInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.lazy(() => TaskTypeSchema),
  endDate: z.coerce.date(),
  dataset: z.lazy(() => DatasetCreateNestedOneWithoutTaskInputSchema)
}).strict() as z.ZodType<Prisma.TaskCreateInput>;

export const TaskUncheckedCreateInputSchema: z.ZodType<Prisma.TaskUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  datasetId: z.string(),
  type: z.lazy(() => TaskTypeSchema),
  endDate: z.coerce.date()
}).strict() as z.ZodType<Prisma.TaskUncheckedCreateInput>;

export const TaskUpdateInputSchema: z.ZodType<Prisma.TaskUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TaskTypeSchema),z.lazy(() => EnumTaskTypeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dataset: z.lazy(() => DatasetUpdateOneRequiredWithoutTaskNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.TaskUpdateInput>;

export const TaskUncheckedUpdateInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  datasetId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TaskTypeSchema),z.lazy(() => EnumTaskTypeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.TaskUncheckedUpdateInput>;

export const TaskCreateManyInputSchema: z.ZodType<Prisma.TaskCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  datasetId: z.string(),
  type: z.lazy(() => TaskTypeSchema),
  endDate: z.coerce.date()
}).strict() as z.ZodType<Prisma.TaskCreateManyInput>;

export const TaskUpdateManyMutationInputSchema: z.ZodType<Prisma.TaskUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TaskTypeSchema),z.lazy(() => EnumTaskTypeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.TaskUpdateManyMutationInput>;

export const TaskUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  datasetId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TaskTypeSchema),z.lazy(() => EnumTaskTypeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.TaskUncheckedUpdateManyInput>;

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.StringFilter>;

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.DateTimeFilter>;

export const DecimalFilterSchema: z.ZodType<Prisma.DecimalFilter> = z.object({
  equals: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  in: z.union([z.number().array(),z.string().array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  notIn: z.union([z.number().array(),z.string().array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  lt: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NestedDecimalFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.DecimalFilter>;

export const EnumLabelingLanguageFilterSchema: z.ZodType<Prisma.EnumLabelingLanguageFilter> = z.object({
  equals: z.lazy(() => LabelingLanguageSchema).optional(),
  in: z.lazy(() => LabelingLanguageSchema).array().optional(),
  notIn: z.lazy(() => LabelingLanguageSchema).array().optional(),
  not: z.union([ z.lazy(() => LabelingLanguageSchema),z.lazy(() => NestedEnumLabelingLanguageFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.EnumLabelingLanguageFilter>;

export const DatasetScalarRelationFilterSchema: z.ZodType<Prisma.DatasetScalarRelationFilter> = z.object({
  is: z.lazy(() => DatasetWhereInputSchema).optional(),
  isNot: z.lazy(() => DatasetWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.DatasetScalarRelationFilter>;

export const OrderCountOrderByAggregateInputSchema: z.ZodType<Prisma.OrderCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  budget: z.lazy(() => SortOrderSchema).optional(),
  labelingLanguage: z.lazy(() => SortOrderSchema).optional(),
  datasetId: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.OrderCountOrderByAggregateInput>;

export const OrderAvgOrderByAggregateInputSchema: z.ZodType<Prisma.OrderAvgOrderByAggregateInput> = z.object({
  budget: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.OrderAvgOrderByAggregateInput>;

export const OrderMaxOrderByAggregateInputSchema: z.ZodType<Prisma.OrderMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  budget: z.lazy(() => SortOrderSchema).optional(),
  labelingLanguage: z.lazy(() => SortOrderSchema).optional(),
  datasetId: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.OrderMaxOrderByAggregateInput>;

export const OrderMinOrderByAggregateInputSchema: z.ZodType<Prisma.OrderMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  budget: z.lazy(() => SortOrderSchema).optional(),
  labelingLanguage: z.lazy(() => SortOrderSchema).optional(),
  datasetId: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.OrderMinOrderByAggregateInput>;

export const OrderSumOrderByAggregateInputSchema: z.ZodType<Prisma.OrderSumOrderByAggregateInput> = z.object({
  budget: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.OrderSumOrderByAggregateInput>;

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict() as z.ZodType<Prisma.StringWithAggregatesFilter>;

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict() as z.ZodType<Prisma.DateTimeWithAggregatesFilter>;

export const DecimalWithAggregatesFilterSchema: z.ZodType<Prisma.DecimalWithAggregatesFilter> = z.object({
  equals: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  in: z.union([z.number().array(),z.string().array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  notIn: z.union([z.number().array(),z.string().array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  lt: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NestedDecimalWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _sum: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _min: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _max: z.lazy(() => NestedDecimalFilterSchema).optional()
}).strict() as z.ZodType<Prisma.DecimalWithAggregatesFilter>;

export const EnumLabelingLanguageWithAggregatesFilterSchema: z.ZodType<Prisma.EnumLabelingLanguageWithAggregatesFilter> = z.object({
  equals: z.lazy(() => LabelingLanguageSchema).optional(),
  in: z.lazy(() => LabelingLanguageSchema).array().optional(),
  notIn: z.lazy(() => LabelingLanguageSchema).array().optional(),
  not: z.union([ z.lazy(() => LabelingLanguageSchema),z.lazy(() => NestedEnumLabelingLanguageWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumLabelingLanguageFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumLabelingLanguageFilterSchema).optional()
}).strict() as z.ZodType<Prisma.EnumLabelingLanguageWithAggregatesFilter>;

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.IntFilter>;

export const DatasetFeatureListRelationFilterSchema: z.ZodType<Prisma.DatasetFeatureListRelationFilter> = z.object({
  every: z.lazy(() => DatasetFeatureWhereInputSchema).optional(),
  some: z.lazy(() => DatasetFeatureWhereInputSchema).optional(),
  none: z.lazy(() => DatasetFeatureWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.DatasetFeatureListRelationFilter>;

export const OrderNullableScalarRelationFilterSchema: z.ZodType<Prisma.OrderNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => OrderWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => OrderWhereInputSchema).optional().nullable()
}).strict() as z.ZodType<Prisma.OrderNullableScalarRelationFilter>;

export const TaskNullableScalarRelationFilterSchema: z.ZodType<Prisma.TaskNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => TaskWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => TaskWhereInputSchema).optional().nullable()
}).strict() as z.ZodType<Prisma.TaskNullableScalarRelationFilter>;

export const DatasetFeatureOrderByRelationAggregateInputSchema: z.ZodType<Prisma.DatasetFeatureOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.DatasetFeatureOrderByRelationAggregateInput>;

export const DatasetCountOrderByAggregateInputSchema: z.ZodType<Prisma.DatasetCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  minSamplesCount: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.DatasetCountOrderByAggregateInput>;

export const DatasetAvgOrderByAggregateInputSchema: z.ZodType<Prisma.DatasetAvgOrderByAggregateInput> = z.object({
  minSamplesCount: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.DatasetAvgOrderByAggregateInput>;

export const DatasetMaxOrderByAggregateInputSchema: z.ZodType<Prisma.DatasetMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  minSamplesCount: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.DatasetMaxOrderByAggregateInput>;

export const DatasetMinOrderByAggregateInputSchema: z.ZodType<Prisma.DatasetMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  minSamplesCount: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.DatasetMinOrderByAggregateInput>;

export const DatasetSumOrderByAggregateInputSchema: z.ZodType<Prisma.DatasetSumOrderByAggregateInput> = z.object({
  minSamplesCount: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.DatasetSumOrderByAggregateInput>;

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict() as z.ZodType<Prisma.IntWithAggregatesFilter>;

export const DatasetFeatureExampleListRelationFilterSchema: z.ZodType<Prisma.DatasetFeatureExampleListRelationFilter> = z.object({
  every: z.lazy(() => DatasetFeatureExampleWhereInputSchema).optional(),
  some: z.lazy(() => DatasetFeatureExampleWhereInputSchema).optional(),
  none: z.lazy(() => DatasetFeatureExampleWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.DatasetFeatureExampleListRelationFilter>;

export const DatasetFeatureExampleOrderByRelationAggregateInputSchema: z.ZodType<Prisma.DatasetFeatureExampleOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.DatasetFeatureExampleOrderByRelationAggregateInput>;

export const DatasetFeatureCountOrderByAggregateInputSchema: z.ZodType<Prisma.DatasetFeatureCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  imageGuidelines: z.lazy(() => SortOrderSchema).optional(),
  labelGuidelines: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  datasetId: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.DatasetFeatureCountOrderByAggregateInput>;

export const DatasetFeatureMaxOrderByAggregateInputSchema: z.ZodType<Prisma.DatasetFeatureMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  imageGuidelines: z.lazy(() => SortOrderSchema).optional(),
  labelGuidelines: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  datasetId: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.DatasetFeatureMaxOrderByAggregateInput>;

export const DatasetFeatureMinOrderByAggregateInputSchema: z.ZodType<Prisma.DatasetFeatureMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  imageGuidelines: z.lazy(() => SortOrderSchema).optional(),
  labelGuidelines: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  datasetId: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.DatasetFeatureMinOrderByAggregateInput>;

export const DatasetFeatureScalarRelationFilterSchema: z.ZodType<Prisma.DatasetFeatureScalarRelationFilter> = z.object({
  is: z.lazy(() => DatasetFeatureWhereInputSchema).optional(),
  isNot: z.lazy(() => DatasetFeatureWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.DatasetFeatureScalarRelationFilter>;

export const DatasetFeatureExampleCountOrderByAggregateInputSchema: z.ZodType<Prisma.DatasetFeatureExampleCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  featureId: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.DatasetFeatureExampleCountOrderByAggregateInput>;

export const DatasetFeatureExampleMaxOrderByAggregateInputSchema: z.ZodType<Prisma.DatasetFeatureExampleMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  featureId: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.DatasetFeatureExampleMaxOrderByAggregateInput>;

export const DatasetFeatureExampleMinOrderByAggregateInputSchema: z.ZodType<Prisma.DatasetFeatureExampleMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  featureId: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.DatasetFeatureExampleMinOrderByAggregateInput>;

export const EnumTaskTypeFilterSchema: z.ZodType<Prisma.EnumTaskTypeFilter> = z.object({
  equals: z.lazy(() => TaskTypeSchema).optional(),
  in: z.lazy(() => TaskTypeSchema).array().optional(),
  notIn: z.lazy(() => TaskTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => TaskTypeSchema),z.lazy(() => NestedEnumTaskTypeFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.EnumTaskTypeFilter>;

export const TaskCountOrderByAggregateInputSchema: z.ZodType<Prisma.TaskCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  datasetId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.TaskCountOrderByAggregateInput>;

export const TaskMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TaskMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  datasetId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.TaskMaxOrderByAggregateInput>;

export const TaskMinOrderByAggregateInputSchema: z.ZodType<Prisma.TaskMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  datasetId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.TaskMinOrderByAggregateInput>;

export const EnumTaskTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumTaskTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => TaskTypeSchema).optional(),
  in: z.lazy(() => TaskTypeSchema).array().optional(),
  notIn: z.lazy(() => TaskTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => TaskTypeSchema),z.lazy(() => NestedEnumTaskTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumTaskTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumTaskTypeFilterSchema).optional()
}).strict() as z.ZodType<Prisma.EnumTaskTypeWithAggregatesFilter>;

export const DatasetCreateNestedOneWithoutOrderInputSchema: z.ZodType<Prisma.DatasetCreateNestedOneWithoutOrderInput> = z.object({
  create: z.union([ z.lazy(() => DatasetCreateWithoutOrderInputSchema),z.lazy(() => DatasetUncheckedCreateWithoutOrderInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DatasetCreateOrConnectWithoutOrderInputSchema).optional(),
  connect: z.lazy(() => DatasetWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.DatasetCreateNestedOneWithoutOrderInput>;

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict() as z.ZodType<Prisma.StringFieldUpdateOperationsInput>;

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput>;

export const DecimalFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DecimalFieldUpdateOperationsInput> = z.object({
  set: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  increment: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  decrement: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  multiply: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  divide: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional()
}).strict() as z.ZodType<Prisma.DecimalFieldUpdateOperationsInput>;

export const EnumLabelingLanguageFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumLabelingLanguageFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => LabelingLanguageSchema).optional()
}).strict() as z.ZodType<Prisma.EnumLabelingLanguageFieldUpdateOperationsInput>;

export const DatasetUpdateOneRequiredWithoutOrderNestedInputSchema: z.ZodType<Prisma.DatasetUpdateOneRequiredWithoutOrderNestedInput> = z.object({
  create: z.union([ z.lazy(() => DatasetCreateWithoutOrderInputSchema),z.lazy(() => DatasetUncheckedCreateWithoutOrderInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DatasetCreateOrConnectWithoutOrderInputSchema).optional(),
  upsert: z.lazy(() => DatasetUpsertWithoutOrderInputSchema).optional(),
  connect: z.lazy(() => DatasetWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => DatasetUpdateToOneWithWhereWithoutOrderInputSchema),z.lazy(() => DatasetUpdateWithoutOrderInputSchema),z.lazy(() => DatasetUncheckedUpdateWithoutOrderInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.DatasetUpdateOneRequiredWithoutOrderNestedInput>;

export const DatasetFeatureCreateNestedManyWithoutDatasetInputSchema: z.ZodType<Prisma.DatasetFeatureCreateNestedManyWithoutDatasetInput> = z.object({
  create: z.union([ z.lazy(() => DatasetFeatureCreateWithoutDatasetInputSchema),z.lazy(() => DatasetFeatureCreateWithoutDatasetInputSchema).array(),z.lazy(() => DatasetFeatureUncheckedCreateWithoutDatasetInputSchema),z.lazy(() => DatasetFeatureUncheckedCreateWithoutDatasetInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DatasetFeatureCreateOrConnectWithoutDatasetInputSchema),z.lazy(() => DatasetFeatureCreateOrConnectWithoutDatasetInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DatasetFeatureCreateManyDatasetInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DatasetFeatureWhereUniqueInputSchema),z.lazy(() => DatasetFeatureWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.DatasetFeatureCreateNestedManyWithoutDatasetInput>;

export const OrderCreateNestedOneWithoutDatasetInputSchema: z.ZodType<Prisma.OrderCreateNestedOneWithoutDatasetInput> = z.object({
  create: z.union([ z.lazy(() => OrderCreateWithoutDatasetInputSchema),z.lazy(() => OrderUncheckedCreateWithoutDatasetInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => OrderCreateOrConnectWithoutDatasetInputSchema).optional(),
  connect: z.lazy(() => OrderWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.OrderCreateNestedOneWithoutDatasetInput>;

export const TaskCreateNestedOneWithoutDatasetInputSchema: z.ZodType<Prisma.TaskCreateNestedOneWithoutDatasetInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutDatasetInputSchema),z.lazy(() => TaskUncheckedCreateWithoutDatasetInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TaskCreateOrConnectWithoutDatasetInputSchema).optional(),
  connect: z.lazy(() => TaskWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.TaskCreateNestedOneWithoutDatasetInput>;

export const DatasetFeatureUncheckedCreateNestedManyWithoutDatasetInputSchema: z.ZodType<Prisma.DatasetFeatureUncheckedCreateNestedManyWithoutDatasetInput> = z.object({
  create: z.union([ z.lazy(() => DatasetFeatureCreateWithoutDatasetInputSchema),z.lazy(() => DatasetFeatureCreateWithoutDatasetInputSchema).array(),z.lazy(() => DatasetFeatureUncheckedCreateWithoutDatasetInputSchema),z.lazy(() => DatasetFeatureUncheckedCreateWithoutDatasetInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DatasetFeatureCreateOrConnectWithoutDatasetInputSchema),z.lazy(() => DatasetFeatureCreateOrConnectWithoutDatasetInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DatasetFeatureCreateManyDatasetInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DatasetFeatureWhereUniqueInputSchema),z.lazy(() => DatasetFeatureWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.DatasetFeatureUncheckedCreateNestedManyWithoutDatasetInput>;

export const OrderUncheckedCreateNestedOneWithoutDatasetInputSchema: z.ZodType<Prisma.OrderUncheckedCreateNestedOneWithoutDatasetInput> = z.object({
  create: z.union([ z.lazy(() => OrderCreateWithoutDatasetInputSchema),z.lazy(() => OrderUncheckedCreateWithoutDatasetInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => OrderCreateOrConnectWithoutDatasetInputSchema).optional(),
  connect: z.lazy(() => OrderWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.OrderUncheckedCreateNestedOneWithoutDatasetInput>;

export const TaskUncheckedCreateNestedOneWithoutDatasetInputSchema: z.ZodType<Prisma.TaskUncheckedCreateNestedOneWithoutDatasetInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutDatasetInputSchema),z.lazy(() => TaskUncheckedCreateWithoutDatasetInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TaskCreateOrConnectWithoutDatasetInputSchema).optional(),
  connect: z.lazy(() => TaskWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.TaskUncheckedCreateNestedOneWithoutDatasetInput>;

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict() as z.ZodType<Prisma.IntFieldUpdateOperationsInput>;

export const DatasetFeatureUpdateManyWithoutDatasetNestedInputSchema: z.ZodType<Prisma.DatasetFeatureUpdateManyWithoutDatasetNestedInput> = z.object({
  create: z.union([ z.lazy(() => DatasetFeatureCreateWithoutDatasetInputSchema),z.lazy(() => DatasetFeatureCreateWithoutDatasetInputSchema).array(),z.lazy(() => DatasetFeatureUncheckedCreateWithoutDatasetInputSchema),z.lazy(() => DatasetFeatureUncheckedCreateWithoutDatasetInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DatasetFeatureCreateOrConnectWithoutDatasetInputSchema),z.lazy(() => DatasetFeatureCreateOrConnectWithoutDatasetInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DatasetFeatureUpsertWithWhereUniqueWithoutDatasetInputSchema),z.lazy(() => DatasetFeatureUpsertWithWhereUniqueWithoutDatasetInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DatasetFeatureCreateManyDatasetInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DatasetFeatureWhereUniqueInputSchema),z.lazy(() => DatasetFeatureWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DatasetFeatureWhereUniqueInputSchema),z.lazy(() => DatasetFeatureWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DatasetFeatureWhereUniqueInputSchema),z.lazy(() => DatasetFeatureWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DatasetFeatureWhereUniqueInputSchema),z.lazy(() => DatasetFeatureWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DatasetFeatureUpdateWithWhereUniqueWithoutDatasetInputSchema),z.lazy(() => DatasetFeatureUpdateWithWhereUniqueWithoutDatasetInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DatasetFeatureUpdateManyWithWhereWithoutDatasetInputSchema),z.lazy(() => DatasetFeatureUpdateManyWithWhereWithoutDatasetInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DatasetFeatureScalarWhereInputSchema),z.lazy(() => DatasetFeatureScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.DatasetFeatureUpdateManyWithoutDatasetNestedInput>;

export const OrderUpdateOneWithoutDatasetNestedInputSchema: z.ZodType<Prisma.OrderUpdateOneWithoutDatasetNestedInput> = z.object({
  create: z.union([ z.lazy(() => OrderCreateWithoutDatasetInputSchema),z.lazy(() => OrderUncheckedCreateWithoutDatasetInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => OrderCreateOrConnectWithoutDatasetInputSchema).optional(),
  upsert: z.lazy(() => OrderUpsertWithoutDatasetInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => OrderWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => OrderWhereInputSchema) ]).optional(),
  connect: z.lazy(() => OrderWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => OrderUpdateToOneWithWhereWithoutDatasetInputSchema),z.lazy(() => OrderUpdateWithoutDatasetInputSchema),z.lazy(() => OrderUncheckedUpdateWithoutDatasetInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.OrderUpdateOneWithoutDatasetNestedInput>;

export const TaskUpdateOneWithoutDatasetNestedInputSchema: z.ZodType<Prisma.TaskUpdateOneWithoutDatasetNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutDatasetInputSchema),z.lazy(() => TaskUncheckedCreateWithoutDatasetInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TaskCreateOrConnectWithoutDatasetInputSchema).optional(),
  upsert: z.lazy(() => TaskUpsertWithoutDatasetInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => TaskWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => TaskWhereInputSchema) ]).optional(),
  connect: z.lazy(() => TaskWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TaskUpdateToOneWithWhereWithoutDatasetInputSchema),z.lazy(() => TaskUpdateWithoutDatasetInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutDatasetInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.TaskUpdateOneWithoutDatasetNestedInput>;

export const DatasetFeatureUncheckedUpdateManyWithoutDatasetNestedInputSchema: z.ZodType<Prisma.DatasetFeatureUncheckedUpdateManyWithoutDatasetNestedInput> = z.object({
  create: z.union([ z.lazy(() => DatasetFeatureCreateWithoutDatasetInputSchema),z.lazy(() => DatasetFeatureCreateWithoutDatasetInputSchema).array(),z.lazy(() => DatasetFeatureUncheckedCreateWithoutDatasetInputSchema),z.lazy(() => DatasetFeatureUncheckedCreateWithoutDatasetInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DatasetFeatureCreateOrConnectWithoutDatasetInputSchema),z.lazy(() => DatasetFeatureCreateOrConnectWithoutDatasetInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DatasetFeatureUpsertWithWhereUniqueWithoutDatasetInputSchema),z.lazy(() => DatasetFeatureUpsertWithWhereUniqueWithoutDatasetInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DatasetFeatureCreateManyDatasetInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DatasetFeatureWhereUniqueInputSchema),z.lazy(() => DatasetFeatureWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DatasetFeatureWhereUniqueInputSchema),z.lazy(() => DatasetFeatureWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DatasetFeatureWhereUniqueInputSchema),z.lazy(() => DatasetFeatureWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DatasetFeatureWhereUniqueInputSchema),z.lazy(() => DatasetFeatureWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DatasetFeatureUpdateWithWhereUniqueWithoutDatasetInputSchema),z.lazy(() => DatasetFeatureUpdateWithWhereUniqueWithoutDatasetInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DatasetFeatureUpdateManyWithWhereWithoutDatasetInputSchema),z.lazy(() => DatasetFeatureUpdateManyWithWhereWithoutDatasetInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DatasetFeatureScalarWhereInputSchema),z.lazy(() => DatasetFeatureScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.DatasetFeatureUncheckedUpdateManyWithoutDatasetNestedInput>;

export const OrderUncheckedUpdateOneWithoutDatasetNestedInputSchema: z.ZodType<Prisma.OrderUncheckedUpdateOneWithoutDatasetNestedInput> = z.object({
  create: z.union([ z.lazy(() => OrderCreateWithoutDatasetInputSchema),z.lazy(() => OrderUncheckedCreateWithoutDatasetInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => OrderCreateOrConnectWithoutDatasetInputSchema).optional(),
  upsert: z.lazy(() => OrderUpsertWithoutDatasetInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => OrderWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => OrderWhereInputSchema) ]).optional(),
  connect: z.lazy(() => OrderWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => OrderUpdateToOneWithWhereWithoutDatasetInputSchema),z.lazy(() => OrderUpdateWithoutDatasetInputSchema),z.lazy(() => OrderUncheckedUpdateWithoutDatasetInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.OrderUncheckedUpdateOneWithoutDatasetNestedInput>;

export const TaskUncheckedUpdateOneWithoutDatasetNestedInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateOneWithoutDatasetNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutDatasetInputSchema),z.lazy(() => TaskUncheckedCreateWithoutDatasetInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TaskCreateOrConnectWithoutDatasetInputSchema).optional(),
  upsert: z.lazy(() => TaskUpsertWithoutDatasetInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => TaskWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => TaskWhereInputSchema) ]).optional(),
  connect: z.lazy(() => TaskWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TaskUpdateToOneWithWhereWithoutDatasetInputSchema),z.lazy(() => TaskUpdateWithoutDatasetInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutDatasetInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.TaskUncheckedUpdateOneWithoutDatasetNestedInput>;

export const DatasetCreateNestedOneWithoutFeaturesInputSchema: z.ZodType<Prisma.DatasetCreateNestedOneWithoutFeaturesInput> = z.object({
  create: z.union([ z.lazy(() => DatasetCreateWithoutFeaturesInputSchema),z.lazy(() => DatasetUncheckedCreateWithoutFeaturesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DatasetCreateOrConnectWithoutFeaturesInputSchema).optional(),
  connect: z.lazy(() => DatasetWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.DatasetCreateNestedOneWithoutFeaturesInput>;

export const DatasetFeatureExampleCreateNestedManyWithoutFeatureInputSchema: z.ZodType<Prisma.DatasetFeatureExampleCreateNestedManyWithoutFeatureInput> = z.object({
  create: z.union([ z.lazy(() => DatasetFeatureExampleCreateWithoutFeatureInputSchema),z.lazy(() => DatasetFeatureExampleCreateWithoutFeatureInputSchema).array(),z.lazy(() => DatasetFeatureExampleUncheckedCreateWithoutFeatureInputSchema),z.lazy(() => DatasetFeatureExampleUncheckedCreateWithoutFeatureInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DatasetFeatureExampleCreateOrConnectWithoutFeatureInputSchema),z.lazy(() => DatasetFeatureExampleCreateOrConnectWithoutFeatureInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DatasetFeatureExampleCreateManyFeatureInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DatasetFeatureExampleWhereUniqueInputSchema),z.lazy(() => DatasetFeatureExampleWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.DatasetFeatureExampleCreateNestedManyWithoutFeatureInput>;

export const DatasetFeatureExampleUncheckedCreateNestedManyWithoutFeatureInputSchema: z.ZodType<Prisma.DatasetFeatureExampleUncheckedCreateNestedManyWithoutFeatureInput> = z.object({
  create: z.union([ z.lazy(() => DatasetFeatureExampleCreateWithoutFeatureInputSchema),z.lazy(() => DatasetFeatureExampleCreateWithoutFeatureInputSchema).array(),z.lazy(() => DatasetFeatureExampleUncheckedCreateWithoutFeatureInputSchema),z.lazy(() => DatasetFeatureExampleUncheckedCreateWithoutFeatureInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DatasetFeatureExampleCreateOrConnectWithoutFeatureInputSchema),z.lazy(() => DatasetFeatureExampleCreateOrConnectWithoutFeatureInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DatasetFeatureExampleCreateManyFeatureInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DatasetFeatureExampleWhereUniqueInputSchema),z.lazy(() => DatasetFeatureExampleWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.DatasetFeatureExampleUncheckedCreateNestedManyWithoutFeatureInput>;

export const DatasetUpdateOneRequiredWithoutFeaturesNestedInputSchema: z.ZodType<Prisma.DatasetUpdateOneRequiredWithoutFeaturesNestedInput> = z.object({
  create: z.union([ z.lazy(() => DatasetCreateWithoutFeaturesInputSchema),z.lazy(() => DatasetUncheckedCreateWithoutFeaturesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DatasetCreateOrConnectWithoutFeaturesInputSchema).optional(),
  upsert: z.lazy(() => DatasetUpsertWithoutFeaturesInputSchema).optional(),
  connect: z.lazy(() => DatasetWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => DatasetUpdateToOneWithWhereWithoutFeaturesInputSchema),z.lazy(() => DatasetUpdateWithoutFeaturesInputSchema),z.lazy(() => DatasetUncheckedUpdateWithoutFeaturesInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.DatasetUpdateOneRequiredWithoutFeaturesNestedInput>;

export const DatasetFeatureExampleUpdateManyWithoutFeatureNestedInputSchema: z.ZodType<Prisma.DatasetFeatureExampleUpdateManyWithoutFeatureNestedInput> = z.object({
  create: z.union([ z.lazy(() => DatasetFeatureExampleCreateWithoutFeatureInputSchema),z.lazy(() => DatasetFeatureExampleCreateWithoutFeatureInputSchema).array(),z.lazy(() => DatasetFeatureExampleUncheckedCreateWithoutFeatureInputSchema),z.lazy(() => DatasetFeatureExampleUncheckedCreateWithoutFeatureInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DatasetFeatureExampleCreateOrConnectWithoutFeatureInputSchema),z.lazy(() => DatasetFeatureExampleCreateOrConnectWithoutFeatureInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DatasetFeatureExampleUpsertWithWhereUniqueWithoutFeatureInputSchema),z.lazy(() => DatasetFeatureExampleUpsertWithWhereUniqueWithoutFeatureInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DatasetFeatureExampleCreateManyFeatureInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DatasetFeatureExampleWhereUniqueInputSchema),z.lazy(() => DatasetFeatureExampleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DatasetFeatureExampleWhereUniqueInputSchema),z.lazy(() => DatasetFeatureExampleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DatasetFeatureExampleWhereUniqueInputSchema),z.lazy(() => DatasetFeatureExampleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DatasetFeatureExampleWhereUniqueInputSchema),z.lazy(() => DatasetFeatureExampleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DatasetFeatureExampleUpdateWithWhereUniqueWithoutFeatureInputSchema),z.lazy(() => DatasetFeatureExampleUpdateWithWhereUniqueWithoutFeatureInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DatasetFeatureExampleUpdateManyWithWhereWithoutFeatureInputSchema),z.lazy(() => DatasetFeatureExampleUpdateManyWithWhereWithoutFeatureInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DatasetFeatureExampleScalarWhereInputSchema),z.lazy(() => DatasetFeatureExampleScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.DatasetFeatureExampleUpdateManyWithoutFeatureNestedInput>;

export const DatasetFeatureExampleUncheckedUpdateManyWithoutFeatureNestedInputSchema: z.ZodType<Prisma.DatasetFeatureExampleUncheckedUpdateManyWithoutFeatureNestedInput> = z.object({
  create: z.union([ z.lazy(() => DatasetFeatureExampleCreateWithoutFeatureInputSchema),z.lazy(() => DatasetFeatureExampleCreateWithoutFeatureInputSchema).array(),z.lazy(() => DatasetFeatureExampleUncheckedCreateWithoutFeatureInputSchema),z.lazy(() => DatasetFeatureExampleUncheckedCreateWithoutFeatureInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DatasetFeatureExampleCreateOrConnectWithoutFeatureInputSchema),z.lazy(() => DatasetFeatureExampleCreateOrConnectWithoutFeatureInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DatasetFeatureExampleUpsertWithWhereUniqueWithoutFeatureInputSchema),z.lazy(() => DatasetFeatureExampleUpsertWithWhereUniqueWithoutFeatureInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DatasetFeatureExampleCreateManyFeatureInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DatasetFeatureExampleWhereUniqueInputSchema),z.lazy(() => DatasetFeatureExampleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DatasetFeatureExampleWhereUniqueInputSchema),z.lazy(() => DatasetFeatureExampleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DatasetFeatureExampleWhereUniqueInputSchema),z.lazy(() => DatasetFeatureExampleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DatasetFeatureExampleWhereUniqueInputSchema),z.lazy(() => DatasetFeatureExampleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DatasetFeatureExampleUpdateWithWhereUniqueWithoutFeatureInputSchema),z.lazy(() => DatasetFeatureExampleUpdateWithWhereUniqueWithoutFeatureInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DatasetFeatureExampleUpdateManyWithWhereWithoutFeatureInputSchema),z.lazy(() => DatasetFeatureExampleUpdateManyWithWhereWithoutFeatureInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DatasetFeatureExampleScalarWhereInputSchema),z.lazy(() => DatasetFeatureExampleScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.DatasetFeatureExampleUncheckedUpdateManyWithoutFeatureNestedInput>;

export const DatasetFeatureCreateNestedOneWithoutExamplesInputSchema: z.ZodType<Prisma.DatasetFeatureCreateNestedOneWithoutExamplesInput> = z.object({
  create: z.union([ z.lazy(() => DatasetFeatureCreateWithoutExamplesInputSchema),z.lazy(() => DatasetFeatureUncheckedCreateWithoutExamplesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DatasetFeatureCreateOrConnectWithoutExamplesInputSchema).optional(),
  connect: z.lazy(() => DatasetFeatureWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.DatasetFeatureCreateNestedOneWithoutExamplesInput>;

export const DatasetFeatureUpdateOneRequiredWithoutExamplesNestedInputSchema: z.ZodType<Prisma.DatasetFeatureUpdateOneRequiredWithoutExamplesNestedInput> = z.object({
  create: z.union([ z.lazy(() => DatasetFeatureCreateWithoutExamplesInputSchema),z.lazy(() => DatasetFeatureUncheckedCreateWithoutExamplesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DatasetFeatureCreateOrConnectWithoutExamplesInputSchema).optional(),
  upsert: z.lazy(() => DatasetFeatureUpsertWithoutExamplesInputSchema).optional(),
  connect: z.lazy(() => DatasetFeatureWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => DatasetFeatureUpdateToOneWithWhereWithoutExamplesInputSchema),z.lazy(() => DatasetFeatureUpdateWithoutExamplesInputSchema),z.lazy(() => DatasetFeatureUncheckedUpdateWithoutExamplesInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.DatasetFeatureUpdateOneRequiredWithoutExamplesNestedInput>;

export const DatasetCreateNestedOneWithoutTaskInputSchema: z.ZodType<Prisma.DatasetCreateNestedOneWithoutTaskInput> = z.object({
  create: z.union([ z.lazy(() => DatasetCreateWithoutTaskInputSchema),z.lazy(() => DatasetUncheckedCreateWithoutTaskInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DatasetCreateOrConnectWithoutTaskInputSchema).optional(),
  connect: z.lazy(() => DatasetWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.DatasetCreateNestedOneWithoutTaskInput>;

export const EnumTaskTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumTaskTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => TaskTypeSchema).optional()
}).strict() as z.ZodType<Prisma.EnumTaskTypeFieldUpdateOperationsInput>;

export const DatasetUpdateOneRequiredWithoutTaskNestedInputSchema: z.ZodType<Prisma.DatasetUpdateOneRequiredWithoutTaskNestedInput> = z.object({
  create: z.union([ z.lazy(() => DatasetCreateWithoutTaskInputSchema),z.lazy(() => DatasetUncheckedCreateWithoutTaskInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DatasetCreateOrConnectWithoutTaskInputSchema).optional(),
  upsert: z.lazy(() => DatasetUpsertWithoutTaskInputSchema).optional(),
  connect: z.lazy(() => DatasetWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => DatasetUpdateToOneWithWhereWithoutTaskInputSchema),z.lazy(() => DatasetUpdateWithoutTaskInputSchema),z.lazy(() => DatasetUncheckedUpdateWithoutTaskInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.DatasetUpdateOneRequiredWithoutTaskNestedInput>;

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.NestedStringFilter>;

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.NestedDateTimeFilter>;

export const NestedDecimalFilterSchema: z.ZodType<Prisma.NestedDecimalFilter> = z.object({
  equals: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  in: z.union([z.number().array(),z.string().array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  notIn: z.union([z.number().array(),z.string().array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  lt: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NestedDecimalFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.NestedDecimalFilter>;

export const NestedEnumLabelingLanguageFilterSchema: z.ZodType<Prisma.NestedEnumLabelingLanguageFilter> = z.object({
  equals: z.lazy(() => LabelingLanguageSchema).optional(),
  in: z.lazy(() => LabelingLanguageSchema).array().optional(),
  notIn: z.lazy(() => LabelingLanguageSchema).array().optional(),
  not: z.union([ z.lazy(() => LabelingLanguageSchema),z.lazy(() => NestedEnumLabelingLanguageFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.NestedEnumLabelingLanguageFilter>;

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict() as z.ZodType<Prisma.NestedStringWithAggregatesFilter>;

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.NestedIntFilter>;

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict() as z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter>;

export const NestedDecimalWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDecimalWithAggregatesFilter> = z.object({
  equals: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  in: z.union([z.number().array(),z.string().array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  notIn: z.union([z.number().array(),z.string().array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  lt: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NestedDecimalWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _sum: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _min: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _max: z.lazy(() => NestedDecimalFilterSchema).optional()
}).strict() as z.ZodType<Prisma.NestedDecimalWithAggregatesFilter>;

export const NestedEnumLabelingLanguageWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumLabelingLanguageWithAggregatesFilter> = z.object({
  equals: z.lazy(() => LabelingLanguageSchema).optional(),
  in: z.lazy(() => LabelingLanguageSchema).array().optional(),
  notIn: z.lazy(() => LabelingLanguageSchema).array().optional(),
  not: z.union([ z.lazy(() => LabelingLanguageSchema),z.lazy(() => NestedEnumLabelingLanguageWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumLabelingLanguageFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumLabelingLanguageFilterSchema).optional()
}).strict() as z.ZodType<Prisma.NestedEnumLabelingLanguageWithAggregatesFilter>;

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict() as z.ZodType<Prisma.NestedIntWithAggregatesFilter>;

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.NestedFloatFilter>;

export const NestedEnumTaskTypeFilterSchema: z.ZodType<Prisma.NestedEnumTaskTypeFilter> = z.object({
  equals: z.lazy(() => TaskTypeSchema).optional(),
  in: z.lazy(() => TaskTypeSchema).array().optional(),
  notIn: z.lazy(() => TaskTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => TaskTypeSchema),z.lazy(() => NestedEnumTaskTypeFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.NestedEnumTaskTypeFilter>;

export const NestedEnumTaskTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumTaskTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => TaskTypeSchema).optional(),
  in: z.lazy(() => TaskTypeSchema).array().optional(),
  notIn: z.lazy(() => TaskTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => TaskTypeSchema),z.lazy(() => NestedEnumTaskTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumTaskTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumTaskTypeFilterSchema).optional()
}).strict() as z.ZodType<Prisma.NestedEnumTaskTypeWithAggregatesFilter>;

export const DatasetCreateWithoutOrderInputSchema: z.ZodType<Prisma.DatasetCreateWithoutOrderInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  minSamplesCount: z.number().int(),
  features: z.lazy(() => DatasetFeatureCreateNestedManyWithoutDatasetInputSchema).optional(),
  Task: z.lazy(() => TaskCreateNestedOneWithoutDatasetInputSchema).optional()
}).strict() as z.ZodType<Prisma.DatasetCreateWithoutOrderInput>;

export const DatasetUncheckedCreateWithoutOrderInputSchema: z.ZodType<Prisma.DatasetUncheckedCreateWithoutOrderInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  minSamplesCount: z.number().int(),
  features: z.lazy(() => DatasetFeatureUncheckedCreateNestedManyWithoutDatasetInputSchema).optional(),
  Task: z.lazy(() => TaskUncheckedCreateNestedOneWithoutDatasetInputSchema).optional()
}).strict() as z.ZodType<Prisma.DatasetUncheckedCreateWithoutOrderInput>;

export const DatasetCreateOrConnectWithoutOrderInputSchema: z.ZodType<Prisma.DatasetCreateOrConnectWithoutOrderInput> = z.object({
  where: z.lazy(() => DatasetWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DatasetCreateWithoutOrderInputSchema),z.lazy(() => DatasetUncheckedCreateWithoutOrderInputSchema) ]),
}).strict() as z.ZodType<Prisma.DatasetCreateOrConnectWithoutOrderInput>;

export const DatasetUpsertWithoutOrderInputSchema: z.ZodType<Prisma.DatasetUpsertWithoutOrderInput> = z.object({
  update: z.union([ z.lazy(() => DatasetUpdateWithoutOrderInputSchema),z.lazy(() => DatasetUncheckedUpdateWithoutOrderInputSchema) ]),
  create: z.union([ z.lazy(() => DatasetCreateWithoutOrderInputSchema),z.lazy(() => DatasetUncheckedCreateWithoutOrderInputSchema) ]),
  where: z.lazy(() => DatasetWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.DatasetUpsertWithoutOrderInput>;

export const DatasetUpdateToOneWithWhereWithoutOrderInputSchema: z.ZodType<Prisma.DatasetUpdateToOneWithWhereWithoutOrderInput> = z.object({
  where: z.lazy(() => DatasetWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => DatasetUpdateWithoutOrderInputSchema),z.lazy(() => DatasetUncheckedUpdateWithoutOrderInputSchema) ]),
}).strict() as z.ZodType<Prisma.DatasetUpdateToOneWithWhereWithoutOrderInput>;

export const DatasetUpdateWithoutOrderInputSchema: z.ZodType<Prisma.DatasetUpdateWithoutOrderInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  minSamplesCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  features: z.lazy(() => DatasetFeatureUpdateManyWithoutDatasetNestedInputSchema).optional(),
  Task: z.lazy(() => TaskUpdateOneWithoutDatasetNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.DatasetUpdateWithoutOrderInput>;

export const DatasetUncheckedUpdateWithoutOrderInputSchema: z.ZodType<Prisma.DatasetUncheckedUpdateWithoutOrderInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  minSamplesCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  features: z.lazy(() => DatasetFeatureUncheckedUpdateManyWithoutDatasetNestedInputSchema).optional(),
  Task: z.lazy(() => TaskUncheckedUpdateOneWithoutDatasetNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.DatasetUncheckedUpdateWithoutOrderInput>;

export const DatasetFeatureCreateWithoutDatasetInputSchema: z.ZodType<Prisma.DatasetFeatureCreateWithoutDatasetInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  imageGuidelines: z.string(),
  labelGuidelines: z.string(),
  type: z.string(),
  examples: z.lazy(() => DatasetFeatureExampleCreateNestedManyWithoutFeatureInputSchema).optional()
}).strict() as z.ZodType<Prisma.DatasetFeatureCreateWithoutDatasetInput>;

export const DatasetFeatureUncheckedCreateWithoutDatasetInputSchema: z.ZodType<Prisma.DatasetFeatureUncheckedCreateWithoutDatasetInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  imageGuidelines: z.string(),
  labelGuidelines: z.string(),
  type: z.string(),
  examples: z.lazy(() => DatasetFeatureExampleUncheckedCreateNestedManyWithoutFeatureInputSchema).optional()
}).strict() as z.ZodType<Prisma.DatasetFeatureUncheckedCreateWithoutDatasetInput>;

export const DatasetFeatureCreateOrConnectWithoutDatasetInputSchema: z.ZodType<Prisma.DatasetFeatureCreateOrConnectWithoutDatasetInput> = z.object({
  where: z.lazy(() => DatasetFeatureWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DatasetFeatureCreateWithoutDatasetInputSchema),z.lazy(() => DatasetFeatureUncheckedCreateWithoutDatasetInputSchema) ]),
}).strict() as z.ZodType<Prisma.DatasetFeatureCreateOrConnectWithoutDatasetInput>;

export const DatasetFeatureCreateManyDatasetInputEnvelopeSchema: z.ZodType<Prisma.DatasetFeatureCreateManyDatasetInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => DatasetFeatureCreateManyDatasetInputSchema),z.lazy(() => DatasetFeatureCreateManyDatasetInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.DatasetFeatureCreateManyDatasetInputEnvelope>;

export const OrderCreateWithoutDatasetInputSchema: z.ZodType<Prisma.OrderCreateWithoutDatasetInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  budget: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  labelingLanguage: z.lazy(() => LabelingLanguageSchema)
}).strict() as z.ZodType<Prisma.OrderCreateWithoutDatasetInput>;

export const OrderUncheckedCreateWithoutDatasetInputSchema: z.ZodType<Prisma.OrderUncheckedCreateWithoutDatasetInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  budget: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  labelingLanguage: z.lazy(() => LabelingLanguageSchema)
}).strict() as z.ZodType<Prisma.OrderUncheckedCreateWithoutDatasetInput>;

export const OrderCreateOrConnectWithoutDatasetInputSchema: z.ZodType<Prisma.OrderCreateOrConnectWithoutDatasetInput> = z.object({
  where: z.lazy(() => OrderWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => OrderCreateWithoutDatasetInputSchema),z.lazy(() => OrderUncheckedCreateWithoutDatasetInputSchema) ]),
}).strict() as z.ZodType<Prisma.OrderCreateOrConnectWithoutDatasetInput>;

export const TaskCreateWithoutDatasetInputSchema: z.ZodType<Prisma.TaskCreateWithoutDatasetInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.lazy(() => TaskTypeSchema),
  endDate: z.coerce.date()
}).strict() as z.ZodType<Prisma.TaskCreateWithoutDatasetInput>;

export const TaskUncheckedCreateWithoutDatasetInputSchema: z.ZodType<Prisma.TaskUncheckedCreateWithoutDatasetInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.lazy(() => TaskTypeSchema),
  endDate: z.coerce.date()
}).strict() as z.ZodType<Prisma.TaskUncheckedCreateWithoutDatasetInput>;

export const TaskCreateOrConnectWithoutDatasetInputSchema: z.ZodType<Prisma.TaskCreateOrConnectWithoutDatasetInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TaskCreateWithoutDatasetInputSchema),z.lazy(() => TaskUncheckedCreateWithoutDatasetInputSchema) ]),
}).strict() as z.ZodType<Prisma.TaskCreateOrConnectWithoutDatasetInput>;

export const DatasetFeatureUpsertWithWhereUniqueWithoutDatasetInputSchema: z.ZodType<Prisma.DatasetFeatureUpsertWithWhereUniqueWithoutDatasetInput> = z.object({
  where: z.lazy(() => DatasetFeatureWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => DatasetFeatureUpdateWithoutDatasetInputSchema),z.lazy(() => DatasetFeatureUncheckedUpdateWithoutDatasetInputSchema) ]),
  create: z.union([ z.lazy(() => DatasetFeatureCreateWithoutDatasetInputSchema),z.lazy(() => DatasetFeatureUncheckedCreateWithoutDatasetInputSchema) ]),
}).strict() as z.ZodType<Prisma.DatasetFeatureUpsertWithWhereUniqueWithoutDatasetInput>;

export const DatasetFeatureUpdateWithWhereUniqueWithoutDatasetInputSchema: z.ZodType<Prisma.DatasetFeatureUpdateWithWhereUniqueWithoutDatasetInput> = z.object({
  where: z.lazy(() => DatasetFeatureWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => DatasetFeatureUpdateWithoutDatasetInputSchema),z.lazy(() => DatasetFeatureUncheckedUpdateWithoutDatasetInputSchema) ]),
}).strict() as z.ZodType<Prisma.DatasetFeatureUpdateWithWhereUniqueWithoutDatasetInput>;

export const DatasetFeatureUpdateManyWithWhereWithoutDatasetInputSchema: z.ZodType<Prisma.DatasetFeatureUpdateManyWithWhereWithoutDatasetInput> = z.object({
  where: z.lazy(() => DatasetFeatureScalarWhereInputSchema),
  data: z.union([ z.lazy(() => DatasetFeatureUpdateManyMutationInputSchema),z.lazy(() => DatasetFeatureUncheckedUpdateManyWithoutDatasetInputSchema) ]),
}).strict() as z.ZodType<Prisma.DatasetFeatureUpdateManyWithWhereWithoutDatasetInput>;

export const DatasetFeatureScalarWhereInputSchema: z.ZodType<Prisma.DatasetFeatureScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DatasetFeatureScalarWhereInputSchema),z.lazy(() => DatasetFeatureScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DatasetFeatureScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DatasetFeatureScalarWhereInputSchema),z.lazy(() => DatasetFeatureScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  imageGuidelines: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  labelGuidelines: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  datasetId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict() as z.ZodType<Prisma.DatasetFeatureScalarWhereInput>;

export const OrderUpsertWithoutDatasetInputSchema: z.ZodType<Prisma.OrderUpsertWithoutDatasetInput> = z.object({
  update: z.union([ z.lazy(() => OrderUpdateWithoutDatasetInputSchema),z.lazy(() => OrderUncheckedUpdateWithoutDatasetInputSchema) ]),
  create: z.union([ z.lazy(() => OrderCreateWithoutDatasetInputSchema),z.lazy(() => OrderUncheckedCreateWithoutDatasetInputSchema) ]),
  where: z.lazy(() => OrderWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.OrderUpsertWithoutDatasetInput>;

export const OrderUpdateToOneWithWhereWithoutDatasetInputSchema: z.ZodType<Prisma.OrderUpdateToOneWithWhereWithoutDatasetInput> = z.object({
  where: z.lazy(() => OrderWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => OrderUpdateWithoutDatasetInputSchema),z.lazy(() => OrderUncheckedUpdateWithoutDatasetInputSchema) ]),
}).strict() as z.ZodType<Prisma.OrderUpdateToOneWithWhereWithoutDatasetInput>;

export const OrderUpdateWithoutDatasetInputSchema: z.ZodType<Prisma.OrderUpdateWithoutDatasetInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  budget: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  labelingLanguage: z.union([ z.lazy(() => LabelingLanguageSchema),z.lazy(() => EnumLabelingLanguageFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.OrderUpdateWithoutDatasetInput>;

export const OrderUncheckedUpdateWithoutDatasetInputSchema: z.ZodType<Prisma.OrderUncheckedUpdateWithoutDatasetInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  budget: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  labelingLanguage: z.union([ z.lazy(() => LabelingLanguageSchema),z.lazy(() => EnumLabelingLanguageFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.OrderUncheckedUpdateWithoutDatasetInput>;

export const TaskUpsertWithoutDatasetInputSchema: z.ZodType<Prisma.TaskUpsertWithoutDatasetInput> = z.object({
  update: z.union([ z.lazy(() => TaskUpdateWithoutDatasetInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutDatasetInputSchema) ]),
  create: z.union([ z.lazy(() => TaskCreateWithoutDatasetInputSchema),z.lazy(() => TaskUncheckedCreateWithoutDatasetInputSchema) ]),
  where: z.lazy(() => TaskWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.TaskUpsertWithoutDatasetInput>;

export const TaskUpdateToOneWithWhereWithoutDatasetInputSchema: z.ZodType<Prisma.TaskUpdateToOneWithWhereWithoutDatasetInput> = z.object({
  where: z.lazy(() => TaskWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TaskUpdateWithoutDatasetInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutDatasetInputSchema) ]),
}).strict() as z.ZodType<Prisma.TaskUpdateToOneWithWhereWithoutDatasetInput>;

export const TaskUpdateWithoutDatasetInputSchema: z.ZodType<Prisma.TaskUpdateWithoutDatasetInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TaskTypeSchema),z.lazy(() => EnumTaskTypeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.TaskUpdateWithoutDatasetInput>;

export const TaskUncheckedUpdateWithoutDatasetInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateWithoutDatasetInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TaskTypeSchema),z.lazy(() => EnumTaskTypeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.TaskUncheckedUpdateWithoutDatasetInput>;

export const DatasetCreateWithoutFeaturesInputSchema: z.ZodType<Prisma.DatasetCreateWithoutFeaturesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  minSamplesCount: z.number().int(),
  Order: z.lazy(() => OrderCreateNestedOneWithoutDatasetInputSchema).optional(),
  Task: z.lazy(() => TaskCreateNestedOneWithoutDatasetInputSchema).optional()
}).strict() as z.ZodType<Prisma.DatasetCreateWithoutFeaturesInput>;

export const DatasetUncheckedCreateWithoutFeaturesInputSchema: z.ZodType<Prisma.DatasetUncheckedCreateWithoutFeaturesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  minSamplesCount: z.number().int(),
  Order: z.lazy(() => OrderUncheckedCreateNestedOneWithoutDatasetInputSchema).optional(),
  Task: z.lazy(() => TaskUncheckedCreateNestedOneWithoutDatasetInputSchema).optional()
}).strict() as z.ZodType<Prisma.DatasetUncheckedCreateWithoutFeaturesInput>;

export const DatasetCreateOrConnectWithoutFeaturesInputSchema: z.ZodType<Prisma.DatasetCreateOrConnectWithoutFeaturesInput> = z.object({
  where: z.lazy(() => DatasetWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DatasetCreateWithoutFeaturesInputSchema),z.lazy(() => DatasetUncheckedCreateWithoutFeaturesInputSchema) ]),
}).strict() as z.ZodType<Prisma.DatasetCreateOrConnectWithoutFeaturesInput>;

export const DatasetFeatureExampleCreateWithoutFeatureInputSchema: z.ZodType<Prisma.DatasetFeatureExampleCreateWithoutFeatureInput> = z.object({
  id: z.string().cuid().optional(),
  imageUrl: z.string(),
  label: z.string()
}).strict() as z.ZodType<Prisma.DatasetFeatureExampleCreateWithoutFeatureInput>;

export const DatasetFeatureExampleUncheckedCreateWithoutFeatureInputSchema: z.ZodType<Prisma.DatasetFeatureExampleUncheckedCreateWithoutFeatureInput> = z.object({
  id: z.string().cuid().optional(),
  imageUrl: z.string(),
  label: z.string()
}).strict() as z.ZodType<Prisma.DatasetFeatureExampleUncheckedCreateWithoutFeatureInput>;

export const DatasetFeatureExampleCreateOrConnectWithoutFeatureInputSchema: z.ZodType<Prisma.DatasetFeatureExampleCreateOrConnectWithoutFeatureInput> = z.object({
  where: z.lazy(() => DatasetFeatureExampleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DatasetFeatureExampleCreateWithoutFeatureInputSchema),z.lazy(() => DatasetFeatureExampleUncheckedCreateWithoutFeatureInputSchema) ]),
}).strict() as z.ZodType<Prisma.DatasetFeatureExampleCreateOrConnectWithoutFeatureInput>;

export const DatasetFeatureExampleCreateManyFeatureInputEnvelopeSchema: z.ZodType<Prisma.DatasetFeatureExampleCreateManyFeatureInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => DatasetFeatureExampleCreateManyFeatureInputSchema),z.lazy(() => DatasetFeatureExampleCreateManyFeatureInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.DatasetFeatureExampleCreateManyFeatureInputEnvelope>;

export const DatasetUpsertWithoutFeaturesInputSchema: z.ZodType<Prisma.DatasetUpsertWithoutFeaturesInput> = z.object({
  update: z.union([ z.lazy(() => DatasetUpdateWithoutFeaturesInputSchema),z.lazy(() => DatasetUncheckedUpdateWithoutFeaturesInputSchema) ]),
  create: z.union([ z.lazy(() => DatasetCreateWithoutFeaturesInputSchema),z.lazy(() => DatasetUncheckedCreateWithoutFeaturesInputSchema) ]),
  where: z.lazy(() => DatasetWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.DatasetUpsertWithoutFeaturesInput>;

export const DatasetUpdateToOneWithWhereWithoutFeaturesInputSchema: z.ZodType<Prisma.DatasetUpdateToOneWithWhereWithoutFeaturesInput> = z.object({
  where: z.lazy(() => DatasetWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => DatasetUpdateWithoutFeaturesInputSchema),z.lazy(() => DatasetUncheckedUpdateWithoutFeaturesInputSchema) ]),
}).strict() as z.ZodType<Prisma.DatasetUpdateToOneWithWhereWithoutFeaturesInput>;

export const DatasetUpdateWithoutFeaturesInputSchema: z.ZodType<Prisma.DatasetUpdateWithoutFeaturesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  minSamplesCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Order: z.lazy(() => OrderUpdateOneWithoutDatasetNestedInputSchema).optional(),
  Task: z.lazy(() => TaskUpdateOneWithoutDatasetNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.DatasetUpdateWithoutFeaturesInput>;

export const DatasetUncheckedUpdateWithoutFeaturesInputSchema: z.ZodType<Prisma.DatasetUncheckedUpdateWithoutFeaturesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  minSamplesCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Order: z.lazy(() => OrderUncheckedUpdateOneWithoutDatasetNestedInputSchema).optional(),
  Task: z.lazy(() => TaskUncheckedUpdateOneWithoutDatasetNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.DatasetUncheckedUpdateWithoutFeaturesInput>;

export const DatasetFeatureExampleUpsertWithWhereUniqueWithoutFeatureInputSchema: z.ZodType<Prisma.DatasetFeatureExampleUpsertWithWhereUniqueWithoutFeatureInput> = z.object({
  where: z.lazy(() => DatasetFeatureExampleWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => DatasetFeatureExampleUpdateWithoutFeatureInputSchema),z.lazy(() => DatasetFeatureExampleUncheckedUpdateWithoutFeatureInputSchema) ]),
  create: z.union([ z.lazy(() => DatasetFeatureExampleCreateWithoutFeatureInputSchema),z.lazy(() => DatasetFeatureExampleUncheckedCreateWithoutFeatureInputSchema) ]),
}).strict() as z.ZodType<Prisma.DatasetFeatureExampleUpsertWithWhereUniqueWithoutFeatureInput>;

export const DatasetFeatureExampleUpdateWithWhereUniqueWithoutFeatureInputSchema: z.ZodType<Prisma.DatasetFeatureExampleUpdateWithWhereUniqueWithoutFeatureInput> = z.object({
  where: z.lazy(() => DatasetFeatureExampleWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => DatasetFeatureExampleUpdateWithoutFeatureInputSchema),z.lazy(() => DatasetFeatureExampleUncheckedUpdateWithoutFeatureInputSchema) ]),
}).strict() as z.ZodType<Prisma.DatasetFeatureExampleUpdateWithWhereUniqueWithoutFeatureInput>;

export const DatasetFeatureExampleUpdateManyWithWhereWithoutFeatureInputSchema: z.ZodType<Prisma.DatasetFeatureExampleUpdateManyWithWhereWithoutFeatureInput> = z.object({
  where: z.lazy(() => DatasetFeatureExampleScalarWhereInputSchema),
  data: z.union([ z.lazy(() => DatasetFeatureExampleUpdateManyMutationInputSchema),z.lazy(() => DatasetFeatureExampleUncheckedUpdateManyWithoutFeatureInputSchema) ]),
}).strict() as z.ZodType<Prisma.DatasetFeatureExampleUpdateManyWithWhereWithoutFeatureInput>;

export const DatasetFeatureExampleScalarWhereInputSchema: z.ZodType<Prisma.DatasetFeatureExampleScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DatasetFeatureExampleScalarWhereInputSchema),z.lazy(() => DatasetFeatureExampleScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DatasetFeatureExampleScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DatasetFeatureExampleScalarWhereInputSchema),z.lazy(() => DatasetFeatureExampleScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  imageUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  label: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  featureId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict() as z.ZodType<Prisma.DatasetFeatureExampleScalarWhereInput>;

export const DatasetFeatureCreateWithoutExamplesInputSchema: z.ZodType<Prisma.DatasetFeatureCreateWithoutExamplesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  imageGuidelines: z.string(),
  labelGuidelines: z.string(),
  type: z.string(),
  dataset: z.lazy(() => DatasetCreateNestedOneWithoutFeaturesInputSchema)
}).strict() as z.ZodType<Prisma.DatasetFeatureCreateWithoutExamplesInput>;

export const DatasetFeatureUncheckedCreateWithoutExamplesInputSchema: z.ZodType<Prisma.DatasetFeatureUncheckedCreateWithoutExamplesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  imageGuidelines: z.string(),
  labelGuidelines: z.string(),
  type: z.string(),
  datasetId: z.string()
}).strict() as z.ZodType<Prisma.DatasetFeatureUncheckedCreateWithoutExamplesInput>;

export const DatasetFeatureCreateOrConnectWithoutExamplesInputSchema: z.ZodType<Prisma.DatasetFeatureCreateOrConnectWithoutExamplesInput> = z.object({
  where: z.lazy(() => DatasetFeatureWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DatasetFeatureCreateWithoutExamplesInputSchema),z.lazy(() => DatasetFeatureUncheckedCreateWithoutExamplesInputSchema) ]),
}).strict() as z.ZodType<Prisma.DatasetFeatureCreateOrConnectWithoutExamplesInput>;

export const DatasetFeatureUpsertWithoutExamplesInputSchema: z.ZodType<Prisma.DatasetFeatureUpsertWithoutExamplesInput> = z.object({
  update: z.union([ z.lazy(() => DatasetFeatureUpdateWithoutExamplesInputSchema),z.lazy(() => DatasetFeatureUncheckedUpdateWithoutExamplesInputSchema) ]),
  create: z.union([ z.lazy(() => DatasetFeatureCreateWithoutExamplesInputSchema),z.lazy(() => DatasetFeatureUncheckedCreateWithoutExamplesInputSchema) ]),
  where: z.lazy(() => DatasetFeatureWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.DatasetFeatureUpsertWithoutExamplesInput>;

export const DatasetFeatureUpdateToOneWithWhereWithoutExamplesInputSchema: z.ZodType<Prisma.DatasetFeatureUpdateToOneWithWhereWithoutExamplesInput> = z.object({
  where: z.lazy(() => DatasetFeatureWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => DatasetFeatureUpdateWithoutExamplesInputSchema),z.lazy(() => DatasetFeatureUncheckedUpdateWithoutExamplesInputSchema) ]),
}).strict() as z.ZodType<Prisma.DatasetFeatureUpdateToOneWithWhereWithoutExamplesInput>;

export const DatasetFeatureUpdateWithoutExamplesInputSchema: z.ZodType<Prisma.DatasetFeatureUpdateWithoutExamplesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageGuidelines: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  labelGuidelines: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataset: z.lazy(() => DatasetUpdateOneRequiredWithoutFeaturesNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.DatasetFeatureUpdateWithoutExamplesInput>;

export const DatasetFeatureUncheckedUpdateWithoutExamplesInputSchema: z.ZodType<Prisma.DatasetFeatureUncheckedUpdateWithoutExamplesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageGuidelines: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  labelGuidelines: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  datasetId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.DatasetFeatureUncheckedUpdateWithoutExamplesInput>;

export const DatasetCreateWithoutTaskInputSchema: z.ZodType<Prisma.DatasetCreateWithoutTaskInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  minSamplesCount: z.number().int(),
  features: z.lazy(() => DatasetFeatureCreateNestedManyWithoutDatasetInputSchema).optional(),
  Order: z.lazy(() => OrderCreateNestedOneWithoutDatasetInputSchema).optional()
}).strict() as z.ZodType<Prisma.DatasetCreateWithoutTaskInput>;

export const DatasetUncheckedCreateWithoutTaskInputSchema: z.ZodType<Prisma.DatasetUncheckedCreateWithoutTaskInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  minSamplesCount: z.number().int(),
  features: z.lazy(() => DatasetFeatureUncheckedCreateNestedManyWithoutDatasetInputSchema).optional(),
  Order: z.lazy(() => OrderUncheckedCreateNestedOneWithoutDatasetInputSchema).optional()
}).strict() as z.ZodType<Prisma.DatasetUncheckedCreateWithoutTaskInput>;

export const DatasetCreateOrConnectWithoutTaskInputSchema: z.ZodType<Prisma.DatasetCreateOrConnectWithoutTaskInput> = z.object({
  where: z.lazy(() => DatasetWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DatasetCreateWithoutTaskInputSchema),z.lazy(() => DatasetUncheckedCreateWithoutTaskInputSchema) ]),
}).strict() as z.ZodType<Prisma.DatasetCreateOrConnectWithoutTaskInput>;

export const DatasetUpsertWithoutTaskInputSchema: z.ZodType<Prisma.DatasetUpsertWithoutTaskInput> = z.object({
  update: z.union([ z.lazy(() => DatasetUpdateWithoutTaskInputSchema),z.lazy(() => DatasetUncheckedUpdateWithoutTaskInputSchema) ]),
  create: z.union([ z.lazy(() => DatasetCreateWithoutTaskInputSchema),z.lazy(() => DatasetUncheckedCreateWithoutTaskInputSchema) ]),
  where: z.lazy(() => DatasetWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.DatasetUpsertWithoutTaskInput>;

export const DatasetUpdateToOneWithWhereWithoutTaskInputSchema: z.ZodType<Prisma.DatasetUpdateToOneWithWhereWithoutTaskInput> = z.object({
  where: z.lazy(() => DatasetWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => DatasetUpdateWithoutTaskInputSchema),z.lazy(() => DatasetUncheckedUpdateWithoutTaskInputSchema) ]),
}).strict() as z.ZodType<Prisma.DatasetUpdateToOneWithWhereWithoutTaskInput>;

export const DatasetUpdateWithoutTaskInputSchema: z.ZodType<Prisma.DatasetUpdateWithoutTaskInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  minSamplesCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  features: z.lazy(() => DatasetFeatureUpdateManyWithoutDatasetNestedInputSchema).optional(),
  Order: z.lazy(() => OrderUpdateOneWithoutDatasetNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.DatasetUpdateWithoutTaskInput>;

export const DatasetUncheckedUpdateWithoutTaskInputSchema: z.ZodType<Prisma.DatasetUncheckedUpdateWithoutTaskInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  minSamplesCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  features: z.lazy(() => DatasetFeatureUncheckedUpdateManyWithoutDatasetNestedInputSchema).optional(),
  Order: z.lazy(() => OrderUncheckedUpdateOneWithoutDatasetNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.DatasetUncheckedUpdateWithoutTaskInput>;

export const DatasetFeatureCreateManyDatasetInputSchema: z.ZodType<Prisma.DatasetFeatureCreateManyDatasetInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  imageGuidelines: z.string(),
  labelGuidelines: z.string(),
  type: z.string()
}).strict() as z.ZodType<Prisma.DatasetFeatureCreateManyDatasetInput>;

export const DatasetFeatureUpdateWithoutDatasetInputSchema: z.ZodType<Prisma.DatasetFeatureUpdateWithoutDatasetInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageGuidelines: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  labelGuidelines: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  examples: z.lazy(() => DatasetFeatureExampleUpdateManyWithoutFeatureNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.DatasetFeatureUpdateWithoutDatasetInput>;

export const DatasetFeatureUncheckedUpdateWithoutDatasetInputSchema: z.ZodType<Prisma.DatasetFeatureUncheckedUpdateWithoutDatasetInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageGuidelines: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  labelGuidelines: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  examples: z.lazy(() => DatasetFeatureExampleUncheckedUpdateManyWithoutFeatureNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.DatasetFeatureUncheckedUpdateWithoutDatasetInput>;

export const DatasetFeatureUncheckedUpdateManyWithoutDatasetInputSchema: z.ZodType<Prisma.DatasetFeatureUncheckedUpdateManyWithoutDatasetInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageGuidelines: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  labelGuidelines: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.DatasetFeatureUncheckedUpdateManyWithoutDatasetInput>;

export const DatasetFeatureExampleCreateManyFeatureInputSchema: z.ZodType<Prisma.DatasetFeatureExampleCreateManyFeatureInput> = z.object({
  id: z.string().cuid().optional(),
  imageUrl: z.string(),
  label: z.string()
}).strict() as z.ZodType<Prisma.DatasetFeatureExampleCreateManyFeatureInput>;

export const DatasetFeatureExampleUpdateWithoutFeatureInputSchema: z.ZodType<Prisma.DatasetFeatureExampleUpdateWithoutFeatureInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.DatasetFeatureExampleUpdateWithoutFeatureInput>;

export const DatasetFeatureExampleUncheckedUpdateWithoutFeatureInputSchema: z.ZodType<Prisma.DatasetFeatureExampleUncheckedUpdateWithoutFeatureInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.DatasetFeatureExampleUncheckedUpdateWithoutFeatureInput>;

export const DatasetFeatureExampleUncheckedUpdateManyWithoutFeatureInputSchema: z.ZodType<Prisma.DatasetFeatureExampleUncheckedUpdateManyWithoutFeatureInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.DatasetFeatureExampleUncheckedUpdateManyWithoutFeatureInput>;

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const OrderFindFirstArgsSchema: z.ZodType<Prisma.OrderFindFirstArgs> = z.object({
  select: OrderSelectSchema.optional(),
  include: OrderIncludeSchema.optional(),
  where: OrderWhereInputSchema.optional(),
  orderBy: z.union([ OrderOrderByWithRelationInputSchema.array(),OrderOrderByWithRelationInputSchema ]).optional(),
  cursor: OrderWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ OrderScalarFieldEnumSchema,OrderScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.OrderFindFirstArgs>;

export const OrderFindFirstOrThrowArgsSchema: z.ZodType<Prisma.OrderFindFirstOrThrowArgs> = z.object({
  select: OrderSelectSchema.optional(),
  include: OrderIncludeSchema.optional(),
  where: OrderWhereInputSchema.optional(),
  orderBy: z.union([ OrderOrderByWithRelationInputSchema.array(),OrderOrderByWithRelationInputSchema ]).optional(),
  cursor: OrderWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ OrderScalarFieldEnumSchema,OrderScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.OrderFindFirstOrThrowArgs>;

export const OrderFindManyArgsSchema: z.ZodType<Prisma.OrderFindManyArgs> = z.object({
  select: OrderSelectSchema.optional(),
  include: OrderIncludeSchema.optional(),
  where: OrderWhereInputSchema.optional(),
  orderBy: z.union([ OrderOrderByWithRelationInputSchema.array(),OrderOrderByWithRelationInputSchema ]).optional(),
  cursor: OrderWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ OrderScalarFieldEnumSchema,OrderScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.OrderFindManyArgs>;

export const OrderAggregateArgsSchema: z.ZodType<Prisma.OrderAggregateArgs> = z.object({
  where: OrderWhereInputSchema.optional(),
  orderBy: z.union([ OrderOrderByWithRelationInputSchema.array(),OrderOrderByWithRelationInputSchema ]).optional(),
  cursor: OrderWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.OrderAggregateArgs>;

export const OrderGroupByArgsSchema: z.ZodType<Prisma.OrderGroupByArgs> = z.object({
  where: OrderWhereInputSchema.optional(),
  orderBy: z.union([ OrderOrderByWithAggregationInputSchema.array(),OrderOrderByWithAggregationInputSchema ]).optional(),
  by: OrderScalarFieldEnumSchema.array(),
  having: OrderScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.OrderGroupByArgs>;

export const OrderFindUniqueArgsSchema: z.ZodType<Prisma.OrderFindUniqueArgs> = z.object({
  select: OrderSelectSchema.optional(),
  include: OrderIncludeSchema.optional(),
  where: OrderWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.OrderFindUniqueArgs>;

export const OrderFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.OrderFindUniqueOrThrowArgs> = z.object({
  select: OrderSelectSchema.optional(),
  include: OrderIncludeSchema.optional(),
  where: OrderWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.OrderFindUniqueOrThrowArgs>;

export const DatasetFindFirstArgsSchema: z.ZodType<Prisma.DatasetFindFirstArgs> = z.object({
  select: DatasetSelectSchema.optional(),
  include: DatasetIncludeSchema.optional(),
  where: DatasetWhereInputSchema.optional(),
  orderBy: z.union([ DatasetOrderByWithRelationInputSchema.array(),DatasetOrderByWithRelationInputSchema ]).optional(),
  cursor: DatasetWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DatasetScalarFieldEnumSchema,DatasetScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.DatasetFindFirstArgs>;

export const DatasetFindFirstOrThrowArgsSchema: z.ZodType<Prisma.DatasetFindFirstOrThrowArgs> = z.object({
  select: DatasetSelectSchema.optional(),
  include: DatasetIncludeSchema.optional(),
  where: DatasetWhereInputSchema.optional(),
  orderBy: z.union([ DatasetOrderByWithRelationInputSchema.array(),DatasetOrderByWithRelationInputSchema ]).optional(),
  cursor: DatasetWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DatasetScalarFieldEnumSchema,DatasetScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.DatasetFindFirstOrThrowArgs>;

export const DatasetFindManyArgsSchema: z.ZodType<Prisma.DatasetFindManyArgs> = z.object({
  select: DatasetSelectSchema.optional(),
  include: DatasetIncludeSchema.optional(),
  where: DatasetWhereInputSchema.optional(),
  orderBy: z.union([ DatasetOrderByWithRelationInputSchema.array(),DatasetOrderByWithRelationInputSchema ]).optional(),
  cursor: DatasetWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DatasetScalarFieldEnumSchema,DatasetScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.DatasetFindManyArgs>;

export const DatasetAggregateArgsSchema: z.ZodType<Prisma.DatasetAggregateArgs> = z.object({
  where: DatasetWhereInputSchema.optional(),
  orderBy: z.union([ DatasetOrderByWithRelationInputSchema.array(),DatasetOrderByWithRelationInputSchema ]).optional(),
  cursor: DatasetWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.DatasetAggregateArgs>;

export const DatasetGroupByArgsSchema: z.ZodType<Prisma.DatasetGroupByArgs> = z.object({
  where: DatasetWhereInputSchema.optional(),
  orderBy: z.union([ DatasetOrderByWithAggregationInputSchema.array(),DatasetOrderByWithAggregationInputSchema ]).optional(),
  by: DatasetScalarFieldEnumSchema.array(),
  having: DatasetScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.DatasetGroupByArgs>;

export const DatasetFindUniqueArgsSchema: z.ZodType<Prisma.DatasetFindUniqueArgs> = z.object({
  select: DatasetSelectSchema.optional(),
  include: DatasetIncludeSchema.optional(),
  where: DatasetWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.DatasetFindUniqueArgs>;

export const DatasetFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.DatasetFindUniqueOrThrowArgs> = z.object({
  select: DatasetSelectSchema.optional(),
  include: DatasetIncludeSchema.optional(),
  where: DatasetWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.DatasetFindUniqueOrThrowArgs>;

export const DatasetFeatureFindFirstArgsSchema: z.ZodType<Prisma.DatasetFeatureFindFirstArgs> = z.object({
  select: DatasetFeatureSelectSchema.optional(),
  include: DatasetFeatureIncludeSchema.optional(),
  where: DatasetFeatureWhereInputSchema.optional(),
  orderBy: z.union([ DatasetFeatureOrderByWithRelationInputSchema.array(),DatasetFeatureOrderByWithRelationInputSchema ]).optional(),
  cursor: DatasetFeatureWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DatasetFeatureScalarFieldEnumSchema,DatasetFeatureScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.DatasetFeatureFindFirstArgs>;

export const DatasetFeatureFindFirstOrThrowArgsSchema: z.ZodType<Prisma.DatasetFeatureFindFirstOrThrowArgs> = z.object({
  select: DatasetFeatureSelectSchema.optional(),
  include: DatasetFeatureIncludeSchema.optional(),
  where: DatasetFeatureWhereInputSchema.optional(),
  orderBy: z.union([ DatasetFeatureOrderByWithRelationInputSchema.array(),DatasetFeatureOrderByWithRelationInputSchema ]).optional(),
  cursor: DatasetFeatureWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DatasetFeatureScalarFieldEnumSchema,DatasetFeatureScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.DatasetFeatureFindFirstOrThrowArgs>;

export const DatasetFeatureFindManyArgsSchema: z.ZodType<Prisma.DatasetFeatureFindManyArgs> = z.object({
  select: DatasetFeatureSelectSchema.optional(),
  include: DatasetFeatureIncludeSchema.optional(),
  where: DatasetFeatureWhereInputSchema.optional(),
  orderBy: z.union([ DatasetFeatureOrderByWithRelationInputSchema.array(),DatasetFeatureOrderByWithRelationInputSchema ]).optional(),
  cursor: DatasetFeatureWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DatasetFeatureScalarFieldEnumSchema,DatasetFeatureScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.DatasetFeatureFindManyArgs>;

export const DatasetFeatureAggregateArgsSchema: z.ZodType<Prisma.DatasetFeatureAggregateArgs> = z.object({
  where: DatasetFeatureWhereInputSchema.optional(),
  orderBy: z.union([ DatasetFeatureOrderByWithRelationInputSchema.array(),DatasetFeatureOrderByWithRelationInputSchema ]).optional(),
  cursor: DatasetFeatureWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.DatasetFeatureAggregateArgs>;

export const DatasetFeatureGroupByArgsSchema: z.ZodType<Prisma.DatasetFeatureGroupByArgs> = z.object({
  where: DatasetFeatureWhereInputSchema.optional(),
  orderBy: z.union([ DatasetFeatureOrderByWithAggregationInputSchema.array(),DatasetFeatureOrderByWithAggregationInputSchema ]).optional(),
  by: DatasetFeatureScalarFieldEnumSchema.array(),
  having: DatasetFeatureScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.DatasetFeatureGroupByArgs>;

export const DatasetFeatureFindUniqueArgsSchema: z.ZodType<Prisma.DatasetFeatureFindUniqueArgs> = z.object({
  select: DatasetFeatureSelectSchema.optional(),
  include: DatasetFeatureIncludeSchema.optional(),
  where: DatasetFeatureWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.DatasetFeatureFindUniqueArgs>;

export const DatasetFeatureFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.DatasetFeatureFindUniqueOrThrowArgs> = z.object({
  select: DatasetFeatureSelectSchema.optional(),
  include: DatasetFeatureIncludeSchema.optional(),
  where: DatasetFeatureWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.DatasetFeatureFindUniqueOrThrowArgs>;

export const DatasetFeatureExampleFindFirstArgsSchema: z.ZodType<Prisma.DatasetFeatureExampleFindFirstArgs> = z.object({
  select: DatasetFeatureExampleSelectSchema.optional(),
  include: DatasetFeatureExampleIncludeSchema.optional(),
  where: DatasetFeatureExampleWhereInputSchema.optional(),
  orderBy: z.union([ DatasetFeatureExampleOrderByWithRelationInputSchema.array(),DatasetFeatureExampleOrderByWithRelationInputSchema ]).optional(),
  cursor: DatasetFeatureExampleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DatasetFeatureExampleScalarFieldEnumSchema,DatasetFeatureExampleScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.DatasetFeatureExampleFindFirstArgs>;

export const DatasetFeatureExampleFindFirstOrThrowArgsSchema: z.ZodType<Prisma.DatasetFeatureExampleFindFirstOrThrowArgs> = z.object({
  select: DatasetFeatureExampleSelectSchema.optional(),
  include: DatasetFeatureExampleIncludeSchema.optional(),
  where: DatasetFeatureExampleWhereInputSchema.optional(),
  orderBy: z.union([ DatasetFeatureExampleOrderByWithRelationInputSchema.array(),DatasetFeatureExampleOrderByWithRelationInputSchema ]).optional(),
  cursor: DatasetFeatureExampleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DatasetFeatureExampleScalarFieldEnumSchema,DatasetFeatureExampleScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.DatasetFeatureExampleFindFirstOrThrowArgs>;

export const DatasetFeatureExampleFindManyArgsSchema: z.ZodType<Prisma.DatasetFeatureExampleFindManyArgs> = z.object({
  select: DatasetFeatureExampleSelectSchema.optional(),
  include: DatasetFeatureExampleIncludeSchema.optional(),
  where: DatasetFeatureExampleWhereInputSchema.optional(),
  orderBy: z.union([ DatasetFeatureExampleOrderByWithRelationInputSchema.array(),DatasetFeatureExampleOrderByWithRelationInputSchema ]).optional(),
  cursor: DatasetFeatureExampleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DatasetFeatureExampleScalarFieldEnumSchema,DatasetFeatureExampleScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.DatasetFeatureExampleFindManyArgs>;

export const DatasetFeatureExampleAggregateArgsSchema: z.ZodType<Prisma.DatasetFeatureExampleAggregateArgs> = z.object({
  where: DatasetFeatureExampleWhereInputSchema.optional(),
  orderBy: z.union([ DatasetFeatureExampleOrderByWithRelationInputSchema.array(),DatasetFeatureExampleOrderByWithRelationInputSchema ]).optional(),
  cursor: DatasetFeatureExampleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.DatasetFeatureExampleAggregateArgs>;

export const DatasetFeatureExampleGroupByArgsSchema: z.ZodType<Prisma.DatasetFeatureExampleGroupByArgs> = z.object({
  where: DatasetFeatureExampleWhereInputSchema.optional(),
  orderBy: z.union([ DatasetFeatureExampleOrderByWithAggregationInputSchema.array(),DatasetFeatureExampleOrderByWithAggregationInputSchema ]).optional(),
  by: DatasetFeatureExampleScalarFieldEnumSchema.array(),
  having: DatasetFeatureExampleScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.DatasetFeatureExampleGroupByArgs>;

export const DatasetFeatureExampleFindUniqueArgsSchema: z.ZodType<Prisma.DatasetFeatureExampleFindUniqueArgs> = z.object({
  select: DatasetFeatureExampleSelectSchema.optional(),
  include: DatasetFeatureExampleIncludeSchema.optional(),
  where: DatasetFeatureExampleWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.DatasetFeatureExampleFindUniqueArgs>;

export const DatasetFeatureExampleFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.DatasetFeatureExampleFindUniqueOrThrowArgs> = z.object({
  select: DatasetFeatureExampleSelectSchema.optional(),
  include: DatasetFeatureExampleIncludeSchema.optional(),
  where: DatasetFeatureExampleWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.DatasetFeatureExampleFindUniqueOrThrowArgs>;

export const TaskFindFirstArgsSchema: z.ZodType<Prisma.TaskFindFirstArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereInputSchema.optional(),
  orderBy: z.union([ TaskOrderByWithRelationInputSchema.array(),TaskOrderByWithRelationInputSchema ]).optional(),
  cursor: TaskWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TaskScalarFieldEnumSchema,TaskScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.TaskFindFirstArgs>;

export const TaskFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TaskFindFirstOrThrowArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereInputSchema.optional(),
  orderBy: z.union([ TaskOrderByWithRelationInputSchema.array(),TaskOrderByWithRelationInputSchema ]).optional(),
  cursor: TaskWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TaskScalarFieldEnumSchema,TaskScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.TaskFindFirstOrThrowArgs>;

export const TaskFindManyArgsSchema: z.ZodType<Prisma.TaskFindManyArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereInputSchema.optional(),
  orderBy: z.union([ TaskOrderByWithRelationInputSchema.array(),TaskOrderByWithRelationInputSchema ]).optional(),
  cursor: TaskWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TaskScalarFieldEnumSchema,TaskScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.TaskFindManyArgs>;

export const TaskAggregateArgsSchema: z.ZodType<Prisma.TaskAggregateArgs> = z.object({
  where: TaskWhereInputSchema.optional(),
  orderBy: z.union([ TaskOrderByWithRelationInputSchema.array(),TaskOrderByWithRelationInputSchema ]).optional(),
  cursor: TaskWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.TaskAggregateArgs>;

export const TaskGroupByArgsSchema: z.ZodType<Prisma.TaskGroupByArgs> = z.object({
  where: TaskWhereInputSchema.optional(),
  orderBy: z.union([ TaskOrderByWithAggregationInputSchema.array(),TaskOrderByWithAggregationInputSchema ]).optional(),
  by: TaskScalarFieldEnumSchema.array(),
  having: TaskScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.TaskGroupByArgs>;

export const TaskFindUniqueArgsSchema: z.ZodType<Prisma.TaskFindUniqueArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.TaskFindUniqueArgs>;

export const TaskFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TaskFindUniqueOrThrowArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.TaskFindUniqueOrThrowArgs>;

export const OrderCreateArgsSchema: z.ZodType<Prisma.OrderCreateArgs> = z.object({
  select: OrderSelectSchema.optional(),
  include: OrderIncludeSchema.optional(),
  data: z.union([ OrderCreateInputSchema,OrderUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.OrderCreateArgs>;

export const OrderUpsertArgsSchema: z.ZodType<Prisma.OrderUpsertArgs> = z.object({
  select: OrderSelectSchema.optional(),
  include: OrderIncludeSchema.optional(),
  where: OrderWhereUniqueInputSchema,
  create: z.union([ OrderCreateInputSchema,OrderUncheckedCreateInputSchema ]),
  update: z.union([ OrderUpdateInputSchema,OrderUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.OrderUpsertArgs>;

export const OrderCreateManyArgsSchema: z.ZodType<Prisma.OrderCreateManyArgs> = z.object({
  data: z.union([ OrderCreateManyInputSchema,OrderCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.OrderCreateManyArgs>;

export const OrderCreateManyAndReturnArgsSchema: z.ZodType<Prisma.OrderCreateManyAndReturnArgs> = z.object({
  data: z.union([ OrderCreateManyInputSchema,OrderCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.OrderCreateManyAndReturnArgs>;

export const OrderDeleteArgsSchema: z.ZodType<Prisma.OrderDeleteArgs> = z.object({
  select: OrderSelectSchema.optional(),
  include: OrderIncludeSchema.optional(),
  where: OrderWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.OrderDeleteArgs>;

export const OrderUpdateArgsSchema: z.ZodType<Prisma.OrderUpdateArgs> = z.object({
  select: OrderSelectSchema.optional(),
  include: OrderIncludeSchema.optional(),
  data: z.union([ OrderUpdateInputSchema,OrderUncheckedUpdateInputSchema ]),
  where: OrderWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.OrderUpdateArgs>;

export const OrderUpdateManyArgsSchema: z.ZodType<Prisma.OrderUpdateManyArgs> = z.object({
  data: z.union([ OrderUpdateManyMutationInputSchema,OrderUncheckedUpdateManyInputSchema ]),
  where: OrderWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() as z.ZodType<Prisma.OrderUpdateManyArgs>;

export const OrderUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.OrderUpdateManyAndReturnArgs> = z.object({
  data: z.union([ OrderUpdateManyMutationInputSchema,OrderUncheckedUpdateManyInputSchema ]),
  where: OrderWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() as z.ZodType<Prisma.OrderUpdateManyAndReturnArgs>;

export const OrderDeleteManyArgsSchema: z.ZodType<Prisma.OrderDeleteManyArgs> = z.object({
  where: OrderWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() as z.ZodType<Prisma.OrderDeleteManyArgs>;

export const DatasetCreateArgsSchema: z.ZodType<Prisma.DatasetCreateArgs> = z.object({
  select: DatasetSelectSchema.optional(),
  include: DatasetIncludeSchema.optional(),
  data: z.union([ DatasetCreateInputSchema,DatasetUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.DatasetCreateArgs>;

export const DatasetUpsertArgsSchema: z.ZodType<Prisma.DatasetUpsertArgs> = z.object({
  select: DatasetSelectSchema.optional(),
  include: DatasetIncludeSchema.optional(),
  where: DatasetWhereUniqueInputSchema,
  create: z.union([ DatasetCreateInputSchema,DatasetUncheckedCreateInputSchema ]),
  update: z.union([ DatasetUpdateInputSchema,DatasetUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.DatasetUpsertArgs>;

export const DatasetCreateManyArgsSchema: z.ZodType<Prisma.DatasetCreateManyArgs> = z.object({
  data: z.union([ DatasetCreateManyInputSchema,DatasetCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.DatasetCreateManyArgs>;

export const DatasetCreateManyAndReturnArgsSchema: z.ZodType<Prisma.DatasetCreateManyAndReturnArgs> = z.object({
  data: z.union([ DatasetCreateManyInputSchema,DatasetCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.DatasetCreateManyAndReturnArgs>;

export const DatasetDeleteArgsSchema: z.ZodType<Prisma.DatasetDeleteArgs> = z.object({
  select: DatasetSelectSchema.optional(),
  include: DatasetIncludeSchema.optional(),
  where: DatasetWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.DatasetDeleteArgs>;

export const DatasetUpdateArgsSchema: z.ZodType<Prisma.DatasetUpdateArgs> = z.object({
  select: DatasetSelectSchema.optional(),
  include: DatasetIncludeSchema.optional(),
  data: z.union([ DatasetUpdateInputSchema,DatasetUncheckedUpdateInputSchema ]),
  where: DatasetWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.DatasetUpdateArgs>;

export const DatasetUpdateManyArgsSchema: z.ZodType<Prisma.DatasetUpdateManyArgs> = z.object({
  data: z.union([ DatasetUpdateManyMutationInputSchema,DatasetUncheckedUpdateManyInputSchema ]),
  where: DatasetWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() as z.ZodType<Prisma.DatasetUpdateManyArgs>;

export const DatasetUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.DatasetUpdateManyAndReturnArgs> = z.object({
  data: z.union([ DatasetUpdateManyMutationInputSchema,DatasetUncheckedUpdateManyInputSchema ]),
  where: DatasetWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() as z.ZodType<Prisma.DatasetUpdateManyAndReturnArgs>;

export const DatasetDeleteManyArgsSchema: z.ZodType<Prisma.DatasetDeleteManyArgs> = z.object({
  where: DatasetWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() as z.ZodType<Prisma.DatasetDeleteManyArgs>;

export const DatasetFeatureCreateArgsSchema: z.ZodType<Prisma.DatasetFeatureCreateArgs> = z.object({
  select: DatasetFeatureSelectSchema.optional(),
  include: DatasetFeatureIncludeSchema.optional(),
  data: z.union([ DatasetFeatureCreateInputSchema,DatasetFeatureUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.DatasetFeatureCreateArgs>;

export const DatasetFeatureUpsertArgsSchema: z.ZodType<Prisma.DatasetFeatureUpsertArgs> = z.object({
  select: DatasetFeatureSelectSchema.optional(),
  include: DatasetFeatureIncludeSchema.optional(),
  where: DatasetFeatureWhereUniqueInputSchema,
  create: z.union([ DatasetFeatureCreateInputSchema,DatasetFeatureUncheckedCreateInputSchema ]),
  update: z.union([ DatasetFeatureUpdateInputSchema,DatasetFeatureUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.DatasetFeatureUpsertArgs>;

export const DatasetFeatureCreateManyArgsSchema: z.ZodType<Prisma.DatasetFeatureCreateManyArgs> = z.object({
  data: z.union([ DatasetFeatureCreateManyInputSchema,DatasetFeatureCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.DatasetFeatureCreateManyArgs>;

export const DatasetFeatureCreateManyAndReturnArgsSchema: z.ZodType<Prisma.DatasetFeatureCreateManyAndReturnArgs> = z.object({
  data: z.union([ DatasetFeatureCreateManyInputSchema,DatasetFeatureCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.DatasetFeatureCreateManyAndReturnArgs>;

export const DatasetFeatureDeleteArgsSchema: z.ZodType<Prisma.DatasetFeatureDeleteArgs> = z.object({
  select: DatasetFeatureSelectSchema.optional(),
  include: DatasetFeatureIncludeSchema.optional(),
  where: DatasetFeatureWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.DatasetFeatureDeleteArgs>;

export const DatasetFeatureUpdateArgsSchema: z.ZodType<Prisma.DatasetFeatureUpdateArgs> = z.object({
  select: DatasetFeatureSelectSchema.optional(),
  include: DatasetFeatureIncludeSchema.optional(),
  data: z.union([ DatasetFeatureUpdateInputSchema,DatasetFeatureUncheckedUpdateInputSchema ]),
  where: DatasetFeatureWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.DatasetFeatureUpdateArgs>;

export const DatasetFeatureUpdateManyArgsSchema: z.ZodType<Prisma.DatasetFeatureUpdateManyArgs> = z.object({
  data: z.union([ DatasetFeatureUpdateManyMutationInputSchema,DatasetFeatureUncheckedUpdateManyInputSchema ]),
  where: DatasetFeatureWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() as z.ZodType<Prisma.DatasetFeatureUpdateManyArgs>;

export const DatasetFeatureUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.DatasetFeatureUpdateManyAndReturnArgs> = z.object({
  data: z.union([ DatasetFeatureUpdateManyMutationInputSchema,DatasetFeatureUncheckedUpdateManyInputSchema ]),
  where: DatasetFeatureWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() as z.ZodType<Prisma.DatasetFeatureUpdateManyAndReturnArgs>;

export const DatasetFeatureDeleteManyArgsSchema: z.ZodType<Prisma.DatasetFeatureDeleteManyArgs> = z.object({
  where: DatasetFeatureWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() as z.ZodType<Prisma.DatasetFeatureDeleteManyArgs>;

export const DatasetFeatureExampleCreateArgsSchema: z.ZodType<Prisma.DatasetFeatureExampleCreateArgs> = z.object({
  select: DatasetFeatureExampleSelectSchema.optional(),
  include: DatasetFeatureExampleIncludeSchema.optional(),
  data: z.union([ DatasetFeatureExampleCreateInputSchema,DatasetFeatureExampleUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.DatasetFeatureExampleCreateArgs>;

export const DatasetFeatureExampleUpsertArgsSchema: z.ZodType<Prisma.DatasetFeatureExampleUpsertArgs> = z.object({
  select: DatasetFeatureExampleSelectSchema.optional(),
  include: DatasetFeatureExampleIncludeSchema.optional(),
  where: DatasetFeatureExampleWhereUniqueInputSchema,
  create: z.union([ DatasetFeatureExampleCreateInputSchema,DatasetFeatureExampleUncheckedCreateInputSchema ]),
  update: z.union([ DatasetFeatureExampleUpdateInputSchema,DatasetFeatureExampleUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.DatasetFeatureExampleUpsertArgs>;

export const DatasetFeatureExampleCreateManyArgsSchema: z.ZodType<Prisma.DatasetFeatureExampleCreateManyArgs> = z.object({
  data: z.union([ DatasetFeatureExampleCreateManyInputSchema,DatasetFeatureExampleCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.DatasetFeatureExampleCreateManyArgs>;

export const DatasetFeatureExampleCreateManyAndReturnArgsSchema: z.ZodType<Prisma.DatasetFeatureExampleCreateManyAndReturnArgs> = z.object({
  data: z.union([ DatasetFeatureExampleCreateManyInputSchema,DatasetFeatureExampleCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.DatasetFeatureExampleCreateManyAndReturnArgs>;

export const DatasetFeatureExampleDeleteArgsSchema: z.ZodType<Prisma.DatasetFeatureExampleDeleteArgs> = z.object({
  select: DatasetFeatureExampleSelectSchema.optional(),
  include: DatasetFeatureExampleIncludeSchema.optional(),
  where: DatasetFeatureExampleWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.DatasetFeatureExampleDeleteArgs>;

export const DatasetFeatureExampleUpdateArgsSchema: z.ZodType<Prisma.DatasetFeatureExampleUpdateArgs> = z.object({
  select: DatasetFeatureExampleSelectSchema.optional(),
  include: DatasetFeatureExampleIncludeSchema.optional(),
  data: z.union([ DatasetFeatureExampleUpdateInputSchema,DatasetFeatureExampleUncheckedUpdateInputSchema ]),
  where: DatasetFeatureExampleWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.DatasetFeatureExampleUpdateArgs>;

export const DatasetFeatureExampleUpdateManyArgsSchema: z.ZodType<Prisma.DatasetFeatureExampleUpdateManyArgs> = z.object({
  data: z.union([ DatasetFeatureExampleUpdateManyMutationInputSchema,DatasetFeatureExampleUncheckedUpdateManyInputSchema ]),
  where: DatasetFeatureExampleWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() as z.ZodType<Prisma.DatasetFeatureExampleUpdateManyArgs>;

export const DatasetFeatureExampleUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.DatasetFeatureExampleUpdateManyAndReturnArgs> = z.object({
  data: z.union([ DatasetFeatureExampleUpdateManyMutationInputSchema,DatasetFeatureExampleUncheckedUpdateManyInputSchema ]),
  where: DatasetFeatureExampleWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() as z.ZodType<Prisma.DatasetFeatureExampleUpdateManyAndReturnArgs>;

export const DatasetFeatureExampleDeleteManyArgsSchema: z.ZodType<Prisma.DatasetFeatureExampleDeleteManyArgs> = z.object({
  where: DatasetFeatureExampleWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() as z.ZodType<Prisma.DatasetFeatureExampleDeleteManyArgs>;

export const TaskCreateArgsSchema: z.ZodType<Prisma.TaskCreateArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  data: z.union([ TaskCreateInputSchema,TaskUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.TaskCreateArgs>;

export const TaskUpsertArgsSchema: z.ZodType<Prisma.TaskUpsertArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereUniqueInputSchema,
  create: z.union([ TaskCreateInputSchema,TaskUncheckedCreateInputSchema ]),
  update: z.union([ TaskUpdateInputSchema,TaskUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.TaskUpsertArgs>;

export const TaskCreateManyArgsSchema: z.ZodType<Prisma.TaskCreateManyArgs> = z.object({
  data: z.union([ TaskCreateManyInputSchema,TaskCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.TaskCreateManyArgs>;

export const TaskCreateManyAndReturnArgsSchema: z.ZodType<Prisma.TaskCreateManyAndReturnArgs> = z.object({
  data: z.union([ TaskCreateManyInputSchema,TaskCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.TaskCreateManyAndReturnArgs>;

export const TaskDeleteArgsSchema: z.ZodType<Prisma.TaskDeleteArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.TaskDeleteArgs>;

export const TaskUpdateArgsSchema: z.ZodType<Prisma.TaskUpdateArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  data: z.union([ TaskUpdateInputSchema,TaskUncheckedUpdateInputSchema ]),
  where: TaskWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.TaskUpdateArgs>;

export const TaskUpdateManyArgsSchema: z.ZodType<Prisma.TaskUpdateManyArgs> = z.object({
  data: z.union([ TaskUpdateManyMutationInputSchema,TaskUncheckedUpdateManyInputSchema ]),
  where: TaskWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() as z.ZodType<Prisma.TaskUpdateManyArgs>;

export const TaskUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.TaskUpdateManyAndReturnArgs> = z.object({
  data: z.union([ TaskUpdateManyMutationInputSchema,TaskUncheckedUpdateManyInputSchema ]),
  where: TaskWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() as z.ZodType<Prisma.TaskUpdateManyAndReturnArgs>;

export const TaskDeleteManyArgsSchema: z.ZodType<Prisma.TaskDeleteManyArgs> = z.object({
  where: TaskWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() as z.ZodType<Prisma.TaskDeleteManyArgs>;