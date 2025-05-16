import { RequestHandler } from 'express';
import { Task } from '@prisma/client';
import { CreateTaskDto, GetTaskParams } from 'modules/tasks/dto';

export interface TasksController {
  getAllTasks: RequestHandler;
  getTaskByLabel: RequestHandler;
  createTaskWithLabel: RequestHandler;
  getTaskStatus: RequestHandler;
}

export interface TasksService {
  getAllTasks: () => Promise<Array<Task>>;
  getTaskByLabel: (taskId: string) => Promise<Task | null>;
  getTaskStatus: (taskId: string) => Promise<Task | null>;
  createTaskWithLabel: (task: CreateTaskDto) => Promise<Task>;
}

export interface TasksRepository {
  getAllTasks: () => Promise<Array<Task>>;
  getTaskByLabel: (taskId: string) => Promise<Task | null>;
  getTaskStatus: (taskId: string) => Promise<Task | null>;
  createTaskWithLabel: (taskDto: CreateTaskDto) => Promise<Task>;
}

export type Task = {
  durationTimeHours: number;
  budgetSOL: number;
  minContributors: number;
  minSamplesCount: number;
};

export type RewardScheme = {
  baseRewardPerSample: number;
  estimatedRewardPerContributor: number;
  bonusPool: number;
  maxRewardPerContributor: number;
};
