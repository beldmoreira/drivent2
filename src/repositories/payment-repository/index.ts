import { prisma } from '@/config';
import { Payment } from '@prisma/client';

async function getPayments(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}

async function postPaymentProcess(ticketId: number, cardData: CreatePayment) {
  return prisma.payment.create({
    data: {
      ticketId,
      ...cardData,
    },
  });
}

export type CreatePayment = Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>;

const paymentRepository = {
  getPayments,
  postPaymentProcess,
};

export default paymentRepository;
