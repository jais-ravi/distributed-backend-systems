import { Router } from 'express';
import { HealthController } from '../controllers/health.controller.js';

const router: Router = Router();

router.get('/health', HealthController.check);

export default router;
