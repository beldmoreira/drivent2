import { notFoundError, unauthorizedError } from '@/errors';
import paymentRepository from '@/repositories/payment-repository';
import ticketRepository from '@/repositories/ticket-repository';
import { Ticket } from '@prisma/client';
import { generateCreditCardData } from '../../factories';

async function getPayments(enrollmentId: number, ticket: Ticket) {
  if (ticket.enrollmentId !== enrollmentId) throw unauthorizedError();
  const payments = await paymentRepository.getPayments(ticket.id);
  if (!payments) throw notFoundError();
  return payments;
}

async function postPaymentProcess(ticketId: number, enrollmentId: number, cardData: PaymentData) {
  const ticket = await ticketRepository.getTicketWithType(ticketId);
  if (ticket.enrollmentId !== enrollmentId) throw unauthorizedError();
  if (!ticket) throw notFoundError();

  const paymentData = {
    ticketId,
    value: ticket.TicketType.price,
    cardIssuer: cardData.issuer,
    cardLastDigits: cardData.number.toString().slice(-4),
  };
  const payment = await paymentRepository.postPaymentProcess(ticketId, paymentData);
  await ticketRepository.updateTicket(ticketId);
  return payment;
}

export type PaymentData = {
  issuer: string;
  number: number;
  name: string;
  expirationDate: Date;
  cvv: number;
};
const paymentsService = {
  getPayments,
  postPaymentProcess,
};

export default paymentsService;
