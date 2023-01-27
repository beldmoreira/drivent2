import { prisma } from '@/config';

async function getPayments(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}

const paymentRepository = {
  getPayments,
};

export default paymentRepository;
