import { RequestHandler } from 'express';
import { Dataset, Task } from '@prisma/client';

export interface TasksController {
  getAllTasks: RequestHandler;
  getTaskByLabel: RequestHandler;
  createTaskWithLabel: RequestHandler;
  getTaskStatus: RequestHandler;
}

type TaskType = 'labeling' | 'crossChecking';

export interface TaskDto {
  id: string;
  dataset: Dataset;
  type: TaskType;
  endDate: Date;
}

export interface TaskStatusDto {
  id: string;
  dataset: {
    name: string;
    description: string;
  };
}

export interface TasksService {
  getAllTasks: () => Promise<Array<Task>>;
  getTaskByLabel: (id: string) => Promise<Task | null>;
  createTaskWithLabel: (task: Task) => Promise<Task>;
  getTaskStatus: (id: string) => Promise<Task | null>;
}

export interface TasksRepository {
  getAllTasks: () => Promise<Array<Task>>;
  getTaskByLabel: (id: string) => Promise<Task | null>;
  createTaskWithLabel: (taskDto: Task) => Promise<Task>;
  getTaskStatus: (id: string) => Promise<Task | null>;
}
