import { TasksRepository } from 'modules/tasks/types';
import type { PrismaClient, Task } from '@prisma/client';
import { CreateTaskDto } from './dto';

const getTasksRepository = (prisma: PrismaClient): TasksRepository => {
  const getAllTasks = async (): Promise<Array<Task>> => {
    const tasks = await prisma.task.findMany({
      include: {
        labelTask: {
          include: { featureLabels: true }
        },
        checkTask: {
          include: { checkFeatures: true }
        },
        pictureTask: true
      }
    });

    return tasks;
  };

  const getTaskByLabel = async (taskId: string): Promise<Task | null> => {
    const task = await prisma.task.findUnique({
      where: {
        id: taskId
      },
      include: {
        labelTask: {
          include: {
            featureLabels: true
          }
        },
        checkTask: {
          include: {
            checkFeatures: true
          }
        },
        pictureTask: true
      }
    });

    return task;
  };
  const createTaskWithLabel = async (taskDto: CreateTaskDto): Promise<Task> => {
    const task = await prisma.task.create({
      data: taskDto
    });

    return task;
  };
  const getTaskStatus = async (taskId: string): Promise<Task | null> => {
    const task = await prisma.task.findUnique({
      where: {
        id: taskId
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
