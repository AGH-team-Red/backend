import { Router } from 'express';
import { AuthController } from './types';

const getAuthRoutes = (authController: AuthController): Router => {
  const router = Router();

  router.get('/nonce', authController.getNonce);
  router.post('/verify', authController.verifySignature);

  return router;
};

export { getAuthRoutes };
