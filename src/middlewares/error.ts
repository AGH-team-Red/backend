import { Request, Response, NextFunction, RequestHandler } from 'express';
import { ServerError } from 'utils/server-error';

const errorHandler = (err: ServerError, _req: Request, res: Response, _next: NextFunction): void => {
  const body = {
    error: err.message,
    status: err.status || 500
  };

  res.status(err.status || 500).json(body);
};

const withErrorHandling = (callback: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await callback(req, res, next);
    } catch (error) {
      console.error('error', error);

      next(error);
    }
  };
};

export { ServerError, errorHandler, withErrorHandling };
