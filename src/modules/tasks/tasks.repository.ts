import { TasksRepository } from 'modules/tasks/types';
import type { PrismaClient, Task } from '@prisma/client';

const getTasksRepository = (prisma: PrismaClient): TasksRepository => {
  const getAllTasks = async (): Promise<Array<Task>> => {
    const tasks = await prisma.task.findMany();

    return tasks;
  };

  const getTaskByLabel = async (id: string): Promise<Task | null> => {
    const task = await prisma.task.findUnique({
      where: {
        id
      }
    });

    return task;
  };
  const createTaskWithLabel = async (taskDto: Task): Promise<Task> => {
    const task = await prisma.task.create({
      data: taskDto,
      include: {
        dataset: true
      }
    });

    return task;
  };
  const getTaskStatus = async (id: string): Promise<Task | null> => {
    const task = await prisma.task.findUnique({
      where: {
        id
      }
    });

    return task;
  };

  return {
    getAllTasks,
    getTaskByLabel,
    createTaskWithLabel,
    getTaskStatus
  };
};

export { getTasksRepository };
