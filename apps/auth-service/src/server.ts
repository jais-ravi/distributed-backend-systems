import app from './app.js';
import { Logger } from '@shared/logger';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    Logger.info(`Auth Service running on port ${PORT}`);
});
