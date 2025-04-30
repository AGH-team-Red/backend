import express from 'express';
import { PrismaClient } from '@prisma/client';
import { registerRoutes } from './register-routes';
import { getEnv } from 'utils/env';
import { errorHandler } from 'middlewares/error';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

registerRoutes(app, prisma);

app.use(errorHandler);

const PORT = getEnv('PORT', String(3000));

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
