import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getTickets, getTicketTypes, ticketPost } from '@/controllers';

const ticketsRouter = Router();
ticketsRouter.all('/*', authenticateToken).post('/', ticketPost).get('/types', getTicketTypes).get('/', getTickets);

export { ticketsRouter };
