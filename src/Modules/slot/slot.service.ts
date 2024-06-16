/* eslint-disable @typescript-eslint/consistent-type-definitions */
// src/modules/slot/slot.service.ts
import { Types } from "mongoose";
import { Service } from "../car/car.model";
import { TSlot } from "./slot.interface";
import { Slot } from "./slot.model";
import { generateSlots } from "./slot.utils";

interface SlotData {
  service: string;
  date: Date;
  startTime: string;
  endTime: string;
}

const createSlotIntoDB = async (slotData: SlotData): Promise<TSlot[]> => {
  // Fetch the service to get its duration
  const service = await Service.findById(slotData.service);
  if (!service) {
    throw new Error("Service not found");
  }

  const serviceDuration = service.duration;
  if (!serviceDuration) {
    throw new Error("Service duration is not defined");
  }

  const slots = generateSlots(
    slotData.startTime,
    slotData.endTime,
    serviceDuration
  );

  const slotDocuments = slots.map((slot) => ({
    service: new Types.ObjectId(slotData.service),
    date: slotData.date,
    startTime: slot.startTime,
    endTime: slot.endTime,
  }));

  const createdSlots = await Slot.insertMany(slotDocuments);
  return createdSlots.map((slot) => slot.toObject() as TSlot); // Convert to plain objects
};

const getAllAvailableSlotsFromDB = async () => {
  const result = await Slot.find({ isBooked: { $ne: "booked" } }).populate({
    path: "service",
    match: { isDeleted: { $ne: true } },
  });
  const filteredResult = result.filter((slot) => slot.service !== null);
  return filteredResult;
};

export const slotServices = {
  createSlotIntoDB,
  getAllAvailableSlotsFromDB,
};
