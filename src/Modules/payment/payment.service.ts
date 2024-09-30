import { readFileSync } from 'fs';
import { join } from 'path';
import { Booking } from '../booking/booking.model';
import { verifyPayment } from './payment.utils';

const confirmationService = async (transactionId: string, status: string) => {
  const verifyResponse = await verifyPayment(transactionId);
  let result;

  let message = '';

  if (verifyResponse && verifyResponse.pay_status === 'Successfull') {
    result = await Booking.findOneAndUpdate(
      { transactionId },
      {
        status: 'completed',
      },
    );
    message = 'Successfully paid';
  } else {
    message = 'Payment failed';
  }

  const filePath = join(__dirname, '../../../views/confirmation.html');
  let templete = readFileSync(filePath, 'utf-8');

  templete = templete.replace('{{message}}', message);

  return templete;
};

export const PaymentServices = {
  confirmationService,
};
