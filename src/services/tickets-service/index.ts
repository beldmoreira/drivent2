import { notFoundError } from '@/errors';
import ticketRepository from '@/repositories/ticket-repository';

async function createTicket(ticketTypeId: number, enrollmentId: number) {
  const newTicket = await ticketRepository.createTicket(ticketTypeId, enrollmentId);
  if (!newTicket) throw notFoundError();
  return newTicket;
}

async function getTicketTypes() {
  const ticketType = await ticketRepository.getTicketTypes();
  if (!ticketType) throw notFoundError();
  return ticketType;
}

async function getTickets(userId: number) {
  const tickets = await ticketRepository.getTickets(userId);
  if (!tickets) throw notFoundError();
  return tickets;
}

async function findTicketsById(ticketId: number) {
  const ticket = await ticketRepository.findTicketById(ticketId);
  if (!ticket) throw notFoundError();
  return ticket;
}

const ticketsService = {
  createTicket,
  getTicketTypes,
  getTickets,
  findTicketsById,
};

export default ticketsService;
