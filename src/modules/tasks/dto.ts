import { z } from 'zod';
import { TaskCreateInputSchema, TaskFindUniqueArgsSchema } from 'prisma/zod';

export type CreateTaskDto = z.infer<typeof TaskCreateInputSchema>;
export const CreateTaskSchema = TaskCreateInputSchema;

export type GetTaskParams = z.infer<typeof TaskFindUniqueArgsSchema>;
export const GetTaskParamsSchema = TaskFindUniqueArgsSchema;
