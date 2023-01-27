import { prisma } from '@/config';

async function createTicket(ticketTypeId: number, enrollmentId: number) {
  return prisma.ticket.create({
    data: {
      ticketTypeId,
      enrollmentId,
      status: 'RESERVED',
    },
    include: {
      TicketType: true,
    },
  });
}

async function getTicketTypes() {
  return prisma.ticketType.findMany({
    orderBy: { id: 'asc' },
  });
}

const ticketRepository = {
  createTicket,
  getTicketTypes,
};

export default ticketRepository;
