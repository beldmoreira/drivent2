import { notFoundError } from '@/errors';
import ticketRepository from '@/repositories/ticket-repository';

async function createTicket(ticketTypeId: number, enrollmentId: number) {
  const newTicket = await ticketRepository.createTicket(ticketTypeId, enrollmentId);
  if (!newTicket) throw notFoundError();
  return newTicket;
}

const ticketsService = {
  createTicket,
};

export default ticketsService;
