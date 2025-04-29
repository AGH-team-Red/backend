import express from 'express';
import { registerRoutes } from './register-routes';

const app = express();

app.use(express.json());

registerRoutes(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
