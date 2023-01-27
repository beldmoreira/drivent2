import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { ticketPost } from '@/controllers';

const ticketsRouter = Router();
ticketsRouter.all('/*', authenticateToken).post('/', ticketPost);

export { ticketsRouter };
