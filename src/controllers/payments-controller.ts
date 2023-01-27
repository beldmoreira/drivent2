import enrollmentsService from '@/services/enrollments-service';
import paymentsService from '@/services/payments-service';
import ticketsService from '@/services/tickets-service';
import { AuthenticatedRequest } from '@/middlewares';
import { Response } from 'express';
import httpStatus from 'http-status';

export async function getPayments(req: AuthenticatedRequest, res: Response) {
  const { ticketId } = req.query;
  const { userId } = req;
  if (!ticketId) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  try {
    const getEnrollment = await enrollmentsService.findEnrollment(userId);
    const findticketId = await ticketsService.findTicketsById(Number(ticketId));
    const payment = await paymentsService.getPayments(getEnrollment.id, findticketId);
    if (!payment) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === 'UnauthorizedError') {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
