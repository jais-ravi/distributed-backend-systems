import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import healthRoutes from './routes/health.routes.js';
import { requestLogger } from '@shared/middlewares';

const app: express.Application = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use('/v1', healthRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Hello Hot Reload!' });
});

export default app;
