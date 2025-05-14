import { Router } from 'express';
import { TasksController } from 'modules/tasks/types';
import { withErrorHandling } from 'middlewares/error';

const getTasksRoutes = (tasksController: TasksController): Router => {
  const router = Router();

  console.log('registered tasks routes');

  router.get('/', withErrorHandling(tasksController.getAllTasks));
  router.get('/:taskId', withErrorHandling(tasksController.getTaskByLabel));
  router.post('/label/:id', withErrorHandling(tasksController.createTaskWithLabel));
  router.get('/check/:id', withErrorHandling(tasksController.getTaskStatus));

  return router;
};

export { getTasksRoutes };
