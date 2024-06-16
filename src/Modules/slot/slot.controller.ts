import httpStatus from "http-status";

import catchAsync from "../../utils/catchAsync";

import { handleNoDataResponse } from "../../errors/handleNotFound";
import sendResponse from "../../utils/sendResponse";
import { slotServices } from "./slot.service";

const createSlot = catchAsync(async (req, res) => {
  const slotData = req.body;
  const result = await slotServices.createSlotIntoDB(slotData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Slot created successfully!",
    data: result,
  });
});
const getAvailableSlots = catchAsync(async (req, res) => {
  const result = await slotServices.getAllAvailableSlotsFromDB();
  if (result?.length === 0) {
    return handleNoDataResponse(res);
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Slot retrieved successfully!",
    data: result,
  });
});

export const slotController = {
  createSlot,
  getAvailableSlots,
};
