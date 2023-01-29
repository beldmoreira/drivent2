import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getPayments, postPaymentProcess } from '@/controllers/payments-controller';

const paymentsRouter = Router();
paymentsRouter.all('/*', authenticateToken).get('/', getPayments).post('/process', postPaymentProcess);

export { paymentsRouter };
