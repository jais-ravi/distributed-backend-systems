import app from './app.js';
import { Logger } from '@shared/logger';

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
    Logger.info(`User Service running on port ${PORT}`);
});
