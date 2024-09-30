/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import config from '../../config';

export const initiatePayment = async (paymentData: any) => {
  try {
    const response = await axios.post(config.payment_url!, {
      store_id: config.store_id,
      signature_key: config.signature_key,
      tran_id: paymentData.transactionId,
      success_url: `http://localhost:5000/api/payments/confirmation?transactionId=${paymentData.transactionId}&status=completed`,
      fail_url: `http://localhost:5000/api/payments/confirmation?status=rejected`,
      cancel_url: 'http://localhost:5173/',
      amount: '10.0',
      currency: 'BDT',
      desc: 'Merchant Registration Payment',
      cus_name: 'Name',
      cus_email: 'payer@merchantcusomter.com',
      cus_add1: 'House B-158 Road 22',
      cus_add2: 'Mohakhali DOHS',
      cus_city: 'Dhaka',
      cus_state: 'Dhaka',
      cus_postcode: '1206',
      cus_country: 'Bangladesh',
      cus_phone: '+8801704',
      type: 'json',
    });

    return response.data;
  } catch (error) {
    throw new Error('Payment initiation failed');
  }
};

export const verifyPayment = async (tnxId: string) => {
  try {
    const response = await axios.get(config.payment_verify_url!, {
      params: {
        store_id: config.store_id,
        signature_key: config.signature_key,
        type: 'json',
        request_id: tnxId,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Payment validation failed');
  }
};
