import { Request, Response, NextFunction } from 'express';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    console.log(`[REQUEST] ${new Date().toISOString()}: ${req.method} ${req.url}`);
    next();
};
