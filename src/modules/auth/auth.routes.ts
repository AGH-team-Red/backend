import { Router } from 'express';
import { AuthController } from './types';
import { withErrorHandling } from 'middlewares/error';

const getAuthRoutes = (authController: AuthController): Router => {
  const router = Router();

  router.post('/nonce/', withErrorHandling(authController.getNonce));
  router.post('/verify', withErrorHandling(authController.verifySignature));

  return router;
};

export { getAuthRoutes };
