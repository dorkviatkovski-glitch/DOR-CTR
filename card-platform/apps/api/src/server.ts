import cors from 'cors';
import express from 'express';
import { env } from './config/env.js';
import { healthRouter } from './modules/health/health.router.js';
import { errorHandler, notFoundHandler } from './middleware/error-handler.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/health', healthRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`${env.API_NAME} listening on http://localhost:${env.PORT}`);
});
