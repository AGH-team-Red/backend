import express from 'express';
import { registerRoutes } from './register-routes';

const app = express();

registerRoutes(app);

app.listen(4000, () => {
  console.log('Server running on port 4000');
});
