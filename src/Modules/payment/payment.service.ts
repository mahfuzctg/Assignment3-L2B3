


import { join } from "path";
import { readFileSync } from "fs";
import config from "../../config";
import { TPayment } from "./payment.interface";

import { initiatePayment } from "./payment.utils";
import AppError from "../../errors/appError";
import httpStatus from "http-status";
import { Booking } from "../booking/booking.model";
import { User } from "../user/user.model";
import { Payment } from "./payment.model";
import { verifyPayment } from "./amarPay";


const aamarpayPaymentIntoDB = async (data: TPayment) => {
  const isExistUser = await User.findById(data.userId);

  if (!isExistUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  await Booking.findOneAndUpdate({ _id: data.bookingId }, { isPaid: true });

  const transactionId = `TNX-${data.userEmail}-${Date.now()}`;

  const paymentData = {
    ...data,
    transactionId,
  };

  // payment
  const paymentSession = await initiatePayment({
    ...paymentData,
    customerName: isExistUser.name,
    customerPhone: isExistUser.phone,
  });

  if (paymentSession.result === "true") {
    await Payment.create(paymentData);
    return paymentSession;
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, "Payment failed");
  }
};

const confirmationService = async (transactionId: string, status: string) => {
  const verifyResponse = await verifyPayment(transactionId);

  let message = "";

  if (verifyResponse && verifyResponse.pay_status === "Successful") {
    message = "Successfully Paid!";
  } else {
    message = "Payment Failed!";
  }

  const filePath = join(__dirname, "./confirmation.html");
  let template = readFileSync(filePath, "utf-8");

  template = template.replace("{{message}}", message);

  return template;
};

export const PaymentServices = {
  aamarpayPaymentIntoDB,
  confirmationService,
};