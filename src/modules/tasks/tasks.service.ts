import { TaskDto, TasksRepository, TasksService, TaskStatusDto } from 'modules/tasks/types';
import type { Task } from '@prisma/client';

const getTasksService = (tasksRepository: TasksRepository): TasksService => {
  const getAllTasks = async (): Promise<Array<Task>> => {
    const task = await tasksRepository.getAllTasks();

    return task;
  };

  const getTaskByLabel = async (id: string): Promise<Task | null> => {
    const task = await tasksRepository.getTaskByLabel(id);

    return task;
  };

  const createTaskWithLabel = async (task: Task): Promise<Task> => {
    const createdTask = await tasksRepository.createTaskWithLabel(task);

    return task;
  };

  const getTaskStatus = async (id: string): Promise<Task | null> => {
    const task = await tasksRepository.getTaskStatus(id);

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
