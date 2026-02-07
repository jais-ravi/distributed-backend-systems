import { Request, Response } from 'express';
import { HealthResponse } from '@shared/types';
import { Logger } from '@shared/logger';

export class HealthController {
    static check(req: Request, res: Response) {
        Logger.info('Health check requested');
        const response: HealthResponse = {
            status: 'ok',
            timestamp: new Date().toISOString()
        };
        res.json(response);
    }
}
