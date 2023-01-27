import { notFoundError, unauthorizedError } from '@/errors';
import paymentRepository from '@/repositories/payment-repository';
import { Ticket } from '@prisma/client';

async function getPayments(enrollmentId: number, ticket: Ticket) {
  if (ticket.enrollmentId !== enrollmentId) throw unauthorizedError();
  const payments = await paymentRepository.getPayments(ticket.id);
  if (!payments) throw notFoundError();
  return payments;
}

const paymentsService = {
  getPayments,
};

export default paymentsService;
