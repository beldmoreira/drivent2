import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getTicketTypes, ticketPost } from '@/controllers';

const ticketsRouter = Router();
ticketsRouter.all('/*', authenticateToken).post('/', ticketPost).get('/types', getTicketTypes);

export { ticketsRouter };
