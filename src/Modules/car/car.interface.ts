export type TCar = {
  name?: string; // Optional
  model?: string; // Optional
  year?: string; // Optional
  image?: string; // Optional
  location?: string; // Optional
  ownerEmail?: string; // Optional
  ownerName?: string; // Corrected property name to match typical casing conventions
  description?: string; // Optional
  color?: string; // Optional
  isElectric?: boolean; // Optional
  status?: string; // Optional
  features?: string[]; // Optional
  pricePerHour?: number; // Optional
  isDeleted?: boolean; // Optional
  date?: Date | undefined;
  carType: string;
  seatCapacity: number;
};

export type TReturnCar = {
  bookingId: string;
  endTime: string;
};
