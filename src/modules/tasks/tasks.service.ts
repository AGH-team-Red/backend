import { TasksRepository, TasksService } from 'modules/tasks/types';
import { CreateTaskDto } from './dto';
import type { Task } from '@prisma/client';
import {calculateReward} from "modules/tasks/reward";

const getTasksService = (tasksRepository: TasksRepository): TasksService => {
  const getAllTasks = async (): Promise<Array<Task>> => {
    const task = await tasksRepository.getAllTasks();

    return task;
  };

  const getTaskByLabel = async (taskId: string): Promise<Task | null> => {
    const task = await tasksRepository.getTaskByLabel(taskId);

    return task;
  };

  const createTaskWithLabel = async (task: CreateTaskDto): Promise<Task> => {
      const createdTask = await tasksRepository.createTaskWithLabel(task);

    return createdTask;
  };

  const getTaskStatus = async (taskId: string): Promise<Task | null> => {
    const task = await tasksRepository.getTaskStatus(taskId);

    return task;
  };

  return {
    getAllTasks,
    getTaskByLabel,
    createTaskWithLabel,
    getTaskStatus
  };
};

export { getTasksService };
