import axios from "axios";

import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../errors/appError";

export const initiatePayment = async (paymentData: any) => {
  try {
    const response = await axios.post(config.payment_url!, {
      store_id: config.store_id,
      signature_key: config.signature_key,
      tran_id: paymentData.transactionId,
      success_url: `http://localhost:5000/api/payment/confirmation?transactionId=${paymentData.transactionId}&status=success`,
      fail_url: `http://localhost:5000/api/payment/confirmation?status=failed`,
      cancel_url: config.cancel_url,
      amount: paymentData.totalCost,
      currency: "BDT",
      desc: "Merchant Registration Payment",
      cus_name: 'Name',
      cus_email: 'payer@merchantcustomer.com',
      cus_add1: 'House B-158 Road 22',
      cus_add2: 'Mohakhali DOHS',
      cus_city: 'Dhaka',
      cus_state: 'Dhaka',
      cus_postcode: '1206',
      cus_country: 'Bangladesh',
      type: 'json',
      cus_phone: paymentData.customerPhone,
      
    });

    return response.data;
  } catch (err) {
    throw new Error("Payment initiation failed!");
  }
};

export const verifyPayment = async (tnxId: string) => {
  try {
    const response = await axios.get(config.payment_verify_url!, {
      params: {
        store_id: config.store_id,
        signature_key: config.signature_key,
        type: "json",
        request_id: tnxId,
      },
    });

    return response.data;
  } catch (err) {
    throw new AppError(httpStatus.BAD_REQUEST, "Payment validation failed!");
  }
};