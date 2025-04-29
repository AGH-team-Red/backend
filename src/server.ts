import express from 'express';
import { registerRoutes } from './register-routes';
import { getEnv } from 'utils/env';

const app = express();

app.use(express.json());

registerRoutes(app);

const PORT = getEnv('PORT', String(3000));

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
