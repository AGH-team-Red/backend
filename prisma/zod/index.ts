import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id']);

export const OrderScalarFieldEnumSchema = z.enum(['id','name','startDate','endDate','status','budget','labelingLanguage','datasetDescription','exampleImageUrl','imageGuidelines','minSamplesCount','currentSamplesCount','entryFee','reward','minContributors','contributors']);

export const FeatureScalarFieldEnumSchema = z.enum(['id','orderId','name','labelGuidelines','exampleLabel']);

export const TaskScalarFieldEnumSchema = z.enum(['id','type','endDate','estimatedReward','assignedToId','orderId']);

export const LabelTaskScalarFieldEnumSchema = z.enum(['id','taskId']);

export const FeatureLabelScalarFieldEnumSchema = z.enum(['id','labelTaskId','featureId','featureLabel']);

export const CheckTaskScalarFieldEnumSchema = z.enum(['id','taskId','isCorrect']);

export const CheckFeatureScalarFieldEnumSchema = z.enum(['id','checkTaskId','name','label']);

export const PictureTaskScalarFieldEnumSchema = z.enum(['id','taskId','exampleImgUrl']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const OrderStatusSchema = z.enum(['active','pending','completed','expired']);

export type OrderStatusType = `${z.infer<typeof OrderStatusSchema>}`

export const TaskTypeSchema = z.enum(['labeling','cross_checking','taking_picture']);

export type TaskTypeType = `${z.infer<typeof TaskTypeSchema>}`

export const LabelingLanguageSchema = z.enum(['pl','en']);

export type LabelingLanguageType = `${z.infer<typeof LabelingLanguageSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().uuid(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// ORDER SCHEMA
/////////////////////////////////////////

export const OrderSchema = z.object({
  status: OrderStatusSchema,
  labelingLanguage: LabelingLanguageSchema,
  id: z.string().uuid(),
  name: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  budget: z.number(),
  datasetDescription: z.string(),
  exampleImageUrl: z.string(),
  imageGuidelines: z.string(),
  minSamplesCount: z.number().int(),
  currentSamplesCount: z.number().int(),
  entryFee: z.number().nullable(),
  reward: z.number().nullable(),
  minContributors: z.number().int().nullable(),
  contributors: z.number().int().nullable(),
})

export type Order = z.infer<typeof OrderSchema>

/////////////////////////////////////////
// FEATURE SCHEMA
/////////////////////////////////////////

export const FeatureSchema = z.object({
  id: z.number().int(),
  orderId: z.string(),
  name: z.string(),
  labelGuidelines: z.string(),
  exampleLabel: z.string().nullable(),
})

export type Feature = z.infer<typeof FeatureSchema>

/////////////////////////////////////////
// TASK SCHEMA
/////////////////////////////////////////

export const TaskSchema = z.object({
  type: TaskTypeSchema,
  id: z.string().uuid(),
  endDate: z.coerce.date(),
  estimatedReward: z.number(),
  assignedToId: z.string().nullable(),
  orderId: z.string(),
})

export type Task = z.infer<typeof TaskSchema>

/////////////////////////////////////////
// LABEL TASK SCHEMA
/////////////////////////////////////////

export const LabelTaskSchema = z.object({
  id: z.string().uuid(),
  taskId: z.string(),
})

export type LabelTask = z.infer<typeof LabelTaskSchema>

/////////////////////////////////////////
// FEATURE LABEL SCHEMA
/////////////////////////////////////////

export const FeatureLabelSchema = z.object({
  id: z.number().int(),
  labelTaskId: z.string(),
  featureId: z.number().int(),
  featureLabel: z.string(),
})

export type FeatureLabel = z.infer<typeof FeatureLabelSchema>

/////////////////////////////////////////
// CHECK TASK SCHEMA
/////////////////////////////////////////

export const CheckTaskSchema = z.object({
  id: z.string().uuid(),
  taskId: z.string(),
  isCorrect: z.boolean().nullable(),
})

export type CheckTask = z.infer<typeof CheckTaskSchema>

/////////////////////////////////////////
// CHECK FEATURE SCHEMA
/////////////////////////////////////////

export const CheckFeatureSchema = z.object({
  id: z.number().int(),
  checkTaskId: z.string(),
  name: z.string(),
  label: z.string(),
})

export type CheckFeature = z.infer<typeof CheckFeatureSchema>

/////////////////////////////////////////
// PICTURE TASK SCHEMA
/////////////////////////////////////////

export const PictureTaskSchema = z.object({
  id: z.string().uuid(),
  taskId: z.string(),
  exampleImgUrl: z.string().nullable(),
})

export type PictureTask = z.infer<typeof PictureTaskSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  tasks: z.union([z.boolean(),z.lazy(() => TaskFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  tasks: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  tasks: z.union([z.boolean(),z.lazy(() => TaskFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ORDER
//------------------------------------------------------

export const OrderIncludeSchema: z.ZodType<Prisma.OrderInclude> = z.object({
  features: z.union([z.boolean(),z.lazy(() => FeatureFindManyArgsSchema)]).optional(),
  tasks: z.union([z.boolean(),z.lazy(() => TaskFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => OrderCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const OrderArgsSchema: z.ZodType<Prisma.OrderDefaultArgs> = z.object({
  select: z.lazy(() => OrderSelectSchema).optional(),
  include: z.lazy(() => OrderIncludeSchema).optional(),
}).strict();

export const OrderCountOutputTypeArgsSchema: z.ZodType<Prisma.OrderCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => OrderCountOutputTypeSelectSchema).nullish(),
}).strict();

export const OrderCountOutputTypeSelectSchema: z.ZodType<Prisma.OrderCountOutputTypeSelect> = z.object({
  features: z.boolean().optional(),
  tasks: z.boolean().optional(),
}).strict();

export const OrderSelectSchema: z.ZodType<Prisma.OrderSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  startDate: z.boolean().optional(),
  endDate: z.boolean().optional(),
  status: z.boolean().optional(),
  budget: z.boolean().optional(),
  labelingLanguage: z.boolean().optional(),
  datasetDescription: z.boolean().optional(),
  exampleImageUrl: z.boolean().optional(),
  imageGuidelines: z.boolean().optional(),
  minSamplesCount: z.boolean().optional(),
  currentSamplesCount: z.boolean().optional(),
  entryFee: z.boolean().optional(),
  reward: z.boolean().optional(),
  minContributors: z.boolean().optional(),
  contributors: z.boolean().optional(),
  features: z.union([z.boolean(),z.lazy(() => FeatureFindManyArgsSchema)]).optional(),
  tasks: z.union([z.boolean(),z.lazy(() => TaskFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => OrderCountOutputTypeArgsSchema)]).optional(),
}).strict()

// FEATURE
//------------------------------------------------------

export const FeatureIncludeSchema: z.ZodType<Prisma.FeatureInclude> = z.object({
  order: z.union([z.boolean(),z.lazy(() => OrderArgsSchema)]).optional(),
  featureLabels: z.union([z.boolean(),z.lazy(() => FeatureLabelFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => FeatureCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const FeatureArgsSchema: z.ZodType<Prisma.FeatureDefaultArgs> = z.object({
  select: z.lazy(() => FeatureSelectSchema).optional(),
  include: z.lazy(() => FeatureIncludeSchema).optional(),
}).strict();

export const FeatureCountOutputTypeArgsSchema: z.ZodType<Prisma.FeatureCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => FeatureCountOutputTypeSelectSchema).nullish(),
}).strict();

export const FeatureCountOutputTypeSelectSchema: z.ZodType<Prisma.FeatureCountOutputTypeSelect> = z.object({
  featureLabels: z.boolean().optional(),
}).strict();

export const FeatureSelectSchema: z.ZodType<Prisma.FeatureSelect> = z.object({
  id: z.boolean().optional(),
  orderId: z.boolean().optional(),
  name: z.boolean().optional(),
  labelGuidelines: z.boolean().optional(),
  exampleLabel: z.boolean().optional(),
  order: z.union([z.boolean(),z.lazy(() => OrderArgsSchema)]).optional(),
  featureLabels: z.union([z.boolean(),z.lazy(() => FeatureLabelFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => FeatureCountOutputTypeArgsSchema)]).optional(),
}).strict()

// TASK
//------------------------------------------------------

export const TaskIncludeSchema: z.ZodType<Prisma.TaskInclude> = z.object({
  assignedTo: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  order: z.union([z.boolean(),z.lazy(() => OrderArgsSchema)]).optional(),
  labelTask: z.union([z.boolean(),z.lazy(() => LabelTaskArgsSchema)]).optional(),
  checkTask: z.union([z.boolean(),z.lazy(() => CheckTaskArgsSchema)]).optional(),
  pictureTask: z.union([z.boolean(),z.lazy(() => PictureTaskArgsSchema)]).optional(),
}).strict()

export const TaskArgsSchema: z.ZodType<Prisma.TaskDefaultArgs> = z.object({
  select: z.lazy(() => TaskSelectSchema).optional(),
  include: z.lazy(() => TaskIncludeSchema).optional(),
}).strict();

export const TaskSelectSchema: z.ZodType<Prisma.TaskSelect> = z.object({
  id: z.boolean().optional(),
  type: z.boolean().optional(),
  endDate: z.boolean().optional(),
  estimatedReward: z.boolean().optional(),
  assignedToId: z.boolean().optional(),
  orderId: z.boolean().optional(),
  assignedTo: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  order: z.union([z.boolean(),z.lazy(() => OrderArgsSchema)]).optional(),
  labelTask: z.union([z.boolean(),z.lazy(() => LabelTaskArgsSchema)]).optional(),
  checkTask: z.union([z.boolean(),z.lazy(() => CheckTaskArgsSchema)]).optional(),
  pictureTask: z.union([z.boolean(),z.lazy(() => PictureTaskArgsSchema)]).optional(),
}).strict()

// LABEL TASK
//------------------------------------------------------

export const LabelTaskIncludeSchema: z.ZodType<Prisma.LabelTaskInclude> = z.object({
  task: z.union([z.boolean(),z.lazy(() => TaskArgsSchema)]).optional(),
  featureLabels: z.union([z.boolean(),z.lazy(() => FeatureLabelFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => LabelTaskCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const LabelTaskArgsSchema: z.ZodType<Prisma.LabelTaskDefaultArgs> = z.object({
  select: z.lazy(() => LabelTaskSelectSchema).optional(),
  include: z.lazy(() => LabelTaskIncludeSchema).optional(),
}).strict();

export const LabelTaskCountOutputTypeArgsSchema: z.ZodType<Prisma.LabelTaskCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => LabelTaskCountOutputTypeSelectSchema).nullish(),
}).strict();

export const LabelTaskCountOutputTypeSelectSchema: z.ZodType<Prisma.LabelTaskCountOutputTypeSelect> = z.object({
  featureLabels: z.boolean().optional(),
}).strict();

export const LabelTaskSelectSchema: z.ZodType<Prisma.LabelTaskSelect> = z.object({
  id: z.boolean().optional(),
  taskId: z.boolean().optional(),
  task: z.union([z.boolean(),z.lazy(() => TaskArgsSchema)]).optional(),
  featureLabels: z.union([z.boolean(),z.lazy(() => FeatureLabelFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => LabelTaskCountOutputTypeArgsSchema)]).optional(),
}).strict()

// FEATURE LABEL
//------------------------------------------------------

export const FeatureLabelIncludeSchema: z.ZodType<Prisma.FeatureLabelInclude> = z.object({
  labelTask: z.union([z.boolean(),z.lazy(() => LabelTaskArgsSchema)]).optional(),
  feature: z.union([z.boolean(),z.lazy(() => FeatureArgsSchema)]).optional(),
}).strict()

export const FeatureLabelArgsSchema: z.ZodType<Prisma.FeatureLabelDefaultArgs> = z.object({
  select: z.lazy(() => FeatureLabelSelectSchema).optional(),
  include: z.lazy(() => FeatureLabelIncludeSchema).optional(),
}).strict();

export const FeatureLabelSelectSchema: z.ZodType<Prisma.FeatureLabelSelect> = z.object({
  id: z.boolean().optional(),
  labelTaskId: z.boolean().optional(),
  featureId: z.boolean().optional(),
  featureLabel: z.boolean().optional(),
  labelTask: z.union([z.boolean(),z.lazy(() => LabelTaskArgsSchema)]).optional(),
  feature: z.union([z.boolean(),z.lazy(() => FeatureArgsSchema)]).optional(),
}).strict()

// CHECK TASK
//------------------------------------------------------

export const CheckTaskIncludeSchema: z.ZodType<Prisma.CheckTaskInclude> = z.object({
  task: z.union([z.boolean(),z.lazy(() => TaskArgsSchema)]).optional(),
  checkFeatures: z.union([z.boolean(),z.lazy(() => CheckFeatureFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CheckTaskCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const CheckTaskArgsSchema: z.ZodType<Prisma.CheckTaskDefaultArgs> = z.object({
  select: z.lazy(() => CheckTaskSelectSchema).optional(),
  include: z.lazy(() => CheckTaskIncludeSchema).optional(),
}).strict();

export const CheckTaskCountOutputTypeArgsSchema: z.ZodType<Prisma.CheckTaskCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CheckTaskCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CheckTaskCountOutputTypeSelectSchema: z.ZodType<Prisma.CheckTaskCountOutputTypeSelect> = z.object({
  checkFeatures: z.boolean().optional(),
}).strict();

export const CheckTaskSelectSchema: z.ZodType<Prisma.CheckTaskSelect> = z.object({
  id: z.boolean().optional(),
  taskId: z.boolean().optional(),
  isCorrect: z.boolean().optional(),
  task: z.union([z.boolean(),z.lazy(() => TaskArgsSchema)]).optional(),
  checkFeatures: z.union([z.boolean(),z.lazy(() => CheckFeatureFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CheckTaskCountOutputTypeArgsSchema)]).optional(),
}).strict()

// CHECK FEATURE
//------------------------------------------------------

export const CheckFeatureIncludeSchema: z.ZodType<Prisma.CheckFeatureInclude> = z.object({
  checkTask: z.union([z.boolean(),z.lazy(() => CheckTaskArgsSchema)]).optional(),
}).strict()

export const CheckFeatureArgsSchema: z.ZodType<Prisma.CheckFeatureDefaultArgs> = z.object({
  select: z.lazy(() => CheckFeatureSelectSchema).optional(),
  include: z.lazy(() => CheckFeatureIncludeSchema).optional(),
}).strict();

export const CheckFeatureSelectSchema: z.ZodType<Prisma.CheckFeatureSelect> = z.object({
  id: z.boolean().optional(),
  checkTaskId: z.boolean().optional(),
  name: z.boolean().optional(),
  label: z.boolean().optional(),
  checkTask: z.union([z.boolean(),z.lazy(() => CheckTaskArgsSchema)]).optional(),
}).strict()

// PICTURE TASK
//------------------------------------------------------

export const PictureTaskIncludeSchema: z.ZodType<Prisma.PictureTaskInclude> = z.object({
  task: z.union([z.boolean(),z.lazy(() => TaskArgsSchema)]).optional(),
}).strict()

export const PictureTaskArgsSchema: z.ZodType<Prisma.PictureTaskDefaultArgs> = z.object({
  select: z.lazy(() => PictureTaskSelectSchema).optional(),
  include: z.lazy(() => PictureTaskIncludeSchema).optional(),
}).strict();

export const PictureTaskSelectSchema: z.ZodType<Prisma.PictureTaskSelect> = z.object({
  id: z.boolean().optional(),
  taskId: z.boolean().optional(),
  exampleImgUrl: z.boolean().optional(),
  task: z.union([z.boolean(),z.lazy(() => TaskArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tasks: z.lazy(() => TaskListRelationFilterSchema).optional()
}).strict() as z.ZodType<Prisma.UserWhereInput>;

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tasks: z.lazy(() => TaskOrderByRelationAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserOrderByWithRelationInput>;

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  tasks: z.lazy(() => TaskListRelationFilterSchema).optional()
}).strict()) as z.ZodType<Prisma.UserWhereUniqueInput>;

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserOrderByWithAggregationInput>;

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict() as z.ZodType<Prisma.UserScalarWhereWithAggregatesInput>;

export const OrderWhereInputSchema: z.ZodType<Prisma.OrderWhereInput> = z.object({
  AND: z.union([ z.lazy(() => OrderWhereInputSchema),z.lazy(() => OrderWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => OrderWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => OrderWhereInputSchema),z.lazy(() => OrderWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  startDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  endDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  status: z.union([ z.lazy(() => EnumOrderStatusFilterSchema),z.lazy(() => OrderStatusSchema) ]).optional(),
  budget: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  labelingLanguage: z.union([ z.lazy(() => EnumLabelingLanguageFilterSchema),z.lazy(() => LabelingLanguageSchema) ]).optional(),
  datasetDescription: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  exampleImageUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  imageGuidelines: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  minSamplesCount: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  currentSamplesCount: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  entryFee: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  reward: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  minContributors: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  contributors: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  features: z.lazy(() => FeatureListRelationFilterSchema).optional(),
  tasks: z.lazy(() => TaskListRelationFilterSchema).optional()
}).strict() as z.ZodType<Prisma.OrderWhereInput>;

export const OrderOrderByWithRelationInputSchema: z.ZodType<Prisma.OrderOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  budget: z.lazy(() => SortOrderSchema).optional(),
  labelingLanguage: z.lazy(() => SortOrderSchema).optional(),
  datasetDescription: z.lazy(() => SortOrderSchema).optional(),
  exampleImageUrl: z.lazy(() => SortOrderSchema).optional(),
  imageGuidelines: z.lazy(() => SortOrderSchema).optional(),
  minSamplesCount: z.lazy(() => SortOrderSchema).optional(),
  currentSamplesCount: z.lazy(() => SortOrderSchema).optional(),
  entryFee: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  reward: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  minContributors: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  contributors: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  features: z.lazy(() => FeatureOrderByRelationAggregateInputSchema).optional(),
  tasks: z.lazy(() => TaskOrderByRelationAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.OrderOrderByWithRelationInput>;

export const OrderWhereUniqueInputSchema: z.ZodType<Prisma.OrderWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => OrderWhereInputSchema),z.lazy(() => OrderWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => OrderWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => OrderWhereInputSchema),z.lazy(() => OrderWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  startDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  endDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  status: z.union([ z.lazy(() => EnumOrderStatusFilterSchema),z.lazy(() => OrderStatusSchema) ]).optional(),
  budget: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  labelingLanguage: z.union([ z.lazy(() => EnumLabelingLanguageFilterSchema),z.lazy(() => LabelingLanguageSchema) ]).optional(),
  datasetDescription: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  exampleImageUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  imageGuidelines: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  minSamplesCount: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  currentSamplesCount: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  entryFee: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  reward: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  minContributors: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  contributors: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  features: z.lazy(() => FeatureListRelationFilterSchema).optional(),
  tasks: z.lazy(() => TaskListRelationFilterSchema).optional()
}).strict()) as z.ZodType<Prisma.OrderWhereUniqueInput>;

export const OrderOrderByWithAggregationInputSchema: z.ZodType<Prisma.OrderOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  budget: z.lazy(() => SortOrderSchema).optional(),
  labelingLanguage: z.lazy(() => SortOrderSchema).optional(),
  datasetDescription: z.lazy(() => SortOrderSchema).optional(),
  exampleImageUrl: z.lazy(() => SortOrderSchema).optional(),
  imageGuidelines: z.lazy(() => SortOrderSchema).optional(),
  minSamplesCount: z.lazy(() => SortOrderSchema).optional(),
  currentSamplesCount: z.lazy(() => SortOrderSchema).optional(),
  entryFee: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  reward: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  minContributors: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  contributors: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
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
  startDate: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  endDate: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  status: z.union([ z.lazy(() => EnumOrderStatusWithAggregatesFilterSchema),z.lazy(() => OrderStatusSchema) ]).optional(),
  budget: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  labelingLanguage: z.union([ z.lazy(() => EnumLabelingLanguageWithAggregatesFilterSchema),z.lazy(() => LabelingLanguageSchema) ]).optional(),
  datasetDescription: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  exampleImageUrl: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  imageGuidelines: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  minSamplesCount: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  currentSamplesCount: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  entryFee: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  reward: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  minContributors: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  contributors: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.OrderScalarWhereWithAggregatesInput>;

export const FeatureWhereInputSchema: z.ZodType<Prisma.FeatureWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FeatureWhereInputSchema),z.lazy(() => FeatureWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FeatureWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FeatureWhereInputSchema),z.lazy(() => FeatureWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  orderId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  labelGuidelines: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  exampleLabel: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  order: z.union([ z.lazy(() => OrderScalarRelationFilterSchema),z.lazy(() => OrderWhereInputSchema) ]).optional(),
  featureLabels: z.lazy(() => FeatureLabelListRelationFilterSchema).optional()
}).strict() as z.ZodType<Prisma.FeatureWhereInput>;

export const FeatureOrderByWithRelationInputSchema: z.ZodType<Prisma.FeatureOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  orderId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  labelGuidelines: z.lazy(() => SortOrderSchema).optional(),
  exampleLabel: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  order: z.lazy(() => OrderOrderByWithRelationInputSchema).optional(),
  featureLabels: z.lazy(() => FeatureLabelOrderByRelationAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.FeatureOrderByWithRelationInput>;

export const FeatureWhereUniqueInputSchema: z.ZodType<Prisma.FeatureWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => FeatureWhereInputSchema),z.lazy(() => FeatureWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FeatureWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FeatureWhereInputSchema),z.lazy(() => FeatureWhereInputSchema).array() ]).optional(),
  orderId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  labelGuidelines: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  exampleLabel: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  order: z.union([ z.lazy(() => OrderScalarRelationFilterSchema),z.lazy(() => OrderWhereInputSchema) ]).optional(),
  featureLabels: z.lazy(() => FeatureLabelListRelationFilterSchema).optional()
}).strict()) as z.ZodType<Prisma.FeatureWhereUniqueInput>;

export const FeatureOrderByWithAggregationInputSchema: z.ZodType<Prisma.FeatureOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  orderId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  labelGuidelines: z.lazy(() => SortOrderSchema).optional(),
  exampleLabel: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => FeatureCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => FeatureAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => FeatureMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => FeatureMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => FeatureSumOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.FeatureOrderByWithAggregationInput>;

export const FeatureScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FeatureScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => FeatureScalarWhereWithAggregatesInputSchema),z.lazy(() => FeatureScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => FeatureScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FeatureScalarWhereWithAggregatesInputSchema),z.lazy(() => FeatureScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  orderId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  labelGuidelines: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  exampleLabel: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.FeatureScalarWhereWithAggregatesInput>;

export const TaskWhereInputSchema: z.ZodType<Prisma.TaskWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TaskWhereInputSchema),z.lazy(() => TaskWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskWhereInputSchema),z.lazy(() => TaskWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumTaskTypeFilterSchema),z.lazy(() => TaskTypeSchema) ]).optional(),
  endDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  estimatedReward: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  assignedToId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  orderId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  assignedTo: z.union([ z.lazy(() => UserNullableScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  order: z.union([ z.lazy(() => OrderScalarRelationFilterSchema),z.lazy(() => OrderWhereInputSchema) ]).optional(),
  labelTask: z.union([ z.lazy(() => LabelTaskNullableScalarRelationFilterSchema),z.lazy(() => LabelTaskWhereInputSchema) ]).optional().nullable(),
  checkTask: z.union([ z.lazy(() => CheckTaskNullableScalarRelationFilterSchema),z.lazy(() => CheckTaskWhereInputSchema) ]).optional().nullable(),
  pictureTask: z.union([ z.lazy(() => PictureTaskNullableScalarRelationFilterSchema),z.lazy(() => PictureTaskWhereInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.TaskWhereInput>;

export const TaskOrderByWithRelationInputSchema: z.ZodType<Prisma.TaskOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  estimatedReward: z.lazy(() => SortOrderSchema).optional(),
  assignedToId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  orderId: z.lazy(() => SortOrderSchema).optional(),
  assignedTo: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  order: z.lazy(() => OrderOrderByWithRelationInputSchema).optional(),
  labelTask: z.lazy(() => LabelTaskOrderByWithRelationInputSchema).optional(),
  checkTask: z.lazy(() => CheckTaskOrderByWithRelationInputSchema).optional(),
  pictureTask: z.lazy(() => PictureTaskOrderByWithRelationInputSchema).optional()
}).strict() as z.ZodType<Prisma.TaskOrderByWithRelationInput>;

export const TaskWhereUniqueInputSchema: z.ZodType<Prisma.TaskWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => TaskWhereInputSchema),z.lazy(() => TaskWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskWhereInputSchema),z.lazy(() => TaskWhereInputSchema).array() ]).optional(),
  type: z.union([ z.lazy(() => EnumTaskTypeFilterSchema),z.lazy(() => TaskTypeSchema) ]).optional(),
  endDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  estimatedReward: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  assignedToId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  orderId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  assignedTo: z.union([ z.lazy(() => UserNullableScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  order: z.union([ z.lazy(() => OrderScalarRelationFilterSchema),z.lazy(() => OrderWhereInputSchema) ]).optional(),
  labelTask: z.union([ z.lazy(() => LabelTaskNullableScalarRelationFilterSchema),z.lazy(() => LabelTaskWhereInputSchema) ]).optional().nullable(),
  checkTask: z.union([ z.lazy(() => CheckTaskNullableScalarRelationFilterSchema),z.lazy(() => CheckTaskWhereInputSchema) ]).optional().nullable(),
  pictureTask: z.union([ z.lazy(() => PictureTaskNullableScalarRelationFilterSchema),z.lazy(() => PictureTaskWhereInputSchema) ]).optional().nullable(),
}).strict()) as z.ZodType<Prisma.TaskWhereUniqueInput>;

export const TaskOrderByWithAggregationInputSchema: z.ZodType<Prisma.TaskOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  estimatedReward: z.lazy(() => SortOrderSchema).optional(),
  assignedToId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  orderId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TaskCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => TaskAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TaskMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TaskMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => TaskSumOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.TaskOrderByWithAggregationInput>;

export const TaskScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TaskScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TaskScalarWhereWithAggregatesInputSchema),z.lazy(() => TaskScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskScalarWhereWithAggregatesInputSchema),z.lazy(() => TaskScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumTaskTypeWithAggregatesFilterSchema),z.lazy(() => TaskTypeSchema) ]).optional(),
  endDate: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  estimatedReward: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  assignedToId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  orderId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict() as z.ZodType<Prisma.TaskScalarWhereWithAggregatesInput>;

export const LabelTaskWhereInputSchema: z.ZodType<Prisma.LabelTaskWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LabelTaskWhereInputSchema),z.lazy(() => LabelTaskWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LabelTaskWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LabelTaskWhereInputSchema),z.lazy(() => LabelTaskWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  taskId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  task: z.union([ z.lazy(() => TaskScalarRelationFilterSchema),z.lazy(() => TaskWhereInputSchema) ]).optional(),
  featureLabels: z.lazy(() => FeatureLabelListRelationFilterSchema).optional()
}).strict() as z.ZodType<Prisma.LabelTaskWhereInput>;

export const LabelTaskOrderByWithRelationInputSchema: z.ZodType<Prisma.LabelTaskOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  taskId: z.lazy(() => SortOrderSchema).optional(),
  task: z.lazy(() => TaskOrderByWithRelationInputSchema).optional(),
  featureLabels: z.lazy(() => FeatureLabelOrderByRelationAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.LabelTaskOrderByWithRelationInput>;

export const LabelTaskWhereUniqueInputSchema: z.ZodType<Prisma.LabelTaskWhereUniqueInput> = z.union([
  z.object({
    id: z.string().uuid(),
    taskId: z.string()
  }),
  z.object({
    id: z.string().uuid(),
  }),
  z.object({
    taskId: z.string(),
  }),
])
.and(z.object({
  id: z.string().uuid().optional(),
  taskId: z.string().optional(),
  AND: z.union([ z.lazy(() => LabelTaskWhereInputSchema),z.lazy(() => LabelTaskWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LabelTaskWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LabelTaskWhereInputSchema),z.lazy(() => LabelTaskWhereInputSchema).array() ]).optional(),
  task: z.union([ z.lazy(() => TaskScalarRelationFilterSchema),z.lazy(() => TaskWhereInputSchema) ]).optional(),
  featureLabels: z.lazy(() => FeatureLabelListRelationFilterSchema).optional()
}).strict()) as z.ZodType<Prisma.LabelTaskWhereUniqueInput>;

export const LabelTaskOrderByWithAggregationInputSchema: z.ZodType<Prisma.LabelTaskOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  taskId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => LabelTaskCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => LabelTaskMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => LabelTaskMinOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.LabelTaskOrderByWithAggregationInput>;

export const LabelTaskScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.LabelTaskScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => LabelTaskScalarWhereWithAggregatesInputSchema),z.lazy(() => LabelTaskScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => LabelTaskScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LabelTaskScalarWhereWithAggregatesInputSchema),z.lazy(() => LabelTaskScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  taskId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict() as z.ZodType<Prisma.LabelTaskScalarWhereWithAggregatesInput>;

export const FeatureLabelWhereInputSchema: z.ZodType<Prisma.FeatureLabelWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FeatureLabelWhereInputSchema),z.lazy(() => FeatureLabelWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FeatureLabelWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FeatureLabelWhereInputSchema),z.lazy(() => FeatureLabelWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  labelTaskId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  featureId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  featureLabel: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  labelTask: z.union([ z.lazy(() => LabelTaskScalarRelationFilterSchema),z.lazy(() => LabelTaskWhereInputSchema) ]).optional(),
  feature: z.union([ z.lazy(() => FeatureScalarRelationFilterSchema),z.lazy(() => FeatureWhereInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.FeatureLabelWhereInput>;

export const FeatureLabelOrderByWithRelationInputSchema: z.ZodType<Prisma.FeatureLabelOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  labelTaskId: z.lazy(() => SortOrderSchema).optional(),
  featureId: z.lazy(() => SortOrderSchema).optional(),
  featureLabel: z.lazy(() => SortOrderSchema).optional(),
  labelTask: z.lazy(() => LabelTaskOrderByWithRelationInputSchema).optional(),
  feature: z.lazy(() => FeatureOrderByWithRelationInputSchema).optional()
}).strict() as z.ZodType<Prisma.FeatureLabelOrderByWithRelationInput>;

export const FeatureLabelWhereUniqueInputSchema: z.ZodType<Prisma.FeatureLabelWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => FeatureLabelWhereInputSchema),z.lazy(() => FeatureLabelWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FeatureLabelWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FeatureLabelWhereInputSchema),z.lazy(() => FeatureLabelWhereInputSchema).array() ]).optional(),
  labelTaskId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  featureId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  featureLabel: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  labelTask: z.union([ z.lazy(() => LabelTaskScalarRelationFilterSchema),z.lazy(() => LabelTaskWhereInputSchema) ]).optional(),
  feature: z.union([ z.lazy(() => FeatureScalarRelationFilterSchema),z.lazy(() => FeatureWhereInputSchema) ]).optional(),
}).strict()) as z.ZodType<Prisma.FeatureLabelWhereUniqueInput>;

export const FeatureLabelOrderByWithAggregationInputSchema: z.ZodType<Prisma.FeatureLabelOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  labelTaskId: z.lazy(() => SortOrderSchema).optional(),
  featureId: z.lazy(() => SortOrderSchema).optional(),
  featureLabel: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => FeatureLabelCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => FeatureLabelAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => FeatureLabelMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => FeatureLabelMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => FeatureLabelSumOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.FeatureLabelOrderByWithAggregationInput>;

export const FeatureLabelScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FeatureLabelScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => FeatureLabelScalarWhereWithAggregatesInputSchema),z.lazy(() => FeatureLabelScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => FeatureLabelScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FeatureLabelScalarWhereWithAggregatesInputSchema),z.lazy(() => FeatureLabelScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  labelTaskId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  featureId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  featureLabel: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict() as z.ZodType<Prisma.FeatureLabelScalarWhereWithAggregatesInput>;

export const CheckTaskWhereInputSchema: z.ZodType<Prisma.CheckTaskWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CheckTaskWhereInputSchema),z.lazy(() => CheckTaskWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CheckTaskWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CheckTaskWhereInputSchema),z.lazy(() => CheckTaskWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  taskId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isCorrect: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  task: z.union([ z.lazy(() => TaskScalarRelationFilterSchema),z.lazy(() => TaskWhereInputSchema) ]).optional(),
  checkFeatures: z.lazy(() => CheckFeatureListRelationFilterSchema).optional()
}).strict() as z.ZodType<Prisma.CheckTaskWhereInput>;

export const CheckTaskOrderByWithRelationInputSchema: z.ZodType<Prisma.CheckTaskOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  taskId: z.lazy(() => SortOrderSchema).optional(),
  isCorrect: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  task: z.lazy(() => TaskOrderByWithRelationInputSchema).optional(),
  checkFeatures: z.lazy(() => CheckFeatureOrderByRelationAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.CheckTaskOrderByWithRelationInput>;

export const CheckTaskWhereUniqueInputSchema: z.ZodType<Prisma.CheckTaskWhereUniqueInput> = z.union([
  z.object({
    id: z.string().uuid(),
    taskId: z.string()
  }),
  z.object({
    id: z.string().uuid(),
  }),
  z.object({
    taskId: z.string(),
  }),
])
.and(z.object({
  id: z.string().uuid().optional(),
  taskId: z.string().optional(),
  AND: z.union([ z.lazy(() => CheckTaskWhereInputSchema),z.lazy(() => CheckTaskWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CheckTaskWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CheckTaskWhereInputSchema),z.lazy(() => CheckTaskWhereInputSchema).array() ]).optional(),
  isCorrect: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  task: z.union([ z.lazy(() => TaskScalarRelationFilterSchema),z.lazy(() => TaskWhereInputSchema) ]).optional(),
  checkFeatures: z.lazy(() => CheckFeatureListRelationFilterSchema).optional()
}).strict()) as z.ZodType<Prisma.CheckTaskWhereUniqueInput>;

export const CheckTaskOrderByWithAggregationInputSchema: z.ZodType<Prisma.CheckTaskOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  taskId: z.lazy(() => SortOrderSchema).optional(),
  isCorrect: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => CheckTaskCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CheckTaskMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CheckTaskMinOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.CheckTaskOrderByWithAggregationInput>;

export const CheckTaskScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CheckTaskScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CheckTaskScalarWhereWithAggregatesInputSchema),z.lazy(() => CheckTaskScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CheckTaskScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CheckTaskScalarWhereWithAggregatesInputSchema),z.lazy(() => CheckTaskScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  taskId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  isCorrect: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.CheckTaskScalarWhereWithAggregatesInput>;

export const CheckFeatureWhereInputSchema: z.ZodType<Prisma.CheckFeatureWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CheckFeatureWhereInputSchema),z.lazy(() => CheckFeatureWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CheckFeatureWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CheckFeatureWhereInputSchema),z.lazy(() => CheckFeatureWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  checkTaskId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  label: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  checkTask: z.union([ z.lazy(() => CheckTaskScalarRelationFilterSchema),z.lazy(() => CheckTaskWhereInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CheckFeatureWhereInput>;

export const CheckFeatureOrderByWithRelationInputSchema: z.ZodType<Prisma.CheckFeatureOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  checkTaskId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  checkTask: z.lazy(() => CheckTaskOrderByWithRelationInputSchema).optional()
}).strict() as z.ZodType<Prisma.CheckFeatureOrderByWithRelationInput>;

export const CheckFeatureWhereUniqueInputSchema: z.ZodType<Prisma.CheckFeatureWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => CheckFeatureWhereInputSchema),z.lazy(() => CheckFeatureWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CheckFeatureWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CheckFeatureWhereInputSchema),z.lazy(() => CheckFeatureWhereInputSchema).array() ]).optional(),
  checkTaskId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  label: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  checkTask: z.union([ z.lazy(() => CheckTaskScalarRelationFilterSchema),z.lazy(() => CheckTaskWhereInputSchema) ]).optional(),
}).strict()) as z.ZodType<Prisma.CheckFeatureWhereUniqueInput>;

export const CheckFeatureOrderByWithAggregationInputSchema: z.ZodType<Prisma.CheckFeatureOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  checkTaskId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CheckFeatureCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => CheckFeatureAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CheckFeatureMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CheckFeatureMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => CheckFeatureSumOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.CheckFeatureOrderByWithAggregationInput>;

export const CheckFeatureScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CheckFeatureScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CheckFeatureScalarWhereWithAggregatesInputSchema),z.lazy(() => CheckFeatureScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CheckFeatureScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CheckFeatureScalarWhereWithAggregatesInputSchema),z.lazy(() => CheckFeatureScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  checkTaskId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  label: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict() as z.ZodType<Prisma.CheckFeatureScalarWhereWithAggregatesInput>;

export const PictureTaskWhereInputSchema: z.ZodType<Prisma.PictureTaskWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PictureTaskWhereInputSchema),z.lazy(() => PictureTaskWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PictureTaskWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PictureTaskWhereInputSchema),z.lazy(() => PictureTaskWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  taskId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  exampleImgUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  task: z.union([ z.lazy(() => TaskScalarRelationFilterSchema),z.lazy(() => TaskWhereInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.PictureTaskWhereInput>;

export const PictureTaskOrderByWithRelationInputSchema: z.ZodType<Prisma.PictureTaskOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  taskId: z.lazy(() => SortOrderSchema).optional(),
  exampleImgUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  task: z.lazy(() => TaskOrderByWithRelationInputSchema).optional()
}).strict() as z.ZodType<Prisma.PictureTaskOrderByWithRelationInput>;

export const PictureTaskWhereUniqueInputSchema: z.ZodType<Prisma.PictureTaskWhereUniqueInput> = z.union([
  z.object({
    id: z.string().uuid(),
    taskId: z.string()
  }),
  z.object({
    id: z.string().uuid(),
  }),
  z.object({
    taskId: z.string(),
  }),
])
.and(z.object({
  id: z.string().uuid().optional(),
  taskId: z.string().optional(),
  AND: z.union([ z.lazy(() => PictureTaskWhereInputSchema),z.lazy(() => PictureTaskWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PictureTaskWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PictureTaskWhereInputSchema),z.lazy(() => PictureTaskWhereInputSchema).array() ]).optional(),
  exampleImgUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  task: z.union([ z.lazy(() => TaskScalarRelationFilterSchema),z.lazy(() => TaskWhereInputSchema) ]).optional(),
}).strict()) as z.ZodType<Prisma.PictureTaskWhereUniqueInput>;

export const PictureTaskOrderByWithAggregationInputSchema: z.ZodType<Prisma.PictureTaskOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  taskId: z.lazy(() => SortOrderSchema).optional(),
  exampleImgUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => PictureTaskCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PictureTaskMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PictureTaskMinOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.PictureTaskOrderByWithAggregationInput>;

export const PictureTaskScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PictureTaskScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PictureTaskScalarWhereWithAggregatesInputSchema),z.lazy(() => PictureTaskScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PictureTaskScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PictureTaskScalarWhereWithAggregatesInputSchema),z.lazy(() => PictureTaskScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  taskId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  exampleImgUrl: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.PictureTaskScalarWhereWithAggregatesInput>;

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().uuid().optional(),
  tasks: z.lazy(() => TaskCreateNestedManyWithoutAssignedToInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserCreateInput>;

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  tasks: z.lazy(() => TaskUncheckedCreateNestedManyWithoutAssignedToInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUncheckedCreateInput>;

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tasks: z.lazy(() => TaskUpdateManyWithoutAssignedToNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUpdateInput>;

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tasks: z.lazy(() => TaskUncheckedUpdateManyWithoutAssignedToNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUncheckedUpdateInput>;

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().uuid().optional()
}).strict() as z.ZodType<Prisma.UserCreateManyInput>;

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.UserUpdateManyMutationInput>;

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.UserUncheckedUpdateManyInput>;

export const OrderCreateInputSchema: z.ZodType<Prisma.OrderCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  status: z.lazy(() => OrderStatusSchema).optional(),
  budget: z.number(),
  labelingLanguage: z.lazy(() => LabelingLanguageSchema),
  datasetDescription: z.string(),
  exampleImageUrl: z.string(),
  imageGuidelines: z.string(),
  minSamplesCount: z.number().int(),
  currentSamplesCount: z.number().int().optional(),
  entryFee: z.number().optional().nullable(),
  reward: z.number().optional().nullable(),
  minContributors: z.number().int().optional().nullable(),
  contributors: z.number().int().optional().nullable(),
  features: z.lazy(() => FeatureCreateNestedManyWithoutOrderInputSchema).optional(),
  tasks: z.lazy(() => TaskCreateNestedManyWithoutOrderInputSchema).optional()
}).strict() as z.ZodType<Prisma.OrderCreateInput>;

export const OrderUncheckedCreateInputSchema: z.ZodType<Prisma.OrderUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  status: z.lazy(() => OrderStatusSchema).optional(),
  budget: z.number(),
  labelingLanguage: z.lazy(() => LabelingLanguageSchema),
  datasetDescription: z.string(),
  exampleImageUrl: z.string(),
  imageGuidelines: z.string(),
  minSamplesCount: z.number().int(),
  currentSamplesCount: z.number().int().optional(),
  entryFee: z.number().optional().nullable(),
  reward: z.number().optional().nullable(),
  minContributors: z.number().int().optional().nullable(),
  contributors: z.number().int().optional().nullable(),
  features: z.lazy(() => FeatureUncheckedCreateNestedManyWithoutOrderInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedCreateNestedManyWithoutOrderInputSchema).optional()
}).strict() as z.ZodType<Prisma.OrderUncheckedCreateInput>;

export const OrderUpdateInputSchema: z.ZodType<Prisma.OrderUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => OrderStatusSchema),z.lazy(() => EnumOrderStatusFieldUpdateOperationsInputSchema) ]).optional(),
  budget: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  labelingLanguage: z.union([ z.lazy(() => LabelingLanguageSchema),z.lazy(() => EnumLabelingLanguageFieldUpdateOperationsInputSchema) ]).optional(),
  datasetDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  exampleImageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageGuidelines: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  minSamplesCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  currentSamplesCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  entryFee: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reward: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  minContributors: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contributors: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  features: z.lazy(() => FeatureUpdateManyWithoutOrderNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUpdateManyWithoutOrderNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.OrderUpdateInput>;

export const OrderUncheckedUpdateInputSchema: z.ZodType<Prisma.OrderUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => OrderStatusSchema),z.lazy(() => EnumOrderStatusFieldUpdateOperationsInputSchema) ]).optional(),
  budget: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  labelingLanguage: z.union([ z.lazy(() => LabelingLanguageSchema),z.lazy(() => EnumLabelingLanguageFieldUpdateOperationsInputSchema) ]).optional(),
  datasetDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  exampleImageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageGuidelines: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  minSamplesCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  currentSamplesCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  entryFee: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reward: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  minContributors: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contributors: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  features: z.lazy(() => FeatureUncheckedUpdateManyWithoutOrderNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedUpdateManyWithoutOrderNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.OrderUncheckedUpdateInput>;

export const OrderCreateManyInputSchema: z.ZodType<Prisma.OrderCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  status: z.lazy(() => OrderStatusSchema).optional(),
  budget: z.number(),
  labelingLanguage: z.lazy(() => LabelingLanguageSchema),
  datasetDescription: z.string(),
  exampleImageUrl: z.string(),
  imageGuidelines: z.string(),
  minSamplesCount: z.number().int(),
  currentSamplesCount: z.number().int().optional(),
  entryFee: z.number().optional().nullable(),
  reward: z.number().optional().nullable(),
  minContributors: z.number().int().optional().nullable(),
  contributors: z.number().int().optional().nullable()
}).strict() as z.ZodType<Prisma.OrderCreateManyInput>;

export const OrderUpdateManyMutationInputSchema: z.ZodType<Prisma.OrderUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => OrderStatusSchema),z.lazy(() => EnumOrderStatusFieldUpdateOperationsInputSchema) ]).optional(),
  budget: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  labelingLanguage: z.union([ z.lazy(() => LabelingLanguageSchema),z.lazy(() => EnumLabelingLanguageFieldUpdateOperationsInputSchema) ]).optional(),
  datasetDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  exampleImageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageGuidelines: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  minSamplesCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  currentSamplesCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  entryFee: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reward: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  minContributors: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contributors: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.OrderUpdateManyMutationInput>;

export const OrderUncheckedUpdateManyInputSchema: z.ZodType<Prisma.OrderUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => OrderStatusSchema),z.lazy(() => EnumOrderStatusFieldUpdateOperationsInputSchema) ]).optional(),
  budget: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  labelingLanguage: z.union([ z.lazy(() => LabelingLanguageSchema),z.lazy(() => EnumLabelingLanguageFieldUpdateOperationsInputSchema) ]).optional(),
  datasetDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  exampleImageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageGuidelines: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  minSamplesCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  currentSamplesCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  entryFee: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reward: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  minContributors: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contributors: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.OrderUncheckedUpdateManyInput>;

export const FeatureCreateInputSchema: z.ZodType<Prisma.FeatureCreateInput> = z.object({
  name: z.string(),
  labelGuidelines: z.string(),
  exampleLabel: z.string().optional().nullable(),
  order: z.lazy(() => OrderCreateNestedOneWithoutFeaturesInputSchema),
  featureLabels: z.lazy(() => FeatureLabelCreateNestedManyWithoutFeatureInputSchema).optional()
}).strict() as z.ZodType<Prisma.FeatureCreateInput>;

export const FeatureUncheckedCreateInputSchema: z.ZodType<Prisma.FeatureUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  orderId: z.string(),
  name: z.string(),
  labelGuidelines: z.string(),
  exampleLabel: z.string().optional().nullable(),
  featureLabels: z.lazy(() => FeatureLabelUncheckedCreateNestedManyWithoutFeatureInputSchema).optional()
}).strict() as z.ZodType<Prisma.FeatureUncheckedCreateInput>;

export const FeatureUpdateInputSchema: z.ZodType<Prisma.FeatureUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  labelGuidelines: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  exampleLabel: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order: z.lazy(() => OrderUpdateOneRequiredWithoutFeaturesNestedInputSchema).optional(),
  featureLabels: z.lazy(() => FeatureLabelUpdateManyWithoutFeatureNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.FeatureUpdateInput>;

export const FeatureUncheckedUpdateInputSchema: z.ZodType<Prisma.FeatureUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  orderId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  labelGuidelines: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  exampleLabel: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  featureLabels: z.lazy(() => FeatureLabelUncheckedUpdateManyWithoutFeatureNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.FeatureUncheckedUpdateInput>;

export const FeatureCreateManyInputSchema: z.ZodType<Prisma.FeatureCreateManyInput> = z.object({
  id: z.number().int().optional(),
  orderId: z.string(),
  name: z.string(),
  labelGuidelines: z.string(),
  exampleLabel: z.string().optional().nullable()
}).strict() as z.ZodType<Prisma.FeatureCreateManyInput>;

export const FeatureUpdateManyMutationInputSchema: z.ZodType<Prisma.FeatureUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  labelGuidelines: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  exampleLabel: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.FeatureUpdateManyMutationInput>;

export const FeatureUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FeatureUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  orderId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  labelGuidelines: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  exampleLabel: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.FeatureUncheckedUpdateManyInput>;

export const TaskCreateInputSchema: z.ZodType<Prisma.TaskCreateInput> = z.object({
  id: z.string().uuid().optional(),
  type: z.lazy(() => TaskTypeSchema),
  endDate: z.coerce.date(),
  estimatedReward: z.number(),
  assignedTo: z.lazy(() => UserCreateNestedOneWithoutTasksInputSchema).optional(),
  order: z.lazy(() => OrderCreateNestedOneWithoutTasksInputSchema),
  labelTask: z.lazy(() => LabelTaskCreateNestedOneWithoutTaskInputSchema).optional(),
  checkTask: z.lazy(() => CheckTaskCreateNestedOneWithoutTaskInputSchema).optional(),
  pictureTask: z.lazy(() => PictureTaskCreateNestedOneWithoutTaskInputSchema).optional()
}).strict() as z.ZodType<Prisma.TaskCreateInput>;

export const TaskUncheckedCreateInputSchema: z.ZodType<Prisma.TaskUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  type: z.lazy(() => TaskTypeSchema),
  endDate: z.coerce.date(),
  estimatedReward: z.number(),
  assignedToId: z.string().optional().nullable(),
  orderId: z.string(),
  labelTask: z.lazy(() => LabelTaskUncheckedCreateNestedOneWithoutTaskInputSchema).optional(),
  checkTask: z.lazy(() => CheckTaskUncheckedCreateNestedOneWithoutTaskInputSchema).optional(),
  pictureTask: z.lazy(() => PictureTaskUncheckedCreateNestedOneWithoutTaskInputSchema).optional()
}).strict() as z.ZodType<Prisma.TaskUncheckedCreateInput>;

export const TaskUpdateInputSchema: z.ZodType<Prisma.TaskUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TaskTypeSchema),z.lazy(() => EnumTaskTypeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedReward: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  assignedTo: z.lazy(() => UserUpdateOneWithoutTasksNestedInputSchema).optional(),
  order: z.lazy(() => OrderUpdateOneRequiredWithoutTasksNestedInputSchema).optional(),
  labelTask: z.lazy(() => LabelTaskUpdateOneWithoutTaskNestedInputSchema).optional(),
  checkTask: z.lazy(() => CheckTaskUpdateOneWithoutTaskNestedInputSchema).optional(),
  pictureTask: z.lazy(() => PictureTaskUpdateOneWithoutTaskNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.TaskUpdateInput>;

export const TaskUncheckedUpdateInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TaskTypeSchema),z.lazy(() => EnumTaskTypeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedReward: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  assignedToId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  orderId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  labelTask: z.lazy(() => LabelTaskUncheckedUpdateOneWithoutTaskNestedInputSchema).optional(),
  checkTask: z.lazy(() => CheckTaskUncheckedUpdateOneWithoutTaskNestedInputSchema).optional(),
  pictureTask: z.lazy(() => PictureTaskUncheckedUpdateOneWithoutTaskNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.TaskUncheckedUpdateInput>;

export const TaskCreateManyInputSchema: z.ZodType<Prisma.TaskCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  type: z.lazy(() => TaskTypeSchema),
  endDate: z.coerce.date(),
  estimatedReward: z.number(),
  assignedToId: z.string().optional().nullable(),
  orderId: z.string()
}).strict() as z.ZodType<Prisma.TaskCreateManyInput>;

export const TaskUpdateManyMutationInputSchema: z.ZodType<Prisma.TaskUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TaskTypeSchema),z.lazy(() => EnumTaskTypeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedReward: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.TaskUpdateManyMutationInput>;

export const TaskUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TaskTypeSchema),z.lazy(() => EnumTaskTypeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedReward: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  assignedToId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  orderId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.TaskUncheckedUpdateManyInput>;

export const LabelTaskCreateInputSchema: z.ZodType<Prisma.LabelTaskCreateInput> = z.object({
  id: z.string().uuid().optional(),
  task: z.lazy(() => TaskCreateNestedOneWithoutLabelTaskInputSchema),
  featureLabels: z.lazy(() => FeatureLabelCreateNestedManyWithoutLabelTaskInputSchema).optional()
}).strict() as z.ZodType<Prisma.LabelTaskCreateInput>;

export const LabelTaskUncheckedCreateInputSchema: z.ZodType<Prisma.LabelTaskUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  taskId: z.string(),
  featureLabels: z.lazy(() => FeatureLabelUncheckedCreateNestedManyWithoutLabelTaskInputSchema).optional()
}).strict() as z.ZodType<Prisma.LabelTaskUncheckedCreateInput>;

export const LabelTaskUpdateInputSchema: z.ZodType<Prisma.LabelTaskUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  task: z.lazy(() => TaskUpdateOneRequiredWithoutLabelTaskNestedInputSchema).optional(),
  featureLabels: z.lazy(() => FeatureLabelUpdateManyWithoutLabelTaskNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.LabelTaskUpdateInput>;

export const LabelTaskUncheckedUpdateInputSchema: z.ZodType<Prisma.LabelTaskUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  taskId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  featureLabels: z.lazy(() => FeatureLabelUncheckedUpdateManyWithoutLabelTaskNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.LabelTaskUncheckedUpdateInput>;

export const LabelTaskCreateManyInputSchema: z.ZodType<Prisma.LabelTaskCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  taskId: z.string()
}).strict() as z.ZodType<Prisma.LabelTaskCreateManyInput>;

export const LabelTaskUpdateManyMutationInputSchema: z.ZodType<Prisma.LabelTaskUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.LabelTaskUpdateManyMutationInput>;

export const LabelTaskUncheckedUpdateManyInputSchema: z.ZodType<Prisma.LabelTaskUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  taskId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.LabelTaskUncheckedUpdateManyInput>;

export const FeatureLabelCreateInputSchema: z.ZodType<Prisma.FeatureLabelCreateInput> = z.object({
  featureLabel: z.string(),
  labelTask: z.lazy(() => LabelTaskCreateNestedOneWithoutFeatureLabelsInputSchema),
  feature: z.lazy(() => FeatureCreateNestedOneWithoutFeatureLabelsInputSchema)
}).strict() as z.ZodType<Prisma.FeatureLabelCreateInput>;

export const FeatureLabelUncheckedCreateInputSchema: z.ZodType<Prisma.FeatureLabelUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  labelTaskId: z.string(),
  featureId: z.number().int(),
  featureLabel: z.string()
}).strict() as z.ZodType<Prisma.FeatureLabelUncheckedCreateInput>;

export const FeatureLabelUpdateInputSchema: z.ZodType<Prisma.FeatureLabelUpdateInput> = z.object({
  featureLabel: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  labelTask: z.lazy(() => LabelTaskUpdateOneRequiredWithoutFeatureLabelsNestedInputSchema).optional(),
  feature: z.lazy(() => FeatureUpdateOneRequiredWithoutFeatureLabelsNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.FeatureLabelUpdateInput>;

export const FeatureLabelUncheckedUpdateInputSchema: z.ZodType<Prisma.FeatureLabelUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  labelTaskId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  featureId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  featureLabel: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.FeatureLabelUncheckedUpdateInput>;

export const FeatureLabelCreateManyInputSchema: z.ZodType<Prisma.FeatureLabelCreateManyInput> = z.object({
  id: z.number().int().optional(),
  labelTaskId: z.string(),
  featureId: z.number().int(),
  featureLabel: z.string()
}).strict() as z.ZodType<Prisma.FeatureLabelCreateManyInput>;

export const FeatureLabelUpdateManyMutationInputSchema: z.ZodType<Prisma.FeatureLabelUpdateManyMutationInput> = z.object({
  featureLabel: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.FeatureLabelUpdateManyMutationInput>;

export const FeatureLabelUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FeatureLabelUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  labelTaskId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  featureId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  featureLabel: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.FeatureLabelUncheckedUpdateManyInput>;

export const CheckTaskCreateInputSchema: z.ZodType<Prisma.CheckTaskCreateInput> = z.object({
  id: z.string().uuid().optional(),
  isCorrect: z.boolean().optional().nullable(),
  task: z.lazy(() => TaskCreateNestedOneWithoutCheckTaskInputSchema),
  checkFeatures: z.lazy(() => CheckFeatureCreateNestedManyWithoutCheckTaskInputSchema).optional()
}).strict() as z.ZodType<Prisma.CheckTaskCreateInput>;

export const CheckTaskUncheckedCreateInputSchema: z.ZodType<Prisma.CheckTaskUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  taskId: z.string(),
  isCorrect: z.boolean().optional().nullable(),
  checkFeatures: z.lazy(() => CheckFeatureUncheckedCreateNestedManyWithoutCheckTaskInputSchema).optional()
}).strict() as z.ZodType<Prisma.CheckTaskUncheckedCreateInput>;

export const CheckTaskUpdateInputSchema: z.ZodType<Prisma.CheckTaskUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isCorrect: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  task: z.lazy(() => TaskUpdateOneRequiredWithoutCheckTaskNestedInputSchema).optional(),
  checkFeatures: z.lazy(() => CheckFeatureUpdateManyWithoutCheckTaskNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.CheckTaskUpdateInput>;

export const CheckTaskUncheckedUpdateInputSchema: z.ZodType<Prisma.CheckTaskUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  taskId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isCorrect: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  checkFeatures: z.lazy(() => CheckFeatureUncheckedUpdateManyWithoutCheckTaskNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.CheckTaskUncheckedUpdateInput>;

export const CheckTaskCreateManyInputSchema: z.ZodType<Prisma.CheckTaskCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  taskId: z.string(),
  isCorrect: z.boolean().optional().nullable()
}).strict() as z.ZodType<Prisma.CheckTaskCreateManyInput>;

export const CheckTaskUpdateManyMutationInputSchema: z.ZodType<Prisma.CheckTaskUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isCorrect: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.CheckTaskUpdateManyMutationInput>;

export const CheckTaskUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CheckTaskUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  taskId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isCorrect: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.CheckTaskUncheckedUpdateManyInput>;

export const CheckFeatureCreateInputSchema: z.ZodType<Prisma.CheckFeatureCreateInput> = z.object({
  name: z.string(),
  label: z.string(),
  checkTask: z.lazy(() => CheckTaskCreateNestedOneWithoutCheckFeaturesInputSchema)
}).strict() as z.ZodType<Prisma.CheckFeatureCreateInput>;

export const CheckFeatureUncheckedCreateInputSchema: z.ZodType<Prisma.CheckFeatureUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  checkTaskId: z.string(),
  name: z.string(),
  label: z.string()
}).strict() as z.ZodType<Prisma.CheckFeatureUncheckedCreateInput>;

export const CheckFeatureUpdateInputSchema: z.ZodType<Prisma.CheckFeatureUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  checkTask: z.lazy(() => CheckTaskUpdateOneRequiredWithoutCheckFeaturesNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.CheckFeatureUpdateInput>;

export const CheckFeatureUncheckedUpdateInputSchema: z.ZodType<Prisma.CheckFeatureUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  checkTaskId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CheckFeatureUncheckedUpdateInput>;

export const CheckFeatureCreateManyInputSchema: z.ZodType<Prisma.CheckFeatureCreateManyInput> = z.object({
  id: z.number().int().optional(),
  checkTaskId: z.string(),
  name: z.string(),
  label: z.string()
}).strict() as z.ZodType<Prisma.CheckFeatureCreateManyInput>;

export const CheckFeatureUpdateManyMutationInputSchema: z.ZodType<Prisma.CheckFeatureUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CheckFeatureUpdateManyMutationInput>;

export const CheckFeatureUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CheckFeatureUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  checkTaskId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CheckFeatureUncheckedUpdateManyInput>;

export const PictureTaskCreateInputSchema: z.ZodType<Prisma.PictureTaskCreateInput> = z.object({
  id: z.string().uuid().optional(),
  exampleImgUrl: z.string().optional().nullable(),
  task: z.lazy(() => TaskCreateNestedOneWithoutPictureTaskInputSchema)
}).strict() as z.ZodType<Prisma.PictureTaskCreateInput>;

export const PictureTaskUncheckedCreateInputSchema: z.ZodType<Prisma.PictureTaskUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  taskId: z.string(),
  exampleImgUrl: z.string().optional().nullable()
}).strict() as z.ZodType<Prisma.PictureTaskUncheckedCreateInput>;

export const PictureTaskUpdateInputSchema: z.ZodType<Prisma.PictureTaskUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  exampleImgUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  task: z.lazy(() => TaskUpdateOneRequiredWithoutPictureTaskNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.PictureTaskUpdateInput>;

export const PictureTaskUncheckedUpdateInputSchema: z.ZodType<Prisma.PictureTaskUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  taskId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  exampleImgUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.PictureTaskUncheckedUpdateInput>;

export const PictureTaskCreateManyInputSchema: z.ZodType<Prisma.PictureTaskCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  taskId: z.string(),
  exampleImgUrl: z.string().optional().nullable()
}).strict() as z.ZodType<Prisma.PictureTaskCreateManyInput>;

export const PictureTaskUpdateManyMutationInputSchema: z.ZodType<Prisma.PictureTaskUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  exampleImgUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.PictureTaskUpdateManyMutationInput>;

export const PictureTaskUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PictureTaskUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  taskId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  exampleImgUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.PictureTaskUncheckedUpdateManyInput>;

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

export const TaskListRelationFilterSchema: z.ZodType<Prisma.TaskListRelationFilter> = z.object({
  every: z.lazy(() => TaskWhereInputSchema).optional(),
  some: z.lazy(() => TaskWhereInputSchema).optional(),
  none: z.lazy(() => TaskWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.TaskListRelationFilter>;

export const TaskOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TaskOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.TaskOrderByRelationAggregateInput>;

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.UserCountOrderByAggregateInput>;

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.UserMaxOrderByAggregateInput>;

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.UserMinOrderByAggregateInput>;

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

export const EnumOrderStatusFilterSchema: z.ZodType<Prisma.EnumOrderStatusFilter> = z.object({
  equals: z.lazy(() => OrderStatusSchema).optional(),
  in: z.lazy(() => OrderStatusSchema).array().optional(),
  notIn: z.lazy(() => OrderStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => OrderStatusSchema),z.lazy(() => NestedEnumOrderStatusFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.EnumOrderStatusFilter>;

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.FloatFilter>;

export const EnumLabelingLanguageFilterSchema: z.ZodType<Prisma.EnumLabelingLanguageFilter> = z.object({
  equals: z.lazy(() => LabelingLanguageSchema).optional(),
  in: z.lazy(() => LabelingLanguageSchema).array().optional(),
  notIn: z.lazy(() => LabelingLanguageSchema).array().optional(),
  not: z.union([ z.lazy(() => LabelingLanguageSchema),z.lazy(() => NestedEnumLabelingLanguageFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.EnumLabelingLanguageFilter>;

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

export const FloatNullableFilterSchema: z.ZodType<Prisma.FloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.FloatNullableFilter>;

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.IntNullableFilter>;

export const FeatureListRelationFilterSchema: z.ZodType<Prisma.FeatureListRelationFilter> = z.object({
  every: z.lazy(() => FeatureWhereInputSchema).optional(),
  some: z.lazy(() => FeatureWhereInputSchema).optional(),
  none: z.lazy(() => FeatureWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.FeatureListRelationFilter>;

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict() as z.ZodType<Prisma.SortOrderInput>;

export const FeatureOrderByRelationAggregateInputSchema: z.ZodType<Prisma.FeatureOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.FeatureOrderByRelationAggregateInput>;

export const OrderCountOrderByAggregateInputSchema: z.ZodType<Prisma.OrderCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  budget: z.lazy(() => SortOrderSchema).optional(),
  labelingLanguage: z.lazy(() => SortOrderSchema).optional(),
  datasetDescription: z.lazy(() => SortOrderSchema).optional(),
  exampleImageUrl: z.lazy(() => SortOrderSchema).optional(),
  imageGuidelines: z.lazy(() => SortOrderSchema).optional(),
  minSamplesCount: z.lazy(() => SortOrderSchema).optional(),
  currentSamplesCount: z.lazy(() => SortOrderSchema).optional(),
  entryFee: z.lazy(() => SortOrderSchema).optional(),
  reward: z.lazy(() => SortOrderSchema).optional(),
  minContributors: z.lazy(() => SortOrderSchema).optional(),
  contributors: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.OrderCountOrderByAggregateInput>;

export const OrderAvgOrderByAggregateInputSchema: z.ZodType<Prisma.OrderAvgOrderByAggregateInput> = z.object({
  budget: z.lazy(() => SortOrderSchema).optional(),
  minSamplesCount: z.lazy(() => SortOrderSchema).optional(),
  currentSamplesCount: z.lazy(() => SortOrderSchema).optional(),
  entryFee: z.lazy(() => SortOrderSchema).optional(),
  reward: z.lazy(() => SortOrderSchema).optional(),
  minContributors: z.lazy(() => SortOrderSchema).optional(),
  contributors: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.OrderAvgOrderByAggregateInput>;

export const OrderMaxOrderByAggregateInputSchema: z.ZodType<Prisma.OrderMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  budget: z.lazy(() => SortOrderSchema).optional(),
  labelingLanguage: z.lazy(() => SortOrderSchema).optional(),
  datasetDescription: z.lazy(() => SortOrderSchema).optional(),
  exampleImageUrl: z.lazy(() => SortOrderSchema).optional(),
  imageGuidelines: z.lazy(() => SortOrderSchema).optional(),
  minSamplesCount: z.lazy(() => SortOrderSchema).optional(),
  currentSamplesCount: z.lazy(() => SortOrderSchema).optional(),
  entryFee: z.lazy(() => SortOrderSchema).optional(),
  reward: z.lazy(() => SortOrderSchema).optional(),
  minContributors: z.lazy(() => SortOrderSchema).optional(),
  contributors: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.OrderMaxOrderByAggregateInput>;

export const OrderMinOrderByAggregateInputSchema: z.ZodType<Prisma.OrderMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  budget: z.lazy(() => SortOrderSchema).optional(),
  labelingLanguage: z.lazy(() => SortOrderSchema).optional(),
  datasetDescription: z.lazy(() => SortOrderSchema).optional(),
  exampleImageUrl: z.lazy(() => SortOrderSchema).optional(),
  imageGuidelines: z.lazy(() => SortOrderSchema).optional(),
  minSamplesCount: z.lazy(() => SortOrderSchema).optional(),
  currentSamplesCount: z.lazy(() => SortOrderSchema).optional(),
  entryFee: z.lazy(() => SortOrderSchema).optional(),
  reward: z.lazy(() => SortOrderSchema).optional(),
  minContributors: z.lazy(() => SortOrderSchema).optional(),
  contributors: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.OrderMinOrderByAggregateInput>;

export const OrderSumOrderByAggregateInputSchema: z.ZodType<Prisma.OrderSumOrderByAggregateInput> = z.object({
  budget: z.lazy(() => SortOrderSchema).optional(),
  minSamplesCount: z.lazy(() => SortOrderSchema).optional(),
  currentSamplesCount: z.lazy(() => SortOrderSchema).optional(),
  entryFee: z.lazy(() => SortOrderSchema).optional(),
  reward: z.lazy(() => SortOrderSchema).optional(),
  minContributors: z.lazy(() => SortOrderSchema).optional(),
  contributors: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.OrderSumOrderByAggregateInput>;

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

export const EnumOrderStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumOrderStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => OrderStatusSchema).optional(),
  in: z.lazy(() => OrderStatusSchema).array().optional(),
  notIn: z.lazy(() => OrderStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => OrderStatusSchema),z.lazy(() => NestedEnumOrderStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumOrderStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumOrderStatusFilterSchema).optional()
}).strict() as z.ZodType<Prisma.EnumOrderStatusWithAggregatesFilter>;

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict() as z.ZodType<Prisma.FloatWithAggregatesFilter>;

export const EnumLabelingLanguageWithAggregatesFilterSchema: z.ZodType<Prisma.EnumLabelingLanguageWithAggregatesFilter> = z.object({
  equals: z.lazy(() => LabelingLanguageSchema).optional(),
  in: z.lazy(() => LabelingLanguageSchema).array().optional(),
  notIn: z.lazy(() => LabelingLanguageSchema).array().optional(),
  not: z.union([ z.lazy(() => LabelingLanguageSchema),z.lazy(() => NestedEnumLabelingLanguageWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumLabelingLanguageFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumLabelingLanguageFilterSchema).optional()
}).strict() as z.ZodType<Prisma.EnumLabelingLanguageWithAggregatesFilter>;

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

export const FloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.FloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional()
}).strict() as z.ZodType<Prisma.FloatNullableWithAggregatesFilter>;

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict() as z.ZodType<Prisma.IntNullableWithAggregatesFilter>;

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.StringNullableFilter>;

export const OrderScalarRelationFilterSchema: z.ZodType<Prisma.OrderScalarRelationFilter> = z.object({
  is: z.lazy(() => OrderWhereInputSchema).optional(),
  isNot: z.lazy(() => OrderWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.OrderScalarRelationFilter>;

export const FeatureLabelListRelationFilterSchema: z.ZodType<Prisma.FeatureLabelListRelationFilter> = z.object({
  every: z.lazy(() => FeatureLabelWhereInputSchema).optional(),
  some: z.lazy(() => FeatureLabelWhereInputSchema).optional(),
  none: z.lazy(() => FeatureLabelWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.FeatureLabelListRelationFilter>;

export const FeatureLabelOrderByRelationAggregateInputSchema: z.ZodType<Prisma.FeatureLabelOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.FeatureLabelOrderByRelationAggregateInput>;

export const FeatureCountOrderByAggregateInputSchema: z.ZodType<Prisma.FeatureCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  orderId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  labelGuidelines: z.lazy(() => SortOrderSchema).optional(),
  exampleLabel: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.FeatureCountOrderByAggregateInput>;

export const FeatureAvgOrderByAggregateInputSchema: z.ZodType<Prisma.FeatureAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.FeatureAvgOrderByAggregateInput>;

export const FeatureMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FeatureMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  orderId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  labelGuidelines: z.lazy(() => SortOrderSchema).optional(),
  exampleLabel: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.FeatureMaxOrderByAggregateInput>;

export const FeatureMinOrderByAggregateInputSchema: z.ZodType<Prisma.FeatureMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  orderId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  labelGuidelines: z.lazy(() => SortOrderSchema).optional(),
  exampleLabel: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.FeatureMinOrderByAggregateInput>;

export const FeatureSumOrderByAggregateInputSchema: z.ZodType<Prisma.FeatureSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.FeatureSumOrderByAggregateInput>;

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict() as z.ZodType<Prisma.StringNullableWithAggregatesFilter>;

export const EnumTaskTypeFilterSchema: z.ZodType<Prisma.EnumTaskTypeFilter> = z.object({
  equals: z.lazy(() => TaskTypeSchema).optional(),
  in: z.lazy(() => TaskTypeSchema).array().optional(),
  notIn: z.lazy(() => TaskTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => TaskTypeSchema),z.lazy(() => NestedEnumTaskTypeFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.EnumTaskTypeFilter>;

export const UserNullableScalarRelationFilterSchema: z.ZodType<Prisma.UserNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => UserWhereInputSchema).optional().nullable()
}).strict() as z.ZodType<Prisma.UserNullableScalarRelationFilter>;

export const LabelTaskNullableScalarRelationFilterSchema: z.ZodType<Prisma.LabelTaskNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => LabelTaskWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => LabelTaskWhereInputSchema).optional().nullable()
}).strict() as z.ZodType<Prisma.LabelTaskNullableScalarRelationFilter>;

export const CheckTaskNullableScalarRelationFilterSchema: z.ZodType<Prisma.CheckTaskNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => CheckTaskWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => CheckTaskWhereInputSchema).optional().nullable()
}).strict() as z.ZodType<Prisma.CheckTaskNullableScalarRelationFilter>;

export const PictureTaskNullableScalarRelationFilterSchema: z.ZodType<Prisma.PictureTaskNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => PictureTaskWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => PictureTaskWhereInputSchema).optional().nullable()
}).strict() as z.ZodType<Prisma.PictureTaskNullableScalarRelationFilter>;

export const TaskCountOrderByAggregateInputSchema: z.ZodType<Prisma.TaskCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  estimatedReward: z.lazy(() => SortOrderSchema).optional(),
  assignedToId: z.lazy(() => SortOrderSchema).optional(),
  orderId: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.TaskCountOrderByAggregateInput>;

export const TaskAvgOrderByAggregateInputSchema: z.ZodType<Prisma.TaskAvgOrderByAggregateInput> = z.object({
  estimatedReward: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.TaskAvgOrderByAggregateInput>;

export const TaskMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TaskMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  estimatedReward: z.lazy(() => SortOrderSchema).optional(),
  assignedToId: z.lazy(() => SortOrderSchema).optional(),
  orderId: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.TaskMaxOrderByAggregateInput>;

export const TaskMinOrderByAggregateInputSchema: z.ZodType<Prisma.TaskMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  estimatedReward: z.lazy(() => SortOrderSchema).optional(),
  assignedToId: z.lazy(() => SortOrderSchema).optional(),
  orderId: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.TaskMinOrderByAggregateInput>;

export const TaskSumOrderByAggregateInputSchema: z.ZodType<Prisma.TaskSumOrderByAggregateInput> = z.object({
  estimatedReward: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.TaskSumOrderByAggregateInput>;

export const EnumTaskTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumTaskTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => TaskTypeSchema).optional(),
  in: z.lazy(() => TaskTypeSchema).array().optional(),
  notIn: z.lazy(() => TaskTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => TaskTypeSchema),z.lazy(() => NestedEnumTaskTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumTaskTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumTaskTypeFilterSchema).optional()
}).strict() as z.ZodType<Prisma.EnumTaskTypeWithAggregatesFilter>;

export const TaskScalarRelationFilterSchema: z.ZodType<Prisma.TaskScalarRelationFilter> = z.object({
  is: z.lazy(() => TaskWhereInputSchema).optional(),
  isNot: z.lazy(() => TaskWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.TaskScalarRelationFilter>;

export const LabelTaskCountOrderByAggregateInputSchema: z.ZodType<Prisma.LabelTaskCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  taskId: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.LabelTaskCountOrderByAggregateInput>;

export const LabelTaskMaxOrderByAggregateInputSchema: z.ZodType<Prisma.LabelTaskMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  taskId: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.LabelTaskMaxOrderByAggregateInput>;

export const LabelTaskMinOrderByAggregateInputSchema: z.ZodType<Prisma.LabelTaskMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  taskId: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.LabelTaskMinOrderByAggregateInput>;

export const LabelTaskScalarRelationFilterSchema: z.ZodType<Prisma.LabelTaskScalarRelationFilter> = z.object({
  is: z.lazy(() => LabelTaskWhereInputSchema).optional(),
  isNot: z.lazy(() => LabelTaskWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.LabelTaskScalarRelationFilter>;

export const FeatureScalarRelationFilterSchema: z.ZodType<Prisma.FeatureScalarRelationFilter> = z.object({
  is: z.lazy(() => FeatureWhereInputSchema).optional(),
  isNot: z.lazy(() => FeatureWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.FeatureScalarRelationFilter>;

export const FeatureLabelCountOrderByAggregateInputSchema: z.ZodType<Prisma.FeatureLabelCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  labelTaskId: z.lazy(() => SortOrderSchema).optional(),
  featureId: z.lazy(() => SortOrderSchema).optional(),
  featureLabel: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.FeatureLabelCountOrderByAggregateInput>;

export const FeatureLabelAvgOrderByAggregateInputSchema: z.ZodType<Prisma.FeatureLabelAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  featureId: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.FeatureLabelAvgOrderByAggregateInput>;

export const FeatureLabelMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FeatureLabelMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  labelTaskId: z.lazy(() => SortOrderSchema).optional(),
  featureId: z.lazy(() => SortOrderSchema).optional(),
  featureLabel: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.FeatureLabelMaxOrderByAggregateInput>;

export const FeatureLabelMinOrderByAggregateInputSchema: z.ZodType<Prisma.FeatureLabelMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  labelTaskId: z.lazy(() => SortOrderSchema).optional(),
  featureId: z.lazy(() => SortOrderSchema).optional(),
  featureLabel: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.FeatureLabelMinOrderByAggregateInput>;

export const FeatureLabelSumOrderByAggregateInputSchema: z.ZodType<Prisma.FeatureLabelSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  featureId: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.FeatureLabelSumOrderByAggregateInput>;

export const BoolNullableFilterSchema: z.ZodType<Prisma.BoolNullableFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableFilterSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.BoolNullableFilter>;

export const CheckFeatureListRelationFilterSchema: z.ZodType<Prisma.CheckFeatureListRelationFilter> = z.object({
  every: z.lazy(() => CheckFeatureWhereInputSchema).optional(),
  some: z.lazy(() => CheckFeatureWhereInputSchema).optional(),
  none: z.lazy(() => CheckFeatureWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.CheckFeatureListRelationFilter>;

export const CheckFeatureOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CheckFeatureOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CheckFeatureOrderByRelationAggregateInput>;

export const CheckTaskCountOrderByAggregateInputSchema: z.ZodType<Prisma.CheckTaskCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  taskId: z.lazy(() => SortOrderSchema).optional(),
  isCorrect: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CheckTaskCountOrderByAggregateInput>;

export const CheckTaskMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CheckTaskMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  taskId: z.lazy(() => SortOrderSchema).optional(),
  isCorrect: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CheckTaskMaxOrderByAggregateInput>;

export const CheckTaskMinOrderByAggregateInputSchema: z.ZodType<Prisma.CheckTaskMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  taskId: z.lazy(() => SortOrderSchema).optional(),
  isCorrect: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CheckTaskMinOrderByAggregateInput>;

export const BoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.BoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional()
}).strict() as z.ZodType<Prisma.BoolNullableWithAggregatesFilter>;

export const CheckTaskScalarRelationFilterSchema: z.ZodType<Prisma.CheckTaskScalarRelationFilter> = z.object({
  is: z.lazy(() => CheckTaskWhereInputSchema).optional(),
  isNot: z.lazy(() => CheckTaskWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.CheckTaskScalarRelationFilter>;

export const CheckFeatureCountOrderByAggregateInputSchema: z.ZodType<Prisma.CheckFeatureCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  checkTaskId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CheckFeatureCountOrderByAggregateInput>;

export const CheckFeatureAvgOrderByAggregateInputSchema: z.ZodType<Prisma.CheckFeatureAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CheckFeatureAvgOrderByAggregateInput>;

export const CheckFeatureMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CheckFeatureMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  checkTaskId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CheckFeatureMaxOrderByAggregateInput>;

export const CheckFeatureMinOrderByAggregateInputSchema: z.ZodType<Prisma.CheckFeatureMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  checkTaskId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CheckFeatureMinOrderByAggregateInput>;

export const CheckFeatureSumOrderByAggregateInputSchema: z.ZodType<Prisma.CheckFeatureSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CheckFeatureSumOrderByAggregateInput>;

export const PictureTaskCountOrderByAggregateInputSchema: z.ZodType<Prisma.PictureTaskCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  taskId: z.lazy(() => SortOrderSchema).optional(),
  exampleImgUrl: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.PictureTaskCountOrderByAggregateInput>;

export const PictureTaskMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PictureTaskMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  taskId: z.lazy(() => SortOrderSchema).optional(),
  exampleImgUrl: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.PictureTaskMaxOrderByAggregateInput>;

export const PictureTaskMinOrderByAggregateInputSchema: z.ZodType<Prisma.PictureTaskMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  taskId: z.lazy(() => SortOrderSchema).optional(),
  exampleImgUrl: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.PictureTaskMinOrderByAggregateInput>;

export const TaskCreateNestedManyWithoutAssignedToInputSchema: z.ZodType<Prisma.TaskCreateNestedManyWithoutAssignedToInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutAssignedToInputSchema),z.lazy(() => TaskCreateWithoutAssignedToInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutAssignedToInputSchema),z.lazy(() => TaskUncheckedCreateWithoutAssignedToInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutAssignedToInputSchema),z.lazy(() => TaskCreateOrConnectWithoutAssignedToInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyAssignedToInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.TaskCreateNestedManyWithoutAssignedToInput>;

export const TaskUncheckedCreateNestedManyWithoutAssignedToInputSchema: z.ZodType<Prisma.TaskUncheckedCreateNestedManyWithoutAssignedToInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutAssignedToInputSchema),z.lazy(() => TaskCreateWithoutAssignedToInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutAssignedToInputSchema),z.lazy(() => TaskUncheckedCreateWithoutAssignedToInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutAssignedToInputSchema),z.lazy(() => TaskCreateOrConnectWithoutAssignedToInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyAssignedToInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.TaskUncheckedCreateNestedManyWithoutAssignedToInput>;

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict() as z.ZodType<Prisma.StringFieldUpdateOperationsInput>;

export const TaskUpdateManyWithoutAssignedToNestedInputSchema: z.ZodType<Prisma.TaskUpdateManyWithoutAssignedToNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutAssignedToInputSchema),z.lazy(() => TaskCreateWithoutAssignedToInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutAssignedToInputSchema),z.lazy(() => TaskUncheckedCreateWithoutAssignedToInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutAssignedToInputSchema),z.lazy(() => TaskCreateOrConnectWithoutAssignedToInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TaskUpsertWithWhereUniqueWithoutAssignedToInputSchema),z.lazy(() => TaskUpsertWithWhereUniqueWithoutAssignedToInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyAssignedToInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TaskUpdateWithWhereUniqueWithoutAssignedToInputSchema),z.lazy(() => TaskUpdateWithWhereUniqueWithoutAssignedToInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TaskUpdateManyWithWhereWithoutAssignedToInputSchema),z.lazy(() => TaskUpdateManyWithWhereWithoutAssignedToInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TaskScalarWhereInputSchema),z.lazy(() => TaskScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.TaskUpdateManyWithoutAssignedToNestedInput>;

export const TaskUncheckedUpdateManyWithoutAssignedToNestedInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateManyWithoutAssignedToNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutAssignedToInputSchema),z.lazy(() => TaskCreateWithoutAssignedToInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutAssignedToInputSchema),z.lazy(() => TaskUncheckedCreateWithoutAssignedToInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutAssignedToInputSchema),z.lazy(() => TaskCreateOrConnectWithoutAssignedToInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TaskUpsertWithWhereUniqueWithoutAssignedToInputSchema),z.lazy(() => TaskUpsertWithWhereUniqueWithoutAssignedToInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyAssignedToInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TaskUpdateWithWhereUniqueWithoutAssignedToInputSchema),z.lazy(() => TaskUpdateWithWhereUniqueWithoutAssignedToInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TaskUpdateManyWithWhereWithoutAssignedToInputSchema),z.lazy(() => TaskUpdateManyWithWhereWithoutAssignedToInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TaskScalarWhereInputSchema),z.lazy(() => TaskScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.TaskUncheckedUpdateManyWithoutAssignedToNestedInput>;

export const FeatureCreateNestedManyWithoutOrderInputSchema: z.ZodType<Prisma.FeatureCreateNestedManyWithoutOrderInput> = z.object({
  create: z.union([ z.lazy(() => FeatureCreateWithoutOrderInputSchema),z.lazy(() => FeatureCreateWithoutOrderInputSchema).array(),z.lazy(() => FeatureUncheckedCreateWithoutOrderInputSchema),z.lazy(() => FeatureUncheckedCreateWithoutOrderInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeatureCreateOrConnectWithoutOrderInputSchema),z.lazy(() => FeatureCreateOrConnectWithoutOrderInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeatureCreateManyOrderInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FeatureWhereUniqueInputSchema),z.lazy(() => FeatureWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.FeatureCreateNestedManyWithoutOrderInput>;

export const TaskCreateNestedManyWithoutOrderInputSchema: z.ZodType<Prisma.TaskCreateNestedManyWithoutOrderInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutOrderInputSchema),z.lazy(() => TaskCreateWithoutOrderInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutOrderInputSchema),z.lazy(() => TaskUncheckedCreateWithoutOrderInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutOrderInputSchema),z.lazy(() => TaskCreateOrConnectWithoutOrderInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyOrderInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.TaskCreateNestedManyWithoutOrderInput>;

export const FeatureUncheckedCreateNestedManyWithoutOrderInputSchema: z.ZodType<Prisma.FeatureUncheckedCreateNestedManyWithoutOrderInput> = z.object({
  create: z.union([ z.lazy(() => FeatureCreateWithoutOrderInputSchema),z.lazy(() => FeatureCreateWithoutOrderInputSchema).array(),z.lazy(() => FeatureUncheckedCreateWithoutOrderInputSchema),z.lazy(() => FeatureUncheckedCreateWithoutOrderInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeatureCreateOrConnectWithoutOrderInputSchema),z.lazy(() => FeatureCreateOrConnectWithoutOrderInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeatureCreateManyOrderInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FeatureWhereUniqueInputSchema),z.lazy(() => FeatureWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.FeatureUncheckedCreateNestedManyWithoutOrderInput>;

export const TaskUncheckedCreateNestedManyWithoutOrderInputSchema: z.ZodType<Prisma.TaskUncheckedCreateNestedManyWithoutOrderInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutOrderInputSchema),z.lazy(() => TaskCreateWithoutOrderInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutOrderInputSchema),z.lazy(() => TaskUncheckedCreateWithoutOrderInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutOrderInputSchema),z.lazy(() => TaskCreateOrConnectWithoutOrderInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyOrderInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.TaskUncheckedCreateNestedManyWithoutOrderInput>;

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput>;

export const EnumOrderStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumOrderStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => OrderStatusSchema).optional()
}).strict() as z.ZodType<Prisma.EnumOrderStatusFieldUpdateOperationsInput>;

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict() as z.ZodType<Prisma.FloatFieldUpdateOperationsInput>;

export const EnumLabelingLanguageFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumLabelingLanguageFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => LabelingLanguageSchema).optional()
}).strict() as z.ZodType<Prisma.EnumLabelingLanguageFieldUpdateOperationsInput>;

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict() as z.ZodType<Prisma.IntFieldUpdateOperationsInput>;

export const NullableFloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableFloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict() as z.ZodType<Prisma.NullableFloatFieldUpdateOperationsInput>;

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict() as z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput>;

export const FeatureUpdateManyWithoutOrderNestedInputSchema: z.ZodType<Prisma.FeatureUpdateManyWithoutOrderNestedInput> = z.object({
  create: z.union([ z.lazy(() => FeatureCreateWithoutOrderInputSchema),z.lazy(() => FeatureCreateWithoutOrderInputSchema).array(),z.lazy(() => FeatureUncheckedCreateWithoutOrderInputSchema),z.lazy(() => FeatureUncheckedCreateWithoutOrderInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeatureCreateOrConnectWithoutOrderInputSchema),z.lazy(() => FeatureCreateOrConnectWithoutOrderInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FeatureUpsertWithWhereUniqueWithoutOrderInputSchema),z.lazy(() => FeatureUpsertWithWhereUniqueWithoutOrderInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeatureCreateManyOrderInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FeatureWhereUniqueInputSchema),z.lazy(() => FeatureWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FeatureWhereUniqueInputSchema),z.lazy(() => FeatureWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FeatureWhereUniqueInputSchema),z.lazy(() => FeatureWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FeatureWhereUniqueInputSchema),z.lazy(() => FeatureWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FeatureUpdateWithWhereUniqueWithoutOrderInputSchema),z.lazy(() => FeatureUpdateWithWhereUniqueWithoutOrderInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FeatureUpdateManyWithWhereWithoutOrderInputSchema),z.lazy(() => FeatureUpdateManyWithWhereWithoutOrderInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FeatureScalarWhereInputSchema),z.lazy(() => FeatureScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.FeatureUpdateManyWithoutOrderNestedInput>;

export const TaskUpdateManyWithoutOrderNestedInputSchema: z.ZodType<Prisma.TaskUpdateManyWithoutOrderNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutOrderInputSchema),z.lazy(() => TaskCreateWithoutOrderInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutOrderInputSchema),z.lazy(() => TaskUncheckedCreateWithoutOrderInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutOrderInputSchema),z.lazy(() => TaskCreateOrConnectWithoutOrderInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TaskUpsertWithWhereUniqueWithoutOrderInputSchema),z.lazy(() => TaskUpsertWithWhereUniqueWithoutOrderInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyOrderInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TaskUpdateWithWhereUniqueWithoutOrderInputSchema),z.lazy(() => TaskUpdateWithWhereUniqueWithoutOrderInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TaskUpdateManyWithWhereWithoutOrderInputSchema),z.lazy(() => TaskUpdateManyWithWhereWithoutOrderInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TaskScalarWhereInputSchema),z.lazy(() => TaskScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.TaskUpdateManyWithoutOrderNestedInput>;

export const FeatureUncheckedUpdateManyWithoutOrderNestedInputSchema: z.ZodType<Prisma.FeatureUncheckedUpdateManyWithoutOrderNestedInput> = z.object({
  create: z.union([ z.lazy(() => FeatureCreateWithoutOrderInputSchema),z.lazy(() => FeatureCreateWithoutOrderInputSchema).array(),z.lazy(() => FeatureUncheckedCreateWithoutOrderInputSchema),z.lazy(() => FeatureUncheckedCreateWithoutOrderInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeatureCreateOrConnectWithoutOrderInputSchema),z.lazy(() => FeatureCreateOrConnectWithoutOrderInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FeatureUpsertWithWhereUniqueWithoutOrderInputSchema),z.lazy(() => FeatureUpsertWithWhereUniqueWithoutOrderInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeatureCreateManyOrderInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FeatureWhereUniqueInputSchema),z.lazy(() => FeatureWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FeatureWhereUniqueInputSchema),z.lazy(() => FeatureWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FeatureWhereUniqueInputSchema),z.lazy(() => FeatureWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FeatureWhereUniqueInputSchema),z.lazy(() => FeatureWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FeatureUpdateWithWhereUniqueWithoutOrderInputSchema),z.lazy(() => FeatureUpdateWithWhereUniqueWithoutOrderInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FeatureUpdateManyWithWhereWithoutOrderInputSchema),z.lazy(() => FeatureUpdateManyWithWhereWithoutOrderInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FeatureScalarWhereInputSchema),z.lazy(() => FeatureScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.FeatureUncheckedUpdateManyWithoutOrderNestedInput>;

export const TaskUncheckedUpdateManyWithoutOrderNestedInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateManyWithoutOrderNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutOrderInputSchema),z.lazy(() => TaskCreateWithoutOrderInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutOrderInputSchema),z.lazy(() => TaskUncheckedCreateWithoutOrderInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutOrderInputSchema),z.lazy(() => TaskCreateOrConnectWithoutOrderInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TaskUpsertWithWhereUniqueWithoutOrderInputSchema),z.lazy(() => TaskUpsertWithWhereUniqueWithoutOrderInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyOrderInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TaskUpdateWithWhereUniqueWithoutOrderInputSchema),z.lazy(() => TaskUpdateWithWhereUniqueWithoutOrderInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TaskUpdateManyWithWhereWithoutOrderInputSchema),z.lazy(() => TaskUpdateManyWithWhereWithoutOrderInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TaskScalarWhereInputSchema),z.lazy(() => TaskScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.TaskUncheckedUpdateManyWithoutOrderNestedInput>;

export const OrderCreateNestedOneWithoutFeaturesInputSchema: z.ZodType<Prisma.OrderCreateNestedOneWithoutFeaturesInput> = z.object({
  create: z.union([ z.lazy(() => OrderCreateWithoutFeaturesInputSchema),z.lazy(() => OrderUncheckedCreateWithoutFeaturesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => OrderCreateOrConnectWithoutFeaturesInputSchema).optional(),
  connect: z.lazy(() => OrderWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.OrderCreateNestedOneWithoutFeaturesInput>;

export const FeatureLabelCreateNestedManyWithoutFeatureInputSchema: z.ZodType<Prisma.FeatureLabelCreateNestedManyWithoutFeatureInput> = z.object({
  create: z.union([ z.lazy(() => FeatureLabelCreateWithoutFeatureInputSchema),z.lazy(() => FeatureLabelCreateWithoutFeatureInputSchema).array(),z.lazy(() => FeatureLabelUncheckedCreateWithoutFeatureInputSchema),z.lazy(() => FeatureLabelUncheckedCreateWithoutFeatureInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeatureLabelCreateOrConnectWithoutFeatureInputSchema),z.lazy(() => FeatureLabelCreateOrConnectWithoutFeatureInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeatureLabelCreateManyFeatureInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FeatureLabelWhereUniqueInputSchema),z.lazy(() => FeatureLabelWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.FeatureLabelCreateNestedManyWithoutFeatureInput>;

export const FeatureLabelUncheckedCreateNestedManyWithoutFeatureInputSchema: z.ZodType<Prisma.FeatureLabelUncheckedCreateNestedManyWithoutFeatureInput> = z.object({
  create: z.union([ z.lazy(() => FeatureLabelCreateWithoutFeatureInputSchema),z.lazy(() => FeatureLabelCreateWithoutFeatureInputSchema).array(),z.lazy(() => FeatureLabelUncheckedCreateWithoutFeatureInputSchema),z.lazy(() => FeatureLabelUncheckedCreateWithoutFeatureInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeatureLabelCreateOrConnectWithoutFeatureInputSchema),z.lazy(() => FeatureLabelCreateOrConnectWithoutFeatureInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeatureLabelCreateManyFeatureInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FeatureLabelWhereUniqueInputSchema),z.lazy(() => FeatureLabelWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.FeatureLabelUncheckedCreateNestedManyWithoutFeatureInput>;

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict() as z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput>;

export const OrderUpdateOneRequiredWithoutFeaturesNestedInputSchema: z.ZodType<Prisma.OrderUpdateOneRequiredWithoutFeaturesNestedInput> = z.object({
  create: z.union([ z.lazy(() => OrderCreateWithoutFeaturesInputSchema),z.lazy(() => OrderUncheckedCreateWithoutFeaturesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => OrderCreateOrConnectWithoutFeaturesInputSchema).optional(),
  upsert: z.lazy(() => OrderUpsertWithoutFeaturesInputSchema).optional(),
  connect: z.lazy(() => OrderWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => OrderUpdateToOneWithWhereWithoutFeaturesInputSchema),z.lazy(() => OrderUpdateWithoutFeaturesInputSchema),z.lazy(() => OrderUncheckedUpdateWithoutFeaturesInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.OrderUpdateOneRequiredWithoutFeaturesNestedInput>;

export const FeatureLabelUpdateManyWithoutFeatureNestedInputSchema: z.ZodType<Prisma.FeatureLabelUpdateManyWithoutFeatureNestedInput> = z.object({
  create: z.union([ z.lazy(() => FeatureLabelCreateWithoutFeatureInputSchema),z.lazy(() => FeatureLabelCreateWithoutFeatureInputSchema).array(),z.lazy(() => FeatureLabelUncheckedCreateWithoutFeatureInputSchema),z.lazy(() => FeatureLabelUncheckedCreateWithoutFeatureInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeatureLabelCreateOrConnectWithoutFeatureInputSchema),z.lazy(() => FeatureLabelCreateOrConnectWithoutFeatureInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FeatureLabelUpsertWithWhereUniqueWithoutFeatureInputSchema),z.lazy(() => FeatureLabelUpsertWithWhereUniqueWithoutFeatureInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeatureLabelCreateManyFeatureInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FeatureLabelWhereUniqueInputSchema),z.lazy(() => FeatureLabelWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FeatureLabelWhereUniqueInputSchema),z.lazy(() => FeatureLabelWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FeatureLabelWhereUniqueInputSchema),z.lazy(() => FeatureLabelWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FeatureLabelWhereUniqueInputSchema),z.lazy(() => FeatureLabelWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FeatureLabelUpdateWithWhereUniqueWithoutFeatureInputSchema),z.lazy(() => FeatureLabelUpdateWithWhereUniqueWithoutFeatureInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FeatureLabelUpdateManyWithWhereWithoutFeatureInputSchema),z.lazy(() => FeatureLabelUpdateManyWithWhereWithoutFeatureInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FeatureLabelScalarWhereInputSchema),z.lazy(() => FeatureLabelScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.FeatureLabelUpdateManyWithoutFeatureNestedInput>;

export const FeatureLabelUncheckedUpdateManyWithoutFeatureNestedInputSchema: z.ZodType<Prisma.FeatureLabelUncheckedUpdateManyWithoutFeatureNestedInput> = z.object({
  create: z.union([ z.lazy(() => FeatureLabelCreateWithoutFeatureInputSchema),z.lazy(() => FeatureLabelCreateWithoutFeatureInputSchema).array(),z.lazy(() => FeatureLabelUncheckedCreateWithoutFeatureInputSchema),z.lazy(() => FeatureLabelUncheckedCreateWithoutFeatureInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeatureLabelCreateOrConnectWithoutFeatureInputSchema),z.lazy(() => FeatureLabelCreateOrConnectWithoutFeatureInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FeatureLabelUpsertWithWhereUniqueWithoutFeatureInputSchema),z.lazy(() => FeatureLabelUpsertWithWhereUniqueWithoutFeatureInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeatureLabelCreateManyFeatureInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FeatureLabelWhereUniqueInputSchema),z.lazy(() => FeatureLabelWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FeatureLabelWhereUniqueInputSchema),z.lazy(() => FeatureLabelWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FeatureLabelWhereUniqueInputSchema),z.lazy(() => FeatureLabelWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FeatureLabelWhereUniqueInputSchema),z.lazy(() => FeatureLabelWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FeatureLabelUpdateWithWhereUniqueWithoutFeatureInputSchema),z.lazy(() => FeatureLabelUpdateWithWhereUniqueWithoutFeatureInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FeatureLabelUpdateManyWithWhereWithoutFeatureInputSchema),z.lazy(() => FeatureLabelUpdateManyWithWhereWithoutFeatureInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FeatureLabelScalarWhereInputSchema),z.lazy(() => FeatureLabelScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.FeatureLabelUncheckedUpdateManyWithoutFeatureNestedInput>;

export const UserCreateNestedOneWithoutTasksInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutTasksInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutTasksInputSchema),z.lazy(() => UserUncheckedCreateWithoutTasksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTasksInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserCreateNestedOneWithoutTasksInput>;

export const OrderCreateNestedOneWithoutTasksInputSchema: z.ZodType<Prisma.OrderCreateNestedOneWithoutTasksInput> = z.object({
  create: z.union([ z.lazy(() => OrderCreateWithoutTasksInputSchema),z.lazy(() => OrderUncheckedCreateWithoutTasksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => OrderCreateOrConnectWithoutTasksInputSchema).optional(),
  connect: z.lazy(() => OrderWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.OrderCreateNestedOneWithoutTasksInput>;

export const LabelTaskCreateNestedOneWithoutTaskInputSchema: z.ZodType<Prisma.LabelTaskCreateNestedOneWithoutTaskInput> = z.object({
  create: z.union([ z.lazy(() => LabelTaskCreateWithoutTaskInputSchema),z.lazy(() => LabelTaskUncheckedCreateWithoutTaskInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => LabelTaskCreateOrConnectWithoutTaskInputSchema).optional(),
  connect: z.lazy(() => LabelTaskWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.LabelTaskCreateNestedOneWithoutTaskInput>;

export const CheckTaskCreateNestedOneWithoutTaskInputSchema: z.ZodType<Prisma.CheckTaskCreateNestedOneWithoutTaskInput> = z.object({
  create: z.union([ z.lazy(() => CheckTaskCreateWithoutTaskInputSchema),z.lazy(() => CheckTaskUncheckedCreateWithoutTaskInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CheckTaskCreateOrConnectWithoutTaskInputSchema).optional(),
  connect: z.lazy(() => CheckTaskWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.CheckTaskCreateNestedOneWithoutTaskInput>;

export const PictureTaskCreateNestedOneWithoutTaskInputSchema: z.ZodType<Prisma.PictureTaskCreateNestedOneWithoutTaskInput> = z.object({
  create: z.union([ z.lazy(() => PictureTaskCreateWithoutTaskInputSchema),z.lazy(() => PictureTaskUncheckedCreateWithoutTaskInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PictureTaskCreateOrConnectWithoutTaskInputSchema).optional(),
  connect: z.lazy(() => PictureTaskWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.PictureTaskCreateNestedOneWithoutTaskInput>;

export const LabelTaskUncheckedCreateNestedOneWithoutTaskInputSchema: z.ZodType<Prisma.LabelTaskUncheckedCreateNestedOneWithoutTaskInput> = z.object({
  create: z.union([ z.lazy(() => LabelTaskCreateWithoutTaskInputSchema),z.lazy(() => LabelTaskUncheckedCreateWithoutTaskInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => LabelTaskCreateOrConnectWithoutTaskInputSchema).optional(),
  connect: z.lazy(() => LabelTaskWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.LabelTaskUncheckedCreateNestedOneWithoutTaskInput>;

export const CheckTaskUncheckedCreateNestedOneWithoutTaskInputSchema: z.ZodType<Prisma.CheckTaskUncheckedCreateNestedOneWithoutTaskInput> = z.object({
  create: z.union([ z.lazy(() => CheckTaskCreateWithoutTaskInputSchema),z.lazy(() => CheckTaskUncheckedCreateWithoutTaskInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CheckTaskCreateOrConnectWithoutTaskInputSchema).optional(),
  connect: z.lazy(() => CheckTaskWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.CheckTaskUncheckedCreateNestedOneWithoutTaskInput>;

export const PictureTaskUncheckedCreateNestedOneWithoutTaskInputSchema: z.ZodType<Prisma.PictureTaskUncheckedCreateNestedOneWithoutTaskInput> = z.object({
  create: z.union([ z.lazy(() => PictureTaskCreateWithoutTaskInputSchema),z.lazy(() => PictureTaskUncheckedCreateWithoutTaskInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PictureTaskCreateOrConnectWithoutTaskInputSchema).optional(),
  connect: z.lazy(() => PictureTaskWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.PictureTaskUncheckedCreateNestedOneWithoutTaskInput>;

export const EnumTaskTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumTaskTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => TaskTypeSchema).optional()
}).strict() as z.ZodType<Prisma.EnumTaskTypeFieldUpdateOperationsInput>;

export const UserUpdateOneWithoutTasksNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutTasksNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutTasksInputSchema),z.lazy(() => UserUncheckedCreateWithoutTasksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTasksInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutTasksInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutTasksInputSchema),z.lazy(() => UserUpdateWithoutTasksInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTasksInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.UserUpdateOneWithoutTasksNestedInput>;

export const OrderUpdateOneRequiredWithoutTasksNestedInputSchema: z.ZodType<Prisma.OrderUpdateOneRequiredWithoutTasksNestedInput> = z.object({
  create: z.union([ z.lazy(() => OrderCreateWithoutTasksInputSchema),z.lazy(() => OrderUncheckedCreateWithoutTasksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => OrderCreateOrConnectWithoutTasksInputSchema).optional(),
  upsert: z.lazy(() => OrderUpsertWithoutTasksInputSchema).optional(),
  connect: z.lazy(() => OrderWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => OrderUpdateToOneWithWhereWithoutTasksInputSchema),z.lazy(() => OrderUpdateWithoutTasksInputSchema),z.lazy(() => OrderUncheckedUpdateWithoutTasksInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.OrderUpdateOneRequiredWithoutTasksNestedInput>;

export const LabelTaskUpdateOneWithoutTaskNestedInputSchema: z.ZodType<Prisma.LabelTaskUpdateOneWithoutTaskNestedInput> = z.object({
  create: z.union([ z.lazy(() => LabelTaskCreateWithoutTaskInputSchema),z.lazy(() => LabelTaskUncheckedCreateWithoutTaskInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => LabelTaskCreateOrConnectWithoutTaskInputSchema).optional(),
  upsert: z.lazy(() => LabelTaskUpsertWithoutTaskInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => LabelTaskWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => LabelTaskWhereInputSchema) ]).optional(),
  connect: z.lazy(() => LabelTaskWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => LabelTaskUpdateToOneWithWhereWithoutTaskInputSchema),z.lazy(() => LabelTaskUpdateWithoutTaskInputSchema),z.lazy(() => LabelTaskUncheckedUpdateWithoutTaskInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.LabelTaskUpdateOneWithoutTaskNestedInput>;

export const CheckTaskUpdateOneWithoutTaskNestedInputSchema: z.ZodType<Prisma.CheckTaskUpdateOneWithoutTaskNestedInput> = z.object({
  create: z.union([ z.lazy(() => CheckTaskCreateWithoutTaskInputSchema),z.lazy(() => CheckTaskUncheckedCreateWithoutTaskInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CheckTaskCreateOrConnectWithoutTaskInputSchema).optional(),
  upsert: z.lazy(() => CheckTaskUpsertWithoutTaskInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => CheckTaskWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => CheckTaskWhereInputSchema) ]).optional(),
  connect: z.lazy(() => CheckTaskWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CheckTaskUpdateToOneWithWhereWithoutTaskInputSchema),z.lazy(() => CheckTaskUpdateWithoutTaskInputSchema),z.lazy(() => CheckTaskUncheckedUpdateWithoutTaskInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CheckTaskUpdateOneWithoutTaskNestedInput>;

export const PictureTaskUpdateOneWithoutTaskNestedInputSchema: z.ZodType<Prisma.PictureTaskUpdateOneWithoutTaskNestedInput> = z.object({
  create: z.union([ z.lazy(() => PictureTaskCreateWithoutTaskInputSchema),z.lazy(() => PictureTaskUncheckedCreateWithoutTaskInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PictureTaskCreateOrConnectWithoutTaskInputSchema).optional(),
  upsert: z.lazy(() => PictureTaskUpsertWithoutTaskInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => PictureTaskWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => PictureTaskWhereInputSchema) ]).optional(),
  connect: z.lazy(() => PictureTaskWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PictureTaskUpdateToOneWithWhereWithoutTaskInputSchema),z.lazy(() => PictureTaskUpdateWithoutTaskInputSchema),z.lazy(() => PictureTaskUncheckedUpdateWithoutTaskInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.PictureTaskUpdateOneWithoutTaskNestedInput>;

export const LabelTaskUncheckedUpdateOneWithoutTaskNestedInputSchema: z.ZodType<Prisma.LabelTaskUncheckedUpdateOneWithoutTaskNestedInput> = z.object({
  create: z.union([ z.lazy(() => LabelTaskCreateWithoutTaskInputSchema),z.lazy(() => LabelTaskUncheckedCreateWithoutTaskInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => LabelTaskCreateOrConnectWithoutTaskInputSchema).optional(),
  upsert: z.lazy(() => LabelTaskUpsertWithoutTaskInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => LabelTaskWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => LabelTaskWhereInputSchema) ]).optional(),
  connect: z.lazy(() => LabelTaskWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => LabelTaskUpdateToOneWithWhereWithoutTaskInputSchema),z.lazy(() => LabelTaskUpdateWithoutTaskInputSchema),z.lazy(() => LabelTaskUncheckedUpdateWithoutTaskInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.LabelTaskUncheckedUpdateOneWithoutTaskNestedInput>;

export const CheckTaskUncheckedUpdateOneWithoutTaskNestedInputSchema: z.ZodType<Prisma.CheckTaskUncheckedUpdateOneWithoutTaskNestedInput> = z.object({
  create: z.union([ z.lazy(() => CheckTaskCreateWithoutTaskInputSchema),z.lazy(() => CheckTaskUncheckedCreateWithoutTaskInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CheckTaskCreateOrConnectWithoutTaskInputSchema).optional(),
  upsert: z.lazy(() => CheckTaskUpsertWithoutTaskInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => CheckTaskWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => CheckTaskWhereInputSchema) ]).optional(),
  connect: z.lazy(() => CheckTaskWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CheckTaskUpdateToOneWithWhereWithoutTaskInputSchema),z.lazy(() => CheckTaskUpdateWithoutTaskInputSchema),z.lazy(() => CheckTaskUncheckedUpdateWithoutTaskInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CheckTaskUncheckedUpdateOneWithoutTaskNestedInput>;

export const PictureTaskUncheckedUpdateOneWithoutTaskNestedInputSchema: z.ZodType<Prisma.PictureTaskUncheckedUpdateOneWithoutTaskNestedInput> = z.object({
  create: z.union([ z.lazy(() => PictureTaskCreateWithoutTaskInputSchema),z.lazy(() => PictureTaskUncheckedCreateWithoutTaskInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PictureTaskCreateOrConnectWithoutTaskInputSchema).optional(),
  upsert: z.lazy(() => PictureTaskUpsertWithoutTaskInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => PictureTaskWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => PictureTaskWhereInputSchema) ]).optional(),
  connect: z.lazy(() => PictureTaskWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PictureTaskUpdateToOneWithWhereWithoutTaskInputSchema),z.lazy(() => PictureTaskUpdateWithoutTaskInputSchema),z.lazy(() => PictureTaskUncheckedUpdateWithoutTaskInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.PictureTaskUncheckedUpdateOneWithoutTaskNestedInput>;

export const TaskCreateNestedOneWithoutLabelTaskInputSchema: z.ZodType<Prisma.TaskCreateNestedOneWithoutLabelTaskInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutLabelTaskInputSchema),z.lazy(() => TaskUncheckedCreateWithoutLabelTaskInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TaskCreateOrConnectWithoutLabelTaskInputSchema).optional(),
  connect: z.lazy(() => TaskWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.TaskCreateNestedOneWithoutLabelTaskInput>;

export const FeatureLabelCreateNestedManyWithoutLabelTaskInputSchema: z.ZodType<Prisma.FeatureLabelCreateNestedManyWithoutLabelTaskInput> = z.object({
  create: z.union([ z.lazy(() => FeatureLabelCreateWithoutLabelTaskInputSchema),z.lazy(() => FeatureLabelCreateWithoutLabelTaskInputSchema).array(),z.lazy(() => FeatureLabelUncheckedCreateWithoutLabelTaskInputSchema),z.lazy(() => FeatureLabelUncheckedCreateWithoutLabelTaskInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeatureLabelCreateOrConnectWithoutLabelTaskInputSchema),z.lazy(() => FeatureLabelCreateOrConnectWithoutLabelTaskInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeatureLabelCreateManyLabelTaskInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FeatureLabelWhereUniqueInputSchema),z.lazy(() => FeatureLabelWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.FeatureLabelCreateNestedManyWithoutLabelTaskInput>;

export const FeatureLabelUncheckedCreateNestedManyWithoutLabelTaskInputSchema: z.ZodType<Prisma.FeatureLabelUncheckedCreateNestedManyWithoutLabelTaskInput> = z.object({
  create: z.union([ z.lazy(() => FeatureLabelCreateWithoutLabelTaskInputSchema),z.lazy(() => FeatureLabelCreateWithoutLabelTaskInputSchema).array(),z.lazy(() => FeatureLabelUncheckedCreateWithoutLabelTaskInputSchema),z.lazy(() => FeatureLabelUncheckedCreateWithoutLabelTaskInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeatureLabelCreateOrConnectWithoutLabelTaskInputSchema),z.lazy(() => FeatureLabelCreateOrConnectWithoutLabelTaskInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeatureLabelCreateManyLabelTaskInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FeatureLabelWhereUniqueInputSchema),z.lazy(() => FeatureLabelWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.FeatureLabelUncheckedCreateNestedManyWithoutLabelTaskInput>;

export const TaskUpdateOneRequiredWithoutLabelTaskNestedInputSchema: z.ZodType<Prisma.TaskUpdateOneRequiredWithoutLabelTaskNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutLabelTaskInputSchema),z.lazy(() => TaskUncheckedCreateWithoutLabelTaskInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TaskCreateOrConnectWithoutLabelTaskInputSchema).optional(),
  upsert: z.lazy(() => TaskUpsertWithoutLabelTaskInputSchema).optional(),
  connect: z.lazy(() => TaskWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TaskUpdateToOneWithWhereWithoutLabelTaskInputSchema),z.lazy(() => TaskUpdateWithoutLabelTaskInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutLabelTaskInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.TaskUpdateOneRequiredWithoutLabelTaskNestedInput>;

export const FeatureLabelUpdateManyWithoutLabelTaskNestedInputSchema: z.ZodType<Prisma.FeatureLabelUpdateManyWithoutLabelTaskNestedInput> = z.object({
  create: z.union([ z.lazy(() => FeatureLabelCreateWithoutLabelTaskInputSchema),z.lazy(() => FeatureLabelCreateWithoutLabelTaskInputSchema).array(),z.lazy(() => FeatureLabelUncheckedCreateWithoutLabelTaskInputSchema),z.lazy(() => FeatureLabelUncheckedCreateWithoutLabelTaskInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeatureLabelCreateOrConnectWithoutLabelTaskInputSchema),z.lazy(() => FeatureLabelCreateOrConnectWithoutLabelTaskInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FeatureLabelUpsertWithWhereUniqueWithoutLabelTaskInputSchema),z.lazy(() => FeatureLabelUpsertWithWhereUniqueWithoutLabelTaskInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeatureLabelCreateManyLabelTaskInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FeatureLabelWhereUniqueInputSchema),z.lazy(() => FeatureLabelWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FeatureLabelWhereUniqueInputSchema),z.lazy(() => FeatureLabelWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FeatureLabelWhereUniqueInputSchema),z.lazy(() => FeatureLabelWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FeatureLabelWhereUniqueInputSchema),z.lazy(() => FeatureLabelWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FeatureLabelUpdateWithWhereUniqueWithoutLabelTaskInputSchema),z.lazy(() => FeatureLabelUpdateWithWhereUniqueWithoutLabelTaskInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FeatureLabelUpdateManyWithWhereWithoutLabelTaskInputSchema),z.lazy(() => FeatureLabelUpdateManyWithWhereWithoutLabelTaskInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FeatureLabelScalarWhereInputSchema),z.lazy(() => FeatureLabelScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.FeatureLabelUpdateManyWithoutLabelTaskNestedInput>;

export const FeatureLabelUncheckedUpdateManyWithoutLabelTaskNestedInputSchema: z.ZodType<Prisma.FeatureLabelUncheckedUpdateManyWithoutLabelTaskNestedInput> = z.object({
  create: z.union([ z.lazy(() => FeatureLabelCreateWithoutLabelTaskInputSchema),z.lazy(() => FeatureLabelCreateWithoutLabelTaskInputSchema).array(),z.lazy(() => FeatureLabelUncheckedCreateWithoutLabelTaskInputSchema),z.lazy(() => FeatureLabelUncheckedCreateWithoutLabelTaskInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeatureLabelCreateOrConnectWithoutLabelTaskInputSchema),z.lazy(() => FeatureLabelCreateOrConnectWithoutLabelTaskInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FeatureLabelUpsertWithWhereUniqueWithoutLabelTaskInputSchema),z.lazy(() => FeatureLabelUpsertWithWhereUniqueWithoutLabelTaskInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeatureLabelCreateManyLabelTaskInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FeatureLabelWhereUniqueInputSchema),z.lazy(() => FeatureLabelWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FeatureLabelWhereUniqueInputSchema),z.lazy(() => FeatureLabelWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FeatureLabelWhereUniqueInputSchema),z.lazy(() => FeatureLabelWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FeatureLabelWhereUniqueInputSchema),z.lazy(() => FeatureLabelWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FeatureLabelUpdateWithWhereUniqueWithoutLabelTaskInputSchema),z.lazy(() => FeatureLabelUpdateWithWhereUniqueWithoutLabelTaskInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FeatureLabelUpdateManyWithWhereWithoutLabelTaskInputSchema),z.lazy(() => FeatureLabelUpdateManyWithWhereWithoutLabelTaskInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FeatureLabelScalarWhereInputSchema),z.lazy(() => FeatureLabelScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.FeatureLabelUncheckedUpdateManyWithoutLabelTaskNestedInput>;

export const LabelTaskCreateNestedOneWithoutFeatureLabelsInputSchema: z.ZodType<Prisma.LabelTaskCreateNestedOneWithoutFeatureLabelsInput> = z.object({
  create: z.union([ z.lazy(() => LabelTaskCreateWithoutFeatureLabelsInputSchema),z.lazy(() => LabelTaskUncheckedCreateWithoutFeatureLabelsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => LabelTaskCreateOrConnectWithoutFeatureLabelsInputSchema).optional(),
  connect: z.lazy(() => LabelTaskWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.LabelTaskCreateNestedOneWithoutFeatureLabelsInput>;

export const FeatureCreateNestedOneWithoutFeatureLabelsInputSchema: z.ZodType<Prisma.FeatureCreateNestedOneWithoutFeatureLabelsInput> = z.object({
  create: z.union([ z.lazy(() => FeatureCreateWithoutFeatureLabelsInputSchema),z.lazy(() => FeatureUncheckedCreateWithoutFeatureLabelsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FeatureCreateOrConnectWithoutFeatureLabelsInputSchema).optional(),
  connect: z.lazy(() => FeatureWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.FeatureCreateNestedOneWithoutFeatureLabelsInput>;

export const LabelTaskUpdateOneRequiredWithoutFeatureLabelsNestedInputSchema: z.ZodType<Prisma.LabelTaskUpdateOneRequiredWithoutFeatureLabelsNestedInput> = z.object({
  create: z.union([ z.lazy(() => LabelTaskCreateWithoutFeatureLabelsInputSchema),z.lazy(() => LabelTaskUncheckedCreateWithoutFeatureLabelsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => LabelTaskCreateOrConnectWithoutFeatureLabelsInputSchema).optional(),
  upsert: z.lazy(() => LabelTaskUpsertWithoutFeatureLabelsInputSchema).optional(),
  connect: z.lazy(() => LabelTaskWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => LabelTaskUpdateToOneWithWhereWithoutFeatureLabelsInputSchema),z.lazy(() => LabelTaskUpdateWithoutFeatureLabelsInputSchema),z.lazy(() => LabelTaskUncheckedUpdateWithoutFeatureLabelsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.LabelTaskUpdateOneRequiredWithoutFeatureLabelsNestedInput>;

export const FeatureUpdateOneRequiredWithoutFeatureLabelsNestedInputSchema: z.ZodType<Prisma.FeatureUpdateOneRequiredWithoutFeatureLabelsNestedInput> = z.object({
  create: z.union([ z.lazy(() => FeatureCreateWithoutFeatureLabelsInputSchema),z.lazy(() => FeatureUncheckedCreateWithoutFeatureLabelsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FeatureCreateOrConnectWithoutFeatureLabelsInputSchema).optional(),
  upsert: z.lazy(() => FeatureUpsertWithoutFeatureLabelsInputSchema).optional(),
  connect: z.lazy(() => FeatureWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => FeatureUpdateToOneWithWhereWithoutFeatureLabelsInputSchema),z.lazy(() => FeatureUpdateWithoutFeatureLabelsInputSchema),z.lazy(() => FeatureUncheckedUpdateWithoutFeatureLabelsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.FeatureUpdateOneRequiredWithoutFeatureLabelsNestedInput>;

export const TaskCreateNestedOneWithoutCheckTaskInputSchema: z.ZodType<Prisma.TaskCreateNestedOneWithoutCheckTaskInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutCheckTaskInputSchema),z.lazy(() => TaskUncheckedCreateWithoutCheckTaskInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TaskCreateOrConnectWithoutCheckTaskInputSchema).optional(),
  connect: z.lazy(() => TaskWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.TaskCreateNestedOneWithoutCheckTaskInput>;

export const CheckFeatureCreateNestedManyWithoutCheckTaskInputSchema: z.ZodType<Prisma.CheckFeatureCreateNestedManyWithoutCheckTaskInput> = z.object({
  create: z.union([ z.lazy(() => CheckFeatureCreateWithoutCheckTaskInputSchema),z.lazy(() => CheckFeatureCreateWithoutCheckTaskInputSchema).array(),z.lazy(() => CheckFeatureUncheckedCreateWithoutCheckTaskInputSchema),z.lazy(() => CheckFeatureUncheckedCreateWithoutCheckTaskInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CheckFeatureCreateOrConnectWithoutCheckTaskInputSchema),z.lazy(() => CheckFeatureCreateOrConnectWithoutCheckTaskInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CheckFeatureCreateManyCheckTaskInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CheckFeatureWhereUniqueInputSchema),z.lazy(() => CheckFeatureWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CheckFeatureCreateNestedManyWithoutCheckTaskInput>;

export const CheckFeatureUncheckedCreateNestedManyWithoutCheckTaskInputSchema: z.ZodType<Prisma.CheckFeatureUncheckedCreateNestedManyWithoutCheckTaskInput> = z.object({
  create: z.union([ z.lazy(() => CheckFeatureCreateWithoutCheckTaskInputSchema),z.lazy(() => CheckFeatureCreateWithoutCheckTaskInputSchema).array(),z.lazy(() => CheckFeatureUncheckedCreateWithoutCheckTaskInputSchema),z.lazy(() => CheckFeatureUncheckedCreateWithoutCheckTaskInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CheckFeatureCreateOrConnectWithoutCheckTaskInputSchema),z.lazy(() => CheckFeatureCreateOrConnectWithoutCheckTaskInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CheckFeatureCreateManyCheckTaskInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CheckFeatureWhereUniqueInputSchema),z.lazy(() => CheckFeatureWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CheckFeatureUncheckedCreateNestedManyWithoutCheckTaskInput>;

export const NullableBoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableBoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional().nullable()
}).strict() as z.ZodType<Prisma.NullableBoolFieldUpdateOperationsInput>;

export const TaskUpdateOneRequiredWithoutCheckTaskNestedInputSchema: z.ZodType<Prisma.TaskUpdateOneRequiredWithoutCheckTaskNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutCheckTaskInputSchema),z.lazy(() => TaskUncheckedCreateWithoutCheckTaskInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TaskCreateOrConnectWithoutCheckTaskInputSchema).optional(),
  upsert: z.lazy(() => TaskUpsertWithoutCheckTaskInputSchema).optional(),
  connect: z.lazy(() => TaskWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TaskUpdateToOneWithWhereWithoutCheckTaskInputSchema),z.lazy(() => TaskUpdateWithoutCheckTaskInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutCheckTaskInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.TaskUpdateOneRequiredWithoutCheckTaskNestedInput>;

export const CheckFeatureUpdateManyWithoutCheckTaskNestedInputSchema: z.ZodType<Prisma.CheckFeatureUpdateManyWithoutCheckTaskNestedInput> = z.object({
  create: z.union([ z.lazy(() => CheckFeatureCreateWithoutCheckTaskInputSchema),z.lazy(() => CheckFeatureCreateWithoutCheckTaskInputSchema).array(),z.lazy(() => CheckFeatureUncheckedCreateWithoutCheckTaskInputSchema),z.lazy(() => CheckFeatureUncheckedCreateWithoutCheckTaskInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CheckFeatureCreateOrConnectWithoutCheckTaskInputSchema),z.lazy(() => CheckFeatureCreateOrConnectWithoutCheckTaskInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CheckFeatureUpsertWithWhereUniqueWithoutCheckTaskInputSchema),z.lazy(() => CheckFeatureUpsertWithWhereUniqueWithoutCheckTaskInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CheckFeatureCreateManyCheckTaskInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CheckFeatureWhereUniqueInputSchema),z.lazy(() => CheckFeatureWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CheckFeatureWhereUniqueInputSchema),z.lazy(() => CheckFeatureWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CheckFeatureWhereUniqueInputSchema),z.lazy(() => CheckFeatureWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CheckFeatureWhereUniqueInputSchema),z.lazy(() => CheckFeatureWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CheckFeatureUpdateWithWhereUniqueWithoutCheckTaskInputSchema),z.lazy(() => CheckFeatureUpdateWithWhereUniqueWithoutCheckTaskInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CheckFeatureUpdateManyWithWhereWithoutCheckTaskInputSchema),z.lazy(() => CheckFeatureUpdateManyWithWhereWithoutCheckTaskInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CheckFeatureScalarWhereInputSchema),z.lazy(() => CheckFeatureScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CheckFeatureUpdateManyWithoutCheckTaskNestedInput>;

export const CheckFeatureUncheckedUpdateManyWithoutCheckTaskNestedInputSchema: z.ZodType<Prisma.CheckFeatureUncheckedUpdateManyWithoutCheckTaskNestedInput> = z.object({
  create: z.union([ z.lazy(() => CheckFeatureCreateWithoutCheckTaskInputSchema),z.lazy(() => CheckFeatureCreateWithoutCheckTaskInputSchema).array(),z.lazy(() => CheckFeatureUncheckedCreateWithoutCheckTaskInputSchema),z.lazy(() => CheckFeatureUncheckedCreateWithoutCheckTaskInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CheckFeatureCreateOrConnectWithoutCheckTaskInputSchema),z.lazy(() => CheckFeatureCreateOrConnectWithoutCheckTaskInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CheckFeatureUpsertWithWhereUniqueWithoutCheckTaskInputSchema),z.lazy(() => CheckFeatureUpsertWithWhereUniqueWithoutCheckTaskInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CheckFeatureCreateManyCheckTaskInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CheckFeatureWhereUniqueInputSchema),z.lazy(() => CheckFeatureWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CheckFeatureWhereUniqueInputSchema),z.lazy(() => CheckFeatureWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CheckFeatureWhereUniqueInputSchema),z.lazy(() => CheckFeatureWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CheckFeatureWhereUniqueInputSchema),z.lazy(() => CheckFeatureWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CheckFeatureUpdateWithWhereUniqueWithoutCheckTaskInputSchema),z.lazy(() => CheckFeatureUpdateWithWhereUniqueWithoutCheckTaskInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CheckFeatureUpdateManyWithWhereWithoutCheckTaskInputSchema),z.lazy(() => CheckFeatureUpdateManyWithWhereWithoutCheckTaskInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CheckFeatureScalarWhereInputSchema),z.lazy(() => CheckFeatureScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CheckFeatureUncheckedUpdateManyWithoutCheckTaskNestedInput>;

export const CheckTaskCreateNestedOneWithoutCheckFeaturesInputSchema: z.ZodType<Prisma.CheckTaskCreateNestedOneWithoutCheckFeaturesInput> = z.object({
  create: z.union([ z.lazy(() => CheckTaskCreateWithoutCheckFeaturesInputSchema),z.lazy(() => CheckTaskUncheckedCreateWithoutCheckFeaturesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CheckTaskCreateOrConnectWithoutCheckFeaturesInputSchema).optional(),
  connect: z.lazy(() => CheckTaskWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.CheckTaskCreateNestedOneWithoutCheckFeaturesInput>;

export const CheckTaskUpdateOneRequiredWithoutCheckFeaturesNestedInputSchema: z.ZodType<Prisma.CheckTaskUpdateOneRequiredWithoutCheckFeaturesNestedInput> = z.object({
  create: z.union([ z.lazy(() => CheckTaskCreateWithoutCheckFeaturesInputSchema),z.lazy(() => CheckTaskUncheckedCreateWithoutCheckFeaturesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CheckTaskCreateOrConnectWithoutCheckFeaturesInputSchema).optional(),
  upsert: z.lazy(() => CheckTaskUpsertWithoutCheckFeaturesInputSchema).optional(),
  connect: z.lazy(() => CheckTaskWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CheckTaskUpdateToOneWithWhereWithoutCheckFeaturesInputSchema),z.lazy(() => CheckTaskUpdateWithoutCheckFeaturesInputSchema),z.lazy(() => CheckTaskUncheckedUpdateWithoutCheckFeaturesInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CheckTaskUpdateOneRequiredWithoutCheckFeaturesNestedInput>;

export const TaskCreateNestedOneWithoutPictureTaskInputSchema: z.ZodType<Prisma.TaskCreateNestedOneWithoutPictureTaskInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutPictureTaskInputSchema),z.lazy(() => TaskUncheckedCreateWithoutPictureTaskInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TaskCreateOrConnectWithoutPictureTaskInputSchema).optional(),
  connect: z.lazy(() => TaskWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.TaskCreateNestedOneWithoutPictureTaskInput>;

export const TaskUpdateOneRequiredWithoutPictureTaskNestedInputSchema: z.ZodType<Prisma.TaskUpdateOneRequiredWithoutPictureTaskNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutPictureTaskInputSchema),z.lazy(() => TaskUncheckedCreateWithoutPictureTaskInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TaskCreateOrConnectWithoutPictureTaskInputSchema).optional(),
  upsert: z.lazy(() => TaskUpsertWithoutPictureTaskInputSchema).optional(),
  connect: z.lazy(() => TaskWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TaskUpdateToOneWithWhereWithoutPictureTaskInputSchema),z.lazy(() => TaskUpdateWithoutPictureTaskInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutPictureTaskInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.TaskUpdateOneRequiredWithoutPictureTaskNestedInput>;

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

export const NestedEnumOrderStatusFilterSchema: z.ZodType<Prisma.NestedEnumOrderStatusFilter> = z.object({
  equals: z.lazy(() => OrderStatusSchema).optional(),
  in: z.lazy(() => OrderStatusSchema).array().optional(),
  notIn: z.lazy(() => OrderStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => OrderStatusSchema),z.lazy(() => NestedEnumOrderStatusFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.NestedEnumOrderStatusFilter>;

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

export const NestedEnumLabelingLanguageFilterSchema: z.ZodType<Prisma.NestedEnumLabelingLanguageFilter> = z.object({
  equals: z.lazy(() => LabelingLanguageSchema).optional(),
  in: z.lazy(() => LabelingLanguageSchema).array().optional(),
  notIn: z.lazy(() => LabelingLanguageSchema).array().optional(),
  not: z.union([ z.lazy(() => LabelingLanguageSchema),z.lazy(() => NestedEnumLabelingLanguageFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.NestedEnumLabelingLanguageFilter>;

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.NestedFloatNullableFilter>;

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.NestedIntNullableFilter>;

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

export const NestedEnumOrderStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumOrderStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => OrderStatusSchema).optional(),
  in: z.lazy(() => OrderStatusSchema).array().optional(),
  notIn: z.lazy(() => OrderStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => OrderStatusSchema),z.lazy(() => NestedEnumOrderStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumOrderStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumOrderStatusFilterSchema).optional()
}).strict() as z.ZodType<Prisma.NestedEnumOrderStatusWithAggregatesFilter>;

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict() as z.ZodType<Prisma.NestedFloatWithAggregatesFilter>;

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

export const NestedFloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional()
}).strict() as z.ZodType<Prisma.NestedFloatNullableWithAggregatesFilter>;

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict() as z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter>;

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.NestedStringNullableFilter>;

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict() as z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter>;

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

export const NestedBoolNullableFilterSchema: z.ZodType<Prisma.NestedBoolNullableFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableFilterSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.NestedBoolNullableFilter>;

export const NestedBoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional()
}).strict() as z.ZodType<Prisma.NestedBoolNullableWithAggregatesFilter>;

export const TaskCreateWithoutAssignedToInputSchema: z.ZodType<Prisma.TaskCreateWithoutAssignedToInput> = z.object({
  id: z.string().uuid().optional(),
  type: z.lazy(() => TaskTypeSchema),
  endDate: z.coerce.date(),
  estimatedReward: z.number(),
  order: z.lazy(() => OrderCreateNestedOneWithoutTasksInputSchema),
  labelTask: z.lazy(() => LabelTaskCreateNestedOneWithoutTaskInputSchema).optional(),
  checkTask: z.lazy(() => CheckTaskCreateNestedOneWithoutTaskInputSchema).optional(),
  pictureTask: z.lazy(() => PictureTaskCreateNestedOneWithoutTaskInputSchema).optional()
}).strict() as z.ZodType<Prisma.TaskCreateWithoutAssignedToInput>;

export const TaskUncheckedCreateWithoutAssignedToInputSchema: z.ZodType<Prisma.TaskUncheckedCreateWithoutAssignedToInput> = z.object({
  id: z.string().uuid().optional(),
  type: z.lazy(() => TaskTypeSchema),
  endDate: z.coerce.date(),
  estimatedReward: z.number(),
  orderId: z.string(),
  labelTask: z.lazy(() => LabelTaskUncheckedCreateNestedOneWithoutTaskInputSchema).optional(),
  checkTask: z.lazy(() => CheckTaskUncheckedCreateNestedOneWithoutTaskInputSchema).optional(),
  pictureTask: z.lazy(() => PictureTaskUncheckedCreateNestedOneWithoutTaskInputSchema).optional()
}).strict() as z.ZodType<Prisma.TaskUncheckedCreateWithoutAssignedToInput>;

export const TaskCreateOrConnectWithoutAssignedToInputSchema: z.ZodType<Prisma.TaskCreateOrConnectWithoutAssignedToInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TaskCreateWithoutAssignedToInputSchema),z.lazy(() => TaskUncheckedCreateWithoutAssignedToInputSchema) ]),
}).strict() as z.ZodType<Prisma.TaskCreateOrConnectWithoutAssignedToInput>;

export const TaskCreateManyAssignedToInputEnvelopeSchema: z.ZodType<Prisma.TaskCreateManyAssignedToInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TaskCreateManyAssignedToInputSchema),z.lazy(() => TaskCreateManyAssignedToInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.TaskCreateManyAssignedToInputEnvelope>;

export const TaskUpsertWithWhereUniqueWithoutAssignedToInputSchema: z.ZodType<Prisma.TaskUpsertWithWhereUniqueWithoutAssignedToInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TaskUpdateWithoutAssignedToInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutAssignedToInputSchema) ]),
  create: z.union([ z.lazy(() => TaskCreateWithoutAssignedToInputSchema),z.lazy(() => TaskUncheckedCreateWithoutAssignedToInputSchema) ]),
}).strict() as z.ZodType<Prisma.TaskUpsertWithWhereUniqueWithoutAssignedToInput>;

export const TaskUpdateWithWhereUniqueWithoutAssignedToInputSchema: z.ZodType<Prisma.TaskUpdateWithWhereUniqueWithoutAssignedToInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TaskUpdateWithoutAssignedToInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutAssignedToInputSchema) ]),
}).strict() as z.ZodType<Prisma.TaskUpdateWithWhereUniqueWithoutAssignedToInput>;

export const TaskUpdateManyWithWhereWithoutAssignedToInputSchema: z.ZodType<Prisma.TaskUpdateManyWithWhereWithoutAssignedToInput> = z.object({
  where: z.lazy(() => TaskScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TaskUpdateManyMutationInputSchema),z.lazy(() => TaskUncheckedUpdateManyWithoutAssignedToInputSchema) ]),
}).strict() as z.ZodType<Prisma.TaskUpdateManyWithWhereWithoutAssignedToInput>;

export const TaskScalarWhereInputSchema: z.ZodType<Prisma.TaskScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TaskScalarWhereInputSchema),z.lazy(() => TaskScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskScalarWhereInputSchema),z.lazy(() => TaskScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumTaskTypeFilterSchema),z.lazy(() => TaskTypeSchema) ]).optional(),
  endDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  estimatedReward: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  assignedToId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  orderId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict() as z.ZodType<Prisma.TaskScalarWhereInput>;

export const FeatureCreateWithoutOrderInputSchema: z.ZodType<Prisma.FeatureCreateWithoutOrderInput> = z.object({
  name: z.string(),
  labelGuidelines: z.string(),
  exampleLabel: z.string().optional().nullable(),
  featureLabels: z.lazy(() => FeatureLabelCreateNestedManyWithoutFeatureInputSchema).optional()
}).strict() as z.ZodType<Prisma.FeatureCreateWithoutOrderInput>;

export const FeatureUncheckedCreateWithoutOrderInputSchema: z.ZodType<Prisma.FeatureUncheckedCreateWithoutOrderInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  labelGuidelines: z.string(),
  exampleLabel: z.string().optional().nullable(),
  featureLabels: z.lazy(() => FeatureLabelUncheckedCreateNestedManyWithoutFeatureInputSchema).optional()
}).strict() as z.ZodType<Prisma.FeatureUncheckedCreateWithoutOrderInput>;

export const FeatureCreateOrConnectWithoutOrderInputSchema: z.ZodType<Prisma.FeatureCreateOrConnectWithoutOrderInput> = z.object({
  where: z.lazy(() => FeatureWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FeatureCreateWithoutOrderInputSchema),z.lazy(() => FeatureUncheckedCreateWithoutOrderInputSchema) ]),
}).strict() as z.ZodType<Prisma.FeatureCreateOrConnectWithoutOrderInput>;

export const FeatureCreateManyOrderInputEnvelopeSchema: z.ZodType<Prisma.FeatureCreateManyOrderInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => FeatureCreateManyOrderInputSchema),z.lazy(() => FeatureCreateManyOrderInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.FeatureCreateManyOrderInputEnvelope>;

export const TaskCreateWithoutOrderInputSchema: z.ZodType<Prisma.TaskCreateWithoutOrderInput> = z.object({
  id: z.string().uuid().optional(),
  type: z.lazy(() => TaskTypeSchema),
  endDate: z.coerce.date(),
  estimatedReward: z.number(),
  assignedTo: z.lazy(() => UserCreateNestedOneWithoutTasksInputSchema).optional(),
  labelTask: z.lazy(() => LabelTaskCreateNestedOneWithoutTaskInputSchema).optional(),
  checkTask: z.lazy(() => CheckTaskCreateNestedOneWithoutTaskInputSchema).optional(),
  pictureTask: z.lazy(() => PictureTaskCreateNestedOneWithoutTaskInputSchema).optional()
}).strict() as z.ZodType<Prisma.TaskCreateWithoutOrderInput>;

export const TaskUncheckedCreateWithoutOrderInputSchema: z.ZodType<Prisma.TaskUncheckedCreateWithoutOrderInput> = z.object({
  id: z.string().uuid().optional(),
  type: z.lazy(() => TaskTypeSchema),
  endDate: z.coerce.date(),
  estimatedReward: z.number(),
  assignedToId: z.string().optional().nullable(),
  labelTask: z.lazy(() => LabelTaskUncheckedCreateNestedOneWithoutTaskInputSchema).optional(),
  checkTask: z.lazy(() => CheckTaskUncheckedCreateNestedOneWithoutTaskInputSchema).optional(),
  pictureTask: z.lazy(() => PictureTaskUncheckedCreateNestedOneWithoutTaskInputSchema).optional()
}).strict() as z.ZodType<Prisma.TaskUncheckedCreateWithoutOrderInput>;

export const TaskCreateOrConnectWithoutOrderInputSchema: z.ZodType<Prisma.TaskCreateOrConnectWithoutOrderInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TaskCreateWithoutOrderInputSchema),z.lazy(() => TaskUncheckedCreateWithoutOrderInputSchema) ]),
}).strict() as z.ZodType<Prisma.TaskCreateOrConnectWithoutOrderInput>;

export const TaskCreateManyOrderInputEnvelopeSchema: z.ZodType<Prisma.TaskCreateManyOrderInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TaskCreateManyOrderInputSchema),z.lazy(() => TaskCreateManyOrderInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.TaskCreateManyOrderInputEnvelope>;

export const FeatureUpsertWithWhereUniqueWithoutOrderInputSchema: z.ZodType<Prisma.FeatureUpsertWithWhereUniqueWithoutOrderInput> = z.object({
  where: z.lazy(() => FeatureWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FeatureUpdateWithoutOrderInputSchema),z.lazy(() => FeatureUncheckedUpdateWithoutOrderInputSchema) ]),
  create: z.union([ z.lazy(() => FeatureCreateWithoutOrderInputSchema),z.lazy(() => FeatureUncheckedCreateWithoutOrderInputSchema) ]),
}).strict() as z.ZodType<Prisma.FeatureUpsertWithWhereUniqueWithoutOrderInput>;

export const FeatureUpdateWithWhereUniqueWithoutOrderInputSchema: z.ZodType<Prisma.FeatureUpdateWithWhereUniqueWithoutOrderInput> = z.object({
  where: z.lazy(() => FeatureWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FeatureUpdateWithoutOrderInputSchema),z.lazy(() => FeatureUncheckedUpdateWithoutOrderInputSchema) ]),
}).strict() as z.ZodType<Prisma.FeatureUpdateWithWhereUniqueWithoutOrderInput>;

export const FeatureUpdateManyWithWhereWithoutOrderInputSchema: z.ZodType<Prisma.FeatureUpdateManyWithWhereWithoutOrderInput> = z.object({
  where: z.lazy(() => FeatureScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FeatureUpdateManyMutationInputSchema),z.lazy(() => FeatureUncheckedUpdateManyWithoutOrderInputSchema) ]),
}).strict() as z.ZodType<Prisma.FeatureUpdateManyWithWhereWithoutOrderInput>;

export const FeatureScalarWhereInputSchema: z.ZodType<Prisma.FeatureScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FeatureScalarWhereInputSchema),z.lazy(() => FeatureScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FeatureScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FeatureScalarWhereInputSchema),z.lazy(() => FeatureScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  orderId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  labelGuidelines: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  exampleLabel: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.FeatureScalarWhereInput>;

export const TaskUpsertWithWhereUniqueWithoutOrderInputSchema: z.ZodType<Prisma.TaskUpsertWithWhereUniqueWithoutOrderInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TaskUpdateWithoutOrderInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutOrderInputSchema) ]),
  create: z.union([ z.lazy(() => TaskCreateWithoutOrderInputSchema),z.lazy(() => TaskUncheckedCreateWithoutOrderInputSchema) ]),
}).strict() as z.ZodType<Prisma.TaskUpsertWithWhereUniqueWithoutOrderInput>;

export const TaskUpdateWithWhereUniqueWithoutOrderInputSchema: z.ZodType<Prisma.TaskUpdateWithWhereUniqueWithoutOrderInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TaskUpdateWithoutOrderInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutOrderInputSchema) ]),
}).strict() as z.ZodType<Prisma.TaskUpdateWithWhereUniqueWithoutOrderInput>;

export const TaskUpdateManyWithWhereWithoutOrderInputSchema: z.ZodType<Prisma.TaskUpdateManyWithWhereWithoutOrderInput> = z.object({
  where: z.lazy(() => TaskScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TaskUpdateManyMutationInputSchema),z.lazy(() => TaskUncheckedUpdateManyWithoutOrderInputSchema) ]),
}).strict() as z.ZodType<Prisma.TaskUpdateManyWithWhereWithoutOrderInput>;

export const OrderCreateWithoutFeaturesInputSchema: z.ZodType<Prisma.OrderCreateWithoutFeaturesInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  status: z.lazy(() => OrderStatusSchema).optional(),
  budget: z.number(),
  labelingLanguage: z.lazy(() => LabelingLanguageSchema),
  datasetDescription: z.string(),
  exampleImageUrl: z.string(),
  imageGuidelines: z.string(),
  minSamplesCount: z.number().int(),
  currentSamplesCount: z.number().int().optional(),
  entryFee: z.number().optional().nullable(),
  reward: z.number().optional().nullable(),
  minContributors: z.number().int().optional().nullable(),
  contributors: z.number().int().optional().nullable(),
  tasks: z.lazy(() => TaskCreateNestedManyWithoutOrderInputSchema).optional()
}).strict() as z.ZodType<Prisma.OrderCreateWithoutFeaturesInput>;

export const OrderUncheckedCreateWithoutFeaturesInputSchema: z.ZodType<Prisma.OrderUncheckedCreateWithoutFeaturesInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  status: z.lazy(() => OrderStatusSchema).optional(),
  budget: z.number(),
  labelingLanguage: z.lazy(() => LabelingLanguageSchema),
  datasetDescription: z.string(),
  exampleImageUrl: z.string(),
  imageGuidelines: z.string(),
  minSamplesCount: z.number().int(),
  currentSamplesCount: z.number().int().optional(),
  entryFee: z.number().optional().nullable(),
  reward: z.number().optional().nullable(),
  minContributors: z.number().int().optional().nullable(),
  contributors: z.number().int().optional().nullable(),
  tasks: z.lazy(() => TaskUncheckedCreateNestedManyWithoutOrderInputSchema).optional()
}).strict() as z.ZodType<Prisma.OrderUncheckedCreateWithoutFeaturesInput>;

export const OrderCreateOrConnectWithoutFeaturesInputSchema: z.ZodType<Prisma.OrderCreateOrConnectWithoutFeaturesInput> = z.object({
  where: z.lazy(() => OrderWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => OrderCreateWithoutFeaturesInputSchema),z.lazy(() => OrderUncheckedCreateWithoutFeaturesInputSchema) ]),
}).strict() as z.ZodType<Prisma.OrderCreateOrConnectWithoutFeaturesInput>;

export const FeatureLabelCreateWithoutFeatureInputSchema: z.ZodType<Prisma.FeatureLabelCreateWithoutFeatureInput> = z.object({
  featureLabel: z.string(),
  labelTask: z.lazy(() => LabelTaskCreateNestedOneWithoutFeatureLabelsInputSchema)
}).strict() as z.ZodType<Prisma.FeatureLabelCreateWithoutFeatureInput>;

export const FeatureLabelUncheckedCreateWithoutFeatureInputSchema: z.ZodType<Prisma.FeatureLabelUncheckedCreateWithoutFeatureInput> = z.object({
  id: z.number().int().optional(),
  labelTaskId: z.string(),
  featureLabel: z.string()
}).strict() as z.ZodType<Prisma.FeatureLabelUncheckedCreateWithoutFeatureInput>;

export const FeatureLabelCreateOrConnectWithoutFeatureInputSchema: z.ZodType<Prisma.FeatureLabelCreateOrConnectWithoutFeatureInput> = z.object({
  where: z.lazy(() => FeatureLabelWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FeatureLabelCreateWithoutFeatureInputSchema),z.lazy(() => FeatureLabelUncheckedCreateWithoutFeatureInputSchema) ]),
}).strict() as z.ZodType<Prisma.FeatureLabelCreateOrConnectWithoutFeatureInput>;

export const FeatureLabelCreateManyFeatureInputEnvelopeSchema: z.ZodType<Prisma.FeatureLabelCreateManyFeatureInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => FeatureLabelCreateManyFeatureInputSchema),z.lazy(() => FeatureLabelCreateManyFeatureInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.FeatureLabelCreateManyFeatureInputEnvelope>;

export const OrderUpsertWithoutFeaturesInputSchema: z.ZodType<Prisma.OrderUpsertWithoutFeaturesInput> = z.object({
  update: z.union([ z.lazy(() => OrderUpdateWithoutFeaturesInputSchema),z.lazy(() => OrderUncheckedUpdateWithoutFeaturesInputSchema) ]),
  create: z.union([ z.lazy(() => OrderCreateWithoutFeaturesInputSchema),z.lazy(() => OrderUncheckedCreateWithoutFeaturesInputSchema) ]),
  where: z.lazy(() => OrderWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.OrderUpsertWithoutFeaturesInput>;

export const OrderUpdateToOneWithWhereWithoutFeaturesInputSchema: z.ZodType<Prisma.OrderUpdateToOneWithWhereWithoutFeaturesInput> = z.object({
  where: z.lazy(() => OrderWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => OrderUpdateWithoutFeaturesInputSchema),z.lazy(() => OrderUncheckedUpdateWithoutFeaturesInputSchema) ]),
}).strict() as z.ZodType<Prisma.OrderUpdateToOneWithWhereWithoutFeaturesInput>;

export const OrderUpdateWithoutFeaturesInputSchema: z.ZodType<Prisma.OrderUpdateWithoutFeaturesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => OrderStatusSchema),z.lazy(() => EnumOrderStatusFieldUpdateOperationsInputSchema) ]).optional(),
  budget: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  labelingLanguage: z.union([ z.lazy(() => LabelingLanguageSchema),z.lazy(() => EnumLabelingLanguageFieldUpdateOperationsInputSchema) ]).optional(),
  datasetDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  exampleImageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageGuidelines: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  minSamplesCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  currentSamplesCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  entryFee: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reward: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  minContributors: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contributors: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tasks: z.lazy(() => TaskUpdateManyWithoutOrderNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.OrderUpdateWithoutFeaturesInput>;

export const OrderUncheckedUpdateWithoutFeaturesInputSchema: z.ZodType<Prisma.OrderUncheckedUpdateWithoutFeaturesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => OrderStatusSchema),z.lazy(() => EnumOrderStatusFieldUpdateOperationsInputSchema) ]).optional(),
  budget: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  labelingLanguage: z.union([ z.lazy(() => LabelingLanguageSchema),z.lazy(() => EnumLabelingLanguageFieldUpdateOperationsInputSchema) ]).optional(),
  datasetDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  exampleImageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageGuidelines: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  minSamplesCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  currentSamplesCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  entryFee: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reward: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  minContributors: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contributors: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tasks: z.lazy(() => TaskUncheckedUpdateManyWithoutOrderNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.OrderUncheckedUpdateWithoutFeaturesInput>;

export const FeatureLabelUpsertWithWhereUniqueWithoutFeatureInputSchema: z.ZodType<Prisma.FeatureLabelUpsertWithWhereUniqueWithoutFeatureInput> = z.object({
  where: z.lazy(() => FeatureLabelWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FeatureLabelUpdateWithoutFeatureInputSchema),z.lazy(() => FeatureLabelUncheckedUpdateWithoutFeatureInputSchema) ]),
  create: z.union([ z.lazy(() => FeatureLabelCreateWithoutFeatureInputSchema),z.lazy(() => FeatureLabelUncheckedCreateWithoutFeatureInputSchema) ]),
}).strict() as z.ZodType<Prisma.FeatureLabelUpsertWithWhereUniqueWithoutFeatureInput>;

export const FeatureLabelUpdateWithWhereUniqueWithoutFeatureInputSchema: z.ZodType<Prisma.FeatureLabelUpdateWithWhereUniqueWithoutFeatureInput> = z.object({
  where: z.lazy(() => FeatureLabelWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FeatureLabelUpdateWithoutFeatureInputSchema),z.lazy(() => FeatureLabelUncheckedUpdateWithoutFeatureInputSchema) ]),
}).strict() as z.ZodType<Prisma.FeatureLabelUpdateWithWhereUniqueWithoutFeatureInput>;

export const FeatureLabelUpdateManyWithWhereWithoutFeatureInputSchema: z.ZodType<Prisma.FeatureLabelUpdateManyWithWhereWithoutFeatureInput> = z.object({
  where: z.lazy(() => FeatureLabelScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FeatureLabelUpdateManyMutationInputSchema),z.lazy(() => FeatureLabelUncheckedUpdateManyWithoutFeatureInputSchema) ]),
}).strict() as z.ZodType<Prisma.FeatureLabelUpdateManyWithWhereWithoutFeatureInput>;

export const FeatureLabelScalarWhereInputSchema: z.ZodType<Prisma.FeatureLabelScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FeatureLabelScalarWhereInputSchema),z.lazy(() => FeatureLabelScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FeatureLabelScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FeatureLabelScalarWhereInputSchema),z.lazy(() => FeatureLabelScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  labelTaskId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  featureId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  featureLabel: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict() as z.ZodType<Prisma.FeatureLabelScalarWhereInput>;

export const UserCreateWithoutTasksInputSchema: z.ZodType<Prisma.UserCreateWithoutTasksInput> = z.object({
  id: z.string().uuid().optional()
}).strict() as z.ZodType<Prisma.UserCreateWithoutTasksInput>;

export const UserUncheckedCreateWithoutTasksInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutTasksInput> = z.object({
  id: z.string().uuid().optional()
}).strict() as z.ZodType<Prisma.UserUncheckedCreateWithoutTasksInput>;

export const UserCreateOrConnectWithoutTasksInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutTasksInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutTasksInputSchema),z.lazy(() => UserUncheckedCreateWithoutTasksInputSchema) ]),
}).strict() as z.ZodType<Prisma.UserCreateOrConnectWithoutTasksInput>;

export const OrderCreateWithoutTasksInputSchema: z.ZodType<Prisma.OrderCreateWithoutTasksInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  status: z.lazy(() => OrderStatusSchema).optional(),
  budget: z.number(),
  labelingLanguage: z.lazy(() => LabelingLanguageSchema),
  datasetDescription: z.string(),
  exampleImageUrl: z.string(),
  imageGuidelines: z.string(),
  minSamplesCount: z.number().int(),
  currentSamplesCount: z.number().int().optional(),
  entryFee: z.number().optional().nullable(),
  reward: z.number().optional().nullable(),
  minContributors: z.number().int().optional().nullable(),
  contributors: z.number().int().optional().nullable(),
  features: z.lazy(() => FeatureCreateNestedManyWithoutOrderInputSchema).optional()
}).strict() as z.ZodType<Prisma.OrderCreateWithoutTasksInput>;

export const OrderUncheckedCreateWithoutTasksInputSchema: z.ZodType<Prisma.OrderUncheckedCreateWithoutTasksInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  status: z.lazy(() => OrderStatusSchema).optional(),
  budget: z.number(),
  labelingLanguage: z.lazy(() => LabelingLanguageSchema),
  datasetDescription: z.string(),
  exampleImageUrl: z.string(),
  imageGuidelines: z.string(),
  minSamplesCount: z.number().int(),
  currentSamplesCount: z.number().int().optional(),
  entryFee: z.number().optional().nullable(),
  reward: z.number().optional().nullable(),
  minContributors: z.number().int().optional().nullable(),
  contributors: z.number().int().optional().nullable(),
  features: z.lazy(() => FeatureUncheckedCreateNestedManyWithoutOrderInputSchema).optional()
}).strict() as z.ZodType<Prisma.OrderUncheckedCreateWithoutTasksInput>;

export const OrderCreateOrConnectWithoutTasksInputSchema: z.ZodType<Prisma.OrderCreateOrConnectWithoutTasksInput> = z.object({
  where: z.lazy(() => OrderWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => OrderCreateWithoutTasksInputSchema),z.lazy(() => OrderUncheckedCreateWithoutTasksInputSchema) ]),
}).strict() as z.ZodType<Prisma.OrderCreateOrConnectWithoutTasksInput>;

export const LabelTaskCreateWithoutTaskInputSchema: z.ZodType<Prisma.LabelTaskCreateWithoutTaskInput> = z.object({
  id: z.string().uuid().optional(),
  featureLabels: z.lazy(() => FeatureLabelCreateNestedManyWithoutLabelTaskInputSchema).optional()
}).strict() as z.ZodType<Prisma.LabelTaskCreateWithoutTaskInput>;

export const LabelTaskUncheckedCreateWithoutTaskInputSchema: z.ZodType<Prisma.LabelTaskUncheckedCreateWithoutTaskInput> = z.object({
  id: z.string().uuid().optional(),
  featureLabels: z.lazy(() => FeatureLabelUncheckedCreateNestedManyWithoutLabelTaskInputSchema).optional()
}).strict() as z.ZodType<Prisma.LabelTaskUncheckedCreateWithoutTaskInput>;

export const LabelTaskCreateOrConnectWithoutTaskInputSchema: z.ZodType<Prisma.LabelTaskCreateOrConnectWithoutTaskInput> = z.object({
  where: z.lazy(() => LabelTaskWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LabelTaskCreateWithoutTaskInputSchema),z.lazy(() => LabelTaskUncheckedCreateWithoutTaskInputSchema) ]),
}).strict() as z.ZodType<Prisma.LabelTaskCreateOrConnectWithoutTaskInput>;

export const CheckTaskCreateWithoutTaskInputSchema: z.ZodType<Prisma.CheckTaskCreateWithoutTaskInput> = z.object({
  id: z.string().uuid().optional(),
  isCorrect: z.boolean().optional().nullable(),
  checkFeatures: z.lazy(() => CheckFeatureCreateNestedManyWithoutCheckTaskInputSchema).optional()
}).strict() as z.ZodType<Prisma.CheckTaskCreateWithoutTaskInput>;

export const CheckTaskUncheckedCreateWithoutTaskInputSchema: z.ZodType<Prisma.CheckTaskUncheckedCreateWithoutTaskInput> = z.object({
  id: z.string().uuid().optional(),
  isCorrect: z.boolean().optional().nullable(),
  checkFeatures: z.lazy(() => CheckFeatureUncheckedCreateNestedManyWithoutCheckTaskInputSchema).optional()
}).strict() as z.ZodType<Prisma.CheckTaskUncheckedCreateWithoutTaskInput>;

export const CheckTaskCreateOrConnectWithoutTaskInputSchema: z.ZodType<Prisma.CheckTaskCreateOrConnectWithoutTaskInput> = z.object({
  where: z.lazy(() => CheckTaskWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CheckTaskCreateWithoutTaskInputSchema),z.lazy(() => CheckTaskUncheckedCreateWithoutTaskInputSchema) ]),
}).strict() as z.ZodType<Prisma.CheckTaskCreateOrConnectWithoutTaskInput>;

export const PictureTaskCreateWithoutTaskInputSchema: z.ZodType<Prisma.PictureTaskCreateWithoutTaskInput> = z.object({
  id: z.string().uuid().optional(),
  exampleImgUrl: z.string().optional().nullable()
}).strict() as z.ZodType<Prisma.PictureTaskCreateWithoutTaskInput>;

export const PictureTaskUncheckedCreateWithoutTaskInputSchema: z.ZodType<Prisma.PictureTaskUncheckedCreateWithoutTaskInput> = z.object({
  id: z.string().uuid().optional(),
  exampleImgUrl: z.string().optional().nullable()
}).strict() as z.ZodType<Prisma.PictureTaskUncheckedCreateWithoutTaskInput>;

export const PictureTaskCreateOrConnectWithoutTaskInputSchema: z.ZodType<Prisma.PictureTaskCreateOrConnectWithoutTaskInput> = z.object({
  where: z.lazy(() => PictureTaskWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PictureTaskCreateWithoutTaskInputSchema),z.lazy(() => PictureTaskUncheckedCreateWithoutTaskInputSchema) ]),
}).strict() as z.ZodType<Prisma.PictureTaskCreateOrConnectWithoutTaskInput>;

export const UserUpsertWithoutTasksInputSchema: z.ZodType<Prisma.UserUpsertWithoutTasksInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutTasksInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTasksInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutTasksInputSchema),z.lazy(() => UserUncheckedCreateWithoutTasksInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUpsertWithoutTasksInput>;

export const UserUpdateToOneWithWhereWithoutTasksInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutTasksInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutTasksInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTasksInputSchema) ]),
}).strict() as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutTasksInput>;

export const UserUpdateWithoutTasksInputSchema: z.ZodType<Prisma.UserUpdateWithoutTasksInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.UserUpdateWithoutTasksInput>;

export const UserUncheckedUpdateWithoutTasksInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutTasksInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.UserUncheckedUpdateWithoutTasksInput>;

export const OrderUpsertWithoutTasksInputSchema: z.ZodType<Prisma.OrderUpsertWithoutTasksInput> = z.object({
  update: z.union([ z.lazy(() => OrderUpdateWithoutTasksInputSchema),z.lazy(() => OrderUncheckedUpdateWithoutTasksInputSchema) ]),
  create: z.union([ z.lazy(() => OrderCreateWithoutTasksInputSchema),z.lazy(() => OrderUncheckedCreateWithoutTasksInputSchema) ]),
  where: z.lazy(() => OrderWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.OrderUpsertWithoutTasksInput>;

export const OrderUpdateToOneWithWhereWithoutTasksInputSchema: z.ZodType<Prisma.OrderUpdateToOneWithWhereWithoutTasksInput> = z.object({
  where: z.lazy(() => OrderWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => OrderUpdateWithoutTasksInputSchema),z.lazy(() => OrderUncheckedUpdateWithoutTasksInputSchema) ]),
}).strict() as z.ZodType<Prisma.OrderUpdateToOneWithWhereWithoutTasksInput>;

export const OrderUpdateWithoutTasksInputSchema: z.ZodType<Prisma.OrderUpdateWithoutTasksInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => OrderStatusSchema),z.lazy(() => EnumOrderStatusFieldUpdateOperationsInputSchema) ]).optional(),
  budget: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  labelingLanguage: z.union([ z.lazy(() => LabelingLanguageSchema),z.lazy(() => EnumLabelingLanguageFieldUpdateOperationsInputSchema) ]).optional(),
  datasetDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  exampleImageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageGuidelines: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  minSamplesCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  currentSamplesCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  entryFee: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reward: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  minContributors: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contributors: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  features: z.lazy(() => FeatureUpdateManyWithoutOrderNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.OrderUpdateWithoutTasksInput>;

export const OrderUncheckedUpdateWithoutTasksInputSchema: z.ZodType<Prisma.OrderUncheckedUpdateWithoutTasksInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => OrderStatusSchema),z.lazy(() => EnumOrderStatusFieldUpdateOperationsInputSchema) ]).optional(),
  budget: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  labelingLanguage: z.union([ z.lazy(() => LabelingLanguageSchema),z.lazy(() => EnumLabelingLanguageFieldUpdateOperationsInputSchema) ]).optional(),
  datasetDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  exampleImageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageGuidelines: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  minSamplesCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  currentSamplesCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  entryFee: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reward: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  minContributors: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contributors: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  features: z.lazy(() => FeatureUncheckedUpdateManyWithoutOrderNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.OrderUncheckedUpdateWithoutTasksInput>;

export const LabelTaskUpsertWithoutTaskInputSchema: z.ZodType<Prisma.LabelTaskUpsertWithoutTaskInput> = z.object({
  update: z.union([ z.lazy(() => LabelTaskUpdateWithoutTaskInputSchema),z.lazy(() => LabelTaskUncheckedUpdateWithoutTaskInputSchema) ]),
  create: z.union([ z.lazy(() => LabelTaskCreateWithoutTaskInputSchema),z.lazy(() => LabelTaskUncheckedCreateWithoutTaskInputSchema) ]),
  where: z.lazy(() => LabelTaskWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.LabelTaskUpsertWithoutTaskInput>;

export const LabelTaskUpdateToOneWithWhereWithoutTaskInputSchema: z.ZodType<Prisma.LabelTaskUpdateToOneWithWhereWithoutTaskInput> = z.object({
  where: z.lazy(() => LabelTaskWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => LabelTaskUpdateWithoutTaskInputSchema),z.lazy(() => LabelTaskUncheckedUpdateWithoutTaskInputSchema) ]),
}).strict() as z.ZodType<Prisma.LabelTaskUpdateToOneWithWhereWithoutTaskInput>;

export const LabelTaskUpdateWithoutTaskInputSchema: z.ZodType<Prisma.LabelTaskUpdateWithoutTaskInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  featureLabels: z.lazy(() => FeatureLabelUpdateManyWithoutLabelTaskNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.LabelTaskUpdateWithoutTaskInput>;

export const LabelTaskUncheckedUpdateWithoutTaskInputSchema: z.ZodType<Prisma.LabelTaskUncheckedUpdateWithoutTaskInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  featureLabels: z.lazy(() => FeatureLabelUncheckedUpdateManyWithoutLabelTaskNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.LabelTaskUncheckedUpdateWithoutTaskInput>;

export const CheckTaskUpsertWithoutTaskInputSchema: z.ZodType<Prisma.CheckTaskUpsertWithoutTaskInput> = z.object({
  update: z.union([ z.lazy(() => CheckTaskUpdateWithoutTaskInputSchema),z.lazy(() => CheckTaskUncheckedUpdateWithoutTaskInputSchema) ]),
  create: z.union([ z.lazy(() => CheckTaskCreateWithoutTaskInputSchema),z.lazy(() => CheckTaskUncheckedCreateWithoutTaskInputSchema) ]),
  where: z.lazy(() => CheckTaskWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.CheckTaskUpsertWithoutTaskInput>;

export const CheckTaskUpdateToOneWithWhereWithoutTaskInputSchema: z.ZodType<Prisma.CheckTaskUpdateToOneWithWhereWithoutTaskInput> = z.object({
  where: z.lazy(() => CheckTaskWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CheckTaskUpdateWithoutTaskInputSchema),z.lazy(() => CheckTaskUncheckedUpdateWithoutTaskInputSchema) ]),
}).strict() as z.ZodType<Prisma.CheckTaskUpdateToOneWithWhereWithoutTaskInput>;

export const CheckTaskUpdateWithoutTaskInputSchema: z.ZodType<Prisma.CheckTaskUpdateWithoutTaskInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isCorrect: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  checkFeatures: z.lazy(() => CheckFeatureUpdateManyWithoutCheckTaskNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.CheckTaskUpdateWithoutTaskInput>;

export const CheckTaskUncheckedUpdateWithoutTaskInputSchema: z.ZodType<Prisma.CheckTaskUncheckedUpdateWithoutTaskInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isCorrect: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  checkFeatures: z.lazy(() => CheckFeatureUncheckedUpdateManyWithoutCheckTaskNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.CheckTaskUncheckedUpdateWithoutTaskInput>;

export const PictureTaskUpsertWithoutTaskInputSchema: z.ZodType<Prisma.PictureTaskUpsertWithoutTaskInput> = z.object({
  update: z.union([ z.lazy(() => PictureTaskUpdateWithoutTaskInputSchema),z.lazy(() => PictureTaskUncheckedUpdateWithoutTaskInputSchema) ]),
  create: z.union([ z.lazy(() => PictureTaskCreateWithoutTaskInputSchema),z.lazy(() => PictureTaskUncheckedCreateWithoutTaskInputSchema) ]),
  where: z.lazy(() => PictureTaskWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.PictureTaskUpsertWithoutTaskInput>;

export const PictureTaskUpdateToOneWithWhereWithoutTaskInputSchema: z.ZodType<Prisma.PictureTaskUpdateToOneWithWhereWithoutTaskInput> = z.object({
  where: z.lazy(() => PictureTaskWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PictureTaskUpdateWithoutTaskInputSchema),z.lazy(() => PictureTaskUncheckedUpdateWithoutTaskInputSchema) ]),
}).strict() as z.ZodType<Prisma.PictureTaskUpdateToOneWithWhereWithoutTaskInput>;

export const PictureTaskUpdateWithoutTaskInputSchema: z.ZodType<Prisma.PictureTaskUpdateWithoutTaskInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  exampleImgUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.PictureTaskUpdateWithoutTaskInput>;

export const PictureTaskUncheckedUpdateWithoutTaskInputSchema: z.ZodType<Prisma.PictureTaskUncheckedUpdateWithoutTaskInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  exampleImgUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.PictureTaskUncheckedUpdateWithoutTaskInput>;

export const TaskCreateWithoutLabelTaskInputSchema: z.ZodType<Prisma.TaskCreateWithoutLabelTaskInput> = z.object({
  id: z.string().uuid().optional(),
  type: z.lazy(() => TaskTypeSchema),
  endDate: z.coerce.date(),
  estimatedReward: z.number(),
  assignedTo: z.lazy(() => UserCreateNestedOneWithoutTasksInputSchema).optional(),
  order: z.lazy(() => OrderCreateNestedOneWithoutTasksInputSchema),
  checkTask: z.lazy(() => CheckTaskCreateNestedOneWithoutTaskInputSchema).optional(),
  pictureTask: z.lazy(() => PictureTaskCreateNestedOneWithoutTaskInputSchema).optional()
}).strict() as z.ZodType<Prisma.TaskCreateWithoutLabelTaskInput>;

export const TaskUncheckedCreateWithoutLabelTaskInputSchema: z.ZodType<Prisma.TaskUncheckedCreateWithoutLabelTaskInput> = z.object({
  id: z.string().uuid().optional(),
  type: z.lazy(() => TaskTypeSchema),
  endDate: z.coerce.date(),
  estimatedReward: z.number(),
  assignedToId: z.string().optional().nullable(),
  orderId: z.string(),
  checkTask: z.lazy(() => CheckTaskUncheckedCreateNestedOneWithoutTaskInputSchema).optional(),
  pictureTask: z.lazy(() => PictureTaskUncheckedCreateNestedOneWithoutTaskInputSchema).optional()
}).strict() as z.ZodType<Prisma.TaskUncheckedCreateWithoutLabelTaskInput>;

export const TaskCreateOrConnectWithoutLabelTaskInputSchema: z.ZodType<Prisma.TaskCreateOrConnectWithoutLabelTaskInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TaskCreateWithoutLabelTaskInputSchema),z.lazy(() => TaskUncheckedCreateWithoutLabelTaskInputSchema) ]),
}).strict() as z.ZodType<Prisma.TaskCreateOrConnectWithoutLabelTaskInput>;

export const FeatureLabelCreateWithoutLabelTaskInputSchema: z.ZodType<Prisma.FeatureLabelCreateWithoutLabelTaskInput> = z.object({
  featureLabel: z.string(),
  feature: z.lazy(() => FeatureCreateNestedOneWithoutFeatureLabelsInputSchema)
}).strict() as z.ZodType<Prisma.FeatureLabelCreateWithoutLabelTaskInput>;

export const FeatureLabelUncheckedCreateWithoutLabelTaskInputSchema: z.ZodType<Prisma.FeatureLabelUncheckedCreateWithoutLabelTaskInput> = z.object({
  id: z.number().int().optional(),
  featureId: z.number().int(),
  featureLabel: z.string()
}).strict() as z.ZodType<Prisma.FeatureLabelUncheckedCreateWithoutLabelTaskInput>;

export const FeatureLabelCreateOrConnectWithoutLabelTaskInputSchema: z.ZodType<Prisma.FeatureLabelCreateOrConnectWithoutLabelTaskInput> = z.object({
  where: z.lazy(() => FeatureLabelWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FeatureLabelCreateWithoutLabelTaskInputSchema),z.lazy(() => FeatureLabelUncheckedCreateWithoutLabelTaskInputSchema) ]),
}).strict() as z.ZodType<Prisma.FeatureLabelCreateOrConnectWithoutLabelTaskInput>;

export const FeatureLabelCreateManyLabelTaskInputEnvelopeSchema: z.ZodType<Prisma.FeatureLabelCreateManyLabelTaskInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => FeatureLabelCreateManyLabelTaskInputSchema),z.lazy(() => FeatureLabelCreateManyLabelTaskInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.FeatureLabelCreateManyLabelTaskInputEnvelope>;

export const TaskUpsertWithoutLabelTaskInputSchema: z.ZodType<Prisma.TaskUpsertWithoutLabelTaskInput> = z.object({
  update: z.union([ z.lazy(() => TaskUpdateWithoutLabelTaskInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutLabelTaskInputSchema) ]),
  create: z.union([ z.lazy(() => TaskCreateWithoutLabelTaskInputSchema),z.lazy(() => TaskUncheckedCreateWithoutLabelTaskInputSchema) ]),
  where: z.lazy(() => TaskWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.TaskUpsertWithoutLabelTaskInput>;

export const TaskUpdateToOneWithWhereWithoutLabelTaskInputSchema: z.ZodType<Prisma.TaskUpdateToOneWithWhereWithoutLabelTaskInput> = z.object({
  where: z.lazy(() => TaskWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TaskUpdateWithoutLabelTaskInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutLabelTaskInputSchema) ]),
}).strict() as z.ZodType<Prisma.TaskUpdateToOneWithWhereWithoutLabelTaskInput>;

export const TaskUpdateWithoutLabelTaskInputSchema: z.ZodType<Prisma.TaskUpdateWithoutLabelTaskInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TaskTypeSchema),z.lazy(() => EnumTaskTypeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedReward: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  assignedTo: z.lazy(() => UserUpdateOneWithoutTasksNestedInputSchema).optional(),
  order: z.lazy(() => OrderUpdateOneRequiredWithoutTasksNestedInputSchema).optional(),
  checkTask: z.lazy(() => CheckTaskUpdateOneWithoutTaskNestedInputSchema).optional(),
  pictureTask: z.lazy(() => PictureTaskUpdateOneWithoutTaskNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.TaskUpdateWithoutLabelTaskInput>;

export const TaskUncheckedUpdateWithoutLabelTaskInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateWithoutLabelTaskInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TaskTypeSchema),z.lazy(() => EnumTaskTypeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedReward: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  assignedToId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  orderId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  checkTask: z.lazy(() => CheckTaskUncheckedUpdateOneWithoutTaskNestedInputSchema).optional(),
  pictureTask: z.lazy(() => PictureTaskUncheckedUpdateOneWithoutTaskNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.TaskUncheckedUpdateWithoutLabelTaskInput>;

export const FeatureLabelUpsertWithWhereUniqueWithoutLabelTaskInputSchema: z.ZodType<Prisma.FeatureLabelUpsertWithWhereUniqueWithoutLabelTaskInput> = z.object({
  where: z.lazy(() => FeatureLabelWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FeatureLabelUpdateWithoutLabelTaskInputSchema),z.lazy(() => FeatureLabelUncheckedUpdateWithoutLabelTaskInputSchema) ]),
  create: z.union([ z.lazy(() => FeatureLabelCreateWithoutLabelTaskInputSchema),z.lazy(() => FeatureLabelUncheckedCreateWithoutLabelTaskInputSchema) ]),
}).strict() as z.ZodType<Prisma.FeatureLabelUpsertWithWhereUniqueWithoutLabelTaskInput>;

export const FeatureLabelUpdateWithWhereUniqueWithoutLabelTaskInputSchema: z.ZodType<Prisma.FeatureLabelUpdateWithWhereUniqueWithoutLabelTaskInput> = z.object({
  where: z.lazy(() => FeatureLabelWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FeatureLabelUpdateWithoutLabelTaskInputSchema),z.lazy(() => FeatureLabelUncheckedUpdateWithoutLabelTaskInputSchema) ]),
}).strict() as z.ZodType<Prisma.FeatureLabelUpdateWithWhereUniqueWithoutLabelTaskInput>;

export const FeatureLabelUpdateManyWithWhereWithoutLabelTaskInputSchema: z.ZodType<Prisma.FeatureLabelUpdateManyWithWhereWithoutLabelTaskInput> = z.object({
  where: z.lazy(() => FeatureLabelScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FeatureLabelUpdateManyMutationInputSchema),z.lazy(() => FeatureLabelUncheckedUpdateManyWithoutLabelTaskInputSchema) ]),
}).strict() as z.ZodType<Prisma.FeatureLabelUpdateManyWithWhereWithoutLabelTaskInput>;

export const LabelTaskCreateWithoutFeatureLabelsInputSchema: z.ZodType<Prisma.LabelTaskCreateWithoutFeatureLabelsInput> = z.object({
  id: z.string().uuid().optional(),
  task: z.lazy(() => TaskCreateNestedOneWithoutLabelTaskInputSchema)
}).strict() as z.ZodType<Prisma.LabelTaskCreateWithoutFeatureLabelsInput>;

export const LabelTaskUncheckedCreateWithoutFeatureLabelsInputSchema: z.ZodType<Prisma.LabelTaskUncheckedCreateWithoutFeatureLabelsInput> = z.object({
  id: z.string().uuid().optional(),
  taskId: z.string()
}).strict() as z.ZodType<Prisma.LabelTaskUncheckedCreateWithoutFeatureLabelsInput>;

export const LabelTaskCreateOrConnectWithoutFeatureLabelsInputSchema: z.ZodType<Prisma.LabelTaskCreateOrConnectWithoutFeatureLabelsInput> = z.object({
  where: z.lazy(() => LabelTaskWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LabelTaskCreateWithoutFeatureLabelsInputSchema),z.lazy(() => LabelTaskUncheckedCreateWithoutFeatureLabelsInputSchema) ]),
}).strict() as z.ZodType<Prisma.LabelTaskCreateOrConnectWithoutFeatureLabelsInput>;

export const FeatureCreateWithoutFeatureLabelsInputSchema: z.ZodType<Prisma.FeatureCreateWithoutFeatureLabelsInput> = z.object({
  name: z.string(),
  labelGuidelines: z.string(),
  exampleLabel: z.string().optional().nullable(),
  order: z.lazy(() => OrderCreateNestedOneWithoutFeaturesInputSchema)
}).strict() as z.ZodType<Prisma.FeatureCreateWithoutFeatureLabelsInput>;

export const FeatureUncheckedCreateWithoutFeatureLabelsInputSchema: z.ZodType<Prisma.FeatureUncheckedCreateWithoutFeatureLabelsInput> = z.object({
  id: z.number().int().optional(),
  orderId: z.string(),
  name: z.string(),
  labelGuidelines: z.string(),
  exampleLabel: z.string().optional().nullable()
}).strict() as z.ZodType<Prisma.FeatureUncheckedCreateWithoutFeatureLabelsInput>;

export const FeatureCreateOrConnectWithoutFeatureLabelsInputSchema: z.ZodType<Prisma.FeatureCreateOrConnectWithoutFeatureLabelsInput> = z.object({
  where: z.lazy(() => FeatureWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FeatureCreateWithoutFeatureLabelsInputSchema),z.lazy(() => FeatureUncheckedCreateWithoutFeatureLabelsInputSchema) ]),
}).strict() as z.ZodType<Prisma.FeatureCreateOrConnectWithoutFeatureLabelsInput>;

export const LabelTaskUpsertWithoutFeatureLabelsInputSchema: z.ZodType<Prisma.LabelTaskUpsertWithoutFeatureLabelsInput> = z.object({
  update: z.union([ z.lazy(() => LabelTaskUpdateWithoutFeatureLabelsInputSchema),z.lazy(() => LabelTaskUncheckedUpdateWithoutFeatureLabelsInputSchema) ]),
  create: z.union([ z.lazy(() => LabelTaskCreateWithoutFeatureLabelsInputSchema),z.lazy(() => LabelTaskUncheckedCreateWithoutFeatureLabelsInputSchema) ]),
  where: z.lazy(() => LabelTaskWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.LabelTaskUpsertWithoutFeatureLabelsInput>;

export const LabelTaskUpdateToOneWithWhereWithoutFeatureLabelsInputSchema: z.ZodType<Prisma.LabelTaskUpdateToOneWithWhereWithoutFeatureLabelsInput> = z.object({
  where: z.lazy(() => LabelTaskWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => LabelTaskUpdateWithoutFeatureLabelsInputSchema),z.lazy(() => LabelTaskUncheckedUpdateWithoutFeatureLabelsInputSchema) ]),
}).strict() as z.ZodType<Prisma.LabelTaskUpdateToOneWithWhereWithoutFeatureLabelsInput>;

export const LabelTaskUpdateWithoutFeatureLabelsInputSchema: z.ZodType<Prisma.LabelTaskUpdateWithoutFeatureLabelsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  task: z.lazy(() => TaskUpdateOneRequiredWithoutLabelTaskNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.LabelTaskUpdateWithoutFeatureLabelsInput>;

export const LabelTaskUncheckedUpdateWithoutFeatureLabelsInputSchema: z.ZodType<Prisma.LabelTaskUncheckedUpdateWithoutFeatureLabelsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  taskId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.LabelTaskUncheckedUpdateWithoutFeatureLabelsInput>;

export const FeatureUpsertWithoutFeatureLabelsInputSchema: z.ZodType<Prisma.FeatureUpsertWithoutFeatureLabelsInput> = z.object({
  update: z.union([ z.lazy(() => FeatureUpdateWithoutFeatureLabelsInputSchema),z.lazy(() => FeatureUncheckedUpdateWithoutFeatureLabelsInputSchema) ]),
  create: z.union([ z.lazy(() => FeatureCreateWithoutFeatureLabelsInputSchema),z.lazy(() => FeatureUncheckedCreateWithoutFeatureLabelsInputSchema) ]),
  where: z.lazy(() => FeatureWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.FeatureUpsertWithoutFeatureLabelsInput>;

export const FeatureUpdateToOneWithWhereWithoutFeatureLabelsInputSchema: z.ZodType<Prisma.FeatureUpdateToOneWithWhereWithoutFeatureLabelsInput> = z.object({
  where: z.lazy(() => FeatureWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => FeatureUpdateWithoutFeatureLabelsInputSchema),z.lazy(() => FeatureUncheckedUpdateWithoutFeatureLabelsInputSchema) ]),
}).strict() as z.ZodType<Prisma.FeatureUpdateToOneWithWhereWithoutFeatureLabelsInput>;

export const FeatureUpdateWithoutFeatureLabelsInputSchema: z.ZodType<Prisma.FeatureUpdateWithoutFeatureLabelsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  labelGuidelines: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  exampleLabel: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order: z.lazy(() => OrderUpdateOneRequiredWithoutFeaturesNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.FeatureUpdateWithoutFeatureLabelsInput>;

export const FeatureUncheckedUpdateWithoutFeatureLabelsInputSchema: z.ZodType<Prisma.FeatureUncheckedUpdateWithoutFeatureLabelsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  orderId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  labelGuidelines: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  exampleLabel: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.FeatureUncheckedUpdateWithoutFeatureLabelsInput>;

export const TaskCreateWithoutCheckTaskInputSchema: z.ZodType<Prisma.TaskCreateWithoutCheckTaskInput> = z.object({
  id: z.string().uuid().optional(),
  type: z.lazy(() => TaskTypeSchema),
  endDate: z.coerce.date(),
  estimatedReward: z.number(),
  assignedTo: z.lazy(() => UserCreateNestedOneWithoutTasksInputSchema).optional(),
  order: z.lazy(() => OrderCreateNestedOneWithoutTasksInputSchema),
  labelTask: z.lazy(() => LabelTaskCreateNestedOneWithoutTaskInputSchema).optional(),
  pictureTask: z.lazy(() => PictureTaskCreateNestedOneWithoutTaskInputSchema).optional()
}).strict() as z.ZodType<Prisma.TaskCreateWithoutCheckTaskInput>;

export const TaskUncheckedCreateWithoutCheckTaskInputSchema: z.ZodType<Prisma.TaskUncheckedCreateWithoutCheckTaskInput> = z.object({
  id: z.string().uuid().optional(),
  type: z.lazy(() => TaskTypeSchema),
  endDate: z.coerce.date(),
  estimatedReward: z.number(),
  assignedToId: z.string().optional().nullable(),
  orderId: z.string(),
  labelTask: z.lazy(() => LabelTaskUncheckedCreateNestedOneWithoutTaskInputSchema).optional(),
  pictureTask: z.lazy(() => PictureTaskUncheckedCreateNestedOneWithoutTaskInputSchema).optional()
}).strict() as z.ZodType<Prisma.TaskUncheckedCreateWithoutCheckTaskInput>;

export const TaskCreateOrConnectWithoutCheckTaskInputSchema: z.ZodType<Prisma.TaskCreateOrConnectWithoutCheckTaskInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TaskCreateWithoutCheckTaskInputSchema),z.lazy(() => TaskUncheckedCreateWithoutCheckTaskInputSchema) ]),
}).strict() as z.ZodType<Prisma.TaskCreateOrConnectWithoutCheckTaskInput>;

export const CheckFeatureCreateWithoutCheckTaskInputSchema: z.ZodType<Prisma.CheckFeatureCreateWithoutCheckTaskInput> = z.object({
  name: z.string(),
  label: z.string()
}).strict() as z.ZodType<Prisma.CheckFeatureCreateWithoutCheckTaskInput>;

export const CheckFeatureUncheckedCreateWithoutCheckTaskInputSchema: z.ZodType<Prisma.CheckFeatureUncheckedCreateWithoutCheckTaskInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  label: z.string()
}).strict() as z.ZodType<Prisma.CheckFeatureUncheckedCreateWithoutCheckTaskInput>;

export const CheckFeatureCreateOrConnectWithoutCheckTaskInputSchema: z.ZodType<Prisma.CheckFeatureCreateOrConnectWithoutCheckTaskInput> = z.object({
  where: z.lazy(() => CheckFeatureWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CheckFeatureCreateWithoutCheckTaskInputSchema),z.lazy(() => CheckFeatureUncheckedCreateWithoutCheckTaskInputSchema) ]),
}).strict() as z.ZodType<Prisma.CheckFeatureCreateOrConnectWithoutCheckTaskInput>;

export const CheckFeatureCreateManyCheckTaskInputEnvelopeSchema: z.ZodType<Prisma.CheckFeatureCreateManyCheckTaskInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CheckFeatureCreateManyCheckTaskInputSchema),z.lazy(() => CheckFeatureCreateManyCheckTaskInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.CheckFeatureCreateManyCheckTaskInputEnvelope>;

export const TaskUpsertWithoutCheckTaskInputSchema: z.ZodType<Prisma.TaskUpsertWithoutCheckTaskInput> = z.object({
  update: z.union([ z.lazy(() => TaskUpdateWithoutCheckTaskInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutCheckTaskInputSchema) ]),
  create: z.union([ z.lazy(() => TaskCreateWithoutCheckTaskInputSchema),z.lazy(() => TaskUncheckedCreateWithoutCheckTaskInputSchema) ]),
  where: z.lazy(() => TaskWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.TaskUpsertWithoutCheckTaskInput>;

export const TaskUpdateToOneWithWhereWithoutCheckTaskInputSchema: z.ZodType<Prisma.TaskUpdateToOneWithWhereWithoutCheckTaskInput> = z.object({
  where: z.lazy(() => TaskWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TaskUpdateWithoutCheckTaskInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutCheckTaskInputSchema) ]),
}).strict() as z.ZodType<Prisma.TaskUpdateToOneWithWhereWithoutCheckTaskInput>;

export const TaskUpdateWithoutCheckTaskInputSchema: z.ZodType<Prisma.TaskUpdateWithoutCheckTaskInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TaskTypeSchema),z.lazy(() => EnumTaskTypeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedReward: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  assignedTo: z.lazy(() => UserUpdateOneWithoutTasksNestedInputSchema).optional(),
  order: z.lazy(() => OrderUpdateOneRequiredWithoutTasksNestedInputSchema).optional(),
  labelTask: z.lazy(() => LabelTaskUpdateOneWithoutTaskNestedInputSchema).optional(),
  pictureTask: z.lazy(() => PictureTaskUpdateOneWithoutTaskNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.TaskUpdateWithoutCheckTaskInput>;

export const TaskUncheckedUpdateWithoutCheckTaskInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateWithoutCheckTaskInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TaskTypeSchema),z.lazy(() => EnumTaskTypeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedReward: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  assignedToId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  orderId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  labelTask: z.lazy(() => LabelTaskUncheckedUpdateOneWithoutTaskNestedInputSchema).optional(),
  pictureTask: z.lazy(() => PictureTaskUncheckedUpdateOneWithoutTaskNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.TaskUncheckedUpdateWithoutCheckTaskInput>;

export const CheckFeatureUpsertWithWhereUniqueWithoutCheckTaskInputSchema: z.ZodType<Prisma.CheckFeatureUpsertWithWhereUniqueWithoutCheckTaskInput> = z.object({
  where: z.lazy(() => CheckFeatureWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CheckFeatureUpdateWithoutCheckTaskInputSchema),z.lazy(() => CheckFeatureUncheckedUpdateWithoutCheckTaskInputSchema) ]),
  create: z.union([ z.lazy(() => CheckFeatureCreateWithoutCheckTaskInputSchema),z.lazy(() => CheckFeatureUncheckedCreateWithoutCheckTaskInputSchema) ]),
}).strict() as z.ZodType<Prisma.CheckFeatureUpsertWithWhereUniqueWithoutCheckTaskInput>;

export const CheckFeatureUpdateWithWhereUniqueWithoutCheckTaskInputSchema: z.ZodType<Prisma.CheckFeatureUpdateWithWhereUniqueWithoutCheckTaskInput> = z.object({
  where: z.lazy(() => CheckFeatureWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CheckFeatureUpdateWithoutCheckTaskInputSchema),z.lazy(() => CheckFeatureUncheckedUpdateWithoutCheckTaskInputSchema) ]),
}).strict() as z.ZodType<Prisma.CheckFeatureUpdateWithWhereUniqueWithoutCheckTaskInput>;

export const CheckFeatureUpdateManyWithWhereWithoutCheckTaskInputSchema: z.ZodType<Prisma.CheckFeatureUpdateManyWithWhereWithoutCheckTaskInput> = z.object({
  where: z.lazy(() => CheckFeatureScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CheckFeatureUpdateManyMutationInputSchema),z.lazy(() => CheckFeatureUncheckedUpdateManyWithoutCheckTaskInputSchema) ]),
}).strict() as z.ZodType<Prisma.CheckFeatureUpdateManyWithWhereWithoutCheckTaskInput>;

export const CheckFeatureScalarWhereInputSchema: z.ZodType<Prisma.CheckFeatureScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CheckFeatureScalarWhereInputSchema),z.lazy(() => CheckFeatureScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CheckFeatureScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CheckFeatureScalarWhereInputSchema),z.lazy(() => CheckFeatureScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  checkTaskId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  label: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict() as z.ZodType<Prisma.CheckFeatureScalarWhereInput>;

export const CheckTaskCreateWithoutCheckFeaturesInputSchema: z.ZodType<Prisma.CheckTaskCreateWithoutCheckFeaturesInput> = z.object({
  id: z.string().uuid().optional(),
  isCorrect: z.boolean().optional().nullable(),
  task: z.lazy(() => TaskCreateNestedOneWithoutCheckTaskInputSchema)
}).strict() as z.ZodType<Prisma.CheckTaskCreateWithoutCheckFeaturesInput>;

export const CheckTaskUncheckedCreateWithoutCheckFeaturesInputSchema: z.ZodType<Prisma.CheckTaskUncheckedCreateWithoutCheckFeaturesInput> = z.object({
  id: z.string().uuid().optional(),
  taskId: z.string(),
  isCorrect: z.boolean().optional().nullable()
}).strict() as z.ZodType<Prisma.CheckTaskUncheckedCreateWithoutCheckFeaturesInput>;

export const CheckTaskCreateOrConnectWithoutCheckFeaturesInputSchema: z.ZodType<Prisma.CheckTaskCreateOrConnectWithoutCheckFeaturesInput> = z.object({
  where: z.lazy(() => CheckTaskWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CheckTaskCreateWithoutCheckFeaturesInputSchema),z.lazy(() => CheckTaskUncheckedCreateWithoutCheckFeaturesInputSchema) ]),
}).strict() as z.ZodType<Prisma.CheckTaskCreateOrConnectWithoutCheckFeaturesInput>;

export const CheckTaskUpsertWithoutCheckFeaturesInputSchema: z.ZodType<Prisma.CheckTaskUpsertWithoutCheckFeaturesInput> = z.object({
  update: z.union([ z.lazy(() => CheckTaskUpdateWithoutCheckFeaturesInputSchema),z.lazy(() => CheckTaskUncheckedUpdateWithoutCheckFeaturesInputSchema) ]),
  create: z.union([ z.lazy(() => CheckTaskCreateWithoutCheckFeaturesInputSchema),z.lazy(() => CheckTaskUncheckedCreateWithoutCheckFeaturesInputSchema) ]),
  where: z.lazy(() => CheckTaskWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.CheckTaskUpsertWithoutCheckFeaturesInput>;

export const CheckTaskUpdateToOneWithWhereWithoutCheckFeaturesInputSchema: z.ZodType<Prisma.CheckTaskUpdateToOneWithWhereWithoutCheckFeaturesInput> = z.object({
  where: z.lazy(() => CheckTaskWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CheckTaskUpdateWithoutCheckFeaturesInputSchema),z.lazy(() => CheckTaskUncheckedUpdateWithoutCheckFeaturesInputSchema) ]),
}).strict() as z.ZodType<Prisma.CheckTaskUpdateToOneWithWhereWithoutCheckFeaturesInput>;

export const CheckTaskUpdateWithoutCheckFeaturesInputSchema: z.ZodType<Prisma.CheckTaskUpdateWithoutCheckFeaturesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isCorrect: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  task: z.lazy(() => TaskUpdateOneRequiredWithoutCheckTaskNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.CheckTaskUpdateWithoutCheckFeaturesInput>;

export const CheckTaskUncheckedUpdateWithoutCheckFeaturesInputSchema: z.ZodType<Prisma.CheckTaskUncheckedUpdateWithoutCheckFeaturesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  taskId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isCorrect: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.CheckTaskUncheckedUpdateWithoutCheckFeaturesInput>;

export const TaskCreateWithoutPictureTaskInputSchema: z.ZodType<Prisma.TaskCreateWithoutPictureTaskInput> = z.object({
  id: z.string().uuid().optional(),
  type: z.lazy(() => TaskTypeSchema),
  endDate: z.coerce.date(),
  estimatedReward: z.number(),
  assignedTo: z.lazy(() => UserCreateNestedOneWithoutTasksInputSchema).optional(),
  order: z.lazy(() => OrderCreateNestedOneWithoutTasksInputSchema),
  labelTask: z.lazy(() => LabelTaskCreateNestedOneWithoutTaskInputSchema).optional(),
  checkTask: z.lazy(() => CheckTaskCreateNestedOneWithoutTaskInputSchema).optional()
}).strict() as z.ZodType<Prisma.TaskCreateWithoutPictureTaskInput>;

export const TaskUncheckedCreateWithoutPictureTaskInputSchema: z.ZodType<Prisma.TaskUncheckedCreateWithoutPictureTaskInput> = z.object({
  id: z.string().uuid().optional(),
  type: z.lazy(() => TaskTypeSchema),
  endDate: z.coerce.date(),
  estimatedReward: z.number(),
  assignedToId: z.string().optional().nullable(),
  orderId: z.string(),
  labelTask: z.lazy(() => LabelTaskUncheckedCreateNestedOneWithoutTaskInputSchema).optional(),
  checkTask: z.lazy(() => CheckTaskUncheckedCreateNestedOneWithoutTaskInputSchema).optional()
}).strict() as z.ZodType<Prisma.TaskUncheckedCreateWithoutPictureTaskInput>;

export const TaskCreateOrConnectWithoutPictureTaskInputSchema: z.ZodType<Prisma.TaskCreateOrConnectWithoutPictureTaskInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TaskCreateWithoutPictureTaskInputSchema),z.lazy(() => TaskUncheckedCreateWithoutPictureTaskInputSchema) ]),
}).strict() as z.ZodType<Prisma.TaskCreateOrConnectWithoutPictureTaskInput>;

export const TaskUpsertWithoutPictureTaskInputSchema: z.ZodType<Prisma.TaskUpsertWithoutPictureTaskInput> = z.object({
  update: z.union([ z.lazy(() => TaskUpdateWithoutPictureTaskInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutPictureTaskInputSchema) ]),
  create: z.union([ z.lazy(() => TaskCreateWithoutPictureTaskInputSchema),z.lazy(() => TaskUncheckedCreateWithoutPictureTaskInputSchema) ]),
  where: z.lazy(() => TaskWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.TaskUpsertWithoutPictureTaskInput>;

export const TaskUpdateToOneWithWhereWithoutPictureTaskInputSchema: z.ZodType<Prisma.TaskUpdateToOneWithWhereWithoutPictureTaskInput> = z.object({
  where: z.lazy(() => TaskWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TaskUpdateWithoutPictureTaskInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutPictureTaskInputSchema) ]),
}).strict() as z.ZodType<Prisma.TaskUpdateToOneWithWhereWithoutPictureTaskInput>;

export const TaskUpdateWithoutPictureTaskInputSchema: z.ZodType<Prisma.TaskUpdateWithoutPictureTaskInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TaskTypeSchema),z.lazy(() => EnumTaskTypeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedReward: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  assignedTo: z.lazy(() => UserUpdateOneWithoutTasksNestedInputSchema).optional(),
  order: z.lazy(() => OrderUpdateOneRequiredWithoutTasksNestedInputSchema).optional(),
  labelTask: z.lazy(() => LabelTaskUpdateOneWithoutTaskNestedInputSchema).optional(),
  checkTask: z.lazy(() => CheckTaskUpdateOneWithoutTaskNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.TaskUpdateWithoutPictureTaskInput>;

export const TaskUncheckedUpdateWithoutPictureTaskInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateWithoutPictureTaskInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TaskTypeSchema),z.lazy(() => EnumTaskTypeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedReward: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  assignedToId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  orderId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  labelTask: z.lazy(() => LabelTaskUncheckedUpdateOneWithoutTaskNestedInputSchema).optional(),
  checkTask: z.lazy(() => CheckTaskUncheckedUpdateOneWithoutTaskNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.TaskUncheckedUpdateWithoutPictureTaskInput>;

export const TaskCreateManyAssignedToInputSchema: z.ZodType<Prisma.TaskCreateManyAssignedToInput> = z.object({
  id: z.string().uuid().optional(),
  type: z.lazy(() => TaskTypeSchema),
  endDate: z.coerce.date(),
  estimatedReward: z.number(),
  orderId: z.string()
}).strict() as z.ZodType<Prisma.TaskCreateManyAssignedToInput>;

export const TaskUpdateWithoutAssignedToInputSchema: z.ZodType<Prisma.TaskUpdateWithoutAssignedToInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TaskTypeSchema),z.lazy(() => EnumTaskTypeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedReward: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.lazy(() => OrderUpdateOneRequiredWithoutTasksNestedInputSchema).optional(),
  labelTask: z.lazy(() => LabelTaskUpdateOneWithoutTaskNestedInputSchema).optional(),
  checkTask: z.lazy(() => CheckTaskUpdateOneWithoutTaskNestedInputSchema).optional(),
  pictureTask: z.lazy(() => PictureTaskUpdateOneWithoutTaskNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.TaskUpdateWithoutAssignedToInput>;

export const TaskUncheckedUpdateWithoutAssignedToInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateWithoutAssignedToInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TaskTypeSchema),z.lazy(() => EnumTaskTypeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedReward: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  orderId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  labelTask: z.lazy(() => LabelTaskUncheckedUpdateOneWithoutTaskNestedInputSchema).optional(),
  checkTask: z.lazy(() => CheckTaskUncheckedUpdateOneWithoutTaskNestedInputSchema).optional(),
  pictureTask: z.lazy(() => PictureTaskUncheckedUpdateOneWithoutTaskNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.TaskUncheckedUpdateWithoutAssignedToInput>;

export const TaskUncheckedUpdateManyWithoutAssignedToInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateManyWithoutAssignedToInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TaskTypeSchema),z.lazy(() => EnumTaskTypeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedReward: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  orderId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.TaskUncheckedUpdateManyWithoutAssignedToInput>;

export const FeatureCreateManyOrderInputSchema: z.ZodType<Prisma.FeatureCreateManyOrderInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  labelGuidelines: z.string(),
  exampleLabel: z.string().optional().nullable()
}).strict() as z.ZodType<Prisma.FeatureCreateManyOrderInput>;

export const TaskCreateManyOrderInputSchema: z.ZodType<Prisma.TaskCreateManyOrderInput> = z.object({
  id: z.string().uuid().optional(),
  type: z.lazy(() => TaskTypeSchema),
  endDate: z.coerce.date(),
  estimatedReward: z.number(),
  assignedToId: z.string().optional().nullable()
}).strict() as z.ZodType<Prisma.TaskCreateManyOrderInput>;

export const FeatureUpdateWithoutOrderInputSchema: z.ZodType<Prisma.FeatureUpdateWithoutOrderInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  labelGuidelines: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  exampleLabel: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  featureLabels: z.lazy(() => FeatureLabelUpdateManyWithoutFeatureNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.FeatureUpdateWithoutOrderInput>;

export const FeatureUncheckedUpdateWithoutOrderInputSchema: z.ZodType<Prisma.FeatureUncheckedUpdateWithoutOrderInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  labelGuidelines: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  exampleLabel: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  featureLabels: z.lazy(() => FeatureLabelUncheckedUpdateManyWithoutFeatureNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.FeatureUncheckedUpdateWithoutOrderInput>;

export const FeatureUncheckedUpdateManyWithoutOrderInputSchema: z.ZodType<Prisma.FeatureUncheckedUpdateManyWithoutOrderInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  labelGuidelines: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  exampleLabel: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.FeatureUncheckedUpdateManyWithoutOrderInput>;

export const TaskUpdateWithoutOrderInputSchema: z.ZodType<Prisma.TaskUpdateWithoutOrderInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TaskTypeSchema),z.lazy(() => EnumTaskTypeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedReward: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  assignedTo: z.lazy(() => UserUpdateOneWithoutTasksNestedInputSchema).optional(),
  labelTask: z.lazy(() => LabelTaskUpdateOneWithoutTaskNestedInputSchema).optional(),
  checkTask: z.lazy(() => CheckTaskUpdateOneWithoutTaskNestedInputSchema).optional(),
  pictureTask: z.lazy(() => PictureTaskUpdateOneWithoutTaskNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.TaskUpdateWithoutOrderInput>;

export const TaskUncheckedUpdateWithoutOrderInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateWithoutOrderInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TaskTypeSchema),z.lazy(() => EnumTaskTypeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedReward: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  assignedToId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  labelTask: z.lazy(() => LabelTaskUncheckedUpdateOneWithoutTaskNestedInputSchema).optional(),
  checkTask: z.lazy(() => CheckTaskUncheckedUpdateOneWithoutTaskNestedInputSchema).optional(),
  pictureTask: z.lazy(() => PictureTaskUncheckedUpdateOneWithoutTaskNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.TaskUncheckedUpdateWithoutOrderInput>;

export const TaskUncheckedUpdateManyWithoutOrderInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateManyWithoutOrderInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TaskTypeSchema),z.lazy(() => EnumTaskTypeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedReward: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  assignedToId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.TaskUncheckedUpdateManyWithoutOrderInput>;

export const FeatureLabelCreateManyFeatureInputSchema: z.ZodType<Prisma.FeatureLabelCreateManyFeatureInput> = z.object({
  id: z.number().int().optional(),
  labelTaskId: z.string(),
  featureLabel: z.string()
}).strict() as z.ZodType<Prisma.FeatureLabelCreateManyFeatureInput>;

export const FeatureLabelUpdateWithoutFeatureInputSchema: z.ZodType<Prisma.FeatureLabelUpdateWithoutFeatureInput> = z.object({
  featureLabel: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  labelTask: z.lazy(() => LabelTaskUpdateOneRequiredWithoutFeatureLabelsNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.FeatureLabelUpdateWithoutFeatureInput>;

export const FeatureLabelUncheckedUpdateWithoutFeatureInputSchema: z.ZodType<Prisma.FeatureLabelUncheckedUpdateWithoutFeatureInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  labelTaskId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  featureLabel: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.FeatureLabelUncheckedUpdateWithoutFeatureInput>;

export const FeatureLabelUncheckedUpdateManyWithoutFeatureInputSchema: z.ZodType<Prisma.FeatureLabelUncheckedUpdateManyWithoutFeatureInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  labelTaskId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  featureLabel: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.FeatureLabelUncheckedUpdateManyWithoutFeatureInput>;

export const FeatureLabelCreateManyLabelTaskInputSchema: z.ZodType<Prisma.FeatureLabelCreateManyLabelTaskInput> = z.object({
  id: z.number().int().optional(),
  featureId: z.number().int(),
  featureLabel: z.string()
}).strict() as z.ZodType<Prisma.FeatureLabelCreateManyLabelTaskInput>;

export const FeatureLabelUpdateWithoutLabelTaskInputSchema: z.ZodType<Prisma.FeatureLabelUpdateWithoutLabelTaskInput> = z.object({
  featureLabel: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  feature: z.lazy(() => FeatureUpdateOneRequiredWithoutFeatureLabelsNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.FeatureLabelUpdateWithoutLabelTaskInput>;

export const FeatureLabelUncheckedUpdateWithoutLabelTaskInputSchema: z.ZodType<Prisma.FeatureLabelUncheckedUpdateWithoutLabelTaskInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  featureId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  featureLabel: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.FeatureLabelUncheckedUpdateWithoutLabelTaskInput>;

export const FeatureLabelUncheckedUpdateManyWithoutLabelTaskInputSchema: z.ZodType<Prisma.FeatureLabelUncheckedUpdateManyWithoutLabelTaskInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  featureId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  featureLabel: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.FeatureLabelUncheckedUpdateManyWithoutLabelTaskInput>;

export const CheckFeatureCreateManyCheckTaskInputSchema: z.ZodType<Prisma.CheckFeatureCreateManyCheckTaskInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  label: z.string()
}).strict() as z.ZodType<Prisma.CheckFeatureCreateManyCheckTaskInput>;

export const CheckFeatureUpdateWithoutCheckTaskInputSchema: z.ZodType<Prisma.CheckFeatureUpdateWithoutCheckTaskInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CheckFeatureUpdateWithoutCheckTaskInput>;

export const CheckFeatureUncheckedUpdateWithoutCheckTaskInputSchema: z.ZodType<Prisma.CheckFeatureUncheckedUpdateWithoutCheckTaskInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CheckFeatureUncheckedUpdateWithoutCheckTaskInput>;

export const CheckFeatureUncheckedUpdateManyWithoutCheckTaskInputSchema: z.ZodType<Prisma.CheckFeatureUncheckedUpdateManyWithoutCheckTaskInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CheckFeatureUncheckedUpdateManyWithoutCheckTaskInput>;

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.UserFindFirstArgs>;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.UserFindFirstOrThrowArgs>;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.UserFindManyArgs>;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.UserAggregateArgs>;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.UserGroupByArgs>;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.UserFindUniqueArgs>;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.UserFindUniqueOrThrowArgs>;

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

export const FeatureFindFirstArgsSchema: z.ZodType<Prisma.FeatureFindFirstArgs> = z.object({
  select: FeatureSelectSchema.optional(),
  include: FeatureIncludeSchema.optional(),
  where: FeatureWhereInputSchema.optional(),
  orderBy: z.union([ FeatureOrderByWithRelationInputSchema.array(),FeatureOrderByWithRelationInputSchema ]).optional(),
  cursor: FeatureWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FeatureScalarFieldEnumSchema,FeatureScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.FeatureFindFirstArgs>;

export const FeatureFindFirstOrThrowArgsSchema: z.ZodType<Prisma.FeatureFindFirstOrThrowArgs> = z.object({
  select: FeatureSelectSchema.optional(),
  include: FeatureIncludeSchema.optional(),
  where: FeatureWhereInputSchema.optional(),
  orderBy: z.union([ FeatureOrderByWithRelationInputSchema.array(),FeatureOrderByWithRelationInputSchema ]).optional(),
  cursor: FeatureWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FeatureScalarFieldEnumSchema,FeatureScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.FeatureFindFirstOrThrowArgs>;

export const FeatureFindManyArgsSchema: z.ZodType<Prisma.FeatureFindManyArgs> = z.object({
  select: FeatureSelectSchema.optional(),
  include: FeatureIncludeSchema.optional(),
  where: FeatureWhereInputSchema.optional(),
  orderBy: z.union([ FeatureOrderByWithRelationInputSchema.array(),FeatureOrderByWithRelationInputSchema ]).optional(),
  cursor: FeatureWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FeatureScalarFieldEnumSchema,FeatureScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.FeatureFindManyArgs>;

export const FeatureAggregateArgsSchema: z.ZodType<Prisma.FeatureAggregateArgs> = z.object({
  where: FeatureWhereInputSchema.optional(),
  orderBy: z.union([ FeatureOrderByWithRelationInputSchema.array(),FeatureOrderByWithRelationInputSchema ]).optional(),
  cursor: FeatureWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.FeatureAggregateArgs>;

export const FeatureGroupByArgsSchema: z.ZodType<Prisma.FeatureGroupByArgs> = z.object({
  where: FeatureWhereInputSchema.optional(),
  orderBy: z.union([ FeatureOrderByWithAggregationInputSchema.array(),FeatureOrderByWithAggregationInputSchema ]).optional(),
  by: FeatureScalarFieldEnumSchema.array(),
  having: FeatureScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.FeatureGroupByArgs>;

export const FeatureFindUniqueArgsSchema: z.ZodType<Prisma.FeatureFindUniqueArgs> = z.object({
  select: FeatureSelectSchema.optional(),
  include: FeatureIncludeSchema.optional(),
  where: FeatureWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.FeatureFindUniqueArgs>;

export const FeatureFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FeatureFindUniqueOrThrowArgs> = z.object({
  select: FeatureSelectSchema.optional(),
  include: FeatureIncludeSchema.optional(),
  where: FeatureWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.FeatureFindUniqueOrThrowArgs>;

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

export const LabelTaskFindFirstArgsSchema: z.ZodType<Prisma.LabelTaskFindFirstArgs> = z.object({
  select: LabelTaskSelectSchema.optional(),
  include: LabelTaskIncludeSchema.optional(),
  where: LabelTaskWhereInputSchema.optional(),
  orderBy: z.union([ LabelTaskOrderByWithRelationInputSchema.array(),LabelTaskOrderByWithRelationInputSchema ]).optional(),
  cursor: LabelTaskWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LabelTaskScalarFieldEnumSchema,LabelTaskScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.LabelTaskFindFirstArgs>;

export const LabelTaskFindFirstOrThrowArgsSchema: z.ZodType<Prisma.LabelTaskFindFirstOrThrowArgs> = z.object({
  select: LabelTaskSelectSchema.optional(),
  include: LabelTaskIncludeSchema.optional(),
  where: LabelTaskWhereInputSchema.optional(),
  orderBy: z.union([ LabelTaskOrderByWithRelationInputSchema.array(),LabelTaskOrderByWithRelationInputSchema ]).optional(),
  cursor: LabelTaskWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LabelTaskScalarFieldEnumSchema,LabelTaskScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.LabelTaskFindFirstOrThrowArgs>;

export const LabelTaskFindManyArgsSchema: z.ZodType<Prisma.LabelTaskFindManyArgs> = z.object({
  select: LabelTaskSelectSchema.optional(),
  include: LabelTaskIncludeSchema.optional(),
  where: LabelTaskWhereInputSchema.optional(),
  orderBy: z.union([ LabelTaskOrderByWithRelationInputSchema.array(),LabelTaskOrderByWithRelationInputSchema ]).optional(),
  cursor: LabelTaskWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LabelTaskScalarFieldEnumSchema,LabelTaskScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.LabelTaskFindManyArgs>;

export const LabelTaskAggregateArgsSchema: z.ZodType<Prisma.LabelTaskAggregateArgs> = z.object({
  where: LabelTaskWhereInputSchema.optional(),
  orderBy: z.union([ LabelTaskOrderByWithRelationInputSchema.array(),LabelTaskOrderByWithRelationInputSchema ]).optional(),
  cursor: LabelTaskWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.LabelTaskAggregateArgs>;

export const LabelTaskGroupByArgsSchema: z.ZodType<Prisma.LabelTaskGroupByArgs> = z.object({
  where: LabelTaskWhereInputSchema.optional(),
  orderBy: z.union([ LabelTaskOrderByWithAggregationInputSchema.array(),LabelTaskOrderByWithAggregationInputSchema ]).optional(),
  by: LabelTaskScalarFieldEnumSchema.array(),
  having: LabelTaskScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.LabelTaskGroupByArgs>;

export const LabelTaskFindUniqueArgsSchema: z.ZodType<Prisma.LabelTaskFindUniqueArgs> = z.object({
  select: LabelTaskSelectSchema.optional(),
  include: LabelTaskIncludeSchema.optional(),
  where: LabelTaskWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.LabelTaskFindUniqueArgs>;

export const LabelTaskFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.LabelTaskFindUniqueOrThrowArgs> = z.object({
  select: LabelTaskSelectSchema.optional(),
  include: LabelTaskIncludeSchema.optional(),
  where: LabelTaskWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.LabelTaskFindUniqueOrThrowArgs>;

export const FeatureLabelFindFirstArgsSchema: z.ZodType<Prisma.FeatureLabelFindFirstArgs> = z.object({
  select: FeatureLabelSelectSchema.optional(),
  include: FeatureLabelIncludeSchema.optional(),
  where: FeatureLabelWhereInputSchema.optional(),
  orderBy: z.union([ FeatureLabelOrderByWithRelationInputSchema.array(),FeatureLabelOrderByWithRelationInputSchema ]).optional(),
  cursor: FeatureLabelWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FeatureLabelScalarFieldEnumSchema,FeatureLabelScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.FeatureLabelFindFirstArgs>;

export const FeatureLabelFindFirstOrThrowArgsSchema: z.ZodType<Prisma.FeatureLabelFindFirstOrThrowArgs> = z.object({
  select: FeatureLabelSelectSchema.optional(),
  include: FeatureLabelIncludeSchema.optional(),
  where: FeatureLabelWhereInputSchema.optional(),
  orderBy: z.union([ FeatureLabelOrderByWithRelationInputSchema.array(),FeatureLabelOrderByWithRelationInputSchema ]).optional(),
  cursor: FeatureLabelWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FeatureLabelScalarFieldEnumSchema,FeatureLabelScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.FeatureLabelFindFirstOrThrowArgs>;

export const FeatureLabelFindManyArgsSchema: z.ZodType<Prisma.FeatureLabelFindManyArgs> = z.object({
  select: FeatureLabelSelectSchema.optional(),
  include: FeatureLabelIncludeSchema.optional(),
  where: FeatureLabelWhereInputSchema.optional(),
  orderBy: z.union([ FeatureLabelOrderByWithRelationInputSchema.array(),FeatureLabelOrderByWithRelationInputSchema ]).optional(),
  cursor: FeatureLabelWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FeatureLabelScalarFieldEnumSchema,FeatureLabelScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.FeatureLabelFindManyArgs>;

export const FeatureLabelAggregateArgsSchema: z.ZodType<Prisma.FeatureLabelAggregateArgs> = z.object({
  where: FeatureLabelWhereInputSchema.optional(),
  orderBy: z.union([ FeatureLabelOrderByWithRelationInputSchema.array(),FeatureLabelOrderByWithRelationInputSchema ]).optional(),
  cursor: FeatureLabelWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.FeatureLabelAggregateArgs>;

export const FeatureLabelGroupByArgsSchema: z.ZodType<Prisma.FeatureLabelGroupByArgs> = z.object({
  where: FeatureLabelWhereInputSchema.optional(),
  orderBy: z.union([ FeatureLabelOrderByWithAggregationInputSchema.array(),FeatureLabelOrderByWithAggregationInputSchema ]).optional(),
  by: FeatureLabelScalarFieldEnumSchema.array(),
  having: FeatureLabelScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.FeatureLabelGroupByArgs>;

export const FeatureLabelFindUniqueArgsSchema: z.ZodType<Prisma.FeatureLabelFindUniqueArgs> = z.object({
  select: FeatureLabelSelectSchema.optional(),
  include: FeatureLabelIncludeSchema.optional(),
  where: FeatureLabelWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.FeatureLabelFindUniqueArgs>;

export const FeatureLabelFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FeatureLabelFindUniqueOrThrowArgs> = z.object({
  select: FeatureLabelSelectSchema.optional(),
  include: FeatureLabelIncludeSchema.optional(),
  where: FeatureLabelWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.FeatureLabelFindUniqueOrThrowArgs>;

export const CheckTaskFindFirstArgsSchema: z.ZodType<Prisma.CheckTaskFindFirstArgs> = z.object({
  select: CheckTaskSelectSchema.optional(),
  include: CheckTaskIncludeSchema.optional(),
  where: CheckTaskWhereInputSchema.optional(),
  orderBy: z.union([ CheckTaskOrderByWithRelationInputSchema.array(),CheckTaskOrderByWithRelationInputSchema ]).optional(),
  cursor: CheckTaskWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CheckTaskScalarFieldEnumSchema,CheckTaskScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.CheckTaskFindFirstArgs>;

export const CheckTaskFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CheckTaskFindFirstOrThrowArgs> = z.object({
  select: CheckTaskSelectSchema.optional(),
  include: CheckTaskIncludeSchema.optional(),
  where: CheckTaskWhereInputSchema.optional(),
  orderBy: z.union([ CheckTaskOrderByWithRelationInputSchema.array(),CheckTaskOrderByWithRelationInputSchema ]).optional(),
  cursor: CheckTaskWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CheckTaskScalarFieldEnumSchema,CheckTaskScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.CheckTaskFindFirstOrThrowArgs>;

export const CheckTaskFindManyArgsSchema: z.ZodType<Prisma.CheckTaskFindManyArgs> = z.object({
  select: CheckTaskSelectSchema.optional(),
  include: CheckTaskIncludeSchema.optional(),
  where: CheckTaskWhereInputSchema.optional(),
  orderBy: z.union([ CheckTaskOrderByWithRelationInputSchema.array(),CheckTaskOrderByWithRelationInputSchema ]).optional(),
  cursor: CheckTaskWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CheckTaskScalarFieldEnumSchema,CheckTaskScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.CheckTaskFindManyArgs>;

export const CheckTaskAggregateArgsSchema: z.ZodType<Prisma.CheckTaskAggregateArgs> = z.object({
  where: CheckTaskWhereInputSchema.optional(),
  orderBy: z.union([ CheckTaskOrderByWithRelationInputSchema.array(),CheckTaskOrderByWithRelationInputSchema ]).optional(),
  cursor: CheckTaskWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.CheckTaskAggregateArgs>;

export const CheckTaskGroupByArgsSchema: z.ZodType<Prisma.CheckTaskGroupByArgs> = z.object({
  where: CheckTaskWhereInputSchema.optional(),
  orderBy: z.union([ CheckTaskOrderByWithAggregationInputSchema.array(),CheckTaskOrderByWithAggregationInputSchema ]).optional(),
  by: CheckTaskScalarFieldEnumSchema.array(),
  having: CheckTaskScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.CheckTaskGroupByArgs>;

export const CheckTaskFindUniqueArgsSchema: z.ZodType<Prisma.CheckTaskFindUniqueArgs> = z.object({
  select: CheckTaskSelectSchema.optional(),
  include: CheckTaskIncludeSchema.optional(),
  where: CheckTaskWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.CheckTaskFindUniqueArgs>;

export const CheckTaskFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CheckTaskFindUniqueOrThrowArgs> = z.object({
  select: CheckTaskSelectSchema.optional(),
  include: CheckTaskIncludeSchema.optional(),
  where: CheckTaskWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.CheckTaskFindUniqueOrThrowArgs>;

export const CheckFeatureFindFirstArgsSchema: z.ZodType<Prisma.CheckFeatureFindFirstArgs> = z.object({
  select: CheckFeatureSelectSchema.optional(),
  include: CheckFeatureIncludeSchema.optional(),
  where: CheckFeatureWhereInputSchema.optional(),
  orderBy: z.union([ CheckFeatureOrderByWithRelationInputSchema.array(),CheckFeatureOrderByWithRelationInputSchema ]).optional(),
  cursor: CheckFeatureWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CheckFeatureScalarFieldEnumSchema,CheckFeatureScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.CheckFeatureFindFirstArgs>;

export const CheckFeatureFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CheckFeatureFindFirstOrThrowArgs> = z.object({
  select: CheckFeatureSelectSchema.optional(),
  include: CheckFeatureIncludeSchema.optional(),
  where: CheckFeatureWhereInputSchema.optional(),
  orderBy: z.union([ CheckFeatureOrderByWithRelationInputSchema.array(),CheckFeatureOrderByWithRelationInputSchema ]).optional(),
  cursor: CheckFeatureWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CheckFeatureScalarFieldEnumSchema,CheckFeatureScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.CheckFeatureFindFirstOrThrowArgs>;

export const CheckFeatureFindManyArgsSchema: z.ZodType<Prisma.CheckFeatureFindManyArgs> = z.object({
  select: CheckFeatureSelectSchema.optional(),
  include: CheckFeatureIncludeSchema.optional(),
  where: CheckFeatureWhereInputSchema.optional(),
  orderBy: z.union([ CheckFeatureOrderByWithRelationInputSchema.array(),CheckFeatureOrderByWithRelationInputSchema ]).optional(),
  cursor: CheckFeatureWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CheckFeatureScalarFieldEnumSchema,CheckFeatureScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.CheckFeatureFindManyArgs>;

export const CheckFeatureAggregateArgsSchema: z.ZodType<Prisma.CheckFeatureAggregateArgs> = z.object({
  where: CheckFeatureWhereInputSchema.optional(),
  orderBy: z.union([ CheckFeatureOrderByWithRelationInputSchema.array(),CheckFeatureOrderByWithRelationInputSchema ]).optional(),
  cursor: CheckFeatureWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.CheckFeatureAggregateArgs>;

export const CheckFeatureGroupByArgsSchema: z.ZodType<Prisma.CheckFeatureGroupByArgs> = z.object({
  where: CheckFeatureWhereInputSchema.optional(),
  orderBy: z.union([ CheckFeatureOrderByWithAggregationInputSchema.array(),CheckFeatureOrderByWithAggregationInputSchema ]).optional(),
  by: CheckFeatureScalarFieldEnumSchema.array(),
  having: CheckFeatureScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.CheckFeatureGroupByArgs>;

export const CheckFeatureFindUniqueArgsSchema: z.ZodType<Prisma.CheckFeatureFindUniqueArgs> = z.object({
  select: CheckFeatureSelectSchema.optional(),
  include: CheckFeatureIncludeSchema.optional(),
  where: CheckFeatureWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.CheckFeatureFindUniqueArgs>;

export const CheckFeatureFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CheckFeatureFindUniqueOrThrowArgs> = z.object({
  select: CheckFeatureSelectSchema.optional(),
  include: CheckFeatureIncludeSchema.optional(),
  where: CheckFeatureWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.CheckFeatureFindUniqueOrThrowArgs>;

export const PictureTaskFindFirstArgsSchema: z.ZodType<Prisma.PictureTaskFindFirstArgs> = z.object({
  select: PictureTaskSelectSchema.optional(),
  include: PictureTaskIncludeSchema.optional(),
  where: PictureTaskWhereInputSchema.optional(),
  orderBy: z.union([ PictureTaskOrderByWithRelationInputSchema.array(),PictureTaskOrderByWithRelationInputSchema ]).optional(),
  cursor: PictureTaskWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PictureTaskScalarFieldEnumSchema,PictureTaskScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.PictureTaskFindFirstArgs>;

export const PictureTaskFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PictureTaskFindFirstOrThrowArgs> = z.object({
  select: PictureTaskSelectSchema.optional(),
  include: PictureTaskIncludeSchema.optional(),
  where: PictureTaskWhereInputSchema.optional(),
  orderBy: z.union([ PictureTaskOrderByWithRelationInputSchema.array(),PictureTaskOrderByWithRelationInputSchema ]).optional(),
  cursor: PictureTaskWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PictureTaskScalarFieldEnumSchema,PictureTaskScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.PictureTaskFindFirstOrThrowArgs>;

export const PictureTaskFindManyArgsSchema: z.ZodType<Prisma.PictureTaskFindManyArgs> = z.object({
  select: PictureTaskSelectSchema.optional(),
  include: PictureTaskIncludeSchema.optional(),
  where: PictureTaskWhereInputSchema.optional(),
  orderBy: z.union([ PictureTaskOrderByWithRelationInputSchema.array(),PictureTaskOrderByWithRelationInputSchema ]).optional(),
  cursor: PictureTaskWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PictureTaskScalarFieldEnumSchema,PictureTaskScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.PictureTaskFindManyArgs>;

export const PictureTaskAggregateArgsSchema: z.ZodType<Prisma.PictureTaskAggregateArgs> = z.object({
  where: PictureTaskWhereInputSchema.optional(),
  orderBy: z.union([ PictureTaskOrderByWithRelationInputSchema.array(),PictureTaskOrderByWithRelationInputSchema ]).optional(),
  cursor: PictureTaskWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.PictureTaskAggregateArgs>;

export const PictureTaskGroupByArgsSchema: z.ZodType<Prisma.PictureTaskGroupByArgs> = z.object({
  where: PictureTaskWhereInputSchema.optional(),
  orderBy: z.union([ PictureTaskOrderByWithAggregationInputSchema.array(),PictureTaskOrderByWithAggregationInputSchema ]).optional(),
  by: PictureTaskScalarFieldEnumSchema.array(),
  having: PictureTaskScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.PictureTaskGroupByArgs>;

export const PictureTaskFindUniqueArgsSchema: z.ZodType<Prisma.PictureTaskFindUniqueArgs> = z.object({
  select: PictureTaskSelectSchema.optional(),
  include: PictureTaskIncludeSchema.optional(),
  where: PictureTaskWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.PictureTaskFindUniqueArgs>;

export const PictureTaskFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PictureTaskFindUniqueOrThrowArgs> = z.object({
  select: PictureTaskSelectSchema.optional(),
  include: PictureTaskIncludeSchema.optional(),
  where: PictureTaskWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.PictureTaskFindUniqueOrThrowArgs>;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]).optional(),
}).strict() as z.ZodType<Prisma.UserCreateArgs>;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.UserUpsertArgs>;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.UserCreateManyArgs>;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.UserCreateManyAndReturnArgs>;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.UserDeleteArgs>;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.UserUpdateArgs>;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() as z.ZodType<Prisma.UserUpdateManyArgs>;

export const UserUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() as z.ZodType<Prisma.UserUpdateManyAndReturnArgs>;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() as z.ZodType<Prisma.UserDeleteManyArgs>;

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

export const FeatureCreateArgsSchema: z.ZodType<Prisma.FeatureCreateArgs> = z.object({
  select: FeatureSelectSchema.optional(),
  include: FeatureIncludeSchema.optional(),
  data: z.union([ FeatureCreateInputSchema,FeatureUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.FeatureCreateArgs>;

export const FeatureUpsertArgsSchema: z.ZodType<Prisma.FeatureUpsertArgs> = z.object({
  select: FeatureSelectSchema.optional(),
  include: FeatureIncludeSchema.optional(),
  where: FeatureWhereUniqueInputSchema,
  create: z.union([ FeatureCreateInputSchema,FeatureUncheckedCreateInputSchema ]),
  update: z.union([ FeatureUpdateInputSchema,FeatureUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.FeatureUpsertArgs>;

export const FeatureCreateManyArgsSchema: z.ZodType<Prisma.FeatureCreateManyArgs> = z.object({
  data: z.union([ FeatureCreateManyInputSchema,FeatureCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.FeatureCreateManyArgs>;

export const FeatureCreateManyAndReturnArgsSchema: z.ZodType<Prisma.FeatureCreateManyAndReturnArgs> = z.object({
  data: z.union([ FeatureCreateManyInputSchema,FeatureCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.FeatureCreateManyAndReturnArgs>;

export const FeatureDeleteArgsSchema: z.ZodType<Prisma.FeatureDeleteArgs> = z.object({
  select: FeatureSelectSchema.optional(),
  include: FeatureIncludeSchema.optional(),
  where: FeatureWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.FeatureDeleteArgs>;

export const FeatureUpdateArgsSchema: z.ZodType<Prisma.FeatureUpdateArgs> = z.object({
  select: FeatureSelectSchema.optional(),
  include: FeatureIncludeSchema.optional(),
  data: z.union([ FeatureUpdateInputSchema,FeatureUncheckedUpdateInputSchema ]),
  where: FeatureWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.FeatureUpdateArgs>;

export const FeatureUpdateManyArgsSchema: z.ZodType<Prisma.FeatureUpdateManyArgs> = z.object({
  data: z.union([ FeatureUpdateManyMutationInputSchema,FeatureUncheckedUpdateManyInputSchema ]),
  where: FeatureWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() as z.ZodType<Prisma.FeatureUpdateManyArgs>;

export const FeatureUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.FeatureUpdateManyAndReturnArgs> = z.object({
  data: z.union([ FeatureUpdateManyMutationInputSchema,FeatureUncheckedUpdateManyInputSchema ]),
  where: FeatureWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() as z.ZodType<Prisma.FeatureUpdateManyAndReturnArgs>;

export const FeatureDeleteManyArgsSchema: z.ZodType<Prisma.FeatureDeleteManyArgs> = z.object({
  where: FeatureWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() as z.ZodType<Prisma.FeatureDeleteManyArgs>;

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

export const LabelTaskCreateArgsSchema: z.ZodType<Prisma.LabelTaskCreateArgs> = z.object({
  select: LabelTaskSelectSchema.optional(),
  include: LabelTaskIncludeSchema.optional(),
  data: z.union([ LabelTaskCreateInputSchema,LabelTaskUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.LabelTaskCreateArgs>;

export const LabelTaskUpsertArgsSchema: z.ZodType<Prisma.LabelTaskUpsertArgs> = z.object({
  select: LabelTaskSelectSchema.optional(),
  include: LabelTaskIncludeSchema.optional(),
  where: LabelTaskWhereUniqueInputSchema,
  create: z.union([ LabelTaskCreateInputSchema,LabelTaskUncheckedCreateInputSchema ]),
  update: z.union([ LabelTaskUpdateInputSchema,LabelTaskUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.LabelTaskUpsertArgs>;

export const LabelTaskCreateManyArgsSchema: z.ZodType<Prisma.LabelTaskCreateManyArgs> = z.object({
  data: z.union([ LabelTaskCreateManyInputSchema,LabelTaskCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.LabelTaskCreateManyArgs>;

export const LabelTaskCreateManyAndReturnArgsSchema: z.ZodType<Prisma.LabelTaskCreateManyAndReturnArgs> = z.object({
  data: z.union([ LabelTaskCreateManyInputSchema,LabelTaskCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.LabelTaskCreateManyAndReturnArgs>;

export const LabelTaskDeleteArgsSchema: z.ZodType<Prisma.LabelTaskDeleteArgs> = z.object({
  select: LabelTaskSelectSchema.optional(),
  include: LabelTaskIncludeSchema.optional(),
  where: LabelTaskWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.LabelTaskDeleteArgs>;

export const LabelTaskUpdateArgsSchema: z.ZodType<Prisma.LabelTaskUpdateArgs> = z.object({
  select: LabelTaskSelectSchema.optional(),
  include: LabelTaskIncludeSchema.optional(),
  data: z.union([ LabelTaskUpdateInputSchema,LabelTaskUncheckedUpdateInputSchema ]),
  where: LabelTaskWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.LabelTaskUpdateArgs>;

export const LabelTaskUpdateManyArgsSchema: z.ZodType<Prisma.LabelTaskUpdateManyArgs> = z.object({
  data: z.union([ LabelTaskUpdateManyMutationInputSchema,LabelTaskUncheckedUpdateManyInputSchema ]),
  where: LabelTaskWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() as z.ZodType<Prisma.LabelTaskUpdateManyArgs>;

export const LabelTaskUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.LabelTaskUpdateManyAndReturnArgs> = z.object({
  data: z.union([ LabelTaskUpdateManyMutationInputSchema,LabelTaskUncheckedUpdateManyInputSchema ]),
  where: LabelTaskWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() as z.ZodType<Prisma.LabelTaskUpdateManyAndReturnArgs>;

export const LabelTaskDeleteManyArgsSchema: z.ZodType<Prisma.LabelTaskDeleteManyArgs> = z.object({
  where: LabelTaskWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() as z.ZodType<Prisma.LabelTaskDeleteManyArgs>;

export const FeatureLabelCreateArgsSchema: z.ZodType<Prisma.FeatureLabelCreateArgs> = z.object({
  select: FeatureLabelSelectSchema.optional(),
  include: FeatureLabelIncludeSchema.optional(),
  data: z.union([ FeatureLabelCreateInputSchema,FeatureLabelUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.FeatureLabelCreateArgs>;

export const FeatureLabelUpsertArgsSchema: z.ZodType<Prisma.FeatureLabelUpsertArgs> = z.object({
  select: FeatureLabelSelectSchema.optional(),
  include: FeatureLabelIncludeSchema.optional(),
  where: FeatureLabelWhereUniqueInputSchema,
  create: z.union([ FeatureLabelCreateInputSchema,FeatureLabelUncheckedCreateInputSchema ]),
  update: z.union([ FeatureLabelUpdateInputSchema,FeatureLabelUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.FeatureLabelUpsertArgs>;

export const FeatureLabelCreateManyArgsSchema: z.ZodType<Prisma.FeatureLabelCreateManyArgs> = z.object({
  data: z.union([ FeatureLabelCreateManyInputSchema,FeatureLabelCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.FeatureLabelCreateManyArgs>;

export const FeatureLabelCreateManyAndReturnArgsSchema: z.ZodType<Prisma.FeatureLabelCreateManyAndReturnArgs> = z.object({
  data: z.union([ FeatureLabelCreateManyInputSchema,FeatureLabelCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.FeatureLabelCreateManyAndReturnArgs>;

export const FeatureLabelDeleteArgsSchema: z.ZodType<Prisma.FeatureLabelDeleteArgs> = z.object({
  select: FeatureLabelSelectSchema.optional(),
  include: FeatureLabelIncludeSchema.optional(),
  where: FeatureLabelWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.FeatureLabelDeleteArgs>;

export const FeatureLabelUpdateArgsSchema: z.ZodType<Prisma.FeatureLabelUpdateArgs> = z.object({
  select: FeatureLabelSelectSchema.optional(),
  include: FeatureLabelIncludeSchema.optional(),
  data: z.union([ FeatureLabelUpdateInputSchema,FeatureLabelUncheckedUpdateInputSchema ]),
  where: FeatureLabelWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.FeatureLabelUpdateArgs>;

export const FeatureLabelUpdateManyArgsSchema: z.ZodType<Prisma.FeatureLabelUpdateManyArgs> = z.object({
  data: z.union([ FeatureLabelUpdateManyMutationInputSchema,FeatureLabelUncheckedUpdateManyInputSchema ]),
  where: FeatureLabelWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() as z.ZodType<Prisma.FeatureLabelUpdateManyArgs>;

export const FeatureLabelUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.FeatureLabelUpdateManyAndReturnArgs> = z.object({
  data: z.union([ FeatureLabelUpdateManyMutationInputSchema,FeatureLabelUncheckedUpdateManyInputSchema ]),
  where: FeatureLabelWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() as z.ZodType<Prisma.FeatureLabelUpdateManyAndReturnArgs>;

export const FeatureLabelDeleteManyArgsSchema: z.ZodType<Prisma.FeatureLabelDeleteManyArgs> = z.object({
  where: FeatureLabelWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() as z.ZodType<Prisma.FeatureLabelDeleteManyArgs>;

export const CheckTaskCreateArgsSchema: z.ZodType<Prisma.CheckTaskCreateArgs> = z.object({
  select: CheckTaskSelectSchema.optional(),
  include: CheckTaskIncludeSchema.optional(),
  data: z.union([ CheckTaskCreateInputSchema,CheckTaskUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.CheckTaskCreateArgs>;

export const CheckTaskUpsertArgsSchema: z.ZodType<Prisma.CheckTaskUpsertArgs> = z.object({
  select: CheckTaskSelectSchema.optional(),
  include: CheckTaskIncludeSchema.optional(),
  where: CheckTaskWhereUniqueInputSchema,
  create: z.union([ CheckTaskCreateInputSchema,CheckTaskUncheckedCreateInputSchema ]),
  update: z.union([ CheckTaskUpdateInputSchema,CheckTaskUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.CheckTaskUpsertArgs>;

export const CheckTaskCreateManyArgsSchema: z.ZodType<Prisma.CheckTaskCreateManyArgs> = z.object({
  data: z.union([ CheckTaskCreateManyInputSchema,CheckTaskCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.CheckTaskCreateManyArgs>;

export const CheckTaskCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CheckTaskCreateManyAndReturnArgs> = z.object({
  data: z.union([ CheckTaskCreateManyInputSchema,CheckTaskCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.CheckTaskCreateManyAndReturnArgs>;

export const CheckTaskDeleteArgsSchema: z.ZodType<Prisma.CheckTaskDeleteArgs> = z.object({
  select: CheckTaskSelectSchema.optional(),
  include: CheckTaskIncludeSchema.optional(),
  where: CheckTaskWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.CheckTaskDeleteArgs>;

export const CheckTaskUpdateArgsSchema: z.ZodType<Prisma.CheckTaskUpdateArgs> = z.object({
  select: CheckTaskSelectSchema.optional(),
  include: CheckTaskIncludeSchema.optional(),
  data: z.union([ CheckTaskUpdateInputSchema,CheckTaskUncheckedUpdateInputSchema ]),
  where: CheckTaskWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.CheckTaskUpdateArgs>;

export const CheckTaskUpdateManyArgsSchema: z.ZodType<Prisma.CheckTaskUpdateManyArgs> = z.object({
  data: z.union([ CheckTaskUpdateManyMutationInputSchema,CheckTaskUncheckedUpdateManyInputSchema ]),
  where: CheckTaskWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() as z.ZodType<Prisma.CheckTaskUpdateManyArgs>;

export const CheckTaskUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.CheckTaskUpdateManyAndReturnArgs> = z.object({
  data: z.union([ CheckTaskUpdateManyMutationInputSchema,CheckTaskUncheckedUpdateManyInputSchema ]),
  where: CheckTaskWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() as z.ZodType<Prisma.CheckTaskUpdateManyAndReturnArgs>;

export const CheckTaskDeleteManyArgsSchema: z.ZodType<Prisma.CheckTaskDeleteManyArgs> = z.object({
  where: CheckTaskWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() as z.ZodType<Prisma.CheckTaskDeleteManyArgs>;

export const CheckFeatureCreateArgsSchema: z.ZodType<Prisma.CheckFeatureCreateArgs> = z.object({
  select: CheckFeatureSelectSchema.optional(),
  include: CheckFeatureIncludeSchema.optional(),
  data: z.union([ CheckFeatureCreateInputSchema,CheckFeatureUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.CheckFeatureCreateArgs>;

export const CheckFeatureUpsertArgsSchema: z.ZodType<Prisma.CheckFeatureUpsertArgs> = z.object({
  select: CheckFeatureSelectSchema.optional(),
  include: CheckFeatureIncludeSchema.optional(),
  where: CheckFeatureWhereUniqueInputSchema,
  create: z.union([ CheckFeatureCreateInputSchema,CheckFeatureUncheckedCreateInputSchema ]),
  update: z.union([ CheckFeatureUpdateInputSchema,CheckFeatureUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.CheckFeatureUpsertArgs>;

export const CheckFeatureCreateManyArgsSchema: z.ZodType<Prisma.CheckFeatureCreateManyArgs> = z.object({
  data: z.union([ CheckFeatureCreateManyInputSchema,CheckFeatureCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.CheckFeatureCreateManyArgs>;

export const CheckFeatureCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CheckFeatureCreateManyAndReturnArgs> = z.object({
  data: z.union([ CheckFeatureCreateManyInputSchema,CheckFeatureCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.CheckFeatureCreateManyAndReturnArgs>;

export const CheckFeatureDeleteArgsSchema: z.ZodType<Prisma.CheckFeatureDeleteArgs> = z.object({
  select: CheckFeatureSelectSchema.optional(),
  include: CheckFeatureIncludeSchema.optional(),
  where: CheckFeatureWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.CheckFeatureDeleteArgs>;

export const CheckFeatureUpdateArgsSchema: z.ZodType<Prisma.CheckFeatureUpdateArgs> = z.object({
  select: CheckFeatureSelectSchema.optional(),
  include: CheckFeatureIncludeSchema.optional(),
  data: z.union([ CheckFeatureUpdateInputSchema,CheckFeatureUncheckedUpdateInputSchema ]),
  where: CheckFeatureWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.CheckFeatureUpdateArgs>;

export const CheckFeatureUpdateManyArgsSchema: z.ZodType<Prisma.CheckFeatureUpdateManyArgs> = z.object({
  data: z.union([ CheckFeatureUpdateManyMutationInputSchema,CheckFeatureUncheckedUpdateManyInputSchema ]),
  where: CheckFeatureWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() as z.ZodType<Prisma.CheckFeatureUpdateManyArgs>;

export const CheckFeatureUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.CheckFeatureUpdateManyAndReturnArgs> = z.object({
  data: z.union([ CheckFeatureUpdateManyMutationInputSchema,CheckFeatureUncheckedUpdateManyInputSchema ]),
  where: CheckFeatureWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() as z.ZodType<Prisma.CheckFeatureUpdateManyAndReturnArgs>;

export const CheckFeatureDeleteManyArgsSchema: z.ZodType<Prisma.CheckFeatureDeleteManyArgs> = z.object({
  where: CheckFeatureWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() as z.ZodType<Prisma.CheckFeatureDeleteManyArgs>;

export const PictureTaskCreateArgsSchema: z.ZodType<Prisma.PictureTaskCreateArgs> = z.object({
  select: PictureTaskSelectSchema.optional(),
  include: PictureTaskIncludeSchema.optional(),
  data: z.union([ PictureTaskCreateInputSchema,PictureTaskUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.PictureTaskCreateArgs>;

export const PictureTaskUpsertArgsSchema: z.ZodType<Prisma.PictureTaskUpsertArgs> = z.object({
  select: PictureTaskSelectSchema.optional(),
  include: PictureTaskIncludeSchema.optional(),
  where: PictureTaskWhereUniqueInputSchema,
  create: z.union([ PictureTaskCreateInputSchema,PictureTaskUncheckedCreateInputSchema ]),
  update: z.union([ PictureTaskUpdateInputSchema,PictureTaskUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.PictureTaskUpsertArgs>;

export const PictureTaskCreateManyArgsSchema: z.ZodType<Prisma.PictureTaskCreateManyArgs> = z.object({
  data: z.union([ PictureTaskCreateManyInputSchema,PictureTaskCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.PictureTaskCreateManyArgs>;

export const PictureTaskCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PictureTaskCreateManyAndReturnArgs> = z.object({
  data: z.union([ PictureTaskCreateManyInputSchema,PictureTaskCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.PictureTaskCreateManyAndReturnArgs>;

export const PictureTaskDeleteArgsSchema: z.ZodType<Prisma.PictureTaskDeleteArgs> = z.object({
  select: PictureTaskSelectSchema.optional(),
  include: PictureTaskIncludeSchema.optional(),
  where: PictureTaskWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.PictureTaskDeleteArgs>;

export const PictureTaskUpdateArgsSchema: z.ZodType<Prisma.PictureTaskUpdateArgs> = z.object({
  select: PictureTaskSelectSchema.optional(),
  include: PictureTaskIncludeSchema.optional(),
  data: z.union([ PictureTaskUpdateInputSchema,PictureTaskUncheckedUpdateInputSchema ]),
  where: PictureTaskWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.PictureTaskUpdateArgs>;

export const PictureTaskUpdateManyArgsSchema: z.ZodType<Prisma.PictureTaskUpdateManyArgs> = z.object({
  data: z.union([ PictureTaskUpdateManyMutationInputSchema,PictureTaskUncheckedUpdateManyInputSchema ]),
  where: PictureTaskWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() as z.ZodType<Prisma.PictureTaskUpdateManyArgs>;

export const PictureTaskUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.PictureTaskUpdateManyAndReturnArgs> = z.object({
  data: z.union([ PictureTaskUpdateManyMutationInputSchema,PictureTaskUncheckedUpdateManyInputSchema ]),
  where: PictureTaskWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() as z.ZodType<Prisma.PictureTaskUpdateManyAndReturnArgs>;

export const PictureTaskDeleteManyArgsSchema: z.ZodType<Prisma.PictureTaskDeleteManyArgs> = z.object({
  where: PictureTaskWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() as z.ZodType<Prisma.PictureTaskDeleteManyArgs>;