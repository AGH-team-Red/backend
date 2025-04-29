import { Request, Response, NextFunction } from 'express';
import { jwtClient } from '../libs/jwt-client';
import { getEnv } from '../utils/env';

const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  const auth = req.headers['authorization'];
  const BEARER_ID = 'Bearer ';

  if (!auth?.startsWith(BEARER_ID)) {
    res.status(401).json({ error: 'Missing Bearer Token.' });

    return;
  }

  const token = auth.slice(7);

  try {
    const jwtSecret = getEnv<string, string>('JWT_SECRET', '');
    const jwtPayload = jwtClient.verify(token, BEARER_ID);

    // @ts-ignore
    req.user = jwtPayload.sub;

    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token.' });
  }
};

export { requireAuth };
