import enrollmentsService from '@/services/enrollments-service';
import ticketsService from '@/services/tickets-service';
import { AuthenticatedRequest } from '@/middlewares';
import { Response } from 'express';
import httpStatus from 'http-status';

export async function ticketPost(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { ticketTypeId } = req.body;
  if (!ticketTypeId) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  try {
    const enrollmentId = await enrollmentsService.getOneWithAddressByUserId(userId);
    const ticket = await ticketsService.createTicket(ticketTypeId, enrollmentId.id);
    return res.status(httpStatus.CREATED).send(ticket);
  } catch {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getTicketTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const ticketType = await ticketsService.getTicketTypes();
    return res.status(httpStatus.OK).send(ticketType);
  } catch {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
