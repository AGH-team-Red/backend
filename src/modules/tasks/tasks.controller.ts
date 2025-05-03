import { TasksController, TasksService } from 'modules/tasks/types';
import { Request, Response } from 'express';

const getTasksController = (tasksService: TasksService): TasksController => {
  const getAllTasks = async (req: Request, res: Response): Promise<void> => {
    const task = await tasksService.getAllTasks();

    if (!task) {
      res.status(404).send('Not Found');
    }

    res.json(task);
  };

  const getTaskByLabel = (req: Request, res: Response): void => {
    const labelId = req.params.labelId;
    const task = tasksService.getTaskByLabel(labelId);

    if (!task) {
      res.status(404).send('Not Found');
    }

    res.json(task);
  };

  const createTaskWithLabel = (req: Request, res: Response): void => {
    const task = req.body;
    const createdTask = tasksService.createTaskWithLabel(task);

    if (!createdTask) {
      res.status(404).send('Not Found');
    }

    res.json(createdTask);
  };

  const getTaskStatus = (req: Request, res: Response): void => {
    const taskId = req.params.taskId;
    const task = tasksService.getTaskStatus(taskId);

    if (!task) {
      res.status(404).send('Not Found');
    }

    res.json(task);
  };

  return {
    getAllTasks,
    getTaskByLabel,
    createTaskWithLabel,
    getTaskStatus
  };
};

export { getTasksController };
